<template>
  <div class='container'>
    <b-form @submit.prevent='handleSubmit'>
      <h1 class='h3 mb-3 font-weight-normal'>Please sign up</h1>

      <b-alert variant='danger' fade v-model='error'>
        {{message}}
      </b-alert>

      <b-form-group label='First Name' label-for='inputFirstName'>
        <b-form-input
          type='text'
          id='inputfirstName'
          class='form-control'
          placeholder='First Name'
          autofocus
          required
          v-model='user.firstName'
          :state='$v.user.firstName.required && $v.user.firstName.minLength'
        />
        <b-form-invalid-feedback id='inputFirstName' v-if='!$v.user.firstName.required'>First name required</b-form-invalid-feedback>
        <b-form-invalid-feedback id='inputFirstName' v-else-if='!$v.user.firstName.minLength'>First name must have at least {{$v.user.firstName.$params.minLength.min}} letters.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label='Last Name' label-for='inputLastName'>
        <b-form-input
          type='text'
          id='inputLastName'
          class='form-control'
          placeholder='Last Name'
          required
          v-model='user.lastName'
          :state='$v.user.lastName.required && $v.user.lastName.minLength'
        />
        <b-form-invalid-feedback id='inputLastName' v-if='!$v.user.lastName.required'>Last name required</b-form-invalid-feedback>
        <b-form-invalid-feedback id='inputLastName' v-else-if='!$v.user.lastName.minLength'>Last name must have at least {{$v.user.lastName.$params.minLength.min}} letters.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label='Email' label-for='inputEmail'>
        <b-form-input
          type='email'
          id='inputEmail'
          class='form-control'
          placeholder='Email address'
          required
          v-model='user.email'
          :state='$v.user.email.required && $v.user.email.email'
        />
        <b-form-invalid-feedback id='inputEmail' v-if='!$v.user.email.required'>Email required</b-form-invalid-feedback>
        <b-form-invalid-feedback id='inputEmail' v-else-if='!$v.user.email.email'>Invalid email format</b-form-invalid-feedback>
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
        <b-form-invalid-feedback id='inputPassword' v-if='!$v.user.password.required'>Password required</b-form-invalid-feedback>
        <b-form-invalid-feedback id='inputPassword' v-else-if='!$v.user.password.minLength'>Password must have at least {{$v.user.password.$params.minLength.min}} letters.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label='Confirm Password' label-for='inputConfirmPassword'>
        <b-form-input
          type='password'
          id='inputConfirmPassword'
          class='form-control'
          placeholder='Confirm Password'
          required
          v-model='user.confirmPassword'
          :state='$v.user.confirmPassword.required && $v.user.confirmPassword.sameAsPassword'
        />
        <b-form-invalid-feedback id='inputConfirmPassword' v-if='!$v.user.confirmPassword.required'>Confirm Password required</b-form-invalid-feedback>
        <b-form-invalid-feedback id='inputConfirmPassword' v-else-if='!$v.user.confirmPassword.sameAsPassword'>Password not match</b-form-invalid-feedback>
      </b-form-group>
      <div class='checkbox mb-3'>
        <label>
          <input type='checkbox' v-model='user.remember'> Remember me
        </label>
      </div>
      <button class='btn btn-lg btn-primary btn-block' v-on:click='goLogin'>Sign in</button>
      <button class='btn btn-lg btn-danger btn-block' type='submit'>Sign Up</button>
    </b-form>
  </div>
</template>

<script>
import { UserServices } from '../Services/UserServices'
import {EventBus} from '../../helper/eventbus'
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
import {authStatus} from '../../helper/authHeader'
export default {
  data: function () {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        remember: false
      },
      error: false,
      message: 'Please input valid data!'
    }
  },
  validations: {
    user: {
      firstName: {
        required,
        minLength: minLength(4)
      },
      lastName: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  mounted: function () {
    if (authStatus()) {
      this.$router.push('/')
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/')
    },
    async handleSubmit (e) {
      this.error = false
      if (!this.$v.$invalid) {
        await UserServices.register(this.user)
          .then(response => {
            EventBus.$emit('login', true)
            this.$router.push({name: 'Home'})
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
  margin-top: 40px;
  max-width: 400px;
}

input{
  margin-top: 10px;
}

</style>
