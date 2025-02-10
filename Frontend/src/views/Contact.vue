<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <div class="contact-hero">
      <div class="overlay"></div>
      <div class="container">
        <h1 class="display-4 text-white">Kontaktieren Sie uns</h1>
        <p class="lead text-white">
          Wir sind für Sie da und freuen uns auf Ihre Nachricht
        </p>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="container contact-section">
      <div class="row">
        <!-- Contact Info -->
        <div class="col-lg-4">
          <div class="contact-info">
            <div class="info-item">
              <i class="bi bi-geo-alt"></i>
              <h3>Adresse</h3>
              <p>Sonnleithnergasse 43/2/12<br>1110 Wien<br>Österreich</p>
            </div>
            <div class="info-item">
              <i class="bi bi-telephone"></i>
              <h3>Telefon</h3>
              <p>+43 660 104 84 91</p>
              <p>Wir bitten Sie um telefonische Terminvereinbarung</p>
            </div>
            <div class="info-item">
              <i class="bi bi-envelope"></i>
              <h3>E-Mail</h3>
              <p>office@omegacars.at</p>
              <p>Wir antworten noch am selben Tag</p>
            </div>
            <div class="info-item">
              <i class="bi bi-clock"></i>
              <h3>Öffnungszeiten</h3>
              <p>
                Mon - Fri: 9:00 - 18:00<br>
                Sa: 9:00 - 16:00<br>
                So: Geschlossen
              </p>
            </div>
            <div class="social-links">
              <a href="#" class="social-link"><i class="bi bi-facebook"></i></a>
              <a href="#" class="social-link"><i class="bi bi-instagram"></i></a>
              <a href="#" class="social-link"><i class="bi bi-twitter"></i></a>
              <a href="#" class="social-link"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="col-lg-8">
          <div class="contact-form">
            <form @submit.prevent="submitForm">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="name" 
                      v-model="formData.name"
                      placeholder="Ihr Name"
                      required
                    >
                    <label for="name">Ihr Name</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      v-model="formData.email"
                      placeholder="Ihre E-Mail"
                      required
                    >
                    <label for="email">Ihre E-Mail</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="subject" 
                      v-model="formData.subject"
                      placeholder="Betreff"
                      required
                    >
                    <label for="subject">Betreff</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <textarea 
                      class="form-control" 
                      id="message" 
                      v-model="formData.message"
                      placeholder="Ihre Nachricht"
                      style="height: 150px"
                      required
                    ></textarea>
                    <label for="message">Ihre Nachricht</label>
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
                    <span v-if="!isSubmitting">Nachricht senden</span>
                    <span v-else>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Wird gesendet...
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-section">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.6876460422392!2d16.37547907677401!3d48.15501005532247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476da9f1ca5a28cf%3A0x4e7c4f5f5e055e51!2sSonnleithnergasse%2043%2C%201100%20Wien!5e0!3m2!1sde!2sat!4v1709866234567!5m2!1sde!2sat"
        width="100%"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.');
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      } catch (error) {
        console.error('Fehler beim Senden des Formulars:', error);
        alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>

<style scoped>
.contact-hero {
  position: relative;
  height: 40vh;
  background: url('/images/contact-hero.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
}

.contact-hero .container {
  position: relative;
  z-index: 2;
}

.contact-section {
  margin: -50px auto 50px;
  position: relative;
  z-index: 3;
}

.contact-info {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.info-item {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.info-item:hover {
  transform: translateY(-5px);
}

.info-item i {
  font-size: 2.5rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.info-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.info-item p {
  color: #666;
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  width: 45px;
  height: 45px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--secondary-color);
  transform: translateY(-3px);
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.form-floating {
  margin-bottom: 1rem;
}

.form-control:focus {
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
}

.map-section {
  margin-top: 4rem;
}

@media (max-width: 768px) {
  .contact-section {
    margin-top: 2rem;
  }
  
  .contact-info {
    margin-bottom: 2rem;
  }
}
</style> 