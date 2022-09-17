/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, useContext, useRef, useState } from 'react'
import { ICollections } from '../types/ICollections'
import Image from "next/image"
import {FiHeart} from "react-icons/fi"
import {BiBookmark} from "react-icons/bi"
import {TbMessageCircle2} from "react-icons/tb"
import Link from 'next/link'
import Reactions from './Reactions'
import { IItems } from '../types/IItems'
import Item from './Item'
import gradient from 'random-gradient'
import { collectionRefContext } from '../context/CollectionRefContext'
import { popupContext } from '../context/PopupContext'
import { popTypes } from '../utils/popUtils'
interface IProps {
    collection: ICollections
    collections?: ICollections[]
    setCollections?: any
    showReactions?:boolean,
    showEdits?: boolean 
}
function Collection({collection, showReactions, showEdits, setCollections, collections}:IProps) {
    const [collectionImage, setCollectionImage] = useState(collection?.image)

    const {setPopup} = useContext(popupContext)
    if(showReactions != false) {
        showReactions = true
    }

    if(showReactions != true) {
        showReactions = false
    }


    return (
        <div className='m-6 cursor-pointer w-[50vw] h-[30rem] md:max-w-[25vw]'>
          
                <div 
                className='min-w-[100%] border-[1px] border-gray-300 pb-1 rounded-lg' 
      
                >
          
                        <div>
                            <Link href={`/collection/${collection._id}`}>
                                <div>
                                
                             
                                    <img 

                                        alt="collectionImage"
                                        src={collectionImage}  
                                        className="object-cover w-full h-40 rounded-lg" 
                        
                                        onError={() => {
                                            setCollectionImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEU0NDQehnfUAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=")
                                        }}
                                    />

                                    <div className='flex flex-col justify-evenly mt-2'>
                                        <div className='flex justify-center items-center flex-col m-4'>
                                            <h1 className='text-2xl font-semibold'>{collection.text}</h1>
                                            <p className='text-xl font-semibold text-gray-600'>{collection.description?.length! > 30 ? collection.description?.slice(0, 30) + "..." : collection?.description}</p>
                                        </div>

                                    </div>
                                </div>
                            </Link>


                            <div className='w-[40%] mx-auto'>
                                {showReactions &&
                                    <Reactions canLike={true} canAddCollection={true} canComment={true} 
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