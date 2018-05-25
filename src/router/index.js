import Vue from 'vue'
import Router from 'vue-router'
import flightList from '@/components/flightList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'flightList',
      component: flightList
    }
  ]
})
