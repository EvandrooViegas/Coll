import Link from 'next/link'
import React from 'react'
import {FaPoo} from "react-icons/fa"
import { RiUserLine } from 'react-icons/ri'
import { TbBookmarkOff, TbInboxOff } from 'react-icons/tb'
interface IProps {
    type: string
}
function NotFound({type}:IProps) {
  return (
    <div>
        {type == "items" &&
            <div className='flex flex-col w-fit text-2xl'>
                <TbInboxOff className='self-center'/>
                <div>
                    No Items!
                </div>
            </div>
        }

        {type == "collections" &&
            <div className='flex flex-col w-fit text-2xl'>
                <TbBookmarkOff className='self-center'/>
                <div>
                    No Collections Found!
                </div>

                
            </div>
        }

        {
            type == "users" &&

            <div className='flex flex-col w-fit text-2xl'>
                <RiUserLine className='self-center'/>
                <div>
                    No Users Found!
                </div>

                
            </div>
        }
    </div>
  )
}

export default NotFound