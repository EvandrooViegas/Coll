/* eslint-disable react/jsx-no-comment-textnodes */
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { BsFacebook } from 'react-icons/bs'
import {FcGoogle} from "react-icons/fc"
import Link from "next/link"
import Error from "../components/ErrorComp"
import { userContext } from '../context/UserContext'
import Router, { useRouter } from 'next/router'
import { IUser } from '../types/IUser'
import axios from 'axios'
import useAuthStore from '../store/authStore'
import {signOut} from "next-auth/react"
import Image from 'next/image'
import LoginWithColl from '../components/Modals/LoginWithColl'
import { modalContext } from '../context/ModalContext'
import ReactLoading from "react-loading"
import jwt from "jsonwebtoken"
import { popupContext } from '../context/PopupContext'
import { popTypes } from '../utils/popUtils'
import Logo from '../components/Logo'
function Login() {
    const [username, setUsername] = useState<any>("")
    const [email, setEmail] = useState<any>("")
    const baseImg = "data:image/png;base64,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"
    const [img, setImg] = useState<any>(baseImg)
    const {setModal, modal} =   useContext(modalContext)
    const {setPopup, popup} =   useContext(popupContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")

    const {data:session} = useSession()
    const router = useRouter()
    const {getOrCreateUser, registerUser} = useContext(userContext)
    const {addUser} = useAuthStore()
    const {user} = useAuthStore()


    const authProviders = {
        nextAuth: "next-auth",
        coll: "coll"
    }

    useEffect(() => {
        if(user) {
            router.push("/home")
            console.log(user)
        }
    }, [user])

    useEffect(() => {
        if(img == "") {
            setImg(baseImg)
        }

    }, [img])

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 4000);
    }, [error])

    useEffect(() => {
        getSessionValues()
    }, [session?.user])
    
    const getSessionValues = async () => {
        if(session?.user) {
            login(session.user, authProviders.nextAuth) 
        }

    }

    const handleSubmit = (e?:any) => {
        e?.preventDefault()
        if(username && email && password) {
            if(username.length < 20) {
                if(email.includes("@")) {
                    const user = {
                        username,
                        email,
                        password, 
                        image: img
                    }
                    login(user, authProviders.coll)
                } else {
                    setError("Invalid email")
                }
            } else {
                setError("Your username is too big, it should minus than 20 letters")
            }
        } else {
            setError("Username, email or password was not provided")
        }
    }

    const login = async (user:any, provider:string) => {
        if(provider == "next-auth") {
            const token = jwt.sign(user.email, "123").slice(21, 56)
            await getOrCreateUser({...user, _id: token, _type: "user", username: user.name})

      
        } 
        else if ("coll") {
            const token = jwt.sign(user.email, "123").slice(21, 56)
            await registerUser({...user, _id: token, _type: "user"})
        }
    }

    const loginWithColl = () => {

        setModal({
            isOpen: true, 
            element: <LoginWithColl />,
        }) 
    }



  return (
    <div className='w-full justify-between flex'>


        <div className='flex flex-col justify-center w-[100%] md:w-[60%] h-[100vh] items-center'>
                {error &&
                    <div className='m-auto fixed top-20'>

                        <Error error={error} />
                    </div>
        
                }
            <form className='flex flex-col gap-20' onSubmit={handleSubmit}>
                <div className='text-center'>
                    <h1 className='font-semibold text-2xl'>Register</h1>
                    <p>Good to see you again 😀</p>
                </div>
                <div className='flex flex-col gap-5'>
                    <div>
                        <span>Name: </span><br />
                        <input className="border-[1px] border-gray-200 p-1 rounded-sm" type="text" name="" id="" 
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}

                        />
                    </div>


                    <div>
                        <span>Email: </span><br />
                        <input className="border-[1px] border-gray-200 p-1 rounded-sm" type="email" 
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        />
                    </div>

                    <div>
                        <span>Image: </span><br />
                        <input className="border-[1px] border-gray-200 p-1 rounded-sm" type="text" 
                        onChange={(e) => {
                            setImg(e.target.value)
                        }}
                        />
                    </div>

                    <div>
                        <span>Passowrd: </span><br />
                        <input className="border-[1px] border-gray-200 p-1 rounded-sm" type="password" 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        />
                    </div>
                    <button className='flex justify-center items-center gap-3  mt-5 py-1
                    bg-indigo-500 rounded-sm shadow-sm text-white hover:bg-indigo-600'>
                        Register 
                        {loading &&
                            <ReactLoading type="spin" width={20} height={20} />
                        }
                    </button>
                    
                </div>
            </form>

            <div className='mt-3 flex items-center justify-center gap-2'>
                <div className='h-[2px] bg-gray-200 w-[100px]'>
                    
                </div>

                <span className='text-gray-700 font-semibold'>or</span>

                <div className='h-[2px] bg-gray-200 w-[100px]'>
                    
                </div>
            </div>

            <div className='flex flex-col gap-2 cursor-pointer'>
 
                 {/* <div onClick={() => signIn("facebook")}>
                    <div className='border-[1px] border-gray-200 p-2 rounded-lg flex items-center gap-2'> 
                        <span><BsFacebook style={{color: "blue"}} /></span>
                        <span>Facebook</span>
                    </div>
                </div> */}
                <div onClick={() => signIn("google")}>
                    <div className='border-[1px] border-gray-200 p-2 rounded-lg flex items-center gap-2'>
                        <span><FcGoogle /></span>
                        <span>Google</span>
                    </div>
                </div>

                <div onClick={loginWithColl}>
                    <div className='border-[1px] border-gray-200 p-2 rounded-lg flex items-center gap-1 h-11'>
                        <Logo width={22} />
                        <span>Coll</span>
                    </div>
                </div>

            </div>

        </div> 
      
        <div className='hidden bg-gray-100 w-[40%] md:flex justify-center'>
            <div className='flex flex-col justify-center items-center m-10'>
                
            

                {img && <img src={img} alt="img" className='object-cover rounded-full w-20  h-20' 
                    onError={() => {
    
                        setError("Invalid Image url")
                 
                    }}
                />}

                {username && 
                    <span>Hello, {username}</span>
                }
                
            </div>
        </div>   
    </div>

  )
}

export default Login