<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-4xl font-bold mb-4">404</h1>
    <p class="text-lg mb-4">Halaman tidak ditemukan</p>
    <router-link to="/" class="text-blue-500 hover:underline">Kembali ke Beranda</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>