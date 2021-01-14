import {ERROR,LOADING,ADD_USER,ADD_BOOK,EDIT_BOOK,REMOVE_USER,REMOVE_BOOK,ADD_FETCHED_BOOKS,REMOVE_ALL_BOOK,DELETE_USER_PERMANENTLY} from './actionType'
export function addFetchedBooks(payload){
    return {
        type:ADD_FETCHED_BOOKS,
        payload
    }
}
export function addUser(payload){
    return {
        type:ADD_USER,
        payload
    }
}

export function addBook(payload){
  
    return {
        type:ADD_BOOK,
        payload
    }
}
export function editBook(id,payload){
    return{
        type:EDIT_BOOK,
        id,
        payload
    }
}
export function removeUser(){
    return {
        type:REMOVE_USER
    }
}

export function removeBook(payload){
    return {
        type:REMOVE_BOOK,
        id:payload
    }
}

export function deleteAllBook(){
    return {
        type:REMOVE_ALL_BOOK
    }
}

export function deleteUserData(){
    return {
        type:DELETE_USER_PERMANENTLY
    }
}
export function loading(payload){
return {
        type:LOADING,
        payload
    }
}

export const changeError=(payload)=>{
    return {
        type:ERROR,
        payload
    }
}