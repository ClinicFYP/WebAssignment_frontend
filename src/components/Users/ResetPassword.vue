<template>
  <div class='container'>
    <b-form @submit.prevent='handleSubmit'>
      <h1 class='h3 mb-3 font-weight-normal'>Reset Password</h1>
      <b-form-group label='Email' label-for='inputEmail'>
        <b-form-input
          type='email'
          id='inputEmail'
          class='form-control'
          placeholder='Email address'
          required
          v-model='email'
          :disabled='isValidEmail'
          :state='$v.email.required && $v.email.email'
        />
        <b-form-invalid-feedback id='inputEmail' v-if='!$v.email.required'>Email required</b-form-invalid-feedback>
        <b-form-invalid-feedback id='inputEmail' v-else-if='!$v.email.email'>Invalid email format</b-form-invalid-feedback>
        </b-form-group>
        <div v-if="isValidEmail">
            <b-form-group label='Reset Code' label-for='inputResetCode'>
                <b-form-input
                id='inputResetCode'
                class='form-control'
                placeholder='Reset Code'
                required
                v-model='resetCode'
                :state='$v.resetCode.required'
                />
                <b-form-invalid-feedback id='inputResetCode' v-if='!$v.resetCode.required'>Reset code required</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label='Password' label-for='inputPassword'>
                <b-form-input
                type='password'
                id='inputPassword'
                class='form-control'
                placeholder='Password'
                required
                v-model='password'
                :state='$v.password.required && $v.password.minLength'
                />
                <b-form-invalid-feedback id='inputPassword' v-if='!$v.password.required'>Password required</b-form-invalid-feedback>
                <b-form-invalid-feedback id='inputPassword' v-else-if='!$v.password.minLength'>Password must have at least {{$v.password.$params.minLength.min}} letters.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label='Confirm Password' label-for='inputConfirmPassword'>
                <b-form-input
                type='password'
                id='inputConfirmPassword'
                class='form-control'
                placeholder='Confirm Password'
                required
                v-model='confirmPassword'
                :state='$v.confirmPassword.required && $v.confirmPassword.sameAsPassword'
                />
                <b-form-invalid-feedback id='inputConfirmPassword' v-if='!$v.confirmPassword.required'>Confirm Password required</b-form-invalid-feedback>
                <b-form-invalid-feedback id='inputConfirmPassword' v-else-if='!$v.confirmPassword.sameAsPassword'>Password not match</b-form-invalid-feedback>
            </b-form-group>
        </div>
        <button class='btn btn-lg btn-danger btn-block' type="submit">{{title}}</button>
    </b-form>
     <div class="text-right">
      <a href="#" v-on:click='goLogin'>I have Account</a>
    </div>
  </div>
</template>

<script>
import { UserServices } from '@/services/UserServices'
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
import { EventBus } from 'helper/eventbus'
export default {
/* eslint-disable */
  data: function () {
    return {
        title: 'Request reset password',
        email: '',
        resetCode: '',
        password: '',
        confirmPassword: '',
        isValidEmail: false,
        loader: null
    }
  },
  validations: {
    email: {
        required,
        email
    },
    resetCode: {
        required
    },
    password: {
        required,
        minLength: minLength(6)
    },
    confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/')
    },
    async handleSubmit (e) {
        this.loader = this.$loading.show()
        if (this.isValidEmail) {
            if (this.$v.password.required && this.$v.password.minLength && 
                this.$v.confirmPassword.required && this.$v.confirmPassword.sameAsPassword && 
                this.$v.resetCode.required) {
                this.resetPassword()
            }
        }else {
            if (this.$v.email.required && this.$v.email.email) {
                this.verifyEmail()
            }
        }
    },
    async verifyEmail () {
        await UserServices.requestResetPassword(this.email)
          .then(response => {
            this.loader.hide()
            this.isValidEmail = true
            this.title = 'Reset password'
          })
          .catch(error => {
            this.$msg({text: error})
            this.loader.hide()
          })
    },
    async resetPassword() {
        await UserServices.resetPassword(this.email, this.password, this.resetCode)
          .then(response => {
            this.loader.hide()
            EventBus.$emit('login', true)
            this.$router.push({ name: 'Home' })
          })
          .catch(error => {
            this.$msg({text: error})
            this.loader.hide()
          })
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
