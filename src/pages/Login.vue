<template>

<body>

  <div class="login">
    <p>Username</p>
    <input type="text" v-model="username" placeholder="Username" required>
    <!-- <input type="email" name="email" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"> -->
    <input type="password" v-model="password" placeholder="Password" required minlength="3">
    <p>The password must be > 4 char</p>
    <!-- You also can use only one input and use "pointer-events: none;", but you still can select it using tab -->
    
    <input type="submit" value="Login" disabled>
    <input type="submit" value="Login" v-on:click="login()">
    <router-link to='signup' tag="rl" >Create account</router-link>
  </div>

</body>

</template>



<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500");
</style>

<!--This is how you add css to Vue -->
<style scoped src="../css/login.css"></style>

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
           this.$root.$data.events = new Object()
          axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/loadevents/' + this.$root.$data.username } )
          .then(result => {
            console.log(result.data.events)
            this.$root.$data.events = result.data.events
          })
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
