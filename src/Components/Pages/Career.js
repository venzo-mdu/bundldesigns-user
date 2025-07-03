import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import downArrow from '../../Images/down-arrow.svg'
import upArrow from '../../Images/up-arrow.svg'
import whatsappicon from '../../Images/whatsappIcon.svg'
import emailicon from '../../Images/mailIcon.svg'
import fileUploadIcon from '../../Images/fileUploadIcon.svg'
import careerImg from '../../Images/default-career-img.svg'
import CloseIcon from '@mui/icons-material/Close';
import PhoneNumberInput from './PhoneNumberInput';


export default function Career({lang,setLang}) {
  const  [vacancies,setVacancies] =  useState([])
  const [expandedVacancies, setExpandedVacancies] = useState({});
  const [successMsg,setSuccessMsg] = useState('')
  const [phoneError,setPhoneError] = useState(false)
  const base_url = process.env.REACT_APP_BACKEND_URL
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2){
      return parts.pop().split(';').shift()
    } ;
    return null;
  };


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    vacancy: '',
    file: null,
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });

  };
  console.log(formData,'form')

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = lang === "ar" ? "الاسم مطلوب" : "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = lang === 'ar' ? 'على الأقل أحرف 3 يجب أن يحتوي الاسم على  ' : 'Name must be at least 3 characters';
    } else if (/\d/.test(formData.name)) {
      newErrors.name = lang === "ar" ? "لا يجب أن يحتوي الاسم على أرقام" : "Name must not contain numbers";
    }

    if (!formData.phone) newErrors.phone = lang === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    // else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.email) newErrors.email = lang === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = lang === "ar" ? "البريد الإلكتروني غير صالح" : "Email is invalid";

    if (!formData.message) newErrors.message = lang === 'ar' ? 'الوصف مطلوب' : 'Description is required';

    if (!formData.vacancy) newErrors.vacancy = lang === 'ar' ? 'يرجى اختيار وظيفة شاغرة' : 'Please select a vacancy';

    if (!formData.file) newErrors.file = lang === 'ar' ? 'يرجى رفع ملف' : 'Please upload a file';
    else if (formData.file.size > 5 * 1024 * 1024) newErrors.file = lang === 'ar' ? 'ميغابايت 5 يجب أن يكون حجم الملف أقل من ' : 'File must be smaller than 5MB';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('message', formData.message);
      data.append('vacancy', formData.vacancy);
      if (formData.file) {
        data.append('file', formData.file); // Append the file if it exists
      }

      const response = await axios.post(`${base_url}/api/application/create`,
        data
    );
      if(response.data){
          console.log(response.data)
          setFormData({
            name: '',
            phone: '',
            email: '',
            message: '',
            vacancy: '',
            file: null,
          })
          setSuccessMsg(lang === "ar" ? "تم تقديم الطلب تم الإرسال بنجاح" : "Application Submitted Successfully");
      }
    }
  };


  // Function to toggle visibility
  const toggleDescription = (id) => {
    setExpandedVacancies((prevState) => ({
      ...prevState,
      [id]: !prevState[id] // Toggle the state for the clicked vacancy
    }));
  };

    const getVacancy = async()=>{
        console.log(base_url)
        const response = await axios.get(`${base_url}/api/content?section=careers`);
        if(response.data){
            console.log(response.data)
            setVacancies(response.data);
        }
    }
  useEffect(()=>{
    getVacancy()
  },[])

  return (
    <>
    <Navbar isLang={lang} setIsLang={setLang}/>
    <div className='font-Helvetica'>
        <div className='text-center py-2 border-b border-black'>
            <h1 className='lg:text-[38px] md:text-[38px] xs:text-[28px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase'>{lang === 'ar' ?'الوظائف المتاحة ':'Jobs'}  </h1>
            <p className='lg:text-[18px] md:text-[18px] xs:text-[16px] text-[#00000080]'>{lang === 'ar'?'حيث نجيب على جميع أسئلتك !':'Where we answer all your questions!'}</p>
        </div>
        <div className='md:p-20 sm:p-3  border-b border-black'>
            {vacancies.map((vacancy,index)=> {
                return <div className={`${index+1 != vacancies.length && 'border-b'} border-black mb-6 px-6 `}>
                    <p> <img width='45px' height='45px' src={vacancy.image?vacancy.image:careerImg}></img></p>
                    <h2 className='lg:text-[30px] md:text-[30px] xs:text-[20px] text-[#000] flex items-center'>{lang === 'ar' ? vacancy?.vacancy_arabic:vacancy.vacancy_english}
                    <button
            onClick={() => toggleDescription(vacancy.id)}
            className="text-blue-500 cursor-pointer ml-2"
          >
            <img src={expandedVacancies[vacancy.id] ? upArrow: downArrow}></img>
          </button>
          </h2>
          {/* Conditionally render the description */}
          {expandedVacancies[vacancy.id] && (

            <div id="description" className="mt-2 text-gray-700">
            <p  className='font-bold mt-4 text-[20px]'>{lang === 'ar' ? 'وصف الوظيفة الشاغرة نحن' : 'Vacancy Description'}</p>
                     <div
              id="description"
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: vacancy.description_english }}
            />
            <p className='font-bold text-[20px] mt-4'>
            {lang === 'ar' ? 'المؤهلات' :'Qualifications'}
            </p>
                 <div
              id="description"
              className=" text-gray-700"
              dangerouslySetInnerHTML={{ __html: vacancy.qualification_english }}
            />
            </div>
          )}

                </div>
            })}
        </div>

        <div className='mt-24  mb-20'>
            <h2 className='lg:text-[30px] md:text-[30px] xs:text-[20px] text-[#000]  mb-2 text-center'>{lang === 'ar' ?'تحب تنضم الى أسرة بندل؟ ارسلك سيرتك وملف اعمالك ':'See something you like? send us your CV & Recent Work'}</h2>
            <h3 className='text-[24px] mb-1 mt-4 text-center text-[#1BA56F]'>{lang === 'ar' ? 'تواصل معنا !':'Join Us!'}</h3>
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-1 sm:max-w-[90vw] md:max-w-[50vw] mx-auto space-y-4">
      {/* Name Field */}
      <div className='mt-2 mb-3'>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder={lang === 'ar' ?'اسم':'Name'}
          onChange={handleChange}
          className="w-full border !border-black p-2 !rounded-none"
        />
        {errors.name && <p className="text-[#D83D99] text-sm">{errors.name}</p>}
      </div>

      {/* Phone Field */}
      <div  className='mt-3 mb-3'>
      <PhoneNumberInput
        name="phone"
        placeholder={lang==='ar'?'رقم الهاتف':'ex: 569754639'}
        value={formData.phone}
        status={setFormData}
        extraInputClass={'!border-black text-[16px]'}
        setPhoneError={setPhoneError}
        className="w-full  text-[16px]  !rounded-none"
        setErrors = {setErrors}
        formErrors = {errors}
        idName={'websterSelect'}
      />
        {errors.phone && <p className="text-[#D83D99] text-[14px] text-sm">{errors.phone}</p>}
      </div>

      {/* Email Field */}
      <div className='mt-2 mb-3'>
        <input
          type="email"
          name="email"
          placeholder={lang === 'ar' ?'البريد الإلكتروني':'Email'} 
          value={formData.email}
          onChange={handleChange}
          className="w-full border !border-black p-2 !rounded-none"
        />
        {errors.email && <p className="text-[#D83D99] text-sm">{errors.email}</p>}
      </div>

      {/* Description Field */}
      <div  className='mt-3 mb-1'>
        <textarea
          name="message"
          placeholder={lang==='ar'?'أخبرنا بأفكارك':'Tell us your Thoughts'}
          value={formData.message}
          onChange={handleChange}
          className="w-full border !border-black p-2 !rounded-none"
        />
        {errors.message && <p className="text-[#D83D99] text-sm">{errors.message}</p>}
      </div>

      {/* Select Field */}
      <div className='mt-1 mb-2'>
        <select
          name="vacancy"
          id='vacancySelect'
          value={formData.vacancy}
          onChange={handleChange}
          className={`w-full !rounded-none border !border-black p-2 ${formData.vacancy?'text-black':'text-[#00000080]'}`}
        >
            <option  disabled value={''} selected>{lang === 'ar' ? 'اختر الوظيفة الشاغرة':' Choose the vacancy'} </option>
        {vacancies.map(vacancy => <option className='text-[#000000]' value={vacancy.id}>{vacancy.vacancy_english}</option>)}
        </select>
        {errors.vacancy && <p className="text-[#D83D99] text-sm">{errors.vacancy}</p>}
      </div>

      {/* File Upload Field */}
      <div className='my-3'>
      {/* Hidden file input */}
      <input
        type="file"
        id="file"
        name="file"
        onChange={handleChange}
        hidden
        className='!rounded-none'
      />

      {/* Custom label as trigger */}
      <label htmlFor="file" className="cursor-pointer border !border-black !border-dashed p-3 flex flex-col items-center">
    
          <img src={fileUploadIcon} alt="Upload Icon" className='w-[24px]' />
        <p className='text-[20px] text-gray-500'>{lang === 'ar' ?'أسقط ملفاتك هنا' :'Drop your files here'}</p>
        {formData.file && <p className="text-gray-600 text-sm mt-2">Selected: {formData.file.name}</p>}
      </label>

      {/* Display validation error */}
      {errors.file && <p className="text-[#D83D99] text-sm">{errors.file}</p>}
    </div>

      {/* Submit Button */}
      <p className='text-center !mt-10'> <button
        type="submit"
        className="bg-[#1BA56F] text-white py-1 my-2 uppercase  px-12"
      >
        {lang === 'ar' ? 'ارسال ' :'Apply'}
      </button></p>
            {/* <p className='text-center flex items-center !mb-1 mt-4 justify-center font-bold'> <img className='mr-1' src={emailicon}></img> info@bundldesigns.com</p>
            <p className='text-center flex items-center mt-1 justify-center font-bold'> <img className='mr-1' src={whatsappicon}></img>+(966) 547754124 </p> */}

            {successMsg && <p className='bg-green-600 py-1 px-4 flex justify-between items-center rounded text-white'>{successMsg} <CloseIcon onClick={()=>{setSuccessMsg(null)}} className='ml-2 text-white cursor-pointer' /> </p>}
    </form>
        </div >
    </div>
    <Footer isLang={lang}/>
    </>
  )
}
