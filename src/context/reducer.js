import {ADD_USER,ADD_BOOK,EDIT_BOOK,REMOVE_USER,REMOVE_BOOK} from './actionType'
import {addUser,removeUser,addBook,removeBook,editBook} from './helper'
export const initialState={
    user:{},
    isLoggedIn:false,
    books:[]
    }
/*
user structure=> displayName, email, userId, photoURL
book structure=> title, author, imageURL, lastRead, totalPages
*/ 
export const reducer=(state,action)=>{
        switch(action.type){
            case ADD_USER://signin
               return addUser(state,action)
            case REMOVE_USER: //signout 
               return removeUser(state,action)
            case ADD_BOOK:
                return addBook(state,action)
            case EDIT_BOOK:
                return editBook(state,action)
            case REMOVE_BOOK:
                return removeBook(state,action)
            default:
                return state
        }
    }