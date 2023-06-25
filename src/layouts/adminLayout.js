import React from 'react'
import HeaderManager from '../components/admin_comps/headerManager'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <>
            <HeaderManager />
            <Outlet />
        </>
    )
}

