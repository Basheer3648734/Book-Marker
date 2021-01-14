import React,{useEffect,Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
//user defined imports
import Login from './components/login/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/footer/footer'
import {auth} from  './firebase';
import {addUser, loading,changeError} from './context/action';
import {useDataLayer} from './context/context';
import Modal from './components/Modal/Modal';
import Loader from './components/loader/Loader'
const Setting=React.lazy(()=> import("./components/setting/Setting.js")) ;
const UserProfile=React.lazy(()=> import("./components/userProfile/userProfile.js")) ;
// /login => sign in with google
// / => main dashboard
// /user => user profile
function App() {
  const [state,dispatch]=useDataLayer()
  
  useEffect(() => {
    try{
    if(!JSON.parse(localStorage.getItem("theme"))){
      localStorage.setItem("theme",JSON.stringify("light"))
    }
  }
  catch(e){
    dispatch(changeError("error reading the theme"))
  }
    let unsubscribe;
try{
  (async ()=>{
    unsubscribe=await auth.onAuthStateChanged(async result=>{
      dispatch(loading(false)) 
      if(result){
      return await dispatch(addUser(result))
       }
     },(error)=>{
       dispatch(changeError(error.message))
     })
  })()
}catch(e){
  dispatch(changeError(e.message))
}
  return unsubscribe;
}, [dispatch])
  return (
    <>

   {state.error &&( <Modal>
      <div className="p-4 font-serif text-black bg-white z-50 opacity-100 fixed w-11/12 md:w-6/12 lg:w-5/12 top-2/4 left-2/4 transform -translate-x-2/4	 -translate-y-2/4	">
        <p className="text-center text-red-700">{state.error}</p>
        <div className="flex justify-center mt-3">

        <button className="bg-gray-700 text-white p-1 w-2/12 my-2 " onClick={e=>dispatch(changeError(null))}>OK</button>
        </div>
      </div>
    </Modal>)}
    <Router >
      <Header/>
      <div className="flex flex-col h-screen justify-between pb-5">
      <Switch>
       <Route path="/login"  component={Login}/>
        <Route path="/user">
        <Suspense fallback={<Loader/>}>
          <UserProfile/>
        </Suspense>
        </Route>
        <Route path="/setting" >
          <Suspense fallback={<Loader/>}>
            <Setting/>
          </Suspense>
        </Route>
      <Route path="/" exact component={Home}/>
      </Switch>

      
      <Footer/>
   </div>
    </Router>
    </>
  );
}

export default App;
