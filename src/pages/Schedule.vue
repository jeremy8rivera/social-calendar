<template>
    <div>
        <Header></Header>
        <div class="creationContainer">
            <div class="popOut">
                <h2> Select When Busy </h2>
                <table>
                    <tr>
                        <td>Time</td>
                        <td>Sunday</td>
                        <td>Monday</td>
                        <td>Tuesday</td>
                        <td>Wednesday</td>
                        <td>Thursday</td>
                        <td>Friday</td>
                        <td>Saturday</td>
                    </tr>
                    <tr v-for="(time, index) in this.times">
                        <td>{{ time }}</td>
                        <td><input v-model="scheduleArray[0 + index * 7]" type="checkbox"></td>
                        <td><input v-model="scheduleArray[1 + index * 7]" type="checkbox"></td>
                        <td><input v-model="scheduleArray[2 + index * 7]" type="checkbox"></td>
                        <td><input v-model="scheduleArray[3 + index * 7]" type="checkbox"></td>
                        <td><input v-model="scheduleArray[4 + index * 7]" type="checkbox"></td>
                        <td><input v-model="scheduleArray[5 + index * 7]" type="checkbox"></td>
                        <td><input v-model="scheduleArray[6 + index * 7]" type="checkbox"></td>
                    </tr>
                </table>
                <button type="button" v-on:click="submitSchedule()">Submit Schedule</button>    
            </div>
        </div>
    </div>
</template>

<style scoped src="../css/schedule.css"></style>

<script>

import Header from '../components/Header'
import axios from 'axios'

export default {
    name: 'Schedule',
    components: {
        Header
    },
    beforeMount() {
        if (!this.$root.$data.authenticated) {
            this.$router.push('/login')
        }
    },
    methods : {
        submitSchedule() {
            axios( {method: 'GET', 'url':this.$root.$data.backendAddress + '/updateschedule/' + this.$root.$data.username + '/' + this.scheduleArray.join()})
            .then(result => {
                if (result.data.successful) {
                    window.alert("Updated your schedule")
                    this.$router.push('/dashboard')
                } else {
                    window.alert("Something went wrong")
                }
            })
        }
    }, 
    data() {
        return {
            scheduleArray: [],
            times: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM']
        }
    }
}

</script>
