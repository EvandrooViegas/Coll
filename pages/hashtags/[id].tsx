import React from 'react'
import { HiOutlineHashtag } from 'react-icons/hi'
import { ICollections } from '../../types/ICollections'
import { client } from '../../utils/sanityClient'
import Collection from "../../components/Collection"


interface IProps {
  data: ICollections[],
  param: string
}
export default function hashtagDetails({data, param}:IProps) {

  return (
    <div className="flex flex-wrap m-10">
      <div className='flex flex-col gap-8 w-full'>
            <div className='w-full flex justify-between items-center gap-2'>
              <div className='flex justify-center items-center bg-gray-100 w-40 h-40 rounded-lg'>
                <HiOutlineHashtag 
                  style={{
                    fontSize: "80px",
                    borderRadius: "100px",
                    padding: "10px",
                    backgroundColor: "#CCC",
                    color: "#fff"
                  }}
                />
              </div>

              <div className='flex flex-col'>
                <span className='font-semibold text-3xl'>#{param}</span>
                <span>{data.length > 0 ? data.length + " " + "Collections" : data.length + " " + "Collection"}</span>
              </div>
            </div>

            <div className='bg-gray-100 h-[2px] w-full'>

            </div>
      </div>
      <div className='flex flex-wrap'> 
        {data &&
          data.map((coll) => (
            <Collection 
              key={coll._id}
              collection={coll}
              showReactions={false}
            />
          ))
        }          
      </div>
    </div>
  )
}


export async function getServerSideProps({params}:any) {
  const paramId = params.id
  const q = `*["${paramId}" in hashtags]`
  
  const data = await client.fetch(q)
  return {
    props: {
      data,
      param: paramId
    }
  }
}
