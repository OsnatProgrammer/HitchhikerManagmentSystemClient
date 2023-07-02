import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/nav.module.css'
import stylesNavLogin from './css/navLogin.module.css'
// import './boxicons'

export default function NavLogin() {
    return (
        // {`container p-4 ${styles.textContainer}`}
        <nav className={`navbar navbar-expand-lg navbar-light ${stylesNavLogin.bgNav}`} >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">

                <i className='bx bxs-car bx-tada' style={{fontSize: '60px', color:'#ffffff'}}></i>
                </a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link active text-light ${stylesNavLogin.link}`} aria-current="page" to={"/login"}>Login</Link>
                        <Link className={`nav-link active text-light ${stylesNavLogin.link}`} aria-current="page" to={"/"}>summary</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
