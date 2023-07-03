import React from 'react'
import styles from './css/summary.module.css'
import Nav from './nav'
// import 
// import './css/summary.css'
import SetInterval from './setInterval';

export default function Summary() {
    return (
        <>
            <Nav />
            <div>
                <div className={`${styles.strip}`}>

                </div>
                <div className={`container p-4 ${styles.textContainer} ${styles.container}`}>
                    <h3 className="mb-3 text-center font-weight-bold text-light">Welcome to RouteRide - Your On-Demand Ride Matching Platform!</h3>
                    At RouteRide, we've revolutionized the way people travel by creating a convenient and safe platform that connects drivers and hitchhikers.<br />
                    Whether you're a driver looking to share your journey or a hitchhiker seeking a ride,<br />
                    our location-based services and user preferences will ensure you have a seamless and enjoyable travel experience.<br />
                    For drivers willing to offer rides along their route, simply enter your departure and destination addresses into our system.<br />
                    RouteRide will then match you with hitchhikers who are on your route or within a certain distance, allowing you to share your trip and make the most of your empty seats.<br />
                    It's an excellent way to meet new people, save money, and contribute to a more sustainable mode of transportation.<br />
                    Hitchhikers, on the other hand, can join RouteRide by entering their departure address and estimated departure time.<br />
                    Once you're registered, our platform will notify you when a suitable trip becomes available. <br />
                    No more waiting by the side of the road; with RouteRide, you can find rides that align with your travel plans effortlessly.<br />
                    Once a ride match is made, both the driver and hitchhiker can communicate with each other through our secure chat feature.<br />
                    This ensures effective coordination and allows you to discuss any additional details or preferences before embarking on the journey.<br /><br />
                    At RouteRide, we prioritize safety and user satisfaction.<br />
                    Our site administrator actively monitors user complaints and requests, taking necessary actions.
                </div>
                <SetInterval />
            </div>
        </>
    )
}
