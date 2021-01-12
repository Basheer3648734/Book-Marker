import React,{useState} from 'react'
import {useDataLayer} from '../../context/context'
import EditForm from '../EditForm/EditForm'
import TrashBinIcon from '../icons/TrashBin'
import {removeBook} from '../../context/action'
function List({id,title,author,imageURL,lastRead,completedPercentage}) {
    const defaultURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII="
    const [showOptions,setShowOptions]=useState(false)
    const [showEdit,setShowEdit]=useState(false)
    const [,dispatch] =useDataLayer()
    const deleteBook=(e)=>{
        dispatch(removeBook(id))
    }
    return (
        <li  className="dark:text-gray-100 dark:bg-gray-700 mx-auto  mb-5 shadow-md text-gray-900 w-full md:w-8/12 cursor-pointer truncate pr-1">
        <div onClick={e=>setShowOptions(prev=>!prev)} className=" flex justify-even  items-center leading-3">
        <img src={imageURL.length>0?imageURL:defaultURL} className="listThumbnail mr-3 object-contain " style={{width:"100px", height:"100px"}} alt={title}/>
        <div>
         <h2 className="capitalize font-semibold text-md md:text-lg mb-2 md:mb-0 overflow-ellipsis">{title}</h2>
         <p className="capitalize text-xs  md:text-sm mb-1 overflow-ellipsis ">{author}</p> 
         <p className="capitalize text-xs  md:text-sm inline-block float-left text-gray-700 dark:text-gray-100">Last Read: <span className="text-gray-600 dark:text-gray-200">{lastRead}</span></p>
         <p className="capitalize text-xs  md:text-sm inline-block float-right ml-5 text-gray-700 dark:text-gray-100"><span className="text-green-500">{completedPercentage}%</span> completed</p> 
         </div> 
         </div>
         {showOptions?(  <div  className="bg-gray-200 py-1.5 flex justify-end dark:bg-gray-500">
             <button  className="dark:text-red-800 dark:border-red-800 dark:hover:bg-red-300 border-2 border-red-600 text-red-600 rounded-md py-1 px-3 mr-2 font-medium text-sm hover:bg-red-100 hover:text-red-800 " onClick={deleteBook}><TrashBinIcon /> Delete</button>
             <button onClick={e=>setShowEdit(true)} className="dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-800 border-2 border-gray-800 text-gray-800 rounded-md py-1 px-3 mr-2 font-medium text-sm hover:bg-gray-300">Edit</button>
         </div>):null}
       {showEdit?<EditForm id={id} hideForm={()=>setShowEdit(false)}/>:null}
        </li>
    )
}

export default List
