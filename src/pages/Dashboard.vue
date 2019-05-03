<template>

<div>
    <Header></Header>
    <div id="calendarSelector">
        <div id="personalCalendar" class="calendarChoice activeTab">Personal</div>
        <div id="groupCalendar" class="calendarChoice">Groups</div>
    </div>
    <div id="eventListContainer" class="test">
        <h2>Events</h2>
    </div>
    <div id="visualCalendarContainer" class="test">
        <h2>{{ this.$root.$data.username }}'s Calendar</h2>
        <FullCalendar
      class='visualCalendar'
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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

export default {
  name: 'Dashboard',
  methods: {
  },
  components: {
    Header
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
  }
}

</script>

<style>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

.fc-past {
    background-color: lightgray;
}

.fc-body{
    font-weight: bold;
}

.fc-button{
    background-color: purple;
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
    height: 100px;
    float: left;
}

h2{
    text-align: center;
}

#visualCalendarContainer{
    width:79%;
    float: left;
    padding: .5%;
}

.test{
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 20px;
    border-color: #d8d8d8;
}

.activeTab{
	background-color: lightgray;
}

</style>
