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
                <h2 className='text-center mt-1'>CREATE AN ACCOUNT</h2>
                <form onSubmit={handleSubmit(onSubForm)} className='row p-3 mx-auto'>

                    <div className="col-md-6">
                        <label>First Name:</label>
                        <input {...firstNameRef} type="text" />
                        {errors.fullName?.firstName && (
                            <div className="text-danger">Enter valid name</div>)}
                    </div>

                    <div className="col-md-6">
                        <label>Last Name:</label>
                        <input {...lastNameRef} type="text" />
                        {errors.fullName?.lastName && (
                            <div className="text-danger">Enter valid name</div>)}
                    </div>

                    <div className="d-flex col-md-6 flex-column">
                        <div className="d-flex align-items-center">
                            <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender:</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <label className="radio-label">
                                <input {...genderRef} type="radio" value="male" />
                                <span className="radio-text">Male</span>
                            </label>
                            <label className="radio-label">
                                <input {...genderRef} type="radio" value="female" />
                                <span className="radio-text">Female</span>
                            </label>
                            <label className="radio-label">
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

                    <div className='col-md-6'>
                        <label>Address:</label>
                        <input {...addressRef} type="text" />
                        {errors.address && <div className="text-danger">Enter valid address</div>}
                        {/* <label>Address:</label>
                    <AddressInput
                        onAddressChange={handleAddressChange} /> */}
                    </div >

                    <div className='col-md-6'>
                        <label>Email:</label>
                        <input {...emailRef} type="email" />
                        {errors.email && <div className="text-danger">Enter valid email</div>}
                    </div>

                    <div className='col-md-6'>
                        <label>Password:</label>
                        <input {...passwordRef} type="password" />
                        {errors.password && <div className="text-danger">Enter min 3 charts password</div>}
                    </div>

                    <div className="mt-4">
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


{/* <form onSubmit={handleSubmit(onSubFormLogin)} className=' p-3 mx-auto'>
            <h2>Welcome back</h2>
            <label>
              <span>Email</span>
              <input  {...emailRefLogin} type="email" />
              {errors.email && <div className="text-danger">Enter valid email</div>}
            </label>
            <label>
              <span>Password</span>
              <input {...passwordRefLogin} type="password" />
              {errors.password && <div className="text-danger ">Enter min 3 charts password</div>}
            </label>
            <button type="submit" className="submit">login</button>
            <button type="button" className="fb-btn">Join with <span>facebook</span></button>
          </form> */}
