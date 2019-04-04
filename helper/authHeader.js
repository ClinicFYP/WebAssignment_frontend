export function authToken () {
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    return 'Bearer ' + user.token
  } else {
    return null
  }
}

export function authStatus () {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    return true
  } else {
    return false
  }
}

export function getUserName () {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    return 'Hello! ' + user.firstName + ' ' + user.lastName
  } else {
    return 'Hello!!'
  }
}

export function setUserName (firstName, lastName) {
  console.log(firstName, lastName)
  var user = JSON.parse(localStorage.getItem('user'))
  user.firstName = firstName
  user.lastName = lastName
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUserID () {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    return user.id
  } else {
    return ''
  }
}

export function clear () {
  localStorage.clear()
}
