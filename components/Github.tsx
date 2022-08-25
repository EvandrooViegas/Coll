import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IRepo } from '../types/IRepo'
import {BsLink45Deg} from "react-icons/bs"
import {AiFillGithub} from "react-icons/ai"
interface IProps {
    repo: IRepo[]
}
function Github({repo}:IProps) {
  return (
    <div className='flex flex-col items-center bg-neutral-900  p-[10px] rounded-lg px-[15px] h-[700px] w-[90%] shadow-lg overflow-scroll overflow-x-hidden'>
        {repo?.map((rep:IRepo) => (
            <div key={rep.html_url} className="flex flex-col w-[90%] gap-1 bg-neutral-800 text-white p-3 my-2 rounded-lg shadow-lg">
                <div className='flex items-center justify-between'>
                    <Image src={`https://res.cloudinary.com/demo/image/fetch/${rep.owner.avatar_url}`} width={30} height={30} className="rounded-full" />
                    <div className='hidden sm:flex items-center gap-2'>
                        <p>{rep.owner.login}</p>
                        <AiFillGithub />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <h1 className='text-blue-600'>{rep.name}</h1>
                    <a href={rep.html_url} target="_blank" rel="noopener noreferrer">
                        <BsLink45Deg className="hover:text-indigo-400 cursor-pointer" />
                    </a>
                </div>
             
            </div>
        ))}
    </div>
  )
}

export default Github