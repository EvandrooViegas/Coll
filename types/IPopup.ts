import { Dispatch, SetStateAction } from "react";

export interface IPopup {
    setPopup: Dispatch<SetStateAction<{
        isOpen?: boolean;
        type?: string;
        text?: string;
    }>>

    popup: {
        isOpen?: boolean;
        type?: string;
        text?: string;
    } 
} 