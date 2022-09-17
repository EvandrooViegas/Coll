import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiOutlineCollection, HiOutlineHome, HiOutlineLogout } from 'react-icons/hi'
import { RiCompass3Line } from 'react-icons/ri'
import useAuthStore from '../../store/authStore'
import ActiveLink from '../Links/ActiveLinkMd'
import Logo from '../Logo'

function MdNav() {
    const {user, removeUser} = useAuthStore()
  return (
    <div className='flex items-center justify-around w-[100vw] p-2 bg-white'>
            <Logo />

        <div className='flex justify-center mr-10'>
            <div className='flex md:hidden'>
                <ActiveLink href="/">
                    <div>
                        <span className='text-xl'>
                            <HiOutlineHome />
                        </span>
                
                    </div>
                </ActiveLink>
            </div>

            <div className='flex md:hidden'>
                <ActiveLink href="/collections">
                    <div>
                        <span className='text-xl'>
                            <HiOutlineCollection />
                        </span>
                
                    </div>
                </ActiveLink>
            </div>

            <div className='flex md:hidden'>
                <ActiveLink href="/discover">
                    <div>
                        <span className='text-xl'>
                            <RiCompass3Line />
                        </span>
                    
                    </div>
                </ActiveLink>
            </div>
        </div>

        <div className='full'>
                {user ?

                    <Link href={`/user/${user._id}`}>
                        <div className='cursor-pointer bg-gray-200 p-2 absolute top-0 right-0 w-[30%] justify-center h-full flex gap-2 items-center md:flex-col'
                        
                            style={{
                                borderRadius: "25px 0 0 25px"
                            }}
                                >
                        
                            <img className='rounded-full object-cover w-10 h-10' src={user.image} alt="profile" />
                
                            <div className='flex flex-col text-[2.4vw]'>
                                <span className='font-semibold text-gray-800'>@{user.username?.trim().toLocaleLowerCase()}</span>
                                
                            </div>
                        </div> 
                    </Link>
                    : 
               
                    
                    <Link href="/login">
                        <button className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 hover:text-white hover:border-transparent'>Login</button> 
                     </Link>
                }
        </div> 
    </div>
  )
}

export default MdNav