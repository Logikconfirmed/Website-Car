import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CarsView from '../views/CarsView.vue';
import CarDetailView from '../views/CarDetailView.vue';
import AddCarView from '../views/AddCarView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/cars', component: CarsView },
  { path: '/car/:id', component: CarDetailView, props: true },
  { path: '/cars/add', component: AddCarView },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
