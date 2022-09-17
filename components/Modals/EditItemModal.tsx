import React from 'react'
import { IItems } from '../../types/IItems'
import {useState, useRef, useEffect, useContext} from "react"
import { contentTypes } from '../../utils/contentType'
import ErrorComp from '../ErrorComp'
import ContentTypeItem from '../ContentTypeItem'
import ReactLoading from "react-loading"
import { itemContext } from '../../context/ItemContext'
import { collectionRefContext } from '../../context/CollectionRefContext'
import { collectionContext } from '../../context/CollectionContext'
import { modalContext } from '../../context/ModalContext'
type Props = {
    item: IItems
    setCollectionRef: any

}

export default function EditItemModal({item, setCollectionRef}:Props) {

    const [error, setError] = useState("")

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [title, setTitle] = useState<string>(item.text)
    const [description, setDescription] = useState<string>(item.description)
    const [content, setContent] = useState<string>(item.content)
    const [contentType, setContentType] = useState<string>(item.contentType)
    const {setCollectionRef:setCollection, collectionRef:collection} = useContext(collectionRefContext)
    const {setModal} = useContext(modalContext)
    const {getSingleCollection} = useContext(collectionContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const contentRef = useRef<any>()
    const {updateItem} = useContext(itemContext)
    const [selectedContent, setSelectedContent] = useState(
        contentTypes.filter(content => content.value == item.contentType)[0]
    )



    const handleSubmit = async (e:React.SyntheticEvent) => {

        e.preventDefault()
        if(title) {
            setIsLoading(true)
            const newItem = {
                ...item,
                text: title,
                description,
                content,
                selectedContent: selectedContent.value
            }
            await updateItem(newItem, collection)
    
            
            const res = await getSingleCollection(collection._id)
            console.log(res)
            setCollectionRef(res)
            setIsLoading(false)
            setModal({
                isOpen: false
            })

        } else {
            setError("Title were not given")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 3000)
        
    }, [error])
   
  return (
 
        <div className='rounded-sm flex justify-center items-center text-center m-[30px] flex-col sm:m-10'>
       
                        {error &&
                            <ErrorComp error={error} />
                        }
                <h1 className='font-semibold text-center text-2xl text-black'>Updated a Item</h1>
                <form className='transition flex flex-col justify-center items-center p-10 rounded-md mt-1' onSubmit={handleSubmit}>

           
                    <div className="transition flex flex-col">
                        <p className='my-2 text-gray-500 self-start'>Item Name: </p>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            className='transition w-[100%] border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' 
                            type="text" 
                            placeholder='Whats your collection name?'
                            value={title}
                        />
                        
                        <p className='my-2 text-gray-500 self-start '>Description: </p>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            className='transition resize-none w-[100%] border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' 
                            placeholder='Whats your collection about?' 
                            value={description}
                        />
    
                        {selectedContent.value != "any" && (
                            <>
                                                            
                                <p className='my-2 text-gray-500 self-start '>Content: </p>
                                <input
                                onChange={(e) => setContent(e.target.value)}
                                className='transition w-[100%] border-[1px] border-gray-200 rounded-sm shadow-sm outline-none p-2 hover:border-[1px] hover:border-indigo-600 focus:border-indigo-600 active:border-indigo-600' 
                                type="text" 
                                placeholder='Whats your collection about?' 
                                value={content}
                                />
                            
                            </>
                        )}



                        <p className='my-2 text-gray-500 self-start '>Content Type: </p>
                        
                        <div className="flex  justify-center gap-2 flex-wrap bg-gray-100 p-2 rounded-sm border-gray-200 border-[1px]">
                            {contentTypes.map(content => (
                                <ContentTypeItem key={content.id} content={content} selectedContent={selectedContent}>
                                    <div key={content.id} onClick={() => setSelectedContent(content)} className="flex flex-wrap text-sm justify-center items-center text-gray-800 gap-2">
                                        <span>{content.icon}</span>
                                        <p>{content.name}</p>
                                    </div> 
                                </ContentTypeItem>
                            ))}
                        </div>
                        


    
                        {isLoading  
                        
                        ?
                            <button className='flex justify-center items-center gap-3  mt-5 py-1  bg-indigo-500 rounded-sm shadow-sm text-white hover:bg-indigo-600' disabled id="disabled-button">
                                Loading
                                <ReactLoading type="spin" width={20} height={20} />
                            </button>
        
                        : 
                            <button className='w-[100px] self-center mt-5 py-1 bg-in bg-indigo-500 rounded-sm shadow-sm text-white hover:bg-indigo-600' onClick={handleSubmit}>
                                Update
                            </button>

                        }
                    </div>
                </form>
 
       
        </div>
  )
}
