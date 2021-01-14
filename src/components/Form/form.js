import React, { useState } from 'react'
import { useDataLayer } from '../../context/context'
import { addBook, loading } from '../../context/action'
import {v4 as uuidv4} from 'uuid'
const Form = ({setShowAddForm  }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [lastRead, setLastRead] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)
    const [state, dispatch] = useDataLayer()


    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(loading(true))
        if (title.length === 0 || author.length === 0)
            return setError("The fields cannot be empty")
        if (state.books.includes(book => book.title.toLowerCase() === title.toLowerCase()) || state.books.includes(book => book.author.toLowerCase() === author.toLowerCase())) {
            return setError("Book already exist")
        }
        if (+totalPages === 0) {
            return setError("Total Pages cannot be 0.")

        }
        if (window.matchMedia('(max-device-width: 768px)').matches) 
        setShowAddForm()
        dispatch(addBook({id:uuidv4(), title: title.trim(), author: author.trim(), imageURL: imageURL.trim(), lastRead: (+lastRead), totalPages: (+totalPages),completed: +totalPages=== +lastRead  }))
        setTitle("")
        setAuthor("")
        setImageURL("")
        setLastRead(0)
        setTotalPages(0)
        setError(null)
    }
    return (
        <form onSubmit={onSubmitHandler} className="w-full  md:w-10/12 lg:w-7/12 mx-auto flex flex-col ">
            {error ? <p className="w-full bg-red-300 py-2 text-center text-red-700 border border-red-700 text-md md:text-lg mb-3">{error}</p> : null}
            <div className="py-2 flex justify-between">
                <label htmlFor="title" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700 w-5/12">Title</label>
                <input type="text" id="title" value={title} className="dark:bg-gray-700 dark:border-0 dark:text-gray-300 focus:outline-none  border rounded-sm border-gray-900 border-solid w-7/12 px-2" required onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="py-2 flex justify-between">
                <label htmlFor="author" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700 w-5/12">Author</label>
                <input type="text" id="author" value={author} required onChange={e => setAuthor(e.target.value)} className="dark:bg-gray-700 dark:border-0 dark:text-gray-300 focus:outline-none border rounded-sm border-gray-900 border-solid w-7/12 px-2" />
            </div>
            <div className="py-2 flex justify-between">
                <label htmlFor="imageURL" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700  w-5/12">Thumbnail URL</label>
                <input type="url" id="imageURL" value={imageURL} onChange={e => setImageURL(e.target.value)} className="border rounded-sm border-gray-900 border-solid w-7/12 px-2 dark:bg-gray-700 dark:border-0 dark:text-gray-300 focus:outline-none" />
            </div>
            <div className="py-2 flex justify-between">
                <label htmlFor="totalPages" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700  w-5/12">Total Pages</label>
                <input type="number" id="totalPages" required value={totalPages} onChange={e => setTotalPages(e.target.value)} className="border rounded-sm border-gray-900 border-solid w-7/12 px-2 dark:bg-gray-700 dark:border-0 dark:text-gray-300 focus:outline-none" />
            </div>
            <div className="py-2 flex justify-between">
                <label htmlFor="lastRead" className="dark:text-gray-100 font-medium text-md md:text-lg text-gray-700">Last Read</label>
                <input type="number" id="Last Read" required value={lastRead} onChange={e => setLastRead(e.target.value)} className="border rounded-sm border-gray-900 border-solid w-7/12 px-2 dark:bg-gray-700 dark:border-0 dark:text-gray-300 focus:outline-none" />
            </div>
            <div className="flex justify-end">
                <button type="submit"  className="bg-blue-700 w-3/12  md:w-2/12 text-sm  md:mx-auto p-2 text-white rounded-sm mt-4">Submit</button>
                <button type="button" className="border border-red-700 text-red-700 p-2 w-3/12 text-sm rounded-sm mt-4 ml-3 md:hidden" onClick={setShowAddForm} >cancel</button>
            </div>
        </form>

    )
}

export default Form