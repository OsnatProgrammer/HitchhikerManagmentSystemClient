import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link } from 'react-router-dom';
import { doApiMethod, API_URL, TOKEN_NAME, CURRENT_USER } from '../services/apiService';
import SignIn from './signIn';
import SignUp from './signUp';
import styles from './css/login.module.css'
import NavLogin from '../general_comps/navLogin';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const nav = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      document.querySelector('.cont').classList.toggle('s--signup');
    };

    const imgBtn = document.querySelector('.img__btn');
    if (imgBtn) {
      imgBtn.addEventListener('click', handleClick);
    }

    return () => {
      if (imgBtn) {
        imgBtn.removeEventListener('click', handleClick);
      }
    };
  }, []);

  let passwordRefLogin = register("password", { required: true, minLength: 3 });
  let emailRefLogin = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  return (
    <>
    <NavLogin/>
    <div className="cont shadow" style={{position:'relative', top:'125px'}}>
      <div className="form sign-in" style={{boxShadow: 'box-shadow: 0px 0px 44px 20px #D32929 inset', background:'#70746e36'}}>
        <div>
          <SignIn />
        </div>
        <p className="forgot-pass">Forgot password?</p>
        <button type="button" className="fb-btn">Connect with <span>facebook</span></button>
      </div >
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <div className="img__text m--in">
            <h2>One of us?</h2>
            <p>If you already have an account, just sign in. We've missed you!</p>
          </div>
          <div className="img__btn">
            <span className="m--up">Sign Up</span>
            <span className="m--in">Sign In</span>
          </div>
        </div>
        <div className="form sign-up" style={{background:'#70746e36'}}>
          <SignUp />
        </div>
      </div>
    </div>
    </>
  )
}