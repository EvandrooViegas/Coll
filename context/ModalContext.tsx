import { createContext, useState, Dispatch, SetStateAction } from "react";
interface IProps {
    children: React.ReactNode
}

interface IModal {
    isOpen: boolean,
    element?: React.ReactElement | null
    res?: any | undefined
    payload?: any
    reach?: any
}       

interface IModalContext {
    modal: IModal
    setModal: (newState: IModal|any) => void
}

const initialValue = {
    modal: {isOpen: false},
    setModal: () => {}
}


export const modalContext = createContext<IModalContext>(initialValue)
export default function ModalContextProvider ({children}:IProps) {
    const [modal, setModal] = useState<IModal>(initialValue.modal)
    return (
        <modalContext.Provider value={{modal, setModal}}>
            {children}
        </modalContext.Provider>
    )
}