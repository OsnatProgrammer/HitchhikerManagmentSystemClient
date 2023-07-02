
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import styles from './css/nearByRides.module.css'

export const getAllRidesByIdAndStatus = async (status) => {
  try {
    const url = API_URL + `/rides/getAllRidesByIdAndStatus/${status}`;
    const response = await doApiGet(url);
    console.log("response", response);
    const rides = response.data.rides;
    console.log(rides);
    return rides;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch rides");
  }
};


export default function MyRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    async function fetchRides() {
      try {
        const status = 0;
        const ridesData = await getAllRidesByIdAndStatus(status);
        setRides(ridesData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRides();
  }, []);

  return (
    <>
      <div className={`${styles.strip} d-flex align-items-end`}>
        <div className='display-1'>
          My Rides
        </div>
      </div>

      <div className="container">
        <h1>My Rides</h1>
        {rides.length > 0 ? (
          <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
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
                  <td>{new Date(ride.details_request.departure_time).toLocaleDateString()}</td>
                  <td>{new Date(ride.details_request.departure_time).toLocaleTimeString()}</td>
                  <td>{ride.details_request.departure_address}</td>
                  <td>{ride.details_request.destination_address}</td>
                  <td>{ride.details_request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rides available</p>
        )}
      </div>
    </>
  );
}
