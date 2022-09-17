import React from 'react'
import { GrFormClose } from 'react-icons/gr'
import { IComment } from '../../types/IComment'
import Divider from '../Divider'
import {useState, useRef, useContext} from "react"
import ReactLoading from "react-loading"
import { collectionContext } from '../../context/CollectionContext'
import { ICollections } from '../../types/ICollections'
interface IProps {
  setModal: any
  commentRef?: IComment
  collection: ICollections
}
export default function EditCommentModal({setModal, commentRef, collection}:IProps) {
  const [comment, setComment] = useState(commentRef?.text)

  const [isUpdating, setIsUpdating] = useState(false)
  const {editComment} = useContext(collectionContext)
  const inputRef = useRef(null)
  const handleSubmit = async (e?:any) => {
    e.preventDefault()
    if(comment) {
      setIsUpdating(true)
      const text = comment
      const newComment:any = {
        ...commentRef,
        text
      }

      await editComment(collection, commentRef, newComment)
      setIsUpdating(false)
      setModal(false)
    }
  }
  return (
    <div className='flex items-center justify-center absolute w-full h-[100%] bg-black-rgba'
    >
      <div className='bg-white rounded-lg w-full p-10 m-10'>
        <div className='w-full'>
          <div
            className='flex justify-between w-full'
          >
            <h1 className='text-xl font-semibold text-gray-800'>Edit Comment</h1>
            <button
              onClick={() => setModal(false)}
            >
              <GrFormClose />
            </button>
          </div>
          <Divider />

          <form className='flex p-8 gap-4'
                onSubmit={handleSubmit}
          >
                <input 
                    type="text"
                    className='flex-1 rounded-md border-[1px] border-gray-200 bg-gray-100 g p-[12px] focus:border-indigo-700'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    ref={inputRef}
                />

                <button className='bg-indigo-600 p-1 text-white rounded-md px-2'
                    onClick={handleSubmit}
                >
                    {isUpdating ? 
                    
                        <div className='flex items-center justify-center gap-3'>
                            <span>
                                Editing
                            </span>
                            <ReactLoading type="spin" width={20} height={20}  />
                        </div> 
                            :

                        <span className='px-2'>
                            Edit
                        </span>
                    }
                </button>
              </form>
        </div>
      </div>
    </div>
  )
}

