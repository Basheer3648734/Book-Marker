import React,{useEffect} from 'react'
import {useDataLayer} from '../../context/context'
import {auth,googleProvider} from '../../firebase'
import {useHistory} from 'react-router-dom'
import {loading,changeError} from '../../context/action'
function Login() {
    const history=useHistory()
    const [state,dispatch]=useDataLayer()
    useEffect( () => {
        (async ()=>{

            if(state.isLoggedIn){

                dispatch(loading(true))
            return await history.replace("/")
            }
            
        })()
    },[state.isLoggedIn,dispatch,history])
    const signInHandler=async (e)=>{
        try{
        dispatch(loading(true))
    await auth.signInWithPopup(googleProvider)
     history.replace("/")
     dispatch(loading(false));
        }catch(e){
            console.log(e)
            dispatch(changeError(e.message))
        }
    }
    return (
        <div className="container sm:w-11/12 md:w-10/12 lg:w-9/12 mx-auto mt-32 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
            <h1 className="font-bold text-3xl text-center  font-serif mb-5">Welcome to BookMark</h1>
            <p className="font-medium text-lg tracking-normal text-center mb-6">We are excited to have you here. We are dedicated to make your intriguing journey of books more fascinating. </p>
            <button onClick={signInHandler} className="flex bg-blue-800 text-white rounded-sm items-center justify-evenly font-medium tracking-normal mx-auto py-2 mt-12 w-6/12 md:w-4/12 lg:w-3/12  " ><img src="googleLogo.webp" alt="Google Icon" className="h-7 w-7 bg-white p-1  "/>Sign In with Google</button>
            <p className="text-center text-gray-500 text-xs mt-2 font-normal dark:text-gray-100">By signing in, You accept to our terms and conditions.</p>
        </div>
    )
}

export default Login
