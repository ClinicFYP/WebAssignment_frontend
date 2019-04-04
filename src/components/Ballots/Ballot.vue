<template>
  <div class="container-fluid">
    <div class="header">
      <h1 class="text-left">Ballots List</h1>
      <div class="text-right">
        <button type="button" class="btn btn-primary" v-on:click="createBallot">Create Ballot</button>
      </div>
    </div>
    <div class="data-table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="name in fields">{{name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in ballots" class="m-datatable__row" :id="data._id">
            <td>{{data.name}}</td>
            <td>{{data.candidateList.length}}</td>
            <td>{{data.description}}</td>
            <td class="table-success">{{ data.startDatetime | moment("YYYY-MM-DD hh:mm")}}</td>
            <td class="table-danger">{{ data.endDatetime | moment("YYYY-MM-DD hh:mm") }}</td>
            <td>{{ data.updatedAt | moment("YYYY-MM-DD hh:mm") }}</td>
            <td>{{ data.createdAt | moment("YYYY-MM-DD hh:mm") }}</td>
            <td>
              <div class="form-inline text-right">
                <img
                  src="../../assets/edit.png"
                  width="20px"
                  height="20px"
                  style="cursor: pointer;"
                  title="Edit"
                  v-on:click="edit(data._id)"
                >
                &nbsp;
                <img
                  src="../../assets/delete.png"
                  width="20px"
                  height="20px"
                  style="cursor: pointer;"
                  title="Delete"
                  v-on:click="seletBallot(data)"
                  v-b-modal.deleteModal
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="deleteModal" size="lg" ref="deleteModal" @ok="deleteBallot()">
        <h4 class="text-center">Are you confirm delete {{seletedBallot.name}} ballot?</h4>
      </b-modal>
    </div>
  </div> 
</template>

<script>
import {BallotServices} from "../../Services/BallotServices";
export default {
  data() {
    return {
      seletedBallot: "",
      fields: ['Name', 'Numbers of Candidate', 'Description', 'Start At', 'Finish At', 'Updated At', 'Creatd At', ''],
      ballots: []
    }
  },
  mounted: function(){
    this.getAllBallotsList()
  },
  methods:{
    getAllBallotsList(){
      BallotServices.getAllBallots()
      .then(response => {
        this.ballots = response.result
        console.log(this.ballots[0].startDatetime);
      })
      .catch(error => {
        // this.error = true
        // this.message = error
        console.log(error)
      })
    },
    createBallot(){
      this.$router.push({name: 'CreateBallot'})
    },
    edit(id) {
      this.$router.push({
        name: "EditBallot",
        params: {
          id: id,
          title: "Update Blllot"
        }
      });
    },
    seletBallot(data){
      this.seletedBallot = data
    },
    deleteBallot(){
        BallotServices.deleteBallot(this.seletedBallot._id)
          .then(response => {
          console.log(response.result);
          this.getAllBallotsList()
        })
        .catch(error => {
          // this.error = true
          // this.message = error
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.data-table{
  width: auto;
  margin: 10px;
}

.header{
  margin: 10px;
}
</style>