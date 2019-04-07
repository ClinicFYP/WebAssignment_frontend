<template>
  <div class="container-fluid">
    <div class="header">
      <h1 class="text-left" v-if="privateVote.length > 0">Private Vote List</h1>
      <h1 class="text-left" v-else>No Private Voting</h1>
    </div>
    <div class="data-table w-75 p-2 mx-auto">
      <table class="table table-hover" v-if="privateVote.length > 0">
        <thead>
          <tr>
            <th v-for="name in fields">{{name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in privateVote" class="m-datatable__row" :id="data._id">
            <td>{{data.name}}</td>
            <td>{{data.candidateList.length}}</td>
            <td>{{data.description}}</td>
            <td>
              <vac :end-time="data.endDatetime">
                <span
                  slot="process"
                  slot-scope="{ timeObj }"
                >{{ `${timeObj.d} Days ${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
                <span slot="finish">Done!</span>
              </vac>
            </td>
            <td>
              <b-button block variant="success" v-if="checkTime(data.endDatetime)" v-on:click="vote(data._id)">Vote</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="header">
      <h1 class="text-left" v-if="privateVote.length > 0">Public Vote List</h1>
      <h1 class="text-left" v-else>No Public Voting</h1>
    </div>
    <div class="data-table w-75 p-2 mx-auto">
      <table class="table table-hover" v-if="privateVote.length > 0">
        <thead>
          <tr>
            <th v-for="name in fields">{{name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in publicVote" class="m-datatable__row" :id="data._id">
            <td>{{data.name}}</td>
            <td>{{data.candidateList.length}}</td>
            <td>{{data.description}}</td>
            <td>
              <vac :end-time="data.endDatetime">
                <span
                  slot="process"
                  slot-scope="{ timeObj }"
                >{{ `${timeObj.d} Days ${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</span>
                <span slot="finish">Closed</span>
              </vac>
            </td>
            <td>
              <b-button block variant="success" v-if="checkTime(data.endDatetime)" v-on:click="vote(data._id)">Vote</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ElectionServices } from "../../Services/ElectionServices";
const moment = require("moment");
export default {
  data() {
    return {
      publicVote: [],
      privateVote: [],
      fields: [
        "Name",
        "Number Of Candidate",
        "Description",
        "Time Remaining",
        ""
      ]
    };
  },
  created() {
    ElectionServices.getPrivateVote()
      .then(response => {
        console.log(response);
        this.privateVote = response.result;
      })
      .catch(error => {
        console.log(error);
      });

    ElectionServices.getPublicVote()
      .then(response => {
        console.log(response);
        this.publicVote = response.result;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    checkTime(endTime) {
      const end = moment(endTime).format("YYYY-MM-DD hh:mm");
      const current = moment().format("YYYY-MM-DD hh:mm");
      if (current < end) {
        return true;
      }
      return false;
    },
    vote(id) {
      this.$router.push({
        name: "Vote",
        params: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
.data-table {
  margin: 50, 50, 0, 50;
}
</style>
