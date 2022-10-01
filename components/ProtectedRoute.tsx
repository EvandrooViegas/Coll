import Router, { useRouter } from 'next/router'
import React from 'react'
import useAuthStore from '../store/authStore'

function ProtectedRoute({children}: {children: any}) {
    const {user} = useAuthStore()
    const router = useRouter()
    const freeRoutes = [
        "/",
        "/login"
    ]
    const currentRoute = router.pathname
    if(user && !freeRoutes.includes(currentRoute)) {
        return (
            <div>
                {children}
            </div>
        )
        

    } else {
        router.push("/login")
    }
}

export default ProtectedRoute