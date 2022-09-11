import Axios from 'axios'
import React, { useContext, useState, useRef } from 'react'
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
import useAuthStore from '../store/authStore'
import { ICollections } from '../types/ICollections'
import { IItems } from '../types/IItems'
import { ILikes } from '../types/ILikes'
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
  func?:any,
  collection?: ICollections,

}
function Reactions({ canDelete, canUpdate, canLike, canAddCollection, canComment, collection, item, func}:IProps) {
    


    const {collectionRef, setCollectionRef} = useContext(collectionRefContext)

    const {modal, setModal} = useContext(modalContext)
    const {user} = useAuthStore()
    const {userCollectionsRef, setUserCollectionsRef} = useContext(userCollectionRef)
    const {setPopup} = useContext(popupContext)
    const {getSingleCollection, likeCollection} = useContext(collectionContext)
    const {deleteItem: deleteItemContext} = useContext(itemContext)


    const [isLoading, setIsLoading] = useState(false)
    var [isLiking, setIsLiking] = useState(false)

    const alreadyLiked = collection?.likes && collection?.likes?.filter((like:ILikes) => like.user == user?._id).length > 0


    async function deleteItem () {
      try {
        setIsLoading(true)

        const item = modal.payload
        const id  = item._key

        setModal({isOpen:true, element:<DeleteItemModal isLoading={true} />, payload: item})

        await deleteItemContext(id, collectionRef)
        const res = await getSingleCollection(collectionRef._id)
        setCollectionRef(res)

        setModal({isOpen:false})

        setPopup({
          isOpen: true,
          type: popTypes.success,
          text: "Item Deleted!",
        })
        setIsLoading(false)

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

    
    const handleLikes = async () => {

      if(collectionRef) {

        setIsLiking(true)
        
        if(alreadyLiked) {
            await likeCollection(collectionRef._id, user, false, setCollectionRef,  collectionRef)
          } else {
            await likeCollection(collectionRef._id, user, true, setCollectionRef,  collectionRef)
          }

          setIsLiking(false)
      }
    }

    const reactionFunc = async (reaction:string | undefined) => {
      if(reaction == "deleteCollection") {
        setModal({isOpen:true, element:<DeleteCollectionModal />, payload: collection})
      }
      
      if (reaction == "deleteItem") {
        setModal({isOpen:true, element:<DeleteItemModal isLoading={false} />, payload: item})
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



  return (
    <div className='flex justify-around items-center my-5'>
        {canLike &&
          <div className='flex flex-col items-center cursor-pointer transition-all'
            onClick={handleLikes}
          
          >
            <div className={`${isLiking && "animate-spin"} hover:bg-gray-200 rounded-full p-2 group`}>
              {alreadyLiked ?
                <FiHeart className=' text-red-500' 
                  
                />
                :
                <FiHeart className='text-black group-hover:text-red-500' 

                />
              }
            </div>
            <span>
              {collection?.likes?.length}
            </span>

   
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