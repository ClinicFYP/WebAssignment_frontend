<template>
  <div>
    <b-navbar class="navbar navbar-expand-lg navbar-dark bg-dark" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#" v-on:click="backToHome">Online Voting System</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse" />
        <b-collapse is-nav id="nav_collapse" v-if="isLogin">
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown class="dropdown" :text="userName" right>
              <b-dropdown-item href="#" v-on:click="accountUpdate">Account Setting</b-dropdown-item>
              <b-dropdown-item href="#" v-on:click="doLogout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {authStatus, getUserName} from '@/helper/authHeader'
import {UserServices} from '~Services/UserServices'
import { EventBus } from 'helper/eventBus'

export default {
  name: 'Navbar',
  data: function () {
    return {
      isLogin: authStatus(),
      userName: getUserName()
    }
  },
  created () {
    EventBus.$on('login', () => {
      this.isLogin = authStatus()
      this.userName = getUserName()
    })
  },
  methods: {
    doLogout () {
      console.log('123')
      UserServices.logout()
      this.isLogin = authStatus()
      this.$router.push('/login')
      // UserService.logout()
      //   .then(response => {
      //     this.isLogin = authStatus()
      //     this.$router.push('/login')
      //   })
      //   .catch(error => {
      //     // this.error = true
      //     // this.message = error
      //     console.log(error)
      //   })
    },
    accountUpdate () {
      this.$router.push({name: 'AccountSetting'})
    },
    backToHome () {
      if (this.isLogin) {
        this.$router.push({name: 'Home'})
      } else {
        this.$router.push({name: 'Layout'})
      }
    }
  }
}
</script>

<style scoped>
.dropdown{
  font-size: 20px
}
</style>
