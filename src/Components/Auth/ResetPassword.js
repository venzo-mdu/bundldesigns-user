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

const ResetPassword = () => {


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
            errors.old_password = "Old password is required.";
        }
    
        // Validate New Password
        if (!formData.new_password) {
            errors.new_password = "New password is required.";
        } 
        // Validate Confirm Password
        if (!formData.confirm_password) {
            errors.confirm_password = "Confirm password is required.";
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
                        toast.success('Password updated');
                        navigate("/")
                    }
                } catch (error) {
                    console.error("Error updating Password:", error);
                    setError({ submit: "Failed to update Password. Please try again." });
                }
                finally{
                    setIsLoading(false)
                }
   
    };

  return (
    <div>
        <ToastContainer/>
        <Navbar/>
        <div className='font-Helvetica'>
              <div className='text-center py-2 border-b border-black'>
                  <h1 className='lg:text-[40px] md:text-[40px] xs:text-[30px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase'> Reset Password </h1>
              </div>
            <div className='flex flex-col items-center justify-center my-[5%] lg:p-0 md:p-0 xs:p-[1%_5%]'>
               <form className='w-full lg:max-w-[30%] md:max-w-[30%] xs:max-w-[100%]' onSubmit={handleSubmit}>
                    <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
                        <FaUser className="text-gray-500 mr-2" />
                        <input
                            type="password"
                            placeholder="Old Password"
                            className="outline-none w-full"
                            value={formData?.full_name}
                            onChange={handleChange}
                            name='old_password'
                        />
                    </div>
                    {error.old_password && <p className="text-red-500 text-sm my-2">{error.old_password}</p>}

                    <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
                        <FaUser className="text-gray-500 mr-2" />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="outline-none w-full"
                            value={formData?.full_name}
                            onChange={handleChange}
                            name='new_password'
                        />
                    </div>
                    {error.new_password && <p className="text-red-500 text-sm my-2">{error.new_password}</p>}

                    <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
                        <FaUser className="text-gray-500 mr-2" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="outline-none w-full"
                            value={formData?.full_name}
                            onChange={handleChange}
                            name='confirm_password'
                        />
                    </div>
                    {error.confirm_password && <p className="text-red-500 text-sm my-2">{error.confirm_password}</p>}

                    <button type='submit' className="w-full bg-[#f3b7ce] text-white py-2 ">
                        {isLoading ? <ClipLoader size={25} color='#FFFFFF' /> : 'UPDATE PASSWORD'}
                    </button>
                </form>    
            </div>   
            </div>           
        <Footer/>
    </div>
  )
}

export default ResetPassword