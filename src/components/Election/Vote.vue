<template>
  <div class="container">
    <b-card-group deck v-for="(data, index) in candidateList">
      <b-card
        class="mb-2"
        style="max-width: 20rem;"
        :img-src="data.image"
        img-alt="Image"
        img-top
      >
        <h4 slot="header">Name: {{data.firstName}} {{data.lastName}}</h4>
        <b-card-text>Gender: {{data.gender}}</b-card-text>
        <b-card-text>E-mail: {{data.email}}</b-card-text>
        <b-card-text>Carrer: {{data.carrer}}</b-card-text>
        <b-card-text>Political Platform: {{data.politicalPlatform}}</b-card-text>
        <b-card-text>Political Affiliation: {{data.politicalAffiliation}}</b-card-text>
        <div slot="footer">
          <small class="text-muted">
            <b-button block variant="success">Select</b-button>
          </small>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { BallotServices } from "../../Services/BallotServices";
import { CandidateServices } from "../../Services/CandidateServices";
export default {
  data() {
    return {
      ballot: [],
      candidateList: []
    };
  },
  created() {
    BallotServices.getBallot(this.$route.params.id)
      .then(response => {
        this.ballot = response.result;
        console.log(this.ballot);
        this.getCandidates();
      })
      .catch(error => {
        // this.error = true
        // this.message = error
        console.log(error);
      });
  },
  methods: {
    getCandidates() {
      CandidateServices.getCandidateList(this.ballot.candidateList)
        .then(response => {
          console.log(response);
          this.candidateList = response.result;
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  }
};
</script>

<style>
</style>
