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

            <div class="userChange">
            <div class="userInfo" v-for="(user, index) in users">
                <input placeholder="Enter Username" v-model="users[index]">
                <button class="deleteUser" v-on:click="deleteUser(index)">
                X
                </button>
            </div>
        </div>
        <button class="addUser" v-on:click="addUser()">
                Add User
        </button>
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
            event_description: '',
            users: ['']
        }
    },
    methods: {
        createEvent() {
            var usersStr = this.users.join()
            console.log(usersStr)
            axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/createevent/' 
            + this.event_name + '/' + this.$root.$data.username + '/' + this.dates.toString()
            + '/' + this.event_location + '/' + this.event_description + '/' + usersStr } )
            .then(result => {
                console.log(result)
                if (result.data.successful) {
                    window.alert("Successfully created event")
                    this.$root.$data.events = new Object()
                    axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/loadevents/' + this.$root.$data.username } )
                    .then(result => {
                        this.$root.$data.events = result.data.events
                    })
                    this.$router.push('/dashboard')
                } else {
                    window.alert("Event creation failed")
                }
            })
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

<style scoped type="text/css">
    .addUser {
        background-color: #f9c422;
        font-size: 12px;
        font-weight: bold;
        width: 50%;
        margin-bottom: 10px;
    }
    .addUser:hover{
        background-color: #edb407;
    }

    .deleteUser{
        width: 15%;
        background-color: #dc3545;
        font-size: 12px;
        font-weight: bold;
        margin-left: 2px;
    }
    .deleteUser:hover{
        background-color: #c91021;
    }

    .userChange{
        display: inline-block;
        margin-bottom: 10px;
    }
    .userInfo{
        width: 110%;
    }
</style>