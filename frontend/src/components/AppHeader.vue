<template>
  <header class="site-header">
    <div class="left-section">
      <button
        class="menu-btn"
        aria-label="Open Menu"
        @click="$emit('toggle-sidebar')"
        v-if="!isAdminRoute"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12H21"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 6H21"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 18H21"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="logo-container">
        <router-link to="/">
          <img class="logo" alt="OASIS Student Chapter" :src="logoSrc" />
        </router-link>
      </div>
    </div>

    <div class="right-section" :class="{ 'admin-right-section': isAdminRoute }">
      <nav class="nav-links" v-if="!isAdminRoute">
        <router-link to="/" class="nav-item">{{ $t('nav.home') }}</router-link>
        <router-link to="/galeria" class="nav-item">{{ $t('nav.gallery') }}</router-link>
        <router-link to="/proyectos" class="nav-item">{{ $t('nav.projects') }}</router-link>
        <router-link to="/eventos" class="nav-item">{{ $t('nav.events') }}</router-link>
      </nav>

      <button class="cta-button" @click="handleCtaClick">
        {{ isAdminRoute ? 'Regresar a página principal' : $t('nav.joinTeam') }}
      </button>
    </div>
  </header>
</template>

<script>
import LogoWeb from '@/assets/resources/LogoWeb.jpg'

export default {
  name: 'AppHeader',
  data() {
    return {
      logoSrc: LogoWeb,
    }
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith('/admin')
    },
  },
  methods: {
    handleCtaClick() {
      if (this.isAdminRoute) {
        this.$router.push('/')
      }
      // Si no es admin route, no hace nada (puedes agregar lógica aquí)
    },
  },
}
</script>

<style scoped>
/* Main Header Container */
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 104px;
  padding: 0 40px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  font-family: var(--font-body);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* Left Section Grouping */
.left-section {
  display: flex;
  align-items: center;
  gap: 24px;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.menu-btn:hover {
  opacity: 0.7;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 55px;
  width: auto;
  object-fit: contain;
}

/* Right Section Grouping */
.right-section {
  display: flex;
  align-items: center;
  gap: 60px;
}

.admin-right-section {
  margin-left: auto;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 40px;
  align-items: center;
}

.nav-item {
  color: #ffffff;
  text-decoration: none;
  font-size: 22px;
  font-weight: 400;
  transition: color 0.2s;
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #ec1f2a;
  transition: width 0.3s;
}

.nav-item:hover {
  color: #ffffff;
}

.nav-item:hover::after,
.nav-item.router-link-active::after {
  width: 100%;
}

/* CTA Button */
.cta-button {
  background-color: #ec1f2a;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  white-space: nowrap;
  border-radius: 6px;
}

.cta-button:hover {
  background-color: #d11b24;
  transform: translateY(-1px);
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .site-header {
    padding: 0 20px;
  }

  .right-section {
    gap: 20px;
  }
}
</style>
