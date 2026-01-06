import axios from 'axios'

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar token de autenticación si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Manejo de errores global
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const status = error.response.status

      if (status === 401) {
        // Solo cerrar sesión en errores 401 (no autorizado)
        localStorage.removeItem('auth_token')
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login'
        }
      }

      // Para otros errores, solo registrar en consola sin cerrar sesión
      console.error('Error en la petición:', {
        status: status,
        message: error.response.data?.message || error.message,
        data: error.response.data
      })
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor')
    } else {
      // Algo pasó al configurar la petición
      console.error('Error al configurar la petición:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
