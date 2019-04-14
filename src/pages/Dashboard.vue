<template>
<div>
  <Header></Header>
    <div>Welcome {{ this.$root.$data.username }}</div>

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
