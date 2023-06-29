import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doApiGet, API_URL, CURRENT_USER } from '../services/apiService';
import { Route } from 'react-router-dom';
import PopUp from './popup';

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
                        // console.log(ride);
                        return (
                            <tr key={ride.rideID}>
                                <td>{new Date(isOfferedByUser ? ride.details_offer.departure_time : ride.details_request.departure_time).toLocaleDateString()}</td>
                                <td>{new Date(isOfferedByUser ? ride.details_offer.departure_time : ride.details_request.departure_time).toLocaleTimeString()}</td>
                                <td>{rideDetails.fullName.firstName}</td>
                                <td>{isOfferedByUser ? ride.details_offer.departure_address : ride.details_request.departure_address}</td>
                                <td>{isOfferedByUser ? ride.details_offer.destination_address : ride.details_request.destination_address}</td>
                                <td>{isOfferedByUser ? ride.details_offer.status : ride.details_request.status}</td>
                                <td>
                                    {/* <Link key={i}
                                        to={`/user/ridesHistoryDetails/${ride.rideID}`}
                                        state={isOfferedByUser ?
                                             {
                                                ride_request: ride.ride_request,
                                                details_request: ride.details_request
                                            } : 
                                             {
                                                ride_offer: ride.ride_offer,
                                                details_offer: ride.details_offer
                                            }}
                                    >
                                        +
                                    </Link> */}


                                    {/* <Link
                                        key={ride.rideID}
                                        to={{
                                            pathname: `/user/ridesHistoryDetails/${ride.rideID}`,
                                            state: {
                                                rideDetails: {
                                                    ride_request: ride.ride_request,
                                                    details_request: ride.details_request
                                                }
                                            }
                                        }}
                                    >
                                        +
                                    </Link> */}

                                    {/* <Link
                                        key={ride.rideID}
                                        to={{
                                            pathname: `/user/ridesHistoryDetails/${ride.rideID}`,
                                            state: isOfferedByUser
                                                ? {
                                                    isRequestedByUser,
                                                    ride_request: ride.ride_request,
                                                    details_request: ride.details_request,
                                                }
                                                : {
                                                    isOfferedByUser,
                                                    ride_offer: ride.ride_offer,
                                                    details_offer: ride.details_offer,
                                                },
                                        }}
                                    >
                                        +
                                    </Link> */}
                                    {/* {isOpenPopup ? (
                                        <PopUp close={() => setIsOpenPopup(false)}>
                                            <p>{}</p>
                                        </PopUp>
                                    ) : null} */}

                                    <button onClick={() => setIsOpenPopup(true)}>X</button>


                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


            {isOpenPopup ? (
                <PopUp close={() => setIsOpenPopup(false)}>+
                    <p>
                        "hello"</p>
                </PopUp>
            ) : null}
        </div>
    );
}
