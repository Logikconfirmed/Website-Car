import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
    console.error('Globale Fehlerbehandlung:', err, info);
    alert('Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.');
  };
app.use(router)

app.mount('#app')
