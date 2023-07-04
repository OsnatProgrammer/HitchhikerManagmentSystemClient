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

const user = JSON.parse(localStorage.getItem(CURRENT_USER));

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
      const updatedUserInLocalStorage = { ...user, ...updatedUserData };
      localStorage.setItem(CURRENT_USER, JSON.stringify(updatedUserInLocalStorage));

      setIsEditing(false);
    } catch (err) {
      console.log(err);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="col-md-6 p-3 shadow mx-auto"
            // action="#"
            // method="POST"
            >
              <div className="-space-y-px rounded-md shadow-sm p-3 text-white">
                <InputFirstName
                  label="First Name"
                  register={register}
                  errors={errors}
                  className="relative m-2 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-dark"
                />

                <InputLastName
                  label="Last Name"
                  register={register}
                  errors={errors}
                  className="relative m-2 block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-dark"
                />

                <InputEmail
                  label="Email"
                  register={register}
                  errors={errors}
                  className="relative m-2 block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-dark"
                />


                <SelectGender
                  label="Gender"
                  register={register}
                  errors={errors}
                  name="gender"
                  className="relative m-2 block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-dark"
                />

                <AddressInput
                  label="Address"
                  onAddressChange={handleAddressChange}
                  register={register}
                  errors={errors}

                  defaultValue={user.address}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <section className="container-fluid">
          <div className="container py-5 h-100 row ">
            <div className=" d-flex justify-content-center align-items-center h-100 row">


              <div className="card col-12">
                <div
                  className=" mt-5 rounded-top text-white d-flex flex-row "
                  style={{ backgroundColor: '#000', height: '200px', width: '900px' }}
                >
                  <div className="ms-4 mt-4 d-flex flex-column" style={{ width: '150px' }}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '150px', zIndex: '1' }}
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
                  <div className="ms-3" style={{ marginTop: '110px' }}>
                    <h5>
                      {user.fullName.firstName} {user.fullName.lastName}
                    </h5>
                    <p className="text-danger fw-bold">Registered User</p>
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa', width: '900px' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0 text-black " style={{ width: "900px" }}>
                  <div className="">
                    <p className="lead fw-normal text-white">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <p className="font-italic mb-1">Registered User</p>
                      <p className="font-italic mb-1"> {user.gender}</p>
                      <p className="font-italic mb-1">Lives in {user.address}</p>
                      <p className="font-italic mb-0">{user.email}</p>
                      <p className="font-italic mb-0">password: {user.password}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0 text-white">Recent photos</p>
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
            </div>

          </div>

        </section>
      )}
    </div>
  );
} 