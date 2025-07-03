// import { useParams } from 'react-router-dom';
// import { Footer } from '../Common/Footer/Footer';
// import { Navbar } from '../Common/Navbar/Navbar';
// import Loginlogo from '../../Images/Login/loginlogo.svg';
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { base_url } from '../Auth/BackendAPIUrl';
// import { Bgloader } from '../Common/Background/Bgloader';
// import { ToastContainer, toast } from 'react-toastify'
// import PhoneNumberInput from './PhoneNumberInput';
// import paperPlaneGif from '../../Images/ourWorkGIF.gif'
// import websterGif from '../../Images/aboutus/website.gif'
// import paperPlaneReverse from '../../Images/ourWorkGIFReverse.gif'
// import 'react-phone-number-input/style.css';
// import CloseIcon from '@mui/icons-material/Close';

// export const Contactus = ({lang,setLang}) => {

//     const { form_type } = useParams();
//     const [phoneError,setPhoneError] = useState(false)
//     const [formData, setFormData] = useState({
//       project_name: '',
//       name: '',
//       phone: '',
//       email: '',
//       message: ''
//     });

//     const [loading, setLoading] = useState(false)

//     const [successMsg, setSuccessMsg] = useState('')
//     // Error state
//     const [errors, setErrors] = useState({});

//     const validate = () => {
//       const newErrors = {};

//       if (!formData.name) {
//         newErrors.name = 'Name is required';
//       } else if (formData.name.length < 3) {
//         newErrors.name = 'Name must be at least 3 characters';
//       } else if (/\d/.test(formData.name)) {
//         newErrors.name = 'Name must not contain numbers';
//       } else if (/[^a-zA-Z\s]/.test(formData.name)) {
//         newErrors.name = 'Name must not contain special characters';
//       }

//       if (!formData.project_name) newErrors.project_name = 'Project name is required';
//       else if (formData.project_name.length < 3) newErrors.project_name = 'Project name must be at least 3 characters';

//       if (!formData.phone) newErrors.phone = 'Phone number is required';
//       //   else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

//       if (!formData.email) newErrors.email = 'Email is required';
//       else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';

//       if (!formData.message) newErrors.message = 'Message is required';

//       setErrors(newErrors);
//       return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       if (validate()) {
//         if(phoneError == false){
//           const response = await axios.post(`${base_url}/api/send-mail?form_type=${form_type}`, formData);
//           if (response.data) {
//             setSuccessMsg('Submitted Successfully')
//             toast.success(`Form submitted successfully`, {
//                       position: toast?.POSITION?.TOP_RIGHT,
//                       toastId: 'required-value-toast',
//                       icon: false,
//                       style: {
//                         color: "#1BA56F",
//                         fontWeight:"700" // White text
//                       },
//                     });
//           }
//           setErrors({})

//           setFormData({
//             project_name: '',
//             name: '',
//             phone: '',
//             email: '',
//             message: ''
//           })
//         }

//       }

//     }

//     return (
//         loading ?
//           <Bgloader /> :
//           <>
//           <ToastContainer />
//             <Navbar isLang={lang} setIsLang={setLang}/>
//             <div className=' font-Helvetica flex sm:pt-10 xs:pt-0 pt-10 xs:block sm:flex sm:pb-24 xs:pb-2 pb-24 overflow-hidden'>
//               <div className='basis-1/4 relative xs:pb-8'>
//                 <img className={`sm:!w-[200px] !w-[200px] xs:!w-[130px] top-[15%] ${lang === 'ar' ? 'sm:left-[10%] xs:left-0 left-[10%] scale-x-[-1]':'sm:right-[10%] xs:right-0 right-[10%]'}  absolute xs:hidden sm:absolute sm:block`} src={ paperPlaneGif}></img>

