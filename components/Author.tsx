
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { userContext } from '../context/UserContext'
import useAuthStore from '../store/authStore'


import { ICollections } from '../types/ICollections'
import { IUser } from '../types/IUser'

interface IProps {
  author: IUser,
  showFallow?: boolean 
}



function Author({author, showFallow}:IProps) {
  const {user} = useAuthStore() 
  return (  
    <Link href={`/user/${author._id}`}
      

    >
      <div  className='flex items-center justify-between gap-3 flex-wrap border-b-[1px] border-gray-200 p-2 w-full'>
      
        <div className='flex justify-between w-full gap-3 items-center  cursor-pointer group'>
          <img className='rounded-full object-cover w-[50px] h-[50px]' src={author?.image} alt="profile" />
          <span className='font-semibold group-hover:text-indigo-500'>@{author?.username?.toLocaleLowerCase()}</span>
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
        
    </Link>
  )
}

export default Author