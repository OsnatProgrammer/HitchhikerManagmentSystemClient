import React from 'react'
import { useSelector } from 'react-redux'
import GeneralLayout from '../../layouts/generalLayout'
import Summary from '../general_comps/summary'
import Footer from '../general_comps/footer'
export default function Home() {
 const counter=useSelector((state)=>state.counterSlice.counter)
 
    return (
        <>
    <GeneralLayout/>
    <Summary/>
    <Footer/>
    </>
  )
  
}