import React from 'react'
import { ICollections } from '../types/ICollections'
import Collection from './Collection'

interface IProps {
    collections?: ICollections[],
    setCollections?: any
}
function CollectionMap({collections, setCollections}:IProps) {
  return (
    <div className='w-full flex justify-center m-10 gap-10 flex-wrap'> 

            
                {collections?.map((collection:ICollections) => {
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
                })}

                
          
        
    
        </div> 
  )
}

export default CollectionMap