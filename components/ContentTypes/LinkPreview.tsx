
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { ILink } from "../../types/ILink";
import ReactLoading from 'react-loading';
import Link from "next/link";
import {Img} from 'react-image'
import NoPreview from "../NoPreview";
import { popupContext } from "../../context/PopupContext";
import { popTypes } from "../../utils/popUtils";
import { BsLink45Deg } from "react-icons/bs";



export default function LinkPreview({ url }:any) {
  const [link, setLink] = useState<ILink | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string>()
  const {setPopup} = useContext(popupContext)
  const tempLink:any = {}
  useEffect(() => {
    const linkPromise = new Promise((resolve, reject) => {
        const getLinkInfo = async () =>  {
          setIsLoading(true)
          const res = await axios.post("/api/link/preview", {url}).then((res) => {
            resolve(res)
          }).catch(err => reject("A error occurred loading the link preview"))
          setIsLoading(false)
        }
        
        getLinkInfo()
      })
      
      linkPromise.then((res:any) => {

        tempLink.image = res.data.response?.images[0]
        tempLink.title = res.data.response.title.slice(0, 70) + "..."
        tempLink.siteName = res.data.response?.siteName
        tempLink.description = res.data.description ? res.data.response.description.toLocaleLowerCase().slice(0, 70) + "..." : ""
        tempLink.url = res.data.response.url
        tempLink.favicons = res.data.response?.favicons[0]

        setLink(tempLink)
    })

  }, [url])
// pass the link directly
  
  return (
    <div className="w-full min-h-full flex items-center">
      <Link href={url} target="_blank" rel="noreferrer">
        <div className="">
          {isLoading && 
          <div className='block m-auto p-10'>
            <ReactLoading type="balls" color="rgb(79 70 229)" height={50} width={50} />
          </div> 
          }

      
          {link ? 
            <a href={link.url} target="_blank" rel="noreferrer">
              <div className="flex flex-col  justify-start border-[1px] border-gray-200 rounded-md p-5 hover:bg-neutral-100 hover:border-indigo-200">
                <h1 className="font-semibold text-xl">{link.title}</h1>
                <p className="text-gray-600 mt-3">{link?.description}</p>
                <img src={link?.image} className="object-cover rounded-sm w-max[90%] h-max[90%]" />
                <img src={link?.favicons} width={24} className="mt-3" /> 
              </div>
            </a> : 
            <div className="bg-gray-200 p-2 rounded-lg w-[300px]">
              <a href={url} target="_blank" rel="noreferrer" className="flex gap-2">
                <BsLink45Deg className="hover:text-indigo-400 cursor-pointer" />
                <span>{url.length > 40 ? url.slice(0, 40)+ "..." : url}</span>
              </a>
            </div>
          }
        </div>
      </Link>
    </div>
  )
}
