import React, {useContext} from 'react'
import { TbMessageCircle2 } from 'react-icons/tb'
import { modalContext } from '../../../context/ModalContext'
import { ICollections } from '../../../types/ICollections'
import CommentModal from '../../Modals/CommentModal'

type Props = {
  collection: ICollections
  collectionRef: ICollections
}

function Comment({collection, collectionRef}: Props) {
  const {setModal} = useContext(modalContext)
  return (
    <div className='flex flex-col items-center cursor-pointer transition-all'
        onClick={() => {
          setModal({
            isOpen: true,
                element: <CommentModal collection={collectionRef!} />
              })
            }}
      
      >
        <div className="hover:bg-gray-200 rounded-full p-2 group">
  
            <TbMessageCircle2 className='text-black group-hover:text-blue-500 ' />
    

        </div>
        <span>
          {collection?.comments?.length}
        </span>
      </div>
  )
}

export default Comment