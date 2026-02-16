<template>
  <div>
    <div class="sidebar-overlay" :class="{ active: isOpen }" @click="closeSidebar"></div>

    <aside class="sidebar" :class="{ active: isOpen }">
      <nav class="sidebar-nav">
        <router-link to="/" class="sidebar-item" @click="closeSidebar">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>{{ $t('nav.home') }}</span>
        </router-link>

        <router-link to="/galeria" class="sidebar-item" @click="closeSidebar">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
            />
          </svg>
          <span>{{ $t('nav.gallery') }}</span>
        </router-link>

        <router-link to="/proyectos" class="sidebar-item" @click="closeSidebar">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
            />
          </svg>
          <span>{{ $t('nav.projects') }}</span>
        </router-link>

        <router-link to="/eventos" class="sidebar-item" @click="closeSidebar">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
            />
          </svg>
          <span>{{ $t('nav.events') }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="language-switcher">
          <button
            @click="changeLanguage('es')"
            :class="{ active: currentLocale === 'es' }"
            class="lang-btn"
          >
            ES
          </button>
          <span class="separator">|</span>
          <button
            @click="changeLanguage('en')"
            :class="{ active: currentLocale === 'en' }"
            class="lang-btn"
          >
            EN
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
  name: 'AppSidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { locale } = useI18n()
    const currentLocale = computed(() => locale.value)

    const changeLanguage = (lang) => {
      locale.value = lang
      localStorage.setItem('language', lang)
    }

    const closeSidebar = () => {
      emit('close')
    }

    return {
      currentLocale,
      changeLanguage,
      closeSidebar,
    }
  },
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1998;
}

.sidebar-overlay.active {
  opacity: 1;
  visibility: visible;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100vh;
  background: linear-gradient(180deg, #5a3f3f 0%, #4a2f2f 100%);
  z-index: 1999;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
}

.sidebar.active {
  left: 0;
}

.sidebar-nav {
  flex: 1;
  padding: 80px 0 20px;
  overflow-y: auto;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 40px;
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
  transition: all 0.2s ease;
  cursor: pointer;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.1);
  padding-left: 50px;
}

.sidebar-item.router-link-active {
  background: rgba(236, 31, 42, 0.2);
  border-left: 4px solid #ec1f2a;
}

.icon {
  width: 28px;
  height: 28px;
  color: #ffffff;
  flex-shrink: 0;
}

.sidebar-item span {
  font-family: var(--font-body);
}

.sidebar-footer {
  padding: 24px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.language-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.lang-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.2s;
  font-family: var(--font-body);
  border-radius: 4px;
}

.lang-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.lang-btn.active {
  color: #ec1f2a;
  background: rgba(236, 31, 42, 0.2);
}

.separator {
  color: rgba(255, 255, 255, 0.3);
  font-size: 16px;
}

/* Scrollbar */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
