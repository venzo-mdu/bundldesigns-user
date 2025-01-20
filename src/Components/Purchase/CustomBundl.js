import React, { useEffect , useState } from 'react'
import '../Purchase/Purchase.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Accordian } from '../Common/Accordian'


import Dollor from '../../Images/BundlDetail/dollor.svg'
import Time from '../../Images/BundlDetail/time.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import Edit from '../../Images/BundlDetail/editicon.svg'
import Xmark from '../../Images/BundlDetail/xmarkicon.svg'
import { ConfigToken } from '../Auth/ConfigToken'
import axios from 'axios'
import { base_url } from '../Auth/BackendAPIUrl'

import { NavLink, useLocation, useNavigate } from 'react-router-dom'

export const CustomBundl = () => {

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
  const location = useLocation();
  const [addonPayLoads, setAddonPayLoads] = useState({});
  const [brandInput , setBrandInput] = useState('');
  const [showDetails,setDetails] = useState(false)

  useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })

    const handleResize = () => {
      setIsMobile(window.innerWidth < 440);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);

  const createPayload = async() => {

    const payload = {
      order_name:brandInput || "Addons",
      // bundle_id: location.state.bundlDetail?.id,
      total_time: addonPayLoads.total_time,
      total_price:  addonPayLoads.total_price,
      tax_treatment:  addonPayLoads.tax_treatment,
      tax:  addonPayLoads.tax,
      item_list: addonPayLoads.item_list,
      addons:addonPayLoads,
      bundle_id: null,
      order_status:"in_cart"
    };
    
    try {
      const response = await axios.post(
        `${base_url}/api/order/create/`, 
        payload,  
        ConfigToken()   
      );
      if (response.status === 201) {
        navigate('/mycart', { state: { orderData: response.data.data.data } });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
    
    
  };

  return (
    <div>
      <Navbar />
      <div className='bundl-detail'>
        <div style={{ borderBottom: '1.5px solid #000000', width: '100%' }}>
          <h2>{location?.state?.title || 'Custom Bundl!' }</h2>
          {/* <p className='bundl-desc-title'>Main outcomes: Brand Identity, Commerce Collateral, Social Media Starter Kit.</p> */}
          <p className='bundl-desc'>In this bundl, you have the freedom to mix and match from different add-ons that have been carefully curated to guarantee you find all the items needed for the success of your project.</p>
          <p className='one-minor mt-3'>* This Bundl includes one minor revision</p>
        </div>

        <div className='bundl-section'>
          <div className='brand-details'>
            <p style={window.innerWidth<=441 ? {fontSize:'24px',fontWeight: '700'}:{ textAlign: 'left', fontSize: '32px', fontWeight: '700' }}>What is the name of your brand?</p>
            <input className='brand-input' onChange={(e)=>setBrandInput(e.target.value)}/>
            <div style={{ margin: '5% 0 0 0' }}>
              <Accordian
                accordianTitle={'Custom Your Bundl!'}
                textColor={'#1BA56F'}
                addOnPayload={setAddonPayLoads}
                extraQty ={{}}
              />
            </div>

          </div>
         
          <div className='bundl-summary !border-black border max-h-[80%] overflow-scroll'>
            <div className='bundl-name'>
              <p className='sm:text-[24px] xs:mb-0 xs:flex xs:justify-between sm:block' style={{ fontWeight: '700', padding: '2% 0%' }}>
               <span>Summary</span>
    {isMobile && <button onClick={()=> setDetails(!showDetails)} className='text-[14px] text-[#1BA56F] font-normal underline'>Show Details</button>}
              </p>

            </div>
        {!isMobile || isMobile && showDetails ? <>
          <div className='bundl-name'>
              {
                addonPayLoads?.length > 0 && (
                  <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>Add ons</p>
                )
              }
            </div>
            {addonPayLoads?.item_list?.map((addon, idx) => (
              <div key={idx} className='one-brand-identity block xs:flex sm:block'>
                <p className='text-[#000] sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[45%]' >{addon.qty} {addon.addon_name}</p>
                <div className='flex xs:w-[55%] sm:w-full w-full'>
                  <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[55%]' >+ {addon.unit_time * addon.qty} Days</p>
                  <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[45%]'>+ {addon.unit_price * addon.qty} SAR</p>
                </div>
              </div>
            ))}
        </>:''}
            <div className='bundl-checkout sm:mt-3 xs:mt-0'>
              <div className='total ' style={{ display: 'flex' }}>
                <p className='w-[60%] flex items-center sm:mb-2 xs:mb-0'><img src={BlackDollor} alt="Total Price" className="inline-block ml-1"/><span className='ml-3 font-bold'>Total Price :</span></p>
                <p className='w-[40%] xs:text-right sm:text-left !font-bold sm:mb-2 xs:mb-0' >{ addonPayLoads.total_price } SAR</p>
              </div>
              <div className='total  flex items-center' >
                <p className='w-[60%] flex items-center  sm:mb-2 xs:mb-0'><img src={BlackTime} alt="Total Duration" className="inline-block"/><span className='ml-1'>Total Duration :</span></p>
                <p className='w-[40%] xs:text-right sm:text-left sm:mb-2 xs:mb-0'>{ addonPayLoads.total_time} Days</p>
              </div>

              <div className='proceed-checkout'>
                 <button onClick={createPayload} className='proceed  bg-[#1BA56F]'>Proceed Checkout</button> 
              </div>
              <p className='proceed-text'>Your minimum total should be above 700 SAR</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
