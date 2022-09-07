import { useSession } from "next-auth/react";
import { createContext } from "react";
import * as jwt from "jsonwebtoken"
// eslint-disable-next-line react-hooks/rules-of-hooks
export const userContext = createContext<any>(null)

export const UserContextProvider = ({children}:any) => {
    const {data: session} = useSession()
    const userSession = session?.user
    
    const key = `${userSession?.email, userSession?.name}`
    const uid = jwt.sign({key}, "private")
    const user = {
        ...userSession,
        uid
    }

    return (
        <userContext.Provider value={{user}}>
            {children}
        </userContext.Provider>
    )
}
