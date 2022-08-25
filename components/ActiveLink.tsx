import { useRouter } from 'next/router'
import Link from "next/link"
import { useEffect, useState } from 'react'
function ActiveLink({ children, href }:any) {
    const router = useRouter()
 
    const style = {
      marginRight: 10,
      color: router.asPath === href ? 'rgb(79 70 229)' : 'black',
    }
  const handleClick = (e:any) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style} >
      {children}
    </a>
  )
}

export default ActiveLink