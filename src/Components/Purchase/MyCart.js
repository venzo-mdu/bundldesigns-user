import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Purchase/MyCart.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Popup } from '../Common/Popup/Popup'
import { ToastContainer, toast } from 'react-toastify'
import DeleteIcon from '../../Images/BundlDetail/deleteicon.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import { base_url } from '../Auth/BackendAPIUrl';
import { useNavigate } from 'react-router-dom'
import { ConfigToken } from '../Auth/ConfigToken'
import PhoneNumberInput from '../Pages/PhoneNumberInput';
import backIcon from "../../Images/backIcon.svg"
import { useSearchParams } from 'react-router-dom';
import { Bgloader } from '../Common/Background/Bgloader'
import ClipLoader from "react-spinners/ClipLoader";
import Riyal from '../../Images/BundlDetail/riyalnew.png'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
 
export const MyCart = ({lang,setLang}) => {
    const [searchParams] = useSearchParams();
    const isDirect = searchParams.get('direct') === 'true';
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();
    const [paymentLoading , setPaymentLoading] = useState(false);
    const [cartDetails, setCartDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [openPopup , setOpenPopup] = useState(false);
    const [removedItems,setRemovedItems] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
    const [phoneError,setPhoneError] = useState(false)
    const [totalAmount,setTotalAmount] = useState(0)
    const [coupon,setCoupon] = useState(null)
    const [profile,setProfile] = useState({})
    const [tax , setTax] = useState(false);
    const [isBack, setIsBack] = useState(false);

    const [routeNames , setRouteNames] = useState({
            4:'foodie',
            12:'newbie',
            13:'boutiquer',
            22:'socialite'
          })
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
        "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
        "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
        "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", 
        "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", 
        "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", 
        "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
        "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
        "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", 
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
        "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
        "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
        "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", 
        "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
        "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
        "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
        "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
      ];
      

    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        postalCode: '',
        promoCode: '',
        vat_registered:'',
        trn:''
    });

    const [error,setError] = useState({})
    const [errors, setErrors] = useState({});
    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0 });
        getCartData();
    }, []);
      useEffect(()=>{
        const handleResize = () => {
          setIsMobile(window.innerWidth < 440);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      },[]);
    const getCartData = async () => {
        try{
            setLoading(true)
            // const response = await axios.get(`${base_url}/api/order/${location.state.orderData.id}/`);
            getProfile()
            
            const response = await axios.get(`${base_url}/api/order/cart/`,ConfigToken());
            if(response.data){
                setTotalAmount(response.data.total_amount)
                setCartDetails({...response.data,actual_total_amount:response.data.total_amount});
            }
            if(response.status === 206){
               setOpenPopup(true)
            }
        }
        catch(e){
            navigate("/login");
        } finally{
            setLoading(false)
        }
    }; 
 
    const removeItem = async (itemId, itemType) => {
        if(itemType=='bundle'){
               toast.error(`Package Item Cannot removed`, {
                    position: toast?.POSITION?.TOP_RIGHT,
                    toastId: 'required-value-toast',
                    icon:false,
                    style:{
                        color:'#D83D99',
                        fontWeight:'700'
                    }
                  });
                  return;
        }
        let cartDetailsTemp = cartDetails
        const updatedItemDetails = { ...cartDetailsTemp.item_details };
            let updatedTotalAmount = cartDetailsTemp.actual_total_amount;
            let updatedTotalTime = cartDetailsTemp.total_time
            setRemovedItems(itemId)
            // Handle removal based on item type
                const removedItem = updatedItemDetails.addon_items.find(item => item.id === itemId);
                updatedTotalAmount -= removedItem?.subtotal_price || 0;
                const sorted = [...updatedItemDetails.addon_items].sort((a, b) => b.unit_time - a.unit_time);
                if(sorted.length && sorted[0].id == itemId){
                    updatedTotalTime -= removedItem?.unit_time
                    if(sorted.length >1){
                        updatedTotalTime += sorted[1].unit_time
                    }
                }
                updatedItemDetails.addon_items = updatedItemDetails.addon_items.filter(item => item.id !== itemId);

            // Recalculate the totals
            let updatedTax = 0; // Default value, assuming no tax
            let afterDiscount = updatedTotalAmount
            if(coupon){
                afterDiscount = afterDiscount - ((afterDiscount/100)* coupon.discount)
            }

            if (billingInfo.country.trim().toLowerCase() === 'saudi arabia') {
                updatedTax = afterDiscount * 0.15; // Assuming VAT is 15%
            } else {
                updatedTax = 0; // No tax for countries other than Saudi Arabia
            }
            const updatedGrandTotal = afterDiscount + updatedTax;
 
            const response = await axios.patch(`${base_url}/api/order/cart/`,{'item_to_delete':itemId,'total_amount':updatedTotalAmount,
                tax:updatedTax,'grand_total':updatedGrandTotal},ConfigToken());

                setCartDetails((prevCartDetails) => ({
                    ...prevCartDetails,
                    item_details: updatedItemDetails,
                    total_amount: afterDiscount,
                    actual_total_amount:updatedTotalAmount,
                    total_time: updatedTotalTime,
                    tax: updatedTax,
                    grand_total: updatedGrandTotal,
                }));

    };

    const getTotal = (countryValue,discount=null) =>{
        let cartDetailsTemp = cartDetails
        const updatedItemDetails = { ...cartDetailsTemp.item_details };
            let updatedTotalAmount = cartDetailsTemp.actual_total_amount
            if (discount || coupon){
                updatedTotalAmount = updatedTotalAmount - ((updatedTotalAmount/100) * (discount? discount: coupon.discount))
            }
            let updatedTotalTime = cartDetailsTemp.total_time
            // Handle removal based on item type
            // Recalculate the totals
            let updatedTax = 0; // Default value, assuming no tax
            let updatedTaxTreatment = 0
            if (countryValue.toLowerCase() === 'saudi arabia') {
                updatedTax = updatedTotalAmount * 0.15; // Assuming VAT is 15%
                updatedTaxTreatment = 15
            }

            const updatedGrandTotal = parseFloat(updatedTotalAmount) + updatedTax;
            
                setCartDetails((prevCartDetails) => ({
                    ...prevCartDetails,
                    item_details: updatedItemDetails,
                    total_amount: updatedTotalAmount,
                    actual_total_amount: cartDetailsTemp.actual_total_amount,
                    total_time: updatedTotalTime,
                    tax: updatedTax,
                    tax_treatment:updatedTaxTreatment,
                    grand_total: updatedGrandTotal,
                }))
    }
   
    const validateFields = () => {
        let newErrors = {};

        if (!billingInfo.firstName.trim()) {setError({firstName:'Your first name field is empty.'})
    return false
    }else if (/\d/.test(billingInfo.firstName)) { // Check if it contains any number
  setError({ firstName: "First Name should not contain numbers." });
  return false;
}
        if (!billingInfo.lastName.trim()){ setError({lastName:'Your last name field is empty.'})
    return false
    }else if (/\d/.test(billingInfo.lastName)) { // Check if it contains any number
  setError({ lastName: "Last Name should not contain numbers." });
  return false;
}

        if (!billingInfo.email.trim()) {
            setError({email:'Your email field is empty'})
           return false
        } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(billingInfo.email)) {
            setError({email:'Invalid email format'})
        return false
        }
        if(!billingInfo.phone.trim()){
            setError({phone:'Your phone number field is empty.'})
            return false
        }

        if (!billingInfo.country.trim()){ setError({country:'Your country field is empty.'})
        return false
    };
        if (!billingInfo.city.trim()) {setError({city:'Your city field is empty.'})
        return false};
        if (!billingInfo.vat_registered.trim()  && billingInfo?.country === 'Saudi Arabia') {setError({vat_registered:'Your Tax Treatment field is empty.'})
        return false;
        }
        if (!billingInfo.trn.trim() && billingInfo?.vat_registered === 'vat') {
            setError({ trn_number: 'Your TRN Number field is empty.' })

            return false
        };
        if (!billingInfo.postalCode.trim()) {
            setError({postalCode:'Your postal code field is empty.'})
            return false
        } 
        else if (!/^[0-9]{2,5}$/.test(billingInfo.postalCode)) {
            setError({postalCode:'Your postal code must be 2 to 5 digits.'})
            return false
        }

        // if (!billingInfo.promoCode.trim()) newErrors.promoCode = 'Promo code is required';
        setError(newErrors);

        // Return true if there are no errors
        return true;
    };
    const getProfile = async()=>{
        const response = await axios.get(`${base_url}/api/profile/`,ConfigToken());
        if(response.data){
            setProfile(response.data)
            setBillingInfo((prevState) => ({
                ...prevState,
                email: response.data.email,
              }));
        }
    }
 
    const handlePayment = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);
        if (validateFields()) {
            if(phoneError == false){
                try {
                    const formData = {...billingInfo,
                        user_name : billingInfo.firstName+' ' + billingInfo.lastName,
                        phone :billingInfo.phone,
                        promo_code:billingInfo.promoCode,
                        total_amount:cartDetails.total_amount,
                        total_time:cartDetails.total_time,
                        grand_total:cartDetails.grand_total,
                        tax_treatment:cartDetails.tax_treatment,
                        tax:cartDetails.tax,
                        items_to_delete:removedItems,
                        vat_registered:billingInfo?.vat_registered === 'vat' ? true : false,
                        trn:billingInfo?.vat_registered === 'non_vat' ? null : billingInfo?.trn
                    }

                    const response = await axios.put(`${base_url}/api/order/cart/?initiate=True`, formData,ConfigToken());
                    if(response.data){
                       window.location.href = response.data.data.redirect_url
                    }
                    // navigate('/dashboard', { state: { reDirect: true} });
                    console.log("Payment successful:", response.data);
                } catch (error) {
                    console.error("Payment error:", error);
                }finally {
                    setPaymentLoading(false);
                }
            }
        }
        else {
            setPaymentLoading(false);
        }
    };
 
    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        if(name === 'vat_registered'){
            if(value === 'vat'){
                setTax(true)
            }
            else{
                setTax(false)
            }
        }
        if(name =='country'){
            getTotal(value.trim())
        }
        if(['firstName','lastName','city'].includes(name)){
            const regex = /^[a-zA-Z\s]*$/;
            if (regex.test(value) || value === '') {
                setBillingInfo((prevState) => ({
                  ...prevState,
                  [name]: value,
                }));
            }
        }
        else if(name =='postalCode'){
            const regex = /^[0-9]*$/ 
            if (regex.test(value) || value === '') {
                setBillingInfo((prevState) => ({
                  ...prevState,
                  [name]: value,
                }));
            }
        }
        else{
            setBillingInfo({ ...billingInfo, [name]: value });
            delete errors[name] 
            setErrors(errors)
        }

    };
    const handlePromoChange = async(e) => {
        const { name, value } = e.target;
        setCoupon(null)
        setBillingInfo({ ...billingInfo, [name]: value });
        const response = await axios.get(`${base_url}/api/promocode?promoCode=${value}`,ConfigToken());
        if(response.status == 206){
            setError({...errors,promoCode:response.data.data})
            getTotal(billingInfo.country.trim(),0)
        }else if(response.status==200){
            setCoupon(response.data)
            getTotal(billingInfo.country.trim(),response.data.discount)
            delete errors['promoCode']
            setError(errors)
        }
    }
    // useEffect(() => {
    //     // Function to handle the back button (popstate)
    //     const handlePopState = (event) => {
    //       console.log('Back button pressed');
    //       setShowModal(true); // Show the modal
    //       document.documentElement.scrollTo({ top: 0, left: 0 });
    //       // Push the same state back to prevent navigation
    //       window.history.pushState(null, '', window.location.href);
    //     };
    
    //     // Push initial state into history when the component mounts
    //     window.history.pushState(null, '', window.location.href);
    
    //     // Add the event listener for "popstate"
    //     window.addEventListener('popstate', handlePopState);
    
    //     // Cleanup the listener on unmount
    //     return () => {
    //       window.removeEventListener('popstate', handlePopState);
    //     };
    //   }, []);
    
    // useEffect(() => {
    //     function onPopState(event) {
    //       setTimeout(()=>{
    //         setShowModal(true)
    //       },1000)
    //     }
    //     window.addEventListener("popstate", (event) => {
    //         console.log(
    //           `location: ${document.location}, state: ${JSON.stringify(cartDetails?.project_name)}`,
    //         );
    //       });
    //     return () => {
    //       setTimeout(() => {
    //         window.removeEventListener('popstate', onPopState);
    //       }, 1000);
    //     };
    //   });

    // useEffect(() => {
    //     const handleBackAction = () => {
    //         window.history.pushState(null, '', window.location.pathname); // Prevent navigation
    //         handleBackClick();
    //         console.log('event ')
    //     };
    // console.log(showModal)

    //      // Show modal when user goes back
    //     window.addEventListener('popstate', handleBackAction);

    //     // Push a new state when the page loads to track navigation
    //     window.history.pushState(null, '', window.location.pathname);

    //     return () => {
    //         window.removeEventListener('popstate', handleBackAction);
    //     };
    // }, []);





    // const handleQuantityChange = async (addonId, change) => {
    //     try {
    //       // Validate the new quantity before proceeding
    //       let newQty;
    //       let errorRaised = false;
      
    //       setCartDetails((prevCartDetails) => {
    //         let updatedDetails = { ...prevCartDetails };
      
    //         updatedDetails.item_details.addon_items = updatedDetails.item_details.addon_items.map((addon) => {
    //           if (addon.id === addonId) {
    //             newQty = addon.qty + change; // Calculate the new quantity
      
    //             // Check if the new quantity is below the minimum limit (0 in this case)
    //             if (newQty < 0) {
    //               return addon; // Do not update the quantity
    //             }
      
    //             return { ...addon, qty: newQty }; // Update the quantity in the local state
    //           }
    //           return addon;
    //         });
      
    //         return updatedDetails;
    //       });
      
    //       // If error is raised (newQty < 0), stop execution
    //       if (errorRaised) return;
      
    //       // Make the API call to sync changes
    //       const response = await axios.put(
    //         `${base_url}/api/order-item/${addonId}/`,
    //         {
    //           qty: newQty, // Pass the updated quantity
    //         },
    //         ConfigToken() // Pass configuration like headers here
    //       );
      
    //       // Handle success
    //       console.log("Addon updated successfully:", response.data);
    //       toast.success("Cart updated successfully", {
    //         position: toast?.POSITION?.TOP_RIGHT,
    //         toastId:'required-toast-qty',
    //         autoClose: 3000,
    //         style: {
    //           color: "#1BA56F",
    //           fontWeight: "700",
    //         },
    //       });
    //     } catch (error) {
    //       // Handle API errors
    //       console.error("Error updating addon:", error);
    //     }
    //   };
      

    const handleQuantityChange = async (addonId, change) => {
        try {
          let newQty;
          let priceDifference = 0;
      
          // Update the local state for the specific addon and adjust grand total
          setCartDetails((prevCartDetails) => {
            const updatedDetails = { ...prevCartDetails };
      
            updatedDetails.item_details.addon_items = updatedDetails.item_details.addon_items.map((addon) => {
              if (addon.id === addonId) {
                newQty = addon.qty + change; // Calculate the new quantity
      
                // Validate the new quantity (minimum limit is 0)
                if (newQty < 0) {
                  toast.error("Minimum quantity cannot be decreased", {
                    position: toast?.POSITION?.TOP_RIGHT,
                    autoClose: 3000,
                    style: {
                      color: "#D83D99",
                      fontWeight: "700",
                    },
                  });
                  return addon; // Do not update the quantity
                }
      
                // Calculate price difference for grand total update
                priceDifference = addon.unit_price * change;
      
                // Update quantity, subtotal price, and subtotal time
                return {
                  ...addon,
                  qty: newQty,
                  subtotal_price: addon.unit_price * newQty, // Recalculate subtotal price
                  subtotal_time: addon.unit_time * newQty,   // Recalculate subtotal time
                };
              }
              return addon;
            });
      
            // Update grand total by adding the price difference
      
            return updatedDetails;
          });
      
          // If newQty is invalid (negative), stop execution
          if (newQty < 0) return;
      
          // Make the API call to sync changes
          const response = await axios.put(
            `${base_url}/api/order-item/${addonId}/`,
            {
              qty: newQty, // Pass the updated quantity
            },
            ConfigToken() // Pass configuration like headers here
          );
      
          // Handle success
          console.log("Addon updated successfully:", response.data);
          toast.success("Cart updated successfully", {
            position: toast?.POSITION?.TOP_RIGHT,
            toastId: "required-toast-qty",
            autoClose: 3000,
            style: {
              color: "#1BA56F",
              fontWeight: "700",
            },
          });
        } catch (error) {
          // Handle API errors
          console.error("Error updating addon:", error);
          toast.error("Failed to update addon on the server", {
            position: toast?.POSITION?.TOP_RIGHT,
            autoClose: 3000,
            style: {
              color: "#D83D99",
              fontWeight: "700",
            },
          });
        }
      };
      
      
      
      
    
    
    const handleBackClick = () => {
        setShowModal(true);
      };
    
      const confirmNavigation = () => {
        setShowModal(false); 
        navigateToDetailHistory();
      };
    
      const navigateToDetailHistory = () => {
        if(cartDetails.bundle_id){
            navigate(`/bundldetail/${routeNames[cartDetails.bundle_id]}`,{state:{project_name:cartDetails.project_name}})
        }else{
            navigate(`/custombundl`,{state:{project_name:cartDetails.project_name}})
        }
      };
      
      const cancelNavigation = () => {
        setShowModal(false);
      };
    return (
        <>
        {
            loading ? <Bgloader /> :        
        <div>
            <ToastContainer />
            <Navbar isLang={lang} setIsLang={setLang}/>
            {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <p className="text-lg font-medium text-gray-900">
            Your customized package will be reset.
            Are you sure you want to go back?
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={()=>confirmNavigation()}
                className="px-4 py-2 bg-[#0BA6C4] text-white rounded-none uppercase"
              >
                Yes
              </button>
              <button
                onClick={cancelNavigation}
                className="px-4 py-2 bg-grey  text-white rounded-none hover:bg-grey uppercase"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
            <div className='mycart '>

                <div className='cart !xs:border-none  sm:!pb-[170px] !pb-[170px] xs:!pb-[20px]'>
                    <p  className='flex font-[500]  !text-[18px] items-center text-black mt-[2%]'> <img src={backIcon} className='mr-2 w-[30px] cursor-pointer' onClick={()=>handleBackClick()}></img><span className='cursor-pointer' onClick={()=>handleBackClick()}> Back to Bundl</span> </p>          
                    {/* {isDirect == false && <p onClick={()=>handleBackClick()} className='flex font-[500] cursor-pointer !text-[18px] items-center text-black mt-[2%]'> <img src={backIcon} className='mr-2 w-[30px]' onClick={()=>handleBackClick()}></img> Back to Bundl </p>}           */}
                    <p className='!xs:text-[16px] font-[700] !sm:text-[20px]'>Your Cart</p>
                    {isMobile ? 
                    <>
                            <div className='flex justify-between border-b pb-2 !border-black'> 
                            <div>
                            <div className='font-[700] text-[20px]'>{cartDetails?.bundl_english}</div>
                            <div className='font-[500] ml-8'> {Math.round(cartDetails.grand_total)} SAR</div>
                            </div>
                            {/* <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(cartDetails.id, 'bundle')}/></p> */}
                             </div>
                        {/* {cartDetails?.item_details?.bundle_items?.map((row,index) => (
                            <div className='flex justify-between border-b pb-2 !border-black'> 
                            <div>
                            <div className='font-[700] text-[20px]'>{row.item_name}</div>
                            <div className='font-[500] ml-8'> {row.unit_price} SAR</div>
                            </div>
                            <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'bundle')}/></p>
                             </div>
                        ))} */}
                                   <div className='mt-3'>

                                        {cartDetails?.item_details?.bundle_items?.map((row,index) => (
                                             <div className={`flex ${index === cartDetails?.item_details?.bundle_items?.length -1 && 'border-b border-black'} w-full`}> 
                                                <div className='font-[700] '> {row.qty} </div>
                                                <div className='font-[700] text-[20px] ml-2'>{row.item_name}</div>
                                            </div>
                                        ))}
                                    </div>
                                    {
                                        cartDetails?.item_details?.addon_items?.length >0 &&(
                                    <div className='font-[700] text-[20px] mt-2'>Add ons</div>
                                )
                                    }
                        {cartDetails?.item_details?.addon_items?.map((row,index) => (
                            <div className={`flex ${index === cartDetails?.item_details?.addon_items?.length -1 && 'border-b border-black'} w-full mt-2`}>
                                <div className='w-[70%]'>
                                <div className='font-[700] text-[20px] '>{row.item_name}</div>
                                <div className='font-[500] '> {row.subtotal_price} SAR</div>
                                </div>
                                <p  className={`xs:order-2 sm:order-3 sm:w-[29%] w-[29%] xs:w-[29%] max-h-[36px] !mb-2 flex justify-end`}>
                                            <button style={{
                                            borderColor: 'black',
                                            borderStyle: 'solid',
                                            borderWidth: '1px',
                                            }} 
                                            onClick={() => handleQuantityChange(row?.id, -1)} 
                                            className={` !border-r-0 !py-[17px]  px-1  flex  items-center`}>
                                                <RemoveIcon />
                                            </button>
                                            <span style={{
                                            borderColor: 'black',
                                            borderStyle: 'solid',
                                            borderWidth: '1px',
                                            }} className={`!border-r-0 px-2 !text-[20px]`}> {row?.qty || 0}</span>
                                            <button style={{
                                            borderColor: 'black',
                                            borderStyle: 'solid',
                                            borderWidth: '1px',
                                            }} 
                                            onClick={() => handleQuantityChange(row?.id, 1)} 
                                            className={`flex  items-center px-1  !py-[5px] `}><AddIcon /></button>
                                        </p>
                            </div>
                                ))}
                    </>
                    :
                    <table className='w-full border-none' aria-label="simple table">
                            <thead>
                                <tr className='!text-left text-[20px]'>
                                    <td className= 'text-left w-[20%] text-[#00000080] pb-3' >Item</td>
                                    {/* <td className='text-[#00000080] w-[30%] pb-3'  align="center">Quantity</td> */}
                                    <td className='text-[#00000080] w-[30%]    pb-3' align="center">Price</td>
                                    <td className='text-[#00000080] w-[20%]    pb-3'  align="center">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <p className='text-[#000] font-[700] text-[20px]'>{cartDetails?.bundl_english}</p> */}
                                    <>
                                    <tr
                                        className={`text-[#000] font-[700] text-[20px] border-b border-black mb-2 `}
                                    >
                                        <td className='text-left !py-2' scope="row">
                                        {cartDetails?.bundl_english}
                                        </td>
                                        {/* <td className=' !py-2' align="center">{row.qty}</td> */}
                                        <td className=' !py-2' align="center"> {Math.round(cartDetails?.grand_total)}</td>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <td className=' !py-2' align="center">
                                            {/* <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(cartDetails.id, 'bundle')}/></p> */}
                                        </td>
                                    </tr>
                                 
                                    </>
                                    
                                        {cartDetails?.item_details?.bundle_items?.map((row,index) => (
                                            <tr className={` ${index === cartDetails?.item_details?.bundle_items?.length -1 && 'border-b border-black'} w-full`}>
                                            <td className='text-[#000] font-[700] !text-[18px] !px-[2%] !py-1'>{row.qty} {row?.item_name}</td>    
                                            </tr>
                                        ))}
                                            
                                   
                                

                                {cartDetails?.item_details?.addon_items?.map((row,index) => (
                                    <tr
                                        key={row.item_name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                className={`text-[#000] font-[700] text-[20px] ${index == cartDetails?.item_details?.addon_items.length-1 ?"": 'border-b border-black'} `}
                                    >
                                        <td className=' !py-2' scope="row">
                                            {row.item_name}
                                        </td>
                                        {/* <td className=' !py-2' align="center">{row.qty}</td> */}
                                        <td className=' !py-2' align="center">{row.subtotal_price}</td>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <td align="center">
                                            {/* <img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/> */}
                                            {/* <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/></p> */}
                                            <p  className={`xs:order-2 sm:order-3 sm:w-[29%] w-[29%] xs:w-[29%] max-h-[36px] !mb-2 flex justify-end  mt-2`}>
                                            <button style={{
                                            borderColor: 'black',
                                            borderStyle: 'solid',
                                            borderWidth: '1px',
                                            }} 
                                            onClick={() => handleQuantityChange(row?.id, -1)} 
                                            className={` !border-r-0 !py-[17px]  px-1  flex  items-center`}>
                                                <RemoveIcon />
                                            </button>
                                            <span style={{
                                            borderColor: 'black',
                                            borderStyle: 'solid',
                                            borderWidth: '1px',
                                            }} className={`!border-r-0 px-2 !text-[20px]`}> {row?.qty || 0}</span>
                                            <button style={{
                                            borderColor: 'black',
                                            borderStyle: 'solid',
                                            borderWidth: '1px',
                                            }} 
                                            onClick={() => handleQuantityChange(row?.id, 1)} 
                                            className={`flex  items-center px-1  !py-[5px] `}><AddIcon /></button>
                                        </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                        
                    <div className='cart-total-container '>
                        <div className='total justify-between sm:pl-10 xs:pl-1 mr-4' style={{ display: 'flex' }}>
                            <p  className='!text-[20px] xs:mb-0 sm:mb-auto' style={{ width: '50%' }}>Price:</p>
                            <p  className='!text-[20px] xs:mb-0 sm:mb-auto text-right' style={{ width: '50%' }}>{Math.round(cartDetails.total_amount)} SAR</p>
                        </div>
                        <div className='total justify-between sm:pl-10 xs:pl-1 mr-4' style={{ display: 'flex' }}>
                            <p  className='!text-[20px]' style={{ width: '53%' }}>TAX:</p>
                            <p  className='!text-[20px]  text-right' style={{ width: '40%' }}>{Math.round(cartDetails.tax)} SAR</p>
                        </div>
                        <div className='border-[2px] border-black p-[2%_0_0_2%]'>
                            <div  className='justify-between font-[700] mr-4'  style={{ display: 'flex'}}>
                                <p className='!text-[20px] xs:mb-0 sm:mb-auto ml-[6px]' style={{ width: '50%' }}><img src={BlackDollor} className='inline-block ml-[0px] mr-[18px]'></img>Total Price :</p>
                                <p className='!text-[20px] xs:mb-0 sm:mb-auto text-right' style={{ width: '40%' }}>{isNaN(Math.round(cartDetails.grand_total))?0:Math.round(cartDetails.grand_total)} SAR</p>
                            </div>
                            <div  className='justify-between  font-[700] mr-4' style={{ display: 'flex' }}>
                                <p className='!text-[20px] mb-0' style={{ width: '67%' }}><img src={BlackTime} className='inline-block mr-3'></img>Total Duration :</p>
                                <p className='!text-[20px]  text-right ' style={{ width: '43%' }}>{isNaN(Math.round(cartDetails.total_time))?0 :Math.round(cartDetails.total_time)} Days</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='billing'>
                    <p>Billing Address</p>
                    <form onSubmit={handlePayment} noValidate>
            <div className="user-name mb-[15px]">
                <div className='mr-[4%]'>
                    <label className={`${'firstName' in error ? 'text-[red]':'opacity-50'}`}>First Name <span className='text-[red]'>*</span></label>
                    <input 
                        name="firstName" 
                        value={billingInfo.firstName} 
                        onChange={handleBillingChange} 
                        className={`rounded-none ${'firstName' in error ? '!border-[red]' :''}`}
                    />
                </div>
                <div className='ml-[4%]' style={{ margin: '0% 0 0 2%' }}>
                    <label  className={`${'lastName' in error ? 'text-[red]':'opacity-50'}`}>Last Name <span className='text-[red]'>*</span></label>
                    <input 
                        name="lastName" 
                        value={billingInfo.lastName} 
                        onChange={handleBillingChange} 
                        className={`rounded-none ${'lastName' in error ? '!border-[red]' :''}`}
                    />
                </div>
            </div>
            <div className="email mb-[15px]">
                <label  className={`${'email' in error ? 'text-[red]':'opacity-50'}`}>Email <span className='text-[red]'>*</span></label>
                <input 

                    name="email" 
                    value={billingInfo.email} 
                    onChange={handleBillingChange} 
                    className={`rounded-none ${'email' in error ? '!border-[red]' :''}`}
                />
            </div>
            <div className="phonenumber mb-[15px]">
                <label className={`${'phone' in error ? 'text-[red]':'opacity-50'}`}>Phone Number <span className='text-[red]'>*</span></label>
                <PhoneNumberInput
        name="phone"
        placeholder="Enter phone number"
        value={billingInfo.phone}
        status={setBillingInfo}
        extraInputClass={`${'phone' in error ? '!border-[red]':'!border-[#000000]'} text-[18px]`}
        setPhoneError={setPhoneError}
        setErrors = {setError}
        formErrors = {error}
        idName={'vacancySelect'}
        className="w-full  text-[18px]  rounded-none"
      />
            </div>
            <div className="country mb-[15px]">
                <div className='mr-[4%]'>
                    <label className={`${'country' in error ? 'text-[red]':'opacity-50'}`}>Country <span className='text-[red]'>*</span></label>
                    <select 
                        name="country" 
                        // id='vacancySelect'
                        value={billingInfo.country|| null} 
                        onChange={handleBillingChange} 
                        className={`!rounded-none ${'country' in error ? '!border-[red]' :''} border !border-black px-2 py-[5px] w-full`}
                    >
                       <option value={null} disabled selected > </option>
                        { countries.map(country=>(
                            <option>{country}</option>
                        ))}
                    </select>
                </div>
                <div className='mr-[4%]' style={{ margin: '0% 0 0 2%' }}>
                    <label className={`${'city' in error ? 'text-[red]':'opacity-50'}`}>City<span className='text-[red]'>*</span></label>
                    <input 
                        name="city" 
                        value={billingInfo.city} 
                        onChange={handleBillingChange} 
                        className={`rounded-none ${'city' in error ? '!border-[red]' :''}`}
                    />
                </div>
            </div>
            <div className="postal-code mb-[15px]">
                <label className={`${'postalCode' in error ? 'text-[red]':'opacity-50'}`}>Postal Code<span className='text-[red]'>*</span></label>
                <input 
                    name="postalCode" 
                    value={billingInfo.postalCode} 
                    onChange={handleBillingChange} 
                    className={`rounded-none ${'postalCode' in error ? '!border-[red]' :''}`}
                />
            </div>
            {
                billingInfo?.country === 'Saudi Arabia' && (
                    <div className='trn-code mb-[15px]'>
                    <label className={`${'vat_registered' in error ? 'text-[red]':'opacity-50'}`}>Tax Treatment<span className='text-[red]'>*</span></label>
                     <select className={`w-[100%] py-[5px] px-2 !rounded-none border-[1px] outline-none  ${'vat_registered' in error ? '!border-[red]' :'border-black border-solid'} `} name='vat_registered' onChange={handleBillingChange}>
                        <option value={null} disabled selected></option>
                         <option value={'vat'}>VAT Registered</option>
                         <option value={'non_vat'}>Non-VAT Registered</option>
                     </select>
                 </div>
                )
            }
           
            {
                tax && (
                    <div className="trn-code mb-[15px]">
                    <label className={`${'vat_registered' in error ? 'text-[red]':'opacity-50'}`}>TRN Number<span className='text-[red]'>*</span></label>
                    <input 
                    name="trn" 
                    value={billingInfo.trn} 
                    onChange={handleBillingChange} 
                    className={`rounded-none w-[100%] ${'trn' in error ? '!border-[red]' :''}`}
                />
                 </div> 
                )
            }
            <div className="promo-code mb-[15px]">
                <label className={`${'promoCode' in error ? 'text-[red]':'opacity-50'}`}>Promo Code</label>
                <input 
                    name="promoCode" 
                    value={billingInfo.promoCode} 
                    onChange={handlePromoChange} 
                    className={`rounded-none ${'promoCode' in error ? '!border-[red]' :''}`}
                />
            </div>
            <button className="payment uppercase">{paymentLoading ? 
            <ClipLoader
                color={'#FFFFFF'}
                loading={paymentLoading}
                size={25}
            /> : 'Make Payment'}</button>
            <p className='text-[red] !text-[18px] !font-[400] !mt-2'>{Object.values(error).map(item =>{
                return item
            })}</p>
        </form>
                </div>
            </div>
            <Footer isLang={lang}/>
            {
                openPopup &&
                <Popup
                    openpopup={openPopup}
                    isCancel={true}
                    setPopup={setOpenPopup}
                    title={'Your Cart was empty'}
                    // subTitle={'Are you sure, you want to empty the cart.'}
                    onClick={()=>navigate('/')}
                    save={'Continue to Homepage'}
                    // cancel={'Cancel'}
                />
           }
        </div>

        }
        </>

        
    )
}



