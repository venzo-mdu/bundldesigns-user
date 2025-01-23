import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Purchase/Purchase.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Accordian } from '../Common/Accordian'
import Dollor from '../../Images/BundlDetail/dollor.svg'
import Time from '../../Images/BundlDetail/time.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import greenIcon from  '../../Images/green staked coin.svg'
import pinkIcon from '../../Images/pink staked coin.svg'
import blueIcon from '../../Images/blue staked coin.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { base_url } from '../Auth/BackendAPIUrl'
import { ConfigToken } from '../Auth/ConfigToken'
import { ToastContainer, toast } from 'react-toastify'
import { css } from '@emotion/react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export const BundlDetail = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [bundlAddons, setBundlAddons] = useState([]);
  const [minError,setMinError] = useState([])
  const [quantities, setQuantities] = useState({});
  const [addonPayLoads, setAddonPayLoads] = useState({});
  const [extraQty,setExtraQty] = useState({})
  const [brandInput, setBrandInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [firstOrder,setFirstOrder] = useState(true)
  const [actual,setactual] = useState({})
  const handleRadioChange = (e) => {
    setSelectedLanguage(e.target.value);
  };
  const [coinIcon,setCoinIcon] = useState(greenIcon)
  const [textColor,setTextColor] = useState('#1BA56F')
    const [showDetails,setDetails] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
  const selectedItems = bundlAddons.bundle_details?.flatMap(bundle =>
    bundle.design_list.map(design => ({
      ...design,
      quantity: quantities[design.name_english] || design.quantity,
      total_price: (quantities[design.name_english] || 1) * design.price,
      total_time: (quantities[design.name_english] || 1) * design.time
    }))
  );

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0 });
    getBundlData();
    getprojects()
    
  }, []);
  console.log(location.state?.bundlDetail,location.state?.index, 'details')
  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth < 440);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);
  const validateFields = () => {

    const totalAmount = parseFloat(location.state.bundlDetail?.price )+ addonPayLoads.total_price;
    if (totalAmount < 4880) {
      toast.error(`Minimum order is 4880 SAR`, {
        position: toast?.POSITION?.TOP_RIGHT,
      });
      return false;
    }

    if (brandInput == '') {
      toast.error(`Name your brand`, {
        position: toast?.POSITION?.TOP_RIGHT,
      });
      return false;
    }

    return true;
  };


  const getBundlData = async () => {
    const colors = {
      '12':'#f175ad',
      '4':'#1BA56F',
      '22':"#00A8C8",
      '13':'#f175ad',
    }
    if(location.state.bundlDetail?.id == '12'){
      setCoinIcon(pinkIcon)
    }
    else if(location.state.bundlDetail?.id == '4'){
      setCoinIcon(greenIcon)
    }
    else if(location.state.bundlDetail?.id == '22'){
      setCoinIcon(blueIcon)
    }
   else if(location.state.bundlDetail?.id == '13'){
    setCoinIcon(pinkIcon)
    }
    setTextColor(colors[location.state.bundlDetail?.id])
    const response = await axios.get(`${base_url}/api/package/?bundle_id=${location.state.bundlDetail?.id}`, ConfigToken());
    setBundlAddons(response.data);
    console.log(response.data,'daasss')
    const flatList = response.data?.bundle_details?.flatMap(item => item.design_list);

    const data = flatList.reduce((acc, item) => {
      acc[item.name_english] = item.quantity;
      return acc;
    }, {});
    setQuantities(data)
    setactual(data)
  }
  const getprojects = async () => {
    const response = await axios.get(`${base_url}/api/order/`, ConfigToken());
    if (response.data) {
        const resProjects = response.data.data.filter(item=> item.order_status!='in_cart')
        if (resProjects.length) {
            setFirstOrder(true)
        }
    }
}

  // const handleQuantityChange = (designName, change) => {
  //   setQuantities(prevQuantities => ({
  //     ...prevQuantities,
  //     [designName]: Math.max(1, (prevQuantities[designName] || 1) + change)
  //   }));
  //   console.log(quantities)
  // };
  const handleQuantityChange = (designName, change) => {
    console.log(change,'chabge')
    if (designName in extraQty == false && change<0){
      setMinError([...minError,designName])
      return 
    }else if(extraQty[designName]==0 && change<0){
      setMinError([...minError,designName])
      return
    }else{
       setMinError((prevErrors) => prevErrors.filter((error) => error !== designName));
    }
    setExtraQty(prevQuantities => {
      let newQuantity = (prevQuantities[designName] || 0) + change;
      return {
        ...prevQuantities,
        [designName]: newQuantity
      };
    });
  };



  const createPayload = async () => {
    if (!validateFields()) return;
    if (!bundlAddons.bundle_details) {
      console.warn("No bundle details available yet.");
      return;
    }

    const total_price = Object.keys(quantities).reduce((total, designName) => {
      const item = bundlAddons.bundle_details
        .flatMap(bundle => bundle.design_list)
        .find(design => design.name_english === designName);
      const quantity = quantities[designName];
      return item ? total + item.price * quantity : total;
    }, 0);

    const total_time = Object.keys(quantities).reduce((total, designName) => {
      const item = bundlAddons.bundle_details
        .flatMap(bundle => bundle.design_list)
        .find(design => design.name_english === designName);
      const quantity = quantities[designName];
      return item ? total + item.time * quantity : total;
    }, 0);

    const taxRate = 18;
    const tax = Math.round(total_price * (taxRate / 100));

    const item_list = bundlAddons.bundle_details.flatMap((bundle, index) =>
      bundle.design_list.map((design, idx) => {
        const quantity = quantities[design.name_english] || 1;
        return {
          design_id: design.id,
          unit_price: design.price.toString(),
          unit_time: design.time.toString(),
          qty: quantity.toString(),
          item_type: "bundl"
        };
      })
    );
    const payload = {
      order_name: brandInput,
      bundle_id: location.state.bundlDetail?.id,
      total_time:  location.state.bundlDetail?.time + addonPayLoads.total_time,
      total_price: parseFloat(location.state.bundlDetail?.price) + addonPayLoads.total_price,
      tax_treatment: taxRate + addonPayLoads.tax_treatment,
      tax: tax + addonPayLoads.tax,
      item_list: item_list,
      addons: addonPayLoads,
      order_status: "in_cart",
      language: selectedLanguage,
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
      <ToastContainer />
      <Navbar />
      <div className='bundl-detail'>
        <div className='xs:px-2 sm:px-auto px-auto' style={{ borderBottom: '1.5px solid #000000', width: '100%' }}>
          <h2 className='sm:text-[40px] text-[40px] xs:text-[32px]'>{location.state?.bundlDetail?.name_english}</h2>
          <div className='bundl-amount'>
            <p style={{color:textColor}}  className='flex items-center'><img src={coinIcon} alt="Dollar icon" className="inline-block mr-3" /><span>{Math.round(location.state?.bundlDetail?.price) || "3750 SAR"} SAR</span></p>
            <p style={{color:textColor}}  className='items-center flex'><AccessTimeIcon className='mr-1'/><span> {location.state?.bundlDetail?.time || "30 Days"} Days</span></p>
          </div>
          <p className='bundl-desc-title text-[20px] sm:text-[20px] xs:text-[16px] w-full sm:w-full xs:w-[350px] mx-auto'>Main outcomes: Brand Identity, Commerce Collateral, Social Media Starter Kit.</p>
          <p className='bundl-desc'>{location.state?.bundlDetail?.description_english}</p>
          <p className='one-minor my-3'>* This Bundl includes one minor revision</p>
        </div>

        <div className='bundl-section'>
          <div className='brand-details !pt-16'>
            <p style={window.innerWidth <= 441 ? { fontSize: '32px', fontWeight: '700' } : { textAlign: 'left', fontSize: '32px', fontWeight: '700' }}>What is the name of your brand?</p>
            <input className='brand-input' onChange={(e) => setBrandInput(e.target.value)} />
            <div className='commerce-collateral'>
              {bundlAddons.bundle_details?.map((bundle, index) => {
                return <div key={index} className='bundle-section' style={{ margin: '3% 0 0 0' }}>
                  <p className={`collateral-text mb-[2px] leading-[1.2] ${bundle.name_english == 'Social Media Starter Kit'?'w-[80%]': 'w-full'}`}>{bundle.name_english}</p>
                  <p className='text-[16px] sm:text-[16px] xs:text-[20px]' style={{ opacity: '50%' }}>{bundle.slogan_english}</p>
                  {
                    bundle.name_english === "Brand Identity" ? (
                      <div style={window.innerWidth < 441 ? { display: 'flex', width: '100%',flexWrap:'wrap' } : { display: 'flex', width: '100%' ,alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' }}>
                        <p className='logo-design xs:basis-[100%] sm:basis-1/4'>Logo design</p>
                          <p className='mr-3'>
                            <label className='cursor-pointer flex items-center mb-0'>
                              <input
                                type="radio"
                                name="language"
                                value="English"
                                className="mr-2"
                                checked={selectedLanguage === 'English'}
                                onChange={handleRadioChange}
                              />
                              English
                            </label>
                          </p>

                          <p className='mr-3'>
                            <label  className='cursor-pointer flex items-center  mb-0'>
                              <input
                                type="radio"
                                name="language"
                                value="Arabic"
                                className="mr-2"
                                checked={selectedLanguage === 'Arabic'}
                                onChange={handleRadioChange}
                              />
                              Arabic
                            </label>
                          </p>

                          <p className='mr-3'>
                            <label  className='cursor-pointer flex items-center  mb-0'>
                              <input
                                type="radio"
                                name="language"
                                value="Both"
                                className="mr-2"
                                checked={selectedLanguage === 'Both'}
                                onChange={handleRadioChange}
                              />
                              Both (+2000 SAR)
                            </label>
                          </p>

                      </div>
                    ) : bundle.design_list.map((design, idx) => {
                      const isSingleItem = bundle.design_list.length === 1;
                      const isLastIndex = idx === bundle.design_list.length - 1;
                      const sectionClassName = !isSingleItem && !isLastIndex ? 'commerce-sections' : 'commerce-sections1';
                      return (
                        <div key={idx} className={`flex flex-wrap justify-between pt-[2%] sm:pt-[2%] xs:pt-[5%] ${sectionClassName} w-[100%]`}>
                          <p className='sm:basis-[33%] basis-[33%] xs:basis-[66%]'>{design.name_english}</p>
                          {
                            ( minError.includes(design.name_english) && isMobile == false) && (
                              <div 
                              style={{color:textColor}}
                              className={`w-[47%] text-left text-[16px]`}
                              >
                            Minimum quantity cannot be decreased
                            </div>
                            )
                          }
                          <p className=' md:basis-auto basis-auto xs:basis-[10%] flex items-center text-[#000000] h-[34px] border !border-[#000000]'>
                                                                <button onClick={() => handleQuantityChange(design.name_english, -1)} className='border-r !border-[#000000] px-1 flex h-[100%] items-center'><RemoveIcon /></button>
                                                                <span className='border-r !text-[20px] font-normal px-2 !border-[#000000]'> {parseInt(design.quantity)+ (extraQty[design.name_english] || 0)}</span>
                                                                <button  onClick={() => handleQuantityChange(design.name_english, 1)} className='flex items-center px-1 '><AddIcon /></button>
                                                            </p>
                                                            {
                            ( minError.includes(design.name_english) && isMobile) && (
                              <div 
                              style={{color:textColor}}
                              className={`w-[100%] text-left text-[16px]`}
                              >
                            Minimum quantity cannot be decreased
                            </div>
                            )
                          }
                        </div>

                      )
                    })
                  }

                </div>
              })}
            </div>
            <Accordian textColor={textColor} extraQty={extraQty} accordianTitle={'Something feels missing ?'} addOnPayload={setAddonPayLoads} bundlePackageId={location.state.bundlDetail?.id} />
          </div>

          <div className='bundl-summary !border-black border max-h-[80%] overflow-y-scroll w-full' >
            <div className='bundl-name '>
              <p className='sm:text-[24px] xs:mb-0 xs:flex xs:justify-between sm:block font-[700] px-0 !mb-2'  >
              <span className='font-normal'>Summary</span>
              {isMobile && <button onClick={()=> setDetails(!showDetails)} style={{color:`${textColor}`}} className='text-[14px] font-normal underline'>Show Details</button>}
              </p>
            </div>
            {!isMobile || isMobile && showDetails ? <>
            <div style={{ display: 'flex', padding: '1% 5%' }}>
              <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[60%]'>{location.state?.bundlDetail?.name_english } {location.state?.bundlDetail?.name_english && 'Bundl'}</p>
              <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[40%]'>{Math.round(location.state?.bundlDetail?.price)} sar</p>
            </div>
            {selectedItems?.map((item, idx) => {
             return <div key={idx} className='one-brand-identity xs:flex sm:block block flex-wrap justify-around'>
                <p className='text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 w-[42%]' >{item.quantity} {item.name_english}</p>
                <div className='flex xs:w-[58%]  sm:w-full w-full'>
                  <p className='sm:text-[20px] xs:ml-10 sm:ml-[2px] text-[20px] xs:text-[16px] font-[700] w-[40%]' style={{color:textColor }}>+ {item.total_time} Days</p>
{ item.id =='76' && selectedLanguage == 'Both'? <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[50%]' style={{color:textColor }}>+ {item.total_price + 2000} sar</p>:
<p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[40%]' style={{color:textColor }}>+ {item.total_price} sar</p>}
                </div>
              </div>
})}
    
          <div className='bundl-name'>
              {
                addonPayLoads?.length > 0 && (
                  <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>Add ons</p>
                )
              }
            </div>
            {addonPayLoads?.item_list?.map((addon, idx) => (
              <div key={idx} className=' one-brand-identity xs:flex sm:block block flex-wrap justify-around'>
                <p className='text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 w-[42%]'>{addon.qty} {addon.addon_name}</p>
                <div className='flex xs:w-[58%]  sm:w-full w-full' >
                  <p className='sm:text-[20px] xs:ml-10 sm:ml-[2px] text-[20px] xs:text-[16px] font-[700] w-[40%]' style={{color:textColor }} >+ {addon.unit_time * addon.qty} Days</p>
                  <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[40%]' style={{color:textColor }}>+ {addon.unit_price * addon.qty} sar</p>
                </div>
              </div>
            ))}
  </>:''}

            <div className='bundl-checkout sm:mt-3'>
              <div className='total !font-[700]' style={{ display: 'flex' }}>
                <p className='sm:mb-3 xs:mb-0 flex items-center !xs:text-[16px] !sm:text-[20px]' style={{ width: '60%' }}><img src={BlackDollor} alt="Total Price" className="inline-block !font-[700] sm:ml-1 xs:ml-2" /><span className='sm:ml-3 xs:ml-5 !font-[700]'>Total Price :</span></p>
                <p className='!font-[700] text-end !xs:text-[16px] !sm:text-[20px] sm:mb-3 xs:mb-0'  style={{ width: '40%' }} >{parseFloat(location.state.bundlDetail?.price) + addonPayLoads.total_price} sar</p>
              </div>
              <div className='total' style={{ display: 'flex' }}>
                <p className='!xs:text-[16px] flex items-center !sm:text-[20px]' style={{ width: '60%' }}><img src={BlackTime} alt="Total Duration" className="inline-block" /><span className='ml-3'>Total Duration :</span></p>
                <p className='!xs:text-[16px] text-end !sm:text-[20px]'  style={{ width: '40%' }}>{location.state?.bundlDetail?.time + addonPayLoads.total_time} Days</p>
              </div>

              <div >
                {
                  (parseFloat(location.state.bundlDetail?.price) + addonPayLoads.total_price) > 700 ?
                    <button style={{backgroundColor:textColor}} className={`proceed !bg-[${textColor}]`}  onClick={createPayload} >Proceed Checkout</button> :
                    <button style={{backgroundColor:textColor}} className={`proceed !bg-[${textColor}]`} disabled>Proceed Checkout</button>
                }
              </div>
             {firstOrder == false && <p className='proceed-text'>Your minimum total should be above 4880 SAR</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

