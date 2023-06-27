// import { LockClosedIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
// import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { getCities, getCountries } from '../../helpers/fillCountry';
import { API_URL, CURRENT_USER, doApiMethodTokenPatch } from '../services/apiService';
// ---------------------------------------------------------------
import InputFirstName from '../inputs/inputFirstName';
import InputLastName from '../inputs/inputLastName'
import InputPhone from '../inputs/inputPhone';
import InputStreetAddress from '../inputs/inputStreetAddress';
import InputHouseNumber from '../inputs/inputHouseNumber';
import SelectCity from '../inputs/selectCity';
import SelectCountry from '../inputs/selectCountry';
import InputEmail from '../inputs/inputEmail';
import SelectGender from '../inputs/selectGender';

const MyInfo = () => {

  // const [myInfo, setMyInfo] = useState({})
  const user = JSON.parse(localStorage.getItem(CURRENT_USER))
  // const { user } = useSelector((state) => state.userSlice)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isChangeAddress, setIsChangeAddress] = useState(false)
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Israel");
  const [selectedCity, setSelectedCity] = useState("");
  const countryRef = useRef();
  const cityRef = useRef();

  useEffect(() => {
    getAllCountries()

  }, []);

  useEffect(() => {
    getAllCities(selectedCountry)

  }, [selectedCountry])

  const getAllCountries = async () => {
    let data = await getCountries();
    let countriesName = await data?.map((country) => country.country);
    setCountries(countriesName);
  };

  const getAllCities = async (_country) => {
    let data = await getCities(_country);
    setCities(data);
    setSelectedCity(data[0])

  };

  const onSub = (_dataBody) => {
    setIsSubmitted(true);
    _dataBody.worker.jobs = user.data.worker.jobs
    _dataBody.worker.restaurantID = user.data.worker.restaurantID
    if (isChangeAddress) {

      _dataBody.address.country = selectedCountry
      _dataBody.address.city = selectedCity
    }
    doApiEditInfo(_dataBody)
  }

  const doApiEditInfo = async (_dataBody) => {
    if (user) {
      let url = API_URL + '/users/editUser/' + user.data._id;
      try {
        const data = await doApiMethodTokenPatch(url, "PATCH", _dataBody);
        if (data) {
          window.location.reload(false);
        } else {
          console.log(data)
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  };


  return (


    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className='flex-col text-center'>

          <h2 className="mb-2 text-3xl font-bold tracking-tight text-purple-300">
            Your Personal details
          </h2>
          <button className="mt-3 tracking-tight text-purple-500 bg-red-200 rounded-full p-2" onClick={() => {
            if (isChangeAddress)
              setIsChangeAddress(false)
            else
              setIsChangeAddress(true)
          }}>change address</button>
        </div>
        {user && <form onSubmit={handleSubmit(onSub)} className="col-md-6 p-3 shadow mx-auto" action="#" method="POST">
          <div className="-space-y-px rounded-md shadow-sm p-3">
            <InputFirstName
              label={" First Name "}
              register={register}
              errors={errors}
              defaultValue={user.fullName.firstName}
              className={"relative m-2 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
            />

            <InputLastName
              label={" Last Name "}
              register={register}
              errors={errors}
              defaultValue={user.fullName.lastName}
              className={"relative m-2 block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
            />

            <InputEmail
              label={" Email "}
              register={register}
              errors={errors}
              defaultValue={user.email}
              className={"relative m-2 block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
            />

            <SelectGender
              label={" Gender "}
              register={register}
              errors={errors}
              defaultValue={user.gender} // Assuming `user.gender` contains the gender from the database
              className="relative m-2 block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />


            {/* {isChangeAddress && <>
              {countries &&
                <SelectCountry label={"Country"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register} setSelectedCountry={setSelectedCountry} countries={countries} countryRef={countryRef}
                  defaultValue={user.data.address.country != '' ? user.data.address.country : "select country"}
                />
              }


              {cities && <SelectCity label={"City"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register}
                setSelectedCity={setSelectedCity} selectedCity={selectedCity} cities={cities} cityRef={cityRef}
                defaultValue={user.data.address.city != '' ? user.data.address.city : "select city"}
              />
              }

              <InputStreetAddress label={" Street name "} labelStyle={"sr-only"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                register={register}
                errors={errors}
                defaultValue={user.data.address.Street != '' ? user.data.address.Street : "street address ..."}
              />

              <InputHouseNumber label={"house number"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register} errors={errors}
                defaultValue={user.data.address.num != null ? user.data.address.num : "street number ..."}
              />
            </>
            } */}

          </div>
          <div>

            {!isSubmitted ?
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span> */}
                Update now
              </button>
              : <h1>Loading</h1>
              // <ThreeDots
              //     height="80"
              //     width="80"
              //     radius="9"
              //     color="blue"
              //     ariaLabel="three-dots-loading"
              //     wrapperStyle={{}}
              //     wrapperClass="flex justify-center"
              //     visible={true}
              // />

            }

          </div>
        </form>}
      </div>
    </div>
  )
}

export default MyInfo