<template>

<div>
    <Header></Header>
    <div id="eventListContainer" class="test">
        <h2>Events</h2>

        <ul style="list-style: none;" id="events">
            <li v-for="(event, index) in this.$root.$data.events">
                <div class="eventBox">
                    <div class="eventBoxHeaders">
        		        <h3 class="eventBoxNameDate">{{ event.event_name }} | {{ event.event_time}}</span></h3>
        	        </div>
        		    <p class="eventBoxLocation">{{ event.event_location}}</p>
                    <p class="eventBoxLocation">{{ event.event_description}}</p>
                    <input type="submit" value="Go to event" v-on:click="goToEvent(index)">

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
      :events="calendarEvents"
      @dateClick="handleDateClick"
      />
    </div>

</div>
</template>

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

  },
  data: function () {
    return {
        calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
        ],
        calendarWeekends: true,
        calendarEvents: [
        { title: 'Event Now', start: new Date() }
        ]
    }
  },
  methods : {
      goToEvent(index) {
          this.$root.$data.currentEvent = this.$root.$data.events[index]
          this.$router.push('/event')
   
      }
  }
}

</script>

<style>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

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
	margin-bottom: 5px;
}

.eventBoxHeaders{
	background-color: #268fff;
	color: white;
}

.eventBoxNameDate{
	border-bottom: 1px solid black;
	font-size: 14px;
	margin: 0px;
}

.eventBox p{
	font-size: 12px;
	margin: 0;
}

</style>
