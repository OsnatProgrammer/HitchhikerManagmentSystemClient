import React from 'react'
import HeaderManager from '../components/admin_comps/headerManager'
import { Outlet } from 'react-router-dom'
import Footer from '../components/general_comps/footer'

export default function AdminLayout() {
    return (
        <>
            <HeaderManager />
            <div style={{minHeight:'68vh'}}>
                 <Outlet />
            </div>
           
            <Footer/>
        </>
    )
}

