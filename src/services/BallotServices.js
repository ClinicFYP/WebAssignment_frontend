import Axios from 'axios'
import {authToken, getUserID} from '../../helper/authHeader'
const config = require('../../helper/config')

export const BallotServices = {
  createBallot,
  getBallot,
  getAllBallots,
  updateBallot,
  deleteBallot
}

async function createBallot (ballot) {
  return Axios.post(config.url + '/ballot/createBallot', {ballot: ballot, userID: getUserID()})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      console.log(response)
      return response.data
    })
}

async function getBallot (ballotID) {
  return Axios.get(config.url + '/ballot/getBallot', {params: {id: ballotID}})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      // console.log(response)
      return response.data
    })
}

async function getAllBallots () {
  console.log({userID: getUserID()})
  return Axios.get(config.url + '/ballot/getAllBallots', {params: {userID: getUserID()}})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      console.log(response.data)
      return response.data
    })
}

async function updateBallot (ballot) {
  return Axios.put(config.url + '/ballot/updateBallot', ballot)
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      console.log(response.data)
      return response.data
    })
}

async function deleteBallot (ballotID) {
  return Axios.delete(config.url + '/ballot/deleteBallot', {params: {_id: ballotID}})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      console.log(response.data)
      return response.data
    })
}
