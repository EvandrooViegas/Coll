import React from 'react'

interface IProps {
    error: string
}
function ErrorComp({error}:IProps) {
  return (
    <p className='w-fit bg-red-600 p-2  text-white rounded-lg shadow-sm' id='transition-bottom-up'>
        {error}
    </p>
  )
}

export default ErrorComp