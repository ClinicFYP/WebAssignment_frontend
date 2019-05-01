<template>
  <div class="container-fluid" role="group">
    <div class="header">
      <h1 class="text-left">Update Candidate</h1>
    </div>
    <b-alert
    :show="dismissCountDown"
    dismissible
    variant="warning"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
    >
      Update Successful!
    </b-alert>
    <div class="container">
    <b-card bg-variant="light">
      <b-form @submit.prevent="handleSubmit">
          <b-form-group id="exampleInputGroup2" label-for="inputProfileImageFeedback">
            <b-img :src="image" alt="Responsive image" width="190px" height="190px" center fluid/>
            <b-form-file
              id="inputProfileImageFeedback" 
              v-model="image"
              :state="$v.image.required"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
              aria-describedby="inputProfileImageFeedback"
              @change="onFileChange(item, $event)"/>
              <b-form-invalid-feedback id="inputProfileImageFeedback">Profile image is required.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="exampleInputGroup2" label="First Name" label-for="inputFirstNameFeedback">
            <b-form-input 
              id="inputFirstName" 
              type="text" 
              placeholder="Firsr Name"
              required 
              autofocus
              v-model.trim="firstName"
              :state="$v.firstName.required" 
              aria-describedby="inputFirstNameFeedback"/>
              <b-form-invalid-feedback id="inputFirstNameFeedback">First Name is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Last Name" label-for="inputLastNameFeedback">
              <b-form-input
                id="inputLastNameFeedback"
                type="text"
                placeholder="Last name"
                required
                v-model.trim="lastName"
                :state="$v.lastName.required" 
                aria-describedby="inputLastNameFeedback" />
                <b-form-invalid-feedback id="inputLastNameFeedback">Last Name is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Date of Birthday" label-for="inputDobFeedback">
                <datetime
                  class="date"
                  type="date"
                  v-model="dob"
                  input-class="my-class"
                  :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
                  :phrases="{ok: 'Continue', cancel: 'Exit'}"
                  
                  auto/>
                  <!-- :min-datetime="minDatetime" -->
                <b-form-invalid-feedback id="inputDobFeedback">Date of birthday is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Career" label-for="inputcareerFeedback">
              <b-form-input
                id="inputcareerFeedback"
                type="text"
                placeholder="Career"
                required
                v-model.trim="career"
                :state="$v.career.required" 
                aria-describedby="inputcareerFeedback" />
                <b-form-invalid-feedback id="inputcareerFeedback">Career is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Eamil" label-for="inputEmailFeedback">
              <b-form-input
                id="inputEmailFeedback"
                type="email"
                placeholder="Email"
                required
                v-model.trim="email"
                :state="$v.email.required && $v.email.email" 
                aria-describedby="inputEmailFeedback" />
                <b-form-invalid-feedback id="inputEmailFeedback">Email is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Gender" label-for="inputGenderFeedback">
              <b-form-radio-group 
                id="inputGenderFeedback"
                name="gender"
                required
                v-model="gender" 
                :options="options"  />
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Personal Website" label-for="inputWebsiteFeedback">
              <b-form-input
                id="inputWebsiteFeedback"
                type="text"
                placeholder="Start with https:// or http://"
                required
                v-model.trim="website"
                :state="$v.website.required && $v.website.url" 
                aria-describedby="inputWebsiteFeedback"
                 />
                <b-form-invalid-feedback id="inputWebsiteFeedback">Website is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Political Platform" label-for="inputPoliticalPlatformFeedback">
              <b-form-input
                id="inputPoliticalPlatformFeedback"
                type="text"
                placeholder="Political Platform"
                required
                v-model.trim="politicalPlatform"
                :state="$v.politicalPlatform.required" 
                aria-describedby="inputPoliticalPlatformFeedback" />
                <b-form-invalid-feedback id="inputPoliticalPlatformFeedback">Political platform is required.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Political Affiliation" label-for="inputPoliticalAffiliationFeedback">
              <b-form-textarea
                id="inputPoliticalAffiliationFeedback"
                type="text"
                placeholder="Political Affiliation"
                rows="3"
                max-rows="6"
                no-resize
                required
                v-model.trim="politicalAffiliation"
                :state="$v.politicalAffiliation.required" 
                aria-describedby="inputPoliticalAffiliationFeedback" />
                <b-form-invalid-feedback id="inputPoliticalAffiliationFeedback">Political affiliation is required.</b-form-invalid-feedback>
            </b-form-group>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Update Candidate</button>

            <b-modal
              ref="confirmUpdateModal"
              @ok="confirmSubmit"
              size="lg"
            >
            <h4 class="text-center">Are you confirm update this candidate?</h4>
            </b-modal>
      </b-form>
    </b-card>
    </div>
  </div>
</template>

<script>
import {CandidateServices} from "../../Services/CandidateServices";
import { required, minLength,email, url } from "vuelidate/lib/validators";
import moment from 'moment'
import { Datetime } from 'vue-datetime';
import { throws } from 'assert';
import { format } from 'url';
export default {
  data() {
    return {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender: 0,
      politicalPlatform: "",
      politicalAffiliation: "",
      image: "",
      career: "",
      website: "",
      options: [
          { text: 'Male', value: 0 },
          { text: 'Female', value: 1 }
      ],
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  created() {
    if(this.$route.params.id != undefined){
      this.title = "Edit Candidate"
      CandidateServices.getCandidate(this.$route.params.id)
      .then(response => {
        this.candidate = response.result
      })
      .catch(error => {
        // this.$msg({text: error})
        console.log(error.response)
       })
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    dob:{
      required
    },
    email:{
      required,
      email
    },
    politicalAffiliation:{
      required
    },
    politicalPlatform:{
      required
    },
    image:{
      required
    },
    career:{
      required
    },
    website:{
      required,
      url
    }
  },
  methods:{
    formatDOB (date) {
      return moment(date).format('YYYY-MM-DD');
    },
    onFileChange(item, e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(item, files[0]);
    },
    createImage(item, file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async handleSubmit(e) {
      if (this.$v.$invalid) {
      }else{
        this.$refs.confirmUpdateModal.show()
      }
    },
    confirmSubmit(evt) {
      //evt.preventDefault()
      CandidateServices.updateCandidate(
        this.$route.params.id,
        this.firstName, 
        this.lastName, 
        this.email, 
        this.dob, 
        this.gender, 
        this.politicalPlatform, 
        this.politicalAffiliation,
        this.career,
        this.image,
        this.website)
      .then(response => {
        this.dismissCountDown = this.dismissSecs
        console.log(response)
      })
      .catch(error => {
        this.$msg({text: error})
        console.log(error)
      })
    },
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
    }
  },    
  components:{
      datetime: Datetime
  }
};
</script>

<style scoped>
.container {
  margin: 40px auto;
  width: 50%;
}

input {
  margin-top: -5px;
}

img {
  margin-bottom: 10px;
}

#error-image {
  margin: 0 auto;
  font-size: 15px;
  color: red;
}
</style>
