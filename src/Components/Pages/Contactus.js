import { useParams } from 'react-router-dom';
import { Footer } from '../Common/Footer/Footer';
import { Navbar } from '../Common/Navbar/Navbar';
import Loginlogo from '../../Images/Login/loginlogo.svg';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { base_url } from '../Auth/BackendAPIUrl';
import { Bgloader } from '../Common/Background/Bgloader';
import { ToastContainer, toast } from 'react-toastify'
import PhoneNumberInput from './PhoneNumberInput';
import paperPlaneGif from '../../Images/ourWorkGIF.gif'
import websterGif from '../../Images/aboutus/website.gif'
import paperPlaneReverse from '../../Images/ourWorkGIFReverse.gif'
import 'react-phone-number-input/style.css';
import CloseIcon from '@mui/icons-material/Close';

export const Contactus = ({lang,setLang}) => {


    const { form_type } = useParams();
    const [phoneError,setPhoneError] = useState(false)
    const [formData, setFormData] = useState({
      project_name: '',
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  
    const [loading, setLoading] = useState(false)
  
    const [successMsg, setSuccessMsg] = useState('')
    // Error state
    const [errors, setErrors] = useState({});
  
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
        if(phoneError == false){
          const response = await axios.post(`${base_url}/api/send-mail?form_type=${form_type}`, formData);
          if (response.data) {
            setSuccessMsg('Submitted Successfully')
            toast.success(`Form submitted successfully`, {
                      position: toast?.POSITION?.TOP_RIGHT,
                      toastId: 'required-value-toast',
                      icon: false,
                      style: {
                        color: "#1BA56F",
                        fontWeight:"700" // White text
                      },
                    });
          }
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
  
    }
  
  
    return (
        loading ?
          <Bgloader /> :
          <>
          <ToastContainer />
            <Navbar isLang={lang} setIsLang={setLang}/>
            <div className=' font-Helvetica flex sm:pt-10 xs:pt-0 pt-10 xs:block sm:flex sm:pb-24 xs:pb-2 pb-24 overflow-hidden'>
              <div className='basis-1/4 relative xs:pb-8'>
                <img className='sm:!w-[200px] !w-[200px] xs:!w-[130px] top-[15%] sm:right-[10%] xs:right-0 right-[10%] left- absolute xs:hidden sm:absolute sm:block' src={ paperPlaneGif}></img>
    
              </div>
              <div className='basis-2/4 px-[2px]'  >
                <div className='text-center xs:border-b border-black relative sm:border-none '>
                  <h2 className='text-[40px] mt-4 leading-1 relative text-black w-[340px] mx-auto mb-0'>
                      <img className='absolute bottom-[10px] xs:w-[90px] sm:w-[150px] sm:bottom-[-20px] lg:bottom-[-40px] md:bottom-[-40px] xs:bottom-[-60px] xs:left-0 sm:left-[-10%] left-[-10%]' src={Loginlogo} alt='login' /> 
                  </h2>
                  <h2 className='text-[40px] text-[#F3B7CE] font-[700]'>{'Contact us'}</h2>
                  <p className='sm:text-[20px] xs:pb-8 sm:pb-1 text-[20px] xs:text-[16px] md:w-[100%] lg:w-[92%] xl:w-[62%] xs:w-[350px] mx-auto'>Elevate your brand, whether online or in-store. This bundle includes comprehensive brand identity (logo, guidelines, colors, typography, patterns) and commerce collateral to enhance customer experience. Plus, get social media designs to boost sales.
                  </p>
                  <img className='sm:!w-[200px] !w-[200px] xs:!w-[130px] bottom-[-50px] left-[-30px] right-[10%] absolute sm:hidden ' src={ paperPlaneGif}></img>
    
                </div>
                <div className='text-left mt-4 sm:mt-4  xs:px-[5%] px-auto sm:px-auto'>
                  <div className=' mb-2 xs:pt-10 sm:pt-1 '>
                    <h2 className='text-[32px] text-black'>What is the name of your brand?</h2>
                    <input
                      name="project_name"
                      value={formData.project_name}
                      onChange={handleChange} placeholder='Enter the name of your project....'
                      className='w-full text-[16px] focus:outline-none px-2 sm:py-2  xs:py-4 border !border-[#b0b0b0] mt-3 !rounded-none'></input>
                    {errors.project_name && <p className="text-red-500 text-sm">{errors.project_name}</p>}
                  </div>
                  <div className='mb-4 sm:mt-4 xs:mt-6'>
                    <label className='font-[500] text-[16px]' for='name'> Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder='ex: Nora Albaiz..'
                    onChange={handleChange}
                    className="w-full border text-[16px]  !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
    
                {/* Phone Field */}
                <div className='mb-4 sm:mt-4 xs:mt-6'>
                <label className='font-[500] text-[16px]' for='name'> Phone Number</label>
                <PhoneNumberInput
            name="phone"
            placeholder="ex: 569754639"
            value={formData.phone}
            status={setFormData}
            extraInputClass={'!border-[#b0b0b0] text-[16px]'}
            setPhoneError={setPhoneError}
            className="w-full  text-[16px]  !rounded-none"
            setErrors = {setErrors}
            formErrors = {errors}
            idName={'websterSelect'}
            successmsg={successMsg}
          />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
    
                {/* Email Field */}
                <div className='mb-4 sm:mt-4 xs:mt-6'>
                <label className='font-[500] text-[16px]' for='name'> Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder='ex: Nora.m.1999@gmail.com'
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border text-[16px] !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
    
                {/* Description Field */}
                <div className='mb-4 sm:mt-4 xs:mt-6'>
                <label className='font-[500] text-[16px]' for='name'> Message</label>
                  <textarea
                    name="message"
                    placeholder='Describe your needs to us...  '
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border text-[16px] !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
                    rows={4}
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>
    
    
                {/* Submit Button */}
                <p className='text-center !sm:my-8 '> <button
                onClick={(e)=>handleSubmit(e)}
                  className="bg-[#F3B7CE] text-[24px] w-full text-white py-2 uppercase"
                >
                 Submit Contact Request
                </button></p>
    
                </div>
    
              </div>
              <div className='basis-1/4 xs:relative xs:h-[200px] sm:h-auto p-0' >
              <img className='sm:!w-[380px] !w-[380px] xs:!w-[250px]  right-[-18%] sm:right-[-25%] xs:right-[-60%] sm:bottom-[-8%] xs:top-[-10%] sm:top-auto sm:absolute xs:relative' src={ paperPlaneReverse}></img>
    
              </div>
    
            </div>
            <Footer isLang={lang}/>
          </>
      )
}
