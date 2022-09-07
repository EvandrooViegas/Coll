import { Dispatch, SetStateAction } from "react";
import { ICollections } from "./ICollections";

export interface IPopup {
    setPopup: Dispatch<SetStateAction<{
        isOpen?: boolean;
        type?: string;
        text?: string;
        payload: ICollections
    }>>

    popup: {
        isOpen?: boolean;
        type?: string;
        text?: string;
        payload: ICollections | null
    } 
} 