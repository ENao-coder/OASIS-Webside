<template>
  <div class="event-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <p>Cargando evento...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
    </div>

    <!-- Event Content -->
    <template v-else-if="event">
      <!-- Hero Banner -->
      <section class="hero-banner">
        <img :src="event.bannerImage" :alt="event.title" class="banner-img" />
        <div class="banner-overlay"></div>
      </section>

      <!-- Event Content -->
      <section class="event-content">
        <div class="container">
          <div class="content-header">
            <div class="title-wrapper">
              <div class="accent-bar"></div>
              <h1 class="event-title">{{ event.title }}</h1>
            </div>
            <button class="register-btn">Inscríbete</button>
          </div>

          <!-- Descripción -->
          <div class="section">
            <h2 class="section-title">Descripción:</h2>
            <p class="section-text">{{ event.description }}</p>
          </div>

          <!-- Horario y Lugar -->
          <div class="section">
            <h2 class="section-title">Horario y Lugar:</h2>
            <p class="section-text">
              <strong>Fecha:</strong> {{ event.date }}<br>
              <strong>Lugar:</strong> {{ event.location }}
            </p>
          </div>

          <!-- Objetivo -->
          <div class="section">
            <h2 class="section-title">Objetivo:</h2>
            <p class="section-text">{{ event.objective }}</p>
          </div>

          <!-- Perfil requerido -->
          <div class="section">
            <h2 class="section-title">Perfil requerido:</h2>
            <p class="section-text">{{ event.requiredProfile }}</p>
          </div>

          <!-- Event Image -->
          <div class="event-image-wrapper">
            <img :src="event.contentImage" :alt="event.title" class="event-img" />
          </div>
        </div>
      </section>
    </template>
  </div>
</template><script>
import { getEventById } from '@/services/eventService'

export default {
  name: 'EventDetailView',
  data() {
    return {
      event: null,
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.loadEvent()
  },
  methods: {
    async loadEvent() {
      this.loading = true
      this.error = null
      try {
        const eventId = this.$route.params.id
        const data = await getEventById(eventId)
        this.event = data
      } catch (err) {
        console.error('Error al cargar el evento:', err)
        this.error = 'No se pudo cargar el evento'
        // Datos de fallback
        this.event = {
          id: this.$route.params.id,
          title: 'Taller Women In Optics',
          bannerImage: new URL('@/assets/resources/event-banner.jpg', import.meta.url).href,
          contentImage: new URL('@/assets/resources/event-content.jpg', import.meta.url).href,
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the.",
          date: 'dd/mm/yy',
          location: 'Universidad de Guanajuato, Campus Irapuato-Salamanca, DICIS.',
          objective: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the.",
          requiredProfile: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the."
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* --- Base Layout --- */
.event-detail {
  min-height: 100vh;
  background-color: #1a1a1a;
  padding-bottom: 80px;
}

/* --- Loading & Error States --- */
.loading-container,
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: #ffffff;
  font-size: 24px;
}

.error-container {
  color: #ec1f2a;
}

/* --- Hero Banner --- */
.hero-banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(26, 26, 26, 0.8) 100%);
}

/* --- Event Content --- */
.event-content {
  background-color: #1a1a1a;
  padding: 60px 20px;
  color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* --- Content Header --- */
.content-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 60px;
  gap: 40px;
}

.title-wrapper {
  display: flex;
  align-items: flex-start;
  flex: 1;
}

.accent-bar {
  width: 18px;
  min-height: 60px;
  background-color: #ec1f2a;
  margin-right: 24px;
  flex-shrink: 0;
}

.event-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 48px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.register-btn {
  background-color: #ec1f2a;
  color: #ffffff;
  border: none;
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: var(--font-body, sans-serif);
  box-shadow: 0 0 20px rgba(236, 31, 42, 0.4);
  flex-shrink: 0;
}

.register-btn:hover {
  background-color: #ff2b38;
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(236, 31, 42, 0.6);
}

.register-btn:active {
  transform: translateY(0);
}

/* --- Sections --- */
.section {
  margin-bottom: 40px;
}

.section-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 16px 0;
}

.section-text {
  font-family: var(--font-body, sans-serif);
  font-size: 16px;
  line-height: 1.8;
  color: #d0d0d0;
  margin: 0;
}

.section-text strong {
  color: #ffffff;
  font-weight: 600;
}

/* --- Event Image --- */
.event-image-wrapper {
  margin-top: 60px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.event-img {
  width: 100%;
  height: auto;
  display: block;
}

/* --- Responsiveness --- */
@media (max-width: 1024px) {
  .event-title {
    font-size: 40px;
  }

  .hero-banner {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .content-header {
    flex-direction: column;
    align-items: stretch;
  }

  .title-wrapper {
    margin-bottom: 20px;
  }

  .event-title {
    font-size: 32px;
  }

  .register-btn {
    width: 100%;
    text-align: center;
  }

  .hero-banner {
    height: 300px;
  }

  .accent-bar {
    min-height: 50px;
    width: 14px;
    margin-right: 16px;
  }

  .section-title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .event-title {
    font-size: 28px;
  }

  .hero-banner {
    height: 250px;
  }

  .event-content {
    padding: 40px 20px;
  }

  .content-header {
    margin-bottom: 40px;
  }
}
</style>
