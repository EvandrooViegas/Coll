import axios from "axios";
import { createContext, ReactNode, useContext } from "react";
import { IconBase } from "react-icons";
import { ICollectionContext } from "../types/ICollectionContext";
import { ICollections } from "../types/ICollections";
import { IUser } from "../types/IUser";
import { client } from "../utils/sanityClient";
import { collectionRefContext } from "./CollectionRefContext";
import { popupContext } from "./PopupContext";

export const collectionContext = createContext<ICollectionContext | any>(null)


interface IProps {
    children: React.ReactNode
}

//functions 

//get collections

const getCollections = async () => {
    const res = await client.fetch(`*[_type == 'collection']`)
    return res
}

const getUserCollections = async (author:IUser) => {
    if(author) {
        const res = await client.fetch(`*[_type == 'collection' && author._id == '${author._id}']`);
        return res
    }
}

const getSingleCollection = async (id:string) => {
    try {
        const res = await client.fetch(`*[_type == 'collection' && _id == '${id}']`)

        return res[0]
    } catch (error:any) {
        console.log(error.message)
    }
}

//add collection
const createCollection = async (collection:ICollections, user:IUser) => {
    const author = user
    try {
        const res = await axios.post(`/api/collection/create`, {collection, author})
    } catch (error) {
        console.log(error)
    }
    
}

//delete collection
const deleteCollection = () => {

}

//update collection
const updateCollection = () => {

}

const likeCollection = async (id:string, user:IUser, like:boolean, setCollection:any, collection:ICollections) => {


    var res;

    if(like) {
        console.log("Like")
        res = 
        await client 
        .patch(id)
        .setIfMissing({likes : []})
        .insert('after', 'likes[-1]', [
            {
                _key: Math.random() * 100000,
                user: user._id
            }
        ])
        .commit()
        

    } else {
        console.log("Dislike")
        res = 
        await client 
        .patch(id)
        .unset([`likes[user=="${user._id}"]`])
        .commit()
    }


    setCollection(res)
    return res


}

const getUserRealtimeCollections = async (author:IUser) => {
     if(author) {
        const query = `*[_type == 'collection' && author.email == '${author.email}']`

        const subscription = client.listen(query)
        .subscribe((update) => {
            const collection = update.result 
            return collection
        })
     } else {
        new Error("No user found")
     }
}

const CollectionContextProvider = ({children}:IProps) => {
    
    return (
        <collectionContext.Provider
        value={{likeCollection, getCollections, getUserCollections, getSingleCollection, createCollection, deleteCollection, updateCollection, getUserRealtimeCollections}}
        >
            {children}
        </collectionContext.Provider>
    )
}

export default CollectionContextProvider
