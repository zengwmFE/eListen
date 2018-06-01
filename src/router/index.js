import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from "@/components/register"
import LoginComponent from "@/components/LoginComponent"
import Home from "@/components/Home";
import Word from "@/components/Word";
import Habit from "@/components/Habit";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      children:[
        {
          path:"/",
          name:"LoginComponent",
          component:LoginComponent
        },
        {
          path:"/res",
          name:"Register",
          component:Register
        }
      ]
    },
    {
      path:"/home",
      name:"Home",
      component:Home
    },
    {
      path:"/word",
      name:"Word",
      component:Word
    },
    {
      path:"/habit",
      name:"Habit",
      component:Habit
    }
  ]
})
