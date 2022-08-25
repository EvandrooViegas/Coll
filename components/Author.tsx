import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { ICollections } from '../types/ICollections'
import { IUser } from '../types/IUser'

interface IProps {
  author: IUser,
  showFallow?: boolean 
}

function Author({author, showFallow}:IProps) {
  const {data} = useSession()
  const user = data?.user
  return (
    <div className='flex items-center justify-between gap-3 flex-wrap border-b-[1px] border-gray-200 p-2'>
      <div className='flex gap-3 items-center'>
        <Image className='rounded-full object-cover' width={40} height={40} src={`https://res.cloudinary.com/demo/image/fetch/${author?.image!}`} alt="profile" />
        <span>{author?.name}</span>
      </div>

      {showFallow && author.email != user?.email && (
        <div>
          <button className='flex items-center flex-nowrap transition bg-indigo-600 p-2 text-white rounded-lg hover:bg-indigo-700 hover:translate-y-[-4px]'>
            <span><HiPlusSm /></span>
            <span className='hidden sm:flex'>Fallow</span>
          </button>
        </div>
      )}
        
    </div>
  )
}

export default Author