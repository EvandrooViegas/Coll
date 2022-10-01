import React from 'react'
import { BsArrow90DegDown } from 'react-icons/bs'
import { ICollections } from '../types/ICollections'
import { IItems } from '../types/IItems'
import CollectionInfo from './CollectionInfo'
import ItemCard from './ItemCard'

type Props = {item: IItems, collection:ICollections, setCollections:any}

export default function ItemCardCollectionInfoCard({item, collection, setCollections}: Props) {
  
  return (
    <div className='flex flex-col border-[0.2px] border-gray-200 p-10' key={item._key}>
        <div>
            <ItemCard
            item={item}
        />
        </div>
        <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-4'>
            <span>
                <BsArrow90DegDown />
            </span>
            <span>
                From:
            </span>
            </div>

            <CollectionInfo
                collectionInfo={collection}
                setCollections={setCollections}
            />

        </div>
    </div>
  )
}
