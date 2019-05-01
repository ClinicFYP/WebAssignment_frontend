import Axios from 'axios'
import {getUserID} from '@/helper/authHeader'
const config = require('@/helper/config')

export const ElectionServices = {
  getElection,
  vote,
  getElectionHistory,
  getRealTimeResult,
  getNotRealTimeResult,
  getElectionStatistic,
  getInvitedUsers
}

async function getElection () {
  return Axios.get(config.url + '/election/getElection', {params: {userID: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function vote (ballotID, candidateID, permission) {
  return Axios.post(config.url + '/election/createVote', {ballotID: ballotID,
    candidateID: candidateID,
    userID: getUserID(),
    action: (permission ? 'votePublic' : 'votePrivate')})
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getElectionHistory () {
  return Axios.get(config.url + '/election/getElectionHistory', {params: {userID: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getRealTimeResult (ballotID, permission) {
  return Axios.get(config.url + '/election/getElectionResult', {params: {ballotID: ballotID,
    userID: getUserID(),
    action: (permission ? 'realTimePublicResult' : 'realTimePrivateResult')}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getNotRealTimeResult (ballotID, permission) {
  return Axios.get(config.url + '/election/getElectionResult', {params: {ballotID: ballotID,
    userID: getUserID(),
    action: (permission ? 'publicResult' : 'privateResult')}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getElectionStatistic (ballotID, permission) {
  return Axios.get(config.url + '/election/getElectionStatistic',
    {params: {ballotID: ballotID,
      userID: getUserID()}
    })
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getInvitedUsers (ballotID) {
  return Axios.get(config.url + '/ballot/getInvitedUsers',
    {params: {ballotID: ballotID,
      userID: getUserID()}
    })
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}
