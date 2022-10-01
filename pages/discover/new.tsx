import React from 'react'
import CollectionInfo from '../../components/CollectionInfo'
import CollectionMap from '../../components/CollectionMap'
import { ICollections } from '../../types/ICollections'
import { client } from '../../utils/sanityClient'

type Props = {
    data: ICollections[]
}

export default function New({data}: Props) {
  return (
    <div className='m-4 md:m-14'>
        <p className='text-2xl font-semibold mb-10'>
            <span className='text-indigo-600'>New {" "}</span>
            <span>Collections: </span>
        </p>

        <div className='flex flex-col gap-4'>
            {data.map((collection) => (
                <CollectionInfo 
                    key={collection._id}
                    collectionInfo={collection}
                />
            ))}
        </div>
    </div>
  )
}

export async function getServerSideProps() {
    const data:ICollections[] = await client.fetch("*[_type=='collection'] | order(_createdAt desc)")

    return {
        props: {
            data
        }
    }
}

