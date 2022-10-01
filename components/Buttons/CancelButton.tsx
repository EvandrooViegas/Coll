import React from 'react'

function CancelButton({text}:{text?:string}) {
  return (
    <div             
        className='px-2 py-1 rounded-sm transition shadow-lg border-[1px] border-black hover:bg-indigo-500 
                hover:text-white hover:border-transparent'
    >
        <button>{text ? text : "Cancel"}</button>
    </div>
  )
}

export default CancelButton