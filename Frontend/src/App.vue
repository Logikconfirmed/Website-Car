<script setup>
import { RouterLink, RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import TheNavbar from './components/TheNavbar.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<template>
  <header>
    <TheNavbar />
    <TheHeader />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <TheFooter />
  </footer>
</template>

<style>

header {
  margin-bottom: 20px;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #f4f6f9;
}

footer {
  margin-top: 20px;
}
</style>
