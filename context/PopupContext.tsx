import { createContext, useState } from "react";
import {IPopup} from "../types/IPopup"
export const popupContext = createContext<any>(null)

interface IProps {
    children: React.ReactNode
}
export const PopupContextProvider = ({children}:IProps) => {
    const [popup, setPopup] = useState<IPopup["popup"]>({
        isOpen: false,
        type: "",
        text: "",
        payload: null,
    })

    return (
        <popupContext.Provider value={{popup, setPopup}}>
            {children}
        </popupContext.Provider>
    )
}       