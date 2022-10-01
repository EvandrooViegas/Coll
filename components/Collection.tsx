/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, useContext, useRef, useState } from 'react'
import { ICollections } from '../types/ICollections'
import Image from "next/image"
import {FiHeart} from "react-icons/fi"
import {BiBookmark} from "react-icons/bi"
import {TbMessageCircle2} from "react-icons/tb"
import Link from 'next/link'
import Reactions from './Reactions/Reactions'
import { IItems } from '../types/IItems'
import Item from './Item'
import gradient from 'random-gradient'
import { collectionRefContext } from '../context/CollectionRefContext'
import { popupContext } from '../context/PopupContext'

import { collectionContext } from '../context/CollectionContext'
import CollectionErrorImage from './CollectionErrorImage'
import { ImageError } from 'next/dist/server/image-optimizer'
interface IProps {
    collection: ICollections
    collections?: ICollections[]
    setCollections?: any
    showReactions?:boolean,
    showEdits?: boolean,
    useLink?: boolean
}
function Collection({useLink, collection, showReactions, showEdits, setCollections, collections}:IProps) {
    

    const [collectionImage, setCollectionImage] = useState(collection?.image)
    const {setPopup} = useContext(popupContext)

    if(useLink != false) {
        useLink = true
    }

    if(showReactions != true) {
        showReactions = false
    }


    return (
        <div className='m-1 my-10 flex justify-center items-center cursor-pointer w-[50vw] min-h-[30vh] max-h-[30vh]  md:max-w-[25vw]'>
          
                <div 
                className='min-w-[100%] min-h-[100%] w-full border-[1px] border-gray-300 pb-1 rounded-lg' 
      
                >
          
                        <div className='h-full'>
                            {useLink ?
                                <Link href={`/collection/${collection._id}`}>
                                    <div className='h-full'>
                                    
                                
                                       <div className='w-full h-[8rem] rounded-lg'>
                                            <CollectionErrorImage
                                                image={collection.image}
                                                
                                            />
                                       </div>

                                        <div className='flex flex-col justify-evenly mt-1'>
                                            <div className='flex justify-center items-center flex-col m-4'>
                                                <h1 className='text-2xl font-semibold'>{collection.text}</h1>
                                                <p className='text-xl font-semibold text-gray-600'>{collection.description?.length! > 30 ? collection.description?.slice(0, 30) + "..." : collection?.description}</p>
                                            </div>

                                        </div>
                                    </div>
                                </Link> :

                                <div>
                                                                    
                                                                
                                    <div className='w-40 h-40'>
                                        <CollectionErrorImage 
                                        
                                            image={collection.image}
                                        />
                                    </div>

                                    <div className='flex flex-col justify-evenly mt-1'>
                                        <div className='flex justify-center items-center flex-col m-4'>
                                            <h1 className='text-2xl font-semibold'>{collection.text}</h1>
                                            <p className='text-xl font-semibold text-gray-600'>{collection.description?.length! > 30 ? collection.description?.slice(0, 30) + "..." : collection?.description}</p>
                                        </div>

                                    </div>
                                </div>
                            }


                            <div className='w-[40%] mx-auto'>
                                {showReactions &&
                                    <Reactions 
                                        canLike={true} 
                                        canAddCollection={true} 
                                        canComment={true} 
                                        collection={collection}
                                        func="deleteCollection"

                                    />
                                }

                                {showEdits &&
                                    <Reactions 
                                        canDelete={true} 
                                        canUpdate={true} 
                                        collection={collection}
                                        setCollections={setCollections}
                                        func="deleteCollection"

                                    />
                                }      
                            </div>         
                        </div>




                </div>
        
        </div>
  )
}

export default Collection