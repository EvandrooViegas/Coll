
import React, { FormEvent, FormEventHandler, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { collectionContext } from '../context/CollectionContext'
import { popupContext } from '../context/PopupContext'
import { popTypes } from '../utils/popUtils'
import { userContext } from '../context/UserContext'
import useAuthStore from '../store/authStore'
function Create() {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [hashtags, setHashtags] = useState<string>("")
    const [isPrivate, setIsPrivate] = useState<any>()
    const {user} = useAuthStore()
    const router = useRouter()
    const {createCollection} = useContext(collectionContext)
    const {popup, setPopup} = useContext(popupContext)
    const [error, setError] = useState<string>("")
    
    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault()
        if(title && hashtags && image) {
            let hstArr = hashtags.split(",")
            const collectionInfo = {_type: "collection", author: user, text: title, description, image, hashtags, private: isPrivate}
            
            try {
                setPopup({isOpen: true, text: "Collection created. Refresh the page to see your new collection", type: popTypes.success})
                createCollection(collectionInfo, user)
                router.push("/collections")
            } catch (error) {
                console.log(error)
            }
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
    <div className='w-full'>

        <div className='flex justify-center items-center text-center m-[10px] flex-col'>
             
                <h1 className='font-semibold text-center text-2xl'>Create a new collection</h1>
                <form className='flex flex-col justify-center w-full items-center  border-[1px] border-gray-300 p-5 rounded-md mt-3 md:w-[60%]' onSubmit={handleSubmit}>
 

                        {error &&
                            <p className='w-fit transition bg-red-600 p-2 my-2 text-white rounded-lg shadow-sm'>
                                {error}
                            </p>
                        }
            
            

                    <p className='my-2 text-gray-500 self-start'>Collection Name: </p>
                    <input 
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-[100%] transition border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' type="text" placeholder='Whats your collection name?' />
                      
                    <p className='my-2 text-gray-500 self-start '>Description: </p>
                    <textarea 
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-[100%] transition border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' placeholder='Whats your collection about?' />

                    <p className='my-2 text-gray-500 self-start '>Image: </p>
                    <input 
                    onChange={(e) => setImage(e.target.value)}
                    className='w-[100%] transition border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' type="text" placeholder='Whats your collection about?' />


                    <p className='my-2 text-gray-500 self-start '>#Hastags: </p>
                    <input 
                    onChange={(e) => setHashtags(e.target.value)}
                    className='w-[100%] transition  border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' type="text" placeholder='Whats your collection about?' />

                    <div className='flex items-center self-start gap-5'>
                        <span className='my-2 text-gray-500 '>Private: </span>
                        <input 
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className='transition  border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600'
                        type="checkbox" placeholder='Whats your collection about?' />
                    </div>



                    <button className='m-2 px-2 py-1 bg-in bg-indigo-500 rounded-sm shadow-sm text-white'>Create</button>
                </form>
        </div>
    </div>
  )
}

export default Create