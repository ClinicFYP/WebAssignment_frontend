<template>
  <div class="container">
    <h3 v-if="error">Thank you for your register!</h3>
    <h3 v-else>{{message}}</h3>

    <h4 v-if="error">
      The verification code has been sent to
      <b>{{email}}</b>
    </h4>
    <h4 v-else>
      <b>{{email}}</b>
      <button class="btn btn-primary" v-on:click="resendVerificationCode">Send again</button>
    </h4>
  </div>
</template>

<script>
import { UserServices } from '../../Services/UserServices'
export default {
  data: function () {
    return {
      email: '',
      error: true,
      message: 'Your account already exists. Please check your email and activate the account',
      loader: null
    }
  },
  mounted () {
    console.log(this.$route.params)
    console.log(this.$route.params.error)
    this.email = this.$route.params.email
    this.error = this.$route.params.error
  },
  methods: {
    async resendVerificationCode () {
      this.loader = this.$loading.show()
      await UserServices.resendVerificationCode(this.email)
        .then(response => {
          this.error = true
          this.loader.hide()
        })
        .catch(error => {
          this.$msg({ text: error })
          this.loader.hide()
        })
    }
  }
}
</script>

<style>
</style>
