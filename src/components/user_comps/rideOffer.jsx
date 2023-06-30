import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { API_URL, CURRENT_USER, doApiMethod } from '../services/apiService';
import AddressInput from './addressInput';

export default function RideOffer() {

  const time = useRef();

  const [departure_address, setDeparture_address] = useState('');
  const [destination_address, setDestination_address] = useState('');

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
    let urlRideOffers = API_URL + "/rideOffers/addRideOffer"
    try {
      let { data } = await doApiMethod(urlRideDetails, "POST", bodyData);

      let current_user = JSON.parse(localStorage.getItem(CURRENT_USER))
      let resp = await doApiMethod(urlRideOffers, "POST", { user_id: current_user._id, rideDetails_id: data._id })

      //שליחת הההצעה לשרת לבדוק האם יש בקשה מתאימה אם מחזיר טרו
      //לשלוח בקשת שרת לפתוח הודעה לפותח לrequest
      //אם פותח הבקשה מאשר את ההודעה לפתוח ride עם שתי ה id
      
      window.location.reload();

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem");

    }
  }

  // let departure_addressRef = register("departure_address", { required: true });
  let departure_timeRef = register("departure_time", { required: true });
  let emptySeatNumRef = register("emptySeatNum", { required: true, min: 1 });

  return (
    <>
      <div className='container'>
        <h1 className='text-center'>Add Offer</h1>
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow mx-auto'>

          <label>Departure_address:</label>
          <AddressInput
            onAddressChange={handleDeparture_addressChange} />

          <label>Destination_address:</label>
          <AddressInput
            onAddressChange={handleDestination_addressChange} />

          <label>Date:</label>
          <input {...departure_timeRef} type="date" className='form-control' />

          <label>Time:</label>
          <input ref={time} type="time" className='form-control' />

          <label>emptySeatNum:</label>
          <input {...emptySeatNumRef} type="number" defaultValue={1} className='form-control' />
          {errors.emptySeatNum && <div className="text-danger">Enter valid address</div>}

          <button type='submit' className='btn button mt-3'>Send</button>
        </form>
      </div>
    </>
  )
}