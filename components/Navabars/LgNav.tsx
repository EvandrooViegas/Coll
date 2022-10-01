import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useRef, useEffect, useContext} from 'react'
import { HiLogin, HiOutlineCollection, HiOutlineHome, HiOutlineLogout } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'
import { RiCompass3Line, RiHeart2Line } from 'react-icons/ri'
import { TbMessageCircle2 } from 'react-icons/tb'
import { collectionRefContext } from '../../context/CollectionRefContext'
import useAuthStore from '../../store/authStore'
import { ICollections } from '../../types/ICollections'
import { IUser } from '../../types/IUser'
import { BASE_URL } from '../../utils/BASE_URL'
import { client } from '../../utils/sanityClient'
import Collection from '../Collection'
import CollectionErrorImage from '../CollectionErrorImage'
import ActiveLinkLg from '../Links/ActiveLinkLg'
import Logo from '../Logo'

function LgNav() {
    const {user, removeUser} = useAuthStore()

    const router = useRouter()
    const {collectionRef} = useContext(collectionRefContext)
    const currentCollection = `${BASE_URL}/collection/${router.query?.id}`
    const collectionPath = `${BASE_URL}/collection/${collectionRef?._id}`
    const isOnCollection = collectionRef && currentCollection == collectionPath
  return (
    <div className='flex flex-col justify-between h-[100vh] p-3 bg-white'>

        <div className='flex flex-col items-center justify-center'>
            <Link href={"/"}>
                <Logo width={50} />
            </Link>
         
        </div>
        <div className='hidden font-semibold md:flex flex-col h-[20%] gap-7 justify-center items-center'>
            <ActiveLinkLg href="/home">
                
                <div>
                    <span className='text-xl'>
                        <HiOutlineHome />
                    </span>

                
            
                </div>
            </ActiveLinkLg>
            <ActiveLinkLg href="/collections">
                <div className=''>
                    <span className='text-xl'>
                        <HiOutlineCollection />
                    </span>

                 
            
                </div>
            </ActiveLinkLg>
            <ActiveLinkLg href="/discover">
                <div className=''>
                    <span className='text-xl'>
                        <RiCompass3Line />
                    </span>

                
                </div>
            </ActiveLinkLg>
        </div> 

        {
            isOnCollection &&
            <CurrentCollection 
                collectionRef={collectionRef}
            /> 
        }


        <div className='flex full  p-0'>
                {user ?
           
                    
                    <div className='cursor-pointer flex flex-col  items-center bg-neutral-100 absolute bottom-0 left-0 right-0 p-4'
                        style={{
                            borderRadius: "25px 25px 0 0"
                        }}
                    >
                
                        <Link href={`/user/${user._id}`}>
                            <img className='rounded-full object-cover w-11 h-11' src={user.image} alt="profile" />
                        </Link> 
            
                    

                        <div className='mt-1'>
                            <button onClick={() => {
                                router.push("/")
                                removeUser()
                            }}>
                                <MdLogout />
                            </button>
                        </div>
                    </div>
                    : 
               
                    
                    <Link href="/login">
                        <button className='m-auto mb-2 text-xl p-3  border-[0.6px] border-gray-300 rounded-full'>
                            <HiLogin />
                        </button> 
                     </Link>
                }
        </div> 
    </div>
  )
}


function CurrentCollection({collectionRef}:{
    collectionRef: ICollections
}) {
   
    return (
        <div className='flex flex-col items-center'>
            
            <div className='rounded-full h-20 w-20'>
                <CollectionErrorImage
                    image={collectionRef.image}
                />
            </div>
            <p>{collectionRef.text.length > 10 ? collectionRef.text.slice(0, 10) + "..." : collectionRef.text}</p>

            <div className='flex flex-col items-center gap-1'>
                <div className="flex flex-col items-center gap-0 mt-8">

                    <span>
                        <RiHeart2Line className='text-red-400' />
                    </span>
                    <span>
                        {collectionRef.likes?.length}
                    </span>
                </div>

                <div className="flex flex-col items-center gap-0 mt-2">

                    <span>
                        <TbMessageCircle2 className='text-blue-400'/>
                    </span>
                    <span>
                        {collectionRef.comments?.length}
                    </span>
                </div>
            </div>
        </div>
        
    )
}

export default LgNav