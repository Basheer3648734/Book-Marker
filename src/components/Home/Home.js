import React,{useEffect,useState} from 'react'
import {useDataLayer} from '../../context/context'
import {useHistory} from 'react-router-dom'
import Form from '../Form/form'
import List from '../List/List' 
import Modal from '../Modal/Modal'
import {firestore} from '../../firebase'
import {addFetchedBooks,loading,changeError} from '../../context/action'
function Home() {
    const history=useHistory()
    let [state,dispatch]=useDataLayer()
    const [showAddForm,setShowAddForm]=useState(false)
    useEffect(  () => {
       (async ()=>{
        if(!state.isLoggedIn){
            dispatch(loading(true))
           await history.replace("/login")
         }
       })()
      
        // return unsubscribe;
      }, [state.isLoggedIn,dispatch,history])
    useEffect(() => {
        try{
    if(state.isLoggedIn){
       dispatch(loading(true))
        firestore.collection("books").doc(state.user.uid).onSnapshot(snapShot=>{
         if( snapShot.data()!==undefined ){
         const books=snapShot.data();
         if(books.books)
         dispatch(addFetchedBooks(books.books))
         else
         dispatch(addFetchedBooks([]))
         }
        
        })
        dispatch(loading(false))
           }
        }
        catch(e){
            dispatch(changeError(e.message))
        }
           return ()=>{
               dispatch(addFetchedBooks([]))//needed to be corrected
           }
}, [dispatch,state.isLoggedIn,state.user.uid])
 
    return (
<>
{state.isLoggedIn&&(
        <div className="container z-0 w-11/12 md:w-10/12 lg:w-8/12 mx-auto text-gray-900 font-serif dark:text-gray-100">
            
            <div className="mt-5">
        <h1 className="font-bold text-3xl text-center mb-3">Books</h1>
        <ul>
            {state.books.length===0?<p className="text-lg py-2 text-gray-500 text-center">No books added!</p>:null}
            {state.books.map(({id,title,author,imageURL,lastRead,totalPages})=>{
                return (
                    <List key={id} id={id} title={title} author={author} imageURL={imageURL} lastRead={lastRead} completedPercentage={((lastRead/totalPages)*100).toFixed(0)}/>
                )
            })}
        </ul>
        </div>
        <div className="my-4 hidden md:block">
        <h1 className="font-bold text-3xl text-center mb-5">Add new book</h1>
        <Form/>
        </div>
        <button className="md:hidden focus:outline-none bg-yellow-500 p-2 rounded-full w-14 h-14 text-2xl shadow fixed right-8 bottom-10 z-0 md:z-30" onClick={()=>setShowAddForm(true)}>+</button>
        {showAddForm&&(<Modal>
            <div className="md:hidden bg-white dark:bg-gray-800 z-50  absolute w-full top-1/4 p-3 ">
                <div>
                <h1 className="text-xl font-bold text-center mb-3">Add Book</h1>
                {/* <button className="relative left-3/4 border border-white	">X</button> */}
                </div>
                <Form setShowAddForm={e=>setShowAddForm(false)}/>
            </div>
        </Modal >)}
        </div>
    
    )}
</>
    )
}

export default Home
