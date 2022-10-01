import React from 'react'
import { FiHeart } from 'react-icons/fi'
import { RiHeart2Line } from 'react-icons/ri'
import { ICollections } from '../../../types/ICollections'

type Props = {
    collection: ICollections
    handleLikes: () => void
    isLiking: boolean,
    alreadyLiked: boolean
    
}

const Like = ({collection, handleLikes, isLiking, alreadyLiked}: Props) => {
  return (
    <div>
        
          <div className='flex flex-col items-center cursor-pointer transition-all'
            onClick={handleLikes}
          
          >
            <div className={`${isLiking && "animate-spin"} hover:bg-gray-200 rounded-full p-2 group`}>
              {alreadyLiked ?
                <RiHeart2Line className=' text-red-500' 
                  
                />
                :
                <RiHeart2Line className='text-black group-hover:text-red-500' 

                />
              }
            </div>
            <span>
              {collection?.likes?.length}
            </span>

   
          </div>
        
    </div>
  )
}

export default Like