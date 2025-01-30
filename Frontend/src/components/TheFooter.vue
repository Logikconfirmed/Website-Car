<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section about">
          <h3>Über CarHub</h3>
          <p>
            CarHub ist deine zentrale Plattform für die Verwaltung und Entdeckung von Autos. Egal ob Kauf, Verkauf oder einfach stöbern – bei uns bist du richtig!
          </p>
        </div>
        <div class="footer-section links">
          <h3>Wichtige Links</h3>
          <ul>
            <li><router-link to="/">Startseite</router-link></li>
            <li><router-link to="/cars">Autos</router-link></li>
            <li><router-link to="/about">Über uns</router-link></li>
            <li><router-link to="/contact">Kontakt</router-link></li>
          </ul>
        </div>
        <div class="footer-section contact">
          <h3>Kontakt</h3>
          <p><i class="bi bi-telephone"></i> +43 660 7196 306</p>
          <p><i class="bi bi-envelope"></i> info@carhub.de</p>
          <p><i class="bi bi-geo-alt"></i> Spengergasse 123, 12345 Wien</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; {{ new Date().getFullYear() }} CarHub. Alle Rechte vorbehalten.
      </div>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .footer {
    background-color: #2c3e50; /* Dunkelblau aus dem Logo */
    color: #ecf0f1; /* Helles Grau */
    padding: 40px 0;
    margin-top: 50px;
  }
  
  .footer-container {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    flex-wrap: wrap;
    padding: 0 20px;
  }
  
  .footer-section {
    flex: 1;
    min-width: 250px;
  }
  
  .footer-section h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #ffd700; /* Goldfarbe aus dem Logo */
  }
  
  .footer-section p,
  .footer-section ul {
    font-size: 0.9rem;
    color: #bdc3c7;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 10px;
  }
  
  .footer-section ul li a {
    text-decoration: none;
    color: #ecf0f1;
    transition: color 0.3s;
  }
  
  .footer-section ul li a:hover {
    color: #ffd700;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 30px;
    font-size: 0.8rem;
    border-top: 1px solid #34495e;
    padding-top: 10px;
  }
  </style>
  