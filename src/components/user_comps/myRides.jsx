import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import _ from 'lodash';
import styles from './css/myRides.module.css'

export default function MyRides() {
  const [ridesOffer, setRidesOffer] = useState([]);
  const [ridesRequest, setRidesRequest] = useState([]);

  const getAllridesoffersOpen = async () => {
    try {
      const url = API_URL + `/rideoffers/getAllridesoffersOpen`;
      const response = await doApiGet(url);
      console.log("response", response);
      const rides = response.data.ar_rideoffers;
      console.log(rides);
      setRidesOffer(rides); // Assign the value to the state variable
      return rides;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch rides");
    }
  };

  const getAllridesRequestsOpen = async () => {
    try {
      const url = API_URL + `/rideRequests/getAllridesRequestsOpen`;
      const response = await doApiGet(url);
      console.log("response", response);
      const rides = response.data.ar_rideRequests;
      console.log(rides);
      setRidesRequest(rides); // Assign the value to the state variable
      return rides;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch rides");
    }
  };


  useEffect(() => {
    async function fetchRidesOffer() {
      try {
        const ridesDataOffer = await getAllridesoffersOpen();
        console.log("ridesDataOffer", ridesDataOffer);

        const sortedRidesDataOffer = _.sortBy(ridesDataOffer, (ride) => {
          return new Date(ride.details_offer.departure_time).getTime();
        });

        setRidesOffer(sortedRidesDataOffer);
        console.log("sortedRidesDataOffer", sortedRidesDataOffer);

      } catch (err) {
        console.log(err);
      }
    }

    fetchRidesOffer();
  }, []);

  useEffect(() => {
    async function fetchRidesRequest() {
      try {
        const ridesDataRequest = await getAllridesRequestsOpen();
        console.log("ridesDataRequest", ridesDataRequest);

        const sortedRidesDataRequest = _.sortBy(ridesDataRequest, (ride) => {
          return new Date(ride.details_request.departure_time).getTime();
        });

        setRidesRequest(sortedRidesDataRequest);
        console.log("sortedRidesDataRequest", sortedRidesDataRequest);

      } catch (err) {
        console.log(err);
      }
    }

    fetchRidesRequest();
  }, []);


  return (
    <div className="container">
      <h1 className='text-white'>My Rides</h1>
      <div className="row">
        <h6  className='text-white'>Rides Offer</h6>
        {ridesOffer.length > 0 ? (
          ridesOffer.map((ride) => (
            <div className={`${styles.box}`} key={ride.rideID}>
              <h6>Ride date: {new Date(ride.details_offer.departure_time).toLocaleDateString()}</h6>
              <h6>Ride time: {new Date(ride.details_offer.departure_time).toLocaleTimeString()}</h6>
              <h6>Departure address:<br/> {ride.details_offer.departure_address}</h6>
              <h6>Destination address:<br/> {ride.details_offer.destination_address}</h6>
              {/* <h6>Status: {ride.details_offer.status}</h6> */}
              <div className='d-flex'>
                <button className='btn'>Update</button>
                <button className='btn'>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No rides available</p>
        )}
      </div>
      <div className="row">
        <h6 className='text-white'>Rides Request</h6>
        {ridesRequest.length > 0 ? (
          ridesRequest.map((ride) => (
            <div className={`${styles.box}`} key={ride.rideID}>
              <h6>Ride date: {new Date(ride.details_request.departure_time).toLocaleDateString()}</h6>
              <h6>Ride time: {new Date(ride.details_request.departure_time).toLocaleTimeString()}</h6>
              <h6>Departure address:<br/> {ride.details_request.departure_address}</h6>
              <h6>Destination address:<br/> {ride.details_request.destination_address}</h6>
              {/* <h6>Status: {ride.details_request.status}</h6> */}
              <div className='d-flex'>
                <button className='btn'>Update</button>
                <button className='btn'>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No rides available</p>
        )}
      </div>

    </div>
  );
}  
