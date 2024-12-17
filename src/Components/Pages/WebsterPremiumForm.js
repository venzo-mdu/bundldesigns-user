import { useParams } from 'react-router-dom';
import { Footer } from '../Common/Footer/Footer';
import { Navbar } from '../Common/Navbar/Navbar';
import Loginlogo from '../../Images/Login/loginlogo.svg';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { base_url } from '../Auth/BackendAPIUrl';
import { Bgloader } from '../Common/Background/Bgloader';
import PhoneInput from 'react-phone-number-input'
import PhoneNumberInput from './PhoneNumberInput';
import paperPlaneGif from '../../Images/ourWorkGIF.gif'
import websterGif from '../../Images/aboutus/website.gif'
import paperPlaneReverse from '../../Images/ourWorkGIFReverse.gif'
import 'react-phone-number-input/style.css';

export default function WebsterPremiumForm() {
  const { form_type } = useParams();
  const [formData, setFormData] = useState({
    project_name: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const countryPhoneLengths = {
    'BH': 8, // Bahrain
    'KW': 8, // Kuwait
    'OM': 8, // Oman
    'QA': 8, // Qatar
    'SA': 9, // Saudi Arabia
    'AE': 9  // United Arab Emirates
  };
  
  const [loading, setLoading] = useState(false)

  const [successMsg, setSuccessMsg] = useState('')
  // Error state
  const [errors, setErrors] = useState({});
  const gccCountries = ['BH', 'KW', 'OM', 'QA', 'SA', 'AE'];

  const validatePhoneNumber = (number) => {
    if (!number) {
      return 'Phone number is required';
    }

    // Extract the country code and remaining phone number
    const countryCodeMatch = number.match(/^\+(\d{1,3})/);
    if (!countryCodeMatch) {
      return 'Invalid phone number format';
    }

    const countryCode = countryCodeMatch[1]; // Example: 971 for UAE
    const phoneWithoutCountryCode = number.replace(`+${countryCode}`, '');

    let selectedCountry = null;

    // Match the country based on the country code
    switch (countryCode) {
      case '973': selectedCountry = 'BH'; break; // Bahrain
      case '965': selectedCountry = 'KW'; break; // Kuwait
      case '968': selectedCountry = 'OM'; break; // Oman
      case '974': selectedCountry = 'QA'; break; // Qatar
      case '966': selectedCountry = 'SA'; break; // Saudi Arabia
      case '971': selectedCountry = 'AE'; break; // UAE
      default: 
      return 'Country not Selected'
    }

    const requiredLength = countryPhoneLengths[selectedCountry];
    if (phoneWithoutCountryCode.length !== requiredLength) {
      return `Phone number for ${selectedCountry} must be ${requiredLength} digits.`;
    }
    return false;
  };



  const handlePhone = (value) => {
    setFormData({
      ...formData,
      'phone': value,
    });
    if (value) {
    const error =  validatePhoneNumber(value);
    const newError = {...errors,phone:error}
    setErrors(newError)
    }
  };


  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    } else if (/\d/.test(formData.name)) {
      newErrors.name = 'Name must not contain numbers';
    } else if (/[^a-zA-Z\s]/.test(formData.name)) {
      newErrors.name = 'Name must not contain special characters';
    }


    if (!formData.project_name) newErrors.project_name = 'Project name is required';
    else if (formData.project_name.length < 3) newErrors.project_name = 'Project name must be at least 3 characters';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    //   else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.message) newErrors.message = 'Message is required';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true)
      const response = await axios.post(`${base_url}/api/send-mail?form_type=${form_type}`, formData);
      if (response.data) {
        setSuccessMsg('Submitted Successfully')
      }
      setLoading(false)
      setErrors({})
      setFormData({
        project_name: '',
        name: '',
        phone: '',
        email: '',
        message: ''
      })
    }

  }




  return (
    loading ?
      <Bgloader /> :
      <>

        <Navbar />

        <div className=' font-Helvetica flex sm:pt-10 xs:pt-0 pt-10 xs:block sm:flex sm:pb-24 xs:pb-2 pb-24 overflow-hidden'>
          <div className='basis-1/4 relative xs:pb-8'>
          {form_type=="premium"?<img className='sm:!w-[200px] !w-[200px] xs:!w-[130px] top-[15%] sm:right-[10%] xs:right-0 right-[10%] left- absolute xs:relative sm:absolute ' src={ paperPlaneGif}></img>
          :<img className='sm:!w-[200px] !w-[200px] xs:!w-[130px]  top-[15%] sm:right-[10%] xs:right-0 right-[10%] absolute xs:relative sm:absolute ' src={ websterGif}></img>}

          </div>
          <div className='basis-2/4 px-[2px]'  >
            <div className='text-center'>
              <h2 className='text-[40px] mt-4 leading-1 relative text-black w-[340px] mx-auto mb-0'>
                  <img className='absolute bottom-[10px] xs:left-0 sm:left-[-10%] left-[-10%]' src={Loginlogo} alt='login' /> Welcome to
              </h2>
              <h2 className='text-[40px] text-[#F3B7CE] font-[700]'>{form_type == 'premium' ? 'The Premium Bundl' : ' The Webster Bundl'}</h2>
              <p className='text-[20px] md:w-[100%] lg:w-[92%] xl:w-[62%] mx-auto'>Elevate your brand, whether online or in-store. This bundle includes comprehensive brand identity (logo, guidelines, colors, typography, patterns) and commerce collateral to enhance customer experience. Plus, get social media designs to boost sales.
              </p>
            </div>
            <div className='text-left mt-4'>
              <div className=' mb-2 '>
                <h2 className='text-[32px] text-black'>What is the name of your brand?</h2>
                <input
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange} placeholder='Enter the name of your project....'
                  className='w-full text-[18px] focus:outline-none p-2 border !border-[#b0b0b0] mt-2'></input>
                {errors.project_name && <p className="text-red-500 text-sm">{errors.project_name}</p>}
              </div>
              <div className='my-4'>
                <label className='font-[500] text-[18px]' for='name'> Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder='Name'
                onChange={handleChange}
                className="w-full border text-[18px] !border-[#b0b0b0] focus:outline-none p-2"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Phone Field */}
            <div className='my-4'>
            <label className='font-[500] text-[18px]' for='name'> Phone Number</label>
            <PhoneNumberInput
        name="phone"
        placeholder="Enter phone number"
        value={formData.phone}
        status={setFormData}
        className="w-full  text-[18px]  "
      />

              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            {/* Email Field */}
            <div className='my-4'>
            <label className='font-[500] text-[18px]' for='name'> Email Address</label>
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className="w-full border text-[18px] !border-[#b0b0b0] focus:outline-none p-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Description Field */}
            <div className='my-4'>
            <label className='font-[500] text-[18px]' for='name'> Message</label>
              <textarea
                name="message"
                placeholder='Message'
                value={formData.message}
                onChange={handleChange}
                className="w-full border text-[18px] !border-[#b0b0b0] focus:outline-none p-2"
                rows={4}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>


            {/* Submit Button */}
            <p className='text-center'> <button
            onClick={(e)=>handleSubmit(e)}
              className="bg-[#F3B7CE] sm:text-[24px] w-[80%] text-white py-2"
            >
             Submit Contact Request
            </button></p>
            {successMsg && <p className='bg-green-600 py-1 px-2 rounded text-white'>{successMsg}</p>}

            </div>

          </div>
          <div className='basis-1/4 xs:relative' >
          {form_type=="premium"?
          <img className='sm:!w-[380px] !w-[380px] xs:!w-[150px]  right-[-18%] sm:right-[-25%]  bottom-[-8%] xs:ml-[50%] sm:absolute' src={ paperPlaneReverse}></img>
          :<img className='sm:!w-[430px] !w-[430px] xs:!w-[200px] z-0 sm:left-[10%] left-[10%] sm:bottom-[-17vh] bottom-[-17vh] xs:left-[20%] xs:bottom-[-13px] absolute sm:absolute xs:relative' src={ websterGif}></img>}

          </div>

        </div>
        <Footer />
      </>
  )
}
