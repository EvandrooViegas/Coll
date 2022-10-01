import Link from 'next/link'
import React, {useState} from 'react'
import { RiHeart2Line } from 'react-icons/ri'
import { TbMessageCircle2 } from 'react-icons/tb'
import { ICollections } from '../types/ICollections'
import CollectionErrorImage from './CollectionErrorImage'
import Reactions from './Reactions/Reactions'

type Props = {
    collectionInfo: ICollections
    setCollections?: any
}

export default function CollectionInfo({collectionInfo, setCollections}: Props) {
    const [collection, setCollection] = useState(collectionInfo)
    

  return (
    <div className='w-full h-20'>
        <Link href={`/collection/${collection._id}`}>
            <div className='relative flex h-full items-center border-[1px] rounded-md border-gray-200 cursor-pointer hover:bg-gray-100'>
                        <>
                            
                            <div className='hidden md:inline h-full rounded-sm w-60'>
                                <CollectionErrorImage
                                    hight={20}
                                    image={collection.image}
                                />
                            </div>
                                {/* <img src={collection.image} className="rounded-sm h-full object-cover w-60" 
                               
                                /> */}
                          

                            <div className='m-4 flex flex-2 w-full justify-between items-center'>
                                <div>
                                    <h4 className='font-semibold text-black'>{collection.text}</h4>
                                    <p>{collection.description}</p>
                                </div>

                                <div className='flex items-center gap-4'>
                                    <div className='hidden md:inline'>
                                        <img src={collection.author.image}  className="rounded-full h-12" />
                                    </div>
                                    <div className='flex flex-col'>

                                        <div className='flex gap-2 items-center'>
                                            <span>
                                                {collection.likes?.length ? collection.likes.length : "0"}
                                            </span>

                                            <span>
                                                <RiHeart2Line />
                                            </span>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <span>
                                                {collection.comments?.length ? collection.comments.length : "0"}
                                            </span>

                                            <span>
                                                <TbMessageCircle2 />
                                            </span>
                                        </div>

                                    </div>
                                </div>


                                
                            </div>  
                        </>
            </div>
        </Link>
    </div>
  )
}

