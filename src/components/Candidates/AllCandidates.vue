<template>
  <div class='container-fluid'>
    <div class='header'>
      <h1 class='text-left'>Candidate List</h1>
      <div class='text-right'>
        <button type='button' class='btn btn-primary' v-on:click='createCandidate'>Create Candidate</button>
      </div>
    </div>
    <div class='data-table'>
      <table class='table table-hover'>
        <thead>
          <tr>
            <!-- <th v-for='name in fields' :class='name'>{{name}}</th> -->
            <th style='width: 10%'>Photo</th>
            <th style='width: 10%'>Name</th>
            <th style='width: 5%'>Gender</th>
            <th style='width: 10%'>Career</th>
            <th style='width: 10%'>Email</th>
            <th style='width: 10%'>Political Platform</th>
            <th style='width: 12.5%'>Updated At</th>
            <th style='width: 12.5%'>Created AT</th>
            <th style='width: 10%'></th>
          </tr>
        </thead>
        <tbody v-if="candidates.length > 0">
          <tr v-bind:key='index' v-for='(data, index) in candidates' class='m-datatable__row' :id='data._id'>
            <td>
              <img
                class='thumbnail img-circle'
                :src='data.image'
                alt='...'
                width='40px'
                height='40px'
              >
            </td>
            <td>{{data.firstName}} {{data.lastName}}</td>
            <td v-if='data.gender === 1' >Female</td>
            <td v-else >Male</td>
            <td>{{data.career}}</td>
            <td>{{data.email}}</td>
            <td>{{data.politicalPlatform}}</td>
            <td>{{ data.updatedAt | moment('YYYY-MM-DD hh:mm') }}</td>
            <td>{{ data.createdAt | moment('YYYY-MM-DD  hh:mm') }}</td>
            <td>
              <div>
                <img
                  src='../../assets/edit.png'
                  width='20px'
                  height='20px'
                  style='cursor: pointer'
                  title='Edit'
                  v-on:click='edit(data._id)'
                >
                <img
                  src='../../assets/delete.png'
                  width='20px'
                  height='20px'
                  style='cursor: pointer'
                  title='Delete'
                  v-on:click='selectCandidate(data)'
                  v-b-modal.deleteModal
                >
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else><tr><td colspan='9'>No candidate available</td></tr></tbody>
      </table>
      <b-modal id='deleteModal' size='lg' ref='deleteModal' @ok='confirmDelete'>
        <h4 class='text-center'>Are you confirm delete {{selectedCandidate.first_name}} {{selectedCandidate.last_name}} candidate?</h4>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { CandidateServices } from '../../Services/CandidateServices'
// import moment from 'moment'
export default {
  data () {
    return {
      fields: [
        'Photo',
        'Name',
        'Gender',
        'Career',
        'Email',
        'Political Platform',
        'Updated At',
        'Creatd At',
        ''
      ],
      candidates: [],
      selectedCandidate: '',
      loader: null
    }
  },
  mounted: function () {
    this.loader = this.$loading.show()
    this.getAllCandidates()
  },
  methods: {
    getAllCandidates () {
      CandidateServices.getAllCandidates()
        .then(response => {
          this.loader.hide()
          console.log(response)
          this.candidates = response.result
        })
        .catch(error => {
          // this.$msg({text: error})
          this.loader.hide()
          console.log(error)
        })
    },
    edit (id) {
      this.$router.push({
        name: 'EditCandidate',
        params: {
          id: id
        }
      })
    },
    createCandidate () {
      this.$router.push({ name: 'CreateCandidate' })
    },
    selectCandidate (candidate) {
      this.selectedCandidate = candidate
    },
    confirmDelete (evt) {
      this.loader = this.$loading.show()
      CandidateServices.deleteCandidate(this.selectedCandidate._id)
        .then(response => {
          console.log(response)
          this.getAllCandidates()
          this.loader.hide()
        })
        .catch(error => {
          this.$msg({text: error})
          console.log(error)
          this.loader.hide()
        })
    }
  }
}
</script>

<style scoped>
.data-table {
  width: auto;
  margin: 10px;
}

.thumbnail {
  margin-top: -15px;
  margin-bottom: -10px;
}
</style>
