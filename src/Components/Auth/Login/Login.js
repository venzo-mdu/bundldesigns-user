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
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { base_url } from '../BackendAPIUrl';
import loginGIF from '../../../Images/loginGIF.gif'

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    google :false
  });

  const [errors, setErrors] = useState({
  });
  const [loginError,setLoginError] = useState(false)

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
      } else if (/\s/.test(loginData.password)) {
        errorMessages.password = 'Password must not contain spaces';
      }
      else if (loginData.password.length > 16) {
        errorMessages.password = 'Password must be at most 16 characters long';
      }
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const loginWithGoogle = async() =>{
    
      try {
        const response = await axios.post(`${base_url}/api/login/`, loginData);
        if (response.status === 200) {
          document.cookie = `token=${response?.data?.data.token || ""}; path=/; SameSite=None; Secure`;
          dispatch(loginAction(response.data.user));
          navigate('/');
        }
        
      } catch (response) {
        setLoginError(response.response.data.data)
      }  
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${base_url}/api/login/`, loginData);
      console.log(response) 
      if (response.status === 200) {
        document.cookie = `token=${response?.data?.data.token || ""}; path=/; SameSite=None; Secure`;
        dispatch(loginAction(response.data.user));
        navigate('/');
      }
      
    } catch (response) {

      setLoginError(response.response.data.data)
    }
  };

  return (
    <div>
      <div className='login !mb-24'>
        <img className='anchor w-[100px]' src={loginGIF} alt='login-anchor' />
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
            <p className='text-[red] mb-1'>{loginError}</p>
            <button className='signin !text-[24px]' type='submit'>
              Sign In
            </button>
                <p className='or mt-[4vh] flex items-center ml-2 font-[500] text-[11px]'> <span className='border-[#F5F5F5] border-b h-[2px] basis-[41%] mr-[2%] border-[1.5px]'>
                        </span> Or  <span className='border-[#F5F5F5] border-b h-[2px] basis-[43%] ml-[2%] border-[1.5px]'></span></p>
                      <p className='signinwithgoogle !text-[17px] !font-bold'>
                        {/* <img src={Googleicon} alt='google-icon' /> Sign in with Google */}
                         <GoogleLogin
                                onSuccess={credentialResponse => {
                                  const token = credentialResponse.credential;
                                  const userDetails = jwt_decode(token);
                                  console.log('User Details:', userDetails);
                                  // Example of how to access user info
                                  console.log('Name:', userDetails.name);
                                  console.log('Email:', userDetails.email);
                                  console.log('Profile Picture:', userDetails.picture);
                                  setLoginData((prevData) => ({
                                    ...prevData,
                                    google : true
                                  }));
                                  loginWithGoogle()
                                }}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              />

                      </p>
                      <p className='dont !mt-2 w-[90%]'>
                        Have an account? <span><NavLink  className='signup !font-[500]' to={'/signup'}>&nbsp;Sign Up</NavLink></span>
                      </p>
          </form>
        </div>
        <img className='anchor1 w-[160px]' src={loginGIF} alt='login-anchor' />
      </div>
      <Footer />
    </div>
  );
};
