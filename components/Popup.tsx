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
    <div className='fixed top-20 flex flex-col gap-2 z-[200] m-5 w-fit h-fit' id='popup'>

        {type == popTypes.success && (
            <div className='flex gap-3 bg-green-600 p-2 text-white rounded-sm shadow-lg'>
                <div>
                    👌
                </div>
                {text}
            </div>
        )}

        {type == popTypes.alert && (
            <div className='flex gap-3 bg-yellow-600 p-2 text-white rounded-sm shadow-lg'>
                <div>
                    🚧
                </div>
                {text}
            </div>
        )}

        {type == popTypes.error && (
            <div className='flex gap-3 bg-red-500 p-2 text-white rounded-sm shadow-lg'>
                <div>
                    😥
                </div>
                {text}
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