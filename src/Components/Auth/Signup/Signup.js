import React, { useState } from 'react';
import axios from 'axios';
import '../Signup/Signup.css';
import Loginlogo from '../../../Images/Login/loginlogo.svg';
import Anchor from '../../../Images/Login/anchor.svg';
import Googleicon from '../../../Images/Login/google.svg';
import { Footer } from '../../Common/Footer/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { base_url } from '../BackendAPIUrl';
import { ToastContainer, toast } from 'react-toastify';
import loginGIF from '../../../Images/loginGIF.gif'

export const Signup = () => {
  const { userInfo } = useSelector((state) => state);
  const navigate = useNavigate();

  const [isAgree, setIsAgree] = useState(false);
  const [submitted,setSubmitted] = useState(false)
  const [errors, setErrors] = useState({}); 
  const [registerData, setRegisterData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const showToastMessage = () => {
    toast.error("The Value is required!", {
      position: toast?.POSITION?.TOP_RIGHT,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Clear error when user starts typing and input becomes valid
    if (name === 'full_name' && value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        full_name: ''
      }));
    }
    if (name === 'email') {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email is required'
        }));
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email address'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '' // clear error if email is valid
        }));
      }
    }
    if (name === 'password') {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Password is required'
        }));
      } else if (value.length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Password must be at least 8 characters'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: '' // clear error if password is valid
        }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!registerData.full_name.trim()) errors.full_name = 'Name is required';
    if (!registerData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!registerData.password.trim()) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
console.log(errors,'errors')
  const signUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!isAgree) {
      setSubmitted(true)
      return
    }
    try {
      const response = await axios.post(`${base_url}/api/register/`, registerData);
      if (response.status === 201) {
        console.log('Signup successfully');
        navigate('/login')
      }
    } catch (response) {
      const errors = response.response.data?.error || {};
      const formattedErrors = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, value[0]])
      );
      console.log(formattedErrors,response.response,'for')
      setErrors(formattedErrors)
    }
  };

  return (
    <div>
      <div className='login'>
        <img className='anchor' src={loginGIF} alt='login-anchor' />
        <div className='signup-content'>
          <p className='welcometext'>
            Welcome to <span className='bundle-designs'>Bundl Designs</span>
          </p>
          <img className='loginlogo' src={Loginlogo} alt='login' />
          <form onSubmit={signUp}>
            <label style={{ width: '100%' }}>Name</label>
            <input
              placeholder='Name'
              name='full_name'
              value={registerData.full_name}
              onChange={handleChange}
            />
            {errors.full_name && <p className="error">{errors.full_name}</p>}
            
            <label style={{ margin: '3% 0 0 0' }}>Email address</label>
            <input
              placeholder='Email'
              name='email'
              value={registerData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            
            <label style={{ margin: '3% 0 0 0' }}>Password</label>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={registerData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            
            <label className='terms-policy  flex items-center my-1'>
              <input
                className='checkbox mr-2  cursor-pointer'
                type='checkbox'
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
              />
              <span className='!text-[16px] cursor-pointer'>I agree to the terms & policy</span>
            </label>
            {(submitted && !isAgree ) && <p className="error">Please agree to the terms and conditions.</p>}
            <button type='submit' style={{margin:"0% 0 0 0"}}  className='signin'>
              Signup
            </button>
            <p className='or mt-[2vh] flex items-center ml-2 font-[500] text-[12px]'> <span className='border-[#F5F5F5] border-b h-[2px] basis-[40%] mr-[2%] border-[1.5px]'>
              </span> Or  <span className='border-[#F5F5F5] border-b h-[2px] basis-[40%] ml-[2%] border-[1.5px]'></span></p>
            <p className='signinwithgoogle'>
              {/* <img src={Googleicon} alt='google-icon' /> Sign in with Google */}
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse,'credentialsss');
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </p>
            <p className='dont w-[90%]'>
              Have an account? <span><NavLink  className='signup !font-[500]' to={'/login'}>&nbsp;Sign In</NavLink></span>
            </p>
          </form>
        </div>
        <img className='anchor1 w-[160px]' src={loginGIF} alt='login-anchor' />
      </div>
      <Footer />
    </div>
  );
};
