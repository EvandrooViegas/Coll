import { ICollectionStored } from './ICollectionStored';

import { IUser } from './IUser';
import { IItems } from './IItems';
import { ILikes } from './ILikes';
import { IComment } from './IComment';


export interface ICollections {
    private: boolean
    author: IUser, 
    hashtags: string[],
    text: string,
    _id: string,
    description?: string,
    stored?: ICollectionStored[],
    image?: string,
    likes?: ILikes[],
    items?: IItems[],
    _createdAt: string
    comments?: IComment[] 
}