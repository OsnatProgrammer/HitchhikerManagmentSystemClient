import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, useRef } from 'react';
import { API_URL, CURRENT_USER, doApiMethod } from '../services/apiService';
import AddressInput from './addressInput';
import styles from './css/nearByRides.module.css'

export default function RideRequest() {

  const time = useRef();

  const [departure_address, setDeparture_address] = useState('');
  const [destination_address, setDestination_address] = useState('');

  const [ShowToast, setShowToast] = useState(false)

  const handleDeparture_addressChange = (newAddress) => {
    setDeparture_address(newAddress);
  };
  const handleDestination_addressChange = (newAddress) => {
    setDestination_address(newAddress);
  };


  const inputRef = useRef(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    setShowToast(true)
    console.log(errors);
    // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
    bodyData.departure_address = departure_address
    bodyData.destination_address = destination_address

    let dateString = bodyData.departure_time;
    let timeString = time.current.value;

    let [day, month, year] = dateString.split('-');
    let [hours, minutes] = timeString.split(':');

    // JavaScript Date months are zero-based, so subtract 1 from the month
    let date = new Date(year, month, day, hours, minutes);
    bodyData.departure_time = date;

    console.log(bodyData)
    doApiForm(bodyData);
  }

  const doApiForm = async (bodyData) => {
    let urlRideDetails = API_URL + "/rideDetails/addRideDetails"
    let urlRideRequest = API_URL + "/rideRequests/addrideRequest"
    try {
      let { data } = await doApiMethod(urlRideDetails, "POST", bodyData);

      let current_user = JSON.parse(localStorage.getItem(CURRENT_USER))
      let resp = await doApiMethod(urlRideRequest, "POST", { user_id: current_user._id, rideDetails_id: data._id })

      setInterval(() =>{
        window.location.reload();
      }, 10000)


    }
    catch (err) {
      console.log(err.response);
      alert("There is problem");

    }
  }

  // let departure_addressRef = register("departure_address", { required: true });
  let departure_timeRef = register("departure_time", { required: true });
  // let emptySeatNumRef = register("emptySeatNum", { required: true, min: 1 });

  return (
    <>
      {/* <div className={`${styles.strip} d-flex align-items-end`}>
        <div className='display-1'>
          Ride Request
        </div>
      </div> */}

      <div style={{ minHeight: '111px', backgroundColor: '#54E8A9', position: 'relative', top: '340px', zIndex: '-99' }}></div>

      <div className='container'>
      <div className={`${styles.title} display-1 mb-3`}>
          Ride Request
        </div>
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow mx-auto' style={{ background: '#DDDEDC', borderRadius: '10px', width: '45' }}>

          <label style={{ fontSize: '20px' }}>Departure Address:</label>
          <AddressInput
            onAddressChange={handleDeparture_addressChange} />

          <label style={{ fontSize: '20px' }}>Destination Address:</label>
          <AddressInput
            onAddressChange={handleDestination_addressChange} />

          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-md-4'>
              <label>Date:</label>
              <input {...departure_timeRef} type="date" className='form-control' />
            </div>

            <div className='col-md-4'>
              <label>Time:</label>
              <input ref={time} type="time" className='form-control' />
            </div>

            <button type='submit' className='btn button m-3 w-50 mt-5'>Send</button>
          </div>
        </form>

        {ShowToast &&
          <div className="position-fixed p-3 bg-light border" style={{ zIndex: "11", bottom:'10px', right:'10px' }}>
            <div id="liveToast" className="hide" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="toast-header">
                <div className="toast-body">
                  Your request has been received in the system
                </div>
                <button onClick={() => {
                  setShowToast(false)
                  window.location.reload()
                }} type="button" className="btn-close" aria-label="Close"></button>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}