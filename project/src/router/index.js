import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import discover from '../pages/discover'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/discover'
    },
    {
      path: '/home',
      name: 'home',
      component: home
      // children:[{
      //   path: '/home',
      //   name: 'home',
      //   component: home
      // }]
    },
    {
      path:'/discover',
      name:'home',
      component:discover
    }
  ]
})
