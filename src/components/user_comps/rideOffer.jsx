import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_URL, CURRENT_USER, doApiMethod } from '../services/apiService';

export default function RideRequest() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
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

      window.location.reload();

      // if (!data.user.role)
      //   nav("/");

    }
    catch (err) {
      console.log(err.response);
      alert("There is problem");

    }
  }

  let departure_addressRef = register("departure_address", { required: true, minLength: 2 });
  let destination_addressRef = register("destination_address", { required: true, minLength: 2 });
   let departure_timeRef = register("departure_time", { required: true });
   let emptySeatNumRef = register("emptySeatNum", { required: true, min: 1 });

  return (
    <>
      <div className='container'>
        <h1 className='text-center'>Add Offer</h1>
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow mx-auto'>

          <label>departure_address:</label>
          <input {...departure_addressRef} type="text" className='form-control' />
          {errors.departure_address && <div className="text-danger">Enter valid address</div>}

          <label>destination_address:</label>
          <input {...destination_addressRef} type="text" className='form-control' />
          {errors.destination_address && <div className="text-danger">Enter valid address</div>}

          <label>Time:</label>
          <input {...departure_timeRef} type="date" className='form-control' />

          <label>emptySeatNum:</label>
          <input {...emptySeatNumRef} type="number" defaultValue={1} className='form-control' />
          {errors.emptySeatNum && <div className="text-danger">Enter valid address</div>}

          <button type='submit' className='btn btn-dark mt-3'>Log in to system</button>
        </form>
      </div>
    </>
  )
}
