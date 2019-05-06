<template>


<div>
<Header></Header>

<h2>
    {{ this.$root.$data.currentEvent.event_name}}
</h2>
Location: {{ this.$root.$data.currentEvent.event_location}}
<br>
Users List
<li v-for="user in this.$root.$data.currentEvent.event_users">
    {{user}}
</li>
<br>
Possible dates
<li v-for="date in this.$root.$data.currentEvent.event_dates">
    {{date.substring(1, 11)}}
</li>
<button v-if="this.$root.$data.currentEvent.event_time === 'Time not chosen' && this.$root.$data.currentEvent.event_admin === this.$root.$data.username" v-on:click="chooseTime()">Choose Time</button>
<div v-if="this.$root.$data.currentEvent.event_time !== 'Time not chosen'">
    Event Time: {{this.$root.$data.currentEvent.event_time  }}
</div>

    <table border="2">


        <ul id="times">
        <tr>
            <td width="75px" height="15px">Time</td>
            <td width="75px" height="15px">Sunday</td>
            <td width="75px" height="15px">Monday</td>
            <td width="75px" height="15px">Tuesday</td>
            <td width="75px" height="15px">Wednesday</td>
            <td width="75px" height="15px">Thursday</td>
            <td width="75px" height="15px">Friday</td>
            <td width="75px" height="15px">Saturday</td>
        </tr>
            <li v-for="(time, index) in this.times">
                <tr>
                <td width="75px" height="15px">{{ time }}</td>
                <td  width="75px" height="15px" style="background-color:orange" v-bind:style="{opacity: getOpacity(0 + index * 7)}"></td>
                <td  width="75px" height="15px" style="background-color:orange" v-bind:style="{opacity: getOpacity(1 + index * 7)}"></td>
                <td  width="75px" height="15px" style="background-color:orange" v-bind:style="{opacity: getOpacity(2 + index * 7)}"></td>
                <td  width="75px" height="15px" style="background-color:orange" v-bind:style="{opacity: getOpacity(3 + index * 7)}"></td>
                <td  width="75px" height="15px" style="background-color:orange" v-bind:style="{opacity: getOpacity(4 + index * 7)}"></td>
                <td  width="75px" height="15px" style="background-color:orange" v-bind:style="{opacity: getOpacity(5 + index * 7)}"></td>
                <td  width="75px" height="15px" style="background-color:orange" v-bind:style="{opacity: getOpacity(6 + index * 7)}"></td>
                </tr>
            </li>
        </ul>


    </table>

</div>

</template>

<script>

import Header from '../components/Header'
import axios from 'axios'

export default {
    name: 'Event',
    components: {
        Header
    },
    beforeMount() {
        if (!this.$root.$data.authenticated) {
            console.log(this.waiting)
            this.$router.push('/login')
        }



    },
    methods: {
        chooseTime() {
            
        },
        getOpacity(index) {
            var totalUsers = this.$root.$data.currentEvent.event_users.length
            var opacity = this.$root.$data.currentEvent.added_schedules[index] / totalUsers
            
            return opacity
        }
    },
    data() {
        return {
            times: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
            scheduleColor: 'orange',
        }
    }

}
</script>