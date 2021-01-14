import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDataLayer} from '../../context/context'
import {deleteAllBook,deleteUserData, loading,changeError} from '../../context/action'
import TrashBin from '../icons/TrashBin'
import Modal from '../Modal/Modal'
function Setting() {
    const [state,dispatch]=useDataLayer()
    const history=useHistory()
    const [showDeleteData,setShowDeleteData]=useState(false)
    const [showDeleteUser,setShowDeleteUser]=useState(false)
    useEffect(()=>{
        (async ()=>{
            const loggedIn=await state.isLoggedIn;
            if(!loggedIn)
            return history.replace("/login")
        })()
       
    },[state.isLoggedIn,history])
    const deleteDataHandler=(e)=>{
        try{
        dispatch(loading(true))
        dispatch(deleteAllBook());
       setShowDeleteData(false)
        }
        catch(e){
            dispatch(changeError(e.message))
        }
    }
    const deleteUserDataHandler=(e)=>{
        try{
        dispatch(loading(true))
        dispatch(deleteUserData())
       setShowDeleteUser(false)
        history.replace("/login")
        }catch(e){
            dispatch(changeError(e.message))
        }
    }
    return (
        <div className="font-serif w-11/12 md:w-8/12 lg:w-6/12 mx-auto my-10">
            <h1 className="text-3xl font-bold text-center mb-5">Settings</h1>
            <div className="flex flex-col">

            <button onClick={e=>setShowDeleteData(true)} className="my-3 md:w-6/12 rounded-sm  text-lg border-2 border-red-500 w-9/12 mx-auto flex items-center justify-center p-2 text-red-500"><TrashBin/><span className="mx-3"> Delete All Data</span></button>
            <button onClick={e=>setShowDeleteUser(true)}className="my-3 md:w-6/12 rounded-sm text-lg border-2 border-red-500 w-9/12 mx-auto flex items-center justify-center p-2 text-red-500"><TrashBin/><span className="mx-3"> Delete My Account</span></button>
            </div>
            {showDeleteData&&(<Modal>
                <div className=" w-10/12 bg-white z-50 absolute rounded top-2/4 left-2/4 md:w-6/12 lg:w-4/12 transform -translate-x-1/2 -translate-y-1/2	">
                    <p className="text-black p-3 text-xl md:text-lg font-medium">
                    Are sure you want to clear your data?
                    </p>
                    <div className="flex justify-end p-3 ">
                    <button className="text-gray-500 mx-5  w-3/12 md:w-2/12 border-2 border-gray-500" onClick={(e)=>setShowDeleteData(false)}>No</button>
                    <button className="text-red-500 w-3/12 md:w-2/12 border-2 border-red-500 " onClick={deleteDataHandler}>Yes</button>
                    </div>
                </div>
            </Modal>)}

            {showDeleteUser&&(<Modal>
                <div className="w-10/12 bg-white z-50 absolute rounded top-2/4 left-2/4 md:w-6/12 transform -translate-x-1/2 -translate-y-1/2	">
                <p className="text-black p-3 text-xl md:text-lg font-medium">
                    By deleting your account, all the data related to user will be deleted and you will not be able to revive back the account data ? 
                <span className="block text-sm"><b className="text-red-500">Note: </b> Reload the page after 5 minutes?</span>
                    </p>
                    <div className="flex justify-end p-3 ">
                    <button className="text-gray-500 mx-5  w-3/12 md:w-2/12 border-2 border-gray-500" onClick={()=>setShowDeleteUser(false)}>No</button>
                    <button className="text-red-500  w-3/12 md:w-2/12 border-2 border-red-500 " onClick={deleteUserDataHandler}>Yes</button>
                    </div>
                </div>
            </Modal>)}
        </div>
    )
}

export default Setting
