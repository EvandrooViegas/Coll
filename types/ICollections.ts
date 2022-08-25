
import { IUser } from './IUser';
import { IItems } from './IItems';

export interface ICollections {
    private: boolean
    author: IUser, 
    hashtags: string,
    text: string,
    _id?: string,
    description?: string,
    image: string
    items?: IItems[]
}