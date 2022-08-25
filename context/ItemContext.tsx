import axios from "axios";
import { createContext, ReactNode } from "react";
import { ICollections } from "../types/ICollections";

export const itemContext = createContext<any>(null)
interface IProps {
    children: React.ReactNode
}

//functions 

//get collections
const getItems = () => {

}

//add collection
const addItem = (item:any, collection:ICollections, id:string, haveItems:boolean) => {
    const res = axios.put("/api/item/create", {item, collection, id, haveItems})
    return res
}

//delete collection
const deleteItem = () => {

}

//update collection
const updateItem = () => {

}

export const ItemContextProvider = ({children}:IProps) => {

    return (
        <itemContext.Provider
        value={{getItems, addItem, deleteItem, updateItem}}
        >
            {children}
        </itemContext.Provider>
    )
}
