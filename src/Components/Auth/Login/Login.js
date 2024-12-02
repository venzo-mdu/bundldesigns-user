import React, { useState } from 'react';
import '../Login/Login.css';
import Loginlogo from '../../../Images/Login/loginlogo.svg';
import Anchor from '../../../Images/Login/anchor.svg';
import Googleicon from '../../../Images/Login/google.svg';
import { Footer } from '../../Common/Footer/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../Redux/Action';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { base_url } from '../BackendAPIUrl';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'email' && value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ''
      }));
    }
    if (name === 'password' && value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: ''
      }));
    }
  };

  const validateForm = () => {
    const errorMessages = {};
    if (!loginData.email.trim()) {
      errorMessages.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginData.email)) {
      errorMessages.email = 'Invalid email format';
    }

    if (!loginData.password.trim()) {
      errorMessages.password = 'Password is required';
    }

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${base_url}/api/login/`, loginData);
      
      if (response.status === 200) {
        document.cookie = `token=${response?.data?.data.token || ""}; path=/; SameSite=None; Secure`;
        dispatch(loginAction(response.data.user));
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        setErrors({ ...errors, general: error.response.data.message || 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div>
      <div className='login'>
        <img className='anchor' src={Anchor} alt='login-anchor' />
        <div className='login-content'>
          <p className='welcometext'>Welcome Back Sarah  !</p>
          <img className='loginlogo' src={Loginlogo} alt='login' />
          <form onSubmit={onSubmit}>
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            
            <label style={{ margin: '3% 0 0 0' }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            {/* General error message */}
            {errors.general && <p className="error">{errors.general}</p>}

            <button className='signin' type='submit'>
              Sign In
            </button>
            <p className='or' style={{ margin: '2% 0 0 0' }}>Or</p>
            <p className='signinwithgoogle'>
              {/* <img src={Googleicon} alt='google-icon' /> Sign in with Google */}
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </p>
            <p className='dont'>
              Don't have an account? <span><NavLink className='signup' to={'/signup'}>&nbsp;Signup</NavLink></span>
            </p>
          </form>
        </div>
        <img className='anchor1' src={Anchor} alt='login-anchor' />
      </div>
      <Footer />
    </div>
  );
};
