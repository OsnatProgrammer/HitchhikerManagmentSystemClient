import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN_NAME, CURRENT_USER } from '../services/apiService'

export default function Logout() {
    const nav = useNavigate()

    useEffect(() => {
        disconnected()
    }, [])

    const disconnected = async () => {
        localStorage.removeItem(TOKEN_NAME)
        localStorage.removeItem(CURRENT_USER)

        nav("/")
    }
    return (
        <></>
    )
}
