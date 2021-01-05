import {ADD_USER,ADD_BOOK,EDIT_BOOK,REMOVE_USER} from './actionType'

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
export function editBook(payload){
    return{
        type:EDIT_BOOK,
        payload
    }
}
export function removeUser(){
    return {
        type:REMOVE_USER
    }
}