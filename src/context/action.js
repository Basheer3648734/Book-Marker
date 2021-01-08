import {ADD_USER,ADD_BOOK,EDIT_BOOK,REMOVE_USER,REMOVE_BOOK} from './actionType'

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