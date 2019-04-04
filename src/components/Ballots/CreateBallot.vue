<template>
  <div class="container-fluid" role="group">
    <div class="header">
      <h1 class="text-left">{{title}}</h1>
    </div>
    <div class="containers">
      <b-card bg-variant="light">
        <b-form @submit.prevent="handleSubmit">
          <b-form-group id="exampleInputGroup2" label="Name" label-for="inputNameFeedback">
            <b-form-input
              id="inputFirstName"
              type="text"
              placeholder="Firsr Name"
              required
              autofocus
              v-model.trim="ballot.name"
              :state="$v.ballot.name.required"
              aria-describedby="inputNameFeedback"
            />
            <b-form-invalid-feedback id="inputNameFeedback">Name is required.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="exampleInputGroup2"
            label="Description"
            label-for="inputDescriptionFeedback"
          >
            <b-form-textarea
              id="inputDescriptionFeedback"
              type="text"
              placeholder="Description"
              required
              rows="3"
              max-rows="6"
              no-resize
              v-model.trim="ballot.description"
              :state="$v.ballot.description.required"
              aria-describedby="inputDescriptionFeedback"
            />
            <b-form-invalid-feedback id="inputDescriptionFeedback">Description is required.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="exampleInputGroup2"
            label="Start Datetime"
            label-for="inputStartDatetimeFeedback"
            label-cols-sm="4"
            label-cols-lg="3" 
          >
            <datetime
              class="datetime"
              type="datetime"
              v-model="ballot.startDatetime"
              input-class="my-class"
              :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
              :phrases="{ok: 'Continue', cancel: 'Exit'}"
              :state="$v.ballot.start_datetime.required"
              aria-describedby="inputStartDatetimeFeedback"
              required
              auto
            />
            <b-form-invalid-feedback id="inputStartDatetimeFeedback">Start datetime is required.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="exampleInputGroup2"
            label="Finsh Datetime"
            label-for="inputEndDatetimeFeedback"
            label-cols-sm="4"
            label-cols-lg="3" 
          >
            <datetime
              class="datetime"
              type="datetime"
              v-model="ballot.endDatetime"
              input-class="my-class"
              :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
              :phrases="{ok: 'Continue', cancel: 'Exit'}"
              :state="$v.ballot.end_datetime.required"
              aria-describedby="inputEndDatetimeFeedback"
              required
              auto
            />
            <b-form-invalid-feedback id="inputEndDatetimeFeedback">Start datetime is required.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="exampleInputGroup2"
            label="Real-time Result"
            label-for="inputResultFeedback"
            label-cols-sm="4"
            label-cols-lg="3" 
          >
            <b-form-radio-group
              id="inputResultFeedback"
              name="realtimeResult"
              required
              v-model="ballot.realtimeResult"
              :options="options"
            />
          </b-form-group>

          <b-form-group
            id="exampleInputGroup2"
            label="Permission"
            label-for="publicElecionFeedback"
            label-cols-sm="4"
            label-cols-lg="3" 
          >
            <b-form-radio-group
              id="publicElecionFeedback"
              name="publicElection"
              required
              v-model="ballot.permission"
              :options="limitation"
            />
          </b-form-group>

          <b-form-group
            id="exampleInputGroup2"
            label="Election Type"
            label-for="electionTypeFeedback"
            label-cols-sm="4"
            label-cols-lg="3" 
          >
            <b-form-radio-group
              id="electionTypeFeedback"
              name="electionType"
              required
              v-model="ballot.electionType"
              :options="electionOptions"
              @input="changeType"
            />
          </b-form-group>

          <!--Election Type-->
          <div v-if="ballot.electionType">
            <b-form-group
              id="exampleInputGroup2"
              label="Add Options"
              label-for=""
              label-cols-sm="4"
              label-cols-lg="3" 
            >
            <b-button variant="primary" v-on:click="addOption">Add Options</b-button>
              <b-alert 
                variant="danger" 
                fade 
                :show="dismissCountDown"
                dismissible
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
                {{message}}
              </b-alert>
