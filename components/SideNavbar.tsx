import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import {MdLogout} from "react-icons/md"
import {HiOutlineHome, HiOutlineCollection} from "react-icons/hi"
import {RiCompass3Line} from "react-icons/ri"
import logo from "../public/logo/black-letter.png"
import Image from 'next/image'
import {DiEnvato} from "react-icons/di"
import {HiOutlineLogout} from "react-icons/hi"
import ActiveLink from './Links/ActiveLinkMd'

import { IUser } from '../types/IUser'
import LgNav from './Navabars/LgNav'
import MdNav from './Navabars/MdNav'
import useAuthStore from '../store/authStore'



function SideNavbar() {
    const {user, removeUser} = useAuthStore() 
    
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])
    if(!hasMounted) {
        return null
    }



  return (

    <div>

        <div className='z-[100] h-[7vh] fixed flex flex-row justify-around bg-white items-center 
        border-[1.3px] border-gray-200 bottom-0 left-0 right-0 p-2 w-[100vw] md:z-[100] md:h-[100vh]
         md:w-[13vw] md:flex md:flex-col md:justify-between'>
        <div>


            
                <div className='hidden md:flex'>
                    <LgNav />
                </div>
                
                <div className='flex md:hidden'>
                    <MdNav />
                </div>
            

             
            
               
        </div>  
    </div>
    </div>

  )
}

export default SideNavbar