import React from 'react'
import { Dispatch, SetStateAction } from 'react';
import {CgSearch} from "react-icons/cg"
interface IProps {
    search: string,
    setSearch: Dispatch<React.SetStateAction<string>>
    handleSearch?: (search:string) => void
}
function Searchbar({search, setSearch, handleSearch}:IProps) {
  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        handleSearch?.(search)
    }} className='relative flex items-center justify-between w-full h-10 bg-gray-100 rounded-lg p-4'>
        <input 
            type="text"
            className='flex-1 h-10 bg-gray-100'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            />
        <button 
            className='rounded-lg text-white p-4 absolute right-0 flex items-center justify-center gap-2 bg-indigo-600 h-10 transition
            hover:font-semibold first-letter:
            cursor-pointer'

            onClick={() => handleSearch?.(search)}

        >
            <span className='hidden md:flex'>
                Search
            </span>
            <span>
                <CgSearch />
            </span>
        </button>
    </form>
  )
}

export default Searchbar