<template>
<div>
    <Header></Header>
    <input type="text" v-model="event_name" placeholder="Event Name" />
    <br>
    <input type="text" v-model="event_location" placeholder="Event Location" />
    <br>
    <m-date-picker v-model="dates" :lang="en" :always-display="true" 
    :disp="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','', '', '取消', '确定']"></m-date-picker>
    <br>
    <button type="button" v-on:click="createEvent()">Create Event</button>

</div>
</template>

<script>

import Header from '../components/Header'
import axios from 'axios'

export default {
    name: 'CreateEvent',
    data() {
        return {
            dates: [],
            event_name: '',
            event_location: ''
        }
    },
    methods: {
        createEvent() {
            console.log(JSON.stringify(this.dates))
            axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/createevent/' 
            + this.event_name + '/' + this.$root.$data.username + '/' + JSON.stringify(this.dates)
            + '/' + this.event_location} )
            .then(result => {
                console.log(result)
                if (result.data.successful) {
                    window.alert("Successfully create event")
                    this.$router.push('/dashboard')
                } else {
                    window.alert("Event creation failed")
                }
            })
        }
    },
    components: {
        Header
    },
    beforeMount() {
        if (!this.$root.$data.authenticated) {
            this.$router.push('/login')
        }
    }
}

</script>