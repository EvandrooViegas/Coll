import { useRouter } from 'next/router'
import Link from "next/link"
import { useEffect, useState } from 'react'
function ActiveLink({ children, href }:any) {
    const router = useRouter()
 
    const style = {
      marginRight: 10,
      color: router.asPath === href ? 'rgb(79 70 229)' : 'black',
      border: ""
    }

    const barStyle = {
      position: "absolute",
      bottom: "0px",
      backgroundColor: router.asPath === href ? "rgb(79 70 229)" :  "transparent",
      width: "5vw",
      height: "0.7vh",
      borderRadius: "10px 10px 0 0"
  }
  const handleClick = (e:any) => {

    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style} >
      <div className='flex flex-col items-center'>
            <div style={barStyle}></div>
            <div>
              {children}
            </div>
        </div>
    </a>
  )
}

export default ActiveLink