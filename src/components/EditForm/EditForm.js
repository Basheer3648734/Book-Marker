import React,{useState} from 'react'
import {useDataLayer} from '../../context/context'
import {editBook} from '../../context/action'
import Modal from '../Modal/Modal'
function EditForm({id,hideForm}) {
    
const [state,dispatch]=useDataLayer()
const book=state.books.find(b=>b.title===id)
const [title,setTitle]=useState(book.title)
const [author,setAuthor]=useState(book.author)
const [imageURL,setImageURL]=useState(book.imageURL)
const [lastRead,setLastRead]=useState(book.lastRead)
const [totalPages,setTotalPages]=useState(book.totalPages)
const [error,setError]=useState(null)
const onSubmitHandler=(e)=>{
    e.preventDefault()
    if(title.length===0|| author.length===0 )
    return setError("The fields cannot be empty")
    if(+totalPages===0){
        return setError("Total Pages cannot be 0.")

    }
    const newBook={title:title.trim(),author:author.trim(),imageURL:imageURL.trim(),lastRead:(+lastRead),totalPages:(+totalPages)}
    dispatch(editBook(id,newBook))
   hideForm()
}
    return (

  <Modal>
      <div className="dark:bg-gray-800 z-50 pointer-events-auto bg-white w-full md:w-10/12 text-gray-900 absolute top-1/4 md:left-14 opacity-100 p-5">
        <h1 className="font-bold text-center text-xl mb-2 dark:text-gray-100">Edit Form</h1>
      <form onSubmit={onSubmitHandler} className="w-full md:w-10/12 lg:w-7/12 mx-auto flex flex-col ">
     {error?<p className="w-full bg-red-300 py-2 text-center text-red-700 border border-red-700 text-md md:text-lg mb-3">{error}</p>:null}
 <div className="py-2 flex justify-between">
     <label htmlFor="title" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700 w-5/12">Title</label>
     <input type="text" id="title" value={title} className="dark:bg-gray-700 dark:border-0 dark:text-gray-200 border rounded-sm border-gray-900 border-solid w-7/12 px-2" required onChange={e=>setTitle(e.target.value)}/>
 </div>
 <div className="py-2 flex justify-between">
     <label htmlFor="author" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700 w-5/12">Author</label>
     <input type="text" id="author"  value={author} required onChange={e=>setAuthor(e.target.value)} className="dark:bg-gray-700 dark:border-0 dark:text-gray-200 border rounded-sm border-gray-900 border-solid w-7/12 px-2"/>
 </div>
 <div className="py-2 flex justify-between">
     <label htmlFor="imageURL" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700  w-5/12">Thumbnail URL</label>
     <input type="url" id="imageURL"  value={imageURL} onChange={e=>setImageURL(e.target.value)} className="dark:bg-gray-700 dark:border-0 dark:text-gray-200 border rounded-sm border-gray-900 border-solid w-7/12 px-2"/>
 </div>
 <div className="py-2 flex justify-between">
     <label htmlFor="totalPages" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700  w-5/12">Total Pages</label>
     <input type="number" id="totalPages" required  value={totalPages} onChange={e=>setTotalPages(e.target.value)} className="dark:bg-gray-700 dark:border-0 dark:text-gray-200 border rounded-sm border-gray-900 border-solid w-7/12 px-2"/>
 </div>
 <div className="py-2 flex justify-between">
 
     <label htmlFor="lastRead" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700">Last Read</label>
     <input type="number" id="Last Read" required value={lastRead} onChange={e=>setLastRead(e.target.value)} className="dark:bg-gray-700 dark:border-0 dark:text-gray-200 border rounded-sm border-gray-900 border-solid w-7/12 px-2"/>
    
 </div>
 <div >
<button onClick={hideForm} type="button" className="dark:border-red-400 dark:text-red-400 float-right border border-red-700 text-red-700 md:w-2/12 w-3/12 text-sm  mx- p-2 text-white rounded-sm mt-4">Cancel</button>
 <button type="submit" className="float-right bg-blue-700 md:w-2/12 w-3/12 text-sm  mx-5 p-2 text-white rounded-sm mt-4 border boder-transparent">Submit</button>
 </div>
 </form>
      </div>
  </Modal>
    )
}

export default EditForm
