import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ConfigToken } from '../Auth/ConfigToken'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dollorIcon from '../../Images/dollorIconGreen.svg'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import uploadIcon from "../../Images/uploadIcon.svg"
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import downArrow from '../../Images/down-arrow.svg'
import upArrow from '../../Images/up-arrow.svg'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '../../Images/editIcon.svg'
import { Popup } from '../Common/Popup/Popup';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '../../Images/BundlDetail/deleteicon.svg'

export default function Adjustments() {
    const { orderId } = useParams();
    const [page,setPage] = useState('adjustment')
    const [openPopup, setOpenPopup] = useState(false)
    const [order,setOrder] = useState()
    const [adjustments, setAdjustments] = useState([])
    const [adjustmenTab, setAdjustmentTab] = useState(0)
    const [expantedTabs, setExpantedTabs] = useState([])
    const [designListTab, setDesignListTab] = useState('Branding')
    const [bundlAddons, setBundlAddons] = useState([]);
    const [itemsList,setItemList] = useState({})
    const [totalPrice,setTotalPrice] = useState(0)
    const [totalTime,setTotalTime] = useState(0)
    const [adjustmentData,setAdjustmentsData] = useState({})
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
        getOrderDetails()
        getBundlData()
    }, [])

    
    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    const toggleDescription = (id) => {
        setExpantedTabs((prevState) => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the state for the clicked vacancy
        }));
    };



    const getOrderDetails = async () => {
        console.log(orderId, 'order')
        const response = await axios.get(`${base_url}api/order/${orderId}/`, ConfigToken());
        if (response.data) {
            setOrder(response.data.data);
            console.log(response.data.data)
            getAdjustments(response.data.data.brand_identity.item__id)
        }
    }
    const getAdjustments = async (designId) => {
        const response = await axios.get(`${base_url}api/adjustments/${designId}/`, ConfigToken());
        if (response.data) {
            setAdjustments(response.data.data)
            response.data.data.length && setAdjustmentTab(response.data.data[0].english_adjustment_name)
        }
    }

    console.log(bundlAddons, 'bundl')

    const getBundlData = async () => {
        const response = await axios.get(`${base_url}/api/package/`, ConfigToken());
        setBundlAddons(response.data.designs_details);
        setDesignListTab(Object.keys(response.data.designs_details)[0])
    }


    console.log(adjustmentData,'adjusrrrr')
    

    const remove_item = (id) => {
        if (itemsList[id]) {
            itemsList[id].qty -= 1;
            if (itemsList[id].qty <= 0) {
                delete itemsList[id]; // Remove item completely if quantity is zero
            }
            const { price: total_price, time: total_time } = calculateTotals(itemsList);
            setTotalPrice(total_price);
            setTotalTime(total_time);
        }
    }
    const calculateTotals = (items, adjustments) => {
        return {
            price: Object.values(items).reduce((acc, item) => acc + item.price * item.qty, 0) +
                   Object.values(adjustments).reduce((acc, item) => acc + parseFloat(item.price || 0), 0),
            time: Object.values(items).reduce((acc, item) => acc + item.time * item.qty, 0) +
                  Object.values(adjustments).reduce((acc, item) => acc + parseFloat(item.time_limit || 0), 0),
        };
    };
    
    const updateTotals = (items, adjustments) => {
        const { price, time } = calculateTotals(items, adjustments);
        setTotalPrice(price);
        setTotalTime(time);
    };
    
    const addData = (id, index) => {
        const elementValue = document.getElementById(`${id}_content`).value;
        setAdjustmentsData(prev => {
            const updatedData = {
                ...prev,
                [id]: {
                    ...prev[id],
                    textbox: elementValue,
                    ...(prev[id] ? {} : adjustments[index]),
                },
            };
            updateTotals(itemsList, updatedData);
            return updatedData;
        });
    };
    
    const addItem = (index, key, id) => {
        setItemList(prev => {
            const updatedList = {
                ...prev,
                [id]: prev[id]
                    ? { ...prev[id], qty: prev[id].qty + 1 }
                    : { ...bundlAddons[key].design_list[index], qty: 1 },
            };
            updateTotals(updatedList, adjustmentData);
            return updatedList;
        });
    };
    const CheckCart = async (id) => {
        setPage('cart')
    }

    const removeItem= (id,type) =>{
        if(type == 'adjustment'){
            delete adjustmentData[id]
        }else{
            delete itemsList[id]
        }
        updateTotals(itemsList, adjustmentData);
    }

    const createAdjustmentOrder = async() =>{
        const formData = {item_list : itemsList,adjustmentList:adjustmentData,total_price:totalPrice,total_time:totalTime}
        const res = await axios.post(`${base_url}api/adjustment_create/${orderId}/`,formData,ConfigToken)()
        if (res){
            window.location.href = '/dashboard'
        }
    }
    return (
        <>
            <Navbar />

            {page == 'adjustment'?
                <>
                            {
                openPopup && <Popup
                    openpopup={openPopup}
                    isCancel={false}
                    setPopup={setOpenPopup}
                    title={'empty your Cart'}
                    // subTitle={'Are you sure, you want to empty the cart.'}
                    onClick={() => createAdjustmentOrder()}
                    save={'Yes'}
                    cancel={'Cancel'}
                />
            }
            <div className='font-Helvetica p-2 flex'>
                <div className='basis-3/4 px-8 py-4 border-r'>
                    <p className='flex text-[18px] items-center pb-2 text-black' onClick={() => { window.location.href = '/dashboard' }}> <ArrowBackIcon style={{ width: '25px', marginRight: '10px' }} /> Back to dashboard </p>
                    <div className='pl-14'>
                        <h1 className='lg:text-[40px] md:text-[32px]'> Adjustments </h1>
                        <p className='lg:text-[20px] mb-2 md:text-[16px] text-[#00000080]'> Here you can edit your brand and add items to your bundl! </p>
                        <p className='lg:text-[32px] font-bold md:text-[24px]'>What would you like to edit ?</p>
                        <div className=''>
                            {adjustments.map((adjustment, index) => {
                                return <button className={`lg:px-[20px] md:px-[10px] md:py-[3px] md:text-[16px] lg:py-[5px]  ${adjustmenTab == adjustment.english_adjustment_name ? 'text-white bg-[#1BA56F] ' : 'text-[#1BA56F] bg-white '} border-r border-t border-b
                           ${index == 0 && 'border-l'} ${index == adjustments.length && 'border-l-0 border-r'}
                   !border-[#1BA56F]`}
                                    onClick={() => setAdjustmentTab(adjustment.english_adjustment_name)}>{adjustment.english_adjustment_name}</button>
                            })}
                            {adjustments.map((adjustment,index) => {
                                if (adjustment.english_adjustment_name == adjustmenTab) {
                                    return <div className='my-6'>
                                        <div className='flex justify-between my-1'> <span className='font-bold'>{adjustment.english_adjustment_name}</span>
                                            <p className='flex items-center  text-center text-[#1BA56F]'>
                                                <span className='flex items-center mr-10'><img className='mr-2' src={dollorIcon}></img> {adjustment.price} SAR  </span>
                                                <span> <AccessTimeIcon /> {adjustment.time_limit} Days </span>
                                            </p>
                                        </div>
                                        <p className='font-medium text-[18px]'>What would you like to change?</p>
                                        <p ><input id={`${adjustment.id}_content`} placeholder='Tell us your thoughts...' className='border px-2 py-1 border-[#000000A0]  w-[80%]'></input><button onClick={()=>addData(adjustment.id,index)} className='w-[20%] py-1 bg-[#1BA56F] text-white '>Submit Edit</button></p>
                                        <p className='font-medium text-[18px]'>Have something to show us?</p>
                                        <p
                                            className="border-b-2 w-[150px] !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer"
                                            onClick={() => document.getElementById(`file-${adjustment.id}`).click()} // Trigger click on hidden input
                                        >
                                            <input
                                                type="file"
                                                hidden
                                                name="file"
                                                id={`file-${adjustment.id}`} // Use a unique ID for each input
                                            // onChange={(e) => uploadFile(e, adjustment.id, 'file')}
                                            />
                                            <img src={uploadIcon} alt="Upload Icon" />
                                            Upload Content
                                        </p>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='mt-16'>
                            <h2 className='text-[32px]'>Something feels missing ?</h2>
                            <p className='text-[18px] text-[#00000080]'>Add anything you want to your bundl to fit your brand!</p>
                            <div className=''>  {Object.keys(bundlAddons).map((category, index) => {
                                return <a href={`#${category.replaceAll(' ', '_')}_list`} className={`lg:px-[20px] md:px-[10px] md:py-[3px] md:text-[16px] lg:py-[5px]  ${designListTab == category ? 'text-white bg-[#1BA56F] ' : 'text-[#1BA56F] bg-white '} border-r border-t border-b
                           ${index == 0 && 'border-l'} ${index == Object.keys(bundlAddons).length && 'border-l-0 border-r'}
                   !border-[#1BA56F]`}
                                    onClick={() => setDesignListTab(category)}>{category}</a>
                            })}</div>

                            <div className='mt-10'>
                                {Object.keys(bundlAddons).map((category, index) => {
                                    return <div className='' id={`${category.replaceAll(' ', '_')}_list`}>
                                        <p className={`flex justify-between font-semibold text-[18px] pb-2  ${expantedTabs[category] ? '' : 'border-b'} border-[#00000080]`}> {category}      <button
                                            onClick={() => toggleDescription(category)}
                                            className="text-blue-500 cursor-pointer"
                                        >
                                            <img className='w-10' src={expantedTabs[category] ? upArrow : downArrow}></img>
                                        </button></p>
                                        {expantedTabs[category] && <div className='my-3'>
                                            {category in bundlAddons && bundlAddons[category].design_list.map((item,index) => {
                                                return <div id={`${item.id}_design_list`} className='flex  justify-between font-semibold text-[18px] py-2 border-b !border-[#1BA56F]'>
                                                    <span className='font-semibold basis-[40%] text-[#1BA56F]'>{item.name_english}</span>
                                                    <p className='flex mb-0 basis-[40%]'>
                                                        <span className='flex items-center mr-2'><img src={BlackDollor}></img> {item.price} SAR </span>
                                                        <span className='flex'><AccessTimeIcon style={{ marginRight: '5px' }} /> {item.time} Days</span>
                                                    </p>
                                                    <p className='mb-0 basis-[10%] flex items-center text-[#1BA56F] border !border-[#1BA56F]'>
                                                        <button onClick={()=>remove_item(item.id)} className='border-r !border-[#1BA56F] flex items-center'><RemoveIcon /></button>
                                                        <span className='border-r px-2 !border-[#1BA56F]'> {item.id in itemsList ?itemsList[item.id]['qty']: 0}</span>
                                                        <button onClick={()=>addItem(index,category,item.id)} className='flex items-center'><AddIcon /></button>
                                                    </p>
                                                </div>
                                            })}
                                        </div>}

                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='basis-1/4 px-3 py-2'>
              <p className='text-[18px] font-semibold'>Summary of Edits</p>
            
            <div className='my-2'>
                {Object.values(itemsList).map(item=>{
                    return <div className='flex items-start'>
                        <p className='mb-0 flex items-center'> <img src={EditIcon}></img> <ClearIcon /></p>
                       <div className=''>
                        <p className='font-bold'> {item.name_english}</p>
                       <div className='flex text-[#1BA56F]'> 
                        <p className='flex'>
                        <AccessTimeIcon style={{marginRight:'2px'}}/> 
                        <span>{item.time * item.qty} Days</span>  
                        </p>
                        <p className='flex'>
                        <img src={dollorIcon}></img>
                        <span>{item.price * item.qty} SAR</span>  
                        </p>
                        </div>
                       </div> 

                    </div>
                })}
                {Object.values(adjustmentData).map(item=>{
                    return <div className='flex items-start'>
                        <p className='mb-0 flex items-center'> <img src={EditIcon}></img> <ClearIcon /></p>
                       <div className=''>
                        <p className='font-bold'> {item.english_adjustment_name}</p>
                       <div className='flex text-[#1BA56F]'> 
                        <p className='flex'>
                        <AccessTimeIcon style={{marginRight:'2px'}}/> 
                        <span>{item.time_limit} Days</span>  
                        </p>
                        <p className='flex'>
                        <img src={dollorIcon}></img>
                        <span>{item.price} SAR</span>  
                        </p>
                        </div>
                       </div> 

                    </div>
                })}
            </div>
       
            <div className='bundl-checkout'>
              <div className=' flex items-center mb-1' >
                <img src={BlackDollor} className='mr-2' alt="Total Price" />
                <p className='basis-3/5 font-bold text-[18px] mb-0'>Total Price</p>
                <p className='basis-2/5 font-bold text-[18px]  mb-0'>{totalPrice } SAR</p>
              </div>
              <div className=' flex'>
              <img className='mr-2' src={BlackTime} alt="Total Duration" />
                <p className='basis-3/5 text-[18px] mb-0'>Total Duration</p>
                <p className='basis-2/5 text-[18px] mb-0'>{totalTime} Days</p>
              </div>

              <div >
                <button onClick={()=>CheckCart()} className=' w-[90%] m-auto py-1 mt-2 text-[18px] text-white bg-[#1BA56F]'>Proceed Checkout</button>
              </div>
            </div>
                </div>
            </div>
                </>:
                <>
                         <div className='mycart'>
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
                                {Object.values(adjustmentData)?.map((row) => (
                                    <TableRow
                                        key={row.item_name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell scope="row">
                                            {row.english_adjustment_name}
                                        </TableCell>
                                        <TableCell align="center">1</TableCell>
                                        <TableCell align="center">{row.price}</TableCell>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <TableCell align="center">
                                            <img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'adjustment')}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(Object.values(itemsList))?.map((row) => (
                                    <TableRow
                                        key={row.name_english}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell scope="row">
                                            {row.name_english}
                                        </TableCell>
                                        <TableCell align="center">{row.qty}</TableCell>
                                        <TableCell align="center">{row.price}</TableCell>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <TableCell align="center">
                                            <img style={{ cursor: 'pointer' }} src={DeleteIcon} alt="Delete Icon" onClick={() => removeItem(row.id, 'addon')}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                <div className='!text-[20px] float-right w-[50%]'>
                    <p className='ml-8 mb-1 !text-[20px] !font-normal flex justify-between'><span>Price</span> <span>{totalPrice} sar</span></p>
                    <p className='ml-8 mb-1 !text-[20px] !font-normal  flex justify-between'><span>VAT</span> <span>0 sar</span></p>
                    <p className='!text-[20px] flex justify-between mb-1'>
                        <span className='flex items-center'><img className='mr-2' src={BlackDollor}></img> Total Price</span>
                        <span>{totalPrice} sar</span>
                    </p>
                    <p className='ml-1 !text-[20px] flex justify-between mb-1'>
                    <span className='flex items-center'><AccessTimeIcon style={{marginRight:'4px'}} /> Total Duration</span>
                    <span>{totalTime} Days</span>
                    </p>
                </div>
                </div>
                <div className='billing'>
                    <p>Billing Address</p>
                        <div className="user-name">
                            <div>
                                <label>First Name</label>
                                <input  className='border ' name="firstName" value={billingInfo.firstName} onChange={handleBillingChange} />
                            </div>
                            <div style={{ margin: '2% 0 0 2%' }}>
                                <label>Last Name</label>
                                <input  className='border ' name="lastName" value={billingInfo.lastName} onChange={handleBillingChange} />
                            </div>
                        </div>
                        <div className="email">
                            <label>Email</label>
                            <input  className='border ' name="email" value={billingInfo.email} onChange={handleBillingChange} />
                        </div>
                        <div className="phonenumber">
                            <label>Phone Number</label>
                            <input className='border ' name="phoneNumber" value={billingInfo.phoneNumber} onChange={handleBillingChange} />
                        </div>
                        <div className="country">
                            <div>
                                <label>Country</label>
                                <input  className='border ' name="country" value={billingInfo.country} onChange={handleBillingChange} />
                            </div>
                            <div style={{ margin: '2% 0 0 2%' }}>
                                <label>City</label>
                                <input  className='border ' name="city" value={billingInfo.city} onChange={handleBillingChange} />
                            </div>
                        </div>
                        <div className="postal-code">
                            <label>Postal Code</label>
                            <input  className='border ' name="postalCode" value={billingInfo.postalCode} onChange={handleBillingChange} />
                        </div>
                        <div className="promo-code">
                            <label>Promo Code</label>
                            <input  className='border ' name="promoCode" value={billingInfo.promoCode} onChange={handleBillingChange} />
                        </div>
                        <button onClick={()=>createAdjustmentOrder()} className="payment">Make Payment</button>
    
                </div>
            </div>
                </>
            }

            <Footer />

        </>

    )
}
