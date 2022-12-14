import { IContentType } from '../types/IContentType';
import {BiBlock, BiLink} from "react-icons/bi"
import { BsGithub, BsImage } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';
import { TbBrandSpotify } from 'react-icons/tb';

export const contentTypes:IContentType[] = [
    {
        value: "any",
        id: Math.random() * 1000,
        name: "No Type",
        icon: <BiBlock />,
        color: "red"
    },

    {
        value: "link",
        id: Math.random() * 1000,
        name: "Link",
        icon: <BiLink />,
        color: "indigo"
    },

    {
        value: "github",
        id: Math.random() * 1000,
        name: "Github",
        icon: <BsGithub />,
        color: "black"
    },

    {
        value: "youtube",
        id: Math.random() * 1000,
        name: "Youtube",
        icon: <AiFillYoutube />,
        color: "red"
    },

    {
        value: "img",
        id: Math.random() * 1000,
        name: "Image",
        icon: <BsImage />,
        color: "yellow"
    },

    {
        value: "spotify",
        id: Math.random() * 1000,
        name: "Spotify",
        icon: <TbBrandSpotify/>,
        color: "green"
    },


]