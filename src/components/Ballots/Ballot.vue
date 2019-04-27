<template>
  <div class='container-fluid'>
    <div class='header'>
      <h1 class='text-left'>Ballots List</h1>
    </div>
    <div class='search clearfix'>
      <div class='float-left'>
        <b-form-group>
          <b-dropdown :text='title.permission' variant='dark'>
            <b-dropdown-item
              v-for='option in permissionList'
              :key='option.name'
              :value='option.value'
              v-on:click='selectPermission(option)'
            >{{option.name}}</b-dropdown-item>
          </b-dropdown>
          <b-dropdown :text='title.realtime' variant='dark'>
            <b-dropdown-item
              v-for='option in realtimeList'
              :key='option.name'
              :value='option.value'
              v-on:click='selectRealtime(option)'
            >{{option.name}}</b-dropdown-item>
          </b-dropdown>
          <b-dropdown :text='title.electionType' variant='dark'>
            <b-dropdown-item
              v-for='option in electionTypeList'
              :key='option.name'
              :value='option.value'
              v-on:click='selectElectionType(option)'
            >{{option.name}}</b-dropdown-item>
          </b-dropdown>
          <b-dropdown :text='title.status' variant='dark'>
            <b-dropdown-item
              v-for='option in statusList'
              :key='option.name'
              :value='option.value'
              v-on:click='selectStatus(option)'
            >{{option.name}}</b-dropdown-item>
          </b-dropdown>
          <b-button variant='outline-secondary' v-on:click='getResult'>Search</b-button>
          <b-button variant='outline-danger' v-on:click='reset'>Reset</b-button>
        </b-form-group>
      </div>
      <div class='createBallot float-right'>
        <b-button variant='primary' v-on:click='createBallot'>Create Ballot</b-button>
      </div>
    </div>
    <b-alert variant='danger' fade dismissible v-model='error'>{{message}}</b-alert>
    <div class='data-table'>
      <table class='table table-hover'>
        <thead>
          <tr>
            <th style='width: 15%'>Name</th>
            <th style='width: 5%'>Candidate</th>
            <th style='width: 10%'>Description</th>
            <th style='width: 12.5%'>Start At</th>
            <th style='width: 12.5%'>Finish At</th>
            <th style='width: 12.5%'>Updated At</th>
            <th style='width: 12.5%'>Created At</th>
            <th style='width: 10%'>Status</th>
            <th style='width: 8%'></th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="index" v-for='(data, index) in ballots' class='m-datatable__row' :id='data._id'>
            <td>
              <img
                class='thumbnail img-circle'
                src='../../assets/private.png'
                alt='...'
                width='60px'
                height='30px'
                v-if='!data.permission'
              >
              {{data.name}}
            </td>
            <td>{{data.candidateList.length}}</td>
            <td>{{data.description}}</td>
            <td class='table-success'>{{ data.startDatetime | moment('YYYY-MM-DD hh:mm')}}</td>
            <td class='table-danger'>{{ data.endDatetime | moment('YYYY-MM-DD hh:mm') }}</td>
            <td>{{ data.updatedAt | moment('YYYY-MM-DD hh:mm') }}</td>
            <td>{{ data.createdAt | moment('YYYY-MM-DD hh:mm') }}</td>
            <td>{{ballotStatus(data.startDatetime, data.endDatetime)}}</td>
            <td>
              <div  v-if='ballotStatus(data.startDatetime, data.endDatetime) == "Waiting"'
                class='form-inline text-right'
              >
              <!-- v-if='ballotStatus(data.startDatetime, data.endDatetime) == 'Waiting'' -->
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
                  v-on:click='seletBallot(data)'
                  v-b-modal.deleteModal
                >
              </div>
              <p v-else></p>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id='deleteModal' size='lg' ref='deleteModal' @ok='deleteBallot()'>
        <h4 class='text-center'>Are you confirm delete {{seletedBallot.name}} ballot?</h4>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { BallotServices } from '../../Services/BallotServices'
