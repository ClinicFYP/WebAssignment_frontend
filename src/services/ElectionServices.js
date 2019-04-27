import Axios from 'axios'
import {getUserID} from '../../helper/authHeader'
const config = require('../../helper/config')

export const ElectionServices = {
  getVoteList,
  vote
}

async function getVoteList () {
  return Axios.get(config.url + '/election/getVotes', {params: {userID: getUserID()}})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      console.log(response.data)
      return response.data
    })
}

async function vote (ballotID, candidateID, permission) {
  return Axios.post(config.url + '/election/createVote', {ballotID: ballotID,
    candidateID: candidateID,
    userID: getUserID(),
    action: (permission ? 'votePublic' : 'votePrivate')})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      console.log(response.data)
      return response.data
    })
}
