<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Email</label>
        <input v-model="email" type="text" />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password"  />
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
        console.log('3333333333333333333')
        const response = await this.$axios.post('/auth/login', {
          email: this.email,
          password: this.password
        });
        console.log('response =>',response)
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
