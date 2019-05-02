<template>
    <div>
        <button type="button" v-on:click="logout()">Logout</button>
        <router-link to='dashboard'>Dashboard</router-link>
        <router-link to='createevent'>Create Event</router-link>
        <router-link to='settings'>Settings</router-link>

    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
      logout() {
          this.$root.$data.authenticated = false
          this.$root.$data.username = ''
          this.$router.push('/login')
      }
  }
}
</script>
