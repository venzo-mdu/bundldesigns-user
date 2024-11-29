import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ConfigToken } from '../Auth/ConfigToken'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import downArrow from '../../Images/down-arrow.svg'
import upArrow from '../../Images/up-arrow.svg'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import fileUploadIcon from '../../Images/fileUploadIcon.svg'
import msgIcon from '../../Images/messageIcon.svg'
import { Bgloader } from '../Common/Background/Bgloader';

export default function FAQ() {

  const [faqs, setFaqs] = useState({
    'data': [],
    'categories': []
  })
  const [loading,setLoading] = useState(true)
  const base_url = process.env.REACT_APP_BACKEND_URL
  const [currentTab, setCurrentTab] = useState('');
  const [successMsg, setSuccessMsg] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    thoughts: '',
  });

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

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.thoughts) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true)
      const response = await axios.post(`${base_url}/api/send-mail?form_type=contactus`, formData);
      if (response.data) {
        console.log(response.data)
        setSuccessMsg('submitted successfully')
      }
      setLoading(false)
    }
  };

  const getFaqs = async () => {
    setLoading(true)
    const response = await axios.get(`${base_url}/api/content?section=faq`);
    if (response.data) {
      setFaqs(response.data);
      setCurrentTab(response.data.categories[0].name_english)
    }
    setLoading(false)

  }
  useEffect(() => {
    getFaqs()
  }, [])


  return (
    loading ?
    <Bgloader /> :
    <>
      <Navbar />
      <div className='font-Helvetica'>
        <div className='text-center py-2 border-b border-black'>
          <h1 className='text-[40px]'> FAQs </h1>
          <p className='text-[20px] text-[#00000080]'>Where we answer all your questions!</p>
        </div>
        <div className='lg:p-20 md:p-10  sm:p-3 border-b !px-[10%] border-black'>
          <div className='flex justify-center'>
            {faqs.categories.map((category, index) => {
              return <button className={`lg:px-[20px] md:px-[10px] md:py-[3px] md:text-[16px] lg:py-[5px]  ${currentTab == category.name_english ? 'text-white bg-[#1BA56F] ' : 'text-[#1BA56F] bg-white '} border-r border-t border-b
                           ${index == 0 && 'border-l'} ${index == faqs.categories.length && 'border-l-0 border-r'}
                   !border-[#1BA56F]`}
                onClick={() => setCurrentTab(category.name_english)}>{category.name_english}</button>
            })}
          </div>
          <div className='mt-8 text-[32px]'>
            {currentTab && <h2 className='mb-6 text-[28px]'>{currentTab}</h2>}
            {
              faqs.data.map((faq) => {
                if (faq.category_english == currentTab) {
                  return <div className='flex border-none items-start mb-1'>
                    <img className='mt-1' src={msgIcon}></img>  <div className='pl-6'>
                      <p className='lg:text-[24px] font-bold md:text-[18px]'>{faq.question_english}</p>
                      <div
                        id="description"
                        className=" text-gray-700 md:text-[16px]"
                        dangerouslySetInnerHTML={{ __html: faq.answer_english }}
                      />
                    </div> </div>
                }
              })
            }
          </div>
        </div>

        <div className='mt-12 mb-10'>
          <h2 className='text-[32px] mb-2 text-center'>Can’t fine what you’re looking for ?</h2>
          <h3 className='text-[24px] mb-2 text-center text-[#1BA56F]'>Contact Us!</h3>
          <form onSubmit={handleSubmit} className="p-6 sm:max-w-[90vw] md:max-w-[50vw] mx-auto space-y-4">
            {/* Name Field */}
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
              <input
                type="tel"
                name="phone"
                placeholder='Phone'
                value={formData.phone}
                onChange={handleChange}
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
              <textarea
                name="thoughts"
                placeholder='Tell us your Thoughts'
                value={formData.thoughts}
                onChange={handleChange}
                className="w-full border  p-2"
              />
              {errors.thoughts && <p className="text-red-500 text-sm">{errors.thoughts}</p>}
            </div>


            {/* Submit Button */}
            <p className='text-center'> <button
              type="submit"
              className="bg-[#1BA56F] text-white p-1  px-4 hover:bg-blue-600"
            >
              Send Message
            </button></p>

            <p className='text-center flex items-center justify-center font-bold'> <MailOutlineIcon style={{ marginRight: '2px' }} /><span className='pl-1'>info@bundldesigns.com</span> </p>
            <p className='text-center flex items-center justify-center font-bold'> < WhatsAppIcon /> <span className='pl-1'>+(966) 547754124</span>  </p>
            {successMsg && <p className='bg-green-600 py-1 px-2 rounded text-white'>{successMsg}</p>}
          </form>



        </div >
      </div>
      <Footer />
    </>

  )
}
