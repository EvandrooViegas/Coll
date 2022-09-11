import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { ICollectionRef } from "../types/ICollectionRef";
import { ICollections } from "../types/ICollections";


export const collectionRefContext = createContext<any>(null)
interface IProps {
    children: React.ReactNode
}




export const CollectionRefContextProvider = ({children}:IProps) => {
    //states
    const [collectionRef, setCollectionRef] = useState<ICollections>()

    return (
        <collectionRefContext.Provider
        value={{collectionRef, setCollectionRef}}
        >
            {children}
        </collectionRefContext.Provider>
    )
}
