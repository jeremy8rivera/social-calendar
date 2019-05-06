<template>
<div>
<Header></Header>
{{ this.$root.$data.currentEvent}}
</div>
</template>

<script>

import Header from '../components/Header'

export default {
    name: 'Event',
    components: {
        Header
    },
    beforeMount() {
        this.$root.$data.authenticated = false
        this.$root.$data.username = '',
        this.$root.$data.name = ''
    }

}
</script>