import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode } from "react";
import { ICollections } from "../types/ICollections";
import { IItems } from "../types/IItems";
import { client } from "../utils/sanityClient";

export const itemContext = createContext<any>(null)
interface IProps {
    children: React.ReactNode
}

//functions 

//get collections
const getItems = () => {

}

//add collection
const addItem = async (item:any, collection:any, id:string, haveItems:boolean) => {


        try {
            if(haveItems) {
                const result = await client
                .patch(id)
                .set({
                    items: [item, ...collection.items]
                })
                .commit();
            } else {
                const result = await client
                .patch(id)
                .set({
                    items: [item]
                })
                .commit()

            }
            return "Item Created"
        } catch (error:any) {
            console.log(error.message)
            return "Error"
        }


}

//delete collection
const deleteItem = async (id:string, collection:ICollections) => {
 
    const filtredCollection = collection.items?.filter((item:any) => item._key !== id)

    try {
        await client
        .patch(collection._id!)
        .set({
        items: [...filtredCollection!]
        })
        .commit();

    } catch (error:any) {
        console.log(error.message)
    }
    
}

//update collection
const updateItem = async (newItem:IItems, collection:ICollections) => {

    const tempList:IItems[] = []
    console.log(newItem)
    collection.items?.map(i => {
        if(i._key == newItem._key){
            i = newItem
        }
        tempList.push(i)

    })

    await client
    .patch(collection._id)
    .set({
        ...collection,
        items: tempList
    })
    .commit()
    .then((res) => console.log(res))

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
