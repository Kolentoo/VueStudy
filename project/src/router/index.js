import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import discover from '../pages/discover'
import disdetail from '../pages/disdetail'
import movie from '../pages/movie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
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
    },
    {
      path:'/movie',
      name:'movie',
      component:movie
    }
  ]
})
