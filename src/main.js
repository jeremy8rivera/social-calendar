import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mDatePicker from 'vue-multi-date-picker'

Vue.config.productionTip = false
Vue.use(mDatePicker)

new Vue({
  router,
  render: h => h(App),
  data: {
    username: '',
    authenticated: false,
    name: '',
    backendAddress: 'http://localhost:3000'
  }
}).$mount('#app')
