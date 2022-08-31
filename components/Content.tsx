import React, { useEffect, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { IItems } from '../types/IItems';

// @ts-ignore
import SpotifyPlayer from 'react-spotify-player';
import Link from 'next/link';
import Image from 'next/image';
import Github from './Github';
import axios from 'axios';
import LinkPreview from './LinkPreview';



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
    const videoId = videoUrl.split("=")[1]
    const size = {
        width: '100%',
        height: 400,
    };
    const opts: YouTubeProps['opts'] = {
        height: '400px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };


    useEffect(() => {
        if(contentType == "github") {
            getRepo()
        }
    }, [contentType])



  return (
    <div>
        {contentType == "youtube" && (
            <YouTube videoId={videoId} opts={opts} />
        )}

        {contentType == "spotify" && (
            <>
                <SpotifyPlayer
                uri={item.content}
                size={size}
                view={view}
                theme={theme}
                />
             
            </>
        )}

        {contentType == "img" && (
            <img src={item.content} alt="" className='object-cover w-[100%] rounded-sm w-max[1400px] h-max[900px] ' />
        )}

        {contentType == "link" && (
            <>  
                <LinkPreview url={item.content} />
                {/* <LinkPreview url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" width='400px' /> */}
               
            </>
        )}

        {contentType == "github" &&  (
            <Github repo={repo} />
        )}
    </div>
  )
}

export default Content