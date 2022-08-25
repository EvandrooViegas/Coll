import { IUser } from './IUser';
export interface IItems {
    description: string
    author: IUser,
    contentType: string
    content: string,
    text: string
    _key?: string
    _type?: string
}