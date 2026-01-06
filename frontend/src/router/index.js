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
      meta: { requiresAuth: true }, // Will implement auth guard later
    },
  ],
})

export default router
