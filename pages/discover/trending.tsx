import React from 'react'
import CollectionInfo from '../../components/CollectionInfo'
import CollectionMap from '../../components/CollectionMap'
import { ICollections } from '../../types/ICollections'
import { client } from '../../utils/sanityClient'

type Props = {
    data: ICollections[]
}

export default function Trending({data}: Props) {
  return (
    <div className='m-4 md:m-14'>
        <p className='text-2xl font-semibold mb-10'>
            <span className='text-indigo-600'>Trending {" "}</span>
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
    const collections:ICollections[] = await client.fetch("*[_type=='collection']")
    const data = collections.sort(function(a, b){

        return b.likes?.length! - a.likes?.length!;
      });
    return {
        props: {
            data
        }
    }
}

