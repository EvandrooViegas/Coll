import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode } from "react";
import { ICollections } from "../types/ICollections";
import { IItems } from "../types/IItems";
import { client } from "../utils/sanityClient";

interface IProps {
    children: React.ReactNode
}

interface IItemContext  {
    getItems: () => void
    addItem: (item:IItems, collection:any, id:string, haveItems:boolean) => Promise<string>
    deleteItem: (id: string, collection: ICollections) => Promise<void>
    updateItem: (newItem: IItems, collection: ICollections) => Promise<void>
}

const initialValue = {

    getItems: () => {

    },

    addItem: async (item:IItems, collection:any, id:string, haveItems:boolean) => {


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


    },

    deleteItem: async (id:string, collection:ICollections) => {
    
        const filtredCollection = collection.items?.filter((item:IItems) => item._key !== id)

        try {
            await client
            .patch(collection._id!)
            .set({
                ...collection,
                items: [...filtredCollection!]
            })
            .commit();

        } catch (error:any) {
            console.log(error.message)
        }
        
    },

    updateItem: async (newItem:IItems, collection:ICollections) => {

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
}
export const itemContext = createContext<IItemContext>(initialValue)




export const ItemContextProvider = ({children}:IProps) => {

    return (
        <itemContext.Provider
        value={{...initialValue}}
        >
            {children}
        </itemContext.Provider>
    )
}
