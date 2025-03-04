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
import ClipLoader from "react-spinners/ClipLoader";
import PhoneNumberInput from '../../Pages/PhoneNumberInput';

export const Signup = () => {

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", 
    "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", 
    "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", 
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", 
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
    "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
    "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", 
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const { userInfo } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading , setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({});
  const [phoneError, setPhoneError] = useState(false);
  const [registerData, setRegisterData] = useState({
    full_name: '',
    email: '',
    password: '',
    google: false,
    phone:'',
    country:'',
    language:'Arabic'
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
    if (!registerData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{7,15}$/.test(registerData.phone_number)) {
      errors.phone = 'Invalid phone number. Only numbers are allowed (7-15 digits)';
    }
    if (!registerData.country.trim()) {
      errors.country = 'Country is required';
    } else if (/[^a-zA-Z\s-]/.test(registerData.country)) {
      errors.country = 'Country name must contain only letters';
    }
    if (!registerData.language.trim()) {
      errors.language = 'Language is required';
    } else if (/[^a-zA-Z\s-]/.test(registerData.language)) {
      errors.language = 'Language must contain only letters';
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
    setLoading(true)
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
    finally{
      setLoading(false)
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
        {/* <img className='anchor' id='anchor' src={loginGIF} alt='login-anchor' /> */}
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
              className='rounded-none'
            />
            {errors.full_name && <p className="error first-letter:capitalize">{errors.full_name}</p>}

            <label className='mb-2 mt-[3%]' style={{ marginTop: '3%' }}>Email address</label>
            <input
              placeholder='Enter your email'
              name='email'
              value={registerData.email}
              onChange={handleChange}
              className='rounded-none'
            />
            {errors.email && <p className="error first-letter:capitalize">{errors.email}</p>}

            <div>
            <label  className='mb-2 mt-[3%]'>Phone Number</label>
            <PhoneNumberInput
              className={'rounded-none outline-none h-[45px] lg:w-[525px] md:w-[525px] xs:w-full'}
              extraInputClass={'h-[50px] rounded-none'}
              name="phone"
              placeholder="Enter phone number"
              value={registerData.phone}
              status={setRegisterData}
              setPhoneError={setPhoneError}
              setErrors={setErrors}
              formErrors={errors}
            />
            {errors.phone && <p className="error first-letter:capitalize mt-2">{errors.phone}</p>}
            </div>  

           <div className="lg:w-[50%] md:w-[50%] xs:w-[100%] mt-[3%]">
                <div className='lg:mr-[4%] md:mr-[4%] xs:mr-0'>
                    <label className='mb-2 mt-[3%]'>Country </label>
                    <select 
                        name="country" 
                        // id='vacancySelect'
                        value={registerData.country|| null} 
                        onChange={handleChange} 
                        className={`rounded-none outline-none h-[50px] lg:w-[525px] md:w-[525px] xs:w-full ${'country' in errors ? '!border-[red]' :''} border !border-[#D9D9D9] px-2 py-[5px] w-full`}
                    >
                       <option value={null} disabled selected > </option>
                        { countries.map(country=>(
                            <option>{country}</option>
                        ))}
                    </select>
                    {errors.country && <p className="error first-letter:capitalize">{errors.country}</p>}
                </div>
            </div>

            <div>
              <label  className='mb-2 mt-[3%]'>Language</label>
              <select className='rounded-none outline-none h-[50px] lg:w-[525px] md:w-[525px] xs:w-full border !border-[#D9D9D9] px-2 py-[5px]' onChange={handleChange}>
              <option value={'English'}>English</option>
              <option value={'Arabic'}  selected >Arabic</option>
              </select>
              {errors.language && <p className="error first-letter:capitalize">{errors.language}</p>}
            </div>

            <label className='mb-2 mt-[3%]' >Password</label>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={registerData.password}
              onChange={handleChange}
              className='rounded-none'
            />
            {errors.password && <p className="error first-letter:capitalize">{errors.password}</p>}

            <label className='terms-policy  flex items-center my-1'>
              <input
                className='checkbox mr-2 rounded-none cursor-pointer'
                type='checkbox'
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
                
              />
              <span className='!text-[16px] cursor-pointer'>I agree to the terms & policy</span>
            </label>
            {(submitted && !isAgree) && <p className="error">Please agree to the terms and conditions.</p>}
            <button type='submit' style={{ margin: "0% 0 0 0" }} className='signin !text-[24px]'>
              {loading ? <ClipLoader size={25} color={'#FFFFFF'}/>:'Signup'}
            </button>
            <p className='or mt-[4vh] flex items-center ml-2 font-[500] text-[11px]'> <span className='border-[#F5F5F5] border-b h-[2px] basis-[41%] mr-[2%] border-[1.5px]'>
            </span> Or  <span className='border-[#F5F5F5] border-b h-[2px] basis-[43%] ml-[2%] border-[1.5px]'></span></p>
            <p className='signinwithgoogle'>
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
                className={'lg:w-[50%] md:w-[50%] xs:w-[100%] !lg:text-[18px] !md:text-[18px] !xs:text-[14px]'}
                onSuccess={handleAppleSignupSuccess}
                onError={(error) => console.error("Apple Login Failed:", error)}
              />
            </p>
            <p className='dont !mt-4 w-[90%]'>
              Have an account? <span><NavLink className='signup !font-[500]' to={'/login'}>&nbsp;Sign In</NavLink></span>
            </p>
          </form>
        </div>
        {/* <img className='anchor1 w-[160px]' id='anchor1' src={loginGIF} alt='login-anchor' /> */}
      </div>
      <Footer />
    </div>
  );
};
