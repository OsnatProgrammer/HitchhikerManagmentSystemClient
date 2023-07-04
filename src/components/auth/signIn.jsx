import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL, TOKEN_NAME, CURRENT_USER, arrRideHistory, doApiGet, arrRidsCloseAdmin, arrOfferOpenAdmin, arrRequstOpenAdmin } from '../services/apiService';
import Nav from '../general_comps/nav';
// import {  } from './../services/apiService';


export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const nav = useNavigate();

    const onSubForm = (bodyData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
        console.log(bodyData)
        doApiForm(bodyData);
    }
    const getAllRidesByIdUser = async () => {
        try {
            const url = API_URL + "/rides/getAllRidesById";
            const response = await doApiGet(url);
            const rides = response.data.rides;
            console.log(rides);
            return rides;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch rides");
        }
    };


    // Trips that have been closed
    const getRidesListAdmin = async () => {
        try {
            const url = API_URL + `/rides/getAllRides`;
            const response = await doApiGet(url);
            console.log("response", response);
            const rides = response.data.arr;
            console.log(rides);
            return rides;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch rides");
        }
    };


    //Travel requests
    const getAllRidesRequestAdmin = async () => {
        try {
            const url = API_URL + "/rideRequests/getAllridesRequestsOpen";
            const response = await doApiGet(url);
            const rides = response.data.ar_rideRequests;
            console.log(rides);
            return rides;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch rides");
        }
    };

    //Travel offers
    const getAllRidesOfferAdmin= async () => {
        try {
            const url = API_URL + "/rideoffers/getAllridesoffersOpen";
            const response = await doApiGet(url);

            const rides = response.data.ar_rideoffers;
            console.log(rides);
            return rides;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to fetch rides");
        }
    };

    // const getAllridesoffersOpenUser = async () => {
    //     try {
    //       const url = API_URL + `/rideOffers/getAllridesoffersOpenById`;
    //       const response = await doApiGet(url);
    //       console.log("response", response);
    //       const rides = response.data.ar_rideoffers;
    //       console.log(rides);
    //       setRidesOffer(rides); // Assign the value to the state variable
    //       return rides;
    //     } catch (err) {
    //       console.log(err);
    //       throw new Error("Failed to fetch rides");
    //     }
    //   };
    
    //   const getAllridesRequestsOpenUser = async () => {
    //     try {
    //       const url = API_URL + `/rideRequests/getAllRidesRequestsOpenById`;
    //       const response = await doApiGet(url);
    //       console.log("response", response);
    //       const rides = response.data.ar_rideRequests;
    //       console.log(rides);
    //       setRidesRequest(rides); // Assign the value to the state variable
    //       return rides;
    //     } catch (err) {
    //       console.log(err);
    //       throw new Error("Failed to fetch rides");
    //     }
    //   };


    const doApiForm = async (bodyData) => {
        let url = API_URL + "/users/login"
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
            // לשמור את הטוקן
            localStorage.setItem(TOKEN_NAME, resp.data.token);
            localStorage.setItem(CURRENT_USER, JSON.stringify(resp.data.user));
            // לשגר לעמוד של רשימת המשתמשים
            if (resp.data.token) {

                if (resp.data.user.role.includes("admin")) {
                    nav("/manager");
                   
                    let ridsCloseAdmin = await getRidesListAdmin();
                    console.log(ridsCloseAdmin);
                    localStorage.setItem(arrRidsCloseAdmin, JSON.stringify(ridsCloseAdmin));
                   
                    let offerOpenAdmin = await getAllRidesOfferAdmin();
                    console.log(offerOpenAdmin);
                    localStorage.setItem(arrOfferOpenAdmin, JSON.stringify(offerOpenAdmin));
                    
                    let requstOpenAdmin = await getAllRidesRequestAdmin();
                    console.log(requstOpenAdmin);
                    localStorage.setItem(arrRequstOpenAdmin, JSON.stringify(requstOpenAdmin));
                }
                else if (resp.data.user.role.includes("user")) {
                    nav("/user");
                  
                    let rideHistory = await getAllRidesByIdUser();
                    console.log(rideHistory);
                    localStorage.setItem(arrRideHistory, JSON.stringify(rideHistory));
                  
                    // let myRidesOffer = await getAllridesoffersOpenUser();
                    // console.log(myRidesOffer);
                    // localStorage.setItem(arrMyRidesOffer, JSON.stringify(myRidesOffer));
                   
                    // let myRidesRequst = await getAllridesRequestsOpenUser();
                    // console.log(myRidesRequst);
                    // localStorage.setItem(arrMyRidesRequst, JSON.stringify(myRidesRequst));
                }
                // window.location.reload();
                // if (!data.user.role)
                //  nav("/");
            }
        }
        catch (err) {
            console.log(err.response);
            alert("User or password wrong, or service down");
        }
    }


    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    })

    let passwordRef = register("password", { required: true, minLength: 3 });

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit(onSubForm)} className=' p-5 mx-auto'>
                    {/* <h2>Welcome back</h2> */}
                    <h2 className='label'>WELCOME BACK</h2>
                    <label>
                        <span>Email</span>
                        <input className='text-dark' {...emailRef} type="email" />
                        {errors.email && <div className="text-danger">Enter valid email</div>}
                    </label>
                    <label>
                        <span>Password</span>
                        <input className='text-dark' {...passwordRef} type="password" />
                        {errors.password && <div className="text-danger ">Enter min 3 charts password</div>}
                    </label>
                    <button type="submit" className="submit">login</button>
                    {/* <button type="button" className="fb-btn">Join with <span>facebook</span></button> */}
                </form>
            </div>
        </>
    )
}


