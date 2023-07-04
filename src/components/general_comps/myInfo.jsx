import React, { useState, useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { API_URL, CURRENT_USER, doApiMethod } from '../services/apiService';
import InputFirstName from '../inputs/inputFirstName';
import InputLastName from '../inputs/inputLastName';
import InputPhone from '../inputs/inputPhone';
import InputStreetAddress from '../inputs/inputStreetAddress';
import InputHouseNumber from '../inputs/inputHouseNumber';
import InputEmail from '../inputs/inputEmail';
import SelectGender from '../inputs/selectGender';
import AddressInput from '../user_comps/addressInput';
import InputPassword from '../inputs/inputPassword';
import { bottom } from '@popperjs/core';

const user = JSON.parse(localStorage.getItem(CURRENT_USER));
const imageFemale = "https://media.istockphoto.com/id/1098017436/photo/portrait-of-a-young-woman-side-view.jpg?s=612x612&w=0&k=20&c=Tr3GW0WT5ytzuj6JcLV98R4MDTtB6i2K3Z8gvqPTCpA=";
const imageMale = "https://media.istockphoto.com/id/498085583/photo/silhouette-of-the-man-on-a-white-background.jpg?b=1&s=612x612&w=0&k=20&c=qtvfp762Uyes36ThewDwdRnTuj1xf45rHJEDsk4ius0=";


export const updateUser = async (userId, updatedUserData) => {
  try {
    const url = `${API_URL}/users/${userId}`;
    const response = await doApiMethod(url, "PUT", updatedUserData);

    const updatedUser = response.data;
    console.log('User updated:', updatedUser);
    return updatedUser;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update user');
  }
};

export default function MyInfo() {
  const [isEditing, setIsEditing] = useState(false);
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [address, setAddress] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();


  useEffect(() => {
    setValue('fullName.firstName', user.fullName.firstName);
    setValue('fullName.lastName', user.fullName.lastName);
    setValue('email', user.email);
    setValue('gender', user.gender); // Set default value for the gender field
    setValue('address', user.address); // Set default value for the address field
  }, [setValue, user]);



  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = async (data) => {
    const { fullName, email, gender, address } = data;
    console.log(data, "data")
    const updatedUserData = {
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName
      },
      email,
      gender,
      address,
      password: user.password
    };

    try {
      const updatedUser = await updateUser(user._id, updatedUserData);
      console.log('User updated:', updatedUser);
      // const updatedUserInLocalStorage = { ...user, ...updatedUserData };
      // localStorage.setItem(CURRENT_USER, JSON.stringify(updatedUserInLocalStorage));

      setIsEditing(false);
    } catch (err) {
      console.log(err);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <div >
      {isEditing ? (
        <div className="flex  py-12 px-4 sm:px-6 lg:px-8">
          <div className=" container">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="col-md-6 p-3 shadow mx-auto"
            // action="#"
            // method="POST"
            style={{ border:"solid 2px #54E8A9"}}
            >
 
              <div className=" shadow-sm pt-5 text-white text-start" style={{ width: '65%',  margin: '0 auto' }}>
 
                
                <InputFirstName
                  label="First Name"
                  register={register}
                  errors={errors}
                  // className="relative m-2 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-dark"
                  className='form-control'
                />

                <InputLastName
                  label="Last Name"
                  register={register}
                  errors={errors}
                  // className="relative m-2 block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-dark"
                  className='form-control'
                />

                <InputEmail
                  label="Email"
                  register={register}
                  errors={errors}
                  className="relative m-2 block w-full appearance-none  border border-gray-300 px-3 py-2  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-dark"
                // style={{ width: '65%', margin: '0 auto' }}
                />


                <SelectGender
                  label="Gender"
                  register={register}
                  errors={errors}
                  name="gender"
                  className="relative m-2 block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white mb-3 text-dark"
                />

              </div>
              <p className='text-white mt-3 mb-1'>Address</p>
              <AddressInput
                label="Address"
                onAddressChange={handleAddressChange}
                register={register}
                errors={errors}

                defaultValue={user.address}
              />


              <div className="flex justify-between m-4">
                <button
                  type="submit"
                  className="btn button"
                  style={{width:"80px", marginRight:"16px"}}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btn button"
                  style={{width:"80px" }}

                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <section className="container-fluid">


          <div className="card pt-5">
            <div
              className=" mt-5 rounded-top text-white d-flex flex-row "
              style={{ backgroundColor: '#000', height: '150px', borderBottom: '8px solid #54E8A9' }}
            >
              <div className="ms-4  d-flex flex-column" style={{ width: '150px',marginTop:"56px" }}>
                <img
                  src={user.gender == "male" ? `${imageMale}` : `${imageFemale}`}

                  alt="Generic placeholder image"
                  className="img-fluid  mt-3 mb-2"
                  style={{ height: '250px',  zIndex: '1', }}
                />
                <button
                  type="button"
                  className="btn btn-dark "
                  data-mdb-ripple-color="dark"
                  style={{ zIndex: '1' }}
                  onClick={handleEditProfile}
                >
                  Edit profile
                </button>
              </div>
              <div className="ms-3" style={{ marginTop: '70px' }}>
                <h5>
                  {user.fullName.firstName} {user.fullName.lastName}
                </h5>
                <p className=" fw-bold" style={{ color: '#54E8A9' }}>Registered User</p>
              </div>
            </div>
            <div className="p-4" style={{ backgroundColor: '#f8f9fa', color: '#54E8A9' }}>
              <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <p className="mb-1 h5">10</p>
                  <p className="small  mb-0">Rides</p>
                </div>
                <div className="px-3">
                  <p className="mb-1 h5">50</p>
                  <p className="small  mb-0">Offers</p>
                </div>
                <div>
                  <p className="mb-1 h5">5</p>
                  <p className="small  mb-0">Requests</p>
                </div>
              </div>
            </div>
            <div className="card-body p-0 text-black ">
              <div className="text-start">
                <p className="lead fw-normal text-white ps-4 pt-3">About</p>
                <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                  <p className="font-italic mb-1">Registered User</p>
                  <p className="font-italic mb-1"> {user.gender}</p>
                  <p className="font-italic mb-1">Lives in {user.address}</p>
                  <p className="font-italic mb-0">{user.email}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="lead fw-normal mb-0 text-white pt-3">Recent Rides</p>
                <p className="mb-0">
                  <a href="#!" className="text-muted">
                    Show all
                  </a>
                </p>
              </div>
              <div className="row g-2">
                <div className="col mb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>
                <div className="col mb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>
              </div>
              <div className="row g-2">
                <div className="col">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>
                <div className="col">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                    alt="image 1"
                    className="w-100 rounded-3"
                  />
                </div>

              </div>
            </div>

          </div>

        </section>
      )}
    </div>
  );
} 