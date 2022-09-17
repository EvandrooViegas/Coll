
import React, { FormEvent, FormEventHandler, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { collectionContext } from '../../context/CollectionContext'
import { popupContext } from '../../context/PopupContext'
import useAuthStore from '../../store/authStore'
import { popTypes } from '../../utils/popUtils'
import ReactLoading from "react-loading"
import { modalContext } from '../../context/ModalContext'


export default function CreateCollectionModal({setCollections}:any) {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<string>("")

    const [hashtags, setHashtags] = useState<string>()
    const [hashtagsArr, setHashtagsArr] = useState<any>([])
    const hashtagsColors = ["#5063f2", "#594ddb", "#4dc6db"]


    const [isPrivate, setIsPrivate] = useState<any>()
    const {user} = useAuthStore()
    const router = useRouter()
    const {createCollection, getUserCollections} = useContext(collectionContext)
    
    const {popup, setPopup} = useContext(popupContext)
    const {modal, setModal} = useContext(modalContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    

    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if(title && hashtagsArr && image) {
            if(title.length <= 35) {
            
                const collectionInfo = {
                    _type: "collection", 
                    author: user,
                    text: title,
                    description,
                    image, 
                    hashtags: hashtagsArr?.map((h:any) => {
                        return h.text
                    }), 
                    private: isPrivate
                }

                
                try {
                    setPopup({isOpen: true, text: "Collection created successfully!", type: popTypes.success})
                    await createCollection(collectionInfo, user)
                    const res = await getUserCollections(user)
                    setCollections(res)
                    setIsLoading(false)

                    setModal({
                        isOpen: false,
                        reach: null,
                        res: undefined,
                        element: null,
                        payload: undefined
                    })

                } catch (error) {
                    console.log(error)
                }
            } else {
                setError("The title is to big!")
            }
        } else {
            setError("Name, hashtags or image were not given")
        }
        
    }
    
    const addHashtag = (e:React.SyntheticEvent) => {
        e.preventDefault()
        setHashtagsArr([...hashtagsArr, {
            text: hashtags,
            color: hashtagsColors[Math.floor(Math.random() * hashtagsColors.length)],
            id: Math.random() * 100000
        }])
  
        setHashtags("")

    }
    useEffect(() => {
        if(error) {
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }, [error])



 

    return (
    <div className='w-[80vw] md:w-[60vw]'>

        <div className='flex justify-center items-center text-center m-[10px] flex-col'>
             
                <h1 className='font-semibold text-center text-2xl mt-2'>Create a new collection</h1>

                <form className='flex flex-col justify-center m-3 items-center p-5 rounded-md mt-3 md:w-[60%]' onSubmit={handleSubmit}>
 

                        {error &&
                            <p className='absolute top-10 w-fit transition bg-red-600 p-2 my-2 text-white rounded-lg shadow-sm' id='transition-bottom-up'>
                                {error}
                            </p>
                        }
            
            

                   <div>
                        <div className='flex flex-col'>
                            <p className='my-2 text-gray-500 self-start'>Collection Name: </p>
                            <input 
                            onChange={(e) => setTitle(e.target.value)}
                            className='transition border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' type="text" placeholder='Whats your collection name?' />
                            
                        </div>

                        <div className='flex flex-col'>
                            <p className='my-2 text-gray-500 self-start '>Description: </p>
                            <textarea 
                            onChange={(e) => setDescription(e.target.value)}
                            className='transition border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' placeholder='Whats your collection about?' />
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='my-2 text-gray-500 self-start '>Image: </p>
                            <input 
                            onChange={(e) => setImage(e.target.value)}
                            className='transition border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' type="text" placeholder='Whats your collection about?' />
                        </div>

                        <div className='flex flex-col'>
                            <p className='my-2 text-gray-500 self-start '>Hashtags: </p>

                            <form className='flex items-center justify-between'
                                onSubmit={addHashtag}
                            >
                                <input 
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value.trim())}
                                className='flex-1 transition  border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px]
                                 hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' 
                                 type="text" 
                                 />
                                
                                <button className='py-1 px-2 m-2 bg-indigo-600 text-white rounded-md'
                                onClick={addHashtag}>
                                    +
                                </button>
                            </form>

                            {hashtagsArr.length > 0 &&
                                <div  className="w-full flex bg-gray-100 mt-2 flex-wrap border-[1px] border-gray-200  max-h-[20vh] overflow-y-scroll rounded-md p-1">
                                {hashtagsColors.length > 0 &&
                                    hashtagsArr?.map((hashtag:{
                                        text: string,
                                        color: string
                                        id: number
                                    }) => (
                                            <span 
                                                key={Math.random() * 1000000} 
                                                onClick={() => {
                                                    setHashtagsArr(hashtagsArr?.filter((h:any) => h.id != hashtag.id))
                                                }}
                                                className="h-fit m-2 p-2 rounded-md text-gray-100 cursor-pointer"
                                                style={{
                                                    backgroundColor: hashtag.color
                                                }}
                                            >
                                                <p>#{hashtag.text}</p>
                                            </span>
                                    ))
                                }
                        
                                </div>
                            }
                        </div>

                   </div>
                    <div className='flex items-center gap-5'>
                        <span className='my-2 text-gray-500 '>Private: </span>
                        <input 
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className='transition  border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600'
                        type="checkbox" placeholder='Whats your collection about?' />
                    </div>

                   
                            {!isLoading ?
                                <button className='m-2 px-2 w-[70%] py-1 bg-in bg-indigo-500 rounded-sm shadow-sm text-white'>
                                    Create    
                                </button> :
                                <button className='flex justify-center items-center gap-3 m-2 px-2 w-[70%] py-1 bg-in bg-indigo-300 rounded-sm shadow-sm text-white' disabled>
                                        Creating
                                        <ReactLoading type="spin" width={20} height={20}/>    
                                   
                                </button>
                            }
                   

                </form>
        </div> 
    </div>
  )
}
