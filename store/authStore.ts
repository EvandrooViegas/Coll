import { persist } from 'zustand/middleware';
import { IUser } from './../types/IUser';
import create from "zustand"


interface State {
    user: IUser | null, 
    addUser: (userObj:IUser) => any
    removeUser: () => void

}

const authStore = (set:any) => (<State>{
    user: null,
    addUser: (userObj:IUser) => set({user: userObj}),
    removeUser: () => set({user: null})
})


const useAuthStore = create(
    persist(authStore, {
        name: "auth"
    })
)


export default useAuthStore