import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import discover from '../pages/discover'
import disdetail from '../pages/disdetail'

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
    },
    {
      path:'/discover',
      name:'discover',
      component:discover
          // children:[
          //   {
          //     path: '/disdetail',
          //     name: 'disdetail',
          //     component: disdetail
          //   }
        // ]
    },
    {
      path:'/disdetail/:id/:key',
      name:'disdetail',
      component:disdetail
    }
  ]
})
