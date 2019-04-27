import Axios from 'axios'
import {getUserID} from '../../helper/authHeader'
const config = require('../../helper/config')

export const CandidateServices = {
  getAllCandidates,
  getAllCandidatesForBallot,
  getCandidate,
  updateCandidate,
  createCandidate,
  deleteCandidate,
  getCandidateList
}

async function createCandidate (candidate) {
  console.log({candidate, userID: getUserID()})
  return Axios.post(config.url + '/candidate/createCandidate', {candidate, userID: getUserID()})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      console.log(response)
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}

async function getAllCandidates () {
  return Axios.get(config.url + '/candidate/getAllCandidates', {params: {id: getUserID()}})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      return response.data
    })
}

async function getAllCandidatesForBallot () {
  return Axios.get(config.url + '/candidate/getAllCandidatesForBallot', {params: {id: getUserID()}})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      return response.data
    })
}

async function getCandidate (id) {
  return Axios.get(config.url + '/candidate/getCandidate', {params: {id: id}})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      return response.data
    })
}

async function getCandidateList (candidateList) {
  return Axios.get(config.url + '/candidate/getCandidateList', {params: {candidateList: candidateList}})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      return response.data
    })
}

async function updateCandidate (candidate) {
  return Axios.put(config.url + '/candidate/updateCandidate', {candidate})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      console.log(response)
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}

async function deleteCandidate (id) {
  return Axios.delete(config.url + '/candidate/deleteCandidate', {params: {id: id}})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}
