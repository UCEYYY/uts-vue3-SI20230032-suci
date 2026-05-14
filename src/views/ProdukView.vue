<!-- src/views/ProdukView.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-[#0C1E4B]">Daftar Produk</h1>
        <p class="text-gray-500 mt-1 text-sm">Kelola inventaris barang Anda dengan efisien.</p>
      </div>
      <Button as-child class="bg-[#0C1E4B] hover:bg-[#162D6B] text-white rounded-lg px-6 py-2.5">
        <RouterLink to="/produk/tambah">
          <Plus class="mr-2 h-4 w-4" />
          Tambah Produk
        </RouterLink>
      </Button>
    </div>

    <!-- Search & Filter Bar -->
    <Card class="border-none shadow-sm rounded-xl">
      <CardContent class="p-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              v-model.trim="filters.search" 
              placeholder="Cari nama produk atau SKU..." 
              class="pl-10 rounded-lg"
            />
          </div>
          <Select v-model="filters.category">
            <SelectTrigger class="w-full sm:w-[180px] rounded-lg">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" @click="resetFilters" class="rounded-lg gap-2">
            <Filter class="h-4 w-4" /> Filter
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Product Table -->
    <Card class="border-none shadow-sm rounded-xl overflow-hidden">
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow class="bg-[#F0F3FA]">
              <TableHead class="font-semibold text-[#0C1E4B]">Nama Produk</TableHead>
              <TableHead class="font-semibold text-[#0C1E4B]">Kategori</TableHead>
              <TableHead class="font-semibold text-[#0C1E4B]">Stok</TableHead>
              <TableHead class="font-semibold text-[#0C1E4B]">Harga</TableHead>
              <TableHead class="font-semibold text-[#0C1E4B]">Status</TableHead>
              <TableHead class="text-right font-semibold text-[#0C1E4B]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow 
              v-for="product in inventoryStore.filteredProducts" 
              :key="product.id"
              class="hover:bg-gray-50/50"
            >
              <TableCell>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                    <Package class="h-5 w-5 text-gray-400" />
                  </div>
                  <span class="font-semibold">{{ product.name }}</span>
                </div>
              </TableCell>
              <TableCell class="text-gray-600">{{ product.category }}</TableCell>
              <TableCell class="font-semibold">{{ product.stock }} Unit</TableCell>
              <TableCell class="font-semibold">{{ formatRupiah(product.price) }}</TableCell>
              <TableCell>
                <Badge :class="getStockBadgeClass(product.stock, product.minStock)" class="rounded-full px-3 py-1">
                  {{ getStockLabel(product.stock, product.minStock) }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <div class="flex items-center bg-gray-100 rounded-lg p-0.5 mr-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      @click="decreaseStock(product)"
                      class="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-white rounded-md"
                      :disabled="product.stock <= 0"
                    >
                      <Minus class="h-3.5 w-3.5" />
                    </Button>
                    <span class="w-8 text-center text-xs font-bold">{{ product.stock }}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      @click="increaseStock(product)"
                      class="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-white rounded-md"
                    >
                      <Plus class="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" @click="editProduct(product)" class="text-blue-600 hover:text-blue-800">
                    <Pencil class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="confirmDelete(product)" class="text-red-600 hover:text-red-800">
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Empty State -->
        <div v-if="inventoryStore.filteredProducts.length === 0" class="p-10 text-center">
          <PackageX class="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500">Tidak ada produk ditemukan</p>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50/50">
          <p class="text-sm text-gray-500">
            Menampilkan {{ pagination.startItem }}-{{ pagination.endItem }} dari {{ pagination.totalItems }} produk
          </p>
          <div class="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              :disabled="!pagination.hasPrevPage"
              @click="inventoryStore.prevPage()"
              class="rounded-lg"
            >
              &lt;
            </Button>
            
            <!-- Page numbers -->
            <template v-for="page in getVisiblePages()" :key="page">
              <Button 
                :variant="page === pagination.currentPage ? 'default' : 'outline'"
                size="sm"
                :class="page === pagination.currentPage ? 'bg-[#0C1E4B] rounded-lg' : 'rounded-lg'"
                @click="inventoryStore.goToPage(page)"
              >
                {{ page }}
              </Button>
            </template>
            
            <Button 
              variant="outline" 
              size="sm" 
              :disabled="!pagination.hasNextPage"
              @click="inventoryStore.nextPage()"
              class="rounded-lg"
            >
              &gt;
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Summary Cards -->
    <div class="grid gap-5 sm:grid-cols-3">
      <Card class="border-l-4 border-l-[#1E3A8A] rounded-xl">
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 uppercase">Total Produk</p>
            <p class="text-4xl font-bold text-[#1E3A8A] mt-1">{{ stats.totalProduk }}</p>
          </div>
          <ClipboardCheck class="h-12 w-12 text-gray-200" />
        </CardContent>
      </Card>
      <Card class="border-l-4 border-l-amber-500 rounded-xl">
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 uppercase">Stok Rendah</p>
            <p class="text-4xl font-bold text-amber-500 mt-1">{{ stats.stokMenipis }}</p>
          </div>
          <AlertTriangle class="h-12 w-12 text-amber-200" />
        </CardContent>
      </Card>
      <Card class="border-l-4 border-l-red-500 rounded-xl">
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 uppercase">Kehabisan Stok</p>
            <p class="text-4xl font-bold text-red-600 mt-1">{{ stats.stokHabis }}</p>
          </div>
          <AlertCircle class="h-12 w-12 text-red-200" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useInventoryStore } from '@/stores/inventory'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, Minus, Search, Filter, Package, Pencil, Trash2, PackageX, 
  ClipboardCheck, AlertTriangle, AlertCircle 
} from 'lucide-vue-next'

