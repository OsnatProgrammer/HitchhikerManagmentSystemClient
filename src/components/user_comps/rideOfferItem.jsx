import React, { useState } from 'react'
import { API_URL, CURRENT_USER, doApiMethod } from '../services/apiService';

export default function RideOfferItem(props) {
  const [openPopUp, setOpenPopUp] = useState(false);
  let item = props.item;

  const joinToRide = () => {
    doApi();
    setOpenPopUp(true)
  }

  const closePopUp = () => {
    setOpenPopUp(false)
    window.location.reload();
  }

  const sendMessage = () => {
    //nav to message
  }

  const doApi = async () => {

    try {

      // let current_user = JSON.parse(localStorage.getItem(CURRENT_USER))
      let request = await doApiOpenRequest();
      doApiChangeStatus("rideOffers", item.ride_offer._id);
      // doApiChangeStatus("rideRequests", request.data._id);

      let ride = await doApiOpenRide(request.data);

      let message = doApiOpenMessageSystem(ride.data._id)

      // window.location.reload();

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem");

    }
  }
  const doApiOpenRequest = async () => {
    let urlRideRequest = API_URL + "/rideRequests/addrideRequest"
    try {

      let current_user = JSON.parse(localStorage.getItem(CURRENT_USER))
      let resp = await doApiMethod(urlRideRequest, "POST", { user_id: current_user._id, rideDetails_id: item.ride_offer.rideDetails_id })

      return resp;

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem");

    }
  }

  const doApiChangeStatus = async (rideRour, id) => {
    let url = API_URL + `/${rideRour}/updateStatus/${id}`;

    try {

      let resp = await doApiMethod(url, "PATCH", { status: 1 });

      return resp;

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem");

    }
  }

  const doApiOpenRide = async (request) => {
    let urlRides = API_URL + "/rides/addRide"
    try {

      let resp = await doApiMethod(urlRides, "POST", { rideOffer_id: item.ride_offer._id, rideRequest_id: request._id })

      return resp;

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem");

    }
  }

  const doApiOpenMessageSystem = async (id_ride) => {
    let urlMessages = API_URL + "/messages/addMessageSystem"

    try {

      let resp = await doApiMethod(urlMessages, "POST", { user_idReceive: item.ride_offer.user_id, messageDetails: "Hello, There is hitchhiker that want's to join ypur ride :)", rides_id: id_ride })

      return resp;

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem");

    }
  }

  return (
    <div className='col-md-4'>
      <div className='shadow p-2 overflow-hidden h-100 p-3' style={{ borderRadius: '10%' }}>
        departure: {item.details_offer.departure_address}<br />
        destination: {item.details_offer.destination_address}<br />
        departure time: {new Date(item.details_offer.departure_time).toLocaleDateString()}<br />
        departure time: {new Date(item.details_offer.departure_time).toLocaleTimeString()}<br />
        <button className='btn btn-dark' onClick={joinToRide}>Join to ride</button>
      </div>

      {openPopUp &&
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '600px',
              height: '300px',
              position: 'relative',
            }}
          >
            <h2>Your ride has been successfully coordinated with the driver</h2>
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '5px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '24px'
              }}
              onClick={closePopUp}
            >
              X
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '70px',
                marginRight: '60px',
                cursor: 'pointer',
              }}
              onClick={() => {
                // Handle button click event
              }}
            >
              Send message to hitchhiker
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px',
                cursor: 'pointer',
              }}
              onClick={closePopUp}
            >
              Continue
            </button>
          </div>
        </div>
      }
    </div>
  )
}

