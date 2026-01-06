import api from './api'

// Obtener todos los proyectos
export const getProjects = async () => {
  try {
    const response = await api.get('/projects')
    // El backend devuelve { ok: true, projects: [...] }
    return response.data.projects || response.data
  } catch (error) {
    console.error('Error al obtener proyectos:', error)
    throw error
  }
}

// Obtener un proyecto por ID
export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`)
    // El backend devuelve { ok: true, project: {...} }
    return response.data.project || response.data
  } catch (error) {
    console.error('Error al obtener proyecto:', error)
    throw error
  }
}

// Crear un nuevo proyecto (admin)
export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData)
    return response.data
  } catch (error) {
    console.error('Error al crear proyecto:', error)
    throw error
  }
}

// Actualizar un proyecto (admin)
export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar proyecto:', error)
    throw error
  }
}

// Eliminar un proyecto (admin)
export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar proyecto:', error)
    throw error
  }
}