//               </div>
//               <div className='basis-2/4 px-[2px]'  >
//                 <div className='text-center xs:border-b border-black relative sm:border-none '>
//                   <h2 className='text-[40px] mt-4 leading-1 relative text-black w-[340px] mx-auto mb-0'>
//                       <img className={`absolute bottom-[10px] xs:w-[90px] sm:w-[150px] sm:bottom-[-20px] lg:bottom-[-40px] md:bottom-[-40px] xs:bottom-[-60px] ${lang === 'ar' ? 'xs:right-0 sm:right-[-10%] right-[-10%] rotate-[45deg]':'xs:left-0 sm:left-[-10%] left-[-10%]'}`} src={Loginlogo} alt='login' />
//                   </h2>
//                   <h2 className='text-[40px] text-[#F3B7CE] font-[700]'>{lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}</h2>
//                   <p className='sm:text-[20px] xs:pb-8 sm:pb-1 text-[20px] xs:text-[16px] md:w-[100%] lg:w-[92%] xl:w-[62%] xs:w-[350px] mx-auto'>{lang === 'ar' ? '' : 'Elevate your brand, whether online or in-store. This bundle includes comprehensive brand identity (logo, guidelines, colors, typography, patterns) and commerce collateral to enhance customer experience. Plus, get social media designs to boost sales.'}
//                   </p>
//                   <img className={`sm:!w-[200px] !w-[200px] xs:!w-[130px] bottom-[-50px] left-[-30px] right-[10%] absolute sm:hidden `} src={ paperPlaneGif}></img>

//                 </div>
//                 <div className='text-left mt-4 sm:mt-4  xs:px-[5%] px-auto sm:px-auto'>
//                   <div className=' mb-2 xs:pt-10 sm:pt-1 '>
//                     <h2 className={`text-[32px] text-black ${lang === 'ar' ? 'text-right':'text-left'}`}>{lang === 'ar' ? 'ما هو اسم علامتك التجارية؟' :'What is the name of your brand?'}</h2>
//                     <input
//                       name="project_name"
//                       value={formData.project_name}
//                       onChange={handleChange} placeholder={lang === 'ar' ? '' :'Enter the name of your project....'}
//                       className='w-full text-[16px] focus:outline-none px-2 sm:py-2  xs:py-4 border !border-[#b0b0b0] mt-3 !rounded-none'></input>
//                     {errors.project_name && <p className="text-red-500 text-sm">{errors.project_name}</p>}
//                   </div>
//                   <div className={`mb-4 sm:mt-4 xs:mt-6 ${lang === 'ar' ? 'text-right':'text-left'}`}>
//                     <label className={`font-[500] text-[16px] ${lang === 'ar' ? 'text-right':'text-left'}`} for='name'> {lang === 'ar' ? 'الأسم':'Name'}</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     placeholder={lang === 'ar' ? '' : 'ex: Nora Albaiz..'}
//                     onChange={handleChange}
//                     className="w-full border text-[16px]  !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
//                   />
//                   {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//                 </div>

//                 {/* Phone Field */}
//                 <div className={`mb-4 sm:mt-4 xs:mt-6 ${lang === 'ar' ? 'text-right':'text-left'}`}>
//                 <label className='font-[500] text-[16px]' for='name'> {lang === 'ar' ?' رقم الهاتف':'Phone Number'}</label>
//                 <PhoneNumberInput
//             name="phone"
//             placeholder={lang === 'ar' ? '' : "ex: 569754639"}
//             value={formData.phone}
//             status={setFormData}
//             extraInputClass={'!border-[#b0b0b0] text-[16px]'}
//             setPhoneError={setPhoneError}
//             className="w-full  text-[16px]  !rounded-none"
//             setErrors = {setErrors}
//             formErrors = {errors}
//             idName={'websterSelect'}
//             successmsg={successMsg}
//           />
//                   {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//                 </div>

