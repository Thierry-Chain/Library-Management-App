/* eslint-disable no-unused-vars */
export const location='http://localhost:5000/api'
export const headers={
    'Content-Type':'application/json'
}
const token=localStorage.getItem('token')
export const authHeader={
    'Content-Type':'application/json',   
 'auth-token':JSON.parse(token)
}