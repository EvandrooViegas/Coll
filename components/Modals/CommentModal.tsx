import React, {useState, useContext, useRef} from 'react'
import { collectionContext } from '../../context/CollectionContext'
import { ICollections } from '../../types/ICollections'
import Divider from '../Divider'
import ReactLoading from "react-loading"
import useAuthStore from '../../store/authStore'
import Author from '../Author'
import { RiDeleteBinLine } from 'react-icons/ri'
import { BiPencil } from 'react-icons/bi'
import { IComment } from '../../types/IComment'
import EditCommentModal from './EditCommentModal'
import { TbSend } from 'react-icons/tb'

import Comment from "../Comment"

interface IProps {
    collection: ICollections
}




export default function CommentModal({collection: data}:IProps) {

    const [comment, setComment] = useState<string>("")
    const [collection, setCollection] = useState<ICollections>(data)

    const [commentRef, setCommentRef] = useState<IComment>()
    
    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [showModal, setShowModal] = useState<boolean>(false)

    const inputRef = useRef<any>(null)
    const {user} = useAuthStore()
    const {deleteComment, editComment, addComment, getSingleCollection} = useContext(collectionContext)


    

    const handleSubmit = async (e?:any, commentRef?:any) => {
        e?.preventDefault?.()

            if(comment) {
                setIsLoading(true)
       
                await addComment(collection, user, comment)
                const res = await getSingleCollection(collection._id)
                setCollection(res)
                setIsLoading(false)
                setComment("")
            }
   
    }
    const handleDelete = async (comment:IComment) => {
            setIsDeleting(true)
            await deleteComment(comment.id, collection)
            const res = await getSingleCollection(collection._id)
            setCollection(res)
            setIsDeleting(false)
    }


  return (
    <div className='flex flex-col justify-between absolute bottom-[7vh] right-0 bg-white md:bottom-0 h-[80vh] left-0 md:left-[30vw] md:h-[100vh]'>
        {showModal &&
        
            <EditCommentModal 
                setModal={setShowModal}
                commentRef={commentRef}
                collection={collection}
            />
        }

        <div className='flex flex-col justify-center m-6'>
            <h1 className='font-semibold text-2xl text-center'>
                Comments: 
            </h1>
            <div className='m-2 p-2'>
                <Divider />
            </div>

            <div className='self-center'>
                {isDeleting &&
                    <ReactLoading type="spin" width={30} height={30} color="rgb(79 70 229)" />
                }
            </div>
        </div>

        <div className='h-[70%] p-4 flex flex-col gap-4 items-center overflow-y-scroll overflow-x-hidden w-full'>
            {collection.comments?.map((comment:IComment) => (
                <Comment
                    comment={comment}
                    handleDelete={handleDelete}
                    setCommentRef={setCommentRef}
                    setShowModal={setShowModal}
                    key={comment.id}
                />
                // <div className='w-[80%] p-2 bg-gray-100 rounded-lg' key={comment.id}>
                   
                //     <div className='p-2'>
                //         <Author 
                //             author={comment.author}
                //         />
                //     </div>
                //     <div className='flex justify-between p-4'>
                //         <span>
                //             {comment.text}
                //         </span>

                //         <div className='flex items-center gap-2'>
                      

                //             {comment.author._id == user?._id &&
                //                 <>
                //                     <span
                //                         onClick={() => handleDelete(comment)}
                //                         className="flex items-center gap-2"
                //                     >
                //                 <span>
                //                     <RiDeleteBinLine className='text-black hover:text-red-500' />
                //                 </span>
        
                //                     </span>

                //                     <span
                //                         onClick={() => {
                //                             setCommentRef(comment)
                //                             setShowModal(true)
                             
                //                         }}
                //                     >
                //                         <BiPencil className='text-black hover:text-blue-700' />
                                    
                //                     </span>
                //                 </>
                //             }
                //             <span className='cursor-pointer hover:text-indigo-600'
                //                 onClick={() => handleAnswerComment(comment)}
                //             >
                //                 Answer
                //             </span>
                //         </div>
                //     </div>
          
                 
                // </div>
            )) }
        </div>


   

  
        <form className='flex p-4 shadow-lg gap-4'
            onSubmit={(e) => {

                handleSubmit(e)
            }}
        >
            <input 
                type="text"
                className='flex-1 rounded-md border-[1px] bg-neutral-100 p-[7px] focus:border-indigo-700'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ref={inputRef}
            />

            <button className='bg-indigo-600 p-1 text-white rounded-md px-2'
                onClick={() => {
                    handleSubmit()
                }}
            >
                {isLoading ? 
                
                    <div className='flex items-center justify-center gap-3'>
                        <span>
                            Commenting
                        </span>
                        <ReactLoading type="spin" width={30} height={30} />
                    </div> 
                        :

                    <span>
                        <TbSend />
                    </span>
                }
            </button>
        </form>
    
    </div>
  )
}

