import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';


export default function Login() {
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

      if (resp.token) {
        if (resp.user.role.includes("admin")) {
          nav("/manager");
        }
        else if (resp.user.role.includes("user"))
          nav("/user");

        window.location.reload();

        // if (!data.user.role)
        //   nav("/");

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
    <h1 className='text-center'>Log in to admin</h1>
    <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow mx-auto'>
      <label>Email:</label>
      <input {...emailRef} type="text" className='form-control' />
      {errors.email && <div className="text-danger">Enter valid email</div>}

      <label>Password:</label>
      <input {...passwordRef} type="text" className='form-control' />
      {errors.password && <div className="text-danger">Enter min 3 charts password</div>}
      <button type='submit' className='btn btn-dark mt-3'>Log in to system</button>
    </form>
  </div>
  </>
)

}


// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate, Link } from 'react-router-dom';
// // import { Triangle } from 'react-loader-spinner'
// import { LockClosedIcon } from '@heroicons/react/20/solid'
// import { ThreeDots } from 'react-loader-spinner'
// import { useDispatch } from 'react-redux';
// // import { saveInfo } from '../../redux/featchers/restaurantSlice';
// import { API_URL, doApiMethodSignUpLogin, TOKEN_NAME } from '../../services/servise';
// import { getUserInfo } from '../features/';
// import InputEmailLinked from '../ui/inputs/groupLinked/inputEmailLinked';
// import InputPasswordLinked from '../ui/inputs/groupLinked/inputPasswordLinked';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }
// const Login = () => {
//   const dispatch = useDispatch();


//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const nav = useNavigate()
//   let { register, handleSubmit, formState: { errors } } = useForm();
//   const onSub = (_dataBody) => {
//     setIsSubmitted(true);
//     doApi(_dataBody)
//   }

//   const doApi = async (_dataBody) => {
//     try {
//       const url = API_URL + '/users/login';
//       const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
//       console.log(data)

//       if (data.token) {
//         localStorage.setItem(TOKEN_NAME, data.token);
//        localStorage.setItem(USER_TOKEN, data.user);
//         if (data.user.role.includes("admin")) {

//           console.log(data)
//           nav("/manager");
//         }
//         else if (data.user.role.includes("user"))
//           nav("/user");

//         window.location.reload();

//         // if (!data.user.role)
//         //   nav("/");

//       }
//       dispatch(getUserInfo())

//     }
//     catch (err) {

//       setIsSubmitted(false);
//       alert(err.response.data.msg);
//     }
//   }
//   return (
//     <>
//       <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md space-y-8">
//           <div>
//             {/* <img
//                             className="mx-auto h-12 w-auto"
//                             src=""
//                             alt="Your Company"
//                         /> */}
//             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
//               Log in your account over here
//             </h2>
//           </div>
//           <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
//             <div className="-space-y-px rounded-md shadow-sm">
//               <InputEmailLinked
//                 label={" Email address "}
//                 register={register}
//                 errors={errors}
//                 className={"relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
//               />
//               <InputPasswordLinked
//                 label={" Password "}
//                 register={register}
//                 errors={errors}
//                 className={classNames(errors.password ? "relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   :
//                   "relative block w-full appearance-none  rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
//               />

//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <div className="text-sm">
//                   <Link to={'/requestResetPass'} className="font-medium text-indigo-600 hover:text-indigo-500">
//                     Forgot your password?
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div>

//               {!isSubmitted ?
//                 <button
//                   type="submit"
//                   className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 >
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
//                   </span>
//                   Log in
//                 </button>
//                 :
//                 <ThreeDots
//                   height="80"
//                   width="80"
//                   radius="9"
//                   color="blue"
//                   ariaLabel="three-dots-loading"
//                   wrapperStyle={{}}
//                   wrapperClass="flex justify-center"
//                   visible={true}
//                 />

//               }

//             </div>
//           </form>
//         </div>
//       </div>
//     </>

//   )
// }

// export default Login
