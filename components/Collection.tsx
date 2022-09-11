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
    collections?: ICollections[]
    setCollections?: any
    showReactions?:boolean,
    showEdits?: boolean 
}
function Collection({collection, showReactions, showEdits, setCollections, collections}:IProps) {
    const {setPopup} = useContext(popupContext)
    if(showReactions != false) {
        showReactions = true
    }

    if(showReactions != true) {
        showReactions = false
    }


    return (
        <div className='m-12 cursor-pointer' >
          
            <Link href={`/collection/${collection._id}`}>
                <div className='w-[100%] h-[100%] border-[1px] border-gray-300 pb-4' 
                    style={{
                        borderRadius: "14px 14px 14px 14px"
                    }}
                >
                    <img src={collection.image}  className="object-cover w-full h-[55%]" 
                    style={{
                        borderRadius: "14px 14px 14px 14px"
                    }} />

                    <div className='flex flex-col h-[45%] justify-evenly mt-2'>
                        <div className='flex justify-center items-center flex-col m-4'>
                            <h1 className='text-2xl font-semibold'>{collection.text}</h1>
                            <p className='text-xl font-semibold text-gray-600'>{collection.description?.length! > 30 ? collection.description?.slice(0, 30) + "..." : collection?.description}</p>
                        </div>

                        <div>
                            {showReactions &&
                                <Reactions canLike={true} canAddCollection={true} canComment={true} 
                                    collection={collection}
                                />
                            }

                            {showEdits &&
                                <Reactions canDelete={true} canUpdate={true} 
                                    collection={collection}
                                />
                            }      
                        </div>         
                    </div>



                </div>
            </Link>
        
        </div>
  )
}

export default Collection