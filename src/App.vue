<!-- src/App.vue -->
<template>
<div id="app" class="min-h-screen">
    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-64 bg-[#0C1E4B] text-white transition-transform duration-300 ease-in-out"
      :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <Package class="h-6 w-6 text-[#0C1E4B]" />
        </div>
        <div>
          <h1 class="text-lg font-bold leading-tight">Silnventaris</h1>
          <p class="text-[10px] text-white/60 uppercase tracking-wider">SME Inventory</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="px-3 py-4 space-y-1">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
          :class="[
            route.path === item.path 
              ? 'bg-white text-[#0C1E4B] shadow-lg' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
          ]"
          @click="isSidebarOpen = false"
        >
          <component :is="item.icon" class="h-5 w-5" />
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Sidebar Footer -->
      <div class="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-white/10">
        <p class="text-xs text-white/40 text-center">
          &copy; 2026 Silnventaris
        </p>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="lg:ml-64 min-h-screen flex flex-col">
      <!-- Top Header -->
      <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div class="flex items-center justify-between px-6 py-4">
          <!-- Mobile menu button -->
          <button 
            @click="isSidebarOpen = !isSidebarOpen"
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu v-if="!isSidebarOpen" class="h-5 w-5" />
            <X v-else class="h-5 w-5" />
          </button>

          <!-- Page Title (Dynamic) -->
          <div class="hidden lg:block">
            <h2 class="text-lg font-semibold text-[#0C1E4B]">{{ pageTitle }}</h2>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">
            <Button 
              as-child 
              class="bg-[#0C1E4B] hover:bg-[#162D6B] text-white rounded-lg px-4"
            >
              <!-- <RouterLink to="/produk/tambah">
                <Plus class="mr-2 h-4 w-4" />
                Tambah Produk
              </RouterLink> -->
            </Button>
          </div>
        </div>
      </header>

      <!-- Overlay for mobile -->
      <div 
        v-show="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      />

      <!-- Router View -->
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>

    <!-- Global Alert/Toast -->
    <AppAlert 
      v-model="alertState"
      :duration="4000"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useInventoryStore } from '@/stores/inventory'

import { Button } from '@/components/ui/button'
import AppAlert from '@/components/ui/AppAlert.vue'
import { 
  Package, LayoutDashboard, PackageSearch, History, 
  Menu, X, Plus
} from 'lucide-vue-next'

const route = useRoute()
const inventoryStore = useInventoryStore()
const { alertMessage, alertType } = storeToRefs(inventoryStore)

const alertState = ref({ type: 'info', message: '' })
const isSidebarOpen = ref(false)

watch(
  () => alertMessage.value,
  (newMsg) => {
    if (newMsg) {
      alertState.value = { type: alertType.value, message: newMsg }
    }
  }
)

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/produk', label: 'Daftar Produk', icon: PackageSearch },
  { path: '/riwayat', label: 'Transaksi', icon: History },
]

const pageTitle = computed(() => {
  const titles = {
    home: 'Dashboard',
    produk: 'Daftar Produk',
    'produk-tambah': 'Tambah Produk Baru',
    'produk-edit': 'Edit Produk',
    riwayat: 'Riwayat Transaksi',
  }
  return titles[route.name] || 'Silnventaris'
})
</script>

<style>
#app {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>