<!-- :state="$v.selectedOptions.$each.$iter[index].option.required" -->
                <b-form-group
                  v-for="(option, index) in selectedOptions"
                  class="selectedCandidate"
                >
                  Option {{index + 1}}
                  <b-input-group>
                    <b-form-input 
                      type="text"
                      required
                      v-model="option.option" 
                      :state="$v.selectedOptions.$each.$iter[index].option.required"
                      aria-describedby="inputOptionFeedback"
                    />
                  <img
                    src="../../assets/delete.png"
                    width="20px"
                    height="20px"
                    style="cursor: pointer;"
                    title="Edit"
                    v-on:click="removeOption(index)"
                  > 
                  <b-form-invalid-feedback id="inputOptionFeedback">Option {{index + 1}} is required.</b-form-invalid-feedback>
                  </b-input-group>
                  
                </b-form-group>
            </b-form-group>
          </div>

          <div v-else>
            <b-form-group
              id="exampleInputGroup2"
              label="Add Candidate"
              label-for="inputResultFeedback"
              label-cols-sm="4"
              label-cols-lg="3" 
            >
              <b-button variant="primary" v-b-modal.showCandidages>Select Candidate</b-button>
              <b-alert 
                variant="danger" 
                fade 
                :show="dismissCountDown"
                dismissible
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
                {{message}}
              </b-alert>
              <b-list-group class="selectedCandidate">
                <b-list-group-item v-for="(candidate,  index) in selectedCandidates">{{index + 1}}. {{candidate.firstName}} {{candidate.lastName}}</b-list-group-item>
              </b-list-group>
            </b-form-group>
          </div>

          <button class="btn btn-lg btn-primary btn-block" type="submit">{{action}}</button>
        </b-form>
      </b-card>

      <!--Alert View-->
      <b-modal id="showCandidages" scrollable title="Please Select Candidate" size="xl">
        <template>
          <b-table
            hover
            selectable
            select-mode="multiple"
            selectedVariant="success"
            @row-selected="rowSelected"
            :fields="fields"
            :items="allCandidates"
          >

            <template slot="image" slot-scope="data">
              <b-img thumbnail fluid :src="data.value" alt="Image 1" width="50px" height="50px"></b-img>
            </template>

            <template
              slot="firstNname"
              slot-scope="data"
            >{{ data.value.firstName }}
            </template>

            <template
              slot="lastNname"
              slot-scope="data"
            >{{ data.value.lastName }}
            </template>

            <template slot="gender" slot-scope="data">
              <p v-if="data.value === 0">Male</p>
              <p v-else>Female</p>
            </template>

            <template slot="updatedAt" slot-scope="data">{{ data.value | moment("YYYY-MM-DD hh:mm")}}</template>

            <template slot="createdAt" slot-scope="data">{{ data.value | moment("YYYY-MM-DD hh:mm")}}</template>
          </b-table>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { CandidateServices } from "../../Services/CandidateServices";
