import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Logo</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to={"/login"}>Login</Link>
                        <Link className="nav-link active" aria-current="page" to={"/signUp"}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
