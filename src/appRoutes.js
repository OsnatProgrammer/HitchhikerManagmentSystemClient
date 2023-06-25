import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './comps/home'
import Counter from './comps/counter'
export default function AppRoutes() {
    return (
        <BrowserRouter>
        <header className='container-fluid'>
            <nav className='container'>
                <Link to="/">Home </Link>
                <Link to="/counter">Counter </Link>
            </nav>
        </header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/counter" element={<Counter/>}/>

            </Routes>

        </BrowserRouter>
    )
}
