<template>
  <div>
    <h1>Add User</h1>
    <form @submit.prevent="addUser">
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async addUser() {
      try {
        await this.$axios.post('/auth/add-user', {
          username: this.username,
          password: this.password
        });
        this.username = '';
        this.password = '';
        alert('User added successfully');
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }
}
</script>
