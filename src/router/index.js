import Vue from 'vue'
import Router from 'vue-router'
import flightList from '@/components/flightList'
import flight from '@/components/flight'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'flightList',
      component: flightList
    },
    {
      path: '/flight/:id',
      name: 'flight',
      component: flight
    },
  ]
})
