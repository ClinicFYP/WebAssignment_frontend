export function authToken () {
  let token = localStorage.getItem('token')
  if (token) {
    return token
    // return {headers: { 'authorization': token }}
  } else {
    return null
  }
}

export function authStatus () {
  let firstName = localStorage.getItem('firstName')
  let lastName = localStorage.getItem('lastName')
  if (firstName && lastName) {
    return true
  } else {
    return false
  }
}

export function getUserName () {
  let firstName = localStorage.getItem('firstName')
  let lastName = localStorage.getItem('lastName')
  if (firstName && lastName) {
    return 'Hello! ' + firstName + ' ' + lastName
  } else {
    return 'Hello!!'
  }
}

export function setUserName (firstName, lastName) {
  console.log(firstName, lastName)
  localStorage.setItem('firstName', firstName)
  localStorage.setItem('lastName', lastName)
}

export function getUserID () {
  let user = localStorage.getItem('userID')
  if (user) {
    return user
  } else {
    return ''
  }
}

export function clear () {
  localStorage.clear()
}
