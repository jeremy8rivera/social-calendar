import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data: {
    email: '',
    authenticated: false,
    name: '',
    backendAddress: 'http://localhost:3000'
  }
}).$mount('#app')
