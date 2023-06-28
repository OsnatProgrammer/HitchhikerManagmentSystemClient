import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { doApiGet, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import RideOfferItem from './rideOfferItem';
import RideRequestItem from './rideRequestItem';


export const getAllridesRequestsOpen = async () => {
  let url = API_URL + "/rideRequests/getAllridesRequestsOpen";
  try {
    const response = await doApiGet(url);
    console.log("Requests", response);
    const ridesRequests = response.data.ar_rideRequests;
    console.log(ridesRequests);
    return ridesRequests;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch ridesRequests");
  }
};

export const getAllridesoffersOpen = async () => {
  let url = API_URL + "/rideoffers/getAllridesoffersOpen";
  try {
    const response = await doApiGet(url);
    console.log("Offer", response);
    const ridesoffers = response.data.ar_rideoffers;
    console.log(ridesoffers);
    return ridesoffers;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch ridesoffers");
  }
};


export default function NearbyRides() {
  const [ridesRequests, setRidesRequests] = useState([]);
  const [ridesoffers, setridesoffers] = useState([]);

  useEffect(() => {
    async function fetchrides() {
      try {
        const ridesRequestsData = await getAllridesRequestsOpen();
        setRidesRequests(ridesRequestsData);
        const ridesoffersData = await getAllridesoffersOpen();
        setridesoffers(ridesoffersData);

      } catch (err) {
        console.log(err);
      }
    }
    fetchrides();
  }, []);

  return (
    <div className='container'>
      <h2>Rides Requests: </h2>
      <div className='row g-3'>
        {ridesRequests.map((item,i) => {
          return (
            <RideRequestItem key={i} item={item} />
            )
          })}
        {ridesRequests.length < 1 && <h2>Loading...</h2>}
      </div>
      <div className='row g-3'>
        <h2>Rides Offers: </h2>
        {ridesoffers.map((item,i) => {
          return (
            <RideOfferItem key={i} item={item} />
          )
        })}
        {ridesoffers.length < 1 && <h2>Loading...</h2>}
      </div>
    </div>
  )
}
