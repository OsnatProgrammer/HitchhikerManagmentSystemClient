import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER, doApiMethod } from '../services/apiService';

// Trips that have been closed
export const getRidesList = async () => {
  try {
    const url = API_URL + `/rides/getAllRides`;
    const response = await doApiGet(url);
    console.log("response", response);
    const rides = response.data.arr;
    console.log(rides);
    return rides;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch rides");
  }
};


//Travel requests
export const getAllRidesRequest = async () => {
  try {
    const url = API_URL + "/rideRequests/getAllridesRequestsOpen";
    const response = await doApiGet(url);
    const rides = response.data.ar_rideRequests;
    console.log(rides);
    return rides;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch rides");
  }
};

//Travel offers
export const getAllRidesOffer = async () => {
  try {
    const url = API_URL + "/rideoffers/getAllridesoffersOpen";
    const response = await doApiGet(url);

    const rides = response.data.ar_rideoffers;
    console.log(rides);
    return rides;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch rides");
  }
};


export default function RidesList() {
  const [ridesRequest, setRidesRequest] = useState([]);
  const [ridesOffer, setRidesOffer] = useState([]);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    async function fetchRides() {
      try {
        const ridesData = await getRidesList();
        setRides(ridesData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRides();
  }, []);

  useEffect(() => {
    async function fetchOfferRides() {
      try {
        const ridesData = await getAllRidesOffer();
        setRidesOffer(ridesData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchOfferRides();
  }, []);

  useEffect(() => {
    async function fetchRequestRides() {
      try {
        const ridesData = await getAllRidesRequest();
        setRidesRequest(ridesData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRequestRides();
  }, []);


  return (
    <div className="container">

      {/* Travel offers */}
      <h1>Rides Offer</h1>
      {ridesOffer.length > 0 ? (
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
          <thead className="thead-dark">
            <tr>
              <th>Departure from</th>
              <th>Destination</th>
              <th>Departure date</th>
              <th>Departure time</th>
              <th>Available spaces</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ridesOffer.map((ride) => (
              <tr key={ride._id}>
                <td>{ride.details_offer.departure_address}</td>
                <td>{ride.details_offer.destination_address}</td>
                <td>{new Date(ride.details_offer.departure_time).toLocaleDateString()}</td>
                <td>{new Date(ride.details_offer.departure_time).toLocaleTimeString()}</td>
                <td>{ride.details_offer.emptySeatNum}</td>
                <td>{ride.details_offer.status == 0 ? 'open' : 'closes'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rides available</p>
      )}

      {/* Travel requests */}
      <h1>Rides Request</h1>
      {ridesRequest.length > 0 ? (
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
          <thead className="thead-dark">
            <tr>
              <th>Departure from</th>
              <th>Destination</th>
              <th>Departure date</th>
              <th>Departure time</th>
              <th>Available spaces</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ridesRequest.map((ride) => (
              <tr key={ride._id}>
                <td>{ride.details_request.departure_address}</td>
                <td>{ride.details_request.destination_address}</td>
                <td>{new Date(ride.details_request.departure_time).toLocaleDateString()}</td>
                <td>{new Date(ride.details_request.departure_time).toLocaleTimeString()}</td>
                <td>{ride.details_request.emptySeatNum}</td>
                <td>{ride.details_request.status == 0 ? 'open' : 'closes'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rides available</p>
      )}

      {/* Trips that have been closed */}
      <h1>Trips that have been closed</h1>
      {rides.length > 0 ? (
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
          <thead className="thead-dark">
            <tr>
              <th>Published by</th>
              <th>Required by</th>
              <th>Departure from</th>
              <th>Destination</th>
              <th>Departure date</th>
              <th>Departure time</th>
              <th>Available spaces</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride._id}>
                <td>
                  {ride.ride_offer.fullName
                    .firstName + " " + ride.ride_offer
                      .fullName.lastName}
                </td>
                <td>
                  {ride.ride_requst.fullName
                    .firstName + " " + ride.ride_offer
                      .fullName.lastName}
                </td>
                <td>{ride.details_offer.departure_address}</td>
                <td>{ride.details_offer.destination_address}</td>
                <td>{new Date(ride.details_offer.departure_time).toLocaleDateString()}</td>
                <td>{new Date(ride.details_offer.departure_time).toLocaleTimeString()}</td>
                <td>{ride.details_offer.emptySeatNum}</td>
                <td>{ride.status == 0 ? 'open' : 'closes'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rides available</p>
      )}

    </div>
  )
}
