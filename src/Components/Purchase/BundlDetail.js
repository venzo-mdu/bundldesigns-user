import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Purchase/Purchase.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Accordian } from '../Common/Accordian'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import greenIcon from  '../../Images/green staked coin.svg'
import pinkIcon from '../../Images/pink staked coin.svg'
import blueIcon from '../../Images/blue staked coin.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { base_url } from '../Auth/BackendAPIUrl'
import { ConfigToken } from '../Auth/ConfigToken'
import { ToastContainer, toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Bgloader } from '../Common/Background/Bgloader'
import { Popup } from '../Common/Popup/Popup'


export const BundlDetail = () => {

  const location = useLocation();
  const {state} = location;
  const { packageID } = useParams();
  const [packageDetail,setPackageDetail] = useState()
  const navigate = useNavigate();
  const [brandError,setBrandError] = useState(false)
  const [loading,setLoading] = useState(true)
  const [bundlAddons, setBundlAddons] = useState([]);
  const [minError,setMinError] = useState([])
  const [quantities, setQuantities] = useState({});
  const [addonPayLoads, setAddonPayLoads] = useState({});
  const [extraQty,setExtraQty] = useState({})
  const [brandInput, setBrandInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [firstOrder,setFirstOrder] = useState(true)
  const [actual,setactual] = useState({})
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isFromLogin , setIsFromLogin] = useState(state?.fromLogin)
  const [routeId , setRouteId] = useState({
    'newbie':12,
    'foodie':4,
    'socialite':22,
    'boutiquer':13,
  })
  const [routeNames , setRouteNames] = useState({
          4:'foodie',
          12:'newbie',
          13:'boutiquer',
          22:'socialite'
        })
  const [coinIcon,setCoinIcon] = useState(greenIcon)
  const [textColor,setTextColor] = useState('#1BA56F')
  const [showDetails,setDetails] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
  const [openPopup, setOpenPopup] = useState(false);
  const selectedItems = bundlAddons.bundle_details?.flatMap(bundle =>
    bundle.design_list.map(design => ({
      ...design,
      quantity: quantities[design.name_english] || design.quantity,
      total_price: design.total_price,
      total_time: (quantities[design.name_english] || 1) * design.time
    }))
  );
  
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0 });
    getBundlData();
    // getprojects()
  }, []);

  useEffect(() => {
    setBrandError(false);
        if (isFromLogin) {
            console?.log(JSON.parse(localStorage.getItem('payloads')))
            setBrandError(state?.project_name && false);
            createPayload();
        }
})

  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth < 440);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);

  const handleRadioChange = (e) => {
    setSelectedLanguage(e.target.value);
  };
  console.log(brandInput)
  const validateFields = () => {


    if (brandInput.trim() == '') {
      if (!toast.isActive('required-value-toast')) {
        toast.error(`Name your brand`, {
          position: toast?.POSITION?.TOP_RIGHT,
          toastId: 'required-value-toast',
          autoClose: 500
        });
      }
      
      const element = document.getElementById("brandInput");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setBrandError(true)
      return false;
    }

    const total_price = parseFloat(packageDetail?.package?.price) +
    addonPayLoads.total_price +
    (selectedLanguage === 'Both' ? 2000 : 0)
    if(firstOrder && total_price < 4880 && packageID=='newbie'){
      toast.error(`Minimum order amount should be 4880`, {
        position: toast?.POSITION?.TOP_RIGHT,
        toastId: 'required-value-toast2',
      });
      return false;
    }
    return true;
  };
  const getBundlData = async () => {
    setLoading(true)
    const colors = {
      // '12':'#f175ad',
      // '4':'#1BA56F',
      // '22':"#00A8C8",
      // '13':'#f175ad',
      'newbie':'#f175ad',
      'foodie':'#1BA56F',
      'socialite':"#00A8C8",
      'boutiquer':'#f175ad',
    }
    if(state && 'project_name' in state){
      setBrandInput(state.project_name)
    }
    if(packageID == 'newbie'){
      setCoinIcon(pinkIcon)
    }
    else if(packageID== 'foodie'){
      setCoinIcon(greenIcon)
    }
    else if(packageID == 'socialite'){
      setCoinIcon(blueIcon)
    }
   else if(packageID == 'boutiquer'){
    setCoinIcon(pinkIcon)
    }
    setTextColor(colors[packageID])
    const response = await axios.get(`${base_url}/api/package/?bundle_id=${routeId[packageID]}`, 
      // ConfigToken()
    );
    setBundlAddons(response.data);
    setPackageDetail(response.data)
    const flatList = response.data?.bundle_details?.flatMap(item => item.design_list);

    const data = flatList.reduce((acc, item) => {
      acc[item.name_english] = item.quantity;
      return acc;
    }, {});
    setQuantities(data)
    setactual(data)
    setLoading(false)
  }
