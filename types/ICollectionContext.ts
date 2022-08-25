import { ICollections } from "./ICollections"
import { IUser } from "./IUser"

export interface ICollectionContext {
    getCollections: () => void 
    getUserCollections: (author: IUser) => Promise<any>
    getSingleCollection: () => void
    createCollection: (collection:ICollections) => void 
    deleteCollection: () => void 
    updateCollection: () => void 
    getUserRealtimeCollections: (author: IUser) => Promise<any>
}