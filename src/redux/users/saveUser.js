const saveUser = (user)=>{
    //console.log(user)
    const state={auth:true,
        more:user,
        error:'' }
    localStorage.setItem('state',JSON.stringify(state))
    
}
const getUser =()=>{
   return localStorage.getItem('state') 
}

const getUserName =()=>{
  const userObj= JSON.parse(localStorage.getItem('state') )
   return userObj.more.user.name
 }

    export {saveUser,getUser,getUserName}