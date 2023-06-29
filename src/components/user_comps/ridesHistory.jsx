import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doApiGet, API_URL, CURRENT_USER } from '../services/apiService';
import { Route } from 'react-router-dom';
import PopUp from './popup';
// import { useSelector } from "react-redux";
// import { ridesSelector } from "../slices/ridesSlice";

const user = JSON.parse(localStorage.getItem(CURRENT_USER));


export const getAllRidesById = async () => {
    try {
        const url = API_URL + "/rides/getAllRidesById";
        const response = await doApiGet(url);
        const rides = response.data.rides;
        return rides;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch rides");
    }
};


export default function RidesHistory() {
    const [rides, setRides] = useState([]);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);
    const [IsOfferedByUser, setIsOfferedByUser] = useState(null);
    // const ride = useSelector(ridesSelector);
    // console.log("ride", ride);
    let item = rides;
    const itemString = JSON.stringify(item)

    useEffect(() => {
        async function fetchRides() {
            try {
                const ridesData = await getAllRidesById();
                console.log(ridesData);
                setRides(ridesData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRides();
    }, []);

    return (
        <div className="container">
            <h1>Rides History</h1>
            <table className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
                <thead className="thead-dark">
                    <tr>
                        <th>Ride date</th>
                        <th>Ride time</th>
                        <th>Name</th>
                        <th>Departure address</th>
                        <th>Destination address</th>
                        <th>Status</th>
                        <th>More details</th>
                    </tr>
                </thead>
                <tbody>
                    {rides.map((ride, i) => {
                        const isOfferedByUser = ride.userIdOffer === user._id;
                        const isRequestedByUser = ride.userIdRequest === user._id;

                        const rideDetails = isOfferedByUser ? ride.ride_offer : ride.ride_request;
                        console.log(ride);
                        return (
                            <tr key={ride.rideID}>
                                <td>{new Date(isOfferedByUser ? ride.details_offer.departure_time : ride.details_request.departure_time).toLocaleDateString()}</td>
                                <td>{new Date(isOfferedByUser ? ride.details_offer.departure_time : ride.details_request.departure_time).toLocaleTimeString()}</td>
                                <td>{rideDetails.fullName.firstName}</td>
                                <td>{isOfferedByUser ? ride.details_offer.departure_address : ride.details_request.departure_address}</td>
                                <td>{isOfferedByUser ? ride.details_offer.destination_address : ride.details_request.destination_address}</td>
                                <td>{isOfferedByUser ? ride.details_offer.status : ride.details_request.status}</td>
                                <td>
                                    <button onClick={() => {
                                        setSelectedRide(ride); setIsOfferedByUser(ride.userIdOffer === user._id ? ride.userIdOffer : ride.userIdRequest)
                                        setIsOpenPopup(true);
                                    }}>X</button>                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {isOpenPopup ? (
                <PopUp close={() => setIsOpenPopup(false)}>
                    <p>Ride Details:</p>
                    {IsOfferedByUser ? (
                        <div>

                            <p>Ride ID: {selectedRide.rideID}</p>
                            <p>name: {selectedRide.ride_offer.fullName.firstName}</p>
                            {/* Display other ride details as needed */}
                        </div>
                    ) :
                        <p>name: "hi"</p>


                    }
                </PopUp>
            ) : null}
        </div>
    );
}
