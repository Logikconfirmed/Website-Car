<script setup>
import { RouterLink, RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import TheNavbar from './components/TheNavbar.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<template>
  <div class="app-container">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <i class="bi bi-car-front"></i> CarHub
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cars">Fahrzeuge</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Kontakt</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>Nicht nur irgendein Händler</h5>
            <div class="social-icons mt-3">
              <a href="#" class="social-link"><i class="bi bi-facebook"></i></a>
              <a href="#" class="social-link"><i class="bi bi-instagram"></i></a>
              <a href="#" class="social-link"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>
          <div class="col-md-4">
            <h5>Kontaktinfo</h5>
            <p>
              <i class="bi bi-telephone"></i> +43 660 104 84 91<br>
              <i class="bi bi-envelope"></i> office@omegacars.at
            </p>
          </div>
          <div class="col-md-4">
            <h5>Öffnungszeiten</h5>
            <p>
              Montag - Freitag: 09:00 - 19:00<br>
              Samstag: 10:00 - 16:00<br>
              Sonntag: Geschlossen
            </p>
          </div>
        </div>
      </div>
      <div class="footer-bottom mt-4">
        <div class="container">
          <p class="text-center mb-0">Alle Rechte Vorbehalten © 2024 Omega Cars e.U.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
}

.navbar {
  background-color: var(--primary-color);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 600;
}

.navbar-brand i {
  color: var(--secondary-color);
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--secondary-color) !important;
}

.footer {
  background-color: var(--primary-color);
  color: white;
  padding: 3rem 0;
  margin-top: 4rem;
}

.social-icons a {
  color: white;
  font-size: 1.5rem;
  margin-right: 1rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: var(--secondary-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
