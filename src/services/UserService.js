
import Axios from 'axios'
import {authHeader} from '../../helper/authHeader'
const config = require('../../helper/config')

export const UserService = {
  register,
  login,
  getAllUser,
  expireLocalStorage,
  logout
}

function register (firstName, lastName, email, password, remember) {
  return Axios.post(config.url + '/user/register', {first_name: firstName, last_name: lastName, email: email, password: password})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      expireLocalStorage(JSON.stringify(response.data.user), remember)
      console.log(response.data)
      return response.data
    })
}

function login (email, password, remember) {
  const requestBody = {
    params: {email: email, password: password}
  }

  return Axios.get(config.url + '/user/login', requestBody)
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      expireLocalStorage(JSON.stringify(response.data.user), remember)
      return response.data
    })
}

function logout () {
  localStorage.clear()
}

function expireLocalStorage (user, remember) {
  var hours = 0.1
  var now = new Date().getTime()
  var setupTime = localStorage.getItem('setupTime')
  if (remember) {
    hours = 3
  }
  if (setupTime == null) {
    localStorage.setItem('setupTime', now)
    localStorage.setItem('user', user)
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear()
    }
  }
}

function getAllUser () {
  const requestBody = {
    headers: authHeader()
  }
  return Axios.get(config.url + '/user/getUser', requestBody)
    .then((response) => {
    })
}
