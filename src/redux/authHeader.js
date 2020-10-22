import store from './store'
let allData=store.getState()
const token=allData.user.more.token
const authHeader={
    'Content-Type':'application/json',  
 'auth-token':`${token}`
}
export default  authHeader