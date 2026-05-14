<!-- src/views/RiwayatView.vue -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-[#0C1E4B]">Riwayat Transaksi</h1>
      <p class="text-gray-500 mt-1 text-sm">Lacak pergerakan stok barang Anda secara real-time</p>
    </div>

    <!-- Filter Section -->
    <Card class="border-none shadow-sm rounded-xl">
      <CardContent class="p-5">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label class="text-xs font-semibold uppercase tracking-wide text-gray-500">Mulai Tanggal</Label>
              <Input type="date" v-model="startDate" class="rounded-lg" />
            </div>
            <div class="space-y-2">
              <Label class="text-xs font-semibold uppercase tracking-wide text-gray-500">Sampai Tanggal</Label>
              <Input type="date" v-model="endDate" class="rounded-lg" />
            </div>
          </div>
          <div class="w-full sm:w-[180px] space-y-2">
            <Label class="text-xs font-semibold uppercase tracking-wide text-gray-500">Tipe Transaksi</Label>
            <Select v-model="filterType">
              <SelectTrigger class="rounded-lg">
                <SelectValue placeholder="Semua Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="in">Masuk</SelectItem>
                <SelectItem value="out">Keluar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-end gap-2">
            <Button @click="applyFilters" class="rounded-lg gap-2 bg-[#0C1E4B] text-white hover:bg-[#162D6B] border-none">
              <Filter class="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" @click="resetFilters" class="rounded-lg border-gray-200">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Transaction Table -->
    <Card class="border-none shadow-sm rounded-xl overflow-hidden">
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow class="bg-[#F0F3FA]">
              <TableHead class="font-semibold text-[#0C1E4B]">Waktu & Tanggal</TableHead>
              <TableHead class="font-semibold text-[#0C1E4B]">Nama Produk</TableHead>
              <TableHead class="font-semibold text-[#0C1E4B]">Tipe</TableHead>
              <TableHead class="font-semibold text-[#0C1E4B] text-center">Jumlah</TableHead>
              <TableHead class="font-semibold text-[#0C1E4B]">Catatan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow 
              v-for="item in filteredHistory" 
              :key="item.id"
              class="hover:bg-gray-50/50"
            >
              <TableCell class="whitespace-nowrap">
                <div class="font-semibold">{{ formatDate(item.createdAt) }}</div>
                <div class="text-xs text-gray-400">{{ formatTime(item.createdAt) }} WIB</div>
              </TableCell>
              <TableCell>
                <p class="font-semibold">{{ item.productName }}</p>
              </TableCell>
              <TableCell>
                <Badge :class="[
                  item.type === 'in' ? 'bg-green-100 text-green-700' : 
                  item.type === 'out' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700',
                  'rounded-full px-3 py-1 font-semibold uppercase text-xs'
                ]">
                  {{ getTypeLabel(item.type) }}
                </Badge>
              </TableCell>
              <TableCell class="text-center font-bold" :class="item.type === 'in' ? 'text-green-600' : 'text-red-600'">
                {{ item.type === 'in' ? '+' : '-' }}{{ item.quantity }}
              </TableCell>
              <TableCell class="text-sm text-gray-500 italic">{{ item.note }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Empty State -->
        <div v-if="filteredHistory.length === 0" class="p-10 text-center">
          <History class="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500">Tidak ada riwayat transaksi</p>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50/50">
          <p class="text-sm text-gray-500">
            Menampilkan {{ filteredHistory.length }} dari {{ history.length }} transaksi
          </p>
          <div class="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled class="rounded-lg">&lt;</Button>
            <Button variant="default" size="sm" class="bg-[#0C1E4B] rounded-lg">1</Button>
            <Button variant="outline" size="sm" class="rounded-lg">2</Button>
            <Button variant="outline" size="sm" class="rounded-lg">3</Button>
            <Button variant="outline" size="sm" class="rounded-lg">&gt;</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useInventoryStore } from '@/stores/inventory'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Filter, History } from 'lucide-vue-next'

const inventoryStore = useInventoryStore()
const { history } = storeToRefs(inventoryStore)

const searchQuery = ref('')
const startDate = ref('2026-01-01')
const endDate = ref(new Date().toISOString().split('T')[0])
const filterType = ref('all')

const appliedFilters = ref({
  startDate: '',
  endDate: '',
  type: 'all'
})

const filteredHistory = computed(() => {
  let result = [...history.value]
  
  // Filter by Type
  if (appliedFilters.value.type !== 'all') {
    result = result.filter(item => item.type === appliedFilters.value.type)
  }
  
  // Filter by Date Range (only if applied)
  if (appliedFilters.value.startDate && appliedFilters.value.endDate) {
    const start = new Date(appliedFilters.value.startDate)
    const end = new Date(appliedFilters.value.endDate)
    end.setHours(23, 59, 59, 999)

    result = result.filter(item => {
      const itemDate = new Date(item.createdAt)
      return itemDate >= start && itemDate <= end
    })
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(item => item.productName.toLowerCase().includes(q) || item.note?.toLowerCase().includes(q))
  }
  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

function applyFilters() {
  appliedFilters.value = {
    startDate: startDate.value,
    endDate: endDate.value,
    type: filterType.value
  }
}

function resetFilters() {
  searchQuery.value = ''
  startDate.value = '2026-01-01'
  endDate.value = new Date().toISOString().split('T')[0]
  filterType.value = 'all'
  appliedFilters.value = {
    startDate: '',
    endDate: '',
    type: 'all'
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function getTypeLabel(type) {
  return type === 'in' ? 'Masuk' : type === 'out' ? 'Keluar' : 'Dihapus'
}
</script>