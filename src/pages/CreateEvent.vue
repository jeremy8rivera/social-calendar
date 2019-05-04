<template>
<div>
    <Header></Header>
Event Name </br>
    <input type="text" v-model="event_name" placeholder="Event Name" />
    <br>
    <input type="text" v-model="event_location" placeholder="Event Location" />
    <br>
    <input type="text" v-model="event_description" placeholder="Event Description" />
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
            event_location: '',
            event_description: ''
        }
    },
    methods: {
        createEvent() {
            console.log(JSON.stringify(this.dates))
            axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/createevent/' 
            + this.event_name + '/' + this.$root.$data.username + '/' + JSON.stringify(this.dates)
            + '/' + this.event_location + '/' + this.event_description } )
            .then(result => {
                console.log(result)
                if (result.data.successful) {
                    window.alert("Successfully create event")

                    axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/loadevents/' + this.$root.$data.username } )
                    .then(result => {
                        this.$root.$data.events = result.data.events
                    })
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