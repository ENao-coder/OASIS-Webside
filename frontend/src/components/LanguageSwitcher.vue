<template>
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
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('language', lang)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.2s;
  font-family: var(--font-body);
}

.lang-btn:hover {
  color: #ffffff;
}

.lang-btn.active {
  color: #ec1f2a;
}

.separator {
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
}
</style>
