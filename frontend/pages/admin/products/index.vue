<template>
  <div>
    <h1>Manage Products</h1>
    <ul>
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    }
  },
  async fetch() {
    const response = await this.$axios.get('/api/admin/products')
    this.products = response.data
  }
}
</script>
