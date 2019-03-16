
import Axios from 'axios'
import {authHeader} from '../../helper/authHeader'
const config = require('../../helper/config')

export const UserService = {
  register,
  login,
  getAllUser
}

function register (firstName, lastName, email, password) {
  return Axios.post(config.url + '/user/register', {first_name: firstName, last_name: lastName, email: email, password: password})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      localStorage.setItem('user', JSON.stringify(response.data.user))
      console.log(response.data)
      return response.data
    })
}

function login (email, password) {
  const requestBody = {
    params: {email: email, password: password}
  }

  return Axios.get(config.url + '/user/login', requestBody)
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      localStorage.setItem('user', JSON.stringify(response.data.user))
      return response.data
    })
}

function getAllUser () {
  const requestBody = {
    headers: authHeader()
  }
  return Axios.get(config.url + '/user/getUser', requestBody)
    .then((response) => {
    })
}
