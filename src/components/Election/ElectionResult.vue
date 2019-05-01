<template>
  <div class="container">
    <b-alert variant="danger" fade v-model="error">{{message}}</b-alert>
    <div class="bg-light text-dark">
      <div class="content">
        <h3 class="display-5">{{ballot.name}} Election</h3>
        <dl class="row">
          <dt class="col-sm-3">Organizer:</dt>
          <dd class="col-sm-9">{{organizer.firstName}} {{organizer.lastName}}</dd>

          <dt class="col-sm-3">Permission:</dt>
          <dd class="col-sm-9">
            <span v-if="ballot.permission">Public</span>
            <span v-else>Private</span>
          </dd>

          <dt class="col-sm-3">Real-time Result:</dt>
          <dd class="col-sm-9">
            <span v-if="ballot.realtimeResult">Yes</span>
            <span v-else>No</span>
          </dd>

          <dt class="col-sm-3">Description:</dt>
          <dd class="col-sm-9">{{ballot.description}}</dd>

          <dt class="col-sm-3">Duration:</dt>
          <dd
            class="col-sm-9"
          >{{ballot.startDatetime | moment("YYYY-MM-DD hh:mm")}} -- {{ballot.endDatetime | moment("YYYY-MM-DD hh:mm")}}</dd>
          <dt class="col-sm-3">Status:</dt>
          <dd class="col-sm-9" v-if="ballot.endDatetime">
            <p class="text-danger">
              <vac :end-time="ballot.endDatetime">
                <span slot="before">Waiting</span>
                <span
                  slot="process"
                  slot-scope="{ timeObj }"
                >Processing: {{ `${timeObj.d} Days ${timeObj.h}:${timeObj.m}:${timeObj.s}`}}</span>
                <span slot="finish">Finished</span>
              </vac>
            </p>
          </dd>
        </dl>
      </div>
    </div>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Candidate Result" >
          <div class="card-deck">
            <div class="row" v-if="!ballot.electionType">
              <div v-for="(data, index) in candidateList" v-bind:key="index">
                <div class="card border-success">
                  <div class="card-block">
                    <img
                      class="card-img-top mx-auto d-block"
                      :src="data.image"
                      alt="Card image cap"
                    >
                    <div class="card-body">
                      <h4 class="card-title">Name: {{data.firstName}} {{data.lastName}}</h4>
                      <b>Political Platform:</b>
                      {{data.politicalPlatform}}
                      <br>
                      <b>Political Affiliation:</b>
                      {{data.politicalAffiliation}}
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted text-center">
                      <h1
                        class="text-danger"
                        v-if="electionResult.votingDistribution[index]"
                      >{{electionResult.votingDistribution[index].count}}</h1>
                      <h1 class="text-danger" v-else>0</h1>
                      <h3
                        v-if="electionResult.votingDistribution[index]">
                        {{persentage(electionResult.votingDistribution[index].count)}}
                      </h3>
                      <h3 v-else>0%</h3>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div v-for="(data, index) in ballot.candidateList" v-bind:key="index">
                <div class="card border-success">
                  <div class="card-block">
                    <div class="card-body">
                      <h4 class="card-title">
                        <p class="text-center">{{data.toUpperCase()}}</p>
                      </h4>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted text-center">
                      <h1
                        class="text-danger"
                        v-if="electionResult.votingDistribution[index]"
                      >{{electionResult.votingDistribution[index].count}}</h1>
                      <h1 class="text-danger" v-else>0</h1>
                      <h3
                        v-if="electionResult.votingDistribution[index]">
                        {{persentage(electionResult.votingDistribution[index].count)}}
                      </h3>
                      <h3 v-else>0%</h3>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Election Statistics" :disabled="!isOwner" v-on:click="generateChartData()">
            <div class=".bg-secondary text-right">
              <h5 class="text-danger">Total Voted: {{totalVoted}}</h5>
              <h6>Last Update: {{ new Date() | moment("YYYY-MM-DD HH:mm") }}</h6>
            </div>
            <div class="row">
                <div class="col-sm-8">
                    <div>
                        <b-dropdown id="dropdown-1" :text='"Date: " + votingTimeDistributionDropdownTitle' size="sm" v-if="votingTimeDistributionDropdownTitle != undefined">
                            <b-dropdown-item v-bind:key="index" v-for="(data, index) in votingTimeDistributionDropdown" v-on:click="updateBarData(data)">{{data}}</b-dropdown-item>
                        </b-dropdown>
                        <p class="text-center">Time Distribution</p>
                    </div>
                    <custom-bar-chart v-if="showBarChart" :chart-data="barChartData" :width="300" :height="300"></custom-bar-chart>
                </div>
                <div class="col-sm-4 text-center">
                  <br>
                  <p>Voting Distribution</p>
                  <custom-pie-chart v-if="showPieChart" :chartdata="pieChartData" :width="350" :height="350"></custom-pie-chart>
                </div>
            </div>
        </b-tab>
        <b-tab title="Invited User List" :disabled="!isOwner">
          <div v-if="invitedUserList != null">
            <div class=".bg-secondary text-right">
              <h5 class="text-danger">Total Invited Users: {{invitedUserList.length}}</h5>
            </div>
            <ul class="list-group">
              <li class="list-group-item" v-bind:key="index" v-for="(data, index) in invitedUserList">User {{index + 1}}: {{data.firstName}} {{data.lastName}}</li>
            </ul>
          </div>
          <div v-else>
            <h3 class="text-center">This is public election</h3>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { BallotServices } from '@/services/BallotServices'
