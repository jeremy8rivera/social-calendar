<template>
    <div>
        <Header></Header>
        <div class="creationContainer">
            <div class="popOut">
            <h2>Event Name:</h2>
            <input type="text" v-model="event_name" placeholder="Event Name" />
            <h2>Event Location:</h2>
            <input type="text" v-model="event_location" placeholder="Event Location" />
            <h2>Event Description:</h2>
            <input type="text" v-model="event_description" placeholder="Event Description" />
            <br>
            <m-date-picker v-model="dates" :lang="en" :always-display="true" 
            :disp="['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','', '', '取消', '确定']"></m-date-picker>
            <br>
            <button type="button" v-on:click="createEvent()">Create Event</button>
        </div>
        </div>

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
                    window.alert("Successfully created event")

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

<style type="text/css">

.creationContainer{
    text-align: center;
    display: inline-block;
    width: 100%;
}

.creationContainer h2{
    margin-bottom: 0px;
    font-size: 20px;
}

.container{
    display: inline-block;
}

.container .selected-date{
    display: inline-block;
    text-align: center;
}

.popOut{
    display: inline-block;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    padding: 20px;
    padding-top: 0px;
    background-color: white;
    margin-top: 5px;
}

.popOut button{
    margin-top: 5px;
    background-color: #268fff;
    color: white;
    border: none;
    border-radius: 3px;
    width: 50%;
    height: 30px;
    font-size: 15px;
    cursor: pointer;
}

.popOut button:hover{
    background-color: #2867cc;
}


</style>