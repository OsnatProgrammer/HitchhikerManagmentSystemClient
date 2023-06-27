import React from 'react'
import { Link } from 'react-router-dom'
import Greeting from '../general_comps/greeting'

export default function ManagerNav() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">Logo</a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to={"/manager/myInfo"}>MyInfo</Link>
            <Link className="nav-link active" aria-current="page" to={"/manager/usersList"}>Users List</Link>
            <Link className="nav-link active" aria-current="page" to={"/manager/ridesList"}>Rides List</Link>
            <Link className="nav-link active" aria-current="page" to={"/manager/messages"}>Messages</Link>
            <Link className="nav-link active" aria-current="page" to={"/user/logout"}>Logout</Link>
          </div>
        </div>
        <div className="p-0 align-items-center">
          <Greeting />
        </div>
      </div>
    </nav>
  );
  
}
