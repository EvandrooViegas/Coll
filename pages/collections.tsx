
import Link from 'next/link'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { ICollections } from '../types/ICollections'
import { IItems } from '../types/IItems'
import Collection from '../components/Collection'
import {useEffect} from "react"
import ReactLoading from 'react-loading';
import { collectionContext } from '../context/CollectionContext'
import { userCollectionRef } from '../context/UserCollectionsRef'
import NotFound from '../components/NotFound'
import useAuthStore from '../store/authStore'
import { IUser } from '../types/IUser'
import { modalContext } from '../context/ModalContext'
import CreateCollectionModal from '../components/Modals/CreateCollectionModal'
import Searchbar from '../components/Searchbar'
import AuthorImage from '../components/AuthorImage'
import UserCollectionStatus from '../components/UserCollectionStatus'


interface IProps {
  res: ICollections[]
}

function Collections() {

  const [loading, setLoading] = useState<boolean>(false)
  const {getUserCollections, getUserRealtimeCollections} = useContext(collectionContext)
  const {userCollectionsRef:collections, setUserCollectionsRef: setCollections} = useContext(userCollectionRef)
  const {modal, setModal} = useContext(modalContext)
  const {user} = useAuthStore()
  const [search, setSearch] = useState("")
  useEffect(() => {
    const getAllCollections = async () => {
        setLoading(true)
    
        const data = await getUserCollections(user)
        setCollections(data)
        setLoading(false)
    }
    getAllCollections()
  }, [user])
  

  const filtredCollections:ICollections[] = []
    const handleSearch = () => {
    }
    
    
    
    if(search) {
        collections?.filter((collection:ICollections) => {
          collection.description?.includes(search) &&
          filtredCollections.push(collection)
        }) 
    } 

    
  return (
    <div className='flex flex-col items-center'>

       {loading ?
          <div className='block m-auto p-10'>
            <ReactLoading type="balls" color="rgb(79 70 229)" height={50} width={50} />
          </div> 
       : 
            <div className='flex flex-col items-center justify-center'>
                {collections?.length > 0 ?
                
                  <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center justify-center'>
                          <AuthorImage img={user?.image} />
                          <UserCollectionStatus user={user} />
                          <h1 className='text-2xl font-semibold text-center m-4'>{user?.username}&apos;s Collections: </h1>
                        </div>

                        <button className='p-2 bg-indigo-500 transition duration-100 text-white w-fit m-auto my-4 rounded-sm hover:bg-indigo-600'
                          onClick={() => {
                            setModal({
                              isOpen: true,
                              element: <CreateCollectionModal 
                              
                                setCollections={setCollections}
                              />
                            })
                          }}
                        
                        >
                            Add a new collection
                        </button>

                        <div className='w-[55vw]'>
                          <Searchbar 
                            search={search}
                            setSearch={setSearch}
                          />
                        </div>

            
                      {
                        filtredCollections.length > 0 || filtredCollections.length == 0 && search 
                        ?
                            
                          <div className='flex flex-col items-center justify-center'> 
                              <h1 className='p-2 font-semibold text-gray-800'>Found Collections: </h1>
                              {filtredCollections?.map((collection:ICollections) => {
                                
                                return (
                                  <div className='flex justify-center flex-wrap' key={collection._id}>
                                    <Collection setCollections={setCollections} collections={collections} collection={collection}  showEdits={true} showReactions={false} />
                                  </div>
                                )
                              })}
                          </div>
                        :
                          <div className='flex justify-center flex-wrap'> 
                              {collections?.map((collection:ICollections) => {
                    
                                return (
                                  <Collection setCollections={setCollections} collections={collections} collection={collection} key={collection._id} showEdits={true} showReactions={false} />
                                )
                              })}
                          </div> 
                      }
                  </div>
                  
                  :
                  <div className='flex flex-col justify-center items-center m-[50px]'>
                    <NotFound type="collections" />
                    <button className='p-2 bg-indigo-500 transition duration-100 text-white w-fit m-auto my-4 rounded-sm hover:bg-indigo-600'
                        onClick={() => {
                          setModal({
                            isOpen: true,
                            element: <CreateCollectionModal 
                            
                              setCollections={setCollections}
                            />
                          })
                        }}
                      
                      >
                          Add a new collection
                      </button>
                  </div>
                }
            </div>
        } 
    </div>
  )
}

export default Collections