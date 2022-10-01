
import { createContext, useContext } from "react";
import * as jwt from "jsonwebtoken"
import { IUser } from "../types/IUser";
import { client } from "../utils/sanityClient";
import useAuthStore from "../store/authStore";
import Axios from "axios"
import { signOut } from "next-auth/react";
import { resolve } from "path";
import { modalContext } from "./ModalContext";
import { popupContext } from "./PopupContext";
import { popTypes } from "../utils/popUtils";

export const userContext = createContext<any>(null)

export const UserContextProvider = ({children}:any) => {

    const {user, addUser} = useAuthStore()
    const {setPopup, popup} =   useContext(popupContext)
    const {setModal} = useContext(modalContext)
    const registerUser = async (userObj:IUser) => {
        const p = new Promise((resolve, reject) => {
            const q = `*[_type == "user" && email == "${userObj.email}"]`
            const res:any =  client.fetch(q).then(res => {
                if(res.length > 0 ? true : false) {
                    reject("Email in use")
                } else {
                    client.create(userObj).then(() => {
                        addUser(userObj)
                    })
                    resolve("Logged successfully")
                }
            })
        })

        p.then((res:any) =>  {
            setPopup({
                isOpen: true,
                text: res,
                type: popTypes.success
            })
        }).catch((msg) => {
            setPopup({
                isOpen: true,
                text: msg,
                type: popTypes.error
            })
        })
    }

    const loginUser = async (email:string, password:string) => {
        
        const q = `*[_type == "user" && email == "${email}" && password == "${password}"]`
        const res:any =  client.fetch(q).then(res => {
            const userExist = res.length > 0 ? true : false
            console.log(userExist)
            console.log(res)
            if(userExist) {
                setPopup({
                    isOpen: true,
                    text: "Logged Successfully",
                    type: popTypes.success
                })
                addUser(res[0])
                setModal({
                    isOpen: false
                })
            } else {
                setPopup({
                    isOpen: true,
                    text: "Invalid Email or password",
                    type: popTypes.error
                })
            }
        })

    }

    
    const getOrCreateUser = async (user:any) => {
        try {   
            if(user) {
                const pretendedUser = await client.createIfNotExists(user).then((res:any) => {
                    addUser(res)
                    signOut()
                })
            }

        } catch (error:any) {
            console.log(error.message)
        }
    }

    const getSingleUser = async (id:string) => {
        const q = `*[_type == "user" && _id == "${id}"]`
        const res = await client.fetch(q)
        return res[0]
    }


 
    return (
        <userContext.Provider value={{
            registerUser,
            getSingleUser,
            loginUser,
            getOrCreateUser
        }}>
            {children}
        </userContext.Provider>
    )
}
