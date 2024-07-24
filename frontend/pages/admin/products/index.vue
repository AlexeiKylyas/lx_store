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
  middleware: 'auth', // Middleware для перевірки авторизації
  data() {
    return {
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' }
      ]
    }
  },
  mounted() {
    console.log('Component mounted - Products data:', this.products)
  }
}
</script>
