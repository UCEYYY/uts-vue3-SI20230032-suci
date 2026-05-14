// src/stores/inventory.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  // ==================== STATE ====================
  
  // Daftar produk (mock data - nanti bisa diganti API)
  const products = ref([
    {
      id: 1,
      name: 'Beras Premium 5kg',
      category: 'Sembako',
      price: 75000,
      stock: 45,
      minStock: 10,
      description: 'Beras kualitas premium, pulen dan wangi',
      imageUrl: 'https://via.placeholder.com/150?text=Beras',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'Minyak Goreng 2L',
      category: 'Sembako',
      price: 35000,
      stock: 8, // ⚠️ Stok menipis!
      minStock: 10,
      description: 'Minyak goreng curah berkualitas',
      imageUrl: 'https://via.placeholder.com/150?text=Minyak',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-21'
    },
    {
      id: 3,
      name: 'Gula Pasir 1kg',
      category: 'Sembako',
      price: 15000,
      stock: 120,
      minStock: 20,
      description: 'Gula pasir putih berkualitas',
      imageUrl: 'https://via.placeholder.com/150?text=Gula',
      createdAt: '2024-01-17',
      updatedAt: '2024-01-22'
    },
    {
      id: 4,
      name: 'Telur Ayam 1kg',
      category: 'Protein',
      price: 28000,
      stock: 5, // ⚠️ Stok menipis!
      minStock: 15,
      description: 'Telur ayam segar, kualitas grade A',
      imageUrl: 'https://via.placeholder.com/150?text=Telur',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-23'
    },
    {
      id: 5,
      name: 'Sabun Mandi',
      category: 'Perlengkapan',
      price: 5000,
      stock: 200,
      minStock: 30,
      description: 'Sabun mandi antiseptik',
      imageUrl: 'https://via.placeholder.com/150?text=Sabun',
      createdAt: '2024-01-19',
      updatedAt: '2024-01-24'
    },
    {
      id: 6,
      name: 'Teh Celup 25pcs',
      category: 'Minuman',
      price: 12000,
      stock: 75,
      minStock: 25,
      description: 'Teh celup berbagai rasa',
      imageUrl: 'https://via.placeholder.com/150?text=Teh',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-25'
    },
    {
      id: 7,
      name: 'Kopi Instant 200g',
      category: 'Minuman',
      price: 45000,
      stock: 30,
      minStock: 15,
      description: 'Kopi instant premium',
      imageUrl: 'https://via.placeholder.com/150?text=Kopi',
      createdAt: '2024-01-21',
      updatedAt: '2024-01-26'
    },
    {
      id: 8,
      name: 'Susu Kental Manis 400g',
      category: 'Minuman',
      price: 18000,
      stock: 60,
      minStock: 20,
      description: 'Susu kental manis full cream',
      imageUrl: 'https://via.placeholder.com/150?text=Susu',
      createdAt: '2024-01-22',
      updatedAt: '2024-01-27'
    },
    {
      id: 9,
      name: 'Mie Instan Goreng',
      category: 'Sembako',
      price: 3500,
      stock: 150,
      minStock: 50,
      description: 'Mie instan goreng berbagai rasa',
      imageUrl: 'https://via.placeholder.com/150?text=Mie',
      createdAt: '2024-01-23',
      updatedAt: '2024-01-28'
    },
    {
      id: 10,
      name: 'Biskuit Marie 250g',
      category: 'Sembako',
      price: 12000,
      stock: 40,
      minStock: 15,
      description: 'Biskuit marie renyah',
      imageUrl: 'https://via.placeholder.com/150?text=Biskuit',
      createdAt: '2024-01-24',
      updatedAt: '2024-01-29'
    },
    {
      id: 11,
      name: 'Sampo Anti Ketombe 200ml',
      category: 'Perlengkapan',
      price: 25000,
      stock: 25,
      minStock: 10,
      description: 'Sampo anti ketombe efektif',
      imageUrl: 'https://via.placeholder.com/150?text=Sampo',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-30'
    },
    {
      id: 12,
      name: 'Pasta Gigi 150g',
      category: 'Perlengkapan',
      price: 15000,
      stock: 35,
      minStock: 12,
      description: 'Pasta gigi dengan fluoride',
      imageUrl: 'https://via.placeholder.com/150?text=Pasta+Gigi',
      createdAt: '2024-01-26',
      updatedAt: '2024-01-31'
    },
    {
      id: 13,
      name: 'Daging Ayam 1kg',
      category: 'Protein',
      price: 45000,
      stock: 12,
      minStock: 8,
      description: 'Daging ayam broiler segar',
      imageUrl: 'https://via.placeholder.com/150?text=Ayam',
      createdAt: '2024-01-27',
      updatedAt: '2024-02-01'
    },
    {
      id: 14,
      name: 'Ikan Tuna Kaleng 150g',
      category: 'Protein',
      price: 22000,
      stock: 45,
      minStock: 15,
      description: 'Ikan tuna dalam kaleng',
      imageUrl: 'https://via.placeholder.com/150?text=Tuna',
      createdAt: '2024-01-28',
      updatedAt: '2024-02-02'
    },
    {
      id: 15,
      name: 'Laptop Gaming Pro X15',
      category: 'Elektronik',
      price: 15000000,
      stock: 3,
      minStock: 2,
      description: 'Laptop gaming high-end dengan RTX 4070',
      imageUrl: 'https://via.placeholder.com/150?text=Laptop',
      createdAt: '2024-01-29',
      updatedAt: '2024-02-03'
    },
    {
      id: 16,
      name: 'Mouse Gaming RGB',
      category: 'Elektronik',
      price: 350000,
      stock: 8,
      minStock: 5,
      description: 'Mouse gaming dengan 16000 DPI',
      imageUrl: 'https://via.placeholder.com/150?text=Mouse',
      createdAt: '2024-01-30',
      updatedAt: '2024-02-04'
    },
    {
      id: 17,
      name: 'Keyboard Mechanical RGB',
      category: 'Elektronik',
      price: 750000,
      stock: 5,
      minStock: 3,
      description: 'Keyboard mechanical dengan switch blue',
      imageUrl: 'https://via.placeholder.com/150?text=Keyboard',
      createdAt: '2024-01-31',
      updatedAt: '2024-02-05'
    },
    {
      id: 18,
      name: 'Monitor Gaming 27" 144Hz',
      category: 'Elektronik',
      price: 3500000,
      stock: 2,
      minStock: 1,
      description: 'Monitor gaming 144Hz QHD',
      imageUrl: 'https://via.placeholder.com/150?text=Monitor',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-06'
    },
    {
      id: 19,
      name: 'Headset Gaming RGB',
      category: 'Elektronik',
      price: 450000,
      stock: 6,
      minStock: 4,
      description: 'Headset gaming dengan surround sound',
      imageUrl: 'https://via.placeholder.com/150?text=Headset',
      createdAt: '2024-02-02',
      updatedAt: '2024-02-07'
    },
    {
      id: 20,
      name: 'Kaos Polos Cotton Combed',
      category: 'Pakaian',
      price: 75000,
      stock: 50,
      minStock: 20,
      description: 'Kaos polos katun combed berbagai warna',
      imageUrl: 'https://via.placeholder.com/150?text=Kaos',
      createdAt: '2024-02-03',
      updatedAt: '2024-02-08'
    },
    {
      id: 21,
      name: 'Celana Jeans Slim Fit',
      category: 'Pakaian',
      price: 250000,
      stock: 15,
      minStock: 8,
      description: 'Celana jeans slim fit premium',
      imageUrl: 'https://via.placeholder.com/150?text=Jeans',
      createdAt: '2024-02-04',
      updatedAt: '2024-02-09'
    },
    {
      id: 22,
      name: 'Sepatu Sneakers Casual',
      category: 'Pakaian',
      price: 350000,
      stock: 8,
      minStock: 5,
      description: 'Sepatu sneakers casual berbagai ukuran',
      imageUrl: 'https://via.placeholder.com/150?text=Sepatu',
      createdAt: '2024-02-05',
      updatedAt: '2024-02-10'
    }
  ])

  // Riwayat transaksi (masuk/keluar barang)
  const history = ref([
    {
      id: 1,
      productId: 1,
      productName: 'Beras Premium 5kg',
      type: 'in', // 'in' = barang masuk, 'out' = barang keluar
      quantity: 20,
      previousStock: 25,
      newStock: 45,
      note: 'Restock mingguan dari supplier',
      createdAt: '2024-01-20T08:30:00'
    },
    {
      id: 2,
      productId: 2,
      productName: 'Minyak Goreng 2L',
      type: 'out',
      quantity: 12,
      previousStock: 20,
      newStock: 8,
      note: 'Penjualan hari ini',
      createdAt: '2024-01-21T14:15:00'
    },
    {
      id: 3,
      productId: 4,
      productName: 'Telur Ayam 1kg',
      type: 'out',
      quantity: 10,
      previousStock: 15,
      newStock: 5,
      note: 'Penjualan grosir',
      createdAt: '2024-01-23T10:00:00'
    }
  ])

  // State filter & pencarian
  const filters = ref({
    search: '',
    category: '',
    stockStatus: 'all', // 'all' | 'low' | 'adequate'
    sortBy: 'name', // 'name' | 'stock' | 'price' | 'newest'
    sortOrder: 'asc', // 'asc' | 'desc'
    currentPage: 1,
    itemsPerPage: 10
  })

  // State UI
  const isLoading = ref(false)
  const alertMessage = ref(null)
  const alertType = ref('info') // 'info' | 'warning' | 'success' | 'error'

  // ==================== GETTERS (Computed) ====================

  // 🎯 GETTER: Produk yang sudah difilter (tanpa pagination)
  const allFilteredProducts = computed(() => {
    let result = [...products.value]

    // Filter pencarian (case-insensitive)
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }

    // Filter kategori
    if (filters.value.category) {
      result = result.filter(p => p.category === filters.value.category)
    }

    // Filter status stok
    if (filters.value.stockStatus === 'low') {
      result = result.filter(p => p.stock < p.minStock)
    } else if (filters.value.stockStatus === 'adequate') {
      result = result.filter(p => p.stock >= p.minStock)
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0
      switch (filters.value.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'stock':
          comparison = a.stock - b.stock
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'newest':
          comparison = new Date(b.createdAt) - new Date(a.createdAt)
          break
        default:
          comparison = 0
      }
      return filters.value.sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  })

  // 🎯 GETTER: Produk yang sudah difilter dan dipaginasi
  const filteredProducts = computed(() => {
    const startIndex = (filters.value.currentPage - 1) * filters.value.itemsPerPage
    const endIndex = startIndex + filters.value.itemsPerPage
    return allFilteredProducts.value.slice(startIndex, endIndex)
  })

  // 🎯 GETTER: Daftar kategori unik
  const categories = computed(() => {
    return [...new Set(products.value.map(p => p.category))].sort()
  })

  // 🎯 GETTER: Info pagination
  const pagination = computed(() => {
    const totalItems = allFilteredProducts.value.length
    const totalPages = Math.ceil(totalItems / filters.value.itemsPerPage)
    const currentPage = filters.value.currentPage
    const hasNextPage = currentPage < totalPages
    const hasPrevPage = currentPage > 1

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: filters.value.itemsPerPage,
      hasNextPage,
      hasPrevPage,
      startItem: (currentPage - 1) * filters.value.itemsPerPage + 1,
      endItem: Math.min(currentPage * filters.value.itemsPerPage, totalItems)
    }
  })

  // 🎯 GETTER: Statistik dashboard
  const statistics = computed(() => {
    const total = products.value.length
    const totalStock = products.value.reduce((sum, p) => sum + p.stock, 0)
    const totalValue = products.value.reduce((sum, p) => sum + (p.stock * p.price), 0)
    const lowStock = products.value.filter(p => p.stock < p.minStock).length
    const adequateStock = total - lowStock

    return {
      totalProducts: total,
      totalStock,
      totalValue,
      lowStockCount: lowStock,
      adequateStockCount: adequateStock,
      lowStockPercentage: total > 0 ? Math.round((lowStock / total) * 100) : 0
    }
  })

  // 🎯 GETTER: Produk dengan stok menipis (alert)
  const lowStockProducts = computed(() => {
    return products.value.filter(p => p.stock < p.minStock)
  })

  // 🎯 GETTER: Riwayat terbaru (10 terakhir)
  const recentHistory = computed(() => {
    return [...history.value]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
  })

  // ==================== ACTIONS ====================

  // 🔧 ACTION: Tambah produk baru
  function addProduct(productData) {
    const newProduct = {
      id: Date.now(), // Simple ID generation (ganti UUID di production)
      stock: 0,
      minStock: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...productData
    }
    
    products.value.unshift(newProduct)
    
    // Catat ke history
    addHistory({
      productId: newProduct.id,
      productName: newProduct.name,
      type: 'in',
      quantity: 0,
      previousStock: 0,
      newStock: 0,
      note: 'Produk baru ditambahkan'
    })
    
    showAlert('success', `Produk "${newProduct.name}" berhasil ditambahkan!`)
    return newProduct
  }

  // 🔧 ACTION: Update produk
  function updateProduct(id, updates) {
    const index = products.value.findIndex(p => p.id === id)
    if (index === -1) {
      showAlert('error', 'Produk tidak ditemukan!')
      return null
    }

    const oldProduct = { ...products.value[index] }
    products.value[index] = {
      ...products.value[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    // Jika stok berubah, catat ke history
    if (updates.stock !== undefined && updates.stock !== oldProduct.stock) {
      const type = updates.stock > oldProduct.stock ? 'in' : 'out'
      const quantity = Math.abs(updates.stock - oldProduct.stock)
      
      addHistory({
        productId: id,
        productName: products.value[index].name,
        type,
        quantity,
        previousStock: oldProduct.stock,
        newStock: updates.stock,
        note: `Stok di${type === 'in' ? 'tambah' : 'kurangi'} manual`
      })
    }

    showAlert('success', `Produk "${products.value[index].name}" berhasil diperbarui!`)
    return products.value[index]
  }

  // 🔧 ACTION: Hapus produk
  function deleteProduct(id) {
    const product = products.value.find(p => p.id === id)
    if (!product) {
      showAlert('error', 'Produk tidak ditemukan!')
      return false
    }

    products.value = products.value.filter(p => p.id !== id)
    
    // Catat penghapusan ke history
    addHistory({
      productId: id,
      productName: product.name,
      type: 'delete',
      quantity: product.stock,
      previousStock: product.stock,
      newStock: 0,
      note: 'Produk dihapus dari sistem'
    })

    showAlert('success', `Produk "${product.name}" berhasil dihapus!`)
    return true
  }

  // 🔧 ACTION: Update stok (masuk/keluar)
  function updateStock(productId, quantity, type, note = '') {
    const product = products.value.find(p => p.id === productId)
    if (!product) {
      showAlert('error', 'Produk tidak ditemukan!')
      return false
    }

    const previousStock = product.stock
    let newStock = previousStock

    if (type === 'in') {
      newStock = previousStock + quantity
    } else if (type === 'out') {
      if (quantity > previousStock) {
        showAlert('error', 'Stok tidak mencukupi!')
        return false
      }
      newStock = previousStock - quantity
    }

    // Update produk
    product.stock = newStock
    product.updatedAt = new Date().toISOString()

    // Catat ke history
    addHistory({
      productId,
      productName: product.name,
      type,
      quantity,
      previousStock,
      newStock,
      note: note || (type === 'in' ? 'Barang masuk' : 'Barang keluar')
    })

    showAlert('success', `Stok "${product.name}" berhasil diperbarui!`)
    return true
  }

  // 🔧 ACTION: Tambah entri history
  function addHistory(entry) {
    const newEntry = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...entry
    }
    history.value.unshift(newEntry)
    return newEntry
  }

  // 🔧 ACTION: Reset filter
  function resetFilters() {
    filters.value = {
      search: '',
      category: '',
      stockStatus: 'all',
      sortBy: 'name',
      sortOrder: 'asc'
    }
  }

  // 🔧 ACTION: Update filter
  function setFilter(key, value) {
    filters.value[key] = value
  }

  // 🔧 ACTION: Pagination - go to page
  function goToPage(page) {
    if (page >= 1 && page <= pagination.value.totalPages) {
      filters.value.currentPage = page
    }
  }

  // 🔧 ACTION: Pagination - next page
  function nextPage() {
    if (pagination.value.hasNextPage) {
      filters.value.currentPage++
    }
  }

  // 🔧 ACTION: Pagination - previous page
  function prevPage() {
    if (pagination.value.hasPrevPage) {
      filters.value.currentPage--
    }
  }

  // 🔧 ACTION: Reset pagination to first page
  function resetPagination() {
    filters.value.currentPage = 1
  }

  // 🔧 ACTION: Show alert/toast
  function showAlert(type, message) {
    alertType.value = type
    alertMessage.value = message
    
    // Auto-hide setelah 4 detik
    setTimeout(() => {
      alertMessage.value = null
    }, 4000)
  }

  // 🔧 ACTION: Load data dari API (simulasi)
  async function fetchData() {
    isLoading.value = true
    try {
      // Simulasi delay network
      await new Promise(resolve => setTimeout(resolve, 800))
      // Di production: ganti dengan fetch/axios ke backend
      // const response = await fetch('/api/products')
      // products.value = await response.json()
      showAlert('success', 'Data berhasil dimuat!')
    } catch (error) {
      showAlert('error', 'Gagal memuat data: ' + error.message)
    } finally {
      isLoading.value = false
    }
  }

  // ==================== WATCHERS (Reaktivitas Otomatis) ====================

  // 🎯 WATCH: Pantau low stock products, tampilkan alert otomatis
  watch(
    () => lowStockProducts.value,
    (newLowStock, oldLowStock) => {
      if (newLowStock.length > 0 && newLowStock.length !== oldLowStock?.length) {
        const productNames = newLowStock.map(p => `"${p.name}"`).join(', ')
        showAlert(
          'warning',
          `⚠️ ${newLowStock.length} produk stok menipis: ${productNames}`
        )
        
        // Optional: Trigger notifikasi browser
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Silnventaris Alert', {
            body: `${newLowStock.length} produk butuh restock!`,
            icon: '/favicon.ico'
          })
        }
      }
    },
    { deep: true }
  )

  // 🎯 WATCH: Pantau perubahan stok individual untuk alert real-time
  watch(
    () => products.value,
    (newProducts) => {
      newProducts.forEach(product => {
        if (product.stock < product.minStock && product.stock >= 0) {
          // Alert individual jika stok baru saja jatuh di bawah minimum
          console.log(`[Alert] ${product.name}: Stok ${product.stock} < Minimum ${product.minStock}`)
        }
      })
    },
    { deep: true }
  )

  // ==================== RETURN (Public API Store) ====================
  return {
    // State
    products,
    history,
    filters,
    isLoading,
    alertMessage,
    alertType,
    
    // Getters
    allFilteredProducts,
    filteredProducts,
    categories,
    statistics,
    pagination,
    lowStockProducts,
    recentHistory,
    
    // Actions
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    addHistory,
    resetFilters,
    setFilter,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
    showAlert,
    fetchData
  }
})