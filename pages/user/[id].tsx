import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { useContext, useState, useEffect } from 'react'
import { collectionContext } from '../../context/CollectionContext'
import { ICollections } from '../../types/ICollections'

import { IUser } from '../../types/IUser'
import { client } from '../../utils/sanityClient'
import Collection from "../../components/Collection"
import UserCollectionStatus from '../../components/UserCollectionStatus'
import CollectionMap from '../../components/CollectionMap'

export default function UserDetails({data}:any) {
  const user:IUser = data
  const [collections, setCollections] = useState<ICollections[]>()
  const {getUserCollections, getUserFavoriteCollections} = useContext(collectionContext)
  
  const [showUserCollections, setShowUserCollections] = useState(true)
  const handleGetCollections = async () => {
    if(showUserCollections) {
      const res:ICollections[] = await getUserCollections(user)
      setCollections(res)
    }
  }
  const handleGetUserFavoriteCollections = async () => {
    const data = await getUserFavoriteCollections(user._id)
    setCollections(data)
  }
  useEffect(() => {
    if(showUserCollections) {
      handleGetCollections()
    } else {
      handleGetUserFavoriteCollections()
    }
  }, [showUserCollections])
  
  return (
    <div className='relative flex justify-center'>
      <div className='w-full m-7'>
        <div className='flex flex-col gap-5 items-center md:flex-row'> 
          <div className='flex items-center gap-6'> 
            <img src={user.image} className="object-cover rounded-full w-[130px] h-[130px]" />
            <div className='flex flex-col'>
              <span className='font-semibold'>{user.username?.toLocaleUpperCase()}</span>
              <span className='font-semibold text-gray-600'>{user.email?.toLocaleLowerCase()}</span>
            </div>
          </div>

          <div className='static w-full h-[12vh] md:w-[55%] rounded-lg 
          md:flex md:justify-center md:absolute right-0'> 

             <UserCollectionStatus 
              user={user}
            />

          </div>  
        </div>

        <div className='mt-40'>
          <div className='flex gap-10 border-b-[1px]'>
            <div
              onClick={() => {
                setShowUserCollections(true)
              }}
              className="flex flex-col cursor-pointer"
            >
              <span>Collections</span>
              {showUserCollections &&
                <div className='w-full h-[4px] rounded-md bg-black'>

                </div>
              }
            </div>
            

            <div
              onClick={() => {
                setShowUserCollections(false)
              }}
              className="flex flex-col cursor-pointer"
            >
              <span>Favorite Collections</span>
              
              {!showUserCollections &&
                <div className='w-full h-[4px] rounded-md bg-black'>

                </div>
              }  
            </div>
            
          </div>
            <div>
               
                  <CollectionMap 
                  setCollections={setCollections}
                  collections={collections}
                  /> 

              
            </div>
       
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps ({params}:Params) {

  const id = params.id
  const q = `*[_type == "user" && _id == "${id}"]`
  const res = await client.fetch(q)
  console.log(res)
  return {
      props: {
          data: res[0]
      },

  }
}

