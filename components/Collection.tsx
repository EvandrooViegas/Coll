/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, useContext, useRef } from 'react'
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
    collections: ICollections[]
    setCollections: any
    showReactions?:boolean
}
function Collection({collection, showReactions, setCollections, collections}:IProps) {
    const {setPopup} = useContext(popupContext)
    if(showReactions != false) {
        showReactions = true
    }


    return (
        <div className='m-10'>
          
            <div className='min-w-[300px] min-h-[200px]  max-w-[400px] max-h-[400px] border-[1px] shadow-sm rounded-lg p-2 transition cursor-pointer hover:bg-neutral-100'>
                <Link href={`/collection/${collection._id}`}>
                    <div className='flex flex-col justify-between'>
                        <div className='self-center'>
                 
                            <img src={collection?.image} alt="" className="rounded-lg m-auto  my-3 shadow-lg object-cover" width={300} height={200}
                                onError={() => {
                                    
                                    setPopup({

                                        text:`Could not load the image! from collection: ${collection.text}`,
                                        type: popTypes.loadCollectionImage,
                                        isOpen: true,
                                        payload: collection
                        
                                    })

                                    const tempList:ICollections[] = collections.filter((coll) => coll._id !== collection._id)
                                    tempList.push({
                                        ...collection,
                                        image: "https://www.pixelstalk.net/wp-content/uploads/2016/10/Dark-Gray-Photos-Free-Download.png"
                                    })
       
                                    setCollections(tempList)
                                    
                                }}
                            
                            /> 
                        </div>
                        <div className='w-[60%] m-auto border-b-[3px] border-b-gray-200 p-2'>
                        </div>
                        <h1 className='text-2xl font-semibold'>{collection.text}</h1>
                        <p>{collection.description}</p>
                    </div>
                </Link>    
                {showReactions &&
                    <Reactions canDelete={true} canUpdate={true} collection={collection} func="deleteCollection" />
                }
            </div>
        
        </div>
  )
}

export default Collection