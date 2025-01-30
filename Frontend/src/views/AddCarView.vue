<script setup>
import { ref } from 'vue';

const brand = ref('');
const model = ref('');
const category = ref('');
const color = ref('');
const price = ref('');
const year = ref(''); // Produktionsjahr
const description = ref('');
const features = ref(['']); // Array aus Strings für Ausstattungen
const imageFile = ref(null); // Hält das Bild
const successMessage = ref(''); // Erfolgsmeldung
const errorMessage = ref(''); // Fehlermeldung
const isFormVisible = ref(true); // Sichtbarkeit des Formulars

// Neues Feature hinzufügen
const addFeature = () => {
  features.value.push(''); // Fügt einen leeren String hinzu
};

// Feature entfernen
const removeFeature = (index) => {
  features.value.splice(index, 1);
};

// Bildauswahl verarbeiten
const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
};

// Auto hinzufügen
const addCar = async () => {
  const formData = new FormData();

  formData.append('brand', brand.value);
  formData.append('model', model.value);
  formData.append('category', category.value);
  formData.append('color', color.value);
  formData.append('price', price.value);
  formData.append('year', year.value);
  formData.append('description', description.value);
  formData.append('image', imageFile.value);

  features.value.forEach((item, index) => {
    formData.append(`features[${index}]`, item); 
  });

  try {
    const response = await fetch('http://localhost:8002/api/cars', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      successMessage.value = 'Auto erfolgreich hinzugefügt!';
      isFormVisible.value = false; // Formular ausblenden
    } else {
      errorMessage.value = 'Fehler beim Hinzufügen des Autos!';
    }
  } catch (error) {
    errorMessage.value = 'Netzwerkfehler beim Hinzufügen des Autos.';
  }
};
</script>

<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <!-- Erfolgsmeldung -->
        <div v-if="successMessage" class="alert alert-success text-center">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger text-center">
          {{ errorMessage }}
        </div>

        <!-- Formular Auto hinzufügen -->
        <form v-if="isFormVisible" @submit.prevent="addCar">
          <div class="mb-3">
            <label for="brand" class="form-label">Marke</label>
            <input type="text" class="form-control" id="brand" v-model="brand" required />
          </div>

          <div class="mb-3">
            <label for="model" class="form-label">Modell</label>
            <input type="text" class="form-control" id="model" v-model="model" required />
          </div>

          <div class="mb-3">
            <label for="category" class="form-label">Kategorie</label>
            <input type="text" class="form-control" id="category" v-model="category" required />
          </div>

          <div class="mb-3">
            <label for="color" class="form-label">Farbe</label>
            <input type="text" class="form-control" id="color" v-model="color" required />
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">Preis (€)</label>
            <input type="number" class="form-control" id="price" v-model="price" step="0.01" required />
          </div>

          <div class="mb-3">
            <label for="year" class="form-label">Baujahr</label>
            <input type="number" class="form-control" id="year" v-model="year" required />
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Beschreibung</label>
            <textarea class="form-control" id="description" v-model="description" required></textarea>
          </div>

          <!-- Bild-Upload -->
          <div class="mb-3">
            <label for="image" class="form-label">Bild hochladen</label>
            <input type="file" class="form-control" id="image" @change="handleImageUpload" accept="image/*" />
          </div>

          <!-- Features -->
          <div class="mb-3">
            <label class="form-label">Ausstattung</label>
            <div v-for="(item, index) in features" :key="index" class="input-group mb-2">
              <input type="text" class="form-control" placeholder="Feature (z. B. Ledersitze)"
                v-model="features[index]" required />
              <button type="button" class="btn btn-danger" @click="removeFeature(index)" v-if="features.length > 1">
                &times;
              </button>
            </div>
            <button type="button" class="btn btn-secondary mt-2" @click="addFeature">
              + Ausstattung hinzufügen
            </button>
          </div>

          <button type="submit" class="btn btn-primary">Speichern</button>
        </form>
      </div>
    </div>
  </div>
</template>