import Axios from 'axios'
import {getUserID} from '../../helper/authHeader'
const config = require('../../helper/config')

export const UserServices = {
  register,
  login,
  logout,
  getUser,
  updateUserInfo,
  expireLocalStorage
}

async function register (user) {
  return Axios.post(config.url + '/user/register', {firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      expireLocalStorage(JSON.stringify(response.data.result), user.remember)
      console.log(response.data)
      return response.data
    })
}

async function login (user) {
  const requestBody = {
    params: {email: user.email, password: user.password}
  }
  return Axios.get(config.url + '/user/login', requestBody)
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      expireLocalStorage(JSON.stringify(response.data.result), user.remember)
      return response.data
    })
}

async function logout () {
  localStorage.clear()
}

async function getUser () {
  return Axios.get(config.url + '/user/getUser', {params: {userID: getUserID()}})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      return response.data
    })
}

async function updateUserInfo (user) {
  return Axios.put(config.url + '/user/updateUser', user)
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      return response.data
    })
}

function expireLocalStorage (user, remember) {
  console.log('user ', user)
  localStorage.setItem('user', user)
  
  var hours = 0.1
  var now = new Date().getTime()
  var setupTime = localStorage.getItem('setupTime')
  if (remember) {
    hours = 3
  }
  if (setupTime == null) {
    localStorage.setItem('setupTime', now)
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear()
    }
  }
}

// function getAllUser () {
//   const requestBody = {
//     headers: authHeader()
//   }
//   return Axios.get(config.url + '/user/getUser', requestBody)
//     .then((response) => {
//     })
// }
