import React,{useEffect,useState,useRef} from 'react'
import {useHistory} from 'react-router-dom'
import { loading ,changeError} from '../../context/action'
import {useDataLayer} from '../../context/context'
import {auth,storage} from '../../firebase'

import UploadIcon from '../icons/UploadIcon'

function UserProfile() {
    const [state,dispatch]=useDataLayer()
    const [name,setName]=useState(state.user.displayName)
    const [file,setFile]=useState(null)
    const imageRef=useRef(null);
    const fileRef=useRef(null)
    const history=useHistory()
    useEffect(()=>{
        if(!state.isLoggedIn)
       return history.replace("/login")
    },[state.isLoggedIn,history])


//profile updater handler
const profileUpdateHandler=async (e)=>{
    e.preventDefault();
    try{
    dispatch(loading(true))
    if(file){
        const metadata={
        contentType:'image/jpeg'
    }
    const storageRef=storage.ref()
    const uploadTask=storageRef.child(`images/userProfile/${state.user.uid}`).put(file,metadata)
    
    uploadTask.on('state_changed',(snapshot)=>{
        
    },(error)=>{
        console.log(error)
    },async ()=>{
        await uploadTask.snapshot.ref.getDownloadURL().then(async url=>{
        await auth.currentUser.updateProfile({photoURL:url})
        imageRef.current.src=url
        fileRef.current.value=null
        dispatch(loading(false))

    })
    })
    }
    if(name){
        await auth.currentUser.updateProfile({displayName:name})
        
    }
    }
    catch(err){
    dispatch(changeError(err.message))
    }
}
    return (
        <div className="container w-11/12 md:w-8/12 lg:w-4/12 overflow-hidden  mx-auto mt-12 font-serif">
            <h1 className="text-4xl md:text-4xl text-3xl font-bold text-center tracking-normal underline mb-8">Your Profile</h1>
            <img ref={imageRef} className="border-2 dark:border-white border-black mx-auto rounded-full h-28 w-28 object-contain" src={state.user.photoURL} alt={state.user.displayName}/>
            <form onSubmit={profileUpdateHandler} className="mt-5 w-full">
                <div className="flex justify-between items-center py-3">
                    <label htmlFor="name" className="text-lg md:text-xl text-left  font-medium w-5/12">Name</label>
                    <input className="w-7/12 p-1 px-3 dark:bg-gray-600 border border-black dark:border-none " type="text" required minLength="4" id="name" value={name} onChange={e=>setName(e.target.value)}/>
                </div>
                <div className="flex justify-between items-center py-3">
                    <label htmlFor="email" className="w-5/12 text-lg md:text-xl font-medium ">Email</label>
                    <input className="w-7/12 p-1 px-3 dark:bg-gray-600 opacity-50 cursor-not-allowed border border-black dark:border-none" type="text"  id="email" value={state.user.email} disabled={true}/>
                </div>
                <div className="flex justify-between items-center py-3">
                    <label htmlFor="emailVerified" className="w-5/12 text-lg md:text-xl font-medium">Email Verified</label>
                    <input className="w-7/12 p-1 px-3 dark:bg-gray-600 opacity-50 cursor-not-allowed border border-black dark:border-none" type="text"  id="emailVerified" value={state.user.emailVerified} disabled/>
                </div>
                <div className="flex justify-between items-center py-3">
                    <label htmlFor="Image" className="w-5/12 text-lg md:text-xl font-medium">Profile Picture</label>
                   <div className="relative w-7/12 p-2 px-3 bg-purple-700 text-center cursor-pointer">
                       <div className="flex items-center justify-center cursor-pointer">
                       <UploadIcon/>
                       <span className="mx-1 cursor-pointer text-white">Upload Image</span>
                       </div>
                    <input ref={fileRef}  type="file"  id="Image"  onChange={e=>setFile(e.target.files[0])} className="cursor-pointer opacity-0 absolute left-0 top-0"/>
                   </div>
                </div>
               <div className="flex mt-5">
                <button type="submit" className="border-2 border-green-500 text-green-500 p-1 w-3/12 md:w-2/12 mx-auto rounded-sm ">Save</button>
               </div>
            </form>
        </div>
    )
}

export default UserProfile
