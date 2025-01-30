<script setup>
import { onMounted, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const cars = ref([]); // Alle Autos
const filteredCars = ref([]); // Gefilterte Autos
const errorMessage = ref('');
const successMessage = ref('');
const selectedBrand = ref(''); // Gewählte Marke
const selectedCategory = ref(''); // Gewählte Kategorie
const searchQuery = ref(''); // Suchbegriff

const showFilters = ref(false); // Steuert die Sichtbarkeit des Filterbereichs

// Marken dynamisch extrahieren
const brands = computed(() => {
  const uniqueBrands = new Set(cars.value.map((car) => car.brand));
  return Array.from(uniqueBrands);
});

// Kategorien dynamisch extrahieren
const categories = computed(() => {
  const uniqueCategories = new Set(cars.value.map((car) => car.category));
  return Array.from(uniqueCategories);
});

// Autos laden
async function fetchCars() {
  try {
    const response = await fetch('http://localhost:8002/api/cars');
    if (!response.ok) throw new Error('Fehler beim Laden der Autos.');
    cars.value = await response.json();
    filteredCars.value = cars.value; // Standardmäßig alle Autos anzeigen
  } catch (error) {
    errorMessage.value = error.message || 'Fehler beim Laden der Autos.';
  }
}

// Filter anwenden
function filterCars() {
  filteredCars.value = cars.value.filter((car) => {
    const matchesBrand = selectedBrand.value ? car.brand === selectedBrand.value : true;
    const matchesCategory = selectedCategory.value ? car.category === selectedCategory.value : true;
    const matchesSearch = searchQuery.value
      ? car.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;

    return matchesBrand && matchesCategory && matchesSearch;
  });
}

// Auto löschen
async function deleteCar(id) {
  try {
    const response = await fetch(`http://localhost:8002/api/cars/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      cars.value = cars.value.filter((car) => car.id !== id);
      filteredCars.value = filteredCars.value.filter((car) => car.id !== id);
      successMessage.value = 'Auto erfolgreich gelöscht!';
    } else {
      errorMessage.value = 'Fehler beim Löschen des Autos.';
    }
  } catch (error) {
    errorMessage.value = 'Netzwerkfehler beim Löschen des Autos.';
  }
}

// Autos laden, wenn die Komponente gerendert wird
onMounted(() => {
  fetchCars();
});
</script>

<template>
  <div class="container mt-4">
    <!-- Header-Bereich -->
    <div class="header-section d-flex justify-content-between align-items-center mb-4">
      <h1> Unsere Fahrzeuge</h1>
      <router-link to="/cars/add">
        <button class="btn btn-success btn-lg">
          <i class="bi bi-plus"></i> Neues Auto hinzufügen
        </button>
      </router-link>
    </div>

    <!-- Filter-Button -->
    <div class="text-center mb-3">
      <button @click="showFilters = !showFilters" class="btn btn-primary">
        <i class="bi bi-funnel"></i> Filter anzeigen
      </button>
    </div>

    <!-- Filterbereich (Dropdown) -->
    <div v-if="showFilters" class="filter-container p-3 mb-4">
      
      <div class="filter-group mb-3">
        <label for="brandFilter" class="form-label">Marke:</label>
        <select id="brandFilter" v-model="selectedBrand" @change="filterCars" class="form-select">
          <option value="">Alle Marken</option>
          <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
        </select>
      </div>

      <div class="filter-group mb-3">
        <label for="categoryFilter" class="form-label">Kategorie:</label>
        <select id="categoryFilter" v-model="selectedCategory" @change="filterCars" class="form-select">
          <option value="">Alle Kategorien</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="searchQuery" class="form-label">Suche:</label>
        <input
          id="searchQuery"
          v-model="searchQuery"
          @input="filterCars"
          type="text"
          placeholder="Nach Modell oder Beschreibung suchen"
          class="form-control"
        />
      </div>
    </div>

    <!-- Erfolg- und Fehlermeldungen -->
    <div v-if="successMessage" class="alert alert-success text-center">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger text-center">{{ errorMessage }}</div>

    <!-- Autos anzeigen -->
    <div class="row">
      <div v-for="car in filteredCars" :key="car.id" class="col-md-4 mb-4">
        <div class="card car-card shadow-sm">
          <img :src="'http://localhost:8002' + car.imageUrl" class="card-img-top car-image" alt="car image" />
          <div class="card-body">
            <h5 class="card-title">{{ car.brand }} - {{ car.model }}</h5>
            <p><strong>Baujahr:</strong> {{ car.year }}</p>
            <p><strong>Kategorie:</strong> {{ car.category }}</p>
            <p><strong>Preis:</strong> {{ car.price }}€</p>
            <p>{{ car.description }}</p>
            <div class="d-flex justify-content-between">
              <router-link :to="`/car/${car.id}`" class="btn btn-outline-primary btn-sm">Details</router-link>
              <button class="btn btn-outline-danger btn-sm" @click="deleteCar(car.id)">Löschen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

/* Filter Styling */
.filter-container {
  margin-bottom: 20px;
}

.form-select {
  width: 300px;
  margin: 0 auto;
  padding: 8px;
  border-radius: 5px;
}

/* Card Design */
.car-card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
}

.car-card:hover {
  transform: translateY(-5px);
}

.car-image {
  height: 200px;
  object-fit: cover;
}

/* Title Styling */
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
}

/* Button Styles */
.btn-outline-primary {
  border-color: #4a90e2;
  color: #4a90e2;
}

.btn-outline-primary:hover {
  background-color: #4a90e2;
  color: white;
}

.btn-outline-danger {
  border-color: #e74c3c;
  color: #e74c3c;
}

.btn-outline-danger:hover {
  background-color: #e74c3c;
  color: white;
}

.btn-success {
  background-color: #5c605e;
  border: none;
}

.btn-success:hover {
  background-color: #696969;
}
</style>
