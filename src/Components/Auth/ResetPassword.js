import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { base_url } from './BackendAPIUrl'
import { ConfigToken } from './ConfigToken'
import axios from 'axios'
import { FaUser } from 'react-icons/fa'
import ClipLoader from 'react-spinners/ClipLoader'
import { ToastContainer, toast } from 'react-toastify'

const ResetPassword = ({lang,setLang}) => {


    const navigate = useNavigate();
    const [formData, setFormData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the register data state
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const validateForm = () => {
        let errors = {};
    
        // Validate Old Password
        if (!formData.old_password) {
            errors.old_password = lang === 'ar' ? 'كلمة المرور القديمة مطلوبة' : "Old password is required.";
        }
    
        // Validate New Password
        if (!formData.new_password) {
            errors.new_password = lang === 'ar' ? 'كلمة المرور الجديدة مطلوبة' : "New password is required.";
        } 
        // Validate Confirm Password
        if (!formData.confirm_password) {
            errors.confirm_password =lang === 'ar' ? 'تأكيد كلمة المرور مطلوب' : "Confirm password is required.";
        } else if (formData.confirm_password !== formData.new_password) {
            errors.confirm_password = "Confirm password does not match with new password.";
        }
    
        setError(errors);
        return Object.keys(errors).length === 0;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return; 
        }
        setIsLoading(true)
    
                try {
                    const response = await axios.post(`${base_url}/api/change-password/`, formData, ConfigToken());
                    
                    if (response.status === 200) {
                        console.log("Password updated successfully!", response.data);
                        toast.success('Password updated',
                            {
                                icon: false,
                                style: {
                                  color: "#1BA56F",
                                  fontWeight:"700" // White text
                                },
                              }
                        );
                        navigate("/")
                    }
                } catch (error) {
                    console.error("Error updating Password:", error?.response);
                    toast.error(error?.response?.data?.error[0],{
                        icon:false,
                        style:{
                            color:'#D83D99',
                            fontWeight:'700'
                        }
                    });
                    setError({ submit: "Failed to update Password. Please try again." });
                }
                finally{
                    setIsLoading(false)
                }
   
    };

  return (
    <div>
        <ToastContainer/>
        <Navbar isLang={lang} setIsLang={setLang}/>
        <div className='font-Helvetica'>
              <div className='text-center py-2 border-b border-black'>
                  <h1 className='lg:text-[38px] md:text-[38px] xs:text-[28px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase'> {lang === 'ar' ? 'إعادة  تعيين كلمة السر' :'Reset Password'} </h1>
              </div>
            <div className='flex flex-col items-center justify-center my-[5%] lg:p-0 md:p-0 xs:p-[1%_5%]'>
               <form className='w-full lg:max-w-[30%] md:max-w-[30%] xs:max-w-[100%]' onSubmit={handleSubmit}>
                    <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
                        <FaUser className={`text-gray-500 ${lang === 'ar' ? 'ml-2':'mr-2'}`} />
                        <input
                            type="password"
                            placeholder= {lang === 'ar' ? 'أدخل كلمة السر' :'Old Password'} 
                            className="outline-none w-full"
                            value={formData?.full_name}
                            onChange={handleChange}
                            name='old_password'
                        />
                    </div>
                    {error.old_password && <p className="text-[#D83D99] text-sm my-2">{error.old_password}</p>}

                    <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
                        <FaUser className={`text-gray-500 ${lang === 'ar' ? 'ml-2':'mr-2'}`} />
                        <input
                            type="password"
                            placeholder={lang === 'ar' ? 'أدخل كلمة السر الجديدة' :'New Password'}
                            className="outline-none w-full"
                            value={formData?.full_name}
                            onChange={handleChange}
                            name='new_password'
                        />
                    </div>
                    {error.new_password && <p className="text-[#D83D99] text-sm my-2">{error.new_password}</p>}

                    <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
                        <FaUser className={`text-gray-500 ${lang === 'ar' ? 'ml-2':'mr-2'}`} />
                        <input
                            type="password"
                            placeholder={lang === 'ar' ? 'تأكيد كلمة السر الجديدة' :'Confirm Password'}
                            className="outline-none w-full"
                            value={formData?.full_name}
                            onChange={handleChange}
                            name='confirm_password'
                        />
                    </div>
                    {error.confirm_password && <p className="text-[#D83D99] text-sm my-2">{error.confirm_password}</p>}

                    <button type='submit' className="w-full bg-[#f3b7ce] text-white py-2 ">
                        {isLoading ? <ClipLoader size={25} color='#FFFFFF' /> :lang === 'ar' ? 'تحديث كلمة المرور' : 'UPDATE PASSWORD'}
                    </button>
                </form>    
            </div>   
            </div>           
        <Footer isLang={lang}/>
    </div>
  )
}

export default ResetPassword