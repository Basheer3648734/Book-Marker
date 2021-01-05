import React,{useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
//user defined imports
import Login from './components/login/Login'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import {auth} from  './firebase'
import {addUser} from './context/action'
import {useDataLayer} from './context/context'
// /login => sign in with google
// / => main dashboard
function App() {
  const [state,dispatch]=useDataLayer()
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("theme"))){
      localStorage.setItem("theme",JSON.stringify("light"))
    }
  const unsubscribe=auth.onAuthStateChanged(result=>{
    if(result)
    dispatch(addUser(result))
  })
  return unsubscribe;
}, [])
  return (
    <>
      <Header/>
    <Router >
     
      <Switch>
      <Route path="/" exact component={Home}/>
       <Route path="/login"  component={Login}/>
        
      </Switch>
    </Router>
    </>
  );
}

export default App;
