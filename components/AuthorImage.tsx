import React from 'react'
interface IProps {
    img?:string
    width?:number
 
}

function AuthorImage({img, width}:IProps) {
  return (
    <img src={img} className="rounded-full" 
        width={width ? width : 90}
    />
  )
}

export default AuthorImage