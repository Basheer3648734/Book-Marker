import {ERROR,LOADING,ADD_USER,ADD_BOOK,EDIT_BOOK,REMOVE_USER,REMOVE_BOOK, ADD_FETCHED_BOOKS,REMOVE_ALL_BOOK,DELETE_USER_PERMANENTLY} from './actionType'
import {changeError,setLoading,addUser,removeUser,addBook,removeBook,editBook,addFetchedBooks,removeAllBook,deleteUserData} from './helper'
export const initialState={
    user:{},
    isLoggedIn:false,
    books:[],
    loading:false,
    error:null
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
            case ADD_FETCHED_BOOKS:
                return addFetchedBooks(state,action)
            case REMOVE_ALL_BOOK:
                return removeAllBook(state,action)
            case DELETE_USER_PERMANENTLY:
                return deleteUserData(state,action)
            case LOADING:
                return setLoading(state,action);
            case ERROR:
                return changeError(state,action)
            default:
                return state
        }
    }