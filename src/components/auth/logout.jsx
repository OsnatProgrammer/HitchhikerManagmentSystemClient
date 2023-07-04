import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN_NAME, CURRENT_USER, arrRideHistory } from '../services/apiService'

export default function Logout() {
    const nav = useNavigate()

    useEffect(() => {
        disconnected()
    }, [])

    const disconnected = async () => {
        localStorage.removeItem(TOKEN_NAME)
        localStorage.removeItem(CURRENT_USER)
        localStorage.removeItem(arrRideHistory)

        nav("/")
    }
    return (
        <></>
    )
}
