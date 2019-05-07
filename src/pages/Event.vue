<template>

    <div>
        <Header></Header>
        <div class="creationContainer" :key="componentKey">
            <div class="popOut">
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
                <h3>Add users</h3>
                <div v-for="(user, index) in this.users">
                    <input v-model="users[index]" class="inputUser"> 
                    <button v-on:click="deleteUser(index)">
                    delete
                    </button>
                </div>

                <button v-on:click="addUser()">
                                New User
                            </button>
                <button v-on:click="addUsers()">
                    Add Users
                </button>
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
        </div>
    </div>

</template>

<style scoped type="text/css">
    .inputUser {
        height: 20px;
        margin-right: -5px;
    }

    button{
        margin-bottom: 5px;
        margin-right: 5px;
        width: 120px;
        height: 27px;
    }

    li {
        list-style-type: none;
    }
</style>

<script>

import Header from '../components/Header'
import axios from 'axios'

export default {
    name: 'Event',
    components: {
        Header
    },
    methods: {
        chooseTime() {

        },
        getOpacity(index) {
            var totalUsers = this.$root.$data.currentEvent.event_users.length
            var opacity = this.$root.$data.currentEvent.added_schedules[index] / totalUsers
            
            return opacity
        },
        addUser: function () {
            this.users.push('');
        },
        deleteUser: function (index) {
            console.log(index);
            console.log(this.finds);
            this.users.splice(index, 1);
            if(index===0)
                this.addUser()
        },
        addUsers () {
            axios( {method:'GET', 'url':this.$root.$data.backendAddress + '/addusers/' + this.$root.$data.currentEvent.event_id + '/' + this.users.toString()})
            .then(result1 => {
                console.log(result1)
                if (result1.data.successful) {
                    axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/loadevent/' + this.$root.$data.currentEvent.event_id } )
                    .then(result2 => {
                        console.log(result2)
                        this.$root.$data.currentEvent = result2.data.data
                        console.log(this.$root.$data.currentEvent)
                        axios( {method: 'GET', 'url': this.$root.$data.backendAddress + '/geteventschedule/' + this.$root.$data.currentEvent.event_id})
                        .then(result3 => {
                            console.log(result3)
                            this.$root.$data.currentEvent.added_schedules = result3.data.addedSchedules
                            this.componentKey = !this.componentKey
                            window.alert("Successfully added new users")
                        })
                    })
                } else {
                    window.alert("Failed to add new users")
                }
            })
        }
    },
    data() {
        return {
            times: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
            scheduleColor: 'orange',
            users: [''],
            componentKey: false

        }
    }, 
    beforeMount () {
        if (!this.$root.$data.authenticated) {
            this.$router.push('/login')
        }

    }

}
</script>