import React,{useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
//user defined imports
import Login from './components/login/Login'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Setting from './components/setting/Setting'
import {auth} from  './firebase'
import {addUser} from './context/action'
import {useDataLayer} from './context/context'
import UserProfile from './components/userProfile/userProfile'
// /login => sign in with google
// / => main dashboard
// /user => user profile
function App() {
  const [,dispatch]=useDataLayer()
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("theme"))){
      localStorage.setItem("theme",JSON.stringify("light"))
    }
    let unsubscribe;
  (async ()=>{
    unsubscribe=await auth.onAuthStateChanged(async result=>{
       if(result)
      return await dispatch(addUser(result))
     })
  })()
  return unsubscribe;
}, [dispatch])
  return (
    <>
    <Router >
      <Header/>
     
      <Switch>
       <Route path="/login"  component={Login}/>
        <Route path="/user" component={UserProfile}/>
        <Route path="/setting" component={Setting}/>
      <Route path="/" exact component={Home}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
