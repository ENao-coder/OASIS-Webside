import api from './api'

// Obtener todas las imágenes
export const getGalleryImages = async () => {
  try {
    const response = await api.get('/images')
    // El backend devuelve { ok: true, images: [...] }
    return response.data.images || response.data
  } catch (error) {
    console.error('Error al obtener imágenes:', error)
    throw error
  }
}

// Obtener imágenes por categoría (filtra en el frontend)
export const getImagesByCategory = async (category) => {
  try {
    const response = await api.get('/images')
    // Mapeo de categorías para compatibilidad
    const categoryMap = {
      exposicion: ['Conference', 'Popularization of Science'],
      viajes: ['Trips', 'Group Photos'],
    }

    // Filtrar por categoría
    const categories = categoryMap[category.toLowerCase()] || [category]
    const filteredImages = response.data.filter(
      (img) => img.category && categories.includes(img.category),
    )
    return filteredImages
  } catch (error) {
    console.error('Error al obtener imágenes por categoría:', error)
    throw error
  }
}

// Obtener una imagen por ID
export const getImageById = async (id) => {
  try {
    const response = await api.get(`/images/${id}`)
    // El backend devuelve { ok: true, image: {...} }
    return response.data.image || response.data
  } catch (error) {
    console.error('Error al obtener imagen:', error)
    throw error
  }
}

// Crear una nueva imagen (admin)
export const createImage = async (imageData) => {
  try {
    const response = await api.post('/images', imageData)
    // El backend devuelve { ok: true, result: { ...imagen } }
    return response.data.result || response.data
  } catch (error) {
    console.error('Error al crear imagen:', error)
    throw error
  }
}

// Actualizar una imagen (admin)
export const updateImage = async (id, imageData) => {
  try {
    const response = await api.put(`/images/${id}`, imageData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar imagen:', error)
    throw error
  }
}

// Eliminar una imagen (admin)
export const deleteImage = async (id) => {
  try {
    const response = await api.delete(`/images/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar imagen:', error)
    throw error
  }
}
