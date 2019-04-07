import Axios from 'axios'
import {getUserID} from '../../helper/authHeader'
const config = require('../../helper/config')

export const UserServices = {
  register,
  login,
  logout,
  getUser,
  updateUserInfo,
  getAllUsers
}

async function register (user) {
  return Axios.post(config.url + '/user/register', {firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password})
    .then(response => {
      if (response.data.success == false) {
        throw new Error(response.data.message)
      }
      //localStorage.setItem('user', user)
      localStorage.setItem('firstName', response.data.result.firstName)
      localStorage.setItem('lastName', response.data.result.lastName)
      localStorage.setItem('token', 'Bearer ' + response.data.result.token)
      localStorage.setItem('userID', response.data.result.id)
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
      console.log(response.data.result)
      localStorage.setItem('firstName', response.data.result.firstName)
      localStorage.setItem('lastName', response.data.result.lastName)
      localStorage.setItem('token', 'Bearer ' + response.data.result.token)
      localStorage.setItem('userID', response.data.result.id)
      
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

function getAllUsers () {
  return Axios.get(config.url + '/user/getAllUsers', {params: {userID: getUserID()}})
    .then(response => {
      if (response.data.success === false) {
        throw new Error(response.data.message)
      }
      return response.data
    })
}
