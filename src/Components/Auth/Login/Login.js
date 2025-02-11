import React, { useState , useEffect } from 'react';
import '../Login/Login.css';
import Loginlogo from '../../../Images/Login/loginlogo.svg';
import Anchor from '../../../Images/Login/anchor.svg';
import Googleicon from '../../../Images/Login/google.svg';
import { Footer } from '../../Common/Footer/Footer';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../Redux/Action';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import AppleSignin from 'react-apple-signin-auth';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { base_url } from '../BackendAPIUrl';
import loginGIF from '../../../Images/loginGIF.gif'


export const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const next_url = searchParams.get("next_url");

  const clientId = process.env.REACT_IOS_CLIENTID
  const redirectURI = process.env.REACT_IOS_REDIRECT_URL

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    google: false
  });

  const [errors, setErrors] = useState({
  });
  const [loginError, setLoginError] = useState(false);

  useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the login data state
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Helper function to set errors
    const setError = (field, errorMessage) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMessage,
      }));
    };

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

    // Password validation
    if (name === 'password') {
      if (/\s/.test(value)) {  // Check for spaces
        setError('password', 'Password cannot contain spaces');
      }
      else if (!value.trim()) {
        setError('password', 'Password is required');
      } else {
        setError('password', ''); // clear error if password is valid
      }
    }
  };
  console.log(next_url,'next')
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

  const loginWithGoogle = async (data) => {

    try {
      const response = await axios.post(`${base_url}/api/login/`, data);
      if (response.status === 200) {
        document.cookie = `token=${response?.data?.data.token || ""}; path=/; SameSite=None; Secure`;
        dispatch(loginAction(response.data.user));
       if(next_url){
        window.location.href =`${process.env.REACT_APP_URL}/${next_url}`
       }else{ navigate('/');}

      }

    } catch (response) {

      setLoginError(response.response.data.data)
    }
  }


  const handleAppleLoginSuccess = async (response) => {
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
      const response = await axios.post(`${base_url}/api/login/`, data);
      if (response.status === 200) {
        document.cookie = `token=${response?.data?.data.token || ""}; path=/; SameSite=None; Secure`;
        dispatch(loginAction(response.data.user));
       if(next_url){
        window.location.href =`${process.env.REACT_APP_URL}/${next_url}`
       }else{ navigate('/');}

      }

    } catch (response) {

      setLoginError(response.response.data.data)
    }
   
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${base_url}/api/login/`, loginData);
      console.log(response)
      if (response.status === 200) {
        document.cookie = `token=${response?.data?.data.token || ""}; path=/; SameSite=None; Secure`;
        dispatch(loginAction(response.data.user));
        if(next_url){
          navigate(`/${next_url}`)
         }else{ navigate('/');}
      }

    } catch (response) {

      setLoginError(response.response.data.data)
    }
  };

  return (
    <div>
      <div className='login !mb-24 '>
        <img className='anchor w-[100px]' src={loginGIF} alt='login-anchor' />
        <div className='login-content '>
          <p className='welcometext'>Welcome Back!</p>
          <img className='loginlogo' src={Loginlogo} alt='login' />
          <form onSubmit={onSubmit}>
            <label className='xs:mb-2'> Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <label className='xs:mb-2' style={{ marginTop:'3%' }}>Password</label>
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
              <div className='lg:w-[45%] md:w-[45%] xs:w-[100%]'>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const token = credentialResponse.credential;
                  const userDetails = jwt_decode(token);
                  console.log('User Details:', userDetails);
                  // Example of how to access user info
                  console.log('Name:', userDetails.name);
                  console.log('Email:', userDetails.email);
                  console.log('Profile Picture:', userDetails.picture);
                  loginWithGoogle({
                    email:userDetails.email,
                    full_name: userDetails.name,
                    password:null,
                    google: true
                  })
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              </div>
              
              <AppleSignin
                authOptions={{
                  clientId:"com.bundldesigns.app.client", 
                  redirectURI: "https://bundldesigns.web.app/login",
                  scope: "email name",
                  usePopup: true,
                }}
                className={'lg:w-[50%] md:w-[50%] xs:w-[100%] !lg:text-[18px] !md:text-[18px] !xs:text-[14px]]'}
                onSuccess={handleAppleLoginSuccess}
                onError={(error) => console.error("Apple Login Failed:", error)}
              />
            </p>
            <p className='dont !mt-4 w-[90%] sm:w-[90%] xs:w-full'>
              Don’t Have an account? <span><NavLink className='signup !font-[500]' to={'/signup'}>&nbsp;Sign Up</NavLink></span>
            </p>
          </form>
        </div>
        <img className='anchor1 w-[160px]' src={loginGIF} alt='login-anchor' />
      </div>
      <Footer />
    </div>
  );
};
