import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Signup/Signup.css';
import Loginlogo from '../../../Images/Login/loginlogo.svg';
import Anchor from '../../../Images/Login/anchor.svg';
import Googleicon from '../../../Images/Login/google.svg';
import { Footer } from '../../Common/Footer/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import AppleSignin from 'react-apple-signin-auth';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { base_url } from '../BackendAPIUrl';
import { ToastContainer, toast } from 'react-toastify';
import loginGIF from '../../../Images/loginGIF.gif'
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../Redux/Action';

export const Signup = () => {
  const { userInfo } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAgree, setIsAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({});
  const [registerData, setRegisterData] = useState({
    full_name: '',
    email: '',
    password: '',
    google: false
  });

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
  }, [])

  const showToastMessage = () => {
    toast.error("The Value is required!", {
      position: toast?.POSITION?.TOP_RIGHT,
    });
  };
  const setError = (field, errorMessage) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the register data state
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Full name validation
    if (name === 'full_name') {
      if (!value.trim()) {
        setError('full_name', 'Full name is required')

      } else if (/[^a-zA-Z\s-]/.test(value)) {
        setError('full_name', 'Full name must not contain numbers or special characters')

      } else if (value.length < 3) {
        setError('full_name', 'Full name must be at least 3 characters')
      } else {
        setError('full_name', '')

      }
    }

    // Email validation
    if (name === 'email') {
      if (!value.trim()) {
        setError('email', 'Email is required');
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        setError('email', 'Invalid email address');
      } else {
        setError('email', ''); // clear error if email is valid
      }
    }

    if (name === 'password') {
      if (/\s/.test(value)) {  // Check for spaces
        setError('password', 'Password cannot contain spaces');
      }
      else if (!value.trim()) {
        setError('password', 'Password is required');
      } else if (value.length < 8) {
        setError('password', 'Password must be at least 8 characters');
      } else {
        setError('password', ''); // clear error if password is valid
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!registerData.full_name.trim()) errors.full_name = 'Name is required';
    else if (/[^a-zA-Z\s-]/.test(registerData.full_name)) {
      errors.full_name = 'Full name must not contain numbers or special characters'
    } else if (registerData.full_name.length < 3) {
      errors.full_name = 'Full name must be at least 3 characters'
    }
    if (!registerData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerData.email)) {
      errors.email = 'Invalid email address';
    }
    if (/\s/.test(registerData.password)) {  // Check for spaces
      errors.password = 'Password cannot contain spaces'
    }
    else if (!registerData.password.trim()) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (registerData.password.length > 16) {
      errors.password = 'Password must be at most 16 characters long';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
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
      const errors = response.response.data || {};
      const formattedErrors = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, value[0]])
      );
      console.log(formattedErrors, response.response, 'for')
      setErrors(formattedErrors)
    }
  };
  const signupWithGoogle = async (data) => {
    try {
      const response = await axios.post(`${base_url}/api/register/`, data);
      if (response.status === 201) {
        document.cookie = `token=${response?.data.token || ""}; path=/; SameSite=None; Secure`;
        dispatch(loginAction(response.user));
        navigate('/');
      }
    } catch (response) {
      const errors = response.response.data?.error || {};
      const formattedErrors = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, value[0]])
      );
      console.log(formattedErrors, response.response, 'for')
      setErrors(formattedErrors)
    }
  }

  const handleAppleSignupSuccess = async (response) => {
    console.log("Apple Login Success:", response);
  
    const { authorization, user } = response;
  
    if (!authorization?.id_token || !authorization?.code) {
      console.error("Invalid Apple response:", response);
      return;
    }

    const decodedToken = jwt_decode(authorization.id_token);
    console.log("Decoded Apple ID Token:", decodedToken);
    const data ={
      email:decodedToken?.email,
      full_name:decodedToken?.email?.split("@")[0],
      password:null,
      google:true
    }
  
    try {
      const response = await axios.post(`${base_url}/api/register/`, data);
      if (response.status === 201) {
        document.cookie = `token=${response?.data.token || ""}; path=/; SameSite=None; Secure`;
        dispatch(loginAction(response.user));
        navigate('/');
      }
    } catch (response) {
      const errors = response.response.data?.error || {};
      const formattedErrors = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, value[0]])
      );
      console.log(formattedErrors, response.response, 'for')
      setErrors(formattedErrors)
    }
   
  };

  return (
    <div>
      <div className='login !mb-24'>
        <img className='anchor' id='anchor' src={loginGIF} alt='login-anchor' />
        <div className='signup-content'>
          <p className='welcometext'>
            Welcome to <span className='bundle-designs'>Bundl Designs</span>
          </p>
          <img className='loginlogo' src={Loginlogo} alt='login' />
          <form onSubmit={signUp}>
            <label className='mb-2' style={{ width: '100%' }}>Name</label>
            <input
              placeholder='Enter your name'
              name='full_name'
              value={registerData.full_name}
              onChange={handleChange}
            />
            {errors.full_name && <p className="error first-letter:capitalize">{errors.full_name}</p>}

            <label className='mb-2 mt-[3%]' style={{ marginTop: '3%' }}>Email address</label>
            <input
              placeholder='Enter your email'
              name='email'
              value={registerData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error first-letter:capitalize">{errors.email}</p>}

            <label className='mb-2 mt-[3%]' >Password</label>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={registerData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error first-letter:capitalize">{errors.password}</p>}

            <label className='terms-policy  flex items-center my-1'>
              <input
                className='checkbox mr-2  cursor-pointer'
                type='checkbox'
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
              />
              <span className='!text-[16px] cursor-pointer'>I agree to the terms & policy</span>
            </label>
            {(submitted && !isAgree) && <p className="error">Please agree to the terms and conditions.</p>}
            <button type='submit' style={{ margin: "0% 0 0 0" }} className='signin !text-[24px]'>
              Signup
            </button>
            <p className='or mt-[4vh] flex items-center ml-2 font-[500] text-[11px]'> <span className='border-[#F5F5F5] border-b h-[2px] basis-[41%] mr-[2%] border-[1.5px]'>
            </span> Or  <span className='border-[#F5F5F5] border-b h-[2px] basis-[43%] ml-[2%] border-[1.5px]'></span></p>
            <p className='signinwithgoogle'>
              {/* <img src={Googleicon} alt='google-icon' /> Sign in with Google */}
              <div className='w-[45%]'>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const token = credentialResponse.credential;
                  const userDetails = jwt_decode(token);
                  console.log('User Details:', userDetails);
                  // Example of how to access user info
                  console.log('Name:', userDetails.name);
                  console.log('Email:', userDetails.email);
                  console.log('Profile Picture:', userDetails.picture);
                  signupWithGoogle({ full_name: userDetails.name, email: userDetails.email, google: true })
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              </div>
              <AppleSignin
                authOptions={{
                  clientId: "com.bundldesigns.app.client",
                  redirectURI: "https://bundldesigns.web.app/login",
                  scope: "email name",
                  usePopup: true,
                }}
                className={'w-[50%] !lg:text-[18px] !md:text-[18px] !xs:text-[14px]'}
                onSuccess={handleAppleSignupSuccess}
                onError={(error) => console.error("Apple Login Failed:", error)}
              />
            </p>
            <p className='dont !mt-4 w-[90%]'>
              Have an account? <span><NavLink className='signup !font-[500]' to={'/login'}>&nbsp;Sign In</NavLink></span>
            </p>
          </form>
        </div>
        <img className='anchor1 w-[160px]' id='anchor1' src={loginGIF} alt='login-anchor' />
      </div>
      <Footer />
    </div>
  );
};
