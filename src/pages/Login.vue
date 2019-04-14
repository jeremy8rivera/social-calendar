<template>
  <div>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
    <br>
    <router-link to='signup'>Create account</router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      if(this.username === this.$root.$data.tempAccount.username && this.password === this.$root.$data.tempAccount.password) {
        this.$root.$data.authenticated = true
        this.$root.$data.username = this.username
        this.$router.push('/dashboard')
      } else {
        window.alert("Wrong Username/Password!")
      }
    }
  }
}

</script>

<style scoped>
</style>
