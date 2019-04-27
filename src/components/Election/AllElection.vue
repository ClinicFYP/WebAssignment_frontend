<template>
  <div class='container-fluid'>
    <div class='header'>
      <h1 class='text-left'>Private Vote List</h1>
    </div>
    <div class='data-table p-2 mx-auto'>
      <table class='table table-hover'>
        <thead>
          <tr>
            <th v-bind:key='index' v-for='(name, index) in fields'>{{name}}</th>
          </tr>
        </thead>
        <tbody v-if='privateVotes.ballot'>
          <tr v-bind:key='index' v-for='(data, index) in privateVotes.list' class='m-datatable__row' :id='data._id'>
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
        <tbody v-if='publicVotes.ballot'>
          <tr v-bind:key='index' v-for='(data, index) in publicVotes.list' class='m-datatable__row' :id='data._id'>
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
import { ElectionServices } from '../../Services/ElectionServices'
const moment = require('moment')
export default {
  data () {
    return {
      publicVotes: [],
      privateVotes: [],
      fields: [
        'Name',
        'Number Of Candidate',
        'Description',
        'Time Remaining',
        ''
      ]
    }
  },
  created () {
    ElectionServices.getVoteList()
      .then(response => {
        this.publicVotes = response.result.publicVoteList
        this.privateVotes = response.result.privateVoteList
        console.log(this.publicVotes.list, this.privateVotes.list)
      })
      .catch(error => {
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