import { BallotServices } from "../../Services/BallotServices";
import { required, minLength } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import moment from "moment";
import "vue-datetime/dist/vue-datetime.css";
import { truncateSync, constants } from 'fs';
export default {
  data: function() {
    return {
      ballot :{
        name: "",
        description: "",
        startDatetime: "",
        endDatetime: "",
        realtimeResult: true,
        permission: true,
        electionType: true,
        candidateList: []
      },
      title: "Create Baallot",
      action: 'Create Ballot',
      message: "",
      responsedElectionType: null,
      dismissSecs: 5,
      dismissCountDown: 0,
      options: [
        { text: "Yes", value: true, selected: true },
        { text: "No", value: false }
      ],
      limitation : [
        { text: "Public", value: true, selected: true },
        { text: "Private", value: false }
      ],
      electionOptions: [
        { text: "Simple", value: true, selected: true },
        { text: "Normal", value: false }
      ],
      fields: [
        { key: "image", label: "Photo" },
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "gender", label: "Gender" },
        { key: "carrer", label: "Carrer" },
        { key: "email", label: "Email" },
        { key: "politicalPlatform", label: "Political Platform" },
        { key: "updatedAt", label: "Updated At" },
        { key: "createdAt", label: "Creatd At" }
      ],
      allCandidates: [],
      selectedCandidates: [],
      selectedOptions: []
    }
  },
  validations: {
    ballot:{
      name: {
        required
      },
      description: {
        required
      },
      start_datetime: {
        required
      },
      end_datetime: {
        required
      }
    },
    selectedOptions: {
      $each: {
        option:{
          required
        }
      }
    }
  },
  created() {
    if(this.$route.params.id != undefined){
      this.title = 'Update Ballot'
      this.action = 'Update Ballot'
      BallotServices.getBallot(this.$route.params.id)
        .then(response => {
          this.ballot = response.result
          this.responsedElectionType = response.result.electionType
          this.restoreData()
        })
        .catch(error => {
          // this.error = true
          // this.message = error
          console.log(error)
        })
    }else{
      this.restoreData()
    }
  },
  mounted: function() {
    CandidateServices.getAllCandidates()
      .then(response => {
        this.allCandidates = response.result
        this.restoreData()
      })
      .catch(error => {
        // this.error = true
        // this.message = error
        console.log(error)
      })
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    async handleSubmit(e) {
      if (this.$v.$invalid) {
        if(!this.ballot.electionType && this.selectedCandidates.length < 2){
          this.dismissCountDown = this.dismissSecs
          this.message = "At least two candidates required!"
        }else{
          this.ballot.candidateList = []
          if(this.ballot.electionType){
            this.selectedOptions.forEach(element => {
              this.ballot.candidateList.push(element.option)
            });
          }else{
            this.selectedCandidates.forEach(element => {
              this.ballot.candidateList.push(element._id)
            });
          }
          if(this.$route.params.id != undefined){
            this.requestUpdateBallot()
          }else{
            this.requestCreateBallot()
          }
        }
      }
    },
    rowSelected(items) {
      this.selectedCandidates = items
    },
    addOption(){
      if(this.selectedOptions.length < 10){
        this.selectedOptions.push({option:''})
      }else{
        this.dismissCountDown = this.dismissSecs
        this.message = "Maximum 10 options!"
      }
    },
    removeOption: function(index) {
      if(this.selectedOptions.length > 2){
        this.selectedOptions.splice(index, 1)
      }else{
        this.dismissCountDown = this.dismissSecs
        this.message = "At least two option required!"
      }
    },
    changeType(){
      this.restoreData()
    },
    restoreData(){
      // decide create or update function
      if(this.$route.params.id != undefined){
        // update
        this.selectedOptions = []
        this.selectedCandidates = []
        if(this.ballot.electionType){
          if(this.responsedElectionType){
            this.ballot.candidateList.forEach(element => {
              this.selectedOptions.push({option: element})
            })
          }else{
            this.selectedOptions.push({option:''})
            this.selectedOptions.push({option:''})
          }
        }else{
          if(!this.responsedElectionType){
            this.ballot.candidateList.forEach(candidate => {
              this.allCandidates.forEach(candidateList=>{
                if(candidateList._id == candidate){
                    //candidateList['_rowVariant'] = 'success b-row-selected'
                    //candidateList['aria-selected'] = 'true'
                    this.selectedCandidates.push(candidateList)
                }
              })
            })
            console.log(this.selectedCandidates)
          }
        }
      }else{
        this.selectedOptions = []
        if(this.ballot.electionType){
          this.selectedOptions.push({option:''})
          this.selectedOptions.push({option:''})
        }
      }
    },
    requestCreateBallot(){
      BallotServices.createBallot(this.ballot)
      .then(response => {
        console.log(response)
        this.$router.go(-1)
      })
      .catch(error => {
        this.error = true
        this.message = error
      })
    },
    requestUpdateBallot(){
      BallotServices.updateBallot(this.ballot)
        .then(response => {
          console.log(response)
          this.$router.go(-1)
        })
        .catch(error => {
          this.error = true
          this.message = error
        })
    }
  },
  components: {
    datetime: Datetime
  }
}

</script>

<style scoped>
.containers {
  width: 60%;
  margin: 0 auto;
}
.form {
  margin: 40px;
  max-width: 400px;
}

input {
  margin-top: -5px;
}

.datetime {
  margin-top: 0px;
  margin-left: 10px;
}
.selectedCandidate {
  margin: 10px;
}
</style>
