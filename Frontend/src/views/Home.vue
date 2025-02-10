<template>
  <div class="home">
    <!-- Hero Carousel -->
    <div class="hero-carousel">
      <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button v-for="(_, index) in heroSlides" :key="index" type="button" 
                  data-bs-target="#heroCarousel" :data-bs-slide-to="index" 
                  :class="{ active: index === 0 }"></button>
        </div>
        <div class="carousel-inner">
          <div v-for="(slide, index) in heroSlides" :key="index" 
               class="carousel-item" :class="{ active: index === 0 }">
            <div class="overlay"></div>
            <img :src="slide.image" class="d-block w-100" :alt="slide.title">
            <div class="carousel-caption">
              <h1 class="display-3 fw-bold" data-aos="fade-up">{{ slide.title }}</h1>
              <p class="lead" data-aos="fade-up" data-aos-delay="200">{{ slide.description }}</p>
              <router-link to="/cars" class="btn btn-primary btn-lg" 
                          data-aos="fade-up" data-aos-delay="400">
                Entdecken Sie mehr
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Section -->
    <section class="search-section" data-aos="fade-up">
      <div class="container">
        <div class="search-box">
          <div class="row g-3">
            <div class="col-md-3">
              <select class="form-select" v-model="searchFilters.brand">
                <option value="">Marke wählen</option>
                <option v-for="brand in brands" :key="brand">{{ brand }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-select" v-model="searchFilters.priceRange">
                <option value="">Preisbereich</option>
                <option value="0-30000">Bis 30.000 €</option>
                <option value="30000-60000">30.000 € - 60.000 €</option>
                <option value="60000+">Über 60.000 €</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-select" v-model="searchFilters.year">
                <option value="">Baujahr</option>
                <option v-for="year in years" :key="year">{{ year }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <button class="btn btn-primary w-100" @click="searchCars">
                <i class="bi bi-search"></i> Suchen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Cars -->
    <section class="featured-cars">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Ausgewählte Fahrzeuge</h2>
        <div class="row">
          <div v-for="car in featuredCars" :key="car.id" class="col-md-4 mb-4">
            <div class="car-card" data-aos="fade-up">
              <div class="car-image">
                <img :src="car.imageUrl" :alt="car.brand + ' ' + car.model">
                <div class="car-overlay">
                  <router-link :to="'/cars/' + car.id" class="btn btn-light">
                    Details ansehen
                  </router-link>
                </div>
                <div class="car-badge" v-if="car.isNew">NEU</div>
              </div>
              <div class="car-info">
                <h3>{{ car.brand }} {{ car.model }}</h3>
                <div class="car-specs">
                  <span><i class="bi bi-calendar"></i> {{ car.year }}</span>
                  <span><i class="bi bi-speedometer2"></i> {{ car.mileage }} km</span>
                  <span><i class="bi bi-fuel-pump"></i> {{ car.fuelType }}</span>
                </div>
                <div class="car-price">
                  <span class="price">{{ formatPrice(car.price) }} €</span>
                  <span class="monthly">oder {{ calculateMonthlyRate(car.price) }} €/Monat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Unsere Services</h2>
        <div class="row">
          <div class="col-md-3" v-for="service in services" :key="service.title">
            <div class="service-card" data-aos="fade-up">
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="statistics-section" data-aos="fade-up">
      <div class="container">
        <div class="row">
          <div class="col-md-3" v-for="stat in statistics" :key="stat.title">
            <div class="stat-card">
              <div class="stat-number" v-intersection-observer="animateNumber">
                {{ stat.current }}+
              </div>
              <div class="stat-title">{{ stat.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Was unsere Kunden sagen</h2>
        <div class="swiper-container" data-aos="fade-up">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="review in testimonials" :key="review.id">
              <div class="testimonial-card">
                <div class="testimonial-image">
                  <img :src="review.image" :alt="review.name">
                </div>
                <div class="testimonial-content">
                  <p class="testimonial-text">"{{ review.text }}"</p>
                  <div class="testimonial-author">
                    <h4>{{ review.name }}</h4>
                    <div class="stars">
                      <i class="bi bi-star-fill" v-for="n in review.rating" :key="n"></i>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" data-aos="fade-up">
      <div class="container">
        <div class="cta-content">
          <h2>Bereit für Ihre Traumfahrt?</h2>
          <p>Kontaktieren Sie uns noch heute für eine persönliche Beratung</p>
          <router-link to="/contact" class="btn btn-light btn-lg">
            Jetzt Kontakt aufnehmen
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      heroSlides: [
        {
          image: '/images/hero1.jpg',
          title: 'Luxus neu definiert',
          description: 'Entdecken Sie unsere exklusive Auswahl an Premium-Fahrzeugen'
        },
        {
          image: '/images/hero2.jpg',
          title: 'Sportliche Eleganz',
          description: 'Performance trifft auf Stil'
        },
        {
          image: '/images/hero3.jpg',
          title: 'Zukunft der Mobilität',
          description: 'Innovative Technologie für Ihr Fahrerlebnis'
        }
      ],
      searchFilters: {
        brand: '',
        priceRange: '',
        year: ''
      },
      featuredCars: [],
      services: [
        {
          icon: 'bi bi-shield-check',
          title: 'Qualitätsgarantie',
          description: '12 Monate Garantie auf alle Fahrzeuge'
        },
        {
          icon: 'bi bi-tools',
          title: 'Service & Wartung',
          description: 'Professionelle Wartung durch Experten'
        },
        {
          icon: 'bi bi-cash-stack',
          title: 'Finanzierung',
          description: 'Flexible Finanzierungsoptionen'
        },
        {
          icon: 'bi bi-hand-thumbs-up',
          title: '100% Zufriedenheit',
          description: '30 Tage Rückgaberecht'
        }
      ],
      statistics: [
        { title: 'Zufriedene Kunden', target: 1500, current: 0 },
        { title: 'Fahrzeuge verkauft', target: 3000, current: 0 },
        { title: 'Auszeichnungen', target: 50, current: 0 },
        { title: 'Standorte', target: 25, current: 0 }
      ],
      testimonials: [
        {
          id: 1,
          name: 'Max Mustermann',
          image: '/images/testimonial1.jpg',
          text: 'Hervorragender Service und top Beratung!',
          rating: 5
        },
        // ... mehr Testimonials
      ],
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          clickable: true
        },
        autoplay: {
          delay: 3000
        },
        breakpoints: {
          320: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }
      }
    }
  },
  mounted() {
    AOS.init({
      duration: 1000,
      once: true
    });
    this.fetchFeaturedCars();
  },
  methods: {
    async fetchFeaturedCars() {
      try {
        const response = await fetch('http://localhost:8002/api/cars');
        this.featuredCars = await response.json();
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('de-DE').format(price);
    },
    calculateMonthlyRate(price) {
      return new Intl.NumberFormat('de-DE').format((price * 0.015).toFixed(2));
    },
    animateNumber(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.statistics.forEach(stat => {
            let current = 0;
            const interval = setInterval(() => {
              current += Math.ceil(stat.target / 50);
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(interval);
              }
              stat.current = current;
            }, 20);
          });
          observer.unobserve(entry.target);
        }
      });
    }
  }
}
</script>