//   const getprojects = async () => {
//     const response = await axios.get(`${base_url}/api/order/`, 
//       // ConfigToken()
//     );
//     if (response.data) {
//         const resProjects = response.data.data.filter(item=> item.order_status!='in_cart')
//         if (resProjects.length) {
//             setFirstOrder(false)
//         }
//     }
// }
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
        toast.success(`Cart updated successfully`, {
                position: toast?.POSITION?.TOP_RIGHT,
                toastId: 'required-value-toast1',
                autoClose: 500
              });
    setExtraQty(prevQuantities => {
      let newQuantity = (prevQuantities[designName] || 0) + change;
      return {
        ...prevQuantities,
        [designName]: newQuantity
      };
    });
  };

  const emptyCart = async () => {
    setOpenPopup(false);
    await axios.delete(`${base_url}/api/order/cart/`, ConfigToken());
    // addToCart(selectedIndex)
    toast.success('Cart emptied,Now Checkout');
    createPayload();
}

  const createPayload = async () => {
    if (!validateFields()) return;
    if (!bundlAddons.bundle_details) {
      console.warn("No bundle details available yet.");
      return;
    }

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
    const savedPayload = JSON.parse(localStorage.getItem('payloads') || '{}');
    const payload = isFromLogin
    ? savedPayload : {
      order_name: brandInput,
      bundle_id: routeId[packageID],
      total_time:  packageDetail?.package?.time + addonPayLoads.total_time,
      total_price: parseFloat(packageDetail?.package?.price) +
      addonPayLoads.total_price +
      (selectedLanguage === 'Both' ? 2000 : 0),
      item_list: item_list,
      addons: addonPayLoads,
      order_status: "in_cart",
      language: selectedLanguage,
    };

    try {
        const response = await axios.get(`${base_url}/api/order/cart/`, ConfigToken());
        if(response?.data?.order_status && !state?.project_name){
          setOpenPopup(true)
        }
        else if(response?.data?.order_status && state?.project_name && state?.fromLogin){
          setOpenPopup(true)
        }
        else if (state?.project_name){
          const createResponse = await axios.post(`${base_url}/api/order/create/`, payload,ConfigToken());
          navigate('/mycart', { state: { orderData: createResponse.data.data.data } });
        }
        else {
          const createResponse = await axios.post(`${base_url}/api/order/create/`, payload,ConfigToken());
          navigate('/mycart', { state: { orderData: createResponse.data.data.data } });
        }
    } catch (error) {
      console.error("Error creating order:", error);
      localStorage?.setItem('payloads',JSON.stringify(payload))
      navigate(`/login?next_url=bundldetail/${packageID}`,{state:{
        project_name:brandInput
      }});
    }
   
  };

  return (
    <>
    {
      loading?    
       <Bgloader /> : 
       <div>
       <ToastContainer />
       <Navbar />
       <div className='bundl-detail mt-3'>
         <div className='xs:px-2 sm:px-auto px-auto' style={{ borderBottom: '1.5px solid #000000', width: '100%' }}>
           <h2 className='sm:text-[40px] text-[40px] xs:text-[32px]'>{packageDetail?.package?.name_english||  ''}</h2>
           <div className='bundl-amount'>
             <p style={{color:textColor}}  className='flex items-center'><img src={coinIcon} alt="Dollar icon" className="inline-block mr-3" /><span>{Math.round(packageDetail?.package?.price) || "3750 SAR"} SAR</span></p>
             <p style={{color:textColor}}  className='items-center flex'><AccessTimeIcon className='mr-1'/><span> {packageDetail?.package?.time || "30 Days"} Days</span></p>
           </div>
           <p className='bundl-desc-title text-[20px] sm:text-[20px] xs:text-[16px] w-full sm:w-full xs:w-[350px] mx-auto'>Outcomes to Brand Identity + Add-ons.</p>
           <p className='bundl-desc'>{packageDetail?.package?.description_english || ''}</p>
           <p className='one-minor my-3'>* This Bundl includes one minor revision</p>
         </div>
 
         <div className='bundl-section'>
           <div className='brand-details lg:!pt-16 md:!pt-[16] xs:!pt-8'>
             <p style={window.innerWidth <= 441 ? { fontSize: '20px', fontWeight: '700',lineHeight:'1.2' } : { textAlign: 'left', fontSize: '32px', fontWeight: '700' }}>What is the name of your brand?</p>
             <input id='brandInput'  className={`brand-input rounded-none ${brandError && '!border-[red] rounded-none'}`} value={brandInput} onChange={(e) => {setBrandInput(e.target.value)
           
              setBrandError(false)}} />
                {brandError && <p className='text-[red]'>Please enter name of the brand</p>}
             <div className='commerce-collateral'>
               {bundlAddons.bundle_details?.map((bundle, index) => {
                 return <div key={index} className='bundle-section' style={window.innerWidth <= 475 ? { margin: '5% 0 0 0' }:{ margin: '3% 0 0 0' }}>
                   <p className={`collateral-text mb-[2px] leading-[1.2] ${bundle.name_english == 'Social Media Starter Kit'?'w-[80%]': 'w-full'}`}>{bundle.name_english}</p>
                   <p className='text-[16px] sm:text-[16px] xs:text-[18px]' style={{ opacity: '50%' }}>{bundle.slogan_english}</p>
                   {
                     bundle.name_english === "Brand Identity" ? (
                       <div style={window.innerWidth < 441 ? { display: 'flex', width: '100%',flexWrap:'wrap' } : { display: 'flex', width: '100%' ,alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' }}>
                         <p className='logo-design xs:basis-[100%] sm:basis-1/4'>Logo design</p>
                           <p className='mr-3'>
                             <label className='cursor-pointer flex items-center leading-none mb-0'>
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
                             <label  className='cursor-pointer flex items-center leading-none mb-0'>
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
                             <label  className='cursor-pointer flex items-center leading-none mb-0'>
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
             <Accordian textColor={textColor} extraQty={extraQty} accordianTitle={'Something feels missing ?'} addOnPayload={setAddonPayLoads} bundlePackageId={routeId[packageID]} />
           </div>
           {/* // border-black */}
           <div 
           style={{
            // maxHeight: showDetails ? "80%" : "200px", 
            transition: "all 0.5s ease-in-out",
          }}
           className='bundl-summary  border max-h-[80%] w-full xs:overflow-y-auto lg:overflow-hidden md:overflow-hidden' >
             <div className='bundl-name '>
               <p className='sm:text-[24px] xs:mb-0 xs:flex xs:justify-between sm:block font-[700] px-0 !mb-2'  >
               <span className='font-normal'>Summary</span>
               {isMobile && <button onClick={()=> setDetails(!showDetails)} style={{color:`${textColor}`}} className='text-[14px] font-normal underline'>{showDetails ? 'Hide Details':'Show Details'}</button>}
               </p>
             </div>
             {!isMobile || isMobile && showDetails ? <>
              <div style={{ display: 'flex', padding: '1% 2%' }} className='border-y-[1px] border-black'>
               <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[60%] mb-0 pt-0'>{packageDetail?.package?.name_english ||'' } {packageDetail?.package?.name_english && 'Bundl'}</p>
               <p className='sm:text-[20px] text-[20px] text-right xs:text-[16px] font-[700] w-[38%] mb-0 pt-0'>{Math.round(packageDetail?.package?.price)} SAR</p>
             </div>
             {/* {selectedItems?.map((item, idx) => {
              return <div key={idx} className='one-brand-identity xs:flex sm:block block flex-wrap justify-around'>
                 <p className='text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 xs:w-[42%] sm:w-full' >{item.quantity} {item.name_english} <span className='sm:text-[16px] text-[16px] xs:text-[14px]'>{item.id =='76' && (selectedLanguage == 'Both' ? '(English & Arabic)' :`(${selectedLanguage})`)} </span></p>
                 <div className='flex xs:w-[58%]  sm:w-full w-full'>
                   <p className='sm:text-[20px] xs:ml-10 sm:ml-[2px] text-[20px] xs:text-[16px] font-[700] w-[40%]' style={{color:textColor }}>+ {item.total_time} Days</p>
 { item.id =='76' && selectedLanguage == 'Both'? <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[50%]' style={{color:textColor }}>+ {item.quantity == 1
         ? parseFloat(item.price) + 2000 
         : parseFloat(item.price) + ((parseFloat(item.price) / 100) * item.price_increment * (item.quantity - 1)) + 2000} SAR</p>:
 <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[40%]' style={{color:textColor }}>+ {item.quantity == 1
         ? parseFloat(item.price)
         : parseFloat(item.price) + ((parseFloat(item.price) / 100) * item.price_increment * (item.quantity - 1))} SAR</p>}
                 </div>
               </div>
 })}
     
           <div className='bundl-name'>
               {
                 addonPayLoads?.item_list?.length > 0 && (
                   <p className='lg:text-[20px] md:text-[20px] xs:text-[14px] mb-0 font-[700] mt-2'>Add ons</p>
                 )
               }
             </div>
             {addonPayLoads?.item_list?.map((addon, idx) => (
               <div key={idx} className=' one-brand-identity xs:flex sm:block block flex-wrap justify-around'>
                 <p className='text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 w-[42%]'>{addon.qty} {addon.addon_name}</p>
                 <div className='flex xs:w-[58%]  sm:w-full w-full' >
                   <p className='sm:text-[20px] xs:ml-10 sm:ml-[2px] text-[20px] xs:text-[16px] font-[700] w-[40%]' style={{color:textColor }} >+ {addon.unit_time * addon.qty} Days</p>
                   <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[40%]' style={{color:textColor }}>+ {addon.total_price} SAR</p>
                 </div>
               </div>
             ))} */}

{bundlAddons?.bundle_details?.map((bundleItem) => (
                  <div key={bundleItem?.id} className="border-b-[1px] border-black">
                    <p className="text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 w-full px-[2%] mt-[3%]">{bundleItem?.name_english}</p>

                    {/* {bundleItem?.design_list?.map((selectedItem, idx) => (
                      <div key={idx} className='one-brand-identity xs:flex sm:block block flex-wrap justify-around'>
                        <div className='flex xs:w-[58%] sm:w-full w-full'>
                          <p className='text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 xs:w-[42%] sm:w-full'>
                            {selectedItem.quantity} {selectedItem.name_english}
                            <span className='sm:text-[16px] text-[16px] xs:text-[14px]'>
                              {selectedItem.id === '76' && (selectedLanguage === 'Both'  ? '(English & Arabic)'  : `(${selectedLanguage})`)}
                            </span>
                          </p>

                          {selectedItem.id === '76' && selectedLanguage === 'Both' ? (
                            <p
                              className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[50%]'style={{ color: textColor }}>
                              + {selectedItem.quantity === 1? parseFloat(selectedItem.price) + 2000: parseFloat(selectedItem.price) +((parseFloat(selectedItem.price) / 100) *selectedItem.price_increment *(selectedItem.quantity - 1)) +2000}
                              SAR
                            </p>
                          ) : (
                            <p
                              className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[40%]'
                              style={{ color: textColor }}
                            >
                              + {selectedItem.quantity === 1? parseFloat(selectedItem.price): parseFloat(selectedItem.price) +((parseFloat(selectedItem.price) / 100) *selectedItem.price_increment *(selectedItem.quantity - 1))}
                              SAR
                            </p>
                          )}
                        </div>
                      </div>
                    ))} */}
                    {
                            bundleItem?.design_list?.map((item, idx) => {
                              return <div key={idx} className={`one-brand-identity ${idx !== bundleItem?.design_list?.length-1 && 'h-[25px]' } xs:flex sm:block block flex-wrap justify-around`}>
                                <div className='flex xs:w-[100%]  w-full'>
                                  
                                <p className='text-black sm:text-[18px] text-[18px] xs:text-[16px] font-[400] !mb-1 xs:w-[75%] lg:w-full md:w-full sm:w-full ' >{item.quantity} {item.name_english} <span className='sm:text-[16px] text-[16px] xs:text-[14px]'>{item.id =='76' && (selectedLanguage == 'Both' ? '(English & Arabic)' :`(${selectedLanguage})`)} </span></p>
                { item.id =='76' && selectedLanguage == 'Both'? <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[50%]' style={{color:textColor }}>+ {item.quantity == 1
                        ? parseFloat(item.price) + 2000 
                        : parseFloat(item.price) + ((parseFloat(item.price) / 100) * item.price_increment * (item.quantity - 1)) + 2000} SAR</p>:
                <p className='sm:text-[20px] text-[18px] xs:text-[16px] font-[700] lg:w-[40%] md:w-[50%]  text-right' style={{color:textColor }}>+ {item.quantity == 1
                        ? parseFloat(item.price)
                        : parseFloat(item.price) + ((parseFloat(item.price) / 100) * item.price_increment * (item.quantity - 1))} SAR</p>}
                                </div>
                              </div>
                })}
                  </div>
                ))}



     
           <div>
               {
                 addonPayLoads?.item_list?.length > 0 && (
                  console.log(addonPayLoads),
                   <p className='lg:text-[20px] md:text-[20px] xs:text-[16px] mb-0 font-[700]  border-b-[1px] border-black px-[2%] py-[1%]'>Add ons</p>
                 )
               }
             </div>
             
             {/* {addonPayLoads?.item_list?.map((addon, idx) => (
               <div key={idx} className={` one-brand-identity ${idx !== addonPayLoads?.item_list?.length-1 && 'h-[25px]' } ${addonPayLoads?.item_list?.length-1 === idx && 'border-b-[1px] border-black'} xs:flex sm:block block flex-wrap justify-around`}>
                 <div className='flex xs:w-[100%]  w-full' >
                 <p className='text-black sm:text-[18px] text-[18px] xs:text-[16px] font-[400] !mb-1 xs:w-[75%]  lg:w-full md:w-full sm:w-full'>{addon.qty} {addon.addon_name}</p>
                   <p className='sm:text-[20px] text-[18px] xs:text-[16px] font-[400] lg:w-[40%] md:w-[50%] xs:w-[25%] text-right' style={{color:textColor }}>+ {addon.total_price} SAR</p>
                 </div>
               </div>
             ))} */}
             {addonPayLoads?.item_list && (
              Object.entries(
                addonPayLoads.item_list.reduce((acc, addon) => {
                  acc[addon.category] = acc[addon.category] || [];
                  acc[addon.category].push(addon);
                  return acc;
                }, {})
              ).map(([category, addons]) => (
                <div key={category}>
                  <p className="text-black sm:text-[20px] text-[20px] xs:text-[16px] font-[700] !mb-1 w-full px-[2%] mt-[3%]">{category}</p>
                  {addons.map((addon, idx) => (
                    <div 
                      key={idx} 
                      className={`one-brand-identity 
                        ${idx !== addons.length - 1 && 'h-[25px]'} 
                        ${addons.length - 1 === idx && 'border-b-[1px] border-black'}
                        xs:flex sm:block block flex-wrap justify-around`
                      }
                    >
                      <div className='flex xs:w-[100%] w-full'>
                        <p className='text-black sm:text-[18px] text-[18px] xs:text-[16px] font-[400] !mb-1 xs:w-[75%]  lg:w-full md:w-full sm:w-full'>
                          {addon.qty} {addon.addon_name}
                        </p>
                        <p 
                        className='sm:text-[20px] text-[18px] xs:text-[16px] font-[700] lg:w-[40%] md:w-[50%] xs:w-[25%] text-right' style={{color:textColor }}
                        >
                          + {addon.total_price} SAR
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
   </>:''}
 
             <div className='bundl-checkout sm:mt-3'>
               <div className='total !font-[700]' style={{ display: 'flex' }}>
                 <p className='sm:mb-3 xs:mb-0 flex items-center !xs:text-[16px] !sm:text-[20px]' style={{ width: '60%' }}><img src={BlackDollor} alt="Total Price" className="inline-block !font-[700] sm:ml-1 xs:ml-2" /><span className='sm:ml-3 xs:ml-5 !font-[700]'>Total Price :</span></p>
                 <p className='!font-[700] text-end !xs:text-[16px] !sm:text-[20px] sm:mb-3 xs:mb-0 '  
                 style={{ width: '40%' }} >{parseFloat(packageDetail?.package?.price) +
                  addonPayLoads.total_price +
                  (selectedLanguage === 'Both' ? 2000 : 0)} SAR</p>
               </div>
               <div className='total' style={{ display: 'flex' }}>
                 <p className='!xs:text-[16px] flex items-center !sm:text-[20px]' style={{ width: '60%' }}><img src={BlackTime} alt="Total Duration" className="inline-block" /><span className='xs:ml-4 sm:ml-1 ml-1'>Total Duration :</span></p>
                 <p className='!xs:text-[16px] text-end !sm:text-[20px]'  style={{ width: '40%' }}>{packageDetail?.package?.time + addonPayLoads.total_time} Days</p>
               </div>
 
               <div className='flex justify-center items-center'>
                 {
                   (parseFloat(packageDetail?.package?.price) + addonPayLoads.total_price) > 700 ?
                     <button style={{backgroundColor:textColor}} className={`proceed !bg-[${textColor}]`}  onClick={createPayload} >Proceed Checkout</button> :
                     <button style={{backgroundColor:textColor}} className={`proceed !bg-[${textColor}]`} disabled>Proceed Checkout</button>
                 }
               </div>
              {(firstOrder && packageID=='newbie') && <p className='proceed-text'>Your minimum total should be above 4880 SAR</p>}
             </div>
           </div>
         </div>
       </div>
       {
        window?.innerWidth >= 500 && (
          <Footer/>
        )
       }
     </div>
     
    }
    {
                openPopup &&
                <Popup
                    openpopup={openPopup}
                    setPopup={setOpenPopup}
                    title={'Your Cart was already full'}
                    subTitle={'Are you sure, you want to empty the cart.'}
                    onClick={emptyCart}
                    save={'Empty Cart'}
                    cancel={'Cancel'}
                    cancelClick={setIsFromLogin}
                />
            }
    </>
  )
}

