// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Dashboard - Silnventaris' }
    },
    {
      path: '/produk',
      name: 'produk',
      component: () => import('../views/ProdukView.vue'),
      meta: { title: 'Kelola Produk - Silnventaris' }
    },
    {
      path: '/produk/tambah',
      name: 'produk-tambah',
      component: () => import('../views/ProdukFormView.vue'),
      meta: { title: 'Tambah Produk - Silnventaris' }
    },
    {
      path: '/produk/:id/edit',
      name: 'produk-edit',
      component: () => import('../views/ProdukFormView.vue'),
      meta: { title: 'Edit Produk - Silnventaris' }
    },
    {
      path: '/riwayat',
      name: 'riwayat',
      component: () => import('../views/RiwayatView.vue'),
      meta: { title: 'Riwayat Stok - Silnventaris' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: '404 - Silnventaris' }
    }
  ],
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

// Update title halaman otomatis
router.afterEach((to) => {
  document.title = to.meta.title || 'Silnventaris'
})

export default router