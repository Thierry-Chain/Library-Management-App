const saveUser = (user) => {
  //console.log(user)
  const state = {
    auth: true,
    more: user,
    error: '',
    advancedAuth: false,
  }
  localStorage.setItem('state', JSON.stringify(state))
  localStorage.setItem('token', JSON.stringify(user.token))
}
const getUser = () => {
  if (localStorage.getItem('state')) {
    return localStorage.getItem('state')
  }
}

const getUserName = () => {
  if (localStorage.getItem('state')) {
    const userObj = JSON.parse(localStorage.getItem('state'))
    return userObj.more.user.name
  }
}

const getUserId = () => {
  if (localStorage.getItem('state')) {
    const userObj = JSON.parse(localStorage.getItem('state'))
    return userObj.more.user._id
  } else {
    window.location.reload()
    alert('Already logged out')
  }
}
const getUserEmail = () => {
  if (localStorage.getItem('state')) {
    const userObj = JSON.parse(localStorage.getItem('state'))
    return userObj.more.user.email
  }
}

export { saveUser, getUser, getUserName, getUserId, getUserEmail }
