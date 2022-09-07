import { createContext } from "react";

export const fallowContext = createContext<any>(null)

interface IProps {
    children: React.ReactNode
}

export const FallowContextProvider = ({children}:IProps) => {
    const fallow = (uid:string) => {

    }

    const unFallow = (uid:string) => {

    }


    return (
        <fallowContext.Provider value={{fallow, unFallow}}>
            {children}
        </fallowContext.Provider>
    )
}