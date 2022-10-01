import React from 'react'
import { IItems } from '../types/IItems'
import Author from './Author'
import Content from './Content'
import Divider from './Divider'
import Reactions from './Reactions/Reactions'

type Props = {
    item: IItems
}

export default function ItemCard({item}: Props) {
  return (
    <div className='flex flex-col gap-4 rounded-md'>
        <Author
            author={item.author}
        />
        <div className='flex flex-col gap-4'>
            <div className=''>
                <h4 className='text-md font-semibold'>{item.text}</h4>
                <p>{item.description}</p>
            </div>
            <div className='w-full flex gap-4 items-center md:w-[70%] group'>
                {item.content &&
                    <div className='w-2 rounded-full h-[12em] bg-gray-700 group-hover:bg-indigo-700'>

                    </div>
                }

                <div className='w-full'>
                    <Content  
                        item={item}
                        contentType={item.contentType}
                    />
                </div>

            </div>
            <div className='self-start'>
                <Reactions 
                    item={item}
                    canAddItemToCollection={true}
                />
            </div>
        </div>
     
    </div>
  )
}

