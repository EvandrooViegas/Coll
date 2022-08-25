import Link from 'next/link'
import React from 'react'
import {FaPoo} from "react-icons/fa"
interface IProps {
    type: string
}
function NotFound({type}:IProps) {
  return (
    <div>
        {type == "items" &&
            <div className='flex flex-col w-fit text-2xl'>
                <FaPoo className='self-center text-amber-900'/>
                <div>
                    No Items!
                </div>
            </div>
        }

        {type == "collections" &&
            <div className='flex flex-col w-fit text-2xl'>
                <FaPoo className='self-center text-amber-900'/>
                <div>
                    No Collections!
                </div>

                <Link href="/create">
                    <button className='p-2 bg-indigo-500 transition duration-100 text-white w-fit m-auto my-4 rounded-sm hover:bg-indigo-600'>Add collection</button>
                </Link>
            </div>
        }
    </div>
  )
}

export default NotFound