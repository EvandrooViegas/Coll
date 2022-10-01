import axios from 'axios'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from 'vm'
import Author from '../../components/Author'
import Item from '../../components/Item'
import NotFound from '../../components/NotFound'
import Reactions from '../../components/Reactions/Reactions'
import { collectionRefContext } from '../../context/CollectionRefContext'
import { modalContext } from '../../context/ModalContext'
import { ICollections } from '../../types/ICollections'
import { IItems } from '../../types/IItems'
import { client } from '../../utils/sanityClient'

import Collections from '../collections'
import CreateItemModal from "../../components/Modals/CreateItemModal"
import { collectionContext } from '../../context/CollectionContext'
import { itemContext } from '../../context/ItemContext'
import ReactLoading from 'react-loading';
import { popupContext } from '../../context/PopupContext'
import { popTypes } from '../../utils/popUtils'
import { userContext } from '../../context/UserContext'
import useAuthStore from '../../store/authStore'
import { ILikes } from '../../types/ILikes'
import { MdExpandMore, MdOutlineExpandLess } from 'react-icons/md'
import CollectionErrorImage from '../../components/CollectionErrorImage'
interface IProps {
    data: ICollections | null
}
function Collection({data}:IProps) {

    const {modal, setModal} = useContext(modalContext)
    const {setCollectionRef:setCollection, collectionRef:collection} = useContext(collectionRefContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const {addItem} = useContext(itemContext)
    const {user} = useAuthStore()
    const {getSingleCollection} = useContext(collectionContext)
    const {setPopup} = useContext(popupContext)
    const [showInfo, setShowInfo] = useState<boolean>(false)



    const fetchCollections = async () => {
        const res = await getSingleCollection(collection!._id)
        setCollection(res)
        setIsLoading(false)
    }

    const createItem = async (title:string, description:string, content:string, contentType:string) => {

   
 
            setIsLoading(true)

            setModal({            
                element: <CreateItemModal createItem={createItem} error={error} />,
                payload: collection, isOpen: true 
            })
            const randomInt = Math.random() * 10000000000000
            const itemInfo = {_type: "item", author: user!, text: title, description, content, _key: randomInt.toString(), contentType}

            const res =  await addItem(itemInfo, collection, collection!._id, collection?.items ? true : false)
            await fetchCollections()

            setPopup({
                isOpen: true,
                type: popTypes.success,
                text: "Item Created!",
            })
            
            setModal({            
                element: <CreateItemModal createItem={createItem} error={error} />,
                payload: null,
                isOpen: false 
            })
    
        
    }

    const handleSubmit = async () => {
      setModal({            
            element: <CreateItemModal createItem={createItem} error={error}  />,
            payload: collection, isOpen: true 
        })
    }

    useEffect(() => {
        setCollection(data)
    }, [])


    
    
 

  return (
    <div className='flex flex-col m-6 justify-center md:m-14'>

            {collection &&
                <div className='flex flex-col p-2'>
            
                    <div>
                        <div>
                            <Author author={collection?.author} />
                        </div>
                        <div>
                        
                            <h1 className='font-semibold text-2xl'>{collection?.text}</h1>
                            <p className='text-gray-700'>{collection?.description}</p>
                        </div>
                    </div>

                    <div>
                        <span 
                        className='cursor-pointer'
                        onClick={() => {
                            setShowInfo(!showInfo)
                        }}>
                            {!showInfo ?
                                <MdExpandMore /> :
                                <MdOutlineExpandLess />
                            }   
                        </span>
                        {showInfo &&
                            <div className='transition'>
                                <div className="flex flex-col">
                                    <div>
                                        <span className='font-semibold'>Hashtags: </span>
                                        {collection?.hashtags?.map((h:string) => (  
                                                <Link  key={Math.random() * 1000} href={`/hashtags/${h}`}>
                                                    <span
                                                    className="cursor-pointer hover:text-indigo-500 ml-2"
                                                    >
                                                    #{h} 
                                                </span> 
                                                </Link>       
                                            )
                                        )}
                                    </div>

                                    <span className='font-semibold'>
                                        Created At:  
                                        <span className='ml-1 font-normal'>
                                            {collection._createdAt}
                                        </span>
                                    </span>
                                
                                </div>
                            </div>
                        }
                    </div>

                    <div className='w-[100%]'>
                        <div className='w-full h-[40vh]'>
                            <CollectionErrorImage
                                image={collection.image}
                            />
                        </div>
                        
                        
                        <Reactions 
                            canLike={true} 
                            canComment={true} 
                            canAddCollection={true} 
                            collection={collection}
                            setCollection={setCollection}
                        />
                        {collection?.author?.email == user?.email && collection?.items && collection?.items.length > 0 &&
    
                            <div className='flex items-center justify-center gap-3 flex-wrap border-t-[1px] border-gray-200 p-2'>
                                <button onClick={handleSubmit} className='p-2 mt-5 bg-indigo-600 rounded-sm shadow-sm text-white hover:bg-indigo-700 hover:shadow-md'>
                                    Add a new Item
                                </button>
                            </div>
                        
                        }
                        <div>
                            {!collection?.items || collection?.items.length == 0 ?
                            <div className='flex flex-col items-center justify-center'>
                                <NotFound type="items" />
                                {collection?.author?.email == user?.email &&
                                    <button className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 hover:text-white hover:border-transparent' 
                                    onClick={handleSubmit}>Add item</button>
                                }
                            </div>

                            :
                                collection?.items?.map((item:IItems) => (
                                    <div key={item?._key} className="w-full my-[20px]">
                                        <Item 
                                        
                                            item={item}
                                            collection={collection}    
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            } 
      
    </div>
    
  )
}

export default Collection




export async function getServerSideProps ({params}:Params) {

    const id = params.id
    let response:undefined | any
    try {
        await client.fetch(`*[_type == "collection" && _id == "${id}"]`).then((res) => {
            response = res
        })
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            data: response[0]
        },
  
    }
}

