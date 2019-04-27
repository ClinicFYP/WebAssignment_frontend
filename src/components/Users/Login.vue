<template>
  <div class='container'>
    <b-form class='form-signin' @submit.prevent='handleSubmit'>
      <h1 class='h3 mb-3 font-weight-normal'>Please sign in</h1>

      <b-alert variant='danger' fade v-model='error'>{{message}}</b-alert>
      <b-form-group label='Email' label-for='inputEmail'>
        <b-form-input
          type='email'
          id='inputEmail'
          class='form-control'
          placeholder='Email address'
          required
          autofocus
          v-model='user.email'
          :state='$v.user.email.required && $v.user.email.email'
        />
        <b-form-invalid-feedback id='inputEmail' v-if='!$v.user.email.required'>Email required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          id='inputEmail'
          v-else-if='!$v.user.email.email'
        >Invalid email format</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label='Password' label-for='inputPassword'>
        <b-form-input
          type='password'
          id='inputPassword'
          class='form-control'
          placeholder='Password'
          required
          v-model='user.password'
          :state='$v.user.password.required && $v.user.password.minLength'
        />
        <b-form-invalid-feedback
          id='inputPassword'
          v-if='!$v.user.password.required'
        >Password required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          id='inputPassword'
          v-else-if='!$v.user.password.minLength'
        >Password must have at least {{$v.user.password.$params.minLength.min}} letters.</b-form-invalid-feedback>
      </b-form-group>

      <div class='checkbox mb-3'>
        <label>
          <input type='checkbox' v-model='user.remember'> Remember me
        </label>
      </div>
      <button class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
      <button class='btn btn-lg btn-danger btn-block' v-on:click='goRegister'>Sign Up</button>
    </b-form>
  </div>
</template>

<script>
import { UserServices } from '../Services/UserServices'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { EventBus } from '../helper/eventbus'
import { authStatus, authToken } from '../helper/authHeader'
export default {
  data: function () {
    return {
      user: {
        email: '',
        password: '',
        remember: false
      },
      error: false,
      message: 'Please input valid data!'
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  mounted: function () {
    console.log(authToken())
    if (authStatus()) {
      this.$router.push('/')
    }
  },
  methods: {
    async handleSubmit (e) {
      this.error = false

      if (this.$v.$invalid) {
        this.error = true
      } else {
        await UserServices.login(this.user)
          .then(response => {
            console.log(response.result.token)
            EventBus.$emit('login', true)
            this.$router.push({ name: 'Home' })
          })
          .catch(error => {
            this.error = true
            this.message = error
          })
      }
    },
    goRegister () {
      this.$router.push({ name: 'Register' })
    }
  }
}

</script>

<style scoped>
.container {
  margin-top: 40px;
  max-width: 400px;
}
input {
  margin-top: 10px;
}
</style>
