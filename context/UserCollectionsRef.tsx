import { useSession } from "next-auth/react";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { ICollectionRef } from "../types/ICollectionRef";
import { ICollections } from "../types/ICollections";
import { IUserCollectionsRef } from "../types/IUserCollectionsRef";
import { collectionContext } from "./CollectionContext";
export const userCollectionRef = createContext<any | null>(null)

interface IProps {
    children: React.ReactNode
}
export const UserCollectionRefProvider = ({children}:IProps) => {
    const [userCollectionsRef, setUserCollectionsRef] = useState<ICollections[]>()
    const {getUserRealtimeCollections} = useContext(collectionContext)
    const {data: session} = useSession()
    const user = session?.user

    return (
        <userCollectionRef.Provider value={{userCollectionsRef, setUserCollectionsRef}}>
            {children}
        </userCollectionRef.Provider>
    )
}