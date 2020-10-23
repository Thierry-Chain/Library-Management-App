import store from './store'
let allData=store.getState()
const {token}=allData.user.more
const authHeader={
    'Content-Type':'application/json',  
 'auth-token':`${token}`
}
console.log('auth-header with store',authHeader)
export default  authHeader