import React, { useContext, useEffect } from 'react'
import { popupContext } from '../context/PopupContext'
import { popTypes } from '../utils/popUtils'
function Popup() {
    const {popup, setPopup} = useContext(popupContext)
    const {isOpen, type, text} = popup
    const dummyText = "Collection created. Refresh the page to see the updates"
    useEffect(() => {
        if(text) {
            setTimeout(() => {
                setPopup({isOpen: false})
            }, 5000)
        }
    } , [text])
  return (
    <div className='flex flex-col gap-2 z-[10] m-5 w-fit h-fit'>

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


        
    </div>
  )
}

export default Popup