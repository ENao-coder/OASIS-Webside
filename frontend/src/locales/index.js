import { createI18n } from 'vue-i18n'
import es from './es'
import en from './en'

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: localStorage.getItem('language') || 'es', // Default language
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
})

export default i18n
