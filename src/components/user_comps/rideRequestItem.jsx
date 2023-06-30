import React, { useState } from 'react'
import { API_URL, CURRENT_USER, doApiMethod } from '../services/apiService';
import NewMessage from '../general_comps/newMessage';
// import { Carousel } from 'react-bootstrap';


export default function RideRequestItem(props) {

  const [openPopUp, setOpenPopUp] = useState(false);
  let item = props.item;
  let current_user = JSON.parse(localStorage.getItem(CURRENT_USER));
  let rideId;
  const [showNewMessage, setShowNewMessage] = useState(false);

  const changeShowNewMessage = () => {
    setOpenPopUp(false);
    setShowNewMessage(!showNewMessage);
    doApi();
    props.setRefreshFlag(!props.refreshFlag);
  };

  const joinToRide = () => {
    if (!showNewMessage) {
      setOpenPopUp(true);
    }
  };

  const cancel = () => {
    setOpenPopUp(false)
  }

  const save = () => {
    doApi();
    setOpenPopUp(false)
    props.setRefreshFlag(!props.refreshFlag);
    // window.location.reload();
  };


  const doApi = async () => {

    try {

      // let current_user = JSON.parse(localStorage.getItem(CURRENT_USER))
      let offer = await doApiOpenOffer();
      doApiChangeStatus("rideRequests", item.ride_request._id);
      // doApiChangeStatus("rideRequests", request.data._id);

      let ride = await doApiOpenRide(offer.data);
      rideId = ride.data._id;

      let message = doApiOpenMessageSystem(ride.data._id)

      // window.location.reload();

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem with doApi");

    }
  }
  const doApiOpenOffer = async () => {
    let urlRideOffer = API_URL + "/rideoffers/addRideOffer"
    console.log(urlRideOffer);
    try {

      let current_user = JSON.parse(localStorage.getItem(CURRENT_USER))
      let resp = await doApiMethod(urlRideOffer, "POST", { user_id: current_user._id, rideDetails_id: item.ride_request.rideDetails_id })

      return resp;

    }
    catch (err) {
      console.log(err);
      alert("There is problem with doApiOpenOffer");

    }
  }

  const doApiChangeStatus = async (rideRourt, id) => {
    let url = API_URL + `/${rideRourt}/updateStatus/${id}`;

    try {

      let resp = await doApiMethod(url, "PATCH", { status: 1 });

      return resp;

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem with doApiChangeStatus");

    }
  }

  const doApiOpenRide = async (offer) => {
    let urlRides = API_URL + "/rides/addRide"
    try {

      let resp = await doApiMethod(urlRides, "POST", { rideOffer_id: offer._id, rideRequest_id: item.ride_request._id })

      return resp;

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem with doApiOpenRide");

    }
  }

  const doApiOpenMessageSystem = async (id_ride) => {
    let urlMessages = API_URL + "/messages/addMessageSystem"

    try {

      let resp = await doApiMethod(urlMessages, "POST", { user_idReceive: item.ride_request.user_id, messageDetails: "Hello, There is driver that you can join his  ride:)", rides_id: id_ride })

      return resp;

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem with doApiOpenMessageSystem");

    }
  }

  return (

    <div>
      <div className='shadow p-2 overflow-hidden h-100 text-center bg-light' style={{ borderRadius: '30px', lineHeight: '1.6' }}>
        departure: {item.details_request.departure_address}<br />
        destination: {item.details_request.destination_address}<br />
        departure date: {new Date(item.details_request.departure_time).toLocaleDateString()}<br />
        departure time: {new Date(item.details_request.departure_time).toLocaleTimeString()}<br />
        <button className='btn button m-2 col-md-6' onClick={joinToRide}>Accept Request</button>
      </div>

      {openPopUp && (
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
                fontSize: '24px',
              }}
              onClick={cancel}
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
              onClick={changeShowNewMessage}
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
                marginRight: '60px',
                cursor: 'pointer',
              }}
              onClick={save}
            >
              Continue
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
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showNewMessage && (
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
                fontSize: '24px',
              }}
              onClick={changeShowNewMessage}
            >
              X
            </button>
            <div>
              <NewMessage message={{ user_idReceive: item.ride_request._id, user_idSend: current_user._id, rides_id: rideId }} nav={'/user/'} setShowNewMessage={setShowNewMessage} />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
