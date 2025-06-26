import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import msgIcon from '../../Images/messageIcon.svg'
import { Bgloader } from '../Common/Background/Bgloader';
import CloseIcon from '@mui/icons-material/Close';
import PhoneNumberInput from './PhoneNumberInput';
import { ToastContainer, toast } from 'react-toastify'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function FAQ({lang,setLang}) {

  const [faqs, setFaqs] = useState({
    'data': [],
    'categories': []
  })
  const [loading, setLoading] = useState(true)
  const base_url = process.env.REACT_APP_BACKEND_URL
  const [currentTab, setCurrentTab] = useState('');
  const [successMsg, setSuccessMsg] = useState('')
  const [phoneError,setPhoneError] = useState(false)

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };


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
    if (!formData.name) {
      newErrors.name = lang === "ar" ? "الاسم مطلوب" : "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = lang === 'ar' ? 'على الأقل أحرف 3 يجب أن يحتوي الاسم على  ' : 'Name must be at least 3 characters';
    } else if (/\d/.test(formData.name)) {
      newErrors.name = lang === "ar" ? "لا يجب أن يحتوي الاسم على أرقام" : "Name must not contain numbers";
    } else if (/[^a-zA-Z\s-]/.test(formData.name)) {
      newErrors.name = lang === "ar" ? "لا يجب أن يحتوي الاسم على رموز" : "Name must not contain special characters";
    }

    if (!formData.phone) newErrors.phone = lang === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    // else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.email) newErrors.email = lang === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = lang === "ar" ? "البريد الإلكتروني غير صالح" : "Email is invalid";

    if (!formData.thoughts) newErrors.thoughts = 'Thoughts is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await axios.post(`${base_url}/api/send-mail?form_type=contactus`, formData);
      if (response.data) {
        toast.success(`lang === 'ar' ? "تم إرسال النموذج بنجاح" : "Form submitted successfully"`, {
          position: toast?.POSITION?.TOP_RIGHT,
          toastId: 'required-value-toast',
          icon: false,
                style: {
                  color: "#1BA56F",
                  fontWeight:"700" // White text
                },
        });
        setSuccessMsg('submitted successfully')
        setFormData({
          name: '',
          phone: '',
          email: '',
          thoughts: '',
        })
      }
    }
  };

  const getFaqs = async () => {
    setLoading(true)
    const response = await axios.get(`${base_url}/api/content?section=faq`);
    if (response.data) {
      setFaqs(response.data);
      setCurrentTab(lang === 'ar' ? response.data.categories[0].name_arabic : response.data.categories[0].name_english)
    }
    setLoading(false)

  }
  useEffect(() => {
    getFaqs()
  }, [lang])

  return (
    loading ?
      <Bgloader /> :
      <>
             <ToastContainer />
        <Navbar isLang={lang} setIsLang={setLang}/>
        <div className='font-Helvetica'>
          <div className='text-center py-2 border-b border-black'>
            <h1 className='lg:text-[38px] md:text-[38px] xs:text-[28px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%]'>{lang === 'ar' ? 'الاسئلة الشائعة' :'FAQs'}  </h1>
            <p className='lg:text-[18px] md:text-[18px] xs:text-[16px]  text-[#00000080]'>{lang === 'ar' ? 'حيث نجيب على جميع أسئلتك !' :'Where we answer all your questions!'}</p>
          </div>
          <div className='lg:p-12 md:p-10  sm:p-10 xs:p-4 border-b  border-black'>
           <div className="relative flex items-center justify-center">
      {/* Left Arrow */}
     

      {/* Scrollable Container */}
              <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide md:justify-center">
                {faqs.categories.map((category, index) => (
                  <button
                    key={category.name_english}
                    className={`uppercase lg:px-[20px] xs:min-w-[110px] sm:min-w-min xs:text-[12px] sm:text-[18px] text-[18px] md:px-[10px] xs:px-[5px] sm:px-[5px] md:py-[3px] md:text-[16px] lg:py-[5px]  
            ${currentTab === (lang === 'ar' ? category?.name_arabic : category.name_english)
                        ? "text-white bg-[#1BA56F]"
                        : "text-[#1BA56F] bg-white"
                      } border-r border-t border-b 
            ${index === 0 ? lang==='ar'?'border-r':"border-l" : ""} 
            ${index === faqs.categories.length - 1 ? lang==='ar'?'border-l':"border-r" : ""} 
            !border-[#1BA56F]`}
                    onClick={() => setCurrentTab(lang === 'ar' ? category?.name_arabic : category.name_english)}
                  >
                    {lang === 'ar' ? category.name_arabic : category.name_english}
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              {
                window.innerWidth <= 768 ? 
                <div className='flex mt-[1%] w-full absolute'>
                 <div className='absolute left-0 top-[-10px]' onClick={scrollLeft}>
                  <FaChevronLeft className="text-[#000000] opacity-[50%] outline-none border-none" />
                  </div>
                  <div className='absolute right-0 top-[-10px]' onClick={scrollRight}>
                  <FaChevronRight className="text-[#000000] opacity-[50%] outline-none border-none float-right" />
                </div>
              </div>
                 :''
              }
            </div>
            
            
            <div className='sm:mt-12 mt-12 xs:mt-[10%]'>
              {currentTab && <h2 className='mb-10 sm:mb-10 xs:mb-8 xs:text-[22px] text-[26px] sm:text-[26px] uppercase'>{currentTab}</h2>}
              {
                faqs.data.map((faq) => {
                  if ((lang === 'ar' ? faq?.category_arabic : faq.category_english) == currentTab) {
                    return <div className=' border-none mt-2 mb-4'>

                      <div className='flex items-center mb-2'>
                        <img className='w-[24px]' src={msgIcon}></img>
                        <p className='lg:text-[24px] xs:text-[18px] pl-1 font-bold md:text-[18px] mb-0'>{lang === 'ar' ? faq.question_arabic : faq.question_english}</p>
                      </div>

                      <div
                        id="description"
                        className=" text-[#00000080] sm:pl-[30px] pl-[30px] xs:px-[10px]  lg:text-[18px] md:text-[18px] xs:text-[16px] "
                        dangerouslySetInnerHTML={{ __html: lang === 'ar' ? faq?.answer_arabic : faq.answer_english }}
                      />
                    </div>
                  }
                })
              }
            </div>
          </div>

        </div>
        <Footer isLang={lang}/>
      </>

  )
}



// <div className='mt-14 mb-10'>
// <h2 className='text-[32px] mb-3 text-center'>Can’t find what you’re looking for ?</h2>
// <h3 className='text-[24px] mb-1 mt-4 text-center text-[#1BA56F]'>Contact Us!</h3>
// <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 sm:max-w-[90vw] md:max-w-[50vw] mx-auto space-y-4">
//   <div>
//     <input
//       type="text"
//       name="name"
//       value={formData.name}
//       placeholder='Name'
//       onChange={handleChange}
//       className="w-full border !border-[#000000] px-2 py-1 !rounded-none"
//     />
//     {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//   </div>

//   <div>
//   <PhoneNumberInput
//     name="phone"
//     placeholder="ex: 569754639"
//     value={formData.phone}
//     status={setFormData}
//     extraInputClass={'!border-black text-[16px]'}
//     setPhoneError={setPhoneError}
//     className="w-full  text-[16px]  !rounded-none"
//     setErrors = {setErrors}
//     formErrors = {errors}
//     idName={'websterSelect'}
//     successmsg={successMsg}
//   />
//     {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//   </div>

//   <div>
//     <input
//       type="email"
//       name="email"
//       placeholder='Email'
//       value={formData.email}
//       onChange={handleChange}
//       className="w-full border !border-[#000000]  px-2 py-1 !rounded-none"
//     />
//     {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//   </div>

//   <div>
//     <textarea
//       name="thoughts"
//       placeholder='Tell us your Thoughts'
//       value={formData.thoughts}
//       onChange={handleChange}
//       className="w-full border !border-[#000000] px-2 py-1 !rounded-none"
//     />
//     {errors.thoughts && <p className="text-red-500 text-sm">{errors.thoughts}</p>}
//   </div>
//   <p className='text-center'> <button
//     type="submit"
//     className="bg-[#1BA56F] text-white p-1 mt-2  px-4 "
//   >
//     Send Message
//   </button></p>
//   <div className='!mt-10'>
//   <p className='text-center flex items-center mb-1  justify-center font-bold'> <MailOutlineIcon style={{ marginRight: '2px' }} /><span className='pl-1'>info@bundldesigns.com</span> </p>
//   <p className='text-center flex items-center my-1 justify-center font-bold'> < WhatsAppIcon /> <span className='pl-1'>+(966) 547754124</span>  </p>
//   </div>

// </form>



// </div >