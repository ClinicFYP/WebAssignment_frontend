<template>
  <div class="container">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="email"
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="password"
      >
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="login">Sign in</button>
       <button class="btn btn-lg btn-danger btn-block" type="submit" v-on:click="goRegister">Sign Up</button>
    </form>
  </div>
</template>

<script>
import {UserService} from '../../Services/UserService'
export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
        async login(){
            await UserService.login(this.email, this.password)
            .then(response => {
              console.log(response.user)
              this.$router.push({name:'Home'})
            })
            .catch(error => {
              console.log(error)
            })
        },
        goRegister(){
          this.$router.push({name:'Register'})
        }
    }
}
</script>


<style scoped>
.container {
  max-width: 400px;
}
input{
  margin-top: 10px;
}
</style>