import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { itemContext } from "../context/ItemContext"
import { ICollections } from "../types/ICollections"
import { modalContext } from "../context/ModalContext"
import { collectionContext } from "../context/CollectionContext"
import { collectionRefContext } from "../context/CollectionRefContext"


export default function Create() {
    
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState<string>("")
        const [title, setTitle] = useState<string>("")
        const [description, setDescription] = useState<string>("")
        const [content, setContent] = useState<string>("")
        const [contentType, setContentType] = useState<string>("")
        const {data: session} = useSession()
        const router = useRouter()
        const user = session?.user
        const {addItem} = useContext(itemContext)
        const {modal, setModal} = useContext(modalContext)
        const collection = modal.payload
        const {collectionRef, setCollectionRef} = useContext(collectionRefContext)
        
        const handleSubmit = (e:React.SyntheticEvent) => {

            e.preventDefault()
            if(title) {
                const haveItems:boolean = collection.items ? true : false 
                const randomInt = Math.random() * 10000000000000
                const _key = randomInt.toString()
                const itemInfo = {_type: "item", author: user, text: title, description, content, _key, contentType}
             
                
                if(collection.items) {
                    const items = [itemInfo, ...collectionRef.items]
                    setCollectionRef({...collectionRef, items})
                } else {
                    setCollectionRef({...collectionRef, items: [itemInfo]})
                }
                addItem(itemInfo, collection, collection._id, haveItems)
                setModal(!modal)
            } else {
                setError("Name, hashtags or image were not given")
            }
           
        }
        useEffect(() => {
            if(error) {
                setTimeout(() => {
                    setError("")
                }, 2000)
            }
        }, [error])
       
      return (
     
            <div className='rounded-sm flex justify-center items-center text-center mx-[40px] flex-col sm:m-10'>
           
                        <h1 className='font-semibold text-center text-2xl text-black'>Create a new collection</h1>
                    <form className='w-[170%] flex flex-col justify-center items-center border-[1px] border-gray-300 p-10 rounded-md mt-3 sm:w-[100%]' onSubmit={handleSubmit}>
     
     
                            {error &&
                                <p className='w-fit transition bg-red-600 p-2 my-2 text-white rounded-lg shadow-sm'>
                                    {error}
                                </p>
                            }
               
               
                        <div className="flex flex-col w-[120%]">
                            <p className='my-2 text-gray-500 self-start'>Item Name: </p>
                            <input
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-[100%] border-[1px] border-gray-300 rounded-sm shadow-sm outline-none p-1 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' type="text" placeholder='Whats your collection name?' />
                            
                            <p className='my-2 text-gray-500 self-start '>Description: </p>
                            <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-[100%] border-[1px] border-gray-300 rounded-sm shadow-sm outline-none p-1 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' placeholder='Whats your collection about?' />
        
                            <p className='my-2 text-gray-500 self-start '>Content: </p>
                            <input
                            onChange={(e) => setContent(e.target.value)}
                            className='w-[100%] border-[1px] border-gray-300 rounded-sm shadow-sm outline-none p-1 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' type="text" placeholder='Whats your collection about?' />

                            <p className='my-2 text-gray-500 self-start '>Content Type: </p>
                            <select onChange={(e) => setContentType(e.target.value)} value={contentType}> 
                                <option value="github">Github</option>
                                <option value="youtube">Youtube Video</option>
                                <option value="spotify">Spotify</option>
                                <option value="img">Image url</option>
                                <option value="link">Link</option>
                            </select>
        
                            <button className='mt-5 py-1 bg-in bg-indigo-500 rounded-sm shadow-sm text-white hover:bg-indigo-600'>Create</button>

                        </div>
                    </form>
     
           
            </div>
      )
}

// export async function getStaticPaths () {
//     let collections:any
//     await client.fetch(`*[_type == "collection"]`).then((res) => {
//         collections = res
//     })
//     const paths = collections.map((coll:ICollections) => ({
//         params: {id: coll._id}
//     }))


//     return {
//         paths,
//         fallback: true
//     }
// }   

// export async function getStaticProps ({params}:Params) {
//     const id = params.id
//     let collection:any
//     await client.fetch(`*[_id == "${id}"]`).then((res) => {
//         collection = res[0]
//     })
//     return {
//         props: {
//             id,
//             collection
//         },
//     }
// }