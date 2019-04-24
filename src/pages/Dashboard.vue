<template>

<div>
    <Header></Header>
    <div>Welcome {{ this.$root.$data.username }}</div>
    <div id="calendarSelector">
        <div id="personalCalendar" class="calendarChoice">Personal</div>
        <div id="groupCalendar" class="calendarChoice">Groups</div>
    </div>
    <div id="eventList" class="test">
        <h2>Events</h2>
    </div>
    <div id="visualCalendar" class="test">
        <h2>Calendar</h2>
    </div>

</div>
</template>

<script>

import Header from '../components/Header'

export default {
  name: 'Dashboard',
  methods: {
  },
  components: {
    Header
  }
}

</script>

<style>
#calendarSelector{
    font-size: 24px;
    text-align: center;
}

#groupCalendar{
    border-right: 1px solid black;
}

.calendarChoice{
    margin: 0 auto;
    display: inline;
    border-width: 1px 0px 1px 1px;
    border-color: black;
    border-style: solid;
    padding: 10px 20px 10px 20px;
}

#eventList{
    width: 19%;
    height: 100px;
    background-color: gray;
    float: left;
}

h2{
    text-align: center;
}

#visualCalendar{
    width:80%;
    height: 100px;
    background-color: orange;
    float: left;
}

.test{
    border: 1px solid black;
    margin-top: 20px;
}

</style>
