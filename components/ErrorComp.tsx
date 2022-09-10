import React, { useEffect } from 'react'

interface IProps {
    error: string
}
function ErrorComp({error}:IProps) {


  return (
    <div className='w-fit bg-red-600 p-2  text-white rounded-lg shadow-sm' id='transition-bottom-up'>
        <p>{error}</p>
    </div>
  )
}

export default ErrorComp