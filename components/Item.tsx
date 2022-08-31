import React from 'react'
import { IItems } from '../types/IItems'
import Author from './Author'
import Content from './Content';
import Reactions from './Reactions';
import { useSession } from 'next-auth/react';
import { ICollections } from '../types/ICollections';
interface IProps {
  item: IItems
  showReactions?: boolean
}
function Item({item, showReactions}:IProps) {

  if(showReactions == undefined) {
    showReactions = true
  }
  const {data: session} = useSession()
  const user = session?.user
  
  let isAImage:any
  const checkIsImage = async (url:string) =>
    isAImage = new Promise((resolve) => {
    const img = new (Image as any)(url);
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  })

  const anotherRandomFunction = () => {
    isAImage.then((a:any) => {
      return a
    })
  }

  checkIsImage(item.content)
  anotherRandomFunction()



  const getContentType =  () => {
    let contentType:string
    if(item.content.includes("youtube")) {
      contentType = "youtube"
    }
    else if (item.content.includes("spotify")) {
      contentType = "spotify"
    }

    else if (item.content.includes("github")) {
      contentType = "github"
    }

    else if (isAImage) {
      contentType = "img"
    }
    else {
        contentType = "link"
    }
    return contentType
  }

  const contentType = getContentType()


    return ( 
      <div className='flex justify-start flex-col m-[15px] p-2 w-[120%]'>
        <Author author={item.author} showFallow={true} />
        <h1 className='font-semibold text-lg my-3'>{item.text}</h1>
        <p className='m-1'>{item.description}</p>
        <div>
          {item.content && (
            <Content contentType={contentType} item={item} />
          )}
          {user && item.author.email == user.email && showReactions &&
            <div className='opacity-100 transition w-[10%]'> 
                <Reactions canDelete={true} canUpdate={true} func="deleteItem" item={item}/>
            </div>
          }
  
        </div>
    </div> 
    )
  
}

export default Item