import { CandidateServices } from '@/services/CandidateServices'
import { ElectionServices } from '@/services/ElectionServices'
import { UserServices } from '@/services/UserServices'
import CustomPieChart from './customPieChart'
import CustomBarChart from './customBarChart'
import { getUserID } from 'src/helper/authHeader'
const moment = require('moment')
// import { connect } from 'net'
// const moment = require('moment')
//   voteData: {labels: [], datasets: {label: 'Data One', backgroundColor: '#f87979', data: []}},
export default {
  data () {
    return {
      ballot: {},
      organizer: [],
      candidateList: [],
      invitedUserList: null,
      isOwner: false,
      electionResult: {},
      totalVoted: 0,
      pieChartData: null,
      barChartData: null,
      showPieChart: false,
      showBarChart: false,
      pieChart: {
        labels: [],
        data: [],
        backgroundColor: []
      },
      barChart: {
        labels: [],
        data: [],
        backgroundColor: []
      },
      votingTimeDistributionDropdownTitle: '',
      votingTimeDistributionDropdown: [],
      error: false,
      message: '',
      loader: null
    }
  },
  created () {
    this.loader = this.$loading.show()
    BallotServices.getBallot(this.$route.params.id)
      .then(response => {
        this.ballot = response.result
        if (getUserID() === this.ballot.userID) {
          // get the statistic data if the user id same
          this.getElectionStatistic()
        } else {
          // only get the votig number
          if (this.ballotStatus(this.ballot.endDatetime)) {
            // get the voting number after the election finished
            this.getElectionNotRealTimeResult()
          } else {
            // get the real time result
            if (this.ballot.realtimeResult) {
              this.getElectionRealTimeResult()
            } else {
              // show error
              this.$msg('Invalid acttion')
              this.$router.push({ name: 'History' })
            }
          }
        }
        // get the user list if the election permission is private
        if (!this.ballot.permission) {
          this.getInvitedUsers()
        }
        // get the organizer info
        this.getOrganizer()

        this.checkOwner()
        // get the candidate info if the election type is normal
        if (!this.ballot.electionType) {
          this.getCandidates()
        }
        this.loader.hide()
      })
      .catch(error => {
        // this.$msg({text: error})
        this.loader.hide()
        console.log(error)
      })
  },
  components: {
    CustomPieChart,
    CustomBarChart
  },
  methods: {
    checkOwner () {
      if (getUserID() === this.ballot.userID) {
        this.isOwner = true
      } else {
        this.isOwner = false
      }
    },
    ballotStatus (end) {
      const current = moment().format('YYYY-MM-DD hh:mm')
      const endFormated = moment(end).format('YYYY-MM-DD hh:mm')
      if (endFormated < current) {
        return true
      } else {
        return false
      }
    },
    async getElectionRealTimeResult () {
      const permission = this.ballot.permission
      ElectionServices.getRealTimeResult(this.$route.params.id, permission)
        .then(response => {
          this.electionResult = response.result
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error)
        })
    },
    async getElectionNotRealTimeResult () {
      const permission = this.ballot.permission
      ElectionServices.getNotRealTimeResult(this.$route.params.id, permission)
        .then(response => {
          this.electionResult = response.result
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error)
        })
    },
    async getElectionStatistic () {
      ElectionServices.getElectionStatistic(this.$route.params.id)
        .then(response => {
          this.electionResult = response.result
          console.log(this.electionResult)
          // this.generateChartData()
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error)
        })
    },
    async getCandidates () {
      await CandidateServices.getCandidateList(this.ballot.candidateList)
        .then(response => {
          this.candidateList = response.result
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error.data)
        })
    },
    async getOrganizer () {
      await UserServices.getOrganizer(this.ballot.userID)
        .then(response => {
          this.organizer = response.result
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error.data)
        })
    },
    async getInvitedUsers () {
      await ElectionServices.getInvitedUsers(this.ballot._id)
        .then(response => {
          this.invitedUserList = response.result
          console.log(response)
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error.data)
        })
    },
    persentage (count) {
      var sum = 0
      this.electionResult.votingDistribution.forEach(element => {
        sum += element.count
      })
      return (count / sum * 100).toFixed(2) + '%'
    },
    generateChartData () {
      this.barChart.labels = []
      this.barChart.data = []
      this.barChart.backgroundColor = []
      this.barChartData = null
      this.totalVoted = 0
      this.generatePieData()
      this.generateBarData()
    },
    generatePieData () {
      if (this.ballot.electionType) {
        this.ballot.candidateList.forEach(element => {
          this.pieChart.labels.push(element.toUpperCase())
        })
      } else {
        this.candidateList.forEach(element => {
          this.pieChart.labels.push(element.firstName + ' ' + element.lastName)
        })
      }
      this.electionResult.votingDistribution.forEach(element => {
        this.totalVoted += element.count
        this.pieChart.data.push(element.count)
        this.pieChart.backgroundColor.push(this.$randomColor({ luminosity: 'dark' }))
      })
      this.showPieChart = true
      this.pieChartData = {
        labels: this.pieChart.labels,
        datasets: [
          {
            label: this.pieChart.labels,
            backgroundColor: this.pieChart.backgroundColor,
            data: this.pieChart.data
          }
        ]
      }
    },
    generateBarData () {
      this.electionResult.votingTimeDistribution.forEach(element => {
        var option = element._id.y + '-' + element._id.m + '-' + element._id.d
        if (this.votingTimeDistributionDropdown.indexOf(option) === -1) {
          this.votingTimeDistributionDropdown.push(option)
        }
      })
      this.votingTimeDistributionDropdownTitle = this.votingTimeDistributionDropdown[0]
      this.electionResult.votingTimeDistribution.forEach(element => {
        var option = element._id.y + '-' + element._id.m + '-' + element._id.d
        if (this.votingTimeDistributionDropdown[0] === option) {
          this.barChart.labels.push(element._id.m + '/' + element._id.d + ' ' + element._id.h + ':00')
          this.barChart.data.push(element.count)
          this.barChart.backgroundColor.push(this.$randomColor({ luminosity: 'dark', hue: 'random' }))
        }
      })
      this.showBarChart = true
      this.barChartData = {
        labels: this.barChart.labels,
        datasets: [
          {
            label: this.barChart.labels,
            backgroundColor: this.barChart.backgroundColor,
            data: this.barChart.data,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: this.barChart.backgroundColor
          }
        ]
      }
    },
    updateBarData (date) {
      this.votingTimeDistributionDropdownTitle = date
      this.barChart.labels = []
      this.barChart.data = []
      this.barChart.backgroundColor = []
      this.barChartData = null
      this.electionResult.votingTimeDistribution.forEach(element => {
        var option = element._id.y + '-' + element._id.m + '-' + element._id.d
        if (date === option) {
          this.barChart.labels.push(element._id.m + '/' + element._id.d + ' ' + element._id.h + ':00')
          this.barChart.data.push(element.count)
          this.barChart.backgroundColor.push(this.$randomColor({ luminosity: 'dark', hue: 'random' }))
        }
      })
      this.barChartData = {
        labels: this.barChart.labels,
        datasets: [
          {
            label: this.barChart.labels,
            backgroundColor: this.barChart.backgroundColor,
            data: this.barChart.data,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: this.barChart.backgroundColor
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}

.content {
  margin-left: 30px;
}

h3 {
  margin: auto 0;
}

.card-deck {
  margin-top: 30px;
}

.card {
  width: 270px;
  margin-left: 50px;
  margin-bottom: 50px;
  margin-right: 50px;
}

.card img {
  max-width: 10rem;
  margin-top: 5px;
}
</style>
