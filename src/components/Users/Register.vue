<template>
  <div class="container">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
      <label for="inputEmail" class="sr-only">First Name</label>
      <input
        type="firstName"
        id="inputfirstName"
        class="form-control"
        placeholder="First Name"
        required
        autofocus
        v-model="firstName"
      >
      <label for="inputEmail" class="sr-only">Last Name</label>
      <input
        type="lastName"
        id="inputLastName"
        class="form-control"
        placeholder="Last Name"
        required
        v-model="lastName"
      >
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
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
      <label for="inputPassword" class="sr-only">Confirm Password</label>
      <input
        type="password"
        id="inputConfirmPassword"
        class="form-control"
        placeholder="Confirm Password"
        required
        v-model="confirmPassword"
      >
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <!-- <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="goLogin">Sign in</button> -->
       <button class="btn btn-lg btn-danger btn-block" type="submit" v-on:click="register">Register</button>
    </form>
  </div>
</template>

<script>
import {UserService} from '../../Services/UserService'
export default {
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
        goLogin(){
          console.log('click')
          this.$router.push({name:'Login'})
        },
        async register(){
          if(this.password != this.confirmPassword){
            alert('not match')
            return
          }
          await UserService.register(this.firstName, this.lastName, this.email, this.password)
            .then(response => {
              console.log(response.user)
            })
            .catch(error => {
              console.log(error)
            })
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
