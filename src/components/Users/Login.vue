<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="handleSubmit">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

      <b-alert variant="danger" fade v-model="error">
        {{message}}
      </b-alert>

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
      <div
        class="error-input"
        v-if="!$v.password.minLength"
      >Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" v-model="remember"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <button class="btn btn-lg btn-danger btn-block" v-on:click="goRegister">Sign Up</button>
    </form>
  </div>
</template>

<script>
import {UserService} from "../../Services/UserService";
import {required, email, minLength} from "vuelidate/lib/validators";
import {EventBus} from "../../../helper/eventbus";
import {authStatus} from '../../../helper/authHeader'
export default {
  data: function() {
    return {
      email: "",
      password: "",
      remember: false,
      error: false,
      message: 'Please input valid data!',
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },  
  mounted: function(){
        if(authStatus()){
            this.$router.push('/')
        }
  },
  methods: {
    async handleSubmit(e) {
      this.error = false
          
          if (this.$v.$invalid) {
            this.error = true
          } else {
            await UserService.login(this.email, this.password, this.remember)
            .then(response => {
              console.log(response.user);
              EventBus.$emit("login", true);
              this.$router.push({ name: "Home" })
        })
        .catch(error => {
          this.error = true
          this.message = error
        });
          }
    },
    goRegister() {
      this.$router.push({ name: "Register" })
    }
  }
}
</script>


<style scoped>
.container {
  max-width: 400px;
}
input {
  margin-top: 10px;
}
</style>