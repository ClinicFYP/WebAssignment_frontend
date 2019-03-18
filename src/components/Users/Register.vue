<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="handleSubmit">
      <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>

      <b-alert variant="danger" fade v-model="error">
        {{message}}
      </b-alert>

      <label for="inputEmail" class="sr-only">First Name</label>
      <input
        type="firstName"
        id="inputfirstName"
        class="form-control"
        placeholder="First Name"
        autofocus
        required
        v-model="firstName"
      >
      <div class="error-input" v-if="!$v.firstName.minLength">First Name must have at least {{$v.firstName.$params.minLength.min}} letters.</div>
      
      <label for="inputEmail" class="sr-only">Last Name</label>
      <input
        type="lastName"
        id="inputLastName"
        class="form-control"
        placeholder="Last Name"
        required
        v-model="lastName"
      >
      <div class="error-input" v-if="!$v.lastName.minLength">Last Name must have at least {{$v.lastName.$params.minLength.min}} letters.</div>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        v-model="email"
      >
      <div class="error-input" v-if="!$v.email.email">Email format {{$v.email.email}}</div>

      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="password"
      >
      <div class="error-input" v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>

      <label for="inputPassword" class="sr-only">Confirm Password</label>
      <input
        type="password"
        id="inputConfirmPassword"
        class="form-control"
        placeholder="Confirm Password"
        required
        v-model="confirmPassword"
      >
      <div class="error-input" v-if="!$v.confirmPassword.sameAsPassword">Passwords not match.</div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" v-model="remember"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" v-on:click="goLogin">Sign in</button>
       <button class="btn btn-lg btn-danger btn-block" type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import {UserService} from '../../Services/UserService'
import {EventBus} from '../../../helper/eventbus'
import {required, email, minLength, sameAs} from "vuelidate/lib/validators";
import {authStatus} from '../../../helper/authHeader'
export default {
  data: function () {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: false,
      message: 'Please input valid data!',
      remember: false
    }
  },
  validations: {
    firstName:{
      required,
      minLength: minLength(4)
    },
    lastName:{
      required,
      minLength: minLength(4)
    },
    email:{
      required,
      email
    },
    password:{
      required,
      minLength: minLength(6)
    },
    confirmPassword:{
      required,
      sameAsPassword: sameAs('password')
    },
  },
  mounted: function(){
        if(authStatus()){
            this.$router.push('/')
        }
  },
  methods: {
        goLogin(){
          this.$router.push('/')
        },
        async handleSubmit(e) {
          this.error = false
          
          if (this.$v.$invalid) {
            this.error = true
          } else {
            await UserService.register(this.firstName, this.lastName, this.email, this.password, this.remember)
            .then(response => {
              EventBus.$emit('login', true);
              this.$router.push({name:'Home'})
              console.log(response.user)
            })
            .catch(error => {
              this.error = true
              this.message = error
            })
          }
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
