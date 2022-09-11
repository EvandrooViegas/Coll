import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { useContext, useState, useEffect } from 'react'
import { collectionContext } from '../../context/CollectionContext'
import { ICollections } from '../../types/ICollections'

import { IUser } from '../../types/IUser'
import { client } from '../../utils/sanityClient'
import Collection from "../../components/Collection"

export default function UserDetails({data}:any) {
  const user:IUser = data
  const [showUserVideos, setShowUserVideos] = useState(true)
  const [collections, setCollections] = useState<ICollections[]>()
  const {getUserCollections} = useContext(collectionContext)
  const getCollections = async () => {
    if(showUserVideos) {
      const res = await getUserCollections(user)
      setCollections(res)
    }
  }
  useEffect(() => {
    getCollections()
  }, [showUserVideos])
  
  return (
    <div className='relative flex justify-center'>
      <div className='w-full m-7'>
        <div className='flex flex-col gap-5 items-center md:flex-row'> 
          <div className='flex items-center gap-6'> 
            <img src={user.image} className="rounded-full w-[130px] h-[130px]" />
            <div className='flex flex-col'>
              <span className='font-semibold'>{user.username?.toLocaleUpperCase()}</span>
              <span className='font-semibold text-gray-600'>{user.email?.toLocaleLowerCase()}</span>
            </div>
          </div>

          <div className='static w-full flex justify-center border-gray-200 h-[12vh] md:w-[55%] rounded-lg 
          md:flex md:justify-center md:absolute right-0 border-t-[1px] border-b-[1px] border-l-[1px]'> 

              <div className='flex justify-between items-center w-[60%]'>
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-xl'>100</p>
                  <p className='text-gray-600 font-semibold text-sm'>following</p>
                </div>
                <div className='bg-gray-200 rounded-lg h-[40%] w-[3px]'>

                </div>
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-xl'>100</p>
                  <p className='text-gray-600 font-semibold text-sm'>followers</p>
                </div>
              </div>

          </div>  
        </div>

        <div className='mt-40'>
          <div className='flex gap-10 border-b-[1px]'>
            <div
              onClick={() => {
                setShowUserVideos(true)
              }}
              className="flex flex-col cursor-pointer"
            >
              <span>Collections</span>
              {showUserVideos &&
                <div className='w-full h-[4px] rounded-md bg-black'>

                </div>
              }
            </div>
            

            <div
              onClick={() => {
                setShowUserVideos(false)
              }}
              className="flex flex-col cursor-pointer"
            >
              <span>Favorite Collections</span>
              
              {!showUserVideos &&
                <div className='w-full h-[4px] rounded-md bg-black'>

                </div>
              }  
            </div>
            
          </div>

          <div className='flex justify-center h-full'>
            <div className='h-full flex flex-wrap'>
              {collections?.map((coll:ICollections) => (
                <Collection key={coll._id} collection={coll}  />
              ))}
            </div>
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

