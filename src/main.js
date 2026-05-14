// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// ✅ Handle GitHub Pages SPA redirect TANPA reload browser
router.isReady().then(() => {
  const savedUrl = sessionStorage.getItem('gh-redirect')
  if (savedUrl) {
    sessionStorage.removeItem('gh-redirect')
    try {
      const url = new URL(savedUrl)
      // Hapus base path GitHub Pages dari pathname
      let path = url.pathname.replace('/uts-vue3-SI20230032-suci', '') || '/'
      const query = Object.fromEntries(url.searchParams)
      
      // Navigasi halus di dalam SPA
      router.replace({ path, query })
    } catch (e) {
      console.warn('Gagal parse redirect URL:', e)
    }
  }
  // Mount app setelah router siap & redirect ditangani
  app.mount('#app')
})