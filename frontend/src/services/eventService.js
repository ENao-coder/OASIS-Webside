import api from './api'

// Obtener todos los eventos
export const getEvents = async () => {
  try {
    const response = await api.get('/events')
    // El backend devuelve { ok: true, events: [...] }
    return response.data.events || response.data
  } catch (error) {
    console.error('Error al obtener eventos:', error)
    throw error
  }
}

// Obtener un evento por ID
export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`)
    // El backend devuelve { ok: true, event: {...} }
    return response.data.event || response.data
  } catch (error) {
    console.error('Error al obtener evento:', error)
    throw error
  }
}

// Crear un nuevo evento (admin)
export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events', eventData)
    // El backend devuelve { ok: true, result: { ...evento } }
    return response.data.result || response.data
  } catch (error) {
    console.error('Error al crear evento:', error)
    throw error
  }
}

// Actualizar un evento (admin)
export const updateEvent = async (id, eventData) => {
  try {
    const response = await api.put(`/events/${id}`, eventData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar evento:', error)
    throw error
  }
}

// Eliminar un evento (admin)
export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar evento:', error)
    throw error
  }
}
