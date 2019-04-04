import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'


import Login from '@/components/Users/Login'
import Register from '@/components/Users/Register'
import AccountSetting from '@/components/Users/AccountSetting'

import Home from '@/components/Home'

import AllBallot from '@/components/Ballots/Ballot'
import CreateBallot from '@/components/Ballots/CreateBallot'

import AllCandidate from '@/components/Candidates/AllCandidates'
import EditCandidate from '@/components/Candidates/EditCandidate'
import CreateCandidate from '@/components/Candidates/CreateCandidate'

import AllElection from '@/components/Election/AllElection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/accountSetting',
          name: 'AccountSetting',
          component: AccountSetting
        },
        {
          path: '/ballot/allBallot',
          name: 'AllBallot',
          component: AllBallot
        },
        {
          path: '/ballot/createBallot',
          name: 'CreateBallot',
          component: CreateBallot
        },
        {
          path: '/ballot/editBallot/:id',
          name: 'EditBallot',
          component: CreateBallot
        },
        {
          path: '/candidate/allCandidates',
          name: 'AllCandidate',
          component: AllCandidate
        },
        {
          path: '/candidate/createCandidates',
          name: 'CreateCandidate',
          component: CreateCandidate
        },
        {
          path: '/candidate/editCandidates/:id',
          name: 'EditCandidate',
          component: CreateCandidate
        },
        {
          path: '/election/allElection',
          name: 'AllElection',
          component: AllElection
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
    }
  ]
})
