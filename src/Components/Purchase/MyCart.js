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

 
export const MyCart = () => {
 
    const location = useLocation();
    const navigate = useNavigate();
    const [cartDetails, setCartDetails] = useState([]);
    const [openPopup , setOpenPopup] = useState(false);
    const [removedItems,setRemovedItems] = useState([])
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
    const [errors, setErrors] = useState({});
    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0 });
        getCartData();
    }, []);
 
    const getCartData = async () => {
        // const response = await axios.get(`${base_url}/api/order/${location.state.orderData.id}/`);
        const response = await axios.get(`${base_url}/api/order/cart/`,ConfigToken());
        if(response.data){
            setCartDetails(response.data);
        }
        if(response.status === 206){
           setOpenPopup(true)
        }
    };
 
    const removeItem = (itemId, itemType) => {
        setCartDetails((prevCartDetails) => {
            const updatedItemDetails = { ...prevCartDetails.item_details };
            let updatedTotalAmount = prevCartDetails.total_amount;
            setRemovedItems(itemId)
            // Handle removal based on item type
            if (itemType === 'bundle') {
                const removedItem = updatedItemDetails.bundle_items.find(item => item.id === itemId);
                updatedTotalAmount -= removedItem?.unit_price * removedItem?.qty || 0;
                updatedItemDetails.bundle_items = updatedItemDetails.bundle_items.filter(item => item.id !== itemId);
            } else if (itemType === 'addon') {
                const removedItem = updatedItemDetails.addon_items.find(item => item.id === itemId);
                updatedTotalAmount -= removedItem?.unit_price * removedItem?.qty || 0;
                updatedItemDetails.addon_items = updatedItemDetails.addon_items.filter(item => item.id !== itemId);
            }
   
            // Recalculate the totals
            const updatedTax = updatedTotalAmount * 0.15; // Assuming VAT is 15%
            const updatedGrandTotal = updatedTotalAmount + updatedTax;
   
            return {
                ...prevCartDetails,
                item_details: updatedItemDetails,
                total_amount: updatedTotalAmount,
                tax: updatedTax,
                grand_total: updatedGrandTotal,
            };
        });
    };
   
    const validateFields = () => {
        const newErrors = {};

        if (!billingInfo.firstName.trim()) newErrors.firstName = 'required field';
        if (!billingInfo.lastName.trim()) newErrors.lastName = 'required field' ;

        if (!billingInfo.email.trim()) {
            newErrors.email = 'required field';
        } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(billingInfo.email)) {
            newErrors.email = 'Invalid email format';
        }
        console.log(billingInfo.phone)
        if(!billingInfo.phone.trim()){
            newErrors.phone = 'required field'
        }

        if (!billingInfo.country.trim()) newErrors.country = 'required field';
        if (!billingInfo.city.trim()) newErrors.city = 'required field';

        if (!billingInfo.postalCode.trim()) {
            newErrors.postalCode = 'required field';
        } else if (!/^[0-9]{5,6}$/.test(billingInfo.postalCode)) {
            newErrors.postalCode = 'code must be 5 or 6 digits';
        }

        // if (!billingInfo.promoCode.trim()) newErrors.promoCode = 'Promo code is required';

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };
    console.log(phoneError)

 
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
    const handlePhone = (e) =>{
        setBillingInfo({ ...billingInfo, phone: e });
    }
 
 
    return (
        <div>
            <Navbar />
            <div className='mycart mb-[12vh]'>
                <div className='cart'>
                    <p>Your Cart</p>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartDetails?.item_details?.bundle_items?.map((row) => (
                                    <TableRow
                                        key={row.item_name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell scope="row">
                                            {row.item_name}
                                        </TableCell>
                                        <TableCell align="center">{row.qty}</TableCell>
                                        <TableCell align="center">{row.unit_price}</TableCell>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <TableCell align="center">
                                            <p className='flex items-center justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'bundle')}/></p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {cartDetails?.item_details?.addon_items?.map((row) => (
                                    <TableRow
                                        key={row.item_name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell scope="row">
                                            {row.item_name}
                                        </TableCell>
                                        <TableCell align="center">{row.qty}</TableCell>
                                        <TableCell align="center">{row.unit_price}</TableCell>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <TableCell align="center">
                                            {/* <img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/> */}
                                            <p className='flex items-center justify-center'><img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/></p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='cart-total-container '>
                        <div className='total justify-between pl-10  mr-4' style={{ display: 'flex' }}>
                            <p  className='!text-[20px]' style={{ width: '50%' }}>Price:</p>
                            <p  className='!text-[20px]  text-right' style={{ width: '50%' }}>{Math.round(cartDetails.total_amount)} sar</p>
                        </div>
                        <div className='total justify-between pl-10 mr-4' style={{ display: 'flex' }}>
                            <p  className='!text-[20px]' style={{ width: '53%' }}>VAT:</p>
                            <p  className='!text-[20px]  text-right' style={{ width: '40%' }}>{Math.round(cartDetails.tax)} sar</p>
                        </div>
                        <div>
                            <div  className='justify-between mr-4'  style={{ display: 'flex'}}>
                                <p className='!text-[20px] ml-[6px]' style={{ width: '50%' }}><img src={BlackDollor} className='inline-block mr-3 ml-[6px]'></img>Total Price :</p>
                                <p className='!text-[20px] text-right' style={{ width: '40%' }}>{isNaN(Math.round(cartDetails.grand_total))?0:Math.round(cartDetails.grand_total)} sar</p>
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
                    <label className='text-[#5f5f5f]'>First Name <span className='text-[red]'>*</span></label>
                    <input 
                        name="firstName" 
                        value={billingInfo.firstName} 
                        onChange={handleBillingChange} 
                    />
                    {errors.firstName && <p className="!text-[16px] !font-normal  text-[red] error-message">{errors.firstName}</p>}
                </div>
                <div className='ml-[4%]' style={{ margin: '0% 0 0 2%' }}>
                    <label className='text-[#5f5f5f]'>Last Name <span className='text-[red]'>*</span></label>
                    <input 
                        name="lastName" 
                        value={billingInfo.lastName} 
                        onChange={handleBillingChange} 
                    />
                    {errors.lastName && <p className="!text-[16px] !font-normal  text-[red] error-message">{errors.lastName}</p>}
                </div>
            </div>
            <div className="email mb-[15px]">
                <label className='text-[#5f5f5f]'>Email <span className='text-[red]'>*</span></label>
                <input 
                    name="email" 
                    value={billingInfo.email} 
                    onChange={handleBillingChange} 
                />
                {errors.email && <p className="!text-[16px] !font-normal  text-[red] error-message">{errors.email}</p>}
            </div>
            <div className="phonenumber mb-[15px]">
                <label className='text-[#5f5f5f]'>Phone Number <span className='text-[red]'>*</span></label>
                <PhoneNumberInput
        name="phone"
        placeholder="Enter phone number"
        value={billingInfo.phone}
        status={setBillingInfo}
        borderColor={'#000000'}
        setPhoneError={setPhoneError}
        setErrors = {setErrors}
        formErrors = {errors}
        className="w-full  text-[18px]  "
      />
                {errors.phone && <p className="!text-[16px] !font-normal  text-[red] error-message">{errors.phone}</p>}
            </div>
            <div className="country mb-[15px]">
                <div className='mr-[4%]'>
                    <label className='text-[#5f5f5f]'>Country <span className='text-[red]'>*</span></label>
                    <input 
                        name="country" 
                        value={billingInfo.country} 
                        onChange={handleBillingChange} 
                    />
                    {errors.country && <p className="!text-[16px] !font-normal  text-[red] error-message">{errors.country}</p>}
                </div>
                <div className='mr-[4%]' style={{ margin: '0% 0 0 2%' }}>
                    <label className='text-[#5f5f5f]'>City<span className='text-[red]'>*</span></label>
                    <input 
                        name="city" 
                        value={billingInfo.city} 
                        onChange={handleBillingChange} 
                    />
                    {errors.city && <p className="!text-[16px] !font-normal  text-[red] error-message">{errors.city}</p>}
                </div>
            </div>
            <div className="postal-code mb-[15px]">
                <label className='text-[#5f5f5f]'>Postal Code<span className='text-[red]'>*</span></label>
                <input 
                    name="postalCode" 
                    value={billingInfo.postalCode} 
                    onChange={handleBillingChange} 
                />
                {errors.postalCode && <p className="!text-[16px] !font-normal  text-[red] error-message">{errors.postalCode}</p>}
            </div>
            <div className="promo-code mb-[15px]">
                <label className='text-[#5f5f5f]'>Promo Code</label>
                <input 
                    name="promoCode" 
                    value={billingInfo.promoCode} 
                    onChange={handleBillingChange} 
                />
                {errors.promoCode && <p className="!text-[16px] !font-normal  text-[red] error-message">{errors.promoCode}</p>}
            </div>
            <button className="payment">Make Payment</button>
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



