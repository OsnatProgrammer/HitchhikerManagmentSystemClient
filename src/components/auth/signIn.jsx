import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import Nav from '../general_comps/nav';


export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const nav = useNavigate();

    const onSubForm = (bodyData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
        console.log(bodyData)
        doApiForm(bodyData);
    }

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
                }
                else if (resp.data.user.role.includes("user"))
                    nav("/user");
                window.location.reload();
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
                <form onSubmit={handleSubmit(onSubForm)} className=' p-3 mx-auto'>
                    {/* <h2>Welcome back</h2> */}
                    <h2>WELCOME BACK</h2>
                    <label>
                        <span>Email</span>
                        <input  {...emailRef} type="email" />
                        {errors.email && <div className="text-danger">Enter valid email</div>}
                    </label>
                    <label>
                        <span>Password</span>
                        <input {...passwordRef} type="password" />
                        {errors.password && <div className="text-danger ">Enter min 3 charts password</div>}
                    </label>
                    <button type="submit" className="submit">login</button>
                    {/* <button type="button" className="fb-btn">Join with <span>facebook</span></button> */}
                </form>
            </div>
        </>
    )
}


