import React, {useState, useContext, useEffect} from 'react'
import { BiBookmark } from 'react-icons/bi'
import { collectionContext } from '../../../context/CollectionContext'
import { collectionRefContext } from '../../../context/CollectionRefContext'
import { popupContext } from '../../../context/PopupContext'
import useAuthStore from '../../../store/authStore'
import { ICollections } from '../../../types/ICollections'
import { IUser } from '../../../types/IUser'
import { popTypes } from '../../../utils/popUtils'
import { client } from '../../../utils/sanityClient'

type Props = {

  collection?: ICollections
  setCollection?:any
}

function AddCollection({collection, setCollection}: Props) {
  const {
    getSingleCollection, 
    addOrRemoveFavoriteCollection, 
    getUserFavoriteCollections,

  } = useContext(collectionContext)
  const {setPopup} = useContext(popupContext)
  const {user} = useAuthStore()
  
  const [alreadyAddedCollection, setAlreadyAddedCollection] = useState<any>()
  const [isAddingCollection, setIsAddingCollection] = useState<any>(false)


  const getAlreadyAddedCollection = async () => {
    const res:IUser[] = await client.fetch(`*[_type == 'user' && _id == '${user?._id}']`)
    const [userData] = res
    
    setAlreadyAddedCollection((userData.favoriteCollections.filter(coll => coll == collection?._id!).length > 0 ? true : false))
    
  }
  

  const handleAddOrRemoveCollection = async () => {
    setIsAddingCollection(true)
    
    await addOrRemoveFavoriteCollection(collection?._id!, user!)
    console.log("Passou aqui 1")
    
    await getAlreadyAddedCollection()
    console.log("Passou aqui 2")

    setIsAddingCollection(false)
  }


  useEffect(() => {
    getAlreadyAddedCollection()
  }, [])



  return (
    <div className={`${isAddingCollection && "animate-spin" } cursor-pointer transition-all hover:bg-gray-200 rounded-full p-2 group text-lg`}
            onClick={handleAddOrRemoveCollection}
      >
  
        <div>
          <BiBookmark className={alreadyAddedCollection ? `text-indigo-500` : `text-black`} />
        </div>
      
    </div>
  )
}

export default AddCollection