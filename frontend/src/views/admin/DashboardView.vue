<template>
  <div class="admin-dashboard">
    <!-- Background with animated particles effect -->
    <div class="background-animation"></div>

    <!-- Dashboard Container -->
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1 class="dashboard-title">Admin Dashboard</h1>
        <button class="btn-logout" @click="handleLogout">Cerrar Sesión</button>
      </div>

      <!-- Tab Navigation -->
      <div class="tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'projects' }"
          @click="activeTab = 'projects'"
        >
          Proyectos
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'events' }"
          @click="activeTab = 'events'"
        >
          Eventos
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'images' }"
          @click="activeTab = 'images'"
        >
          Imágenes
        </button>
      </div>

      <!-- Content Panels -->
      <div class="tab-content">
        <!-- Projects Panel -->
        <div v-if="activeTab === 'projects'" class="content-panel">
          <div class="panel-header">
            <h2 class="panel-title">Gestión de Proyectos</h2>
            <button class="btn-create" @click="openCreateModal('project')">
              + Crear Proyecto
            </button>
          </div>

          <!-- Projects Table -->
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in projects" :key="project.id">
                  <td>{{ project.id }}</td>
                  <td>{{ project.title }}</td>
                  <td>{{ formatDate(project.startDate) }}</td>
                  <td>{{ project.endDate ? formatDate(project.endDate) : 'N/A' }}</td>
                  <td>
                    <span class="status-badge" :class="getStatusClass(project.status)">
                      {{ project.status }}
                    </span>
                  </td>
                  <td class="actions">
                    <button class="btn-action edit" @click="editItem('project', project)">
                      Editar
                    </button>
                    <button class="btn-action delete" @click="deleteItem('project', project.id)">
                      Eliminar
                    </button>
                  </td>
                </tr>
                <tr v-if="projects.length === 0">
                  <td colspan="6" class="no-data">No hay proyectos registrados</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Events Panel -->
        <div v-if="activeTab === 'events'" class="content-panel">
          <div class="panel-header">
            <h2 class="panel-title">Gestión de Eventos</h2>
            <button class="btn-create" @click="openCreateModal('event')">
              + Crear Evento
            </button>
          </div>

          <!-- Events Table -->
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Ubicación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in events" :key="event.id">
                  <td>{{ event.id }}</td>
                  <td>{{ event.title }}</td>
                  <td>{{ formatDate(event.startDate) }}</td>
                  <td>{{ formatDate(event.endDate) }}</td>
                  <td>{{ event.location }}</td>
                  <td class="actions">
                    <button class="btn-action edit" @click="editItem('event', event)">
                      Editar
                    </button>
                    <button class="btn-action delete" @click="deleteItem('event', event.id)">
                      Eliminar
                    </button>
                  </td>
                </tr>
                <tr v-if="events.length === 0">
                  <td colspan="6" class="no-data">No hay eventos registrados</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Images Panel -->
        <div v-if="activeTab === 'images'" class="content-panel">
          <div class="panel-header">
            <h2 class="panel-title">Gestión de Imágenes</h2>
            <button class="btn-create" @click="openCreateModal('image')">
              + Subir Imagen
            </button>
          </div>

          <!-- Images Grid -->
          <div class="images-grid">
            <div v-for="image in images" :key="image.id" class="image-card">
              <img :src="image.url" :alt="image.title" class="image-preview" />
              <div class="image-info">
                <p class="image-alt">{{ image.title }}</p>
                <p class="image-category">{{ image.category }}</p>
                <p class="image-date">{{ formatDate(image.date) }}</p>
              </div>
              <div class="image-actions">
                <button class="btn-action edit" @click="editItem('image', image)">
                  Editar
                </button>
                <button class="btn-action delete" @click="deleteItem('image', image.id)">
                  Eliminar
                </button>
              </div>
            </div>
            <div v-if="images.length === 0" class="no-data">
              No hay imágenes registradas
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Create/Edit -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3 class="modal-title">{{ modalTitle }}</h3>

        <div class="modal-body">
          <!-- Project Form -->
          <form v-if="currentType === 'project'" @submit.prevent="saveItem">
            <div class="form-group">
              <label for="project-title">Título *</label>
              <input
                id="project-title"
                v-model="formData.title"
                type="text"
                placeholder="Título del proyecto"
                required
              />
            </div>

            <div class="form-group">
              <label for="project-description">Descripción *</label>
              <textarea
                id="project-description"
                v-model="formData.description"
                placeholder="Descripción del proyecto"
                rows="4"
                required
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="project-goal">Objetivo</label>
                <input
                  id="project-goal"
                  v-model="formData.goal"
                  type="text"
                  placeholder="Objetivo del proyecto"
                />
              </div>

              <div class="form-group">
                <label for="project-perfil">Perfil Requerido</label>
                <input
                  id="project-perfil"
                  v-model="formData.perfilRequired"
                  type="text"
                  placeholder="Ej: Estudiante de Ingeniería"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="project-start">Fecha Inicio *</label>
                <input
                  id="project-start"
                  v-model="formData.startDate"
                  type="date"
                  required
                />
              </div>

              <div class="form-group">
                <label for="project-end">Fecha Fin</label>
                <input
                  id="project-end"
                  v-model="formData.endDate"
                  type="date"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="project-status">Estado *</label>
                <select id="project-status" v-model="formData.status" required>
                  <option value="Active">Activo</option>
                  <option value="Completed">Completado</option>
                  <option value="On-hold">En espera</option>
                </select>
              </div>

              <div class="form-group">
                <label for="project-image">URL de Imagen</label>
                <input
                  id="project-image"
                  v-model="formData.image"
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>
          </form>

          <!-- Event Form -->
          <form v-if="currentType === 'event'" @submit.prevent="saveItem">
            <div class="form-group">
              <label for="event-title">Título *</label>
              <input
                id="event-title"
                v-model="formData.title"
                type="text"
                placeholder="Título del evento"
                required
              />
            </div>

            <div class="form-group">
              <label for="event-description">Descripción *</label>
              <textarea
                id="event-description"
                v-model="formData.description"
                placeholder="Descripción del evento"
                rows="4"
                required
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="event-start">Fecha Inicio *</label>
                <input
                  id="event-start"
                  v-model="formData.startDate"
                  type="date"
                  required
                />
              </div>

              <div class="form-group">
                <label for="event-end">Fecha Fin *</label>
                <input
                  id="event-end"
                  v-model="formData.endDate"
                  type="date"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="event-location">Ubicación *</label>
              <input
                id="event-location"
                v-model="formData.location"
                type="text"
                placeholder="Ubicación del evento"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="event-goal">Objetivo</label>
                <input
                  id="event-goal"
                  v-model="formData.goal"
                  type="text"
                  placeholder="Objetivo del evento"
                />
              </div>

              <div class="form-group">
                <label for="event-perfil">Perfil Requerido</label>
                <input
                  id="event-perfil"
                  v-model="formData.perfilRequired"
                  type="text"
                  placeholder="Ej: Estudiante de Ingeniería"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="event-image">URL de Imagen</label>
              <input
                id="event-image"
                v-model="formData.image"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </form>

          <!-- Image Form -->
          <form v-if="currentType === 'image'" @submit.prevent="saveItem">
            <div class="form-group">
              <label for="image-url">URL de Imagen *</label>
              <input
                id="image-url"
                v-model="formData.url"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </div>

            <div class="form-group">
              <label for="image-title">Título *</label>
              <input
                id="image-title"
                v-model="formData.title"
                type="text"
                placeholder="Título de la imagen"
                required
              />
            </div>

            <div class="form-group">
              <label for="image-description">Descripción</label>
              <textarea
                id="image-description"
                v-model="formData.description"
                placeholder="Descripción de la imagen"
                rows="3"
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="image-category">Categoría *</label>
                <select id="image-category" v-model="formData.category" required>
                  <option value="Conference">Conference</option>
                  <option value="Popularization of Science">Popularization of Science</option>
                  <option value="Trips">Trips</option>
                  <option value="Group Photos">Group Photos</option>
                </select>
              </div>

              <div class="form-group">
                <label for="image-date">Fecha</label>
                <input
                  id="image-date"
                  v-model="formData.date"
                  type="date"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="image-tags">Etiquetas (separadas por coma)</label>
              <input
                id="image-tags"
                v-model="formData.tagsString"
                type="text"
                placeholder="evento, conferencia, 2024"
              />
            </div>
          </form>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-cancel" @click="closeModal">Cancelar</button>
          <button type="button" class="btn-save" @click="saveItem">
            {{ isEditMode ? 'Actualizar' : 'Crear' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjects, createProject, updateProject, deleteProject } from '@/services/projectService'
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/services/eventService'
import { getGalleryImages, createImage, updateImage, deleteImage } from '@/services/galleryService'
import { logout } from '@/services/authService'

export default {
  name: 'DashboardView',
  data() {
    return {
      activeTab: 'projects',
      projects: [],
      events: [],
      images: [],
      showModal: false,
      isEditMode: false,
      currentType: '',
      currentItem: null,
      loading: false,
      formData: {
        title: '',
        description: '',
        goal: '',
        perfilRequired: '',
        startDate: '',
        endDate: '',
        location: '',
        status: 'Active',
        image: '',
        url: '',
        category: 'Conference',
        date: '',
        tagsString: ''
      }
    }
  },
  computed: {
    modalTitle() {
      const titles = {
        project: this.isEditMode ? 'Editar Proyecto' : 'Nuevo Proyecto',
        event: this.isEditMode ? 'Editar Evento' : 'Nuevo Evento',
        image: this.isEditMode ? 'Editar Imagen' : 'Subir Imagen'
      }
      return titles[this.currentType] || ''
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        // Cargar proyectos
        this.projects = await getProjects()

        // Cargar eventos
        this.events = await getEvents()

        // Cargar imágenes
        this.images = await getGalleryImages()
      } catch (error) {
        console.error('Error al cargar datos:', error)
        // Datos de fallback
        this.projects = []
        this.events = []
        this.images = []
      } finally {
        this.loading = false
      }
    },
    openCreateModal(type) {
      this.currentType = type
      this.isEditMode = false
      this.currentItem = null
      this.resetFormData()
      this.showModal = true
    },
    editItem(type, item) {
      this.currentType = type
      this.isEditMode = true
      this.currentItem = item
      this.populateFormData(item)
      this.showModal = true
    },
    async deleteItem(type, id) {
      if (!confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
        return
      }

      try {
        if (type === 'project') {
          await deleteProject(id)
          this.projects = this.projects.filter(p => p.id !== id)
        } else if (type === 'event') {
          await deleteEvent(id)
          this.events = this.events.filter(e => e.id !== id)
        } else if (type === 'image') {
          await deleteImage(id)
          this.images = this.images.filter(i => i.id !== id)
        }
        alert('Elemento eliminado exitosamente')
      } catch (error) {
        console.error('Error al eliminar:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Error desconocido'
        alert(`Error al eliminar el elemento:\n${errorMessage}`)
      }
    },
    closeModal() {
      this.showModal = false
      this.currentItem = null
      this.isEditMode = false
      this.currentType = ''
      this.resetFormData()
    },
    async saveItem() {
      try {
        if (this.currentType === 'project') {
          const projectData = {
            title: this.formData.title,
            description: this.formData.description,
            goal: this.formData.goal || null,
            perfilRequired: this.formData.perfilRequired || null,
            startDate: this.formData.startDate,
            endDate: this.formData.endDate || null,
            status: this.formData.status,
            image: this.formData.image || null
          }

          if (this.isEditMode) {
            await updateProject(this.currentItem.id, projectData)
            const index = this.projects.findIndex(p => p.id === this.currentItem.id)
            if (index !== -1) {
              this.projects[index] = { ...this.currentItem, ...projectData }
            }
          } else {
            const newProject = await createProject(projectData)
            this.projects.push(newProject)
          }
        } else if (this.currentType === 'event') {
          const eventData = {
            title: this.formData.title,
            description: this.formData.description,
            startDate: this.formData.startDate,
            endDate: this.formData.endDate,
            location: this.formData.location,
            goal: this.formData.goal || null,
            perfilRequired: this.formData.perfilRequired || null,
            image: this.formData.image || null
          }

          if (this.isEditMode) {
            await updateEvent(this.currentItem.id, eventData)
            const index = this.events.findIndex(e => e.id === this.currentItem.id)
            if (index !== -1) {
              this.events[index] = { ...this.currentItem, ...eventData }
            }
          } else {
            const newEvent = await createEvent(eventData)
            this.events.push(newEvent)
          }
        } else if (this.currentType === 'image') {
          const imageData = {
            url: this.formData.url,
            title: this.formData.title,
            description: this.formData.description || null,
            category: this.formData.category,
            date: this.formData.date || null,
            tags: this.formData.tagsString
              ? this.formData.tagsString.split(',').map(tag => tag.trim())
              : []
          }

          if (this.isEditMode) {
            await updateImage(this.currentItem.id, imageData)
            const index = this.images.findIndex(i => i.id === this.currentItem.id)
            if (index !== -1) {
              this.images[index] = { ...this.currentItem, ...imageData }
            }
          } else {
            const newImage = await createImage(imageData)
            this.images.push(newImage)
          }
        }

        alert(`${this.isEditMode ? 'Actualizado' : 'Creado'} exitosamente`)
        this.closeModal()
      } catch (error) {
        console.error('Error al guardar:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Error desconocido'
        alert(`Error al ${this.isEditMode ? 'actualizar' : 'crear'} el elemento:\n${errorMessage}`)
      }
    },
    resetFormData() {
      this.formData = {
        title: '',
        description: '',
        goal: '',
        perfilRequired: '',
        startDate: '',
        endDate: '',
        location: '',
        status: 'Active',
        image: '',
        url: '',
        category: 'Conference',
        date: '',
        tagsString: ''
      }
    },
    populateFormData(item) {
      if (this.currentType === 'project') {
        this.formData = {
          title: item.title || '',
          description: item.description || '',
          goal: item.goal || '',
          perfilRequired: item.perfilRequired || '',
          startDate: item.startDate || '',
          endDate: item.endDate || '',
          status: item.status || 'Active',
          image: item.image || '',
          location: '',
          url: '',
          category: 'Conference',
          date: '',
          tagsString: ''
        }
      } else if (this.currentType === 'event') {
        this.formData = {
          title: item.title || '',
          description: item.description || '',
          startDate: item.startDate || '',
          endDate: item.endDate || '',
          location: item.location || '',
          goal: item.goal || '',
          perfilRequired: item.perfilRequired || '',
          image: item.image || '',
          status: 'Active',
          url: '',
          category: 'Conference',
          date: '',
          tagsString: ''
        }
      } else if (this.currentType === 'image') {
        this.formData = {
          url: item.url || '',
          title: item.title || '',
          description: item.description || '',
          category: item.category || 'Conference',
          date: item.date || '',
          tagsString: Array.isArray(item.tags) ? item.tags.join(', ') : '',
          goal: '',
          perfilRequired: '',
          startDate: '',
          endDate: '',
          location: '',
          status: 'Active',
          image: ''
        }
      }
    },
    async handleLogout() {
      try {
        await logout()
        this.$router.push('/admin/login')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        this.$router.push('/admin/login')
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
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
.admin-dashboard {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1f0a 0%, #1a3d1a 50%, #0d260d 100%);
  padding: 40px 20px;
}

/* --- Static Background --- */
.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(0, 255, 0, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 0, 100, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.1) 0%, transparent 50%);
  z-index: 0;
}

/* --- Dashboard Container --- */
.dashboard-container {
  position: relative;
  z-index: 5;
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(26, 60, 26, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

/* --- Dashboard Header --- */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.dashboard-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 42px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.btn-logout {
  background-color: rgba(236, 31, 42, 0.8);
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background-color: #ec1f2a;
  transform: translateY(-2px);
}

/* --- Tabs --- */
.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.tab-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-family: var(--font-body, sans-serif);
}

.tab-btn:hover {
  color: rgba(255, 255, 255, 0.9);
}

.tab-btn.active {
  color: #ffffff;
  border-bottom-color: #ec1f2a;
}

/* --- Content Panel --- */
.content-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.panel-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
}

.btn-create {
  background-color: #ec1f2a;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-create:hover {
  background-color: #ff2b38;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(236, 31, 42, 0.4);
}

/* --- Table --- */
.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

.data-table thead {
  background: rgba(236, 31, 42, 0.2);
}

.data-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid rgba(236, 31, 42, 0.5);
}

.data-table td {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.data-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* --- Status Badges --- */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background-color: rgba(0, 200, 83, 0.2);
  color: #69f0ae;
  border: 1px solid #00c853;
}

.status-badge.completed {
  background-color: rgba(33, 150, 243, 0.2);
  color: #64b5f6;
  border: 1px solid #2196f3;
}

.status-badge.on-hold {
  background-color: rgba(255, 152, 0, 0.2);
  color: #ffb74d;
  border: 1px solid #ff9800;
}

/* --- Action Buttons --- */
.actions {
  display: flex;
  gap: 8px;
}

.btn-action {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-action.edit {
  background-color: rgba(33, 150, 243, 0.2);
  color: #64b5f6;
  border: 1px solid #2196f3;
}

.btn-action.edit:hover {
  background-color: rgba(33, 150, 243, 0.4);
}

.btn-action.delete {
  background-color: rgba(236, 31, 42, 0.2);
  color: #ff6b6b;
  border: 1px solid #ec1f2a;
}

.btn-action.delete:hover {
  background-color: rgba(236, 31, 42, 0.4);
}

/* --- Images Grid --- */
.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.image-card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.image-card:hover {
  transform: translateY(-4px);
}

.image-preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.image-category {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin: 0 0 4px 0;
  text-transform: capitalize;
}

.image-date {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  margin: 0;
}image-alt {
  color: #ffffff;
  font-weight: 600;
  margin: 0 0 8px 0;
  font-size: 14px;
}

.image-category {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin: 0;
  text-transform: uppercase;
}

.image-actions {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* --- Modal --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: rgba(26, 60, 26, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.modal-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 30px 0;
}

.modal-body {
  margin-bottom: 30px;
}

/* --- Form Styles --- */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 12px 16px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #ec1f2a;
  background: rgba(0, 0, 0, 0.4);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.modal-placeholder {
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 60px 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-save {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background-color: rgba(158, 158, 158, 0.2);
  color: #bdbdbd;
  border: 1px solid #9e9e9e;
}

.btn-cancel:hover {
  background-color: rgba(158, 158, 158, 0.4);
}

.btn-save {
  background-color: #ec1f2a;
  color: #ffffff;
}

.btn-save:hover {
  background-color: #ff2b38;
  box-shadow: 0 4px 12px rgba(236, 31, 42, 0.4);
}

/* --- Responsiveness --- */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 20px;
  }

  .dashboard-title {
    font-size: 32px;
  }

  .tabs {
    overflow-x: auto;
  }

  .tab-btn {
    padding: 12px 20px;
    font-size: 16px;
    white-space: nowrap;
  }

  .panel-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .table-wrapper {
    font-size: 14px;
  }

  .data-table th,
  .data-table td {
    padding: 12px 8px;
  }

  .images-grid {
    grid-template-columns: 1fr;
  }
}
</style>
