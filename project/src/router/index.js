import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import discover from '../pages/discover'
import disdetail from '../pages/disdetail'
import movie from '../pages/movie'
import mdetail from '../pages/mdetail'
import video from '../pages/video'
import reading from '../pages/reading'
import kolento from '../pages/kolento'

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
      path:'/discover/disdetail/:id/:key',
      name:'disdetail',
      component:disdetail
    },
    {
      path:'/movie',
      name:'movie',
      component:movie
    },
    {
      path:'/movie/mdetail/:mid',
      name:'mdetail',
      component:mdetail
    },
    {
      path:'/video',
      name:'video',
      component:video
    },
    {
      path:'/reading',
      name:'reading',
      component:reading
    },
    {
      path:'/kolento',
      name:'kolento',
      component:kolento
    }
  ]
})
