<template>
  <div class="events">
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Descubre Nuestros</h1>
        <h2 class="hero-subtitle-main">Eventos</h2>
        <p class="hero-subtitle-text">Conferencias, Talleres y Actividades</p>
      </div>
    </section>

    <section class="events-gallery">
      <div class="container">
        <div class="gallery-header">
          <div class="accent-bar"></div>
          <h2 class="section-title">Próximos Eventos</h2>
        </div>

        <p class="gallery-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
        </p>

        <div class="events-grid">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { getEvents } from '@/services/eventService'

export default {
  name: 'EventsView',
  components: {
    EventCard
  },
  data() {
    return {
      events: [],
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.loadEvents()
  },
  methods: {
    async loadEvents() {
      this.loading = true
      this.error = null
      try {
        const data = await getEvents()
        this.events = data
      } catch (error) {
        this.error = 'Error al cargar los eventos'
        console.error('Error loading events:', error)
        // Fallback a datos de ejemplo si falla la API
        this.events = [
          {
            id: 1,
            title: 'Evento',
            date: '15 de Diciembre, 2025',
            description: 'Lorem Ipsum is simply dummy text of the',
            status: 'Próximo',
            image: new URL('@/assets/resources/event-1.jpg', import.meta.url).href
          }
        ]
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* --- Base Layout --- */
.events {
  min-height: 100vh;
  background-color: #1a1a1a;
  padding-bottom: 80px;
}

/* --- Hero Section --- */
.hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/resources/hero-background.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  z-index: -1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 40px;
  max-width: 1200px;
}

.hero-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 72px;
  font-weight: 400;
  color: #ec1f2a;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -1px;
}

.hero-subtitle-main {
  font-family: var(--font-heading, sans-serif);
  font-size: 56px;
  font-weight: 400;
  color: #ffffff;
  margin: 8px 0 16px 0;
  line-height: 1.2;
}

.hero-subtitle-text {
  font-family: var(--font-body, sans-serif);
  font-size: 24px;
  font-weight: 300;
  color: #ffffff;
  margin: 0;
}

/* --- Events Gallery Section --- */
.events-gallery {
  background-color: transparent;
  padding: 80px 20px;
  color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-header {
  display: flex;
  align-items: center;
  margin-bottom: 60px;
}

.accent-bar {
  width: 18px;
  height: 60px;
  background-color: #ec1f2a;
  margin-right: 24px;
  flex-shrink: 0;
}

.section-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 52px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  line-height: 1;
}

.gallery-description {
  font-family: var(--font-body, sans-serif);
  font-size: 16px;
  line-height: 1.8;
  color: #d0d0d0;
  margin-bottom: 50px;
  max-width: 900px;
  text-align: left;
}

/* --- Events Grid --- */
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* --- Responsiveness --- */
@media (max-width: 1024px) {
  .hero-title { font-size: 56px; }
  .hero-subtitle-main { font-size: 42px; }
  .section-title { font-size: 42px; }

  .events-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .hero { height: 50vh; min-height: 350px; }
  .hero-title { font-size: 42px; }
  .hero-subtitle-main { font-size: 32px; }
  .section-title { font-size: 36px; }

  .events-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .hero-title { font-size: 32px; }
  .hero-subtitle-main { font-size: 24px; }
  .section-title { font-size: 28px; }
  .events-gallery { padding: 60px 20px; }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
