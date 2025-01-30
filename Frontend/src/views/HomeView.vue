<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const popularCars = ref([]);
const errorMessage = ref('');


// Beliebte Autos laden
async function fetchPopularCars() {
  try {
    const response = await fetch('http://localhost:8002/api/cars');
    if (!response.ok) throw new Error('Fehler beim Laden der Autos.');
    const allCars = await response.json();

    // Beliebte Autos auswählen (z.B. die ersten 3 Autos)
    popularCars.value = allCars.slice(0, 3);
  } catch (error) {
    errorMessage.value = error.message || 'Fehler beim Laden der Autos.';
  }
}

// Beim Laden der Seite Autos abrufen
onMounted(() => {
  fetchPopularCars();
});
</script>

<template>
  <!-- Hero Section -->
  <header class="hero">
    <div class="hero-content">
      <h1>Willkommen bei <span>CarHub</span></h1>
      <p>Deine zentrale Plattform zur Verwaltung von Autos – Einfach, Schnell und Effizient!</p>
      <button @click="$router.push('/cars')" class="cta-button">Entdecke unsere Autos</button>
    </div>
  </header>

  <!-- Beliebte Fahrzeuge Section -->
  <section class="popular-cars">
    <h2>🚗 Beliebte Fahrzeuge</h2>
    <div v-if="errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>
    <div v-else class="popular-cars-grid">
      <div v-for="car in popularCars" :key="car.id" class="car-card">
        <img :src="'http://localhost:8002' + car.imageUrl" alt="Car Image" class="car-image" />
        <h3>{{ car.brand }} {{ car.model }}</h3>
        <p><strong>Baujahr:</strong> {{ car.year }}</p>
        <p><strong>Preis:</strong> {{ car.price }} €</p>
        <router-link :to="`/car/${car.id}`" class="btn-details">Mehr Details</router-link>
      </div>
    </div>
    <div v-if="!popularCars.length && !errorMessage" class="text-center">
      <p>Keine Fahrzeuge gefunden.</p>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="testimonials">
    <h2>💬 Kundenbewertungen</h2>
    <div class="testimonial-grid">
      <div class="testimonial-card">
        <p>"CarHub hat mir geholfen, das perfekte Auto zu finden. Einfach klasse!"</p>
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <span>- Max Mustermann</span>
      </div>
      <div class="testimonial-card">
        <p>"Schneller Service und tolle Auswahl. Sehr zufrieden!"</p>
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <span>- Anna Müller</span>
      </div>
      <div class="testimonial-card">
        <p>"Professioneller Support und zuverlässige Plattform!"</p>
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <span>- Lisa Schmidt</span>
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="cta">
    <h2>Bereit loszulegen?</h2>
    <p>Starte jetzt und entdecke die besten Autos mit CarHub!</p>
    <button @click="$router.push('/cars')" class="cta-button">Autos entdecken</button>
  </section>
  
</template>

<style scoped>
/* Hero Section */
.hero {
  background: #4a5c6a; /* Dunkelblau aus dem Logo */
  color: white;
  text-align: center;
  padding: 80px 20px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.hero-content h1 span {
  color: #ffd700; /* Gold */
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.cta-button {
  background-color: #ffd700; /* Gold */
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #e6c200;
}

/* Beliebte Fahrzeuge Section */
.popular-cars {
  text-align: center;
  padding: 50px 20px;
  background-color: #f2f4f7; /* Hellgrau */
}

.popular-cars h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.popular-cars-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.car-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.car-card:hover {
  transform: translateY(-5px);
}

.car-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

/* Testimonials Section */
.testimonials {
  text-align: center;
  padding: 60px 20px;
  background-color: #f2f4f7; /* Hellgrau */
}

.testimonials h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.testimonial-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  margin-top: 20px;
}

.testimonial-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-card p {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #555;
}

.testimonial-card .stars {
  color: #ffd700; /* Gold */
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.testimonial-card span {
  font-size: 0.9rem;
  font-style: italic;
  color: #777;
}
/* Call to Action Section */
.cta {
  background: #4a5c6a; /* Dunkelblau */
  color: white;
  text-align: center;
  padding: 50px 20px;
  margin-top: 50px;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.cta p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
</style>
