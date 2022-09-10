import React, { useEffect } from 'react'
import { IItems } from '../types/IItems'
import Author from './Author'
import Content from './Content';
import Reactions from './Reactions';
import { useSession } from 'next-auth/react';
import { ICollections } from '../types/ICollections';
import useAuthStore from '../store/authStore';
interface IProps {
  item: IItems
  showReactions?: boolean
}
function Item({item, showReactions}:IProps) {

    var tempItem:IItems = 
    {...item, 
     text: item.text.length > 60 ? item.text.slice(0, 60) + "..." : item.text,
     description:item.description.length > 120 ? item.description.slice(0, 120) + "..." : item.description 
    }
    item = tempItem



  if(showReactions == undefined) {
    showReactions = true
  }

  const {user} = useAuthStore()
  
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
      <div className='flex items-start justify-start flex-col m-[15px] p-2 w-full'>
        <Author author={item.author} showFallow={true} />
        <h1 className='font-semibold text-lg my-3'>{item.text}</h1>
        <p className='m-1'>{item.description}</p>
        <div>
          <div>
              {item.content && (
               <Content contentType={contentType} item={item} />
              )}
          </div>
  
        </div>
          {user && item.author.email == user.email && showReactions &&
            <div className='opacity-100 transition'> 
                <Reactions canDelete={true} canUpdate={true} func="deleteItem" item={item}/>
            </div>
          }
    </div> 
    )
  
}

export default Item