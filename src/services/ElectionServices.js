import Axios from 'axios'
import {getUserID} from '../../helper/authHeader'
const config = require('../../helper/config')

export const ElectionServices = {
  getPublicVote,
  getPrivateVote
}

async function getPublicVote () {
  return Axios.get(config.url + '/election/getPublicVote', {params: {userID: getUserID()}})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      console.log(response.data)
      return response.data
    })
}

async function getPrivateVote () {
  return Axios.get(config.url + '/election/getPrivateVote', {params: {userID: getUserID()}})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      console.log(response.data)
      return response.data
    })
}
