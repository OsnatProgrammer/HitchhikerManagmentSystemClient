import React from 'react'
import { useSelector } from 'react-redux'
import Login from './login'

export default function Home() {
 const counter=useSelector((state)=>state.counterSlice.counter)
 
    return (
    <div className='container'>Home -{counter}
    <Login/>
    </div>

  )
  
}