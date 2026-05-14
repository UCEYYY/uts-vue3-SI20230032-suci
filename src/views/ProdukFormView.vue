<!-- src/views/ProdukFormView.vue -->
<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-gray-500">
      <RouterLink to="/produk" class="hover:text-[#0C1E4B]">Produk</RouterLink>
      <ChevronRight class="h-4 w-4" />
      <span class="font-semibold text-[#0C1E4B]">{{ isEdit ? 'Edit Produk' : 'Tambah Produk Baru' }}</span>
    </nav>

    <!-- Hero Section -->
    <div class="relative bg-[#0C1E4B] rounded-t-2xl p-8 text-white text-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0C1E4B] to-[#1E3A8A] opacity-90" />
      <div class="relative z-10">
        <h1 class="text-3xl font-bold">{{ isEdit ? 'Edit Produk' : 'Tambah Produk Baru' }}</h1>
        <p class="text-white/80 mt-2 text-sm">Masukkan detail informasi produk untuk inventaris Anda</p>
      </div>
    </div>

    <!-- Form Card -->
    <Card class="border-none shadow-xl rounded-b-2xl rounded-t-none">
      <CardContent class="pt-8 px-8 pb-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          
          <!-- Nama Barang -->
          <div class="space-y-2">
            <Label for="name" class="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Nama Barang <span class="text-red-500">*</span>
            </Label>
            <div class="relative">
              <Input 
                id="name" 
                v-model.trim="form.name" 
                placeholder="Contoh: Laptop Pro X15" 
                :class="['rounded-lg', errors.name ? 'border-red-400' : '']"
              />
              <Package class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
            </div>
            <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
          </div>

          <!-- Kategori & Stok Awal -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <Label for="category" class="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Kategori <span class="text-red-500">*</span>
              </Label>
              <Select v-model="form.category">
                <SelectTrigger :class="['rounded-lg', errors.category ? 'border-red-400' : '']">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elektronik">Elektronik</SelectItem>
                  <SelectItem value="Pakaian">Pakaian</SelectItem>
                  <SelectItem value="Sembako">Sembako</SelectItem>
                  <SelectItem value="Minuman">Minuman</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <p v-if="errors.category" class="text-sm text-red-500">{{ errors.category }}</p>
            </div>
            <div class="space-y-2">
              <Label for="stock" class="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Stok Awal <span class="text-red-500">*</span>
              </Label>
              <div class="relative">
                <Input 
                  id="stock" 
                  v-model.number="form.stock" 
                  type="number" 
                  min="0" 
                  placeholder="0"
                  :class="['rounded-lg', errors.stock ? 'border-red-400' : '']"
                />
                <Package class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
              </div>
              <p v-if="errors.stock" class="text-sm text-red-500">{{ errors.stock }}</p>
            </div>
          </div>

          <!-- Harga Beli & Harga Jual -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <Label for="price" class="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Harga Beli <span class="text-red-500">*</span>
              </Label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Rp</span>
                <Input 
                  id="price" 
                  v-model.number="form.price" 
                  type="number" 
                  min="0" 
                  placeholder="0"
                  class="pl-10 rounded-lg"
                  :class="errors.price ? 'border-red-400' : ''"
                />
              </div>
              <p v-if="errors.price" class="text-sm text-red-500">{{ errors.price }}</p>
            </div>
            <div class="space-y-2">
              <Label for="minStock" class="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Batas Alert Stok <span class="text-red-500">*</span>
              </Label>
              <Input 
                id="minStock" 
                v-model.number="form.minStock" 
                type="number" 
                min="1" 
                placeholder="10"
                :class="['rounded-lg', errors.minStock ? 'border-red-400' : '']"
              />
              <p v-if="errors.minStock" class="text-sm text-red-500">{{ errors.minStock }}</p>
            </div>
          </div>

          Info Box
          <div class="bg-blue-50 border-l-4 border-[#0C1E4B] rounded-r-lg p-4 flex items-start gap-3">
            <Info class="h-5 w-5 text-[#0C1E4B] shrink-0 mt-0.5" />
            <p class="text-sm text-[#0C1E4B]/80">
              Pastikan semua data numerik (Stok, Harga) sudah benar sebelum menyimpan produk. 
              Data ini akan langsung mempengaruhi laporan keuangan.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4">
            <Button 
              type="submit" 
              :disabled="isSubmitting"
              class="bg-[#0C1E4B] hover:bg-[#162D6B] text-white rounded-lg px-8 py-2.5 flex-1"
            >
              <Save v-if="!isSubmitting" class="mr-2 h-4 w-4" />
              <Loader2 v-else class="mr-2 h-4 w-4 animate-spin" />
              {{ isEdit ? 'Simpan Perubahan' : 'Simpan Produk' }}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              @click="router.back()"
              class="rounded-lg px-8 py-2.5"
            >
              <X class="mr-2 h-4 w-4" />
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInventoryStore } from '@/stores/inventory'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Package, ChevronRight, Info, Save, Loader2, X 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const inventoryStore = useInventoryStore()

const isEdit = computed(() => !!route.params.id)
const isSubmitting = ref(false)

const form = reactive({
  name: '', category: '', price: 0, stock: 0, minStock: 10, description: ''
})

const errors = reactive({ name: '', category: '', price: '', stock: '', minStock: '' })

onMounted(() => {
  if (isEdit.value) {
    const product = inventoryStore.products.find(p => p.id == route.params.id)
    if (product) Object.assign(form, {
      name: product.name, category: product.category, price: product.price,
      stock: product.stock, minStock: product.minStock, description: product.description || ''
    })
    else { router.replace('/produk'); inventoryStore.showAlert('error', 'Produk tidak ditemukan!') }
  }
})

function validate() {
  Object.keys(errors).forEach(k => errors[k] = '')
  let isValid = true
  if (!form.name.trim()) { errors.name = 'Nama produk wajib diisi'; isValid = false }
  else if (form.name.trim().length < 3) { errors.name = 'Nama minimal 3 karakter'; isValid = false }
  if (!form.category) { errors.category = 'Kategori wajib dipilih'; isValid = false }
  if (!form.price || form.price <= 0) { errors.price = 'Harga harus lebih dari 0'; isValid = false }
  if (form.stock === null || form.stock < 0) { errors.stock = 'Stok tidak boleh negatif'; isValid = false }
  if (!form.minStock || form.minStock < 1) { errors.minStock = 'Batas stok minimal 1'; isValid = false }
  return isValid
}

async function handleSubmit() {
  if (!validate()) return
  isSubmitting.value = true
  try {
    if (isEdit.value) inventoryStore.updateProduct(Number(route.params.id), { ...form })
    else inventoryStore.addProduct({ ...form })
    router.push('/produk')
  } catch { inventoryStore.showAlert('error', 'Gagal menyimpan data') }
  finally { isSubmitting.value = false }
}
</script>