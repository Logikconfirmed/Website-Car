<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const car = ref(null);

// Auto-Daten abrufen
async function fetchCar() {
  try {
    const response = await fetch(`http://localhost:8002/api/cars/${route.params.id}`);
    if (!response.ok) {
      throw new Error('Fehler beim Laden der Auto-Daten');
    }
    const data = await response.json();

    // Daten korrekt in das `car`-Objekt übernehmen
    car.value = {
      ...data,
      features: data.equipment || [], // equipment aus der API wird hier als features übernommen
    };
  } catch (error) {
    console.error(error.message);
  }
}

// Auto-Daten aktualisieren
async function editCar() {
  const updatedCar = {
    ...car.value,
    brand: prompt('Neue Marke:', car.value.brand),
    model: prompt('Neues Modell:', car.value.model),
    category: prompt('Neue Kategorie:', car.value.category),
    color: prompt('Neue Farbe:', car.value.color),
    price: parseFloat(prompt('Neuer Preis:', car.value.price)),
    year: parseInt(prompt('Neues Baujahr:', car.value.year)),
    description: prompt('Neue Beschreibung:', car.value.description),
  };

  try {
    const response = await fetch(`http://localhost:8002/api/cars/${car.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCar),
    });

    if (!response.ok) {
      throw new Error('Fehler beim Aktualisieren des Fahrzeugs');
    }

    car.value = updatedCar;
    alert('Fahrzeug erfolgreich aktualisiert!');
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Fahrzeugs:', error);
    alert('Fehler beim Aktualisieren des Fahrzeugs.');
  }
}

// Daten laden, wenn die Komponente geladen wird
onMounted(() => {
  fetchCar();
});
</script>

<template>
  <div class="container mt-3" v-if="car">
    <div class="row">
      <!-- Bildanzeige -->
      <div class="col-md-6">
        <img :src="'http://localhost:8002' + car.imageUrl" class="img-fluid" alt="car image" />
      </div>

      <!-- Auto-Details -->
      <div class="col-md-6">
        <h1>{{ car.brand }} {{ car.model }}</h1>
        <p><strong>Kategorie:</strong> {{ car.category }}</p>
        <p><strong>Farbe:</strong> {{ car.color }}</p>
        <p><strong>Beschreibung:</strong> {{ car.description }}</p>
        <p><strong>Preis:</strong> {{ car.price }}€</p>
        <p><strong>Baujahr:</strong> {{ car.year }}</p>

        <!-- Ausstattung als Tabelle -->
        <h3>Ausstattung</h3>
        <table class="table table-striped" v-if="car.features.length > 0">
          <thead>
            <tr>
              <th>Feature</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in car.features" :key="index">
              <td>{{ item }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Keine Ausstattung verfügbar</p>

        <!-- Buttons -->
        <div class="mt-3">
          <button @click="editCar" class="btn btn-primary me-2">Bearbeiten</button>
          <router-link to="/cars" class="btn btn-secondary">Zurück zur Übersicht</router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Lade-Status -->
  <div v-else>
    <p>Lade Daten...</p>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 10px;
}
p {
  margin: 5px 0;
}
button {
  margin-top: 10px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}
.btn-primary {
  background-color: #007bff;
  border: none;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-secondary {
  margin-top: 10px;
}
</style>
