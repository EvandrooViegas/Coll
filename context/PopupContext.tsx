import { createContext, useState } from "react";


interface IProps {
    children: React.ReactNode
}

const initialValue = {
    popup: {
        isOpen: false,
        type: "",
        text: "",
        payload: ""
    }, 

    setPopup: () => {}
}

interface IPopup {
        isOpen: boolean,
        type?: string,
        text?: string,
        payload?: any
}

interface IPopContext {
    popup: {
        isOpen: boolean,
        type?: string,
        text?: string,
        payload?: any
    }

    setPopup: (newState:IPopup) => void
}

export const popupContext = createContext<IPopContext>(initialValue)

export const PopupContextProvider = ({children}:IProps) => {
    const [popup, setPopup] = useState<IPopup>(initialValue.popup)

    return (
        <popupContext.Provider value={{popup, setPopup}}>
            {children}
        </popupContext.Provider>
    )
}