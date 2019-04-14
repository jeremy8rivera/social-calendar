<template>
  <div>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="text" v-model="firstname" placeholder="First Name" />
    <input type="text" v-model="lastname" placeholder="Last Name" />
    <input type="password" v-model="password1" placeholder="Password" />
    <input type="password" v-model="password2" placeholder="Re-enter Password" />
    <button type="button" v-on:click="register()">Login</button>
    <br>
  </div>
</template>

<script>
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
      if(this.username === this.$root.$data.tempAccount.username) {
          window.alert("This username exists already!")
      } else if(!(this.password1 === this.password2)) {
          window.alert("Passwords do not match")
      } else {
          window.alert("Successfully created account")
          this.$router.push('login')
      }

    }
  }
}

</script>