import React, { useContext } from 'react'
import { userRefContext } from '../../context/UserRefContext'
import { IUser } from '../../types/IUser'

function UserDetails() {
    const {userRef} = useContext(userRefContext)
    const user:IUser = userRef
  return (
    <div>
        Hello, {user.name}
    </div>
  )
}

export default UserDetails