//                 {/* Email Field */}
//                 <div className={`mb-4 sm:mt-4 xs:mt-6 ${lang === 'ar' ? 'text-right':'text-left'}`}>
//                 <label className='font-[500] text-[16px]' for='name'> {lang === 'ar' ? 'البريد الالكتروني':'Email address'}</label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder={lang === 'ar' ? '' :'ex: Nora.m.1999@gmail.com'}
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full border text-[16px] !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
//                   />
//                   {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//                 </div>

//                 {/* Description Field */}
//                 <div className={`mb-4 sm:mt-4 xs:mt-6 ${lang === 'ar' ? 'text-right':'text-left'}`}>
//                 <label className='font-[500] text-[16px]' for='name'>{lang === 'ar' ? 'رسالة' :'Message'} </label>
//                   <textarea
//                     name="message"
//                     placeholder={lang === 'ar' ? '' :'Describe your needs to us...  '}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full border text-[16px] !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
//                     rows={4}
//                   />
//                   {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
//                 </div>

//                 {/* Submit Button */}
//                 <p className='text-center !sm:my-8 '> <button
//                 onClick={(e)=>handleSubmit(e)}
//                   className="bg-[#F3B7CE] text-[24px] w-full text-white py-2 uppercase"
//                 >
//                 {lang === 'ar' ? '' : 'Submit Contact Request'}
//                 </button></p>

//                 </div>

//               </div>
//               <div className='basis-1/4 xs:relative xs:h-[200px] sm:h-auto p-0' >
//               <img className={`sm:!w-[380px] !w-[380px] xs:!w-[250px]  ${lang === 'ar' ? 'left-[-18%] sm:left-[-25%] xs:left-[-60%] scale-x-[-1]':'right-[-18%] sm:right-[-25%] xs:right-[-60%]'} sm:bottom-[-8%] xs:top-[-10%] sm:top-auto sm:absolute xs:relative`} src={ paperPlaneReverse}></img>

//               </div>

//             </div>
//             <Footer isLang={lang}/>
//           </>
//       )
// }

// -------------------------- Updated Arabic content -------------------

import { useParams } from "react-router-dom";
import { Footer } from "../Common/Footer/Footer";
import { Navbar } from "../Common/Navbar/Navbar";
import Loginlogo from "../../Images/Login/loginlogo.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
import { Bgloader } from "../Common/Background/Bgloader";
import { ToastContainer } from "react-toastify";
import PhoneNumberInput from "./PhoneNumberInput";
import paperPlaneGif from "../../Images/ourWorkGIF.gif";
import websterGif from "../../Images/aboutus/website.gif";
import paperPlaneReverse from "../../Images/ourWorkGIFReverse.gif";
import "react-phone-number-input/style.css";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";
import useToastMessage from "../Pages/Toaster/Toaster";

