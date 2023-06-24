import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
 const counter=useSelector((state)=>state.counterSlice.counter)
 
    return (
    <div className='container'>Home -{counter}</div>
  )
}
