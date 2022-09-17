import axios from "axios";
import { createContext, ReactNode, useContext } from "react";
import { IconBase } from "react-icons";
import { ICollectionContext } from "../types/ICollectionContext";
import { ICollections } from "../types/ICollections";
import { IComment } from "../types/IComment";
import { IUser } from "../types/IUser";
import { client } from "../utils/sanityClient";
import { collectionRefContext } from "./CollectionRefContext";
import { popupContext } from "./PopupContext";

export const collectionContext = createContext<ICollectionContext | any>(null)


interface IProps {
    children: React.ReactNode
}

//functions 

//get collections

const getCollections = async () => {
    const res = await client.fetch(`*[_type == 'collection']`)
    return res
}

const getUserCollections = async (author:IUser) => {
    if(author) {
        const res = await client.fetch(`*[_type == 'collection' && author._id == '${author._id}']
        |
        order(_createdAt desc)
        `);
        return res
    }
}

const getSingleCollection = async (id:string) => {
    try {
        const res = await client.fetch(`*[_type == 'collection' && _id == '${id}'] |
        order(_createdAt desc)
        `)

        return res[0]
    } catch (error:any) {
        console.log(error.message)
    }
}

//add collection
const createCollection = async (collection:any, user:IUser) => {
    try {
        await client.create(collection)
    } catch (error) {
        console.log(error)
    }
    
}

//delete collection
const deleteCollection = async (id:string) => {
    await client
    .delete({query: `*[_type == "collection" && _id == "${id}"]`})
}

//update collection
const updateCollection = async (collectionId:string, collectionInfo:ICollections) => {
    await client
    .patch(collectionId)
    .set(collectionInfo)
    .commit().then(res => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

//comments

const addComment = async (collection:ICollections, author:IUser, comment:string) => { 
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

}


const deleteComment = async (commentId:any, collection:ICollections) => {

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
    .then((err) => console.log("succ", err))
    .catch((err) => console.log("err", err))

}

const editComment = async (collection:ICollections, comment:IComment, newComment:IComment) => {
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
}   




//likes
const likeCollection = async (id:string, user:IUser, like:boolean, setCollection:any, collection:ICollections) => {


    var res;

    if(like) {
        console.log("Like")
        res = 
        await client 
        .patch(id)
        .setIfMissing({likes : []})
        .insert('after', 'likes[-1]', [
            {
                _key: Math.random() * 100000,
                user: user._id
            }
        ])
        .commit()
        

    } else {
        console.log("Dislike")
        res = 
        await client 
        .patch(id)
        .unset([`likes[user=="${user._id}"]`])
        .commit()
    }


    setCollection(res)
    return res


}



const getUserRealtimeCollections = async (author:IUser) => {
     if(author) {
        const query = `*[_type == 'collection' && author.email == '${author.email}']`

        const subscription = client.listen(query)
        .subscribe((update) => {
            const collection = update.result 
            return collection
        })
     } else {
        new Error("No user found")
     }
}

const CollectionContextProvider = ({children}:IProps) => {
    
    return (
        <collectionContext.Provider
        value={{deleteComment, editComment, addComment, likeCollection, getCollections, getUserCollections, getSingleCollection, createCollection, deleteCollection, updateCollection, getUserRealtimeCollections}}
        >
            {children}
        </collectionContext.Provider>
    )
}

export default CollectionContextProvider
