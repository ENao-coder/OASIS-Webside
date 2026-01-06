import api from './api'

// Login de administrador
export const login = async (credentials) => {
  try {
    const response = await api.post('/admins/login', credentials)
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token)
    }
    return response.data
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    throw error
  }
}

// Registro de administrador
export const register = async (userData) => {
  try {
    const response = await api.post('/admins/register', userData)
    return response.data
  } catch (error) {
    console.error('Error al registrarse:', error)
    throw error
  }
}

// Logout de administrador
export const logout = async () => {
  try {
    await api.post('/admins/logout')
    localStorage.removeItem('auth_token')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    // Eliminar token incluso si falla la petición
    localStorage.removeItem('auth_token')
    throw error
  }
}

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token')
}

// Obtener admin por ID
export const getAdminById = async (id) => {
  try {
    const response = await api.get(`/admins/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al obtener admin:', error)
    throw error
  }
}

// Actualizar admin
export const updateAdmin = async (id, adminData) => {
  try {
    const response = await api.put(`/admins/${id}`, adminData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar admin:', error)
    throw error
  }
}

// Eliminar admin
export const deleteAdmin = async (id) => {
  try {
    const response = await api.delete(`/admins/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar admin:', error)
    throw error
  }
}
