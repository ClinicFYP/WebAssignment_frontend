import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Login from '@/components/Users/Login'
import Register from '@/components/Users/Register'
import Home from '@/components/Home'
import Ballot from '@/components/Ballots/Ballot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'ballots',
          name: 'Ballots',
          component: Ballot
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ballots',
      name: 'Ballots',
      component: Ballot
    }
    // {
    //   path: '/',
    //   name: 'Layout',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'home',
    //       name: 'Home',
    //       component: Home
    //     },
    //     {
    //       path: 'ballots',
    //       name: 'Ballots',
    //       component: Ballot
    //     }
    //   ]
    // }
  ]
})
