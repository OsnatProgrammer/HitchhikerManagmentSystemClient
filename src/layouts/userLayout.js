import React from 'react'
import HeaderUser from '../components/user_comps/headerUser'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <>
      <HeaderUser />
      <Outlet />
    </>
  )
}
