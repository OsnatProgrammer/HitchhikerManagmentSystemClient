import React from 'react'
import Header from '../components/general_comps/header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/general_comps/footer'

export default function GeneralLayout() {
    return (
        <>  
            <Header />
         
            <Outlet />
        </>
    )
}
