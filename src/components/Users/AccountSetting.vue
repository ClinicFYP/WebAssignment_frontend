<template>
  <div class='container-fluid' role='group'>
    <div class='header'>
      <h1 class='text-left'>Update User Infomation</h1>
    </div>
    <b-alert variant='warning' fade v-model='error'>{{message}}</b-alert>
    <div class='container'>
      <b-card bg-variant='light'>
        <b-form @submit.prevent='handleSubmit'>

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
            <b-form-invalid-feedback
              id='inputFirstName'
              v-if='!$v.user.firstName.required'
            >First name required</b-form-invalid-feedback>
            <b-form-invalid-feedback
              id='inputFirstName'
              v-else-if='!$v.user.firstName.minLength'
            >First name must have at least {{$v.user.firstName.$params.minLength.min}} letters.</b-form-invalid-feedback>
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
            <b-form-invalid-feedback
              id='inputLastName'
              v-if='!$v.user.lastName.required'
            >Last name required</b-form-invalid-feedback>
            <b-form-invalid-feedback
              id='inputLastName'
              v-else-if='!$v.user.lastName.minLength'
            >Last name must have at least {{$v.user.lastName.$params.minLength.min}} letters.</b-form-invalid-feedback>
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
              v-model='user.password'
              :state='$v.user.password.minLength'
            />
            <b-form-invalid-feedback
              id='inputPassword'
              v-if='!$v.user.password.minLength'
            >Password must have at least {{$v.user.password.$params.minLength.min}} letters.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label='Confirm Password' label-for='inputConfirmPassword'>
            <b-form-input
              type='password'
              id='inputConfirmPassword'
              class='form-control'
              placeholder='Confirm Password'
              v-model='user.confirmPassword'
              :state='$v.user.confirmPassword.sameAsPassword'
            />
            <b-form-invalid-feedback
              id='inputConfirmPassword'
              v-if='!$v.user.confirmPassword.sameAsPassword'
            >Password not match</b-form-invalid-feedback>
          </b-form-group>
          <button class='btn btn-lg btn-primary btn-block' type='submit'>Update Infomation</button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import { UserServices } from 'src/Services/UserServices'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { EventBus } from 'helper/eventbus'
import { setUserName } from 'helper/authHeader'
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
      message: 'Please input valid data!',
      loader: null
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
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  mounted: function () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.loader = this.$loading.show()
      UserServices.getUser()
        .then(response => {
          console.log(response.result)
          this.user = response.result
          this.loader.hide()
        })
        .catch(error => {
          // this.$msg({text: error})
          this.loader.hide()
          console.log(error)
        })
    },
    async handleSubmit (e) {
      this.error = false
      if (!this.$v.$invalid) {
        this.loader = this.$loading.show()
        await UserServices.updateUserInfo(this.user)
          .then(response => {
            this.loader.hide()
            this.error = true
            this.message = 'Update Successful!'
            this.user = response.result
            setUserName(this.user.firstName, this.user.lastName)
            EventBus.$emit('login', true)
          })
          .catch(error => {
            this.loader.hide()
            this.error = true
            this.message = error
          })
      }
    }
  }
}
</script>

<style>
</style>
