// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/uts-vue3-SI20230032-suci/', // ← Penting untuk GitHub Pages deploy
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(), // ← Tailwind CSS v4 plugin
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})