import { Dispatch, SetStateAction } from 'react';
import { ICollections } from './ICollections';
export interface ICollectionRef {
    setCollectionRef: Dispatch<SetStateAction<any>>,
    collectionRef: ICollections | undefined
}