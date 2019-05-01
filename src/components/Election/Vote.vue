<template>
  <div class="container">
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
      <b-button v-if="selectedNormalCandidate._id" block variant="danger" size="lg" v-b-modal.voteModal><b>Vote for {{selectedNormalCandidate.firstName}} {{selectedNormalCandidate.lastName}}</b></b-button>
      <b-button v-if="selectedSimpleCandidate != -1" block variant="danger" size="lg" v-b-modal.voteModal><b>Vote for {{ballot.candidateList[selectedSimpleCandidate].toUpperCase()}}</b></b-button>
    </div>
    <div class="card-deck">
      <div class="row" v-if="!ballot.electionType">
          <div v-for="(data, index) in candidateList" v-bind:key="index">
            <div class="card border-success"  v-bind:class="{'bg-warning': defaultStatus[index].selected}">
              <div class="card-block" >
                <img
                  class="card-img-top mx-auto d-block"
                  :src="data.image"
                  alt="Card image cap"
                >
                <div class="card-body">
                  <h4 class="card-title">Name: {{data.firstName}} {{data.lastName}}</h4>
                  <b>Gender:</b> {{data.gender}}<br>
                  <b>E-mail:</b> {{data.email}}<br>
                  <b>Career:</b> {{data.career}}<br>
                  <b>Website:</b> {{data.website}}<br>
                  <b>Political Platform:</b> {{data.politicalPlatform}}<br>
                  <b>Political Affiliation:</b> {{data.politicalAffiliation}}
                </div>
              </div>
              <div class="card-footer">
                <small class="text-muted">
                  <b-button block variant="success" v-on:click="select(index)">Select</b-button>
                </small>
              </div>
            </div>
          </div>
      </div>
      <div class="row" v-else>
        <div v-for="(data, index) in ballot.candidateList" v-bind:key="index">
            <div class="card border-success"  v-bind:class="{'bg-warning': defaultStatus[index].selected}">
              <div class="card-block" >
                <div class="card-body">
                  <h4 class="card-title"><p class="text-center">{{data.toUpperCase()}}</p></h4>
                </div>
              </div>
              <div class="card-footer">
                <small class="text-muted">
                  <b-button block variant="success" v-on:click="select(index)">Select</b-button>
                </small>
              </div>
            </div>
          </div>
      </div>
    </div>
    <b-modal id="voteModal" size="lg" ref="deleteModal" @ok="vote()">
      <h4 class="text-center">Are you confirm vote for {{selectedNormalCandidate.firstName}} {{selectedNormalCandidate.lastName}} ?</h4>
    </b-modal>
  </div>
</template>

<script>
import { BallotServices } from '@/services/BallotServices'
import { CandidateServices } from '@/services/CandidateServices'
import { ElectionServices } from '@/services/ElectionServices'
import { UserServices } from '@/services/UserServices'
const moment = require('moment')
export default {
  data () {
    return {
      ballot: [],
      organizer: [],
      candidateList: [],
      defaultStatus: [],
      selectedNormalCandidate: {},
      selectedSimpleCandidate: -1,
      loader: null
    }
  },
  created () {
    this.loader = this.$loading.show()
    BallotServices.getBallot(this.$route.params.id)
      .then(response => {
        this.ballot = response.result
        this.getOrganizer()
        if (this.checkAvailableVote(this.ballot.startDatetime)) {
          if (this.ballot.electionType) {
            this.ballot.candidateList.forEach((element) => {
              this.defaultStatus.push({selected: false})
            })
          } else {
            this.getCandidates()
          }
        } else {
          // show error
          this.$msg('Invalid acttion')
          this.$router.push({ name: 'AllElection' })
        }
        this.loader.hide()
      })
      .catch(error => {
        // this.$msg({text: error})
        console.log(error)
        this.loader.hide()
      })
  },
  methods: {
    checkAvailableVote (startTime) {
      const start = moment(startTime).format('YYYY-MM-DD hh:mm')
      const current = moment().format('YYYY-MM-DD hh:mm')
      if (start < current) {
        return true
      }
      return false
    },
    async getCandidates () {
      await CandidateServices.getCandidateList(this.ballot.candidateList)
        .then(response => {
          console.log(response)
          this.candidateList = response.result
          this.candidateList.forEach((element) => {
            this.defaultStatus.push({selected: false})
          })
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error.data)
        })
    },
    async getOrganizer () {
      await UserServices.getOrganizer(this.ballot.userID)
        .then(response => {
          console.log(response)
          this.organizer = response.result
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error.data)
        })
    },
    select (id) {
      this.defaultStatus.forEach((element, index) => {
        if (id === index) {
          element.selected = true
          if (this.ballot.electionType) {
            this.selectedSimpleCandidate = index
          } else {
            this.selectedNormalCandidate = this.candidateList[index]
          }
        } else {
          element.selected = false
        }
      })
    },
    vote () {
      this.loader = this.$loading.show()
      const ballotID = this.ballot._id
      const candidateID = ((this.ballot.electionType) ? this.selectedSimpleCandidate : this.selectedNormalCandidate._id)
      const permission = this.ballot.permission
      ElectionServices.vote(ballotID, candidateID, permission)
        .then(response => {
          this.loader.hide()
          console.log(response)
          // this.$router.go(-1)
          this.$router.push({ name: 'History' })
        })
        .catch(error => {
          this.loader.hide()
          this.$msg({text: error})
          console.log(error)
          this.$router.go(-1)
        })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}

.content{
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

.card img{
  max-width: 10rem;
  margin-top: 5px;
}
</style>
