
import { createContext } from "react";
import * as jwt from "jsonwebtoken"
import { IUser } from "../types/IUser";
import { client } from "../utils/sanityClient";
import useAuthStore from "../store/authStore";
import Axios from "axios"
import { signOut } from "next-auth/react";
import { resolve } from "path";

export const userContext = createContext<any>(null)

export const UserContextProvider = ({children}:any) => {

    const {user, addUser} = useAuthStore()

    const registerUser = async (userObj:IUser) => {
        const p = new Promise((reject, resolve) => {
            const q = `*[_type == "user" && email == "${userObj.email}"]`
            const res:any =  client.fetch(q) 
            const userExists = res.length > 0 ? true : false
            if(userExists) {
                reject("Email in use")
            } else {
                resolve("Logged successfully")
                client.create(userObj).then(() => {
                    addUser(userObj)
                })
            }
        })

        p
        .then((res:any) =>  {
            return res    
            console.log(res)
        })
        .catch((msg) => {
            return msg
            console.log(msg)
        })
    }

    const loginUser = async (email:string, password:string) => {
        const p = new Promise((resolve, reject) => {
            const q = `*[_type == "user" && email == "${email}" && password == "${password}"]`
            const res:any =  client.fetch(q)
            const userExist = q.length > 0 ? true : false
      
            if(userExist) {
                resolve(res)
            } else {      
                reject("Invalid Email or password")
            }
            
        })

        p
        .then((res:any) => {
            addUser(res[0])
            // addUser(res)
        })
        .catch((msg) => {
            console.log(msg)
        })
    }

    
    const getOrCreateUser = async (user:any) => {
        try {   
            if(user) {
                const pretendedUser = await client.createIfNotExists(user).then((res) => {

                    addUser(user)
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
