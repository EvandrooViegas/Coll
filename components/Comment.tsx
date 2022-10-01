import React from 'react'
import { BiPencil } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import useAuthStore from '../store/authStore'

import { IComment } from '../types/IComment'
import Author from './Author'

interface IProps {
    comment: IComment
    handleDelete: (comment:IComment) => void
    setCommentRef: any
    setShowModal: any
}
function Comment({comment, handleDelete, setCommentRef, setShowModal}:IProps) {
    const {user} = useAuthStore()
  return (
    <div className='w-[80%] p-2 bg-gray-100 rounded-lg' key={comment.id}>
                   
                    <div className='p-2'>
                        <Author 
                            author={comment.author}
                        />
                    </div>
                    <div className='flex justify-between p-4'>
                        <span>
                            {comment.text}
                        </span>

                        <div className='flex items-center gap-2'>
                      

                            {comment.author._id == user?._id &&
                                <>
                                    <span
                                        onClick={() => handleDelete(comment)}
                                        className="flex items-center gap-2"
                                    >
                                <span>
                                    <RiDeleteBinLine className='text-black hover:text-red-500' />
                                </span>
        
                                    </span>

                                    <span
                                        onClick={() => {
                                            setCommentRef(comment)
                                            setShowModal(true)
                             
                                        }}
                                    >
                                        <BiPencil className='text-black hover:text-blue-700' />
                                    
                                    </span>
                                </>
                            }
            
                        </div>
                    </div>
        
                 
    </div>
  )
}

export default Comment