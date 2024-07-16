<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Email</label>
        <input type="text" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('/api/admin/login', {
          email: this.email,
          password: this.password
        });
        // eslint-disable-next-line no-unused-vars
        const token = response.data.token;
        console.log('token =>',token);
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    }
  }
}
</script>
