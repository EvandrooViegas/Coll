
import axios from "axios"
import { useEffect, useState } from "react";
import linkPreviewGenerator from "link-preview-generator"
import { ILink } from "../types/ILink";
import ReactLoading from 'react-loading';
import Link from "next/link";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";


export default function LinkPreview({ url }:any) {
  const [link, setLink] = useState<ILink | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string>()
  useEffect(() => {
    const getLinkInfo = async () =>  {
      const tempLink:any = {}
      setIsLoading(true)
      const res = await axios.post("/api/link/preview", {url})
      setIsLoading(false)
      tempLink.image = res.data.response.images[0]
      tempLink.title = res.data.response.title
      tempLink.siteName = res.data.response.siteName
      tempLink.description = res.data.response.description.toLocaleLowerCase().slice(0, 70) + "..."
      tempLink.url = res.data.response.url
      tempLink.favicons = res.data.response.favicons[0]
      setLink(tempLink)
    }

    getLinkInfo()
  }, [url])
// pass the link directly
  
  return (
    <div className="flex">
      <a href={url} target="_blank" rel="noreferrer">
        <div>
          {isLoading && 
          <div className='block m-auto p-10'>
            <ReactLoading type="balls" color="rgb(79 70 229)" height={50} width={50} />
          </div> 
          }

          {link && 
            <a href={link.url} target="_blank" rel="noreferrer">
              <div className="flex flex-col  justify-start border-[1px] border-gray-200 rounded-md p-5 hover:bg-neutral-100 hover:border-indigo-200">
                <h1 className="font-semibold text-xl">{link.title}</h1>
                <p className="text-gray-600 mt-3">{link?.description}</p>
                <img src={link?.image} className="rounded-md mt-3 w-[700px]" />
                <img src={link?.favicons} width={24} className="mt-3" />
              </div>
            </a>
          }

        </div>
      </a>
    </div>
  )
}
