import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Context } from 'vm'
import { ICollections } from '../types/ICollections'
import { IItems } from '../types/IItems'
import Collection from '../components/Collection'
import {useEffect} from "react"
import ReactLoading from 'react-loading';
import { collectionContext } from '../context/CollectionContext'
import { userCollectionRef } from '../context/UserCollectionsRef'
import NotFound from '../components/NotFound'


interface IProps {
  res: ICollections[]
}

function Collections() {

  const [loading, setLoading] = useState<boolean>(false)
  const {data: session} = useSession()
  const user = session?.user
  const {getUserCollections, getUserRealtimeCollections} = useContext(collectionContext)
  const {userCollectionsRef:collections, setUserCollectionsRef: setCollections} = useContext(userCollectionRef)

  useEffect(() => {
    const getAllCollections = async () => {
        setLoading(true)
    
        const data = await getUserCollections(user)
        setCollections(data)
        setLoading(false)
    }
    getAllCollections()
  }, [user])


    
    
  return (
    <div className='flex flex-col'>

       {loading ?
       <div className='block m-auto p-10'>
         <ReactLoading type="spin" color="purple" height={50} width={50} />
       </div> : 
            <div className='flex flex-col'>
                {collections?.length > 0 ?
                
                  <>
                    <h1 className='text-2xl font-semibold text-center m-4'>{user?.name}&apos;s Collections: </h1>
                    <Link href="/create">
                        <button className='p-2 bg-indigo-500 transition duration-100 text-white w-fit m-auto my-4 rounded-sm hover:bg-indigo-600'>Add collection</button>
                    </Link>
            
                    <div className='flex justify-center flex-wrap'> 
                      {collections?.map((collection:ICollections) => {
            
                        return (
                          <Collection collection={collection} key={collection._id} />
                        )
                      })}
                      
                    </div>
                  </>
                  
                  :
                  <div className='flex justify-center items-center m-[50px]'>
                    <NotFound type="collections" />
                  </div>
                }
            </div>
        }
    </div>
  )
}

export default Collections