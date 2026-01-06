<script setup>
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppSidebar from './components/AppSidebar.vue'

const isSidebarOpen = ref(false)
const route = useRoute()

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="app">
    <AppSidebar :isOpen="isSidebarOpen" @close="closeSidebar" />
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter v-if="!isAdminRoute" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  padding-top: 104px; /* Space for fixed header (104px height) */
  flex: 1; /* Push footer to bottom */
}
</style>
