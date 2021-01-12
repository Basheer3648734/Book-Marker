import {firestore} from '../firebase'
import firebase from 'firebase'
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

(async ()=>{
   await firestore.collection("books").doc(state.user.uid).update({"books":firebase.firestore.FieldValue.arrayUnion({...action.payload})})
})()
 return {
        ...state,
        books:[...state.books,action.payload]
    }
}

export const editBook=(state,action)=>{
(async ()=>{
await removeBook(state,action)
await addBook(state,action)
})()
    return {
        ...state,
    }
}

export const removeBook=(state,action)=>{
    const temp=async ()=>{
try{
    const t=state.books.find(b=>b.id===action.id);
        await firestore.collection("books").doc(state.user.uid).update({"books":firebase.firestore.FieldValue.arrayRemove(t)})
      
    }
        catch(e){
            console.error(e)
        }
    }
    temp()
    return {
        ...state
    }
}

export const addFetchedBooks=(state,action)=>{
  
    return {
        ...state,
        books:[...action.payload]
    }
}