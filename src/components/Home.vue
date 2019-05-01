<template>
    <div class="container">
        <div class="card-deck">
              <div>
                <div class="card border-success">
                  <div class="card-block">
                    <div class="card-body">
                      <h4 class="card-title">Count of Ballots</h4>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted text-center">
                      <h3 v-if="ballotsCount != null">{{ballotsCount.count}}</h3>
                      <h3 v-else>0</h3>
                    </small>
                  </div>
                </div>
              </div>
            <div>
                <div class="card border-success">
                  <div class="card-block">
                    <div class="card-body">
                      <h4 class="card-title">Count of Candidates</h4>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted text-center">
                       <h3 v-if="candidatesCount != null">{{candidatesCount.count}}</h3>
                      <h3 v-else>0</h3>
                    </small>
                  </div>
                </div>
              </div>
          </div>
    </div>
</template>

<script>
import { BallotServices } from '../Services/BallotServices'
import { CandidateServices } from '../Services/CandidateServices'
export default {
  data () {
    return {
      ballotsCount: null,
      candidatesCount: null
    }
  },
  created () {
    this.getCountOfBallots()
    this.getCountOfCandidates()
  },
  methods: {
    async getCountOfBallots () {
      BallotServices.countOfBallots()
        .then(response => {
          this.ballotsCount = response.result[0]
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error)
        })
    },
    async getCountOfCandidates () {
      CandidateServices.countOfCandidates()
        .then(response => {
          this.candidatesCount = response.result[0]
        })
        .catch(error => {
          // this.$msg({text: error})
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
