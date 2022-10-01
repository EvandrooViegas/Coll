import React, {useState, useContext} from 'react'
import { userContext } from '../../context/UserContext'
import { IUser } from '../../types/IUser'
import ReactLoading from "react-loading"
import ErrorComp from '../ErrorComp'
function LoginWithColl() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const {loginUser} = useContext(userContext)


    const handleSubmit = async (e:any) => {
        e.preventDefault()
        if(email && password) {
            const res = await loginUser(email, password)
        } else {
            setError("Email or password was not provided")
        }
    }


  return (
    <form className='p-10 rounded-lg flex flex-col justify-center'>

        {error &&
            <ErrorComp error={error} />
        }

        <h1 className='text-center font-semibold text-2xl p-10'>Login with Coll</h1>
        <div className='m-auto my-10'>
            <div className='m-auto'>
                <span>Email: </span><br />
                <input className="border-[1px] border-gray-200 p-1 rounded-sm" type="text" 
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                />
            </div>

            <div className='m-auto'>
                <span>Password: </span><br />
                <input className="border-[1px] border-gray-200 p-1 rounded-sm" type="password" 
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                />
            </div>
        </div>

        <button className='flex justify-center items-center gap-3  mt-5 py-1
        bg-indigo-500 rounded-sm shadow-sm text-white hover:bg-indigo-600'
        onClick={handleSubmit}
        >
            Login 
      
        </button>
    </form>
  )
}

export default LoginWithColl