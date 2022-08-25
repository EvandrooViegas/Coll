import React, { useContext } from 'react'
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
interface IProps {
    collection: ICollections
    showReactions?:boolean
}
function Collection({collection, showReactions}:IProps) {
    if(showReactions != false) {
        showReactions = true
    }
    return (
        <div className='m-10'>
            <div className='min-w-[300px] min-h-[200px]  max-w-[400px] max-h-[400px] border-[1px] shadow-sm rounded-lg p-2 transition cursor-pointer hover:bg-neutral-100'>
                <Link href={`/collection/${collection._id}`}>
                    <div className='flex flex-col'>
                        <div className='self-center'>
                            <img src={collection?.image!} className="rounded-lg m-auto  my-3 shadow-lg object-cover" width={300} height={200} /> 
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