<template>

    <div>
        <Header></Header>
        <h3>Update Password</h3>
        <input type="password" v-model="password" placeholder="Enter Current Password" />
        <input type="password" v-model="npassword1" placeholder="New Password" />
        <input type="password" v-model="npassword2" placeholder="Re-enter New Password" />
        <button type="button" v-on:click="updatePassword()">Update</button>

    </div>

</template>

<script>

import Header from '../components/Header'

export default {
    name: 'Settings',
    methods: {
        updatePassword() {
            if (this.password !== this.$root.$data.tempAccount.password) {
                window.alert("Current password is incorrect")
            } else if (this.npassword1 !== this.npassword2) {
                window.alert("New passwords do not match")
            } else {
                window.alert("Successfully updated password")
            }
        }
    },
    components: {
        Header
    }
}

</script>