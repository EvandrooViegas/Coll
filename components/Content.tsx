import React, { useEffect, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { IItems } from '../types/IItems';

// @ts-ignore
import SpotifyPlayer from 'react-spotify-player';
import Link from 'next/link';
import Image from 'next/image';
import Github from './ContentTypes/Github';
import axios from 'axios';
import LinkPreview from './ContentTypes/LinkPreview';


interface IProps {
    contentType: string
    item: IItems
}
function Content({item}:IProps) {
 
    const contentType = item.contentType
    
    const [repo, setRepo] = useState<any>()
    const getRepo = async () => {
        let repoName = item.content.split("/")[3]

        await axios.get(`https://api.github.com/users/${repoName}/repos`)
        .then((res:any) => setRepo(res.data))
        
    
    }
    let isAImage:any
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'
    const videoUrl = item.content
    const videoId:string = videoUrl.split("=")[1]

    const size = {
        width: '100%',
        height: "400px",
    };
    const opts: YouTubeProps['opts'] = {
        minHeight: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

 


    useEffect(() => {
        if(contentType == "github") {
            getRepo()
        }
    }, [contentType])



  return (
    <div className='h-full w-full'>
        {contentType == "youtube" && (
            <div className='w-full h-full'>
                <YouTube videoId={videoId} opts={opts} />
            </div>
        )}

        {contentType == "spotify" && (
            <div className='w-full h-full'>
                <SpotifyPlayer
                    uri={item.content}
                    size={size}
                    view={view}
                    theme={theme}
                />
             
            </div>
        )}

        {contentType == "img" && (
            <img src={item.content} alt="" className='object-cover rounded-sm  w-full h-full' />
        )}

        {contentType == "link" && (
            <div className='w-full h-full'> 
                <LinkPreview url={item.content} />
            </div>
        )}

        {contentType == "github" &&  (
            <div className='w-full h-full'>
                <Github repo={repo} />
            </div>
        )}


    </div>
  )
}

export default Content