import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ConfigToken } from '../Auth/ConfigToken'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Bgloader } from '../Common/Background/Bgloader';

export default function WebsterForm() {
  const [loading,setLoading] = useState(false)
        const [formData, setFormData] = useState({
            project_name : '',
          name: '',
          phone: '',
          email: '',
            message:''
        });
        const [successMsg , setSuccessMsg] = useState('') 
        // Error state
        const [errors, setErrors] = useState({});
      
        // Handle form field changes
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        const handlePhone = (e) =>{
            setFormData({
                ...formData,
                'phone': e,
              });
        }
        // Validation function
        const validate = () => {
          const newErrors = {};
      
          if (!formData.name) newErrors.name = 'Name is required';
          else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
      
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
      
        // Handle form submission
        const handleSubmit = async(e) => {
          e.preventDefault();
          if (validate()) {
            setLoading(true)
            const response = await axios.post(`${base_url}/api/send-mail?form_type=webster`,formData);
            if(response.data){
                setSuccessMsg('Submitted Successfully')
                setErrors({})
                setFormData({
                  project_name : '',
                name: '',
                phone: '',
                email: '',
                  message:''
              })
            }
            setLoading(false)
          }
          
        }
      
    
      return (
        loading ?
        <Bgloader />:
        <>
        <Navbar />
        <div className='font-Helvetica'>
    
            <div className='mt-12 mb-10'>
                <h2 className='text-[32px] mb-2 text-center'>Webster Form</h2>
                <h3 className='text-[24px] mb-2 text-center text-[#1BA56F]'>Contact Us!</h3>
            <form onSubmit={handleSubmit} className="p-6 sm:max-w-[90vw] md:max-w-[50vw] mx-auto space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="project_name"
              value={formData.project_name}
              placeholder='Name of Project'
              onChange={handleChange}
              className="w-full border  p-2"
            />
            {errors.project_name && <p className="text-red-500 text-sm">{errors.project_name}</p>}
          </div>
    
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder='Name'
              onChange={handleChange}
              className="w-full border  p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Phone Field */}
          <div>
          <PhoneInput
    name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handlePhone}
    className="w-full border  p-2"
      />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
    
          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className="w-full border  p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
    
          {/* Description Field */}
          <div>
            <input
              name="message"
              placeholder='message'
              value={formData.message}
              onChange={handleChange}
              className="w-full border  p-2"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
    
    
          {/* Submit Button */}
          <p className='text-center'> <button
            type="submit"
            className="bg-[#1BA56F] text-white p-1  px-4 "
          >
           Submit Form
          </button></p>
                <p className='text-center flex items-center justify-center font-bold'><MailOutlineIcon style={{marginRight:'2px'}}/> <span className='pl-1'>info@bundldesigns.com</span> </p>
                <p className='text-center flex items-center justify-center font-bold'> <WhatsAppIcon /> <span className='pl-1'>+(966) 547754124</span>  </p>
    
  {successMsg && <p className='bg-green-600 py-1 px-2 rounded text-white'>{successMsg}</p>}
    
        </form>
            </div >
        </div>
        <Footer />
        </>
    
      )
}
