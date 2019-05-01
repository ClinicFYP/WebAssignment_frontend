import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Login from '@/components/Users/Login'
import Register from '@/components/Users/Register'
import Verification from '@/components/Users/Verification'
import Activation from '@/components/Users/Activation'
import AccountSetting from '@/components/Users/AccountSetting'
import ResetPassword from '@/components/Users/ResetPassword'
import Home from '@/components/Home'
import AllBallot from '@/components/Ballots/Ballot'
import CreateBallot from '@/components/Ballots/CreateBallot'
import AllCandidate from '@/components/Candidates/AllCandidates'
import CreateCandidate from '@/components/Candidates/CreateCandidate'
import AllElection from '@/components/Election/AllElection'
import Vote from '@/components/Election/Vote'
import History from '@/components/Election/ElectionHistory'
import ElectionResult from '@/components/Election/Electionresult'
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
        },
        {
          path: '/election/vote/:id',
          name: 'Vote',
          component: Vote
        },
        {
          path: '/history',
          name: 'History',
          component: History
        },
        {
          path: '/electionResult/:id',
          name: 'ElectionResult',
          component: ElectionResult
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
      path: '/verification',
      name: 'Verification',
      component: Verification
    },
    {
      path: '/activation',
      name: 'Activation',
      component: Activation
    },
    {
      path: '/resetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    }
  ]
})
