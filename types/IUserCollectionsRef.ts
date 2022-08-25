import { Context, Dispatch, SetStateAction } from "react";
import { ICollectionRef } from "./ICollectionRef";
import { ICollections } from "./ICollections";

export interface IUserCollectionsRef {
    userCollectionsRef: ICollections[] | undefined
    setUserCollectionsRef: Dispatch<SetStateAction<ICollections[] | undefined>>
}