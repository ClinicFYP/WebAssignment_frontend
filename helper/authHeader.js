export function authHeader () {
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    return { 'Content-Type': 'application/x-www-form-urlencoded', 'authorization': 'Bearer ' + user.token }
  } else {
    return {}
  }
}
