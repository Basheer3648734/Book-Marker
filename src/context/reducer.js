import {ADD_USER,ADD_BOOK,EDIT_BOOK,REMOVE_USER} from './actionType'
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
            case ADD_USER:
                return {
                    ...state,
                    isLoggedIn:true,
                    user:action.payload
                }
            case ADD_BOOK:
                return {
                    ...state,
                    books:[...state.books,action.payload]
                }
            case EDIT_BOOK:
                return {
                    ...state,
                    books:action.payload
                }
           case REMOVE_USER:
               return {
                   ...state,
                   user:{},
                   isLoggedIn:false,
                   books:[]
               }
            default:
                return state
        }
    }