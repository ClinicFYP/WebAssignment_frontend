<template>
  <div class='container-fluid' role='group'>
    <div class='header'>
      <h1 class='text-left'>{{title}}</h1>
    </div>
    <div class='containers'>
      <b-card bg-variant='light'>
        <b-form @submit.prevent='handleSubmit'>
          <b-form-group id='exampleInputGroup2' label='Name' label-for='inputNameFeedback'>
            <b-form-input
              id='inputFirstName'
              type='text'
              placeholder='Name'
              required
              autofocus
              v-model.trim='ballot.name'
              :state='$v.ballot.name.required'
              aria-describedby='inputNameFeedback'
            />
            <b-form-invalid-feedback id='inputNameFeedback'>Name is required.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id='exampleInputGroup2'
            label='Description'
            label-for='inputDescriptionFeedback'
          >
            <b-form-textarea
              id='inputDescriptionFeedback'
              type='text'
              placeholder='Description'
              required
              rows='3'
              max-rows='6'
              no-resize
              v-model.trim='ballot.description'
              :state='$v.ballot.description.required'
              aria-describedby='inputDescriptionFeedback'
            />
            <b-form-invalid-feedback id='inputDescriptionFeedback'>Description is required.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id='exampleInputGroup2'
            label='Start Datetime'
            label-for='inputStartDatetimeFeedback'
            label-cols-sm='4'
            label-cols-lg='3'
          >
            <datetime
              class='datetime'
              type='datetime'
              v-model='ballot.startDatetime'
              input-class='my-class'
              :min-datetime='minimumStartDatetime'
              format='yyyy-MM-dd HH:mm'
              :phrases='{ok: "Continue", cancel: "Exit"}'
              required
              auto
            />
          </b-form-group>

          <b-form-group
            id='exampleInputGroup2'
            label='Finsh Datetime'
            label-for='inputEndDatetimeFeedback'
            label-cols-sm='4'
            label-cols-lg='3'
          >
            <datetime
              class='datetime'
              type='datetime'
              v-model='ballot.endDatetime'
              input-class='my-class'
              :min-datetime='minimumEndDatetime'
              format='yyyy-MM-dd HH:mm'
              :phrases='{ok: "Continue", cancel: "Exit"}'
              required
              auto
            />
            <div class='error-input' v-if='invalidEndDatetime.length > 0'>{{invalidEndDatetime}}</div>
          </b-form-group>

          <b-form-group
            id='exampleInputGroup2'
            label='Permission'
            label-for='publicElecionFeedback'
            label-cols-sm='4'
            label-cols-lg='3'
          >
            <b-form-radio-group
              id='publicElecionFeedback'
              name='publicElection'
              required
              v-model='ballot.permission'
              :options='limitation'
            />

            <p v-if='!ballot.permission'>
              <b-button variant='primary' v-b-modal.showUsers>Select User</b-button>
            </p>
            <b-list-group class='selectedCandidate' v-if='!ballot.permission'>
              <b-list-group-item
              v-bind:key="index"
                v-for='(user,  index) in selectedUsers'
              >{{index + 1}}. {{user.name}}</b-list-group-item>
            </b-list-group>
          </b-form-group>

          <b-form-group
            id='exampleInputGroup2'
            label='Real-time Result'
            label-for='inputResultFeedback'
            label-cols-sm='4'
            label-cols-lg='3'
          >
            <b-form-radio-group
              id='inputResultFeedback'
              name='realtimeResult'
              required
              v-model='ballot.realtimeResult'
              :options='options'
            />
          </b-form-group>

          <b-form-group
            id='exampleInputGroup2'
            label='Election Type'
            label-for='electionTypeFeedback'
            label-cols-sm='4'
            label-cols-lg='3'
          >
            <b-form-radio-group
              id='electionTypeFeedback'
              name='electionType'
              required
              v-model='ballot.electionType'
              :options='electionOptions'
              @input='changeType'
            />
          </b-form-group>

          <!--Election Type-->
          <div v-if='ballot.electionType'>
            <b-form-group
              id='exampleInputGroup2'
              label='Add Options'
              label-for
              label-cols-sm='4'
              label-cols-lg='3'
            >
              <b-button variant='primary' v-on:click='addOption'>Add Options</b-button>
              <b-form-group v-bind:key="index" v-for='(option, index) in selectedOptions' class='selectedCandidate'>
                Option {{index + 1}}
                <b-input-group>
                  <b-form-input
                    type='text'
                    required
                    v-model='option.option'
                    :state='$v.selectedOptions.$each.$iter[index].option.required'
                    aria-describedby='inputOptionFeedback'
                  />
                  <img
                    src='../../assets/delete.png'
                    width='20px'
                    height='20px'
                    style='cursor: pointer'
                    title='Edit'
                    v-on:click='removeOption(index)'
                  >
                  <b-form-invalid-feedback
                    id='inputOptionFeedback'
                  >Option {{index + 1}} is required.</b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </b-form-group>
          </div>

          <div v-else>
            <b-form-group
              id='exampleInputGroup2'
              label='Add Candidates'
              label-for='inputResultFeedback'
              label-cols-sm='4'
              label-cols-lg='3'
            >
              <p><b-button variant='primary' v-b-modal.showCandidages>Select Candidate</b-button></p>
              <b-list-group class='selectedCandidate'>
                <b-list-group-item
                  v-bind:key="index"
                  v-for='(candidate,  index) in selectedCandidates'
                >{{index + 1}}. {{candidate.name}}</b-list-group-item>
              </b-list-group>
            </b-form-group>
          </div>

          <button class='btn btn-lg btn-primary btn-block' type='submit'>{{action}}</button>
        </b-form>
      </b-card>

      <!--Alert Candidate View-->
      <b-modal id='showCandidages' scrollable title='Please Select Candidate' size='xl'>
        <table class='table'>
          <thead>
            <th  v-bind:key="index" v-for='(field, index) in candidatesFields'>{{field}}</th>
          </thead>
          <tbody>
            <tr v-bind:key="index" v-for='(item, index) in allCandidates' v-on:click='addOrRemove("candidate", item._id, index, item.firstName, item.lastName)'>
              <td>
                <label class='checkbox-container'>
                  <input
                    type='checkbox'
                    :checked='checkExist("candidate", item._id)'
                    :value='item._id'
                    v-on:click='addOrRemove("candidate", item._id, index, item.firstName, item.lastName)'
                  >
                  <span class='checkmark'></span>
                </label>
              </td>
              <td>
                <img v-bind:src='item.image' alt class='img-thumbnail' width='50px' height='50px'>
              </td>
              <td>{{item.firstName}} {{item.lastName}}</td>
              <td v-if='item.gender == 0'>Male</td>
              <td v-else>Female</td>
              <td>{{item.career}}</td>
              <td>{{item.email}}</td>
              <td>{{item.politicalPlatform}}</td>
              <td>{{item.updatedAt | moment('YYYY-MM-DD hh:mm')}}</td>
              <td>{{item.createdAt | moment('YYYY-MM-DD hh:mm')}}</td>
            </tr>
          </tbody>
        </table>
      </b-modal>

      <!--Alert user View-->
      <b-modal id='showUsers' scrollable title='Please Select User' size='lg'>
        <table class='table'>
          <thead>
            <th v-bind:key="index" v-for='(field, index) in usersFiels'>{{field}}</th>
          </thead>
          <tbody>
            <tr v-bind:key="index" v-for='(item, index) in users' v-on:click='addOrRemove("user", item._id, index, item.firstName, item.lastName)'>
              <td>
                <label class='checkbox-container'>
                  <input
                    type='checkbox'
                    :checked='checkExist("user", item._id)'
                    :value='item._id'
                    v-on:click='addOrRemove("user", item._id, index, item.firstName, item.lastName)'
                  >
                  <span class='checkmark'></span>
                </label>
              </td>
              <td>{{item.firstName}} {{item.lastName}}</td>
              <td>{{item.email}}</td>
            </tr>
          </tbody>
        </table>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { DateTime as LuxonDateTime } from 'luxon'
