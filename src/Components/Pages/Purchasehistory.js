import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ConfigToken } from '../Auth/ConfigToken'
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import dashboard from '../../json/dashboard.json'
import reload from '../../Images/reload.svg'
import { format } from "date-fns";
import { DashboardPopup } from '../Common/Popup/DashboardPopup';
import {useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Bgloader } from '../Common/Background/Bgloader';
import DoneIcon from '@mui/icons-material/Done';
import { BorderAllRounded } from '@mui/icons-material';

export const Purchasehistory = ({lang,setLang}) => {

      const navigate = useNavigate();
      const [loading, setLoading] = useState(true)
      const [purchases, setPurchases] = useState([])
      const [reOrderId, setReOrderId] = useState()
      const [openPopup, setOpenPopup] = useState(false)
      const [purchased, setPurchased] = useState('not')
      const [showFull, setShowFull] = useState(false)
      const [dashboardJson, setDashboardJson] = useState(dashboard)
      const base_url = process.env.REACT_APP_BACKEND_URL
      const location = useLocation();

  useEffect(()=>{
  (async()=>{
    setLoading(true)
            const response = await axios.get(`${base_url}/api/order/`, ConfigToken());
            if (response.data) {
                const resProjects = response.data.data.filter(item => item.order_status != 'in_cart')
                setPurchases(response.data.data.filter(item => item.order_status != 'in_cart'))
            }
            setLoading(false)
  })();
  },[]);



  const CheckCart = async (id) => {
    const response = await axios.get(`${base_url}/api/order/cart/`, ConfigToken());
    console.log(response)
    if (response.status === 200) {
        reOrder(id)
    } else {
        setReOrderId(id)
        setOpenPopup(true)
    }
}

const reOrder = async (id) => {
    const response = await axios.get(`${base_url}/api/reorder/${id}/`, ConfigToken());
    window.location.href = '/mycart'
  }
  return (
   
    loading ? 
    <Bgloader/>
    :
    <div>
        <Navbar isLang={lang} setIsLang={setLang}/>
                                    {
                                        window.innerWidth > 768 ?
                                        
                                            purchases.length > 0 ? <div className='px-14 mt-4 mb-4'>
                                                <h2 className='lg:text-[32px] text-[#000] md:text-[24px] uppercase'>{lang === 'ar' ? 'تاريخ الشراء' :dashboardJson.third_title}</h2>
            
                                                <table className='w-full !border-[#00000080] border-separate border-spacing-y-2 border-spacing-x-0'>
                                                    <thead>
                                                        <tr className='!mb-4'>
                                                            {Object.keys(dashboardJson.table_heads).map((purchase_key) => {
                                                                return <th className='text-[#00000080] pb-2 lg:text-[20px] md:text-[16px] font-Helvetica font-medium'>{lang === 'ar' ? dashboardJson.table_heads_arabic[purchase_key] :dashboardJson.table_heads[purchase_key]}</th>
                                                            })}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {purchases.map((project, index) => {
                                                            return <tr className=' '>
                                                                <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.id}</td>
                                                                <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.project_name}</td>
                                                                <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{Math.round(project.grand_total)}</td>
                                                                <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''} text-[#1BA56F]`}>{lang === 'ar' ? 'مكتمل' :'Completed'}</td>
                                                                <td onClick={() => CheckCart(project.id)} className={`lg:text-[20px] cursor-pointer font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}><img className='lg:w-[30px] md:w-[20px]' src={reload}></img></td>
                                                                <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{format(new Date(project.purchase_date), "dd/MM/yy")}</td>
                                                            </tr>
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div> : ''
                                            :
                                            <div className="w-full px-[8%] my-[10%]">
                                                {/* Header */}
                                                <div className="flex justify-between items-center">
                                                    <p className="text-[20px] font-[500] font-Helvetica opacity-50">{lang === 'ar' ? 'تاريخ الشراء' :'Purchase History'}</p>
                                                    <p
                                                        className="underline text-[20px] font-[500] font-Helvetica text-[#1BA56F] cursor-pointer"
                                                        onClick={() => setShowFull(!showFull)}
                                                    >
                                                        {showFull ? "Show Less" : "See More"}
                                                    </p>
                                                </div>
        
                                                {/* Orders List */}
                                                <div className={`transition-all duration-500 ease-out ${showFull ? "h-auto" : "h-[165px] overflow-hidden relative"}`}>
                                                    {purchases.map((order, index) => (
                                                        <div
                                                            key={index}
                                                            className="border-b border-gray-300 py-2 flex flex-col md:flex-row md:items-center justify-between"
                                                        >
                                                            {/* Name & Amount */}
                                                            <div className="flex justify-between w-full md:w-[50%]">
                                                                <p className="text-[22px] font-[700] font-Helvetica">{order.project_name.length > 9 ? order.project_name.substring(0, 5) + " (...)" : order.project_name}</p>
                                                                <p className="text-[22px] font-[700] font-Helvetica">{Math.round(order.grand_total)} SAR</p>
                                                            </div>
        
                                                            {/* ID, Date & Status */}
                                                            <div className="flex justify-between w-full md:w-[50%] mt-1 md:mt-0">
                                                                <p className="text-[20px] font-[500] text-gray-500 font-Helvetica">{order.id}</p>
                                                                <p className="text-[20px] font-[500] text-gray-500 font-Helvetica">{format(new Date(order.purchase_date), "dd/MM/yy")}</p>
                                                                <p className="text-[20px] font-[500] font-Helvetica text-[#1BA56F]">{lang === 'ar' ? 'مكتمل' :'Completed'}</p>
                                                            </div>
                                                        </div>
                                                    ))}
        
                                                    {/* Gradient Overlay (only when not expanded) */}
                                                    {!showFull && (
                                                        //<div className="absolute shadow-lg bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white to-transparent pointer-events-none transition-shadow"></div>
                                                        <div className="absolute bottom-[-40px] left-0 w-full h-[80px] bg-gradient-to-t from-white via-white/90 to-transparent shadow-[1px] pointer-events-none transition-all duration-500 ease-out "></div>
                                                    )}
                                                </div>
                                            </div> 
                                    }
        <Footer isLang={lang}/>
        {
                                    openPopup && <DashboardPopup
                                        openpopup={openPopup}
                                        isCancel={false}
                                        setPopup={setOpenPopup}
                                        title={'Empty your cart'}
                                        // subTitle={'Are you sure, you want to empty the cart.'}
                                        onClick={() => reOrder(reOrderId)}
                                        save={'Yes'}
                                        cancel={'Cancel'}
                                    />
                                }
    </div>
    
  )
}
