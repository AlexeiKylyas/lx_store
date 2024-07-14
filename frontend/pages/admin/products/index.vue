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
    console.log('Fetching products...')
    try {
      const response = await this.$axios.get('/admin/products')
      this.products = response.data
      console.log('Products fetched:', this.products)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },
  mounted() {
    console.log('Component mounted - Products data:', this.products)
  }
}
</script>
