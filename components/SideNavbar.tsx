import Link from 'next/link'
import React from 'react'
import {MdLogout} from "react-icons/md"
import {HiOutlineHome, HiOutlineCollection} from "react-icons/hi"
import {RiCompass3Line} from "react-icons/ri"
import logo from "../public/logo.png"
import Image from 'next/image'
import {DiEnvato} from "react-icons/di"
import { signIn, signOut, useSession } from 'next-auth/react'
import {HiOutlineLogout} from "react-icons/hi"
import ActiveLink from './ActiveLink'
function SideNavbar() {

    const {data: session} = useSession()
    const user = session?.user
 
  return (
    // <div className='sticky top-0 bottom-0 flex h-[100vh] flex-col justify-between items-center border-[1px] border-gray-200 p-6'>
    <div>
        <div className='fixed flex flex-row justify-around bg-white items-center border-[1.3px] border-gray-200 bottom-0 left-0 right-0 p-2 w-[100vw] md:h-[100vh] md:w-[8vw] md:flex md:flex-col md:justify-between'>
            <div className='hidden md:flex'>
                    <ActiveLink href="/">
                            <div className='font-semibold text-2xl md:mt-10'>
                                <DiEnvato className='text-black transition cursor-pointer duration-100 hover:text-indigo-600'/>
                            </div>
                    </ActiveLink>
            </div>
            
    
                <div className='hidden md:flex flex-col h-[20%] justify-around items-center'>
                    <ActiveLink href="/">
                        
                        <div>
                            <span className='text-xl'>
                                <HiOutlineHome />
                            </span>
                    
                        </div>
                    </ActiveLink>
                    <ActiveLink href="/collections">
                        <div>
                            <span className='text-xl'>
                                <HiOutlineCollection />
                            </span>
                    
                        </div>
                    </ActiveLink>
                    <ActiveLink href="/discover">
                        <div>
                            <span className='text-xl'>
                                <RiCompass3Line />
                            </span>
                        
                        </div>
                    </ActiveLink>
                </div>
                

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

        
            
    
            <div>
                {
                    user ?
                    <div className='flex items-center md:flex-col'>
                    {/* // <div className='flex flex-col items-center gap-1'> */}
                        <Image className='rounded-full object-cover' width={40} height={40} src={`https://res.cloudinary.com/demo/image/fetch/${session.user?.image}`} alt="profile" />
                        <button onClick={() => signOut()} className='text-lg text-black hover:text-red-600'>
                            <HiOutlineLogout />
                        </button>
                    </div> : 
                    <div>
                        <button onClick={() => signIn()} className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 hover:text-white hover:border-transparent'>Login</button>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default SideNavbar