const router = useRouter()
const inventoryStore = useInventoryStore()
const { products } = storeToRefs(inventoryStore)
const { allFilteredProducts, filteredProducts, categories, statistics, pagination } = storeToRefs(inventoryStore)

const filters = ref({ search: '', category: '' })

watch(filters, (newFilters) => {
  inventoryStore.setFilter('search', newFilters.search)
  inventoryStore.setFilter('category', newFilters.category)
  inventoryStore.resetPagination() // Reset to page 1 when filters change
}, { deep: true })

const stats = computed(() => ({
  totalProduk: statistics.value.totalProducts,
  stokMenipis: statistics.value.lowStockCount,
  stokHabis: products.value.filter(p => p.stock === 0).length,
}))

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)
}

function getStockBadgeClass(stock, minStock) {
  if (stock === 0) return 'bg-gray-200 text-gray-700'
  if (stock < minStock) return 'bg-amber-100 text-amber-700'
  return 'bg-green-100 text-green-700'
}

function getStockLabel(stock, minStock) {
  if (stock === 0) return 'Habis'
  if (stock < minStock) return 'Stok Rendah'
  return 'Tersedia'
}

function getVisiblePages() {
  const current = pagination.value.currentPage
  const total = pagination.value.totalPages
  const pages = []
  
  // Show max 5 page buttons
  const maxVisible = 5
  let start = Math.max(1, current - Math.floor(maxVisible / 2))
  let end = Math.min(total, start + maxVisible - 1)
  
  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
}

function resetFilters() {
  filters.value = { search: '', category: '' }
  inventoryStore.resetFilters()
}

function editProduct(product) {
  router.push({ name: 'produk-edit', params: { id: product.id } })
}

function increaseStock(product) {
  inventoryStore.updateStock(product.id, 1, 'in', 'Penambahan stok cepat')
}

function decreaseStock(product) {
  if (product.stock > 0) {
    inventoryStore.updateStock(product.id, 1, 'out', 'Pengurangan stok cepat')
  }
}

function confirmDelete(product) {
  if (confirm(`Hapus produk "${product.name}"?`)) inventoryStore.deleteProduct(product.id)
}
</script>