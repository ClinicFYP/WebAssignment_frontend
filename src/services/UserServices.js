import Axios from 'axios'
// import Vue from 'vue'
import {getUserID} from '~/authHeader'
const config = require('~/config')

export const UserServices = {
  register,
  resendVerificationCode,
  userActivation,
  requestResetPassword,
  resetPassword,
  login,
  logout,
  getUser,
  updateUserInfo,
  getAllUsers,
  getOrganizer
}

async function register (user) {
  return Axios.post(config.url + '/user/register', {firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function resendVerificationCode (email) {
  return Axios.get(config.url + '/user/resendVerificationCode', {params: {email: email}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function userActivation (token) {
  return Axios.get(config.url + '/user/userActivation', {params: {token: token}})
    .then(response => {
      console.log(response.data)
      localStorage.setItem('firstName', response.data.result.firstName)
      localStorage.setItem('lastName', response.data.result.lastName)
      localStorage.setItem('token', 'Bearer ' + response.data.result.token)
      localStorage.setItem('userID', response.data.result.id)
      Axios.defaults.headers.common = {'authorization': `Bearer ${response.data.result.token}`}
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function requestResetPassword (email) {
  return Axios.get(config.url + '/user/requestResetPassword', {params: {email: email}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function resetPassword (email, password, resetCode) {
  return Axios.get(config.url + '/user/resetPassword', {params: {email: email, password: password, token: resetCode}})
    .then(response => {
      console.log(response.data)
      localStorage.setItem('firstName', response.data.result.firstName)
      localStorage.setItem('lastName', response.data.result.lastName)
      localStorage.setItem('token', 'Bearer ' + response.data.result.token)
      localStorage.setItem('userID', response.data.result.id)
      Axios.defaults.headers.common = {'authorization': `Bearer ${response.data.result.token}`}
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function login (user) {
  const requestBody = {
    params: {email: user.email, password: user.password}
  }
  return Axios.get(config.url + '/user/login', requestBody)
    .then(response => {
      console.log(response.data.result)
      localStorage.setItem('firstName', response.data.result.firstName)
      localStorage.setItem('lastName', response.data.result.lastName)
      localStorage.setItem('token', 'Bearer ' + response.data.result.token)
      localStorage.setItem('userID', response.data.result.id)
      // Vue.prototype.$http.defaults.headers.common['authorization'] = Authorization.authToken()
      Axios.defaults.headers.common = {'authorization': `Bearer ${response.data.result.token}`}
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function logout () {
  localStorage.clear()
}

async function getUser () {
  return Axios.get(config.url + '/user/getUser', {params: {userID: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function updateUserInfo (user) {
  return Axios.put(config.url + '/user/updateUser', user)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

function getAllUsers () {
  return Axios.get(config.url + '/user/getAllUsers', {params: {userID: getUserID()}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}

async function getOrganizer (userID) {
  return Axios.get(config.url + '/user/getUser', {params: {userID: userID}})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(error => {
      throw new Error(error.response.data.message)
    })
}
