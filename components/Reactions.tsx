import Axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { BiBookmark, BiPencil } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import { RiDeleteBin2Line, RiDeleteBinLine } from 'react-icons/ri'
import { TbMessageCircle2 } from 'react-icons/tb'
import { collectionContext } from '../context/CollectionContext'
import { collectionRefContext } from '../context/CollectionRefContext'
import { itemContext } from '../context/ItemContext'
import { modalContext } from '../context/ModalContext'
import { popupContext } from '../context/PopupContext'
import { userCollectionRef } from '../context/UserCollectionsRef'
import { ICollections } from '../types/ICollections'
import { IItems } from '../types/IItems'
import { popTypes } from '../utils/popUtils'
import DeleteCollectionModal from './Modals/DeleteCollectionModal'
import DeleteItemModal from './Modals/DeleteItemModal'

interface IProps {
  canDelete?: boolean,
  canUpdate?: boolean,
  canLike?: boolean,
  canAddCollection?: boolean,
  canComment?: boolean
  item?: any,
  func?:string,
  collection?: ICollections,


}
function Reactions({ canDelete, canUpdate, canLike, canAddCollection, canComment, collection, item, func}:IProps) {



    const {collectionRef, setCollectionRef} = useContext(collectionRefContext)
    const {modal, setModal} = useContext(modalContext)
    const {data: session} = useSession()
    const user = session?.user
    const {userCollectionsRef, setUserCollectionsRef} = useContext(userCollectionRef)
    const {setPopup} = useContext(popupContext)
    const {getSingleCollection} = useContext(collectionContext)
    const [isLoading, setIsLoading] = useState(false)
    const {deleteItem: deleteItemContext} = useContext(itemContext)

    async function deleteItem () {
      try {
 
        const item:IItems = modal.payload
        const id  = item._key

        await deleteItemContext(id, collectionRef)

        const res = await getSingleCollection(collectionRef._id)
        setCollectionRef(res)
        setIsLoading(false)
        setModal({isOpen:false, element:<DeleteItemModal isLoading={false} />, payload: item})
        setPopup({
          isOpen: true,
          type: popTypes.success,
          text: "Item Deleted!",
        })
      } catch (error:any) {
        console.log(error.message)
      }
      
    }

    async function deleteCollection () {
      const author = user
      
      if(modal.res && collection) {
        const collection = modal.payload 
        let collections:ICollections[] | null = userCollectionsRef
        let filtredList:any = []
        const id = collection._id
        
        collections?.map((coll:ICollections) => {
          if(coll._id != id) {
            filtredList.push(coll)
          }
        })
        
        setUserCollectionsRef([...filtredList])
        setPopup({isOpen: true, type: popTypes.success, text: "Collection Removed!"})
        Axios.post("/api/collection/delete", {id: collection._id})

      }
    }

    useEffect(() => {
      if(modal.reach == "collection") {
        deleteCollection()
      }

      else if (modal.reach == "item") {
        setModal({isOpen:true, element:<DeleteItemModal isLoading={true} />, payload: item})
        deleteItem()
      }
    }, [modal.res])

    const reactionFunc = async (reaction:string | undefined) => {
      if(reaction == "deleteCollection") {
        setModal({isOpen:true, element:<DeleteCollectionModal />, payload: collection})
      }

      if (reaction == "deleteItem") {
        setModal({isOpen:true, element:<DeleteItemModal isLoading={false} />, payload: item})
      }
    }
  return (
    <div className='flex justify-around items-center my-5'>
        {canLike &&
          <div className='cursor-pointer transition-all hover:bg-gray-200 rounded-full p-2 group'>
            <FiHeart className='text-black group-hover:text-red-500' />
          </div>
        }

        {canAddCollection &&
        
        <div className='cursor-pointer transition-all hover:bg-gray-200 rounded-full p-2 group'>
          <BiBookmark className='text-black group-hover:text-black-500'/>
        </div>
        }

        {canComment &&
          <div className='cursor-pointer transition-all hover:bg-gray-200 rounded-full p-2 group'>
            <TbMessageCircle2 className='text-black group-hover:text-blue-500' />
          </div>
        }

        {canDelete &&
          <div className='cursor-pointer transition-all hover:bg-gray-200 rounded-full p-2 group' onClick={() => reactionFunc(func)}>
            <RiDeleteBinLine className='text-black group-hover:text-red-500' />
          </div>
        }

      {canUpdate &&
          <div className='cursor-pointer transition-all hover:bg-gray-200 rounded-full p-2 group'>
            <BiPencil className='text-black group-hover:text-blue-700' />
          </div>
        }
    </div>
  )
}

export default Reactions