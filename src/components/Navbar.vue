<template>
  <div>
    <b-navbar class="navbar navbar-expand-lg navbar-dark bg-dark" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#" @click="this.$router.push('/')">Online Voting System</b-navbar-brand>
        
        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse" v-if="isLogin">
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown :text="userName" right>
            <b-dropdown-item href="#" v-on:click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {authStatus, clear, getUserName} from '../../helper/authHeader'
import {UserService} from '../Services/UserService'
import { EventBus } from '../../helper/eventbus'

export default {
  name: 'Navbar',
  data: function() {
    return {
      isLogin: authStatus(),
      userName: getUserName()
    }
  },
  created () {
    EventBus.$on('login', ()=>{
      this.isLogin = authStatus()
      this.userName = getUserName()
    });
  },
  methods:{
    logout(){
      UserService.logout()
      this.isLogin = authStatus()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
</style>
