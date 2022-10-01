import axios from "axios";
import { createContext, ReactNode, useState, Dispatch } from "react";
import { ICollectionRef } from "../types/ICollectionRef";
import { ICollections } from "../types/ICollections";


interface IProps {
    children: React.ReactNode
}
interface ICollectionRefContext {
    collectionRef: ICollections | null,
    setCollectionRef: any
}


const initialValue = {
    collectionRef: null,
    setCollectionRef: () => {}
}

export const collectionRefContext = createContext<ICollectionRefContext>(initialValue)


export const CollectionRefContextProvider = ({children}:IProps) => {
    //states
    const [collectionRef, setCollectionRef] = useState(initialValue.collectionRef)

    return (
        <collectionRefContext.Provider
        value={{collectionRef, setCollectionRef}}
        >
            {children}
        </collectionRefContext.Provider>
    )
}
