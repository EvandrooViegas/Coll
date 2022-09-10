import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiOutlineCollection, HiOutlineHome, HiOutlineLogout } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'
import { RiCompass3Line } from 'react-icons/ri'
import useAuthStore from '../../store/authStore'
import ActiveLinkLg from '../Links/ActiveLinkLg'
import Logo from '../Logo'

function LgNav() {
    const {user, removeUser} = useAuthStore()
  return (
    <div className='flex flex-col justify-between h-[100vh] p-3'>

        <Logo />
        <div className='hidden md:flex flex-col h-[20%] justify-around items-center'>
            <ActiveLinkLg href="/">
                
                <div>
                    <span className='text-xl'>
                        <HiOutlineHome />
                    </span>
            
                </div>
            </ActiveLinkLg>
            <ActiveLinkLg href="/collections">
                <div>
                    <span className='text-xl'>
                        <HiOutlineCollection />
                    </span>
            
                </div>
            </ActiveLinkLg>
            <ActiveLinkLg href="/discover">
                <div>
                    <span className='text-xl'>
                        <RiCompass3Line />
                    </span>
                
                </div>
            </ActiveLinkLg>
        </div> 

        <div className='full  p-0'>
                {user ?
           
                    <div className='flex flex-col  items-center bg-neutral-100 absolute bottom-0 left-0 right-0 p-4'
                    
                        style={{
                            borderRadius: "25px 25px 0 0"
                        }}
                    >
                    
                        <img className='rounded-full object-cover w-11 h-11' src={user.image} alt="profile" />
             
                        <div className='flex flex-col text-sm'>
                            <span className='font-semibold text-gray-800'>@{user.username?.trim().toLocaleLowerCase()}</span>
                        </div>

                        <div>
                            <button onClick={removeUser}>
                                <MdLogout />
                            </button>
                        </div>
                    </div> 
                    : 
               
                    
                    <Link href="/login">
                        <button className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 hover:text-white hover:border-transparent'>Login</button> 
                     </Link>
                }
        </div> 
    </div>
  )
}

export default LgNav