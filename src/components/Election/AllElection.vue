<template>
  <div class='container-fluid'>
    <div class='header'>
      <h1 class='text-left'>Private Vote List</h1>
    </div>
    <div class='data-table p-2 mx-auto'>
      <table class='table table-hover'>
        <thead>
          <tr>
           <th style='width: 25%' >Name</th>
            <th style='width: 10%'>Number of Candidate</th>
            <th style='width: 25%'>Description</th>
            <th style='width: 20%'>Time Remaining</th>
            <th style='width: 10%'></th>
          </tr>
        </thead>
        <tbody v-if='privateElection.length > 0'>
          <tr v-bind:key='index' v-for='(data, index) in privateElection' class='m-datatable__row' :id='data._id'>
            <td>{{data.name}}</td>
            <td>{{data.candidateList.length}}</td>
            <td>{{data.description}}</td>
            <td>
              <span v-if='!checkAvailableVote(data.startDatetime)'>Available after:<br></span>
              <vac :end-time='data.endDatetime'>
                <span
                  slot='process'
                  slot-scope='{ timeObj }'
                >{{ `${timeObj.d} Days ${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
                <span slot='finish'>Done!</span>
              </vac>
            </td>
            <td>
              <div v-if='checkAvailableVote(data.startDatetime)'>
                <b-button block variant='success' v-if='checkTime(data.endDatetime)' v-on:click='vote(data._id)'>Vote</b-button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else><tr><td colspan='5'>No private election available</td></tr></tbody>
      </table>
    </div>
    <div class='header'>
      <h1 class='text-left'>Public Vote List</h1>
    </div>
    <div class='data-table p-2 mx-auto'>
      <table class='table table-hover'>
        <thead>
          <tr>
            <th style='width: 25%'>Name</th>
            <th style='width: 10%'>Number of Candidate</th>
            <th style='width: 25%'>Description</th>
            <th style='width: 20%'>Time Remaining</th>
            <th style='width: 10%'></th>
          </tr>
        </thead>
        <tbody v-if='publicElection.length > 0'>
          <tr v-bind:key='index' v-for='(data, index) in publicElection' class='m-datatable__row' :id='data._id'>
            <td>{{data.name}}</td>
            <td>{{data.candidateList.length}}</td>
            <td>{{data.description}}</td>
            <td>
              <span v-if='!checkAvailableVote(data.startDatetime)'>Available After<br></span>
              <vac :end-time='data.endDatetime'>
                <span
                  slot='process'
                  slot-scope='{ timeObj }'
                >{{ `${timeObj.d} Days ${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
                <span slot='finish'>Closed</span>
              </vac>
            </td>
            <td>
              <div v-if='checkAvailableVote(data.startDatetime)'>
                <b-button block variant='success' v-if='checkTime(data.endDatetime)' v-on:click='vote(data._id)'>Vote</b-button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else><tr><td colspan='5'>No public election available</td></tr></tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ElectionServices } from '@/services/ElectionServices'
const moment = require('moment')
export default {
  data () {
    return {
      publicElection: [],
      privateElection: [],
      fields: [
        'Name',
        'Number Of Candidate',
        'Description',
        'Time Remaining',
        ''
      ],
      loader: null
    }
  },
  created () {
    this.loader = this.$loading.show()
    ElectionServices.getElection()
      .then(response => {
        this.publicElection = response.result.publicElection
        this.privateElection = response.result.privateElection
        console.log(this.publicElection, this.privateElection)
        this.loader.hide()
      })
      .catch(error => {
        // this.$msg({text: error})
        this.loader.hide()
        console.log(error)
      })
  },
  methods: {
    checkTime (endTime) {
      const end = moment(endTime).format('YYYY-MM-DD hh:mm')
      const current = moment().format('YYYY-MM-DD hh:mm')
      if (current < end) {
        return true
      }
      return false
    },
    checkAvailableVote (startTime) {
      const start = moment(startTime).format('YYYY-MM-DD hh:mm')
      const current = moment().format('YYYY-MM-DD hh:mm')
      if (start < current) {
        return true
      }
      return false
    },
    vote (id) {
      this.$router.push({
        name: 'Vote',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped>
.data-table {
  margin: 50, 50, 0, 50;
  width: 90%;
}
</style>
