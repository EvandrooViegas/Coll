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
            <div>
                <YouTube videoId={videoId} opts={opts} />
            </div>
        )}

        {contentType == "spotify" && (
            <div>
                <SpotifyPlayer
                uri={item.content}
                size={size}
                view={view}
                theme={theme}
                />
             
            </div>
        )}

        {contentType == "img" && (
            <img src={item.content} alt="" className='object-cover rounded-sm w-max[90%] h-max[90%]' />
        )}

        {contentType == "link" && (
            <div>  
                <LinkPreview url={item.content} />
            </div>
        )}

        {contentType == "github" &&  (
            <div>
                <Github repo={repo} />
            </div>
        )}
    </div>
  )
}

export default Content