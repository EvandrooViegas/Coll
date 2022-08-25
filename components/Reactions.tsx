import Axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { BiBookmark, BiPencil } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import { RiDeleteBin2Line, RiDeleteBinLine } from 'react-icons/ri'
import { TbMessageCircle2 } from 'react-icons/tb'
import { collectionRefContext } from '../context/CollectionRefContext'
import { modalContext } from '../context/ModalContext'
import { popupContext } from '../context/PopupContext'
import { userCollectionRef } from '../context/UserCollectionsRef'
import { ICollections } from '../types/ICollections'
import { IItems } from '../types/IItems'
import { popTypes } from '../utils/popUtils'
import DeleteCollectionModal from './DeleteCollectionModal'
import DeleteItemModal from './DeleteItemModal'

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
    async function deleteItem () {
      const item = modal.payload
      if(modal.res  && item) {
        let filtredList:any = []
        const id = item._key
        collectionRef?.items?.map((item:IItems) => {
          if(item._key != id) {
            filtredList.push(item)
          }
        })
        setCollectionRef({...collectionRef, items: filtredList})
        await Axios.put("/api/item/delete", {id, collection: collectionRef})
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
        deleteItem()
      }
    }, [modal.res])

    const reactionFunc = async (reaction:string | undefined) => {
      if(reaction == "deleteCollection") {
        setModal({isOpen:true, element:<DeleteCollectionModal />, payload: collection})
      }

      if (reaction == "deleteItem") {
        setModal({isOpen:true, element:<DeleteItemModal />, payload: item})
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