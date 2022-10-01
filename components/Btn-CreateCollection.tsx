import React, {useContext} from 'react'
import { modalContext } from '../context/ModalContext'
import CreateCollectionModal from './Modals/CreateCollectionModal'

function BtnCreateCollection({setCollections}: {setCollections?: any}) {
    const {setModal} = useContext(modalContext)
  return (
    <button className='p-2 bg-indigo-700 transition duration-100 text-white w-fit m-auto my-4 rounded-sm hover:bg-indigo-800'
        onClick={() => {
            setModal({
            isOpen: true,
            element: <CreateCollectionModal 
            
                setCollections={setCollections}
            />
            })
        }}
        
        >
            Add a new collection
    </button>
  )
}

export default BtnCreateCollection