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
 
import DeleteIcon from '../../Images/BundlDetail/deleteicon.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import { base_url } from '../Auth/BackendAPIUrl';
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { ConfigToken } from '../Auth/ConfigToken'
 
export const MyCart = () => {
 
    const location = useLocation();
    const navigate = useNavigate();
    const [cartDetails, setCartDetails] = useState([]);
    const [openPopup , setOpenPopup] = useState(false);
    const [removedItems,setRemovedItems] = useState([])
    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        postalCode: '',
        promoCode: '',
    });
 
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
   
 
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const formData = {...billingInfo,
                user_name : billingInfo.firstName+' ' + billingInfo.lastName,
                phone :billingInfo.phoneNumber,
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
    };
 
    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };
 
 
    return (
        <div>
            <Navbar />
            <div className='mycart'>
                <div className='cart'>
                    <p>Your Cart - {cartDetails?.bundl_english}</p>
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
                        <div className='total ' style={{ display: 'flex' }}>
                            <p style={{ width: '50%' }}>Price:</p>
                            <p style={{ width: '50%' }}>{Math.round(cartDetails.total_amount)} sar</p>
                        </div>
                        <div className='total' style={{ display: 'flex' }}>
                            <p style={{ width: '53%' }}>VAT:</p>
                            <p style={{ width: '40%' }}>{Math.round(cartDetails.tax)} sar</p>
                        </div>
                        <div>
                            <div style={{ display: 'flex'}}>
                                <p style={{ width: '50%' }}><img src={BlackDollor} className='inline-block'></img>Total Price</p>
                                <p style={{ width: '40%' }}>{Math.round(cartDetails.grand_total)} sar</p>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ width: '55%' }}><img src={BlackTime} className='inline-block'></img>Total Duration</p>
                                <p style={{ width: '45%' }}>{Math.round(cartDetails.total_time)} Days</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='billing'>
                    <p>Billing Address</p>
                    <form onSubmit={handlePayment}>
                        <div className="user-name">
                            <div>
                                <label>First Name</label>
                                <input name="firstName" value={billingInfo.firstName} onChange={handleBillingChange} />
                            </div>
                            <div style={{ margin: '0% 0 0 2%' }}>
                                <label>Last Name</label>
                                <input name="lastName" value={billingInfo.lastName} onChange={handleBillingChange} />
                            </div>
                        </div>
                        <div className="email">
                            <label>Email</label>
                            <input name="email" value={billingInfo.email} onChange={handleBillingChange} />
                        </div>
                        <div className="phonenumber">
                            <label>Phone Number</label>
                            <input name="phoneNumber" value={billingInfo.phoneNumber} onChange={handleBillingChange} />
                        </div>
                        <div className="country">
                            <div>
                                <label>Country</label>
                                <input name="country" value={billingInfo.country} onChange={handleBillingChange} />
                            </div>
                            <div style={{ margin: '0% 0 0 2%' }}>
                                <label>City</label>
                                <input name="city" value={billingInfo.city} onChange={handleBillingChange} />
                            </div>
                        </div>
                        <div className="postal-code">
                            <label>Postal Code</label>
                            <input name="postalCode" value={billingInfo.postalCode} onChange={handleBillingChange} />
                        </div>
                        <div className="promo-code">
                            <label>Promo Code</label>
                            <input name="promoCode" value={billingInfo.promoCode} onChange={handleBillingChange} />
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



