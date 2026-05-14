// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// 🔧 Handle GitHub Pages SPA Redirect
const ghRedirect = sessionStorage.getItem('gh-redirect')
if (ghRedirect) {
  sessionStorage.removeItem('gh-redirect')
  window.location.replace(ghRedirect)
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// ✅ Pastikan router siap dulu
router.isReady().then(() => {
  app.mount('#app')
})