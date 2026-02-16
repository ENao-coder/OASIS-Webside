import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public Routes
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/galeria',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue'),
    },
    {
      path: '/proyectos',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/proyectos/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue'),
    },
    {
      path: '/eventos',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
    },
    {
      path: '/eventos/:id',
      name: 'event-detail',
      component: () => import('../views/EventDetailView.vue'),
    },

    // Admin Routes
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginView.vue'),
    },
    {
      path: '/admin/register',
      name: 'admin-register',
      component: () => import('../views/admin/RegisterView.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

//Navegación protegida para rutas de admin
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // Solo obtener el usuario si la ruta requiere autenticación
  if (requiresAuth) {
    const getCurrentUser = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${apiUrl}/auth/session`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        if (response.ok) return await response.json() // Retorna el usuario
        return null
      } catch (error) {
        console.error('Error al obtener el usuario:', error)
        return null
      }
    }
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      next('/admin/login')
    } else if (to.path === '/admin/login' || to.path === '/admin/register') {
      next('/admin/dashboard')
    } else {
      next()
    }
  } else {
    // Si el usuario ya está autenticado y trata de ir a login o register, redirigirlo al dashboard
    if (to.path === '/admin/login' || to.path === '/admin/register') {
      const getCurrentUser = async () => {
        try {
          const token = localStorage.getItem('auth_token')
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
          const response = await fetch(`${apiUrl}/auth/session`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          })
          if (response.ok) return await response.json()
          return null
        } catch (error) {
          return null
        }
      }
      const currentUser = await getCurrentUser()
      if (currentUser) {
        next('/admin/dashboard')
        return
      }
    }
    next()
  }
})

export default router
