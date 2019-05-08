<template>
    <div>
        <Header></Header>
        <div class="creationContainer">
            <div class="popOut">
                <h2>Chosen date: {{this.$root.$data.currentEvent.chosenDate}}</h2>
                <br>
                <table border="2">
                    <ul id="times">
                        <td width="75px" height="15px"></td>
                        <td width="75px" height="15px">{{days[this.day]}}</td>
                        <li v-for="(time, index) in this.times">
                            <td width="75px" height="15px">{{ time }}</td>

                            <td width="75px" height="15px" style="background-color:orange" v-bind:style="{opacity: getOpacity(day + index * 7)}" v-on:click="chooseTime(day + index * 7)"></td>
                        </li>
                    </ul>
                </table>
                <button v-on:click="cancel()">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped type="text/css">
    .popOut table{
        font-size: 18px;
        margin: 0 auto;
    }
</style>

<script>

import Header from '../components/Header'
import axios from 'axios'

export default {
    name: 'ChooseTime', 
    beforeMount () {
        if (!this.$root.$data.authenticated) {
            this.$router.push('/login')
        }
    },
    data() {
        return {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            times: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
            timesValue: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
            day: this.$root.$data.currentEvent.chosenDate.getDay()
        }
    }, 
    methods: {
        getOpacity(index) {
            var totalUsers = this.$root.$data.currentEvent.event_users.length
            var opacity = this.$root.$data.currentEvent.added_schedules[index] / totalUsers
            
            return opacity
        },
        chooseTime(index) {
            var floorIndex = Math.floor(index/7)
            var completeTime = this.$root.$data.currentEvent.chosenDate
            completeTime.setHours(this.timesValue[floorIndex])
            var confirm = window.confirm("Do you want to choose " + completeTime + "?")
            if (confirm) {
                axios({method: 'GET', 'url':this.$root.$data.backendAddress + '/finalizetime/' + this.$root.$data.currentEvent.event_id + '/' + completeTime.toString()} )
                .then(result => {
                    if (result.data.successful) {
                        axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/loadevents/' + this.$root.$data.username } )
                        .then(result => {
                            console.log(result.data.events)
                            this.$root.$data.events = result.data.events
                            window.alert("Successfully chose your time")
                            this.$root.$data.currentEvent.event_time = completeTime
                            this.$router.go(-1)
                        })
                    }
                })
                
            }

        },
        cancel() {
            this.$router.go(-1)
        }
    },
    components: {
        Header
    }
}
</script>
