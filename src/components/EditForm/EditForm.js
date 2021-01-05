import React,{useState} from 'react'
import {useDataLayer} from '../../context/context'
import {editBook} from '../../context/action'
function EditForm({id,hideForm}) {
    
const [state,dispatch]=useDataLayer()
const bookIndex=state.books.find(b=>b.title===id)
const book=state.books[bookIndex]
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
    if(state.books.includes(book=>book.title.toLowerCase()===title.toLowerCase())|| state.books.includes(book=>book.author.toLowerCase()===author.toLowerCase())){
        return setError("Book already exist")
    }
    if(+totalPages===0){
        return setError("Total Pages cannot be 0.")

    }
    const newBook={title:title.trim(),author:author.trim(),imageURL:imageURL.trim(),lastRead:(+lastRead),totalPages:(+totalPages)}
    const books=state.books.splice(bookIndex,1,newBook)
    dispatch(editBook(books))
   hideForm()
}
    return (
           <form onSubmit={onSubmitHandler} className="w-full md:w-10/12 lg:w-7/12 mx-auto flex flex-col ">
    {error?<p className="w-full bg-red-300 py-2 text-center text-red-700 border border-red-700 text-md md:text-lg mb-3">{error}</p>:null}
<div className="py-2 flex justify-between">
    <label htmlFor="title" className="font-medium text-md md:text-lg text-gray-700 w-5/12">Title</label>
    <input type="text" id="title" value={title} className="border rounded-sm border-gray-900 border-solid w-7/12 px-2" required onChange={e=>setTitle(e.target.value)}/>
</div>
<div className="py-2 flex justify-between">
    <label htmlFor="author" className="font-medium text-md md:text-lg text-gray-700 w-5/12">Author</label>
    <input type="text" id="author"  value={author} required onChange={e=>setAuthor(e.target.value)} className="border rounded-sm border-gray-900 border-solid w-7/12 px-2"/>
</div>
<div className="py-2 flex justify-between">
    <label htmlFor="imageURL" className="font-medium text-md md:text-lg text-gray-700  w-5/12">Thumbnail URL</label>
    <input type="url" id="imageURL"  value={imageURL} onChange={e=>setImageURL(e.target.value)} className="border rounded-sm border-gray-900 border-solid w-7/12 px-2"/>
</div>
<div className="py-2 flex justify-between">
    <label htmlFor="totalPages" className="font-medium text-md md:text-lg text-gray-700  w-5/12">Total Pages</label>
    <input type="number" id="totalPages" required  value={totalPages} onChange={e=>setTotalPages(e.target.value)} className="border rounded-sm border-gray-900 border-solid w-7/12 px-2"/>
</div>
<div className="py-2 flex justify-between">
    <label htmlFor="lastRead" className="font-medium text-md md:text-lg text-gray-700">Last Read</label>
    <input type="number" id="Last Read" required value={lastRead} onChange={e=>setLastRead(e.target.value)} className="border rounded-sm border-gray-900 border-solid w-7/12 px-2"/>
</div>
<button type="submit" className="bg-blue-700 w-2/12 text-sm  mx-auto p-2 text-white rounded-sm mt-4">Submit</button>
</form>
  
    )
}

export default EditForm
