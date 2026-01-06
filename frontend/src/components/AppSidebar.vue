<template>
  <div>
    <div class="sidebar-overlay" :class="{ active: isOpen }" @click="closeSidebar"></div>

    <aside class="sidebar" :class="{ active: isOpen }">
    <nav class="sidebar-nav">
      <router-link to="/" class="sidebar-item" @click="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span>{{ $t('nav.home') }}</span>
      </router-link>

      <router-link to="/galeria" class="sidebar-item" @click="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
        <span>{{ $t('nav.gallery') }}</span>
      </router-link>

      <router-link to="/proyectos" class="sidebar-item" @click="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
        <span>{{ $t('nav.projects') }}</span>
      </router-link>

      <router-link to="/eventos" class="sidebar-item" @click="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
        </svg>
        <span>{{ $t('nav.events') }}</span>
      </router-link>

      <a href="#" class="sidebar-item" @click.prevent="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
        </svg>
        <span>Option 6</span>
      </a>

      <a href="#" class="sidebar-item" @click.prevent="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
        <span>Option 7</span>
      </a>

      <a href="#" class="sidebar-item" @click.prevent="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <span>Option 8</span>
      </a>

      <a href="#" class="sidebar-item" @click.prevent="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
        <span>Option 9</span>
      </a>

      <a href="#" class="sidebar-item" @click.prevent="closeSidebar">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
        </svg>
        <span>Option 10</span>
      </a>
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
      default: false
    }
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
      closeSidebar
    }
  }
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
