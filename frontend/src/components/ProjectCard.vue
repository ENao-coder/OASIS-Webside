<template>
  <div class="project-card">
    <div class="card-image-wrapper">
      <img :src="project.image || fallbackImage" :alt="project.title" class="card-img" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ project.title }}</h3>
      <div class="card-info">
        <p class="card-text">
          <span class="label">Descripción:</span> {{ truncateText(project.description, 100) }}
        </p>
        <p class="card-text">
          <span class="label">Objetivo:</span> {{ truncateText(project.goal, 80) }}
        </p>
        <p class="card-text status-row">
          <span class="label">Estatus:</span>
          <span class="status-badge" :class="getStatusClass()">
            {{ project.status || 'Active' }}
          </span>
        </p>
      </div>
      <button class="participate-btn" @click="handleParticipate">Participar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.title && value.description
      }
    }
  },
  data() {
    return {
      fallbackImage: new URL('@/assets/resources/project-placeholder.jpg', import.meta.url).href
    }
  },
  methods: {
    handleParticipate() {
      // Usar el _id de MongoDB o id si existe
      const projectId = this.project._id || this.project.id
      this.$router.push({ name: 'project-detail', params: { id: projectId } })
    },
    getStatusClass() {
      if (!this.project.status) return 'active'
      const statusMap = {
        'Active': 'active',
        'Completed': 'completed',
        'On-hold': 'on-hold'
      }
      return statusMap[this.project.status] || 'active'
    },
    truncateText(text, maxLength) {
      if (!text) return ''
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    }
  }
}
</script>

<style scoped>
/* --- Project Card (Diseño Mejorado) --- */
.project-card {
  background-color: #202020;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #333;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  border-color: #444;
}

.card-image-wrapper {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 16px;
  overflow: hidden;
  background-color: #000;
  margin-bottom: 20px;
  border: none;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  opacity: 0.95;
}

.project-card:hover .card-img {
  transform: scale(1.05);
  opacity: 1;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  padding: 0 10px 10px 10px;
}

.card-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 28px;
  color: #ffffff;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.card-info {
  margin-bottom: 24px;
  width: 100%;
}

.card-text {
  font-family: var(--font-body, sans-serif);
  font-size: 15px;
  line-height: 1.6;
  color: #d0d0d0;
  margin: 8px 0;
}

.label {
  font-weight: 600;
  color: #ffffff;
  margin-right: 4px;
}

/* Estilos para las etiquetas de Estatus */
.status-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.status-badge.activo {
  background-color: #2ea44f;
}

.status-badge.finalizado {
  background-color: #0366d6;
}

.status-badge.active {
  background-color: #2ea44f;
}

.status-badge.completed {
  background-color: #0366d6;
}

.status-badge.on-hold {
  background-color: #ff9800;
}

/* Estilos del botón */
.participate-btn {
  background-color: #ec1f2a;
  color: #ffffff;
  border: none;
  padding: 14px 0;
  width: 100%;
  max-width: 280px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-top: auto;
  font-family: var(--font-body, sans-serif);
  box-shadow: 0 0 20px rgba(236, 31, 42, 0.4);
}

.participate-btn:hover {
  background-color: #ff2b38;
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(236, 31, 42, 0.6);
}

.participate-btn:active {
  transform: translateY(0);
}
</style>
