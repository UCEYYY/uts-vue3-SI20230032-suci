<!-- src/views/HomeView.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#0C1E4B]">Ringkasan Inventaris</h1>
        <p class="text-gray-500 mt-1 text-sm">
          Selamat datang kembali, pantau performa stok Anda hari ini.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <!--  -->
        <Button as-child class="bg-[#0C1E4B] hover:bg-[#162D6B] text-white rounded-lg">
          <RouterLink :to="{ name: 'produk-tambah' }">
            <Plus class="mr-2 h-4 w-4" />
            Tambah Produk
          </RouterLink>
        </Button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Total Produk -->
      <Card class="border-none shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
        <CardContent class="p-6">
          <div class="flex items-start justify-between">
            <div class="space-y-2">
              <p class="text-sm text-gray-500 uppercase tracking-wide">Total Produk</p>
              <p class="text-3xl font-bold text-[#0C1E4B]">{{ stats.totalProduk }}</p>
              <p class="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp class="h-3 w-3" />
                +12 bulan ini
              </p>
            </div>
            <div class="w-12 h-12 bg-[#1E3A8A] rounded-xl flex items-center justify-center">
              <Package class="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Stok Rendah -->
      <Card class="border-none shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
        <CardContent class="p-6">
          <div class="flex items-start justify-between">
            <div class="space-y-2">
              <p class="text-sm text-gray-500 uppercase tracking-wide">Stok Rendah</p>
              <p class="text-3xl font-bold text-red-600">{{ stats.stokMenipis }}</p>
              <p class="text-xs text-amber-600 flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded-full w-fit">
                <AlertTriangle class="h-3 w-3" />
                Perlu Tindakan
              </p>
            </div>
            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle class="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Nilai Aset -->
      <Card class="border-none shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
        <CardContent class="p-6">
          <div class="flex items-start justify-between">
            <div class="space-y-2">
              <p class="text-sm text-gray-500 uppercase tracking-wide">Total Nilai Aset</p>
              <p class="text-2xl font-bold text-[#0C1E4B]">{{ formatRupiah(stats.nilaiInventory) }}</p>
              <p class="text-xs text-gray-400 italic">Estimasi nilai pasar</p>
            </div>
            <div class="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center">
              <Banknote class="h-6 w-6 text-emerald-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Warning & Recent Activity Grid -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Peringatan Stok -->
      <Card class="border-none shadow-sm rounded-xl overflow-hidden">
        <CardHeader class="flex flex-row items-center justify-between pb-4">
          <CardTitle class="text-lg font-semibold">Peringatan Stok</CardTitle>
          <Button variant="link" class="text-[#0C1E4B] font-semibold" @click="filterLowStock">
            Lihat Semua
          </Button>
        </CardHeader>
        <CardContent class="pt-0">
          <div class="space-y-4">
            <div 
              v-for="product in inventoryStore.lowStockProducts.slice(0, 3)" 
              :key="product.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Package class="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p class="font-semibold text-sm">{{ product.name }}</p>
                  <p class="text-xs text-gray-500">{{ product.stock }} Sisa</p>
                </div>
              </div>
              <Badge :class="product.stock <= 3 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'" class="text-xs px-3 py-1 rounded-full border-0">
                {{ product.stock <= 3 ? 'KRITIS' : 'RENDAH' }}
              </Badge>
            </div>
            <div v-if="inventoryStore.lowStockProducts.length === 0" class="text-center py-8 text-gray-400">
              <CheckCircle class="h-10 w-10 mx-auto mb-2 text-green-300" />
              <p class="text-sm">Semua stok aman! 🎉</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Aktivitas Terakhir -->
      <Card class="border-none shadow-sm rounded-xl overflow-hidden">
        <CardHeader class="flex flex-row items-center justify-between pb-4">
          <CardTitle class="text-lg font-semibold">Aktivitas Terakhir</CardTitle>
          <Button variant="link" class="text-[#0C1E4B] font-semibold" as-child>
            <RouterLink to="/riwayat">Lihat Semua</RouterLink>
          </Button>
        </CardHeader>
        <CardContent class="pt-0">
          <div class="space-y-3">
            <div 
              v-for="item in inventoryStore.recentHistory.slice(0, 4)" 
              :key="item.id"
              class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  item.type === 'in' ? 'bg-green-100 text-green-600' : 
                  item.type === 'out' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                ]">
                  <ArrowUp v-if="item.type === 'in'" class="h-4 w-4" />
                  <ArrowDown v-else-if="item.type === 'out'" class="h-4 w-4" />
                  <Trash2 v-else class="h-4 w-4" />
                </div>
                <div>
                  <p class="font-semibold text-sm">{{ item.productName }}</p>
                  <p class="text-xs text-gray-400">{{ item.note }}</p>
                </div>
              </div>
              <div class="text-right">
                <span :class="[
                  'font-bold text-sm',
                  item.type === 'in' ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ item.type === 'in' ? '+' : '-' }}{{ item.quantity }} Unit
                </span>
                <p class="text-xs text-gray-400">{{ formatTime(item.createdAt) }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Low Stock Alert Banner -->
    <Transition name="slide-down">
      <Alert v-if="lowStockAlert" variant="destructive" class="border-none bg-red-50 text-red-900 rounded-xl">
        <AlertCircle class="h-4 w-4" />
        <AlertTitle class="font-bold">⚠️ Peringatan Stok Menipis!</AlertTitle>
        <AlertDescription>
          {{ lowStockAlert }}
          <Button variant="link" class="p-0 h-auto font-bold text-red-700" @click="filterLowStock">
            Lihat produk →
          </Button>
        </AlertDescription>
      </Alert>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useInventoryStore } from '@/stores/inventory'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Package, Calendar, Plus, AlertTriangle, Banknote, CheckCircle,
  TrendingUp, ArrowUp, ArrowDown, Trash2, AlertCircle
} from 'lucide-vue-next'

const router = useRouter()
const inventoryStore = useInventoryStore()
const { products, isLoading } = storeToRefs(inventoryStore)
const { lowStockProducts, statistics, recentHistory } = storeToRefs(inventoryStore)

const lowStockAlert = ref('')

watch(
  () => lowStockProducts.value,
  (newLowStock) => {
    if (newLowStock.length > 0) {
      const names = newLowStock.slice(0, 3).map(p => `"${p.name}"`).join(', ')
      lowStockAlert.value = `${newLowStock.length} produk stok menipis: ${names}`
    } else {
      lowStockAlert.value = ''
    }
  },
  { deep: true, immediate: true }
)

const stats = computed(() => ({
  totalProduk: statistics.value.totalProducts,
  totalStok: statistics.value.totalStock,
  nilaiInventory: statistics.value.totalValue,
  stokMenipis: statistics.value.lowStockCount,
}))

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(amount)
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleString('id-ID', {
    hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short'
  })
}

function filterLowStock() {
  router.push({ name: 'produk' })
  setTimeout(() => {
    const stockFilter = document.querySelector('[data-stock-filter="low"]')
    if (stockFilter) stockFilter.click()
  }, 100)
}

onMounted(() => {
  if (products.value.length === 0) inventoryStore.fetchData()
})
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }
</style>