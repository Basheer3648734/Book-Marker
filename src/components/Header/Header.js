import React,{useState,useRef,useEffect} from 'react'
import {useDataLayer} from '../../context/context'
import {auth} from '../../firebase'
import {removeUser} from '../../context/action'
import SunIcon from '../icons/sun'
import MoonIcon from '../icons/Moon'
function Header() {
    const [state,dispatch]=useDataLayer()
    const [showMenu,setShowMenu]=useState(false);
    const themeSwitcher=useRef(document.querySelector("html"))
    const [theme,setTheme]=useState(JSON.parse(localStorage.getItem("theme")));
    useEffect(()=>{
      if(theme==="dark"){
        themeSwitcher.current.classList.add("dark");
      }
      else if( theme==="light" ){
        themeSwitcher.current.classList.remove("dark");
      }
    },[theme])
    const logoutHandler=async (e)=>{
      await auth.signOut();
      dispatch(removeUser())
      setShowMenu(false)
    }
const switchThemeHandler=(e)=>{
if(JSON.parse(localStorage.getItem("theme"))=="dark" ){
localStorage.setItem("theme",JSON.stringify("light"));
setTheme("light")
}
else if( JSON.parse(localStorage.getItem("theme"))=="light" ){
localStorage.setItem("theme",JSON.stringify("dark"));
setTheme("dark")
}
}


    const userProfileIcon=(           
        <div class="ml-3 relative float-right">
        <div>
          <button class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true" onClick={e=>setShowMenu(preState=>!preState)}>
            <span class="sr-only">Open user menu</span>
            <img class="h-10 w-10 rounded-full" src={state.user.photoURL} alt={state.user.displayName}/>
          </button>
        </div>
       {showMenu?
        <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5  dark:bg-gray-600 " >
          <button class="text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-100" >Your Profile</button>

          <button  class="text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-100" >Settings</button>

          <button  class=" text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-100" onClick={logoutHandler}>Sign out</button>
        </div>:null}
      </div>
   
)
    return (
        <div className="container dark:bg-gray-800  w-11/12 lg:w-10/12 mx-auto flex justify-between mt-8 ">
            <h1 className="font-bold sm:text-xl md:text-2xl tracking-normal font-serif dark:text-gray-100 pointer" >BookMarker</h1>
            <div>
            <button onClick={switchThemeHandler} className="border-2 float-left mr-5 border-gray-800 w-10 rounded-sm p-1  focus:outline-none dark:border-gray-100">{theme==="light"?(<SunIcon/>):(<MoonIcon/>)}</button>
            {state.isLoggedIn?userProfileIcon:null}
            </div>
        </div>
    )
}

export default Header
