// import React, { useState } from 'react'
// import { API_URL, CURRENT_USER, doApiMethod } from '../services/apiService';
// import NewMessage from '../general_comps/newMessage';

// export default function RideOfferItem(props) {

//   const [openPopUp, setOpenPopUp] = useState(false);
//   let item = props.item;
//   let current_user = JSON.parse(localStorage.getItem(CURRENT_USER))
//   let rideId;
//   const [showNewMessage, setShowNewMessage] = useState(false);

//   const changeShowNewMessage = () => {
//     setOpenPopUp(false)
//     setShowNewMessage(!showNewMessage)
//   }

//   const joinToRide = () => {
//     doApi();
//     setOpenPopUp(true)
//   }

//   const closePopUp = () => {

//     setOpenPopUp(false)
//     // window.location.reload();
//   }

//   // const cancel = () => {
//   //   setOpenPopUp(false)
//   // }

//   const sendMessage = () => {

//   }

//   const doApi = async () => {

//     try {

//       // let current_user = JSON.parse(localStorage.getItem(CURRENT_USER))
//       let request = await doApiOpenRequest();
//       doApiChangeStatus("rideOffers", item.ride_offer._id);
//       // doApiChangeStatus("rideRequests", request.data._id);

//       let ride = await doApiOpenRide(request.data);
//       rideId = ride.data._id;

//       let message = doApiOpenMessageSystem(ride.data._id)

//       // window.location.reload();

//     }
//     catch (err) {
//       console.log(err.response);
//       alert("There is problem");

//     }
//   }
//   const doApiOpenRequest = async () => {
//     let urlRideRequest = API_URL + "/rideRequests/addrideRequest"
//     try {

//       let resp = await doApiMethod(urlRideRequest, "POST", { user_id: current_user._id, rideDetails_id: item.ride_offer.rideDetails_id })

//       return resp;

//     }
//     catch (err) {
//       console.log(err.response);
//       alert("There is problem");

//     }
//   }

//   const doApiChangeStatus = async (rideRour, id) => {
//     let url = API_URL + `/${rideRour}/updateStatus/${id}`;

//     try {

//       let resp = await doApiMethod(url, "PATCH", { status: 1 });

//       return resp;

//     }
//     catch (err) {
//       console.log(err.response);
//       alert("There is problem");

//     }
//   }

//   const doApiOpenRide = async (request) => {
//     let urlRides = API_URL + "/rides/addRide"
//     try {

//       let resp = await doApiMethod(urlRides, "POST", { rideOffer_id: item.ride_offer._id, rideRequest_id: request._id })

//       return resp;

//     }
//     catch (err) {
//       console.log(err.response);
//       alert("There is problem");

//     }
//   }

//   const doApiOpenMessageSystem = async (id_ride) => {
//     let urlMessages = API_URL + "/messages/addMessageSystem"

//     try {

//       let resp = await doApiMethod(urlMessages, "POST", { user_idReceive: item.ride_offer.user_id, messageDetails: "Hello, There is hitchhiker that want's to join ypur ride :)", rides_id: id_ride })

//       return resp;

//     }
//     catch (err) {
//       console.log(err.response);
//       alert("There is problem");

//     }
//   }

//   return (
//     <div className='col-md-4'>
//       <div className='shadow p-2 overflow-hidden h-100 p-3' style={{ borderRadius: '10%' }}>
//         departure: {item.details_offer.departure_address}<br />
//         destination: {item.details_offer.destination_address}<br />
//         departure time: {new Date(item.details_offer.departure_time).toLocaleDateString()}<br />
//         departure time: {new Date(item.details_offer.departure_time).toLocaleTimeString()}<br />
//         <button className='btn btn-dark' onClick={joinToRide}>Join to ride</button>
//       </div>

//       {openPopUp &&
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 9999,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: '20px',
//               borderRadius: '10px',
//               textAlign: 'center',
//               width: '600px',
//               height: '300px',
//               position: 'relative',
//             }}
//           >
//             <h2>Your ride has been successfully coordinated with the driver</h2>
//             <button
//               style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 padding: '5px',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 cursor: 'pointer',
//                 fontWeight: 'bold',
//                 fontSize: '24px'
//               }}
//               onClick={closePopUp}
//             >
//               X
//             </button>
//             <button
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: ' #54E8A9',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '5px',
//                 marginTop: '70px',
//                 marginRight: '60px',
//                 cursor: 'pointer',
//               }}
//               onClick={changeShowNewMessage}
//             >
//               Send message to hitchhiker
//             </button>
//             <button
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: ' #54E8A9',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '5px',
//                 marginTop: '20px',
//                 marginRight: '60px',
//                 cursor: 'pointer',
//               }}
//               onClick={closePopUp}
//             >
//               Continue
//             </button>

//             {/* <button
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: ' #54E8A9',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '5px',
//                 marginTop: '20px',
//                 cursor: 'pointer',
//               }}
//               onClick={cancel}
//             >
//               Cancel
//             </button> */}

//           </div>
//         </div>
//       }

//       {showNewMessage &&
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 9999,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: '20px',
//               borderRadius: '10px',
//               textAlign: 'center',
//               width: '600px',
//               height: '300px',
//               position: 'relative',
//             }}
//           >
//                         <button
//               style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 padding: '5px',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 cursor: 'pointer',
//                 fontWeight: 'bold',
//                 fontSize: '24px'
//               }}
//               onClick={changeShowNewMessage}
//             >
//               X
//             </button>
//             <div>
//               <NewMessage message={{ user_idReceive: item.ride_offer._id, user_idSend: current_user._id, rides_id: rideId }} />
//             </div>
//           </div>
//         </div>

//       }

