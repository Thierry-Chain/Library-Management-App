const saveUser = (user) => {
  //console.log(user)
  const state = {
    auth: true,
    more: user,
    error: '',
    advancedAuth: false
  }
  localStorage.setItem('state', JSON.stringify(state))
  localStorage.setItem('token', JSON.stringify(user.token))

}
const getUser = () => {
  return localStorage.getItem('state')
}

const getUserName = () => {
  const userObj = JSON.parse(localStorage.getItem('state'))
  return userObj.more.user.name
}

const getUserId = () => {
  const userObj = JSON.parse(localStorage.getItem('state'))
  return userObj.more.user._id
}
const getUserEmail = () => {
  const userObj = JSON.parse(localStorage.getItem('state'))
  return userObj.more.user.email
}



export {
  saveUser,
  getUser,
  getUserName,
  getUserId,
  getUserEmail
}