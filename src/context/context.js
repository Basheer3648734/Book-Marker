import React,{useContext,useReducer} from 'react'
import {initialState,reducer} from './reducer'

const dataLayer=React.createContext();


export const ContextProvider=({children})=>{
    const value=useReducer(reducer,initialState)
    return (
        <dataLayer.Provider value={value}>
            {children}
        </dataLayer.Provider>
    )
}

export const useDataLayer=()=>useContext(dataLayer)