import 'vue-datetime/dist/vue-datetime.css'
import { CandidateServices } from '@Services/CandidateServices.js'
import { BallotServices } from '@Services/BallotServices'
import { UserServices } from '@Services/UserServices'
import { required } from 'vuelidate/lib/validators'
import { Datetime } from 'vue-datetime'
export default {
  data: function () {
    return {
      ballot: {
        name: '',
        description: '',
        startDatetime: '',
        endDatetime: '',
        realtimeResult: true,
        permission: true,
        electionType: true,
        candidateList: [],
        userList: []
      },
      users: [
        {
          id: '',
          firstName: '',
          lastName: '',
          email: ''
        }
      ],
      title: 'Create Ballot',
      action: 'Create Ballot',
      permissionTypeMessage: '',
      electionTypeMessage: '',
      minimumStartDatetime: LuxonDateTime.local()
        .plus({ hours: 3 })
        .toISO(),
      minimumEndDatetime: LuxonDateTime.local()
        .plus({ hours: 5 })
        .toISO(),
      invalidEndDatetime: '',
      responsedElectionType: null,
      options: [
        { text: 'Yes', value: true, selected: true },
        { text: 'No', value: false }
      ],
      limitation: [
        { text: 'Public', value: true, selected: true },
        { text: 'Private', value: false }
      ],
      electionOptions: [
        { text: 'Simple', value: true, selected: true },
        { text: 'Normal', value: false }
      ],
      candidatesFields: [
        '',
        'Photo',
        'Name',
        'Gender',
        'Career',
        'Email',
        'Political Platform',
        'Updated At',
        'Created At'
      ],
      usersFiels: ['', 'Name', 'Email'],
      allCandidates: [],
      candidateNameList: [],
      selectedCandidates: [],
      selectedOptions: [],
      selectedUsers: [],
      loader: null
    }
  },
  validations: {
    ballot: {
      name: {
        required
      },
      description: {
        required
      }
    },
    selectedOptions: {
      $each: {
        option: {
          required
        }
      }
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.title = 'Update Ballot'
      this.action = 'Update Ballot'
      this.loader = this.$loading.show()
      BallotServices.getBallot(this.$route.params.id)
        .then(response => {
          this.ballot = response.result
          this.responsedElectionType = response.result.electionType
          this.restoreOptionData()
          this.getAllCandidatesList()
          this.getAllUsersList()
          this.loader.hide()
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error)
          this.loader.hide()
        })
    } else {
      this.restoreOptionData()
      this.getAllCandidatesList()
      this.getAllUsersList()
    }
  },
  mounted: function () {},
  methods: {
    getAllCandidatesList () {
      CandidateServices.getAllCandidates()
        .then(response => {
          this.allCandidates = response.result
          this.restoreCahdidateData()
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error)
        })
    },
    getAllUsersList () {
      UserServices.getAllUsers()
        .then(response => {
          // console.log(response.result)
          this.users = response.result
          // console.log(this.users)
          this.restoreUserData()
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error)
        })
    },
    countDownChangedElectionType (dismissElectionTypeCountDown) {
      this.dismissElectionTypeCountDown = dismissElectionTypeCountDown
    },
    countDownChangedPermission (dismissPermissionCountDown) {
      this.dismissPermissionCountDown = dismissPermissionCountDown
    },
    // final check and restructure data
    async handleSubmit (e) {
      if (!this.$v.$invalid) {
        if (this.ballot.permission === false && this.selectedUsers.length < 1) {
          this.$msg('At least one user required!')
        } else if (this.ballot.electionType === false && this.selectedCandidates.length < 2) {
          this.$msg('At least two candidates required!')
        } else {
          this.ballot.candidateList = []
          this.ballot.userList = []
          // add the options to the list
          // the election type is simple
          if (this.ballot.electionType) {
            // check the option is no duplicate
            const duplicatedOptions = this.findDuplicateInArray()
            if (duplicatedOptions.length === 0) {
              this.selectedOptions.forEach(element => {
                this.ballot.candidateList.push(element.option)
              })
            } else {
              this.$msg('Option list duplicated!')
              return
            }
          // the election type is normal
          } else {
            this.selectedCandidates.forEach(element => {
              this.ballot.candidateList.push(element.id)
            })
          }
          // acreate invate user list,  if the election is private
          if (!this.ballot.permission) {
            this.selectedUsers.forEach(element => {
              this.ballot.userList.push(element.id)
            })
          }
          // decide update or create function
          if (this.$route.params.id !== undefined) {
            this.requestUpdateBallot()
          } else {
            this.requestCreateBallot()
          }
        }
      }
    },
    // for candidate
    addOrRemove (action, id, row, firstName, lastName) {
      var duplicate = false
      const name = firstName + ' ' + lastName
      if (action === 'candidate') {
        this.selectedCandidates.forEach((element, index) => {
          if (element.id === id) {
            this.selectedCandidates.splice(index, 1)
            duplicate = true
          }
        })

        if (!duplicate) {
          this.selectedCandidates.push({ id: id, index: row, name: name })
          duplicate = false
        }
        // console.log(this.selectedCandidates)
      } else if (action === 'user') {
        this.selectedUsers.forEach((element, index) => {
          if (element.id === id) {
            this.selectedUsers.splice(index, 1)
            duplicate = true
          }
        })

        if (!duplicate) {
          this.selectedUsers.push({ id: id, index: row, name: name })
          duplicate = false
        }
      }
    },
    checkExist (action, id) {
      var exist = false
      if (action === 'candidate') {
        this.selectedCandidates.forEach((element, index) => {
          if (id === element.id) {
            exist = true
          }
        })
      } else if (action === 'user') {
        this.selectedUsers.forEach((element, index) => {
          if (id === element.id) {
            exist = true
          }
        })
      }
      return exist
    },
    // for option
    addOption () {
      if (this.selectedOptions.length < 10) {
        this.selectedOptions.push({ option: '' })
      } else {
        this.$msg('Maximum 10 options!')
      }
    },
    removeOption: function (index) {
      if (this.selectedOptions.length > 2) {
        this.selectedOptions.splice(index, 1)
      } else {
        this.$msg('At least two option required!')
      }
    },
    changeType () {
      this.restoreOptionData()
    },
    findDuplicateInArray () {
      var result = Object.values(this.selectedOptions.reduce((c, v) => {
        let k = v.option
        c[k] = c[k] || []
        c[k].push(v)
        return c
      }, {})).reduce((c, v) => v.length > 1 ? c.concat(v) : c, [])
      return result
    },
    // obtained the server data and restore them to the UI
    restoreUserData () {
      if (!this.ballot.permission) {
        this.ballot.userList.forEach(user => {
          this.users.forEach((userList, index) => {
            if (userList._id === user) {
              // console.log(userList, user)
              this.addOrRemove(
                'user',
                userList._id,
                index,
                userList.firstName,
                userList.lastName
              )
            }
          })
        })
      }
    },
    restoreCahdidateData () {
      if (!this.responsedElectionType) {
        this.ballot.candidateList.forEach(candidate => {
          this.allCandidates.forEach((candidateList, index) => {
            if (candidateList._id === candidate) {
              this.addOrRemove(
                'candidate',
                candidateList._id,
                index,
                candidateList.firstName,
                candidateList.lastName
              )
            }
          })
        })
      }
    },
    restoreOptionData () {
      // decide create or update function
      if (this.$route.params.id !== undefined) {
        // update
        this.selectedOptions = []
        this.selectedCandidates = []
        this.candidateNameList = []
        // simple type
        if (this.ballot.electionType) {
          if (this.responsedElectionType) {
            this.ballot.candidateList.forEach(element => {
              this.selectedOptions.push({ option: element })
            })
          } else {
            this.selectedOptions.push({ option: '' })
            this.selectedOptions.push({ option: '' })
          }
        }
      } else {
        // create new ballot
        this.selectedOptions = []
        if (this.ballot.electionType) {
          this.selectedOptions.push({ option: '' })
          this.selectedOptions.push({ option: '' })
        }
      }
    },
    // perform API function
    requestCreateBallot () {
      this.loader = this.$loading.show()
      console.log(this.ballot)
      BallotServices.createBallot(this.ballot)
        .then(response => {
          this.loader.hide()
          console.log(response)
          this.$router.go(-1)
        })
        .catch(error => {
          this.$msg({text: error})
          this.loader.hide()
        })
    },
    requestUpdateBallot () {
      this.loader = this.$loading.show()
      BallotServices.updateBallot(this.ballot)
        .then(response => {
          this.loader.hide()
          console.log(response)
          this.$router.go(-1)
        })
        .catch(error => {
          this.$msg({text: error})
          this.loader.hide()
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
