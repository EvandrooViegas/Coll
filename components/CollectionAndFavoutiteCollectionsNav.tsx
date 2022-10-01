import React from 'react'

interface IProps {
    showUserCollections?: boolean, 
    setShowUserCollections?: any
}
function CollectionAndFavoutiteCollectionsNav({showUserCollections, setShowUserCollections}:IProps) {
  return (
    <div className='mt-10'>
        <div className='flex gap-10 border-b-[1px]'>
            <div
                onClick={() => {
                    setShowUserCollections(true)
                }}
                className="flex flex-col cursor-pointer"
            >
                <span>Collections</span>
                {showUserCollections &&
                <div className='w-full h-[4px] rounded-md bg-black'>

                </div>
                }
            </div>
            

            <div
                onClick={() => {
                    setShowUserCollections(false)
                }}
                className="flex flex-col cursor-pointer"
            >
                <span>Favorite Collections</span>
                
                {!showUserCollections &&
                <div className='w-full h-[4px] rounded-md bg-black'>

                </div>
                }  
            </div>
        
        </div>

         
    </div> 
  )
}

export default CollectionAndFavoutiteCollectionsNav