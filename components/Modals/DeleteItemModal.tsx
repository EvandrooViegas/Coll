import React, { useContext } from 'react'
import { modalContext } from '../../context/ModalContext'
import { IItems } from '../../types/IItems'
import Content from '../Content'
import Item from '../Item'
import ReactLoading from 'react-loading';

interface IProps {
  isLoading: boolean
}
function Ok_Cancel({isLoading}:IProps) {
    const {modal, setModal} = useContext(modalContext)
    const item:IItems = modal.payload

    console.log(item.text)
  return (
    <div className='flex flex-col items-center justify-center rounded-lg'>
      <div className='flex flex-col items-center justify-center gap-10 my-5'>
        {item &&
        
          <div className='flex justify-center'> 
            <Item item={item} showReactions={false} />
          </div>
        }

          <div className='flex gap-4'> 
              <button  className={`
              ${isLoading && "bg-red-500 hover:text-white hover:border-transparent border-transparent text-white"}
              flex justify-center items-center gap-2 px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-red-500 hover:text-white hover:border-transparent`} 
                onClick={() => setModal({isOpen: true, res: true, element: undefined, reach: "item", payload: item})}>
                  Delete
                  {isLoading && 

                    <ReactLoading type="spin" width={20} height={20} />
                  }
              </button>

              

              <button  className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 hover:text-white hover:border-transparent'
               onClick={() => setModal({isOpen: false, res: false, element: undefined})}>
                Cancel
              </button>
          </div>
      </div>
      

    </div>
  )
}

export default Ok_Cancel