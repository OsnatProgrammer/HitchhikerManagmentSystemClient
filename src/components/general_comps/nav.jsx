import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/nav.module.css'
// import './boxicons'

export default function Nav() {
    return (
        // {`container p-4 ${styles.textContainer}`}
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.bgNav}`} >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">

                <i className='bx bxs-car bx-tada' style={{fontSize: '60px'}}></i>
                </a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" style={{fontSize: '24px'}} aria-current="page" to={"/"}>HOME</Link>
                        <Link className="nav-link active" style={{fontSize: '24px'}} aria-current="page" to={"/login"}>LOGIN</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
