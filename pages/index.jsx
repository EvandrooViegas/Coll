import { useRouter } from 'next/router'
import {useEffect} from "react"
import React from 'react'
import useAuthStore from '../store/authStore'
import Logo from "../components/Logo"
import Divider from "../components/Divider"
import Link from 'next/link'
import {BiRightArrowAlt} from "react-icons/bi"

export default function Index() {
    const {user} = useAuthStore()
    const router = useRouter()
    useEffect(() => {
   
        if(user) {
            router.push("/home")
        }
    }, [])
  return (
    <div>
        <Navbar />  
        <Divider />
        <Hero />
    </div>
  )
}

function Navbar () {
    return (
        <div className="w-screen flex justify-between p-6">
            <Logo />
            <div>
                <button className='bg-indigo-600 p-2 rounded-lg text-white font-semibold shadow-md'>
                    <Link href="/login">       
                        Sign Up
                    </Link>
                </button>
            </div>
        </div>
    )
}

function Hero() {
    return (
        <div className='flex flex-col gap-8 items-center'>
            <div className='m-auto mt-10 border-[1px] border-gray-200 rounded-lg p-4'>
                <h1 className='flex flex-col items-center font-semibold text-[15vw]'>
                        <span>
                            Welcome to 
                        </span>

                    <span className='text-indigo-600'>
                        {" "} Coll
                    </span>
                </h1>
            </div>

            <div>
                <Link href="/login">       
                    <button className='flex items-center justify-around bg-indigo-600 p-2 rounded-lg text-white font-semibold shadow-md 
                    w-[15vw]
                    '>

                            Sign Up
                        <span>  
                            <BiRightArrowAlt className='text-2xl' id='left-right'/>
                        </span>
                    </button>
                </Link>
            </div>

        </div>
    )
}
