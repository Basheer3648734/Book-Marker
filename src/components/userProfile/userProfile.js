import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDataLayer} from '../../context/context'
import {auth} from '../../firebase'
function UserProfile() {
    const [state,dispatch]=useDataLayer()
    const [name,setName]=useState(state.user.displayName)
    const [file,setFile]=useState(null)
    const history=useHistory()
    useEffect(()=>{
        if(!state.isLoggedIn)
       return history.replace("/login")
    },[state.isLoggedIn])
useEffect(()=>{
console.log(state.user)
},[])

//profile updater handler
const profileUpdateHandler=async (e)=>{
e.preventDefault();
if(name ){
    await auth.currentUser.updateProfile({displayName:name})
    console.log(file)
}
}
    return (
        <div>
            <h1>Your Profile</h1>
            <img src={state.user.photoURL} alt={state.user.displayName}/>
            <form onSubmit={profileUpdateHandler}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" required minLength="4" id="name" value={name} onChange={e=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text"  id="email" value={state.user.email} disabled/>
                </div>
                <div>
                    <label htmlFor="emailVerified">Email Verified</label>
                    <input type="text"  id="emailVerified" value={state.user.emailVerified} disabled/>
                </div>
                <div>
                    <label htmlFor="Image">Profile Picture</label>
                    <input type="file"  id="Image"  onChange={e=>setFile(e.target.files[0])}/>
                </div>
               
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default UserProfile
