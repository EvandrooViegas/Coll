import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext } from "react";
import { IconBase } from "react-icons";
import { ICollectionContext } from "../types/ICollectionContext";
import { ICollections } from "../types/ICollections";
import { IUser } from "../types/IUser";
import { client } from "../utils/sanityClient";
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
        const res = await client.fetch(`*[_type == 'collection' && author.email == '${author.email}']`);
        return res
    }
}

const getSingleCollection = async (id:string) => {
    try {
        const res = await client.fetch(`*[_type == 'collection' && _id == '${id}']`)
        console.log("fetched")
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
        value={{getCollections, getUserCollections, getSingleCollection, createCollection, deleteCollection, updateCollection, getUserRealtimeCollections}}
        >
            {children}
        </collectionContext.Provider>
    )
}

export default CollectionContextProvider