// import { unescape } from 'querystring'
const moment = require('moment')
export default {
  data () {
    return {
      seletedBallot: '',
      error: false,
      message: '',
      ballots: [],
      title: {
        permission: 'Permission: All',
        realtime: 'Real-time Result: All',
        electionType: 'Election Type: All',
        status: 'Status: All'
      },
      permissionList: [
        { name: 'All', value: '' },
        { name: 'Public', value: true },
        { name: 'Private', value: false }
      ],
      realtimeList: [
        { name: 'All', value: '' },
        { name: 'Yes', value: true },
        { name: 'No', value: false }
      ],
      electionTypeList: [
        { name: 'All', value: '' },
        { name: 'Simple', value: true },
        { name: 'Normal', value: false }
      ],
      statusList: [
        { name: 'All', value: '' },
        { name: 'Waiting', value: 'waiting' },
        { name: 'Processing', value: 'processing' },
        { name: 'Finished', value: 'finished' }
      ],
      search: {
        permission: '',
        realtime: '',
        electionType: '',
        status: ''
      }
    }
  },
  mounted: function () {
    this.getAllBallotsList()
  },
  methods: {
    getAllBallotsList () {
      BallotServices.getAllBallots()
        .then(response => {
          this.ballots = response.result
          console.log(this.ballots[0].startDatetime)
        })
        .catch(error => {
          // this.error = true
          // this.message = error
          console.log(error)
        })
    },
    createBallot () {
      this.$router.push({ name: 'CreateBallot' })
    },
    ballotStatus (start, end) {
      const current = moment().format('YYYY-MM-DD hh:mm')
      const startFormated = moment(start).format('YYYY-MM-DD hh:mm')
      const endFormated = moment(end).format('YYYY-MM-DD hh:mm')
      if (startFormated > current) {
        return 'Waiting'
      } else if (startFormated < current && endFormated > current) {
        return 'Processing'
      } else if (endFormated < current) {
        return 'Finished'
      }
    },
    edit (id) {
      this.$router.push({
        name: 'EditBallot',
        params: {
          id: id,
          title: 'Update Blllot'
        }
      })
    },
    seletBallot (data) {
      this.seletedBallot = data
    },
    deleteBallot () {
      BallotServices.deleteBallot(this.seletedBallot._id)
        .then(response => {
          console.log(response.result)
          this.getAllBallotsList()
        })
        .catch(error => {
          // this.error = true
          // this.message = error
          console.log(error)
        })
    },
    selectPermission (option) {
      this.title.permission = 'Permission: ' + option.name
      this.search.permission = option.value
    },
    selectRealtime (option) {
      this.title.realtime = 'Real-time Result: ' + option.name
      this.search.realtime = option.value
    },
    selectElectionType (option) {
      this.title.electionType = 'Election Type: ' + option.name
      this.search.electionType = option.value
    },
    selectStatus (option) {
      this.title.status = 'Status: ' + option.name
      this.search.status = option.value
    },
    getResult () {
      this.error = false
      console.log(this.search.permission)
      if (this.search.permission === undefined) {
        this.getAllBallotsList()
        return
      }
      BallotServices.getAllBallotsWithConditions(this.search)
        .then(response => {
          this.ballots = response.result
          console.log(response.result)
        })
        .catch(error => {
          this.error = true
          this.message = error
          console.log(error)
        })
    },
    reset () {
      if (
        this.search.permission !== '' ||
        this.search.realtime !== '' ||
        this.search.electionType !== '' ||
        this.search.status !== ''
      ) {
        this.getAllBallotsList()
      }

      this.title.permission = 'Permission: All'
      this.title.realtime = 'Real-time Result: All'
      this.title.electionType = 'Election Type: All'
      this.title.status = 'Status: All'
      this.search.permission = ''
      this.search.realtime = ''
      this.search.electionType = ''
      this.search.status = ''
    }
  }
}
</script>

<style scoped>
.data-table {
  width: auto;
  margin: 10px;
}

.header {
  margin: 10px;
}
</style>
