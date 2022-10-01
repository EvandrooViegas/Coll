
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
 
}



function Author({author}:IProps) {
  const {user} = useAuthStore() 
  return (  


    <Link href={`/user/${author._id}`}
      

    >
      <div  className='flex items-center justify-between gap-3 flex-wrap bg-gray-100 rounded-lg p-2 w-full'>
      
        <div className='flex justify-between w-full gap-3 items-center  cursor-pointer group'>
          <img className='rounded-full object-cover w-[50px] h-[50px]' src={author?.image} alt="profile" />
          <span className='font-semibold  group-hover:text-indigo-500'>@{author?.username?.toLocaleLowerCase()}</span>
        </div>


      </div>
        
    </Link>
  )
}

export default Author