import { ICollections } from "./ICollections"

export interface IUser {
    password?: string 
    username?: string, 
    favoriteCollections: string[]
    name?: string
    email: string,
    image: string,
    uid: string
    _id: string
    _type: string
} 