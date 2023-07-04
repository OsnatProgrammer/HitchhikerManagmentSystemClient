import React from 'react'
import { Link } from 'react-router-dom'
import Greeting from '../general_comps/greeting'
import styles from '../user_comps/css/userNav.module.css'

export default function ManagerNav() {

  const navStyles = {
    backdropFilter: 'blur(5px)', // יצירת אפקט blur לרקע
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // צבע הרקע השקוף
    boxShadow: 'none', // הסרת הצל של הנאב
  };

  return (
    <div className='w-100' >
    <nav className="navbar navbar-expand-lg navbar-light w-100 shadow" style={{...navStyles, background: 'transparent',background: 'transparent', position: 'fixed', minHeight:'70px',display:'flex', alignItems:'center', boxShadow: '10px 10px 35px 2px rgba(0,0,0,0.75)', zIndex:'1000'}}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/manager">
        <i className='bx bxs-car bx-tada' style={{fontSize: '60px', color:'#ffffff'}}></i>
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav" style={{fontSize:'20px'}}>
            <Link className={`nav-link active text-white ${styles.link}`} aria-current="page" to={"/manager/myInfo"}>MyInfo</Link>
            <Link className={`nav-link active text-white ${styles.link}`} aria-current="page" to={"/manager/usersList"}>Users List</Link>
            <Link className={`nav-link active text-white ${styles.link}`} aria-current="page" to={"/manager/ridesList"}>Rides List</Link>
            <Link className={`nav-link active text-white ${styles.link}`} aria-current="page" to={"/manager/messages"}>Messages</Link>
            <Link className={`nav-link active text-white ${styles.link}`} aria-current="page" to={"/user/logout"}>Logout</Link>
          </div>
        </div>
        <div className="p-0 align-items-center text-white">
          <Greeting />
        </div>
      </div>
    </nav>
    </div>
  );
  
}