export const Contactus = ({ lang, setLang }) => {
  const { form_type } = useParams();
  const [phoneError, setPhoneError] = useState(false);
  const [formData, setFormData] = useState({
    project_name: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  // Error state
  const [errors, setErrors] = useState({});
  const { showToast, showErrorToast, showSuccessToast } = useToastMessage();

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = lang === "ar" ? "الاسم مطلوب" : "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name =
        lang === "ar"
          ? "على الأقل أحرف 3 يجب أن يحتوي الاسم على  "
          : "Name must be at least 3 characters";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = lang === "ar" ? "لا يجب أن يحتوي الاسم على أرقام" : "Name must not contain numbers";
    } else if (/[^a-zA-Z\s]/.test(formData.name)) {
      newErrors.name = lang === "ar" ? "لا يجب أن يحتوي الاسم على رموز" : "Name must not contain special characters";
    }

    if (!formData.project_name)
      newErrors.project_name = lang === "ar" ? "اسم المشروع مطلوب" : "Project name is required";
    else if (formData.project_name.length < 3)
      newErrors.project_name = lang === "ar" ? "يجب أن يحتوي اسم المشروع على 3 أحرف على الأقل" : "Project name must be at least 3 characters";

    if (!formData.phone)
      newErrors.phone =
        lang === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required";
    //   else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.email)
      newErrors.email =
        lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = lang === "ar" ? "البريد الإلكتروني غير صالح" : "Email is invalid";

    if (!formData.message) { newErrors.message = lang === "ar" ? "الرسالة مطلوبة" : "Message is required";
}

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
      if (phoneError == false) {
        const response = await axios.post(
          `${base_url}/api/send-mail?form_type=${form_type}`,
          formData
        );
        if (response.data) {
          // setSuccessMsg("Submitted Successfully");
          // toast.success(`Form submitted successfully`, {
          //   position: toast?.POSITION?.TOP_RIGHT,
          //   toastId: "required-value-toast",
          //   icon: false,
          //   style: {
          //     color: "#1BA56F",
          //     fontWeight: "700", // White text
          //   },
          // });
          showErrorToast(
  lang === 'ar' ? "تم إرسال النموذج بنجاح" : "Form submitted successfully",
  "#D83D99"
);
        }
        setErrors({});

        setFormData({
          project_name: "",
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    }
  };

  return loading ? (
    <Bgloader />
  ) : (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            // color: "#1BA56F",
            fontWeight: "700",
            borderRadius: "0px !important",
            border: `1px solid #1BA56F`,
          },
        }}
      />

      <ToastContainer />
      <Navbar isLang={lang} setIsLang={setLang} />
      <div className=" font-Helvetica flex sm:pt-10 xs:pt-0 pt-10 xs:block sm:flex sm:pb-24 xs:pb-2 pb-24 overflow-hidden">
        <div className="basis-1/4 relative xs:pb-8">
          <img
            className={`sm:!w-[200px] !w-[200px] xs:!w-[130px] top-[15%] ${
              lang === "ar"
                ? "sm:left-[10%] xs:left-0 left-[10%] scale-x-[-1]"
                : "sm:right-[10%] xs:right-0 right-[10%]"
            }  absolute xs:hidden sm:absolute sm:block`}
            src={paperPlaneGif}
          ></img>
        </div>
        <div className="basis-2/4 px-[2px]">
          <div className="text-center xs:border-b border-black relative sm:border-none ">
            <h2 className="text-[38px] mt-4 leading-1 relative text-black w-[340px] mx-auto mb-0">
              <a className="contact-brand" href="/">
                <img
                  className={`absolute bottom-[10px] xs:w-[90px] sm:w-[150px] sm:bottom-[-20px] lg:bottom-[-40px] md:bottom-[-40px] xs:bottom-[-25px] ${
                    lang === "ar"
                      ? "xs:right-0 sm:right-[-10%] right-[-10%] rotate-[45deg]"
                      : "xs:left-0 sm:left-[-10%] left-[-10%]"
                  }`}
                  src={Loginlogo}
                  alt="login"
                />
              </a>
            </h2>
            <h2 className="text-[40px] text-[#F3B7CE] font-[700]">
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
            </h2>
            <img
              className={`sm:!w-[200px] !w-[200px] xs:!w-[130px] bottom-[-50px] left-[-30px] right-[10%] absolute sm:hidden `}
              src={paperPlaneGif}
            ></img>
          </div>
          <div className="text-left mt-4 sm:mt-4  xs:px-[5%] px-auto sm:px-auto">
            <div className=" mb-2 xs:pt-10 sm:pt-1 ">
              <h2
                className={`lg:text-[30px] md:text-[30px] xs:text-[24px] text-black ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                {lang === "ar"
                  ? "ما هو اسم مشروعك؟"
                  : "What is the name of your brand?"}
              </h2>
              <input
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                placeholder={
                  lang === "ar"
                    ? "الرجاء كتابة اسم المشروع"
                    : "Enter the name of your project...."
                }
                className="w-full text-[16px] focus:outline-none px-2 sm:py-2  xs:py-4 border !border-[#b0b0b0] mt-3 !rounded-none"
              ></input>
              {errors.project_name && (
                <p className="text-[#D83D99] text-sm">{errors.project_name}</p>
              )}
            </div>
            <div
              className={`mb-4 sm:mt-4 xs:mt-6 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              <label
                className={`font-[500] text-[16px] ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                for="name"
              >
                {" "}
                {lang === "ar" ? "الأسم" : "Name"}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder={
                  lang === "ar" ? "مثال: محمد أحمد" : "ex: Mohammad Ahmad.."
                }
                onChange={handleChange}
                className="w-full border text-[16px]  !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
              />
              {errors.name && (
                <p className="text-[#D83D99] text-sm">{errors.name}</p>
              )}
            </div>

            {/* Phone Field */}
            <div
              className={`mb-4 sm:mt-4 xs:mt-6 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              <label className="font-[500] text-[16px]" for="name">
                {" "}
                {lang === "ar" ? " رقم الهاتف" : "Phone Number"}
              </label>
              <PhoneNumberInput
                name="phone"
                placeholder={
                  lang === "ar" ? "مثال: 569754639" : "ex: 569754639"
                }
                value={formData.phone}
                status={setFormData}
                extraInputClass={"!border-[#b0b0b0] text-[16px]"}
                setPhoneError={setPhoneError}
                className="w-full  text-[16px]  !rounded-none"
                setErrors={setErrors}
                formErrors={errors}
                idName={"websterSelect"}
                successmsg={successMsg}
              />
              {errors.phone && (
                <p className="text-[#D83D99] text-[14px] text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Email Field */}
            <div
              className={`mb-4 sm:mt-4 xs:mt-6 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              <label className="font-[500] text-[16px]" for="name">
                {" "}
                {lang === "ar" ? "البريد الالكتروني" : "Email address"}
              </label>
              <input
                type="email"
                name="email"
                placeholder={
                  lang === "ar" ? "Ex:MHM111@gmail.com" : "ex: MHM111@gmail.com"
                }
                value={formData.email}
                onChange={handleChange}
                className="w-full border text-[16px] !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
              />
              {errors.email && (
                <p className="text-[#D83D99] text-sm">{errors.email}</p>
              )}
            </div>

            {/* Description Field */}
            <div
              className={`mb-4 sm:mt-4 xs:mt-6 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              <label className="font-[500] text-[16px]" for="name">
                {lang === "ar" ? "رسالة" : "Message"}{" "}
              </label>
              <textarea
                name="message"
                placeholder={
                  lang === "ar"
                    ? "كيف ممكن نخدمك؟"
                    : "How can we assist you?...  "
                }
                value={formData.message}
                onChange={handleChange}
                className="w-full border text-[16px] !border-[#b0b0b0] focus:outline-none px-2 sm:py-2  xs:py-3 !rounded-none"
                rows={4}
              />
              {errors.message && (
                <p className="text-[#D83D99] text-sm">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <p className="text-center !sm:my-8 ">
              {" "}
              <button
                onClick={(e) => handleSubmit(e)}
                className="bg-[#F3B7CE] text-[22px] w-full text-white py-2 uppercase"
              >
                {lang === "ar" ? "ارسل طلب التواصل" : "Submit Contact Request"}
              </button>
            </p>
          </div>
        </div>
        <div className="basis-1/4 xs:relative xs:h-[200px] sm:h-auto p-0">
          <img
            className={`sm:!w-[380px] !w-[380px] xs:!w-[250px]  ${
              lang === "ar"
                ? "left-[-18%] sm:left-[-25%] xs:left-[-60%] scale-x-[-1]"
                : "right-[-18%] sm:right-[-25%] xs:right-[-60%]"
            } sm:bottom-[-8%] xs:top-[-10%] sm:top-auto sm:absolute xs:relative`}
            src={paperPlaneReverse}
          ></img>
        </div>
      </div>
      <Footer isLang={lang} />
    </>
  );
};
