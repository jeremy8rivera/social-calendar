<template>
  <div>
    <input type="text" v-model="username" placeholder="Username" />
    <br>
    <input type="text" v-model="firstname" placeholder="First Name" />
    <br>
    <input type="text" v-model="lastname" placeholder="Last Name" />
    <br>
    <input type="password" v-model="password1" placeholder="Password" />
    <br>
    <input type="password" v-model="password2" placeholder="Re-enter Password" />
    <br>
    <button type="button" v-on:click="register()">Signup</button>
    <br>
  </div>
</template>

<script>

import axios from 'axios'
import sha1 from 'sha1'

export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
      firstname: '',
      lastname: ''
    }
  },
  methods: {
    register() {
      if(!(this.password1 === this.password2)) {
          window.alert("Passwords do not match")
      } else {
        axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/signup/' + this.username.toLowerCase() + '/' 
        + sha1(this.password1) + '/' + this.firstname + ' ' + this.lastname })
        .then(result => {
          console.log(result)
          if (result.data.duplicate) {
            window.alert('User with that username exists already')
          } else {
            window.alert("Successfully created account")
            this.$router.push('/login')
          }
        })
      }
    }
  },
  beforeMount () {
    this.$root.$data.authenticated = false
    this.$root.$data.username = '',
    this.$root.$data.name = ''
  }
}

</script>