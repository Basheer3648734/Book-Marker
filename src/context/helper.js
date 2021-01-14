import { firestore,storage,auth } from '../firebase'
import firebase from 'firebase'
// import {v4 as uuiv4} from 'uuid'
export const addUser = (state, action) => {
    return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading:false,
        error:null
    }
}

export const removeUser = (state, action) => {
    return {
        ...state,
        user: {},
        isLoggedIn: false,
        books: [],
        loading:false,
        error:null

    }
}

export const addBook = (state, action) => {
try{
    (async () => {
        const userexists = (await firestore.collection("books").doc(state.user.uid).get()).exists
        if (!userexists)
            await firestore.collection("books").doc(state.user.uid).set({ "books": firebase.firestore.FieldValue.arrayUnion({ ...action.payload }) })
        else
            await firestore.collection("books").doc(state.user.uid).update({ "books": firebase.firestore.FieldValue.arrayUnion({ ...action.payload }) })

    })()
}
catch(e){
    return {
        ...state,
        error:e.message
    }
}
    return {
        ...state,
        books: [...state.books, action.payload],
        loading:false,
        error:null

    }
}

export const editBook = (state, action) => {
    try{
    (async () => {
        await removeBook(state, action)
        await addBook(state, action)
    })()
    }
    catch(e){
        return {
            ...state,
            error:e.message
        }
    }
    return {
        ...state,
        loading:false,
        error:null

    }
}

export const removeBook = (state, action) => {
    try{
    (async () => {
       
            const t = state.books.find(b => b.id === action.id);
            await firestore.collection("books").doc(state.user.uid).update({ "books": firebase.firestore.FieldValue.arrayRemove(t) })

    })()
    }
    catch(e){
        return {
            ...state,
            error:e.message
        }
    }
    return {
        ...state,
        loading:false,
        error:null

    }
}

export const addFetchedBooks = (state, action) => {

    return {
        ...state,
        books: [...action.payload],
        loading:false,
        error:null

    }
}

export const removeAllBook = (state, action) => {
    try{
        firestore.collection("books").doc(state.user.uid).delete()
    }
    catch(e){
        return {
            ...state,
            error:e.message
        }
    }
    return {
        ...state,
        loading:false,
        error:null

    }
}

export const deleteUserData = (state, action) => {
    (async()=>{
        try{
            await auth.signOut()
        await firestore.collection("books").doc(state.user.uid).delete().catch(e=>{
            return {
                ...state,
                error:e.message
            }
        })
        const storageExist=await storage.ref().child(`images/userProfile/${state.user.uid}`).listAll()
        
        if(storageExist && storageExist.items.length!==0)
        await storage.ref().child(`images/userProfile/${state.user.uid}`).delete().catch(e=>{
            return {
                ...state,
                error:e.message
            }
        })
        await auth.currentUser.delete().catch(e=>{
            return {
                ...state,
                error:e.message
            }
        })

    }catch(e){
        return {
            ...state,
            error:e.message
        }
    }
    })()
    return {
        ...state,
        user: {},
        books: [],
        isLoggedIn: false,
        loading:false,
        error:null

    }
}

export const setLoading=(state,action)=>{
    return {
        ...state,
        loading:action.payload
    }
}
export const changeError=(state,action)=>{
    return {
        ...state,
        loading:false,
        error:action.payload
    }
}