import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import login from '../components/login'
import Welcome from '../components/welcome'
import user from '../components/user/user'
import remen from '../components/movies/remen'
import reying from '../components/movies/reying'
import wsy from '../components/movies/wsy'
import comment from '../components/comments/comment'
import rmrank from '../components/rank/rmrank'
import ryrank from '../components/rank/ryrank'
import tjrank from '../components/rank/tjrank'

import moviedetail from '../components/movies/moviedetail'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path:'/',
      redirect :'/login'
    },
    {
      path:'/login',
      name:'login',
      component: login
    },
    {
      path: '/index',
      name:'index',
      component:index,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          name:'welcome',
          component: Welcome
        },
        {
          path:'/user',
          name:'user',
          component: user
        },{
          path:'/remen',
          name:'remen',
          component: remen
        },
        {
          path:'/reying',
          name:'reying',
          component: reying
        },
        {
          path:'/wsy',
          name:'wsy',
          component: wsy
        },
        {
          path:'/comment',
          name:'comment',
          component: comment
        },
        {
          path:'/rmrank',
          name:'rmrank',
          component: rmrank
        },
        {
          path:'/ryrank',
          name:'ryrank',
          component: ryrank
        },
        {
          path:'/tjrank',
          name:'tjrank',
          component: tjrank
        },
        
        {
          path:'/moviedetail',
          name:'moviedetail',
          component:moviedetail
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  //to将要访问您的的路径
  //from代表从哪个路径来
  //next是一个函数，表示放行
  // next()放行    next('/login)轻质跳转

  if(to.path==='/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router