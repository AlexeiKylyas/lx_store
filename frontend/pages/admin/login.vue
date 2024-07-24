<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <v-text-field id="email" v-model="email" label="email"  type="text" />
      </div>
      <div>
        <v-text-field id="password" v-model="password" label="password" type="password"  />
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
        const response = await this.$axios.post('/auth/login', {
          email: this.email,
          password: this.password
        });
        const token = response.data.token;
        console.log('token =>',token)
        await this.$store.dispatch('authorization/login', token);
        const redirect = this.$route.query.redirect || '/admin/products/';
        await this.$router.push(redirect);
      } catch (error) {
        alert('Login failed. Please check your credentials and try again.');
      }
    }
  }
}
</script>
