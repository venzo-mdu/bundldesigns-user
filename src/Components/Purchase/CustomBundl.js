import React, { useEffect , useState } from 'react'
import '../Purchase/Purchase.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Accordian } from '../Common/Accordian'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import { ConfigToken } from '../Auth/ConfigToken'
import axios from 'axios'
import { base_url } from '../Auth/BackendAPIUrl'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export const CustomBundl = ({lang,setLang}) => {

  const navigate = useNavigate();
      const [searchParams] = useSearchParams();
      const query = searchParams.get('search')
      const [brandError,setBrandError] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
    const [firstOrder,setFirstOrder] = useState(true)
  const location = useLocation();
  const {state} = location
  const [addonPayLoads, setAddonPayLoads] = useState({});
  const [brandInput , setBrandInput] = useState('');
  const [showDetails,setDetails] = useState(false)

  useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
    getprojects()
    if(state && 'project_name' in state){
      setBrandInput(state.project_name)
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 440);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);

  const createPayload = async() => {
    if (brandInput == '') {
      toast.error(`Name your brand`, {
        position: toast?.POSITION?.TOP_RIGHT,
        toastId: 'required-value-toast',
        icon:false,
          style:{
              color:'#D83D99',
              fontWeight:'700'
          }
      });
      const element = document.getElementById("brandInput");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setBrandError(true)
      return false;
    }
    if(firstOrder && addonPayLoads.total_price < 800){
          toast.error(`Minimum order amount should be 800`, {
            position: toast?.POSITION?.TOP_RIGHT,
            toastId: 'required-value-toast',
            icon:false,
            style:{
                color:'#D83D99',
                fontWeight:'700'
            }
          });
          return false;
        }
    if(addonPayLoads.item_list.length ==0){
      toast.error(`Please add an Item to Checkout`, {
        position: toast?.POSITION?.TOP_RIGHT,
        toastId: 'required-value-toast',
        icon:false,
          style:{
              color:'#D83D99',
              fontWeight:'700'
          }
      });
      return false;
    }
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
  const getprojects = async () => {
    const response = await axios.get(`${base_url}/api/order/`, ConfigToken());
    if (response.data) {
        const resProjects = response.data.data.filter(item=> item.order_status!='in_cart')
        if (resProjects.length) {
            setFirstOrder(false)
        }
    }
}
  return (
    <div>
      <ToastContainer />
      <Navbar isLang={lang} setIsLang={setLang}/>
      <div className='bundl-detail mt-3'>
        <div style={{ borderBottom: '1.5px solid #000000', width: '100%' }}>
          <h2>{location?.state?.title || (lang === 'ar' ? '' : 'Custom Bundl') }</h2>
          {/* <p className='bundl-desc-title'>Main outcomes: Brand Identity, Commerce Collateral, Social Media Starter Kit.</p> */}
          <p className='bundl-desc'>{lang === 'ar' ? '' : 'In this bundl, you have the freedom to mix and match from different add-ons that have been carefully curated to guarantee you find all the items needed for the success of your project.'}</p>
          <p className='one-minor mt-3'>{lang === 'ar' ? '' : '* This Bundl includes one minor revision'}</p>
        </div>

        <div className='bundl-section'>
          <div className='brand-details'>
            <p style={window.innerWidth<=441 ? {textAlign:lang === 'ar' ? 'right' : 'left',fontSize:'24px',fontWeight: '700'}:{ textAlign:lang === 'ar' ? 'right' : 'left', fontSize: '32px', fontWeight: '700' }}>{lang === 'ar' ? 'ما هو اسم علامتك التجارية؟' : 'What is the name of your brand?'}</p>
            <input id='brandInput'  className={`brand-input ${brandError && '!border-[red]'}`} value={brandInput}
             onChange={(e) => {setBrandInput(e.target.value)   
           setBrandError(false)}} 
           />
             {brandError && <p className='text-[red]'>Please enter name of the brand</p>}
            <div style={{ margin: '5% 0 0 0' }}>
              <Accordian
                accordianTitle={lang === 'ar' ? '' : 'Customize your Bundl!'}
                textColor={'#1BA56F'}
                addOnPayload={setAddonPayLoads}
                extraQty ={{}}
                searchParams={query}
                isLang={lang}
                bundlePackageId={'custombundl'}
              />
            </div>

          </div>
         
          <div className='bundl-summary  max-h-[80%] overflow-scroll'>
            <div className='bundl-name'>
              <p className='sm:text-[24px] xs:mb-0 xs:flex xs:justify-between sm:block' style={{ fontWeight: '700', padding: '2% 0%' }}>
               <span>{lang === 'ar' ? 'ملخص' : 'Summary'}</span>
    {isMobile && <button onClick={()=> setDetails(!showDetails)} className='text-[14px] text-[#1BA56F] font-normal underline uppercase'>{showDetails ? 'Hide Details' : 'Show Details'}</button>}
              </p>

            </div>
        {!isMobile || isMobile && showDetails ? <>
          <div className='bundl-name'>
              {
                addonPayLoads?.length > 0 && (
                  <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>{lang === 'ar' ? '' : 'Add ons'}</p>
                )
              }
            </div>
            {addonPayLoads?.item_list?.map((addon, idx) => (
              <div key={idx} className='one-brand-identity block xs:flex sm:block'>
                <p className='text-[#000] sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[45%]' >{addon.qty} {addon.addon_name}</p>
                <div className='flex xs:w-[55%] sm:w-full w-full'>
                  <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[55%]' >+ {addon.unit_time * addon.qty} {lang === 'ar' ? 'يوما' : 'Days'}</p>
                  <p className='sm:text-[20px] text-[20px] xs:text-[16px] font-[700] w-[45%]'>+ {addon.qty ==1 ? parseFloat(addon.unit_price): parseFloat(addon.unit_price) + ((parseFloat(addon.unit_price) / 100) * addon.price_increment * (addon.qty - 1)) } {lang === 'ar' ? 'ريال' : 'SAR'}</p>
                </div>
              </div>
            ))}
        </>:''}
            <div className='bundl-checkout sm:mt-3 xs:mt-0'>
              <div className='total ' style={{ display: 'flex' }}>
                <p className='w-[60%] flex items-center sm:mb-2 xs:mb-0'><img src={BlackDollor} alt="Total Price" className="inline-block ml-1"/><span className='ml-3 font-bold'>{lang === 'ar' ? 'السعر الإجمالي :' : 'Total Price :'}</span></p>
                <p className='w-[40%] xs:text-right sm:text-left !font-bold sm:mb-2 xs:mb-0' >{ addonPayLoads.total_price } {lang === 'ar' ? 'ريال' : 'SAR'}</p>
              </div>
              <div className='total  flex items-center' >
                <p className='w-[60%] flex items-center  sm:mb-2 xs:mb-0'><img src={BlackTime} alt="Total Duration" className="inline-block"/><span className='ml-1'>{lang === 'ar' ? 'المدة الإجمالية :' : 'Total Duration :'}</span></p>
                <p className='w-[40%] xs:text-right sm:text-left sm:mb-2 xs:mb-0'>{ addonPayLoads.total_time} {lang === 'ar' ? 'يوما' : 'Days'}</p>
              </div>

              <div className='proceed-checkout'>
                 <button onClick={createPayload} className='proceed  bg-[#1BA56F] uppercase'>{lang === 'ar' ? 'متابعة الخروج' : 'Proceed Checkout'}</button> 
              </div>
              {firstOrder && <p className='proceed-text'>{lang === 'ar' ? 'يجب أن يكون الحد الأدنى للمجموع أكثر من 700 ريال سعودي' : 'Your minimum total should be above 4880 SAR'}</p>}
            </div>
          </div>
        </div>
      </div>
      {
              window?.innerWidth >= 500 && (
                <Footer isLang={lang} />
              )
            }
    </div>
  )
}
