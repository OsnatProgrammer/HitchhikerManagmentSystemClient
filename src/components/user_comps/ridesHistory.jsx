import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';
export const getAllRides = async () => {
    try {
        const url = API_URL + "/rides/getAllRidesRequest";
        const response = await doApiGet(url);

        const rides = response.data.arr;
        console.log(rides);
        return rides;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch rides");
    }
};


export default function RidesHistory() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        async function fetchRides() {
            try {
                const ridesData = await getAllRides();
                setRides(ridesData);
            } catch (err) {
                console.log(err);
            }
        }

        fetchRides();
    }, []);

    useEffect(() => {
        $(document).ready(function () {
            $('#dtBasicExample').DataTable();
            $('.dataTables_length').addClass('bs-select');
        });
    }, []);

    return (
        <div className="container">
            <h1>Rides History</h1>
            {rides.length > 0 ? (
                <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                    <thead className="thead-dark">
                        <tr>
                            <th>Ride date</th>
                            <th>Ride time</th>
                            <th>Departure address</th>
                            <th>Destination address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides.map((ride) => (
                            <tr key={ride.rideID}>
                                <td>{new Date(ride.details_Request.departure_time).toLocaleDateString()}</td>
                                <td>{new Date(ride.details_Request.departure_time).toLocaleTimeString()}</td>
                                <td>{ride.details_Request.departure_address}</td>
                                <td>{ride.details_Request.destination_address}</td>
                                <td>{ride.details_Request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<>
                <div class="spinner-border text-warning" role="status">
                </div>
                    {/* <span class="sr-only">Loading...</span> */}
                <p>No rides available</p></>
            )}
        </div>
    );
}




