// import {firestore} from '../firebase'
// import firebase from 'firebase'
// import {v4 as uuiv4} from 'uuid'
export const addUser=(state,action)=>{
    return {
        ...state,
        isLoggedIn:true,
        user:action.payload
    }
}

export const removeUser=(state,action)=>{
    return {
        ...state,
        user:{},
        isLoggedIn:false,
        books:[]
    }
}

export const addBook=(state,action)=>{
// const data=action.payload
// data['createdBy']=
console.log(state.user)
//   await firestore.collection("books").doc(uuiv4()).set(data)
 return {
        ...state,
        books:[...state.books,action.payload]
    }
}

export const editBook=(state,action)=>{
    const bookIndex=state.books.findIndex(b=>b.title===action.id)
    const books=[...state.books]
    books.splice(bookIndex,1,action.payload)
    return {
        ...state,
        books
    }
}

export const removeBook=(state,action)=>{
    // firestore.collection("users").doc(state.user.uid).add({books:firebase.firestore.FieldValue.arrayRemove({title:action.id})})
    const books=state.books.filter(b=>b.title!==action.id)
    return {
        ...state,
        books
    }
}

