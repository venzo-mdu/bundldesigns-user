import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Purchase/MyCart.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Popup } from '../Common/Popup/Popup'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify'
import DeleteIcon from '../../Images/BundlDetail/deleteicon.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import { base_url } from '../Auth/BackendAPIUrl';
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { ConfigToken } from '../Auth/ConfigToken'
import PhoneNumberInput from '../Pages/PhoneNumberInput';
import backIcon from "../../Images/backIcon.svg"

 
export const MyCart = () => {
 
    const location = useLocation();
    const navigate = useNavigate();
    const [cartDetails, setCartDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [openPopup , setOpenPopup] = useState(false);
    const [removedItems,setRemovedItems] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth < 440);
    const [phoneError,setPhoneError] = useState(false)
    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        postalCode: '',
        promoCode: '',
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
            // const response = await axios.get(`${base_url}/api/order/${location.state.orderData.id}/`);
            const response = await axios.get(`${base_url}/api/order/cart/`,ConfigToken());
            if(response.data){
                setCartDetails(response.data);
            }
            if(response.status === 206){
               setOpenPopup(true)
            }
        }
        catch(e){
            navigate("/login");
        }  
    };
 
    const removeItem = async (itemId, itemType) => {
        if(itemType=='bundle'){
               toast.error(`Package Item Connot removed`, {
                    position: toast?.POSITION?.TOP_RIGHT,
                  });
                  return;
        }
        let cartDetailsTemp = cartDetails
        const updatedItemDetails = { ...cartDetailsTemp.item_details };
            let updatedTotalAmount = cartDetailsTemp.total_amount;
            let updatedTotalTime = cartDetailsTemp.total_time
            setRemovedItems(itemId)
            // Handle removal based on item type
                const removedItem = updatedItemDetails.addon_items.find(item => item.id === itemId);
                updatedTotalAmount -= removedItem?.unit_price * removedItem?.qty || 0;
                updatedTotalTime -= removedItem?.unit_time * removedItem?.qty ||0
                updatedItemDetails.addon_items = updatedItemDetails.addon_items.filter(item => item.id !== itemId);

            // Recalculate the totals
            const updatedTax = updatedTotalAmount * 0.15; // Assuming VAT is 15%
            const updatedGrandTotal = updatedTotalAmount + updatedTax;
            const response = await axios.patch(`${base_url}/api/order/cart/`,{'item_to_delete':itemId,'total_amount':updatedTotalAmount,
                tax:updatedTax,'grand_total':updatedGrandTotal},ConfigToken());

                setCartDetails((prevCartDetails) => ({
                    ...prevCartDetails,
                    item_details: updatedItemDetails,
                    total_amount: updatedTotalAmount,
                    total_time: updatedTotalTime,
                    tax: updatedTax,
                    grand_total: updatedGrandTotal,
                }));

    };
   
    const validateFields = () => {
        let newErrors = {};

        if (!billingInfo.firstName.trim()) {setError({firstName:'Your first name field is empty.'})
    return false
    }
        if (!billingInfo.lastName.trim()){ setError({lastName:'Your last name field is empty.'})
    return false
    };

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

        if (!billingInfo.postalCode.trim()) {
            setError({postalCode:'Your postal code field is empty.'})
            return false
        } else if (!/^[0-9]{5,6}$/.test(billingInfo.postalCode)) {
            setError({postalCode:'Your postal code must be 5 or 6 digits.'})
            return false
        }

        // if (!billingInfo.promoCode.trim()) newErrors.promoCode = 'Promo code is required';
        setError(newErrors);

        // Return true if there are no errors
        return true;
    };

 
    const handlePayment = async (e) => {
        e.preventDefault();
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
                        items_to_delete:removedItems
                    }
                    const response = await axios.put(`${base_url}/api/order/cart/?initiate=True`, formData,ConfigToken());
                    if(response.data){
                       window.location.href = response.data.data.redirect_url
                    }
                    // navigate('/dashboard', { state: { reDirect: true} });
                    console.log("Payment successful:", response.data);
                } catch (error) {
                    console.error("Payment error:", error);
                }
            }
    }
    };
 
    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
        delete errors[name] 
        setErrors(errors)
    };
    useEffect(() => {
        const handlePopState = (event) => {
          event.preventDefault();
          setShowModal(true); // Show modal when browser back button is clicked
        };
    
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);
    
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);
    const handleBackClick = () => {
        setShowModal(true);
      };
    
      const confirmNavigation = () => {
        setShowModal(false);
        navigate(-1); // Navigate to the previous page
      };
    
      const cancelNavigation = () => {
        setShowModal(false);
      };
    return (
        <div>
            <ToastContainer />
            <Navbar />
            {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <p className="text-lg font-medium text-gray-900">
            Your customized package will be reset.
            Are you sure you want to go back?
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={confirmNavigation}
                className="px-4 py-2 bg-[#0BA6C4] text-white rounded "
              >
                Yes
              </button>
              <button
                onClick={cancelNavigation}
                className="px-4 py-2 bg-grey  text-white rounded hover:bg-grey"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
            <div className='mycart '>
                <div className='cart !xs:border-none  sm:!pb-[170px] !pb-[170px] xs:!pb-[20px]'>
            <p onClick={()=>handleBackClick()} className='flex cursor-pointer text-[18px] items-center text-black'> <img src={backIcon} className='mr-2' ></img> Back to Bundl </p>
                    <p className='!xs:text-[16px] !sm:text-[20px]'>Your Cart</p>
                    {isMobile ? <>
                        {cartDetails?.item_details?.bundle_items?.map((row,index) => (
                            <div className='flex justify-between border-b pb-2 !border-black'> 
                            <div>
                            <div className='font-[700] text-[20px]'>{row.qty} x {row.item_name}</div>
                            <div className='font-[500] ml-8'> {row.unit_price} SAR</div>
                            </div>
                            <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'bundle')}/></p>
                             </div>
                        ))}
                    </>:<table className='w-full border-none' aria-label="simple table">
                            <thead>
                                <tr className='!text-left text-[20px]'>
                                    <td className= 'text-left w-[20%] text-[#00000080] pb-3' >Item</td>
                                    <td className='text-[#00000080] w-[30%] pb-3'  align="center">Quantity</td>
                                    <td className='text-[#00000080] w-[30%]    pb-3' align="center">Price</td>
                                    <td className='text-[#00000080] w-[20%]    pb-3'  align="center">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cartDetails?.item_details?.bundle_items?.map((row,index) => (
                                    <tr
                                        key={row.item_name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className={`text-[#000] font-[700] text-[20px] ${index == (cartDetails?.item_details?.bundle_items.length-1) && cartDetails?.item_details?.addon_items.length ==0? '':'border-b border-black'} mb-2 `}
                                    >
                                        <td className='text-left !py-2' scope="row">
                                            {row.item_name}
                                        </td>
                                        <td className=' !py-2' align="center">{row.qty}</td>
                                        <td className=' !py-2' align="center">{row.unit_price}</td>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <td className=' !py-2' align="center">
                                            <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'bundle')}/></p>
                                        </td>
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
                                        <td className=' !py-2' align="center">{row.qty}</td>
                                        <td className=' !py-2' align="center">{row.unit_price}</td>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <td align="center">
                                            {/* <img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/> */}
                                            <p className='flex items-center !mb-0 justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/></p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                        
                    <div className='cart-total-container '>
                        <div className='total justify-between sm:pl-10 xs:pl-1 mr-4' style={{ display: 'flex' }}>
                            <p  className='!text-[20px] xs:mb-0 sm:mb-auto' style={{ width: '50%' }}>Price:</p>
                            <p  className='!text-[20px] xs:mb-0 sm:mb-auto text-right' style={{ width: '50%' }}>{Math.round(cartDetails.total_amount)} sar</p>
                        </div>
                        <div className='total justify-between sm:pl-10 xs:pl-1 mr-4' style={{ display: 'flex' }}>
                            <p  className='!text-[20px]' style={{ width: '53%' }}>VAT:</p>
                            <p  className='!text-[20px]  text-right' style={{ width: '40%' }}>{Math.round(cartDetails.tax)} sar</p>
                        </div>
                        <div>
                            <div  className='justify-between mr-4'  style={{ display: 'flex'}}>
                                <p className='!text-[20px] xs:mb-0 sm:mb-auto ml-[6px]' style={{ width: '50%' }}><img src={BlackDollor} className='inline-block ml-[0px] mr-[18px]'></img>Total Price :</p>
                                <p className='!text-[20px] xs:mb-0 sm:mb-auto text-right' style={{ width: '40%' }}>{isNaN(Math.round(cartDetails.grand_total))?0:Math.round(cartDetails.grand_total)} sar</p>
                            </div>
                            <div  className='justify-between mr-4' style={{ display: 'flex' }}>
                                <p className='!text-[20px]' style={{ width: '66%' }}><img src={BlackTime} className='inline-block mr-3'></img>Total Duration :</p>
                                <p className='!text-[20px]  text-right' style={{ width: '45%' }}>{isNaN(Math.round(cartDetails.total_time))?0 :Math.round(cartDetails.total_time)} Days</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='billing'>
                    <p>Billing Address</p>
                    <form onSubmit={handlePayment} noValidate>
            <div className="user-name mb-[15px]">
                <div className='mr-[4%]'>
                    <label className={`${'firstName' in error && 'text-[red]'}`}>First Name <span className='text-[red]'>*</span></label>
                    <input 
                        name="firstName" 
                        value={billingInfo.firstName} 
                        onChange={handleBillingChange} 
                        className={`${'firstName' in error ? '!border-[red]' :''}`}
                    />
                </div>
                <div className='ml-[4%]' style={{ margin: '0% 0 0 2%' }}>
                    <label  className={`${'lastName' in error && 'text-[red]'}`}>Last Name <span className='text-[red]'>*</span></label>
                    <input 
                        name="lastName" 
                        value={billingInfo.lastName} 
                        onChange={handleBillingChange} 
                        className={`${'lastName' in error ? '!border-[red]' :''}`}
                    />
                </div>
            </div>
            <div className="email mb-[15px]">
                <label  className={`${'email' in error && 'text-[red]'}`}>Email <span className='text-[red]'>*</span></label>
                <input 

                    name="email" 
                    value={billingInfo.email} 
                    onChange={handleBillingChange} 
                    className={`${'email' in error ? '!border-[red]' :''}`}
                />
            </div>
            <div className="phonenumber mb-[15px]">
                <label className={`${'phone' in error && 'text-[red]'}`}>Phone Number <span className='text-[red]'>*</span></label>
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
        className="w-full  text-[18px]  "
      />
            </div>
            <div className="country mb-[15px]">
                <div className='mr-[4%]'>
                    <label className={`${'country' in error && 'text-[red]'}`}>Country <span className='text-[red]'>*</span></label>
                    <input 
                        name="country" 
                        value={billingInfo.country} 
                        onChange={handleBillingChange} 
                        className={`${'country' in error ? '!border-[red]' :''}`}
                    />
                </div>
                <div className='mr-[4%]' style={{ margin: '0% 0 0 2%' }}>
                    <label className={`${'city' in error && 'text-[red]'}`}>City<span className='text-[red]'>*</span></label>
                    <input 
                        name="city" 
                        value={billingInfo.city} 
                        onChange={handleBillingChange} 
                        className={`${'city' in error ? '!border-[red]' :''}`}
                    />
                </div>
            </div>
            <div className="postal-code mb-[15px]">
                <label className={`${'postalCode' in error && 'text-[red]'}`}>Postal Code<span className='text-[red]'>*</span></label>
                <input 
                    name="postalCode" 
                    value={billingInfo.postalCode} 
                    onChange={handleBillingChange} 
                    className={`${'postalCode' in error ? '!border-[red]' :''}`}
                />
            </div>
            <div className="promo-code mb-[15px]">
                <label className={`${'promoCode' in error && 'text-[red]'}`}>Promo Code</label>
                <input 
                    name="promoCode" 
                    value={billingInfo.promoCode} 
                    onChange={handleBillingChange} 
                    className={`${'promoCode' in error ? '!border-[red]' :''}`}
                />
            </div>
            <button className="payment">Make Payment</button>
            <p className='text-[red] !text-[20px] !font-[400] !mt-2'>{Object.values(error).map(item =>{
                return item
            })}</p>
        </form>
                </div>
            </div>
            <Footer />
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
        
    )
}



