import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
import SignUp from './pages/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import Home from './Home.vue'
import Settings from './pages/Settings.vue'
import CreateEvent from './pages/CreateEvent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/createevent',
      name: 'createevent',
      component: CreateEvent
    }
  ]
})
