import React from 'react'

function Modal({children}) {
    return (
        <div className="fixed w-full h-full inset-0 " >
        <div  className="absolute w-full h-full inset-0  z-20 bg-gray-500"  style={{pointerEvents:'none',cursor:'none',background:'rgba(0,0,0,0.8)'}}></div>
        {children}
      </div>
    )
}

export default Modal
