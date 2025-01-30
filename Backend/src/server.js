const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const fs = require('fs');

const app = express();
const port = 8002;
const multer = require('multer');
app.use(express.json());

// 📸 **Multer-Konfiguration für Disk-Storage**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../assets')); // Bilder im Ordner 'assets' speichern
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Zeitstempel für eindeutige Dateinamen
  }
});

const upload = multer({ storage });

const cors = require('cors');

// CORS aktivieren und Konfigurieren
app.use(cors({
  origin: 'http://localhost:5173', // Erlaube Anfragen von deinem Frontend
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Optional: CORS für jede Anfrage explizit hinzufügen
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Verbindung zur MySQL-Datenbank
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Leeres Passwort für Entwicklungszwecke
  database: "carhub_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testen der Datenbankverbindung
db.getConnection()
  .then(connection => {
    console.log('Erfolgreich mit der Datenbank verbunden!');
    connection.release();
  })
  .catch(err => {
    console.error('Fehler bei der Datenbankverbindung:', err);
  });

// Endpunkt: Alle Autos aus der Datenbank abrufen
app.get("/api/cars", async (req, res) => {
  try {
    // Autos abrufen
    const [cars] = await db.query(`
      SELECT 
        c.id, c.brand, c.model, c.category, c.color,
        c.price, c.year, c.imageUrl, c.description
      FROM cars c
    `);

    // Ausstattung zu den Autos abrufen
    const [equipment] = await db.query(`
      SELECT 
        ce.car_id, ce.equipment
      FROM car_equipment ce
    `);

    // Autos mit ihrer Ausstattung zusammenführen
    const carsWithEquipment = cars.map((car) => {
      const carEquipment = equipment
        .filter((eq) => eq.car_id === car.id)
        .map((eq) => eq.equipment);

      return {
        ...car,
        equipment: carEquipment,
      };
    });

    res.json(carsWithEquipment);
  } catch (error) {
    console.error("Fehler beim Abrufen der Autos:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Autos" });
  }
});

// Endpunkt: Auto per ID abrufen
app.get("/api/cars/:carId", async (req, res) => {
  try {
    const carId = req.params.carId;

    const [cars] = await db.query(
      `
      SELECT 
        c.id, c.brand, c.model, c.category, c.color,
        c.price, c.year, c.imageUrl, c.description
      FROM cars c
      WHERE c.id = ?
    `,
      [carId]
    );

    if (cars.length === 0) {
      return res.status(404).send("Car not found");
    }

    const [equipment] = await db.query(
      `
      SELECT equipment 
      FROM car_equipment
      WHERE car_id = ?
    `,
      [carId]
    );

    const car = {
      ...cars[0],
      equipment: equipment.map((eq) => eq.equipment),
    };

    res.json(car);
  } catch (error) {
    console.error("Fehler beim Abrufen des Autos:", error);
    res.status(500).json({ error: "Fehler beim Abrufen des Autos" });
  }
});

// Statische Dateien bereitstellen (z. B. Bilder)
app.use("/images", express.static(path.join(__dirname, "../assets")));

// Server starten
app.listen(port, () => {
  console.log(`API läuft auf http://localhost:${port}`);
});

// DELETE-Endpoint: Auto löschen
app.delete('/api/cars/:id', async (req, res) => {
  const carId = req.params.id; // ID des zu löschenden Autos aus der URL

  try {
    // Auto aus der cars-Tabelle löschen
    const [result] = await db.query('DELETE FROM cars WHERE id = ?', [carId]);

    // Überprüfen, ob ein Auto gelöscht wurde
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Erfolgsantwort
    res.json({ message: `Car with ID ${carId} successfully deleted` });
  } catch (error) {
    console.error('Error while deleting car:', error);
    res.status(500).json({ error: 'An error occurred while deleting the car' });
  }
});
app.post('/api/cars', upload.single('image'), async (req, res) => {
  const connection = await db.getConnection();

  const imagePath = req.file
    ? `/images/${req.file.filename}`
    : null;

  try {
    const {
      brand,
      model,
      category,
      color,
      price,
      year,
      description,
      features,
    } = req.body;

    // Validierung der Eingabedaten
    if (
      !brand ||
      !model ||
      !category ||
      !color ||
      !price ||
      !year ||
      !description ||
      !features ||
      !req.file
    ) {
      return res.status(400).json({ error: 'Alle Felder und ein Bild sind erforderlich!' });
    }

    const featuresArray = Array.isArray(features) ? features : [features];

    await connection.beginTransaction();

    // Auto in die Datenbank einfügen
    const [result] = await connection.query(
      `INSERT INTO cars (brand, model, category, color, price, year, imageUrl, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [brand, model, category, color, price, year, imagePath, description]
    );

    const carId = Number(result.insertId);

    // Ausstattung in die Tabelle car_equipment einfügen
    const equipmentInsertPromises = featuresArray.map((item) =>
      connection.query(
        `INSERT INTO car_equipment (car_id, equipment) VALUES (?, ?)`,
        [carId, item]
      )
    );

    await Promise.all(equipmentInsertPromises);

    await connection.commit();

    res.status(201).json({
      message: 'Auto erfolgreich hinzugefügt',
      carId,
    });
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Autos:', error);

    // Bild löschen, falls der Upload fehlschlägt
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    await connection.rollback();
    res.status(500).json({ error: 'Fehler beim Hinzufügen des Autos' });
  } finally {
    connection.release();
  }
});
app.put('/api/cars/:id', async (req, res) => {
  const carId = req.params.id; // ID des zu aktualisierenden Autos
  const { brand, model, category, color, price, year, imageUrl, description } = req.body;

  try {
    // Auto aktualisieren
    const [result] = await db.query(
      `
      UPDATE cars 
      SET brand = ?, model = ?, category = ?, color = ?, price = ?, year = ?, imageUrl = ?, description = ?
      WHERE id = ?
    `,
      [brand, model, category, color, price, year, imageUrl, description, carId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json({ message: `Car with ID ${carId} successfully updated` });
  } catch (error) {
    console.error('Error while updating car:', error);
    res.status(500).json({ error: 'An error occurred while updating the car' });
  }
});