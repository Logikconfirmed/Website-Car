DROP DATABASE IF EXISTS carhub_db;

CREATE DATABASE carhub_db;
USE carhub_db;

-- Erstelle Tabelle für die Autos
CREATE TABLE cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  color VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  year INT NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Erstelle Tabelle für die Ausstattung
CREATE TABLE car_equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT,
    equipment VARCHAR(255),
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Daten für die Autos einfügen
INSERT INTO cars (id, brand, model, category, color, price, year, imageUrl, description)
VALUES 
(1, 'BMW', '3 Series', 'Sedan', 'Black', 42000, 2022, '/images/3erBMW.jpg', 'A premium sports sedan with exceptional handling and luxurious interior.'),
(2, 'Tesla', 'Model 3', 'Electric', 'White', 50000, 2023, '/images/TeslaModel3.png', 'A cutting-edge electric vehicle with advanced technology and impressive range.'),
(3, 'Ford', 'F-150', 'Truck', 'Blue', 35000, 2021, '/images/Ford_f-150.png', 'A durable and reliable truck perfect for work and adventure.'),
(4, 'Mercedes-Benz', 'A-Klasse', 'Hatchback', 'Silver', 32000, 2022, '/images/mercedes_a-klasse.jpg', 'A compact premium hatchback with advanced features.'),
(5, 'Mercedes-Benz', 'C-Klasse', 'Sedan', 'Black', 45000, 2023, '/images/mercedes_c-klasse.jpg', 'A refined luxury sedan with state-of-the-art technology.'),
(6, 'Mercedes-Benz', 'CLA Coupe', 'Coupe', 'White', 47000, 2023, '/images/mercedes_cla_coupe.jpg', 'A stylish coupe with sporty performance.'),
(7, 'Mercedes-Benz', 'GLB SUV', 'SUV', 'Blue', 50000, 2022, '/images/mercedes_glb_suv.jpg', 'A versatile SUV with ample space and premium comfort.'),
(8, 'Mercedes-Benz', 'GLC SUV', 'SUV', 'Grey', 53000, 2023, '/images/mercedes_glc_suv.jpg', 'A luxurious SUV with advanced off-road capabilities.'),
(9, 'Mercedes-Benz', 'GLE Coupe', 'Coupe', 'Black', 70000, 2023, '/images/mercedes_gle_coupe.jpg', 'A powerful and elegant SUV coupe.'),
(10, 'Mercedes-Benz', 'GLS SUV', 'SUV', 'White', 85000, 2023, '/images/mercedes_gls_suv.jpg', 'A flagship luxury SUV with premium features.'),
(11, 'Mercedes-Benz', 'V-Klasse', 'Van', 'Silver', 60000, 2023, '/images/mercedes_v-klasse.jpg', 'A spacious and comfortable van for long journeys.'),
(12, 'Mercedes-Benz', 'CLE Coupe', 'Coupe', 'Red', 55000, 2023, '/images/mercedes-benz_cle_coupe.jpg', 'A sporty and dynamic coupe with modern design.'),
(13, 'Mercedes-Benz', 'S-Klasse', 'Sedan', 'Black', 120000, 2023, '/images/mercedes-benz_s-klasse.jpg', 'The pinnacle of luxury sedans with cutting-edge technology.'),
(14, 'Audi', 'A1', 'Hatchback', 'Red', 25000, 2022, '/images/audia1.jpg', 'A compact hatchback with sporty design and great efficiency.'),
(15, 'Audi', 'A3', 'Sedan', 'White', 30000, 2023, '/images/audia3.jpg', 'A premium compact sedan with advanced features.'),
(16, 'Audi', 'A4', 'Sedan', 'Black', 40000, 2023, '/images/audia4.jpg', 'A refined luxury sedan with outstanding comfort.'),
(17, 'Audi', 'A5', 'Coupe', 'Blue', 45000, 2023, '/images/audia5.jpg', 'A stylish coupe with exceptional driving dynamics.'),
(18, 'Audi', 'A6', 'Sedan', 'Grey', 55000, 2023, '/images/audia6.jpg', 'A sophisticated luxury sedan with advanced technology.'),
(19, 'Audi', 'A7', 'Coupe', 'Black', 70000, 2023, '/images/audia7.jpg', 'A sporty luxury coupe with bold design.'),
(20, 'Audi', 'A8', 'Sedan', 'Silver', 90000, 2023, '/images/audia8.jpg', 'A flagship luxury sedan with premium features.'),
(21, 'Audi', 'Q3', 'SUV', 'White', 35000, 2023, '/images/audiq3.jpg', 'A compact SUV with versatile capabilities.'),
(22, 'Audi', 'Q5', 'SUV', 'Black', 50000, 2023, '/images/audiq5.jpg', 'A luxury SUV with modern technology and performance.'),
(23, 'Audi', 'Q7', 'SUV', 'Blue', 65000, 2023, '/images/audiq7.jpg', 'A spacious SUV ideal for families.'),
(24, 'Audi', 'R8', 'Coupe', 'Red', 150000, 2023, '/images/audir8.jpg', 'A high-performance sports car with unmatched power.'),
(25, 'BMW', '1 Series', 'Hatchback', 'Blue', 28000, 2022, '/images/bmw_1er.jpg', 'A sporty hatchback with agile handling.'),
(26, 'BMW', '2 Series', 'Coupe', 'White', 35000, 2023, '/images/bmw_2er.jpg', 'A compact coupe with sporty elegance.'),
(27, 'BMW', '3 Series', 'Sedan', 'Black', 42000, 2023, '/images/bmw_3er.jpg', 'A premium sports sedan with exceptional performance.'),
(28, 'BMW', '4 Series', 'Coupe', 'Grey', 48000, 2023, '/images/bmw_4er.jpg', 'A dynamic coupe with bold design.'),
(29, 'BMW', '5 Series', 'Sedan', 'White', 55000, 2023, '/images/bmw_5er.jpg', 'A luxury sedan with advanced technology.'),
(30, 'BMW', '6 Series', 'Coupe', 'Silver', 68000, 2023, '/images/bmw_6er.jpg', 'A refined coupe with high performance.'),
(31, 'BMW', 'X1', 'SUV', 'Blue', 37000, 2023, '/images/bmw-X1.jpg', 'A compact SUV with versatility and style.'),
(32, 'BMW', 'X2', 'SUV', 'Red', 40000, 2023, '/images/bmw-X2.jpg', 'A sporty SUV with modern design.'),
(33, 'BMW', 'X3', 'SUV', 'Black', 45000, 2023, '/images/bmw-X3.jpg', 'A versatile SUV with premium features.'),
(34, 'BMW', 'X4', 'SUV', 'Grey', 50000, 2023, '/images/bmw-X4.jpg', 'A sporty SUV coupe with bold lines.'),
(35, 'BMW', 'X5', 'SUV', 'White', 60000, 2023, '/images/bmw-X5.jpg', 'A luxurious SUV with advanced comfort.');

-- Daten für die Ausstattung einfügen
INSERT INTO car_equipment (car_id, equipment)
VALUES 
(1, 'Leather seats'),
(1, 'M Sport package'),
(1, 'Harman Kardon sound system'),
(1, 'Adaptive cruise control'),
(2, 'Autopilot'),
(2, 'Full self-driving capability'),
(2, 'Premium interior'),
(2, 'Glass roof'),
(3, 'Tow package'),
(3, 'Off-road tires'),
(3, 'Bed liner'),
(3, 'SYNC 4 infotainment system');

