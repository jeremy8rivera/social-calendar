<template>

<div :key="componentKey">
    <Header></Header>
    <div id="eventListContainer" class="test">
        <h2>Events</h2>

        <ul style="list-style: none;" id="events">
            <li v-for="(event, index) in this.$root.$data.events">
                <div class="eventBox">
                    <div class="eventBoxHeaders">
        		        <h3 class="eventBoxNameDate">{{ event.event_name }}</h3>
        	        </div>
                  <p class="eventBoxTime">Date: {{event.event_time}}</p>
        		    <p class="eventBoxLocation">Location: {{ event.event_location}}</p>
                    <p class="eventBoxLocation">{{ event.event_description}}</p>
                    <input type="submit" value="Go To Event" v-on:click="goToEvent(index)">

                </div>
            </li>
        </ul>
        
        </div>
    <div id="visualCalendarContainer" class="test">
        <h2>{{ this.$root.$data.name }}'s Calendar</h2>
        <FullCalendar
      class='visualCalendar'
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      }"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="this.$root.$data.calendarEvents"
      @dateClick="handleDateClick"
      />
    </div>

</div>
</template>

<style scoped type="text/css">
  .eventBox input[type=submit]{
    margin-top: 5px;
    background-color: #f9c422;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 3px;
    width: 100%;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
}

.eventBox input[type=submit]:hover{
  background-color: #edb407;
}
</style>

<script>

import Header from '../components/Header'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

export default {
  name: 'Dashboard',
  methods: {
  },
  components: {
    Header,
    FullCalendar
  }, 
  beforeMount () {
      if (!this.$root.$data.authenticated) {
          this.$router.push('/login')
      }

      axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/loadevents/' + this.$root.$data.username } )
          .then(result => {
            console.log(result.data.events)
            this.$root.$data.events = result.data.events
            
      })
      

  },
  data: function () {
    return {
        calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
        ],
        calendarWeekends: true,
        componentKey: false
    }
  },
  methods : {
      goToEvent(index) {

        this.$root.$data.currentEvent = this.$root.$data.events[index]
        axios( {method: 'GET', 'url': this.$root.$data.backendAddress + '/geteventschedule/' + this.$root.$data.currentEvent.event_id})
        .then(result => {
            this.$root.$data.currentEvent.added_schedules = result.data.addedSchedules
            this.$router.push('/event')
        })  
    }
  }
}

</script>
<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500");
</style>
<style>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

html {
  font-family: 'Roboto', 'sans-serif';
}

body{
	background-color: #639DDB;
}

.fc-past {
    background-color: lightgray;
}

.fc-body{
    font-weight: bold;
}

.fc-button{
    background-color: #268fff;
}

.fc-button-primary:not(:disabled).fc-button-active:focus{
	box-shadow: 0 0 0 0;
}

.fc-button-primary:not(:disabled).fc-button-active {
	background-color: gray;
}

.fc-button-primary:not(:disabled):focus{
	box-shadow: 0 0 0 0;
}

.fc-button-primary:disabled{
	background-color: gray;
	border: 1px solid #2C3E50;
	opacity: 1;
}

.fc-event-container{
    font-weight: normal;
}

#calendarSelector{
    font-size: 24px;
    text-align: center;
}

#groupCalendar{
    border-right: 1px solid gray;
}

.calendarChoice{
    margin: 0 auto;
    display: inline;
    border-width: 1px 0px 1px 1px;
    border-color: gray;
    border-style: solid;
    padding: 10px 20px 10px 20px;
}

#eventListContainer{
    width: 19%;
    height: 100%;
    float: left;
    margin-top: 45px;
}

h2{
    text-align: center;
}

ul{
    list-style: none;
    padding-left: 0;
}​

#eventListContainer h2{
	border-bottom: 1px solid #d8d8d8;
	padding-bottom: 20px;
	margin-bottom: 0px;
}

#eventListContainer h3{
  font-size: 16px;
  padding-left: 3px;
}

#visualCalendarContainer{
    width:79%;
    float: left;
    padding: .5%;
}

.test{
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    margin-top: 20px;
    border-color: #d8d8d8;
    background-color: white;
}

.activeTab{
	background-color: lightgray;
}

.eventBox{
	border-left: 1px solid black;
  border-right: 1px solid black;
	margin-bottom: 15px;
  border-bottom: 1px solid black;
  border-radius: 5px;
}

.eventBoxHeaders{
	background-color: #268fff;
	color: white;
  border-radius: 5px 5px 0px 0px;
}

.eventBoxNameDate{
	border-bottom: 1px solid black;
	font-size: 14px;
	margin: 0px;

}

.eventBox p{
	font-size: 15px;
	margin: 0;
  padding-left: 5px;
}

</style>
