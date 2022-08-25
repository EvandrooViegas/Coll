import React, { useContext } from 'react'
import { modalContext } from '../context/ModalContext'
import { ICollections } from '../types/ICollections'
import { IItems } from '../types/IItems'
import Collection from './Collection'
import Content from './Content'
import Item from './Item'

function DeleteCollectionModal() {
    const {modal, setModal} = useContext(modalContext)
    const collection:ICollections = modal.payload

  return (
    <div className='flex flex-col rounded-lg'>
      <Collection collection={collection} showReactions={false} />

      <div className='flex items-center justify-center gap-10 my-5'>

          <button  className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-red-500 hover:text-white hover:border-transparent'  
          onClick={() => setModal({isOpen: false, res: true, element: undefined, payload: collection, reach: "collection"})}>Delete</button>

          <button  className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 hover:text-white hover:border-transparent' 
          onClick={() => setModal({isOpen: false, res: false, element: undefined})}>Cancel</button>

      </div>
    </div>
  )
}

export default DeleteCollectionModal