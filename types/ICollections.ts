
import { IUser } from './IUser';
import { IItems } from './IItems';
import { ILikes } from './ILikes';


export interface ICollections {
    private: boolean
    author: IUser, 
    hashtags: string,
    text: string,
    _id?: string,
    description?: string,
    image: string,
    likes?: ILikes[],
    items?: IItems[]
}