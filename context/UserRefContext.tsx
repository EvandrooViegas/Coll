import { useSession } from "next-auth/react";
import { createContext, useState } from "react";
import * as jwt from "jsonwebtoken"
// eslint-disable-next-line react-hooks/rules-of-hooks
export const userRefContext = createContext<any>(null)

export const UserRefContextProvider = ({children}:any) => {
    
    const [userRef, setUserRef] = useState()
    return (
        <userRefContext.Provider value={{userRef, setUserRef}}>
            {children}
        </userRefContext.Provider>
    )
}
