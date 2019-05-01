<template>

    <div>
        <Header></Header>
        <h3>Update Password</h3>
        <input type="password" v-model="password" placeholder="Enter Current Password" />
        <input type="password" v-model="npassword1" placeholder="New Password" />
        <input type="password" v-model="npassword2" placeholder="Re-enter New Password" />
        <br>
        <button type="button" v-on:click="updatePassword()">Update</button>

    </div>

</template>

<script>

import Header from '../components/Header'
import axios from 'axios'
import sha1 from 'sha1'

export default {
    name: 'Settings',
    methods: {
        updatePassword() {

            if (this.npassword1 !== this.npassword2) {
                window.alert("New passwords do not match")
            } else {
                axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/settings/' + this.$root.$data.username.toLowerCase() + '/' 
                + sha1(this.password) + '/' + sha1(this.npassword1) })
                .then(result => {
                    console.log(result)
                    if (result.data.successful) {
                        window.alert('Successfully changed your password')
                        this.$router.push('/dashboard')
                    } else {
                        window.alert("Password wrong")
                    }
                })
            }
        }
    },
    components: {
        Header
    }, 
    beforeMount () {
      if (!this.$root.$data.authenticated) {
          this.$router.push('/login')
      }
    }
}

</script>