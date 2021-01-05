import React,{useEffect} from 'react'
import {useDataLayer} from '../../context/context'
import {useHistory} from 'react-router-dom'
import {auth} from '../../firebase'
import Form from '../Form/form'
import List from '../List/List' 
import {addUser} from '../../context/action'
function Home() {
    const history=useHistory()
    const [state,dispatch]=useDataLayer()
    useEffect( () => {
        // const unsubscribe= auth.onAuthStateChanged(result=>{
        // if(result)
        //   dispatch(addUser(result))
        //  else
        //  history.replace("/login")

        // })
        if(!state.isLoggedIn){
            history.replace("/login")
        }
        // return unsubscribe;
      }, [state.isLoggedIn])
    return (
        <div className="container w-11/12 md:w-10/12 lg:w-8/12 mx-auto text-gray-900 font-serif dark:text-gray-100">
            <div className="mt-5">
        <h1 className="font-bold text-3xl text-center mb-3">Books</h1>
        <ul>
            {state.books.length===0?<p className="text-lg py-2 text-gray-500 text-center">No books added!</p>:null}
            {state.books.map(({title,author,imageURL,lastRead,totalPages})=>{
                return (
                    <List key={title} title={title} author={author} imageURL={imageURL} lastRead={lastRead} completedPercentage={((lastRead/totalPages)*100)}/>
                )
            })}
        </ul>
        </div>
        <div className="my-4">
        <h1 className="font-bold text-3xl text-center mb-5">Add new book</h1>
        <Form/>
        </div>
        </div>
    )
}

export default Home
