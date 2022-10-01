import React, {useState, useEffect, useContext} from 'react'
import { FaRegComment } from 'react-icons/fa'
import { FiBox } from 'react-icons/fi'
import { HiOutlineCollection } from 'react-icons/hi'
import { RiHeart2Line } from 'react-icons/ri'
import { collectionContext } from '../context/CollectionContext'
import { ICollections } from '../types/ICollections'
import { IUser } from '../types/IUser'

interface IProps {
    user: IUser | null
}
function UserCollectionStatus({user}:IProps) {
    const {getUserCollections} = useContext(collectionContext)
    const [userStatus, setUserStatus] = useState<{
        likes?: number,
        collections?: number,
        items?: number
    }>({})
    const getUserStatus = async () => {

        if(user) {
            const userCollections = await getUserCollections(user)
    
            var likesCounter = 0
            var collectionCounter = 0
            var itemsCounter = 0
       
            //likes
            userCollections?.map((collection:ICollections) => {
                if(collection.likes) {
                    likesCounter = likesCounter + collection.likes?.length!
                }
            })

            // //items
            userCollections?.map((collection:ICollections) => {
                if(collection.items) {
                    itemsCounter = collection.items.length + itemsCounter
                }
            })

            //collections
            collectionCounter = userCollections.length 
        
        
            setUserStatus({
                likes: likesCounter,
                collections: collectionCounter,
                items: itemsCounter
            })
        }
       
    }

    useEffect(() => {
        getUserStatus()
    }, [user])
    
  return (
    <div className='flex items-center gap-4 justify-evenly flex-wrap mt-4 border-[1px] p-2 px-4 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <RiHeart2Line />
            {userStatus.likes}
        </div>
        <div className='flex flex-col items-center justify-center'>
            <HiOutlineCollection />
            {userStatus.collections}
        </div>
        <div className='flex flex-col items-center justify-center'>
            <FiBox />
            {userStatus.items}
        </div>

    </div>
  )
}

export default UserCollectionStatus