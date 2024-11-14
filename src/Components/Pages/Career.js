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

export default function Career() {
  const  [vacancies,setVacancies] =  useState([])
  const [expandedVacancies, setExpandedVacancies] = useState({});
  const base_url = process.env.REACT_APP_BACKEND_URL
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    category: '',
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

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.description) newErrors.description = 'Description is required';

    if (!formData.category) newErrors.category = 'Please select a category';

    if (!formData.file) newErrors.file = 'Please upload a file';
    else if (formData.file.size > 5 * 1024 * 1024) newErrors.file = 'File must be smaller than 5MB';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted successfully:', formData);
      // Process form data (e.g., send to server)
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
        const response = await axios.get(`${base_url}/api/content?section=careers`,Config);
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
                return <div className={`${index+1 != vacancies.length && 'border-b'} border-black mb-6 px-6 `}>
                    <p> <img width='45px' height='45px' src={vacancy.image}></img></p>
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
          name="description"
          placeholder='Tell us your Thoughts'
          value={formData.description}
          onChange={handleChange}
          className="w-full border  p-2"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      {/* Select Field */}
      <div>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2"
        >
            <option  disabled value={''} selected> Choose the vacancy </option>
        {vacancies.map(vacancy => <option value={vacancy.vacancy_english}>{vacancy.vacancy_english}</option>)}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
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
      <label htmlFor="file" className="cursor-pointer border !border-dashed p-3 flex flex-col items-center">
        <p>
          <img src={fileUploadIcon} alt="Upload Icon" width="50" height="50" />
        </p>
        <p className='text-[20px] text-[#000000]'>Drop your files here</p>
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


    </form>
        </div >
    </div>
    <Footer />
    </>
  )
}
