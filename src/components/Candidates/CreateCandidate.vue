<template>
    <div class='container-fluid' role='group'>
    <div class='header'>
      <h1 class='text-left'>{{title}}</h1>
    </div>
    <b-alert
      :show='dismissCountDown'
      dismissible
      variant='warning'
      @dismissed='dismissCountDown=0'
      @dismiss-count-down='countDownChanged'
    >
      Create Successful!
    </b-alert>
    <div class='container'>
    <b-card bg-variant='light'>
      <b-form @submit.prevent='handleSubmit'>
          <b-form-group id='exampleInputGroup2' label-for='inputProfileImageFeedback'>
            <b-img :src='candidate.image' alt='Responsive image' width='190px' height='190px' center fluid/>
            <b-form-file
              id='inputProfileImageFeedback'
              v-model='candidate.image'
              placeholder='Choose a file...'
              drop-placeholder='Drop file here...'
              @change='onFileChange(item, $event)'/>
          </b-form-group>

          <b-form-group id='exampleInputGroup2' label='First Name*' label-for='inputFirstNameFeedback'>
            <b-form-input
              id='inputFirstName'
              type='text'
              placeholder='Firsr Name'
              equired
              autofocus
              v-model.trim='candidate.firstName'
              :state='$v.candidate.firstName.required'
              aria-describedby='inputFirstNameFeedback'/>
              <b-form-invalid-feedback id='inputFirstNameFeedback'>First Name is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id='exampleInputGroup2' label='Last Name*' label-for='inputLastNameFeedback'>
              <b-form-input
                id='inputLastNameFeedback'
                type='text'
                placeholder='Last name'
                required
                v-model.trim='candidate.lastName'
                :state='$v.candidate.lastName.required'
                aria-describedby='inputLastNameFeedback' />
                <b-form-invalid-feedback id='inputLastNameFeedback'>Last Name is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id='exampleInputGroup2' label='Date of Birthday*' label-for='inputDobFeedback'>
                <datetime
                  class='date'
                  type='date'
                  v-model='candidate.dob'
                  input-class='my-class'
                  :max-datetime='maximumStartDatetime'
                  format='yyyy-MM-dd'
                  :phrases='{ok: "Continue", cancel: "Exit"}'
                  auto/>
                  <!-- :min-datetime='minDatetime' -->
                <b-form-invalid-feedback id='inputDobFeedback'>Date of birthday is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id='exampleInputGroup2' label='Carrer' label-for='inputCarrerFeedback'>
              <b-form-input
                id='inputCarrerFeedback'
                type='text'
                placeholder='Carrer'
                v-model.trim='candidate.carrer'
                :state='$v.candidate.carrer.minLength'
                aria-describedby='inputCarrerFeedback' />
                <b-form-invalid-feedback id='inputCarrerFeedback'>Carrer must have at least {{$v.candidate.carrer.$params.minLength.min}} letters.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id='exampleInputGroup2' label='Eamil*' label-for='inputEmailFeedback'>
              <b-form-input
                id='inputEmailFeedback'
                type='email'
                placeholder='Email'
                required
                v-model.trim='candidate.email'
                :state='$v.candidate.email.required && $v.candidate.email.email'
                aria-describedby='inputEmailFeedback' />
                <b-form-invalid-feedback id='inputEmailFeedback'>Email is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id='exampleInputGroup2' label='Gender*' label-for='inputGenderFeedback'>
              <b-form-radio-group
                id='inputGenderFeedback'
                name='gender'
                required
                v-model='candidate.gender'
                :options='options'  />
            </b-form-group>

            <b-form-group id='exampleInputGroup2' label='Personal Website' label-for='inputWebsiteFeedback'>
              <b-form-input
                id='inputWebsiteFeedback'
                type='text'
                placeholder='Start with https:// or http://'
                v-model.trim='candidate.website'
                :state='$v.candidate.website.url'
                aria-describedby='inputWebsiteFeedback'
                 />
                <b-form-invalid-feedback id='inputWebsiteFeedback'>Invalid url e.g. http:// or https://.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id='exampleInputGroup2' label='Political Platform' label-for='inputPoliticalPlatformFeedback'>
              <b-form-input
                id='inputPoliticalPlatformFeedback'
                type='text'
                placeholder='Political Platform'
                v-model.trim='candidate.politicalPlatform'
                :state='$v.candidate.politicalPlatform.minLength'
                aria-describedby='inputPoliticalPlatformFeedback' />
                <b-form-invalid-feedback id='inputPoliticalPlatformFeedback'>Political platform must have at least {{$v.candidate.politicalPlatform.$params.minLength.min}} letters.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id='exampleInputGroup2' label='Political Affiliation' label-for='inputPoliticalAffiliationFeedback'>
              <b-form-textarea
                id='inputPoliticalAffiliationFeedback'
                type='text'
                placeholder='Political Affiliation'
                rows='3'
                max-rows='6'
                no-resize
                v-model.trim='candidate.politicalAffiliation'
                :state='$v.candidate.politicalAffiliation.minLength'
                aria-describedby='inputPoliticalAffiliationFeedback' />
                <b-form-invalid-feedback id='inputPoliticalAffiliationFeedback'>Political affiliation must have at least {{$v.candidate.politicalAffiliation.$params.minLength.min}} letters.</b-form-invalid-feedback>
            </b-form-group>
            <button class='btn btn-lg btn-primary btn-block' type='submit'>{{action}}</button>
      </b-form>
    </b-card>
    </div>
  </div>
