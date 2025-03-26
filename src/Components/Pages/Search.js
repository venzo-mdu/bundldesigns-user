import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { base_url } from '../Auth/BackendAPIUrl';
import { useNavigate } from 'react-router-dom'
import { ConfigToken } from '../Auth/ConfigToken'
import axios from 'axios'
import { Bgloader } from '../Common/Background/Bgloader';
import { Navbar } from '../Common/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { Footer } from '../Common/Footer/Footer';
import CloseIcon from '@mui/icons-material/Close';

export default function Search({lang,setLang}) {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query')
    const [loading, setLoading] = useState(false)
    const [showNtng,setShowNtng] = useState(true)
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const getQueryData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${base_url}/api/search/?query=${query}`);
            setData(response.data)
        } catch {
            navigate("/login");
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getQueryData()
    }, [query])
    return (
        <>
            {
                loading ? <Bgloader /> :
                    <div>
                        <ToastContainer />
                        <Navbar isLang={lang} setIsLang={setLang}/>
                        <div className='pb-20 font-Helvetica'>
                            {/* <div className='xl:w-[50%] xs:w-[70%] pb-[20px] m-auto text-center border-b-[2px] border-black  relative '>
                                <h1 className='text-center inline md:tracking-[20px] sm:tracking-[10px] xs:tracking-[1px] md:text-[45px] sm:text-[35px] xs:text-[25px]'>RESULTS </h1>
                                <div class="h-[35px] top-[-45px] inline relative ">
                                    <div class="absolute inset-1/2 w-[40px]  rounded-xl md:w-[40px] sm:w-[35px] xs:w-[25px]  md:h-[10px] xs:h-[5px] bg-[#E2D640] transform -translate-x-1/2 -translate-y-1/2"></div>
                                    <div class="absolute inset-1/2 w-[10px]  rounded-xl md:h-[40px] sm:h-[35px] xs:h-[25px] md:w-[10px] xs:w-[5px] bg-[#E2D640] transform -translate-x-1/2 -translate-y-1/2"></div>
                                </div>

                            </div> */}
                               <div className='text-center py-2 border-b border-black'>
          <h1 className='text-[40px] !text-black'> Results </h1>
        </div>
                            <div className='pt-10 xl:w-[70%] xs:w-[80%] xs:[90%] mx-auto'>
                                {data?.data?.length ?
                                 <>
                                    {data.type=='package'? 
                                    <>
                                    <h2 className='uppercase xl:text-[42px] mb-3 xl:tracking-[2px] pt-[5px]'>Packages</h2>
                                    {data?.data?.map(item=>(
                                        <a href='/' className='text-[#1ba56f] mb-3 text-[25px] block uppercase hover:text-black cursor-pointer font-bold'>{item.name_english}</a>
                                    ))}
                                    </> :
                                    <>
                                       <h2 className='uppercase xl:text-[42px] mb-3 xl:tracking-[2px] pt-[5px]'>Items</h2>
                                    {data?.data?.map(item=>(
                                        <a href={`/custombundl?search=${item.id}`} className='text-[#1ba56f] mb-3 text-[25px] block uppercase hover:text-black cursor-pointer font-bold'>{item.name_english}</a>
                                    ))}
                                    </>}
                                 </> :
                                    <div className={`text-center items-center ${showNtng && 'border-b border-t border-black '} flex`}>
                                        {
                                            showNtng? <>                                        <p className='text-center mb-[10px] mt-[10px] w-[98%]'> <bold>Information</bold> Nothing matched your search criteria. 
                                            Please try again with different keywords </p> 
                                            <CloseIcon onClick={()=>{setShowNtng(!showNtng)}} className='w-[2%] cursor-pointer text-[grey]' /></>:<></>
                                        }
                                        </div>}
                            </div>
                        </div>
                        <Footer isLang={lang} />
                    </div>
            }
        </>
    )
}
