<template>
  <div>
    <h1>Admin Dashboard</h1>
    <nuxt-link to="/admin/products">Manage Products</nuxt-link>
    <nuxt-link to="/admin/orders">Manage Orders</nuxt-link>
    <nuxt-link to="/admin/users">Manage Users</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  middleware: 'auth' // Добавим middleware для проверки авторизации
}
</script>
