import axios from "axios";
import { createContext, ReactNode, useContext } from "react";
import { IconBase } from "react-icons";

import { ICollections } from "../types/ICollections";
import { IComment } from "../types/IComment";
import { IItems } from "../types/IItems";
import { IUser } from "../types/IUser";
import { client } from "../utils/sanityClient";
import { collectionRefContext } from "./CollectionRefContext";
import { popupContext } from "./PopupContext";


interface ICollectionContext {
    getCollections: () => Promise<ICollections>
    getUserCollections: (author:IUser) => Promise<ICollections[]>
    getSingleCollection: (id:string) => Promise<ICollections>
    createCollection: (collection:ICollections | any, user:IUser) => void
    deleteCollection: (id:string) => void
    updateCollection: (collectionId:string, collectionInfo:any) => void
    addComment:  (collection:ICollections, author:IUser, comment:string) => void
    deleteComment:  (commentId:string, collection:ICollections) => void
    editComment:  (collection:ICollections, comment:IComment, newComment:IComment) => void
    likeCollection:  (id:string, user:IUser, like:boolean, collection:ICollections) => void
    addOrRemoveFavoriteCollection: (collectionId:string, userObj:IUser) => void
    getUserFavoriteCollections: (userId:string) => Promise<ICollections[]>
    addItemToCollection: (item:IItems, collections:ICollections[]) => any
}

interface IProps {
    children: React.ReactNode
}


const initialValue = {
    
    getCollections: async () => {
        const res = await client.fetch(`*[_type == 'collection']`)
        return res
    },

    getUserFavoriteCollections: async (userId?:string) => {
        const getCollection = async (id:string) => {
            const q = `*[_type == "collection" && _id == "${id}"]`
            const res = await client.fetch(q) 
            return res[0]

        }


        var collectionList:ICollections[] = []

        const userRes = await client.fetch(`*[_type=="user" && _id == "${userId}"]`)
        const user:IUser = userRes[0]

        if(user.favoriteCollections) {
            await Promise.all(user.favoriteCollections.map(async (collectionId) => {
             
                const res = await getCollection(collectionId)
                if(res) {
                    collectionList.push(res)
                }

            }))

        }
        return collectionList

        
      
    },

    getUserCollections: async (author:IUser) => {
        if(author) {
            const res = await client.fetch(`*[_type == 'collection' && author._id == '${author._id}']
            |
            order(_createdAt desc)
            `);
            return res
        }
    },

    getSingleCollection: async (id:string) => {
        try {
            const res = await client.fetch(`*[_type == 'collection' && _id == '${id}'] |
            order(_createdAt desc)
            `)

            return res[0]
        } catch (error:any) {
            console.log(error.message)
        }
    },

    //add collection
    createCollection: async (collection:any, user:IUser) => {
        try {
            await client.create(collection)
        } catch (error) {
            console.log(error)
        }
        
    },

    //delete collection
    deleteCollection: async (id:string) => {
        await client
        .delete({query: `*[_type == "collection" && _id == "${id}"]`})
    },

    //update collection
    updateCollection: async (collectionId:string, collectionInfo:any) => {
        await client
        .patch(collectionId)
        .set(collectionInfo)
        .commit()
    },

    //comments

    addComment: async (collection:ICollections, author:IUser, comment:string) => { 
        const newComment:IComment = {
            text: comment,
            author,
            id: (Math.random() * 1000000).toString()
        }  

        if(collection.comments) {
            await client
            .patch(collection._id)
            .set({
                ...collection,
                comments: [
                    ...collection.comments,
                    newComment
                ]
            })
            .commit()
        } else {
            await client
            .patch(collection._id)
            .set({
                ...collection,
                comments: [
                    newComment
                ]
            })
            .commit()
        }

    },


    deleteComment: async (commentId:any, collection:ICollections) => {

        var tempList:IComment[] = []
        collection.comments?.map((c) => {
            if(c.id !== commentId) {
                tempList.push(c)
            }

        })

        await client
        .patch(collection._id)
        .set({
            collection,
            comments:tempList
        })
        .commit()


    },

    editComment: async (collection:ICollections, comment:IComment, newComment:IComment) => {
        const id = comment.id
        var tempList:IComment[] = []
        collection.comments?.map((c) => {
            if(c.id == comment.id) {
                c.text = newComment.text
            }
            tempList.push(c)

        })
        
        await client
        .patch(collection._id)
        .set({
            ...collection,
            comments: tempList
        })
        .commit()
    },

    //likes
    likeCollection: async (id:string, user:IUser, like:boolean, collection:ICollections) => {
        
        var tempList: any[] = []
   
        if(like) {
            tempList = collection.likes?.filter(like => like.user != user._id) || []
        } else {
            tempList = [
                ...tempList,
                {
                    _key: Math.random() * 100000,
                    user: user._id
                }
            ]
        }

        await client
        .patch(id)
        .set({
            ...collection,
            likes: tempList
        })
        .commit()


     


    },

    //favorite Collections 
    addOrRemoveFavoriteCollection: async (collectionId:string, userObj:IUser) => {
        const res:IUser[] = await client.fetch(`*[_type == "user" && _id == "${userObj?._id}"]`)
        const user = res[0]
        const alreadyAddedCollection = user.favoriteCollections?.filter(coll => coll == collectionId).length > 0 
        ? true 
        : false

        if(!alreadyAddedCollection) {
        
            var tempList:ICollections["_id"][] 
            if(user.favoriteCollections) {
                tempList = [
                    ...user.favoriteCollections,
                    collectionId
                ]
            } else {
                tempList = [
                    collectionId
                ]
            }
            
        
            await client
            .patch(userObj!._id)
            .set({
                ...userObj,
                favoriteCollections: tempList
            })
            .commit()
            .then(res => console.log(res))
            .catch(res => console.log(res))


        } else {
            var tempList:ICollections["_id"][] = user.favoriteCollections.filter(coll => coll !== collectionId)
            
        
            await client
            .patch(userObj!._id)
            .set({
                ...userObj,
                favoriteCollections: tempList
            })
            .commit()
            .then(res => console.log(res))
            .catch(res => console.log(res))
 
            

        }
        
    },
    
    addItemToCollection: async (itemInfo:IItems, collections:ICollections[]) => {
        const item = {...itemInfo, _key: (Math.random() * 1000000).toString()}
        await Promise.all(
            collections.map(async (collection) => {
                var tempList: IItems[] = []
                if(collection.items) {
                    tempList = [
                        item,
                        ...collection.items
                    ]
                } else {
                    tempList = [
                        item
                    ]
                }
                
                await client
                .patch(collection._id)
                .set({
                    ...collection,
                    items: tempList
                })
                .commit()

    
            })
        )
        
    }

}

export const collectionContext = createContext<ICollectionContext>(initialValue)





const CollectionContextProvider = ({children}:IProps) => {
    
    return (
        <collectionContext.Provider
            value={{
                ...initialValue
            }}
        >
            {children}
        </collectionContext.Provider>
    )
}

export default CollectionContextProvider
