<template>
    <div class='container-fluid'>
        <div class='header'>
            <h1 class='text-left'>Elections History</h1>
        </div>
            <div class='data-table'>
      <table class='table table-hover'>
        <thead>
          <tr>
            <th style='width: 20%' @click="sort('name')">Name</th>
            <th style='width: 30%'>Description</th>
            <th style='width: 10%' @click="sort('permission')">Permission</th>
            <th style='width: 10%' @click="sort('status')">Status</th>
            <th style='width: 15%' @click="sort('createdAt')">Created At</th>
            <th style='width: 25%'>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="index" v-for='(data, index) in sortedHistoryList' class='m-datatable__row' :id='data._id'>
            <td>{{data.name}}</td>
            <td>{{data.description}}</td>
            <td v-if="data.permission">Public</td>
            <td v-else>Private</td>
            <td>{{ballotStatus(data.startDatetime, data.endDatetime)}}</td>
            <td>{{ data.createdAt | moment('YYYY-MM-DD hh:mm') }}</td>
            <td v-if="data.realtimeResult">
              <button type="button" class="btn btn-danger" v-if="ballotStatus(data.startDatetime, data.endDatetime) == 'Processing'" v-on:click='result(data._id, true)'>Real Time Result</button>
              <button type="button" class="btn btn-primary" v-if="ballotStatus(data.startDatetime, data.endDatetime) == 'Finished'" v-on:click='result(data._id, false)'>Result</button>
            </td>
            <td v-else>
                <vac :end-time='data.endDatetime'>
                <span
                  slot='process'
                  slot-scope='{ timeObj }'
                >Release after:<br>{{ `${timeObj.d} Days ${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
                <span slot='finish'><button type="button" class="btn btn-primary" v-on:click='result(data._id, false)'>Result</button></span>
              </vac>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>

<script>
import { ElectionServices } from '@/Services/ElectionServices'
const moment = require('moment')
export default {
  data () {
    return {
      electionHistory: [],
      currentSortDir: 'asc',
      currentSort: 'name',
      loader: null
    }
  },
  created () {
    this.loader = this.$loading.show()
    ElectionServices.getElectionHistory()
      .then(response => {
        response.result.publicElection.forEach(element => {
          this.electionHistory.push(element)
        })
        response.result.privateElection.forEach(element => {
          this.electionHistory.push(element)
        })
        console.log(this.electionHistory)
        this.loader.hide()
      })
      .catch(error => {
        // this.$msg({text: error})
        this.loader.hide()
        console.log(error)
      })
  },
  methods: {
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
    result (id, realtime) {
      this.$router.push({
        name: 'ElectionResult',
        params: {
          id: id
        }
      })
    },
    sort (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    }
  },
  computed: {
    sortedHistoryList () {
      // eslint-disable-next-line
      return this.electionHistory.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    }
  }
}
</script>

<style>

</style>
