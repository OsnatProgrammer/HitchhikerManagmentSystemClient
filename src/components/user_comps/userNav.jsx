import React from 'react'
import { Link } from 'react-router-dom'

export default function UserNav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Logo</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to={"/user/myInfo"}>My Info</Link>
                        <Link className="nav-link active" aria-current="page" to={"/user/rideOffer"}>Ride Offer</Link>
                        <Link className="nav-link active" aria-current="page" to={"/user/rideRequest"}>Ride Request</Link>
                        <Link className="nav-link active" aria-current="page" to={"/user/myRides"}>My Rides</Link>
                        <Link className="nav-link active" aria-current="page" to={"/user/messages"}>Messages</Link>
                        <Link className="nav-link active" aria-current="page" to={"/user/ridesHistory"}>Rides History</Link>
                        <Link className="nav-link active" aria-current="page" to={"/user/logout"}>Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
