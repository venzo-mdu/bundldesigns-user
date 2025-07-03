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

export default function WebsterForm({lang,setLang}) {
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
      
          if (!formData.name) {
            newErrors.name = lang === "ar" ? "الاسم مطلوب" : "Name is required";
          } else if (formData.name.length < 3) {
            newErrors.name = lang === 'ar' ? 'على الأقل أحرف 3 يجب أن يحتوي الاسم على  ' : 'Name must be at least 3 characters';
          } else if (/\d/.test(formData.name)) {
            newErrors.name = lang === "ar" ? "لا يجب أن يحتوي الاسم على أرقام" : "Name must not contain numbers";
          } else if (/[^a-zA-Z\s]/.test(formData.name)) {
            newErrors.name = lang === "ar" ? "لا يجب أن يحتوي الاسم على رموز" : "Name must not contain special characters";
          }  
      
          if (!formData.project_name) {
            newErrors.project_name = lang === "ar" ? "اسم المشروع مطلوب" : "Project name is required";
          } else if (formData.project_name.length < 3) { 
            newErrors.project_name = lang === "ar" ? "يجب أن يحتوي اسم المشروع على 3 أحرف على الأقل" : "Project name must be at least 3 characters";}

          if (!formData.phone) newErrors.phone = lang === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
        //   else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
      
          if (!formData.email) newErrors.email = lang === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = lang === "ar" ? "البريد الإلكتروني غير صالح" : "Email is invalid";
      
          if (!formData.message) {
  newErrors.message = lang === "ar" ? "الرسالة مطلوبة" : "Message is required";
}
      
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
        <Navbar isLang={lang} setIsLang={setLang}/>
        <div className='font-Helvetica'>
    
            <div className='mt-12 mb-10'>
                <h2 className='text-[32px] mb-2 text-center'>{lang === 'ar' ? '' :'Webster Form'}</h2>
                <h3 className='text-[24px] mb-2 text-center text-[#1BA56F]'>{lang === 'ar' ? 'تواصل معنا' :'Contact Us!'}</h3>
            <form onSubmit={handleSubmit} className="p-6 sm:max-w-[90vw] md:max-w-[50vw] mx-auto space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="project_name"
              value={formData.project_name}
              placeholder={lang === 'ar' ? 'اسم المشروع' :'Name of Project'}
              onChange={handleChange}
              className="w-full border  p-2 !rounded-none"
            />
            {errors.project_name && <p className="text-[#D83D99] text-sm">{errors.project_name}</p>}
          </div>
    
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder={lang === 'ar' ? 'الأسم':'Name'}
              onChange={handleChange}
              className="w-full border  p-2 !rounded-none"
            />
            {errors.name && <p className="text-[#D83D99] text-sm">{errors.name}</p>}
          </div>

          {/* Phone Field */}
          <div>
          <PhoneInput
          name="phone"
          placeholder={lang === 'ar' ?' رقم الهاتف':'Phone'}
          value={formData.phone}
          onChange={handlePhone}
          className="w-full border  p-2 !rounded-none"
      />
            {errors.phone && <p className="text-[#D83D99] text-[14px] text-sm">{errors.phone}</p>}
          </div>
    
          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder={lang === 'ar' ? 'البريد الالكتروني':'Email'}
              value={formData.email}
              onChange={handleChange}
              className="w-full border  p-2 !rounded-none"
            />
            {errors.email && <p className="text-[#D83D99] text-sm">{errors.email}</p>}
          </div>
    
          {/* Description Field */}
          <div>
            <input
              name="message"
              placeholder={lang === 'ar' ? 'رسالة' :'Message'}
              value={formData.message}
              onChange={handleChange}
              className="w-full border  p-2 !rounded-none"
            />
            {errors.message && <p className="text-[#D83D99] text-sm">{errors.message}</p>}
          </div>
    
    
          {/* Submit Button */}
          <p className='text-center'> <button
            type="submit"
            className="bg-[#1BA56F] text-white p-1 uppercase px-4 "
          >
         {lang === 'ar' ? ''  : 'Submit Form'}
          </button></p>
                <p className='text-center flex items-center justify-center font-bold'><MailOutlineIcon style={{marginRight:'2px'}}/> <span className='pl-1'>{lang === 'ar' ? '' :'info@bundldesigns.com'}</span> </p>
                <p className='text-center flex items-center justify-center font-bold'> <WhatsAppIcon /> <span className='pl-1'>{lang === 'ar' ? '' :'+(966) 547754124'}</span>  </p>
    
  {successMsg && <p className='bg-green-600 py-1 px-2 rounded text-white'>{successMsg}</p>}
    
        </form>
            </div >
        </div>
        <Footer isLang={lang}/>
        </>
    
      )
}
