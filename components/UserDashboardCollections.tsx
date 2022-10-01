import React from 'react'
import { ICollections } from '../types/ICollections'
import Collection from './Collection'

interface IProps {
    filtredCollections: ICollections[]
    search: string
    collections: ICollections[]
    setCollections: any
    favoriteCollections?: ICollections[]
    showUserCollections: boolean
}
function UserDashboardCollections({
    favoriteCollections,
    filtredCollections,
    search,
    collections,
    setCollections,
    showUserCollections
}:IProps) {
  return (
    <div>
        {
        filtredCollections.length > 0 || filtredCollections.length == 0 && search 
        ?
        
        <div className='flex flex-col items-center justify-center'> 
            <h1 className='p-2 font-semibold text-gray-800'>Found Collections: </h1>
            {filtredCollections?.map((collection:ICollections) => {
                
                return (
                <div className='flex justify-center flex-wrap' key={collection._id}>
                    <Collection setCollections={setCollections} collections={collections} collection={collection}  showEdits={true} showReactions={false} />
                </div>
                )
            })}
        </div>
        :
        <div className='flex justify-center m-10 gap-10 flex-wrap'> 

            {showUserCollections 
                ?
            
                collections?.map((collection:ICollections) => {
                    return (
                    <Collection 
                        setCollections={setCollections} 
                        collections={collections} 
                        collection={collection} 
                        key={collection._id} 
                        showEdits={true} 
                        showReactions={false} 
                    />
                    )
                })

                :
                favoriteCollections?.map((collection:ICollections) => {
                    return (
                    <Collection 
                        setCollections={setCollections} 
                        collections={collections} 
                        collection={collection} 
                        key={collection._id} 
                        showEdits={false} 
                        showReactions={false} 
                    />
                    )
                })
        
        
            }


        </div> 
    }
        </div>
  )
}

export default UserDashboardCollections