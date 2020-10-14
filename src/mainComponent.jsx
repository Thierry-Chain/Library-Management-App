import React,{useState} from 'react';
import NavBar from './components/navBar';
import FirstPage from './components';
import {Route,Switch} from 'react-router-dom'
import About from './components/about';
import Developers from './components/developer';
//import Login from './components/user/login';
import Register from './components/user/register';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Main from './components/Main';
import Login from './components/user/loginNew';
import NotFound from './components/noFound';

toast.configure()
const notify=(msg)=>{
  toast.success(msg , { position:toast.POSITION.BOTTOM_RIGHT } )
}



const MainComponent= ()=> {
    /*
    const login
     */
const [login, setLogin] = useState(false);
const [register, setRegister] = useState(false);
const toggleLogin = () => setLogin(!login); 
const toggleRegister = () => setRegister(!register);
    return (
        <React.Fragment>
            <div className="p-0 m-0">
        <section className="bg-navbar fixed-top"><NavBar login={toggleLogin} register={toggleRegister} /></section><br/>
       <Switch>
<Route exact path="/" login={toggleLogin} component={ 
    ()=> <FirstPage login={toggleLogin} register={toggleRegister} /> } />
           <Route  path="/about" component={About} />
           <Route  path="/developers" component={Developers} />
           <Route  path="/loggedIn" component={Main} />
           <Route path="/" component={NotFound} />
       </Switch>
       </div>
       <Login login={login} onToggle={toggleLogin} />
       <Register register={register} onToggle={toggleRegister} notify={notify} />
        </React.Fragment>
    )
}

export default MainComponent

