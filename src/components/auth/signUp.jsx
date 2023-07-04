import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link } from 'react-router-dom';
import { doApiMethod, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import AddressInput from './../user_comps/addressInput';

export default function SignUp() {
    const [address, setAddress] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const nav = useNavigate();

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
    };

    const onSubForm = (bodyData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
        console.log(bodyData)
        doApiForm(bodyData);
    }

    const doApiForm = async (bodyData) => {
        let url = API_URL + "/users"
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
            // לשמור את הטוקן
            localStorage.setItem(TOKEN_NAME, resp.data.token);
            localStorage.setItem(CURRENT_USER, JSON.stringify(resp.data.user));
            // לשגר לעמוד של רשימת המשתמשים
            nav("/login");
            window.location.reload();
            // if (!data.user.role)
            //   nav("/");
        }
        catch (err) {
            console.log(err.response);
            alert("There is problem or email already exist");
        }
    }

    const firstNameRef = register('fullName.firstName', {
        required: true,
        minLength: 2,
    });
    const lastNameRef = register('fullName.lastName', {
        required: true,
        minLength: 2,
    });
    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    })
    let addressRef = register("address", { required: true, minLength: 2 });
    let genderRef = register("gender", { required: true, minLength: 4 });
    let passwordRef = register("password", { required: true, minLength: 3 });

    return (
        <>
            <div className='container'>
                <h2 className='text-center pt-3 label'>CREATE AN ACCOUNT</h2>
                <form onSubmit={handleSubmit(onSubForm)} className='row mx-auto'>

                    <div className="col-md-6 label">
                        <label>First Name:</label>
                        <input {...firstNameRef} type="text" />
                        {errors.fullName?.firstName && (
                            <small className="text-danger">Enter valid name</small>)}
                    </div>

                    <div className="col-md-6 label">
                        <label>Last Name:</label>
                        <input {...lastNameRef} type="text" />
                        {errors.fullName?.lastName && (
                            <small className="text-danger">Enter valid name</small>)}
                    </div>

                    <div className="d-flex col-md-6 label flex-column">
                        <div className="d-flex align-items-center">
                            <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender:</label>
                        </div>
                        <div className="d-flex align-items-center label">
                            <label className="radio-label">
                                <input {...genderRef} type="radio" value="male" />
                                <span className="radio-text">Male</span>
                            </label>
                            <label className="radio-label label">
                                <input {...genderRef} type="radio" value="female" />
                                <span className="radio-text">Female</span>
                            </label>
                            <label className="radio-label label">
                                <input {...genderRef} type="radio" value="other" />
                                <span className="radio-text">Other</span>
                            </label>
                        </div>
                        {errors.text && <div className="text-danger">Enter valid gender</div>}
                    </div>

                    {/* <label>Gender:</label>
                    <input {...genderRef} type="text" />
                    {errors.text && <div className="text-danger">Enter valid gender</div>} */}
                    {/* <label>Gender:</label>
                        <select {...genderRef}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <div className="text-danger">Enter valid gender</div>} */}

                    <div className='col-md-6 label'>
                        <label>Address:</label>
                        <input {...addressRef} type="text" />
                        {errors.address && <small className="text-danger">Enter valid address</small>}
                        {/* <label>Address:</label>
                    <AddressInput
                        onAddressChange={handleAddressChange} /> */}
                    </div >

                    <div className='col-md-6 label'>
                        <label>Email:</label>
                        <input {...emailRef} type="email" />
                        {errors.email && <small className="text-danger">Enter valid email</small>}
                    </div>

                    <div className='col-md-6 label'>
                        <label>Password:</label>
                        <input {...passwordRef} type="password" />
                        {errors.password && <small className="text-danger">Enter min 3 charts</small>}
                    </div>

                    <div className="mt-4 label">
                        {/* <div className="checkbox-container">
                            <input id="consent" type="checkbox" />
                        </div> */}
                        <div className="text-container">
                            <span>By creating an account, I consent to the processing of my personal data in accordance with the </span>
                            <Link to={"/privacyPolicy"} target="_blank">Privacy Policy</Link>
                        </div>
                    </div>

                    {/* <div className='m-4'>By creating an account, I consent to the processing of my personal data in accordance of the</div> */}
                    {/* <Link to="/privacyPolicy" className="fw-bold" target="_blank">PRIVACY POLICY</Link> */}
                    <button type="submit" className="submit col-md-6">CREATE</button>
                </form >
            </div >
        </>
    )
}