</template>
<script>
import {CandidateServices} from '../../Services/CandidateServices'
import { required, minLength, email, url } from 'vuelidate/lib/validators'
import moment from 'moment'
import { Datetime } from 'vue-datetime'
import { DateTime as LuxonDateTime } from 'luxon'
// import { throws } from 'assert'
// import { format } from 'url'
export default {
  data () {
    return {
      title: 'Create Candidate',
      action: 'Create Candidate',
      maximumStartDatetime: LuxonDateTime.local().minus({years: 18}).toISO(),
      candidate: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        gender: 0,
        politicalPlatform: null,
        politicalAffiliation: null,
        image: 'https://www.cannatrac.com/static/images/users/71-1436214917.png',
        carrer: null,
        website: null
      },
      options: [
        { text: 'Male', value: 0 },
        { text: 'Female', value: 1 }
      ],
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.title = 'Edit Candidate'
      this.action = 'Update Candidate'
      CandidateServices.getCandidate(this.$route.params.id)
        .then(response => {
          this.candidate = response.result
        })
        .catch(error => {
          this.error = true
          this.message = error
          console.log(error.response)
        })
    }
  },
  validations: {
    candidate: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      dob: {
        required
      },
      email: {
        required,
        email
      },
      politicalAffiliation: {
        minLength: minLength(3)
      },
      politicalPlatform: {
        minLength: minLength(3)
      },
      carrer: {
        minLength: minLength(3)
      },
      website: {
        url
      }
    }
  },
  methods: {
    formatDOB (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    onFileChange (item, e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(item, files[0])
    },
    createImage (item, file) {
      // var image = new Image()
      var reader = new FileReader()

      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async handleSubmit (e) {
      if (!this.$v.$invalid) {
        console.log(this.candidate)
        if (this.$route.params.id !== undefined) {
          await CandidateServices.updateCandidate(this.candidate)
            .then(response => {
              this.dismissCountDown = this.dismissSecs
              console.log(response)
              this.$router.go(-1)
            })
            .catch(error => {
              this.error = true
              this.message = error
              console.log(error.data)
            })
        } else {
          await CandidateServices.createCandidate(this.candidate)
            .then(response => {
              this.dismissCountDown = this.dismissSecs
              console.log(response)
              this.$router.go(-1)
            })
            .catch(error => {
              this.error = true
              this.message = error
              console.log(error.data)
            })
        }
      }
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  },
  components: {
    datetime: Datetime
  }
}
</script>

<style scoped>
img {
  margin-bottom: 10px;
}
</style>
