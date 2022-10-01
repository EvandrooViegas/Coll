
import {useState, useEffect} from "react"
import useAuthStore from '../store/authStore'
import { ICollections } from '../types/ICollections'
import { client } from '../utils/sanityClient'
import ItemCardCollectionInfoCard from '../components/ItemCardCollectionInfoCard'
import UserCollectionStatus from '../components/UserCollectionStatus'
 

interface IProps {
  data: ICollections[]
}
export default function Home ({data}:IProps)  {
    const [collections, setCollections] = useState(data)
    const {user} = useAuthStore()

    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])
    if(!hasMounted) {
        return null
    }

  return (
    <div className='flex flex-col'>
      <div className='self-center my-10'>
        <div className='flex flex-col items-center justify-center'>
          <div className=' md:w-[150%] justify-between flex items-center gap-20 p-4 bg-gray-200 rounded-lg'>
            <div>
              <span className='font-semibold'>Hello!</span> {user?.username}
            </div>

    
            <div>
              <img 
                src={user?.image}
                className="rounded-full w-10 h-10"
              />
            </div>

          </div>

          <div className='w-full'>
            <UserCollectionStatus
              user={user}
            />
          </div>
        </div>
      </div>
        <div className='flex flex-col gap-10 mx-2 md:mx-20'>
          {collections.map(collection => (
            <div
              key={collection._id}
              className="mb-10 flex flex-col gap-20"
            > 
              {collection.items?.map(item => (
                <ItemCardCollectionInfoCard
                  key={item._key}
                  collection={collection}
                  setCollections={setCollections}
                  item={item}
                />
              ))}

             
            </div>
          ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const collections:ICollections[] = await client.fetch(`*[_type == "collection" && private != true] | order(_createdAt desc)`)
  const data = collections
  return {
    props: {
      data
    },
    revalidate: 8
  }
}