<style scoped>
.hero-carousel {
  position: relative;
  height: 80vh;
  overflow: hidden;
}

.carousel-item {
  height: 80vh;
}

.carousel-item img {
  object-fit: cover;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1;
}

.carousel-caption {
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  bottom: auto;
}

.search-section {
  margin-top: -50px;
  position: relative;
  z-index: 3;
}

.search-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.car-card {
  position: relative;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.car-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.car-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.car-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.car-card:hover .car-image img {
  transform: scale(1.1);
}

.car-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.car-card:hover .car-overlay {
  opacity: 1;
}

.car-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--accent-color);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
}

.car-info {
  padding: 1.5rem;
}

.car-specs {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: #666;
}

.car-specs span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.car-price {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-color);
}

.monthly {
  font-size: 0.9rem;
  color: #666;
}

.service-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.statistics-section {
  background: var(--primary-color);
  color: white;
  padding: 4rem 0;
  margin: 4rem 0;
}

.stat-card {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: var(--secondary-color);
}

.testimonial-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin: 1rem;
}

.testimonial-image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.stars {
  color: #ffd700;
}

.cta-section {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/cta-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 0;
  text-align: center;
  margin-top: 4rem;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 60vh;
  }
  
  .carousel-item {
    height: 60vh;
  }
  
  .search-section {
    margin-top: -30px;
  }
  
  .car-specs {
    flex-direction: column;
    gap: 10px;
  }
}
</style> 