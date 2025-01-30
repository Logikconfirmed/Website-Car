<template>
  <header class="header">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="CarHub Logo" class="logo" />
    </div>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cars">Cars</router-link></li>
        <li><router-link to="/contact">Partner</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3F4D5D; /* Farbe aus dem Logo */
  color: white;
  padding: 10px 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
  margin-right: 15px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

nav ul li a {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: #8BA2B5; /* Hellerer Farbton für Hover */
}
</style>
