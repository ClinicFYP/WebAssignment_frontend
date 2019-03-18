export function authHeader () {
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    return { 'Content-Type': 'application/x-www-form-urlencoded', 'authorization': 'Bearer ' + user.token }
  } else {
    return {}
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
    return 'Hello! ' + user.first_name + ' ' + user.last_name
  } else {
    return 'Hello!!'
  }
}

export function clear () {
  localStorage.clear()
}
