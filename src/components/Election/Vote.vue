<template>
  <div class="container">
    <div class="content bg-light text-dark">
      <h3 class="display-5">{{ballot.name}} Election</h3>
      <dl class="row">
        <dt class="col-sm-3">Organizer:</dt>
        <dd class="col-sm-9">{{ballot.userID}}</dd>

        <dt class="col-sm-3">Election Type:</dt>
        <dd class="col-sm-9">
          <span v-if="ballot.permission">Public</span>
          <span v-else>Private</span>
        </dd>

        <dt class="col-sm-3">Real-time Result:</dt>
        <dd class="col-sm-9">
          <span v-if="ballot.realtimeResult">Yes</span>
          <span v-else>NO</span>
        </dd>

        <dt class="col-sm-3">Description:</dt>
        <dd class="col-sm-9">{{ballot.description}}</dd>

        <dt class="col-sm-3">Duration:</dt>
        <dd
          class="col-sm-9"
        >{{ballot.startDatetime | moment("YYYY-MM-DD hh:mm")}} -- {{ballot.endDatetime | moment("YYYY-MM-DD hh:mm")}}</dd>
      </dl>
      <b-button v-if="selectedCandidate._id" block variant="danger" v-b-modal.voteModal><b>Vote for {{selectedCandidate.firstName}} {{selectedCandidate.lastName}}</b></b-button>
    </div>
    <div class="card-deck">
      <div class="row">
        <div v-for="(data, index) in candidateList" v-bind:key="index">
          <div class="card border-success"  v-bind:class="{'bg-warning': defaultStatus[index].selected}">
            <div class="card-block" >
              <img
                class="card-img-top mx-auto d-block"
                :src="data.image"
                alt="Card image cap"
              >
              <div class="card-body">
                <h5 class="card-title">Name: {{data.firstName}} {{data.lastName}}</h5>
                <b>Gender:</b> {{data.gender}}<br>
                <b>E-mail:</b> {{data.email}}<br>
                <b>Carrer:</b> {{data.carrer}}<br>
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
    </div>
    <b-modal id="voteModal" size="lg" ref="deleteModal" @ok="vote()">
      <h4 class="text-center">Are you confirm vote for {{selectedCandidate.firstName}} {{selectedCandidate.lastName}} ?</h4>
    </b-modal>
  </div>
</template>

<script>
import { BallotServices } from '../../Services/BallotServices'
import { CandidateServices } from '../../Services/CandidateServices'
import { ElectionServices } from '../../Services/ElectionServices'
// const moment = require('moment')
export default {
  data () {
    return {
      ballot: [],
      candidateList: [],
      defaultStatus: [],
      selectedCandidate: {}
    }
  },
  created () {
    BallotServices.getBallot(this.$route.params.id)
      .then(response => {
        this.ballot = response.result
        console.log(this.ballot)
        this.getCandidates()
      })
      .catch(error => {
        // this.error = true
        // this.message = error
        console.log(error)
      })
  },
  methods: {
    getCandidates () {
      CandidateServices.getCandidateList(this.ballot.candidateList)
        .then(response => {
          console.log(response)
          this.candidateList = response.result
          this.candidateList.forEach((element) => {
            this.defaultStatus.push({selected: false})
          })
        })
        .catch(error => {
          console.log(error.data)
        })
    },
    select (id) {
      this.defaultStatus.forEach((element, index) => {
        if (id === index) {
          element.selected = true
          this.selectedCandidate = this.candidateList[index]
        } else {
          element.selected = false
        }
      })
    },
    vote () {
      const ballotID = this.ballot._id
      const candidateID = this.selectedCandidate._id
      const permission = this.ballot.permission
      ElectionServices.vote(ballotID, candidateID, permission)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
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
