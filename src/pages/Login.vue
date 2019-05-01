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

import axios from 'axios'
import sha1 from 'sha1'

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

      axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/login/' + this.username.toLowerCase() + '/' + sha1(this.password)})
      .then(result => {

         if (result.data.successful) {
           console.log(result)
           this.$root.$data.authenticated = true
           this.$root.$data.username = result.data.data.Item.email
           this.$root.$data.name = result.data.data.Item.name

           this.$router.push('/dashboard')
         } else {
           window.alert('Login failed. Please try again')
         }
      }, error => {
        console.error(error)
      })


    }
  },
  beforeMount () {
    this.$root.$data.authenticated = false
    this.$root.$data.username = '',
    this.$root.$data.name = ''
  }
}

</script>

<style scoped>
</style>
