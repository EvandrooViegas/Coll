import Axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { collectionContext } from '../../context/CollectionContext'
import { collectionRefContext } from '../../context/CollectionRefContext'
import { itemContext } from '../../context/ItemContext'
import { modalContext } from '../../context/ModalContext'
import { popupContext } from '../../context/PopupContext'
import { userCollectionRef } from '../../context/UserCollectionsRef'
import useAuthStore from '../../store/authStore'
import { ICollections } from '../../types/ICollections'
import { ILikes } from '../../types/ILikes'
import { popTypes } from '../../utils/popUtils'
import AddItemToCollectionModal from '../Modals/AddItemToCollectionModal'
import DeleteCollectionModal from '../Modals/DeleteCollectionModal'
import DeleteItemModal from '../Modals/DeleteItemModal'
import AddCollection from './ReactionsTypes/AddCollection'
import AddItemToCollection from './ReactionsTypes/AddItemToCollection'
import Comment from './ReactionsTypes/Comment'
import Like from './ReactionsTypes/Like'
import Update from './ReactionsTypes/Update'

interface IProps {
  canDelete?: boolean,
  canUpdate?: boolean,
  canLike?: boolean,
  canAddCollection?: boolean,
  canComment?: boolean
  canAddItemToCollection?: boolean,

  item?: any,
  func?:any,
  collection?: ICollections,
  setCollections?: any
  setCollection?: any 

}
function Reactions({ 
  canDelete, canUpdate, canLike, canAddCollection, canComment, canAddItemToCollection,
  collection, item, func, setCollections, setCollection
  }:IProps) {
    


    const {collectionRef, setCollectionRef} = useContext(collectionRefContext)

    const {modal, setModal} = useContext(modalContext)
    const {user} = useAuthStore()
    const {setUserCollectionsRef} = useContext(userCollectionRef)
    const {setPopup, popup} = useContext(popupContext)
    const {
      getSingleCollection, 
      likeCollection, 
      deleteCollection: deleteCollectionRef, 
      getUserCollections, 
      addOrRemoveFavoriteCollection, 
      getUserFavoriteCollections,
      addItemToCollection
    } = useContext(collectionContext)
    const {deleteItem: deleteItemContext} = useContext(itemContext)
    const [isAddingCollection, setIsAddingCollection] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(false)
    var [isLiking, setIsLiking] = useState(false)
    const alreadyLiked = collection?.likes && collection?.likes?.filter((like:ILikes) => like.user == user?._id).length > 0
    const [alreadyAddedCollection, setAlreadyAddedCollection] = useState<boolean>(false)



    async function deleteItem () {
      try {
        setIsLoading(true)

        const item = modal.payload
        const id  = item._key

        setModal({isOpen:true, element:<DeleteItemModal isLoading={true} />, payload: item})

        await deleteItemContext(id, collectionRef!)
        const res = await getSingleCollection(collectionRef!._id)
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

      
      if(modal.res && collection) {
        const collection:ICollections = modal.payload 
        await deleteCollectionRef(collection._id)
        const res = await getUserCollections(user!)
    
        setUserCollectionsRef(res)
        setPopup({isOpen: true, type: popTypes.success, text: "Collection Removed!"})

      }
    }

    
    const handleLikes = async () => {
  
      if(collection) {
     
        setIsLiking(true)
        await likeCollection(collection._id, user!, alreadyLiked!, collection!)
        const res = await getSingleCollection(collection._id)
        setCollection(res)
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

    const handleAddItemToCollection = async () => {
      setModal({
        isOpen: true,
        element: <AddItemToCollectionModal 
            user={user!}
            item={item}
        />
      })
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
          <Like 
            collection={collection!}
            handleLikes={handleLikes}
            isLiking={isLiking}
            alreadyLiked={alreadyLiked!}
          />
        }


        {canComment &&
            <Comment
              collection={collection!}
              collectionRef={collectionRef!}
            />

        }

        {canAddCollection &&
        
          <AddCollection 
            collection={collection}
            setCollection={setCollection}

   
          />
        }

        {canDelete &&
          <div className='cursor-pointer transition-all hover:bg-gray-200 rounded-full p-2 group' onClick={() => reactionFunc(func)}>
            <RiDeleteBinLine className='text-black group-hover:text-red-500' />
          </div>
        }

      {canUpdate &&
          <Update 
            collection={collection!}
            item={item} 
            setCollectionRef={setCollectionRef}
            setCollections={setCollections}
          />
        }

      {canAddItemToCollection &&
          <AddItemToCollection 
            item={item}
            handleAddItemToCollection={handleAddItemToCollection}
          />
        }
    </div>
  )
}

export default Reactions