import React, {useContext} from 'react'
import { BiPencil } from 'react-icons/bi'
import { modalContext } from '../../../context/ModalContext'
import { ICollections } from '../../../types/ICollections'
import { IItems } from '../../../types/IItems'
import EditCollectionModal from '../../Modals/EditCollectionModal'
import EditItemModal from '../../Modals/EditItemModal'

type Props = {
  collection: ICollections, item:IItems, setCollectionRef:any, setCollections:any
}

const Update = ({collection, item, setCollectionRef, setCollections}: Props) => {
  const {setModal} = useContext(modalContext)
  return (
    <div className='cursor-pointer transition-all hover:bg-gray-200 rounded-full p-2 group'
            onClick={() => {
              if(collection) {

                setModal({
                  isOpen: true,
                  element: <EditCollectionModal 
                    collection={collection}
                    setCollections={setCollections}
                  />
                })
              }

              else if(item) {
                setModal({
                  isOpen: true,
                  element: <EditItemModal 
                    item={item}
                    setCollectionRef={setCollectionRef}
                  />
                })
              }
            }
          }
          >
            <BiPencil className='text-black group-hover:text-blue-700' />
          </div>
  )
}

export default Update