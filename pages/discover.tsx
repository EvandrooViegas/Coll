import React, {useState, useRef, useEffect} from 'react'
import { AiOutlineFire } from 'react-icons/ai'
import { FiTruck, FiZap } from 'react-icons/fi'
import Author from '../components/Author'
import Divider from '../components/Divider'
import Searchbar from '../components/Searchbar'
import { IUser } from '../types/IUser'
import { client } from '../utils/sanityClient'
import ReactLoading from "react-loading"
import CollectionInfo from '../components/CollectionInfo'
import { ICollections } from '../types/ICollections'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useAuthStore from '../store/authStore'
export default function Discover() {
  const [search, setSearch] = useState<string>("")
  const router = useRouter()
  const handleSearch = async () => {
    if(search) {
      router.push(`/search/${search}`)
    }
  }
  const {user} = useAuthStore()

  return (

    <div className="m-4 md:m-10">
        <div className='m-auto w-full md:w-[70%]'>
          <div>

            <Searchbar 
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          </div>

          <div className='my-10 w-[40%] m-auto'>
            <Divider />
          </div>

          <div className='m-auto w-[40%] md:w-full'>
            <Hero />
          </div>

          <div className='mt-10'>
            <Users />
          </div>

          <div className='mt-10'>
            <Collections />
          </div>
        </div>

      
    </div>
  )
}

function Hero() {
  return (
    <div> 
      <div className='flex justify-between mt-4'>
        <Link href="/discover/trending">
        
          <div className='flex items-center gap-0 md:gap-2 bg-neutral-100 p-3 cursor-pointer rounded-md hover:text-indigo-600'>
            <span>
              <AiOutlineFire />
            </span>

            <span className='hidden md:inline'>
              Trending
            </span>
          </div>
        </Link>

        <Link href="/discover/new">
          <div className='flex items-center gap-0 md:gap-2 bg-neutral-100 p-3 cursor-pointer rounded-md hover:text-indigo-600'>
            <span>
              <FiZap />
            </span>

            <span className='hidden md:inline'>
              New
            </span>
          </div>
        
        </Link>

          <Link href="/discover/big">
            <div className='flex items-center gap-0 md:gap-2 bg-neutral-100 p-3 cursor-pointer rounded-md hover:text-indigo-600'>
                <>
                  <span>
                    <FiTruck />
                  </span>

                  <span className='hidden md:inline'>
                    Big
                  </span>
                </>
            </div>
          </Link>
      </div>
    </div>
  )
}

export function Users() {
  const users = useRef<IUser[]>()
  const [loading, setLoading] = useState<boolean>()


  const getUsers = async () => {
    setLoading(true)
    const res:[] = await client.fetch("*[_type == 'user']")
    const tempList:[] = []
    res.map(user => {
     
        if(!(res.indexOf(user) > 2)) {
          tempList.push(user)
        }
    })
    users.current = tempList
    setLoading(false)

  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <h4 className='font-semibold text-xl'>
        Find Users!
      </h4>

        {!loading ? 
          users.current?.map(user => (
            <div
              key={user._id}

            >
              <Author 
                author={user}
              />
            </div>
          )) :
          <ReactLoading />
        }
    </div>
  )
}



export function Collections() {
  const collections = useRef<ICollections[]>()
  const [loading, setLoading] = useState<boolean>()


  const getCollections = async () => {
    setLoading(true)
    const res:[] = await client.fetch("*[_type == 'collection']")
    const tempList:[] = []
    res.map(user => {
     
        if(!(res.indexOf(user) > 2)) {
          tempList.push(user)
        }
    })
    collections.current = tempList
    setLoading(false)

  }

  useEffect(() => {
    getCollections()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <h4 className='font-semibold text-xl'>
        Find Collections!
      </h4>

        {!loading ? 
          collections.current?.map(collection => (
            <div
              key={collection._id}

            >
              <CollectionInfo 
                collectionInfo={collection}
              />
            </div>
          )) :
          <ReactLoading />
        }
    </div>
  )
}
