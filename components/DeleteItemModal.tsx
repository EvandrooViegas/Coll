import React, { useContext } from 'react'
import { modalContext } from '../context/ModalContext'
import { IItems } from '../types/IItems'
import Content from './Content'
import Item from './Item'

function Ok_Cancel() {
    const {modal, setModal} = useContext(modalContext)
    const item:IItems = modal.payload
  return (
    <div className='flex flex-col rounded-lg w-[100%] max-h-[80vh]'>
      <div className='overflow-scroll overflow-x-hidden overflow-y-hidden'> 
        <Item item={item} showReactions={false} />
      </div>
      <div className='flex items-center justify-center gap-10 my-5'>
          <button  className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-red-500 hover:text-white hover:border-transparent'  onClick={() => setModal({isOpen: false, res: true, element: undefined, payload: item, reach: "item"})}>Delete</button>
          <button  className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 hover:text-white hover:border-transparent' onClick={() => setModal({isOpen: false, res: false, element: undefined})}>Cancel</button>
      </div>

    </div>
  )
}

export default Ok_Cancel