//     </div >
//   )
// }



import React, { useState } from 'react';
import { API_URL, CURRENT_USER, doApiMethod } from '../services/apiService';
import NewMessage from '../general_comps/newMessage';

export default function RideOfferItem(props) {
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
      props.setRefreshFlag(!props.refreshFlag);

      let request = await doApiOpenRequest();
      doApiChangeStatus('rideOffers', item.ride_offer._id);

      let ride = await doApiOpenRide(request.data);
      rideId = ride.data._id;

      let message = doApiOpenMessageSystem(ride.data._id);
    } catch (err) {
      console.log(err.response);
      alert('There is a problem');
    }
  };

  const doApiOpenRequest = async () => {
    let urlRideRequest = API_URL + '/rideRequests/addrideRequest';
    try {
      let resp = await doApiMethod(urlRideRequest, 'POST', {
        user_id: current_user._id,
        rideDetails_id: item.ride_offer.rideDetails_id,
      });
      return resp;
    } catch (err) {
      console.log(err.response);
      alert('There is a problem');
    }
  };

  const doApiChangeStatus = async (rideRour, id) => {
    let url = API_URL + `/${rideRour}/updateStatus/${id}`;
    try {
      let resp = await doApiMethod(url, 'PATCH', { status: 1 });
      return resp;
    } catch (err) {
      console.log(err.response);
      alert('There is a problem');
    }
  };

  const doApiOpenRide = async (request) => {
    let urlRides = API_URL + '/rides/addRide';
    try {
      let resp = await doApiMethod(urlRides, 'POST', {
        rideOffer_id: item.ride_offer._id,
        rideRequest_id: request._id,
      });
      return resp;
    } catch (err) {
      console.log(err.response);
      alert('There is a problem');
    }
  };

  const doApiOpenMessageSystem = async (id_ride) => {
    let urlMessages = API_URL + '/messages/addMessageSystem';
    try {
      let resp = await doApiMethod(urlMessages, 'POST', {
        user_idReceive: item.ride_offer.user_id,
        messageDetails: 'Hello, There is a hitchhiker that wants to join your ride :)',
        rides_id: id_ride,
      });
      return resp;
    } catch (err) {
      console.log(err.response);
      alert('There is a problem');
    }
  };

  return (
    <>
      <div className="card">
        <div className="container-card bg-green-box">
          {/* <p className="card-title">Request</p> */}
          <p className="card-description">
            departure: {item.details_offer.departure_address}<br />
            destination: {item.details_offer.destination_address}<br />
            departure time: {new Date(item.details_offer.departure_time).toLocaleDateString()}<br />
            departure time: {new Date(item.details_offer.departure_time).toLocaleTimeString()}<br />
          </p>

          {/* <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4547)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4547)" stroke-width="2"><button className='btn button m-2 col-md-6' onClick={joinToRide}>Accept Request</button></rect>
                
                <defs>
                  <linearGradient id="paint0_linear_1366_4547" x1="0.0063367" y1="0.168432" x2="120.853" y2="119.009" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2FCB89" stop-opacity="0.7"></stop>
                    <stop offset="0.489583" stop-color="#2FCB89" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#2FCB89" stop-opacity="0.7"></stop>
                  </linearGradient>
                  <radialGradient id="paint1_radial_1366_4547" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                    <stop stop-color="#54E8A9"></stop>
                    <stop offset="1" stop-color="#1A3E31" stop-opacity="0.2"></stop>
                  </radialGradient>
                </defs>
              </svg> */}

          <button className='btn button m-2 col-md-6' onClick={joinToRide}>
            Join to ride
          </button>

        </div>
      </div>


      <div>
        {/* <div className='shadow p-2 overflow-hidden h-100 text-center bg-light' style={{ borderRadius: '30px', lineHeight: '1.6' }}>
          departure: {item.details_offer.departure_address}<br />
          destination: {item.details_offer.destination_address}<br />
          departure time: {new Date(item.details_offer.departure_time).toLocaleDateString()}<br />
          departure time: {new Date(item.details_offer.departure_time).toLocaleTimeString()}<br />
          <button className='btn button m-2 col-md-6' onClick={joinToRide}>
            Join to ride
          </button>
        </div> */}

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
                backgroundColor: 'black',
                border: '0.5px  #54E8A9 solid',
                color: "#54E8A9",
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '600px',
                height: '300px',
                position: 'relative',
              }}
            >
              <h3>Your ride has been successfully coordinated with the driver</h3>
              <button
                style={{
                  position: 'absolute',
                  color: "#54E8A9",
                  top: '-2px',
                  left: '-110px',
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

              <div className='d-flex m-5'>
                <button
                  style={{
                    // padding: '10px 20px',
                    backgroundColor: ' #54E8A9',
                    color: 'black',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '5px',
                    marginTop: '50px',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={changeShowNewMessage}
                >
                  Send message to hitchhiker
                </button>
                <button
                  style={{
                    // padding: '10px 20px',
                    backgroundColor: ' #54E8A9',
                    color: 'black',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '5px',
                    marginTop: '50px',
                    marginRight: '10px',
                    marginLeft:'20px',
                    cursor: 'pointer',
                  }}
                  onClick={save}
                >
                  Continue
                </button>
              </div>
              <button
                style={{
                  // padding: '10px 20px',
                  backgroundColor: ' #54E8A9',
                  color: 'black',
                  fontWeight: 'bold',
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
                <NewMessage message={{ user_idSend: item.ride_offer.user_id, user_idReceive: current_user._id, rides_id: rideId }} nav={'/user/'} setShowNewMessage={setShowNewMessage} />
              </div>
            </div>
          </div>
        )}
      </div >
    </>
  );
}
