import React from 'react'

function DoneButton({text, size}:{text?:string, size?:number}) {
  return (
    <div>
        <button
            className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 hover:text-white hover:border-transparent'
        >
            {text ? text : "Done"}
        </button>
    </div>
  )
}

export default DoneButton