import { useRouter } from 'next/router'
import React, {Dispatch, useState} from 'react'
import Author from '../../components/Author'
import CollectionMap from '../../components/CollectionMap'
import NotFound from '../../components/NotFound'
import Searchbar from '../../components/Searchbar'
import { ICollections } from '../../types/ICollections'
import { IUser } from '../../types/IUser'
import { client } from '../../utils/sanityClient'

interface IProps {
    search: string,
    data: {
        collections: ICollections[]
        users: IUser[]
    }
}
export default function Search({search, data}:IProps) {
    const [showCollections, setShowCollections] = useState(true)
    const router = useRouter()
    const handleSearch= () => {
        router.push(`/search/${searchValue}`)
    }
    console.log(data)
   const [searchValue, setSearchValue] = useState<string>("")

  return (
    <div className='mx-10 md:mx-40 mt-10'>
        <div className='flex flex-col gap-20'>
            <h2 className='text-center  font-semibold text-4xl'>
                Results for: 
                <span className='text-indigo-700'>
                    {" "}{search}
                </span>
            </h2>

            <Searchbar
                search={searchValue}
                setSearch={setSearchValue}
                handleSearch={handleSearch}
                
            />
            
            <NavbarSection
                setShowCollections={setShowCollections}
                showCollections={showCollections}
            />

            
            
                
                    
                    
            <div className='flex flex-col gap-4 w-full'>
            
                {
                    showCollections ? 
                    
                    (
                        data.collections.length > 0 ?
                        <CollectionMap 
                            collections={data.collections}
                        /> 
                        :
                        <div className='m-auto'>
                            <NotFound 
                                type='collections'
                            />
                        </div>
                        
                    ) : 
                    (
                        data.users.length > 0 ?
                        data.users?.map(user => (

                            <div
                                key={user._id}
                            >
                                <Author 
                                    author={user}
                                />
                            </div>

))
                            :
                            <div className='m-auto'>
                                <NotFound 
                                    type='users'
                                />
                            </div>
                    )
                }

            
            </div>
                    
    
                
            
            
        </div>
    </div>
  )
}

function NavbarSection ({setShowCollections, showCollections}: {
    setShowCollections:Dispatch<React.SetStateAction<boolean>>, showCollections:boolean
}) {
    return (
        <div className='flex gap-10 border-b-[1px]'>
            <div
                onClick={() => {
                    setShowCollections(true)
                }}
                className="flex flex-col cursor-pointer"
            >
            <span>Collections</span>
                {showCollections &&
                    <div className='w-full h-[4px] rounded-md bg-black'>

                    </div>
                }
            </div>
                            

            <div
                onClick={() => {
                    setShowCollections(false)
                }}
                className="flex flex-col cursor-pointer"
            >
                <span>Users</span>
                
                {!showCollections &&
                    <div className='w-full h-[4px] rounded-md bg-black'>

                    </div>
                }  
            </div>
                            
        </div>
    )
}


export async function getServerSideProps({params}: {
    params: any
}) {
    const search = params.search
    const dataUsers: IUser[] = await client.fetch("*[_type == 'user']")
    const dataCollections:ICollections[] = await client.fetch("*[_type == 'collection']")

    const tempList:{
        users:IUser[]
        collections: ICollections[]
    } = {
        users: [],
        collections: []
    }


    dataUsers.map(user => {
        if(user.username?.toLowerCase().includes(search.toLowerCase())) {
            console.log(user.username)
            tempList.users.push(user)
        }
    }) || null

    dataCollections.map(collection => {
        if(collection.text?.toLowerCase().includes(search.toLowerCase()) || collection.description?.toLowerCase().includes(search.toLowerCase())) {
            tempList.collections.push(collection)
        }

    }) || null

    return {
        props: {
            search,
        
            data: tempList
        }
    }

}
