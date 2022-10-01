import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { popupContext } from '../context/PopupContext'
import { popTypes } from '../utils/popUtils'
function Popup() {
    const {popup, setPopup} = useContext(popupContext)
    const {isOpen, type, text, payload} = popup

    useEffect(() => {
        if(text) {
            setTimeout(() => {
                setPopup({isOpen: false})
            }, 5000)
        }
    } , [text])


  return (
    <div className='fixed top-20 flex flex-col gap-2  m-5 w-fit h-fit' id='popup'>

        {type == popTypes.success && (
            <div className='flex items-center bg-white shadow-[0px_22px_20px_1px_rgba(0,0,0,0.26)] rounded-lg'>
                <div className="flex-2 w-4 h-10 bg-green-500 rounded-lg">

                </div>

                <div className='flex-1 p-2'>
                    {text} 👌
                </div>
            </div>
  
        )}

        {type == popTypes.alert && (
            <div className='flex items-center bg-white shadow-[0px_22px_20px_1px_rgba(0,0,0,0.26)] rounded-lg'>
                <div className="flex-2 w-4 h-10 bg-yellow-500 rounded-lg">

                </div>

                <div className='flex-1 p-2'>
                    {text} 🚧
                </div>
            </div>

        )}

        {type == popTypes.error && (

            <div className='flex items-center bg-white shadow-[0px_22px_20px_1px_rgba(0,0,0,0.26)] rounded-lg'>
                <div className="flex-2 w-4 h-10 bg-red-500 rounded-lg">

                </div>

                <div className='flex-1 p-2'>
                    {text} 😥
                </div>
            </div>
        )}

        {type == popTypes.loadCollectionImage && (
            <div className='flex flex-col items-center gap-3 bg-zinc-600 p-2 text-white rounded-sm shadow-lg'>
                <div className='flex gap-2'>

                    <div>
                        😥
                    </div>
                    <p>{text}</p>
                </div>

                <Link href={`/collection/${payload._id}`}>
                    <button className='bg-gray-100 text-gray-800 p-1 rounded-sm'>Edit Here!</button>
                </Link>
            </div>
        )}


        
    </div>
  )
}

export default Popup