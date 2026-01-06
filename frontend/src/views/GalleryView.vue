<template>
  <div class="gallery">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Explora Nuestra</h1>
        <h2 class="hero-subtitle-main">Galería</h2>
        <p class="hero-subtitle-text">Momentos, Eventos y Experiencias</p>
      </div>
    </section>

    <!-- Gallery Content -->
    <section class="gallery-content">
      <div class="container">
        <!-- Galería Header -->
        <div class="gallery-header">
          <div class="accent-bar"></div>
          <h1 class="gallery-title">Galería</h1>
        </div>

        <!-- Exposición Section -->
        <div class="gallery-section">
          <h2 class="section-title">Exposición</h2>
          <div class="section-divider"></div>

          <div class="images-grid">
            <div
              v-for="image in exposicionImages"
              :key="image.id"
              class="gallery-image-wrapper"
              @click="openImage(image)"
            >
              <img :src="image.url" :alt="image.title" class="gallery-img" />
            </div>
          </div>
        </div>

        <!-- Viajes Section -->
        <div class="gallery-section">
          <h2 class="section-title">Viajes</h2>
          <div class="section-divider"></div>

          <div class="images-grid">
            <div
              v-for="image in viajesImages"
              :key="image.id"
              class="gallery-image-wrapper"
              @click="openImage(image)"
            >
              <img :src="image.url" :alt="image.title" class="gallery-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getImagesByCategory } from '@/services/galleryService'

export default {
  name: 'GalleryView',
  data() {
    return {
      exposicionImages: [],
      viajesImages: [],
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.loadGalleryImages()
  },
  methods: {
    async loadGalleryImages() {
      this.loading = true
      this.error = null
      try {
        // Cargar imágenes de exposición
        const exposicionData = await getImagesByCategory('exposicion')
        this.exposicionImages = exposicionData

        // Cargar imágenes de viajes
        const viajesData = await getImagesByCategory('viajes')
        this.viajesImages = viajesData
      } catch (error) {
        this.error = 'Error al cargar las imágenes'
        console.error('Error loading gallery images:', error)
        // Fallback a datos de ejemplo si falla la API
        this.exposicionImages = [
          {
            id: 1,
            url: new URL('@/assets/resources/exposicion-1.jpg', import.meta.url).href,
            title: 'Exposición 1',
            category: 'Conference'
          }
        ]
        this.viajesImages = [
          {
            id: 1,
            url: new URL('@/assets/resources/viajes-1.jpg', import.meta.url).href,
            title: 'Viaje 1',
            category: 'Trips'
          }
        ]
      } finally {
        this.loading = false
      }
    },
    openImage(image) {
      // Aquí puedes agregar lógica para abrir la imagen en un modal o lightbox
      console.log('Abrir imagen:', image)
    }
  }
}
</script>

<style scoped>
/* --- Base Layout --- */
.gallery {
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

/* --- Gallery Content --- */
.gallery-content {
  background-color: #1a1a1a;
  padding: 60px 20px;
  color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* --- Gallery Header --- */
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

.gallery-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 52px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  line-height: 1;
}

/* --- Gallery Sections --- */
.gallery-section {
  margin-bottom: 80px;
}

.section-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 32px;
  font-weight: 400;
  color: #ffffff;
  margin: 0 0 16px 0;
}

.section-divider {
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    #0099ff 0%,
    rgba(0, 153, 255, 0.5) 50%,
    rgba(0, 153, 255, 0) 100%
  );
  margin-bottom: 40px;
}

/* --- Images Grid --- */
.images-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.gallery-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: #000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.gallery-image-wrapper:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-image-wrapper:hover .gallery-img {
  transform: scale(1.1);
}

/* --- Responsiveness --- */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 56px;
  }

  .hero-subtitle-main {
    font-size: 42px;
  }

  .hero-subtitle-text {
    font-size: 20px;
  }

  .gallery-title {
    font-size: 42px;
  }

  .section-title {
    font-size: 28px;
  }

  .images-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .hero {
    height: 50vh;
    min-height: 350px;
  }

  .hero-title {
    font-size: 42px;
  }

  .hero-subtitle-main {
    font-size: 32px;
  }

  .hero-subtitle-text {
    font-size: 18px;
  }

  .gallery-title {
    font-size: 36px;
  }

  .section-title {
    font-size: 24px;
  }

  .accent-bar {
    height: 50px;
    width: 14px;
    margin-right: 16px;
  }

  .gallery-content {
    padding: 40px 20px;
  }

  .gallery-header {
    margin-bottom: 40px;
  }

  .gallery-section {
    margin-bottom: 60px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle-main {
    font-size: 24px;
  }

  .hero-subtitle-text {
    font-size: 16px;
  }

  .gallery-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 20px;
  }

  .images-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
