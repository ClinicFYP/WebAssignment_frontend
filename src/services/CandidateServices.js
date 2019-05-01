import Axios from 'axios'
import {getUserID} from '@/helper/authHeader'
const config = require('@/helper/config')

export const CandidateServices = {
  getAllCandidates,
  getAllCandidatesForBallot,
  getCandidate,
  updateCandidate,
  createCandidate,
  deleteCandidate,
  getCandidateList,
  countOfCandidates
}

function createCandidate (candidate) {
  return Axios.post(config.url + '/candidate/createCandidate', {candidate, userID: getUserID()})
    .then(response => {
      console.log(response.data)
      if (response.data.result.image === 'https://www.cannatrac.com/static/images/users/71-1436214917.png') {
        return 'The file has been uploaded.'
      }
      return uploadImage(candidate, response.data)
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

function uploadImage (candidate, response) {
  const formData = new FormData()
  formData.append('file', candidate.selectedImage)
  formData.append('name', response.result.email)
  const config = {
    headers: {
      'content-type': 'text/html'
    }
  }
  return Axios.post('http://www2.comp.polyu.edu.hk/~17037536d/image/uploadImage.php', formData, config)
    .then(response => {
      return response.data
    })
}

async function getAllCandidates () {
  return Axios.get(config.url + '/candidate/getAllCandidates', {params: {id: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getAllCandidatesForBallot () {
  return Axios.get(config.url + '/candidate/getAllCandidatesForBallot', {params: {id: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getCandidate (id) {
  return Axios.get(config.url + '/candidate/getCandidate', {params: {id: id}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getCandidateList (candidateList) {
  return Axios.get(config.url + '/candidate/getCandidateList', {params: {candidateList: candidateList}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

function updateCandidate (candidate) {
  console.log(candidate)
  return Axios.put(config.url + '/candidate/updateCandidate', {candidate})
    .then(response => {
      console.log(response.data)
      if (candidate.selectedImage === null) {
        return 'The file has been uploaded.'
      }
      return uploadImage(candidate, response.data)
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function deleteCandidate (id) {
  return Axios.delete(config.url + '/candidate/deleteCandidate', {params: {id: id}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}
async function countOfCandidates () {
  return Axios.get(config.url + '/candidate/countOfCandidates', {params: {userID: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}
