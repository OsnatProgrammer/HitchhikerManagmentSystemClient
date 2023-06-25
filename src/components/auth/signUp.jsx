import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const nav = useNavigate();

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

    let nameRef = register("name", { required: true, minLength: 2 });
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
                <h1 className='text-center'>Sign up</h1>
                <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow mx-auto'>
                    <label>Name:</label>
                    <input {...nameRef} type="text" className='form-control' />
                    {errors.name && <div className="text-danger">Enter valid name</div>}

                    <label>Email:</label>
                    <input {...emailRef} type="text" className='form-control' />
                    {errors.email && <div className="text-danger">Enter valid email</div>}

                    <label>Address:</label>
                    <input {...addressRef} type="text" className='form-control' />
                    {errors.address && <div className="text-danger">Enter valid address</div>}

                    <label>Gender:</label>
                    <input {...genderRef} type="text" className='form-control' />
                    {errors.email && <div className="text-danger">Enter valid gender</div>}

                    <label>Password:</label>
                    <input {...passwordRef} type="text" className='form-control' />
                    {errors.password && <div className="text-danger">Enter min 3 charts password</div>}

                    <button type='submit' className='btn btn-dark mt-3'>Log in to system</button>
                </form>
            </div>
        </>
    )
}
