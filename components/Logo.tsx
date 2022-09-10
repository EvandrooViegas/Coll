import Image from 'next/image'
import React, {useState} from 'react'
import { GrAnchor } from 'react-icons/gr'
import ActiveLink from './Links/ActiveLinkMd'

function Logo() {
    const [isHover, setIsHover] = useState(false)
  return (
    <ActiveLink>


        <GrAnchor style={{
            fontSize: "30px",
        }} 
        
        onMouseOver={() => setIsHover(true)}
        />

    </ActiveLink>

  )
}

export default Logo