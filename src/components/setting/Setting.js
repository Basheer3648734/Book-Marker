import React,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useDataLayer} from '../../context/context'

function Setting() {
    const [state,dispatch]=useDataLayer()
    const history=useHistory()
    useEffect(()=>{
        (async ()=>{
            const loggedIn=await state.isLoggedIn;
            if(!loggedIn)
            return history.replace("/login")
        })()
       
    },[state.isLoggedIn])
    return (
        <div>
            setting
        </div>
    )
}

export default Setting
