<template>
  <div class="project-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <p>Cargando proyecto...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
    </div>

    <!-- Project Content -->
    <template v-else-if="project">
      <!-- Hero Banner -->
      <section class="hero-banner">
        <img :src="project.image || fallbackBanner" :alt="project.title" class="banner-img" />
        <div class="banner-overlay"></div>
      </section>

      <!-- Project Content -->
      <section class="project-content">
        <div class="container">
          <div class="content-header">
            <div class="title-wrapper">
              <div class="accent-bar"></div>
              <h1 class="project-title">{{ project.title }}</h1>
            </div>
            <button class="register-btn">Inscríbete</button>
          </div>

          <!-- Descripción -->
          <div class="section">
            <h2 class="section-title">Descripción:</h2>
            <p class="section-text">{{ project.description }}</p>
          </div>

          <!-- Objetivo -->
          <div class="section">
            <h2 class="section-title">Objetivo:</h2>
            <p class="section-text">{{ project.goal }}</p>
          </div>

          <!-- Perfil requerido -->
          <div class="section">
            <h2 class="section-title">Perfil requerido:</h2>
            <p class="section-text">{{ project.perfilRequired }}</p>
          </div>

          <!-- Fechas -->
          <div class="section">
            <h2 class="section-title">Fechas:</h2>
            <p class="section-text">
              <strong>Inicio:</strong> {{ formatDate(project.startDate) }}<br>
              <strong>Fin:</strong> {{ formatDate(project.endDate) || 'No especificada' }}
            </p>
          </div>

          <!-- Estado -->
          <div class="section">
            <h2 class="section-title">Estado:</h2>
            <p class="section-text">
              <span class="status-badge" :class="getStatusClass(project.status)">
                {{ project.status }}
              </span>
            </p>
          </div>

          <!-- Project Image -->
          <div class="project-image-wrapper" v-if="project.image">
            <img :src="project.image" :alt="project.title" class="project-img" />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { getProjectById } from '@/services/projectService'

export default {
  name: 'ProjectDetailView',
  data() {
    return {
      project: null,
      loading: false,
      error: null,
      fallbackBanner: new URL('@/assets/resources/project-banner.jpg', import.meta.url).href
    }
  },
  async mounted() {
    await this.loadProject()
  },
  methods: {
    async loadProject() {
      this.loading = true
      this.error = null
      try {
        const projectId = this.$route.params.id
        const data = await getProjectById(projectId)
        this.project = data
      } catch (err) {
        console.error('Error al cargar el proyecto:', err)
        this.error = 'No se pudo cargar el proyecto'
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    getStatusClass(status) {
      const statusMap = {
        'Active': 'active',
        'Completed': 'completed',
        'On-hold': 'on-hold'
      }
      return statusMap[status] || 'active'
    }
  }
}
</script>

<style scoped>
/* --- Base Layout --- */
.project-detail {
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

/* --- Project Content --- */
.project-content {
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

.project-title {
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
  font-weight: 600;
  color: #ec1f2a;
  margin-bottom: 16px;
}

.section-text {
  font-family: var(--font-body, sans-serif);
  font-size: 18px;
  line-height: 1.8;
  color: #d0d0d0;
  margin: 0;
}

/* --- Status Badge --- */
.status-badge {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.active {
  background-color: rgba(46, 213, 115, 0.2);
  color: #2ed573;
  border: 2px solid #2ed573;
}

.status-badge.completed {
  background-color: rgba(52, 152, 219, 0.2);
  color: #3498db;
  border: 2px solid #3498db;
}

.status-badge.on-hold {
  background-color: rgba(241, 196, 15, 0.2);
  color: #f1c40f;
  border: 2px solid #f1c40f;
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

/* --- Project Image --- */
.project-image-wrapper {
  margin-top: 60px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.project-img {
  width: 100%;
  height: auto;
  display: block;
}

/* --- Responsiveness --- */
@media (max-width: 1024px) {
  .project-title {
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

  .project-title {
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
  .project-title {
    font-size: 28px;
  }

  .hero-banner {
    height: 250px;
  }

  .project-content {
    padding: 40px 20px;
  }

  .content-header {
    margin-bottom: 40px;
  }
}
</style>
