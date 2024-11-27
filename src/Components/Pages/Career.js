import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Config } from '../Auth/ConfigToken'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import downArrow from '../../Images/down-arrow.svg'
import upArrow from '../../Images/up-arrow.svg'
import whatsappicon from '../../Images/whatsappIcon.svg'
import emailicon from '../../Images/mailIcon.svg'
import fileUploadIcon from '../../Images/fileUploadIcon.svg'
import frame from '../../Images/frame.svg'

export default function Career() {
  const  [vacancies,setVacancies] =  useState([])
  const [expandedVacancies, setExpandedVacancies] = useState({});
  const [successMsg,setSuccessMsg] = useState('')
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

    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.message) newErrors.message = 'Description is required';

    if (!formData.vacancy) newErrors.vacancy = 'Please select a vacancy';

    if (!formData.file) newErrors.file = 'Please upload a file';
    else if (formData.file.size > 5 * 1024 * 1024) newErrors.file = 'File must be smaller than 5MB';

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
          setSuccessMsg('Application Submitted Successfully')
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
    <Navbar />
    <div className='font-Helvetica'>
        <div className='text-center py-2 border-b border-black'>
            <h1 className='text-[40px]'> Careers </h1>
            <p className='text-[20px] text-[#00000080]'>Where we answer all your questions!</p>
        </div>
        <div className='md:p-20 sm:p-3  border-b border-black'>
            {vacancies.map((vacancy,index)=> {
                return <div className={`${index+1 !== vacancies.length && 'border-b'} border-black mb-6 px-6 `}>
                
                <p> 
                    <img width='45px' height='45px' src={vacancy.image ? vacancy.image : frame}>
                    </img>
                </p>
                    

                    <h2 className='text-[32px] flex items-center'>{vacancy.vacancy_english}
                    <button
            onClick={() => toggleDescription(vacancy.id)}
            className="text-blue-500 cursor-pointer"
          >
            <img src={expandedVacancies[vacancy.id] ? upArrow: downArrow}></img>
          </button>
          </h2>
          {/* Conditionally render the description */}
          {expandedVacancies[vacancy.id] && (
            <div id="description" className="mt-2 text-gray-700">
                     <div
              id="description"
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: vacancy.description_english }}
            />
            <p className='font-bold'>
            Qualification discription:
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

        <div className='mt-12 mb-10'>
            <h2 className='text-[32px] mb-2 text-center'>See something you like? send us your CV & Recent Work</h2>
            <h3 className='text-[24px] mb-2 text-center text-[#1BA56F]'>Join Us!</h3>
        <form onSubmit={handleSubmit} className="p-6 sm:max-w-[90vw] md:max-w-[50vw] mx-auto space-y-4">
      {/* Name Field */}
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder='Name'
          onChange={handleChange}
          className="w-full border-2 border-black p-2"
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
          className="w-full border-2 border-black p-2"
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
          className="w-full border-2 border-black p-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Description Field */}
      <div>
        <textarea
          name="message"
          placeholder='Tell us your Thoughts'
          value={formData.message}
          onChange={handleChange}
          className="w-full border-2 border-black p-2"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      </div>

      {/* Select Field */}
      <div>
        <select
          name="vacancy"
          value={formData.vacancy}
          onChange={handleChange}
          className="w-full border-2 border-black p-2"
        >
            <option  disabled value={''} selected > Choose the vacancy </option>
        {vacancies.map(vacancy => <option value={vacancy.id}>{vacancy.vacancy_english}</option>)}
        </select>
        {errors.vacancy && <p className="text-red-500 text-sm">{errors.vacancy}</p>}
      </div>

      {/* File Upload Field */}
      <div>
      {/* Hidden file input */}
      <input
        type="file"
        id="file"
        name="file"
        onChange={handleChange}
        hidden
      />

      {/* Custom label as trigger */}
      <label htmlFor="file" className="cursor-pointer border-2 !border-dashed p-2 flex flex-col items-center space-x-1">
        <p>
          <img src={fileUploadIcon} alt="Upload Icon" width="24" height="24" />
        </p>
        <p className='text-[20px] text-[#808080] ml-1'>Drop your files here</p>
        {formData.file && <p className="text-gray-600 text-sm mt-2">Selected: {formData.file.name}</p>}
      </label>

      {/* Display validation error */}
      {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
    </div>

      {/* Submit Button */}
      <p className='text-center'> <button
        type="submit"
        className="bg-[#1BA56F] text-white p-1  px-4 hover:bg-blue-600"
      >
        Apply
      </button></p>
            <p className='text-center flex items-center justify-center font-bold'> <img src={emailicon}></img> info@bundldesigns.com</p>
            <p className='text-center flex items-center justify-center font-bold'> <img src={whatsappicon}></img>+(966) 547754124 </p>

            {successMsg && <p className='bg-green-600 py-1 px-2 rounded text-white'>{successMsg}</p>}
    </form>
        </div >
    </div>
    <Footer />
    </>
  )
}
