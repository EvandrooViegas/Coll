import { createContext, useState } from "react";
interface IProps {
    children: React.ReactNode
}
export const modalContext = createContext<any>(false)

export default function ModalContextProvider ({children}:IProps) {
    const [modal, setModal] = useState<any>({isOpen: false, element: null, res:undefined, payload: undefined})
    return (
        <modalContext.Provider value={{modal, setModal}}>
            {children}
        </modalContext.Provider>
    )
}