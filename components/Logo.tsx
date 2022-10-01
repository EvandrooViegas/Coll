import Image from 'next/image'
import React, {useState} from 'react'
import { GrAnchor } from 'react-icons/gr'
import ActiveLink from './Links/ActiveLinkMd'
import {FiCodesandbox} from "react-icons/fi"
interface IProps {
  width?: number 
}
function Logo({width}:IProps) {
    const [isHover, setIsHover] = useState(false)
  return (



        <FiCodesandbox
        className='text-black hover:text-indigo-700 cursor-pointer'
        style={{
            fontSize: width ? width : "30px",
        }} 
        
        onMouseOver={() => setIsHover(true)}
        />

  

  )
}

export default Logo