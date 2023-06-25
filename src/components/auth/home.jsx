import React from 'react'
import { useSelector } from 'react-redux'
import GeneralLayout from '../../layouts/generalLayout'

export default function Home() {
 const counter=useSelector((state)=>state.counterSlice.counter)
 
    return (
    <GeneralLayout/>
  )
  
}