<template>
    <div>
        <button class="btn logout" type="button" v-on:click="logout()">Logout</button>
       
        <router-link to='settings' tag="rl" class='btn'>Settings</router-link>

        <router-link to='schedule' tag="rl" class='btn'>Schedule</router-link>

        <router-link to='createevent' tag="rl" class='btn'>Create Event</router-link>

        <router-link to='dashboard' tag="rl" class='btn'>Dashboard</router-link>
    </div>
</template>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500");
</style>

<!--This is how you add css to Vue -->
<style scoped src="../css/header.css"></style>

<script>
export default {
    name: 'Header',
    data() {
        return {
            size: '24px'
        }
    },
    methods: {
      logout() {
          this.$root.$data.authenticated = false
          this.$root.$data.username = ''
          this.$router.push('/login')
      }
  }
}
</script>
