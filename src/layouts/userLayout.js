import React from 'react'
import HeaderUser from '../components/user_comps/headerUser'
import { Outlet } from 'react-router-dom'
import Footer from '../components/general_comps/footer'

export default function UserLayout() {
  return (
    <>
      <HeaderUser />
      <Outlet />
      <Footer/>
    </>
  )
}
