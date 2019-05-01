import Axios from 'axios'
import {getUserID} from '~/authHeader'
const config = require('~/config')

export const BallotServices = {
  createBallot,
  getBallot,
  getAllBallots,
  getAllBallotsWithConditions,
  updateBallot,
  deleteBallot,
  countOfBallots
}

async function createBallot (ballot) {
  return Axios.post(config.url + '/ballot/createBallot', {ballot: ballot, userID: getUserID()})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getBallot (ballotID) {
  return Axios.get(config.url + '/ballot/getBallot', {params: {id: ballotID}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getAllBallots () {
  return Axios.get(config.url + '/ballot/getAllBallots', {params: {userID: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getAllBallotsWithConditions (conditions) {
  console.log({params: {conditions, userID: getUserID()}})
  return Axios.get(config.url + '/ballot/getAllBallotsWithConditions', {params: {conditions, userID: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      console.log(error.response)
      throw new Error(error.response.data.message)
    })
}

async function updateBallot (ballot) {
  return Axios.put(config.url + '/ballot/updateBallot', ballot)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function deleteBallot (ballotID) {
  return Axios.delete(config.url + '/ballot/deleteBallot', {params: {_id: ballotID}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function countOfBallots () {
  return Axios.get(config.url + '/ballot/countOfBallots', {params: {userID: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}
