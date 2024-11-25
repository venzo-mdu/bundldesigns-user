import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Config } from '../Auth/ConfigToken'
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

export default function Adjustments() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null)
    const [adjustments, setAdjustments] = useState([])
    const [adjustmenTab, setAdjustmentTab] = useState(0)
    const [expantedTabs, setExpantedTabs] = useState([])
    const [designListTab, setDesignListTab] = useState('Branding')
    const location = useLocation();
    const navigate = useNavigate();
    const [bundlAddons, setBundlAddons] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [addonPayLoads, setAddonPayLoads] = useState({});
    const [brandInput, setBrandInput] = useState('');


    useEffect(() => {
        getOrderDetails()
        getBundlData()
    }, [])

    const toggleDescription = (id) => {
        setExpantedTabs((prevState) => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the state for the clicked vacancy
        }));
    };


    const getOrderDetails = async () => {
        console.log(orderId, 'order')
        const response = await axios.get(`${base_url}api/order/${orderId}/`, Config);
        if (response.data) {
            setOrder(response.data.data);
            console.log(response.data.data)
            getAdjustments(response.data.data.brand_identity.item__id)
        }
    }
    const getAdjustments = async (designId) => {
        const response = await axios.get(`${base_url}api/adjustments/${designId}/`, Config);
        if (response.data) {
            setAdjustments(response.data.data)
            response.data.data.length && setAdjustmentTab(response.data.data[0].english_adjustment_name)
        }
    }

    console.log(bundlAddons, 'bundl')

    const getBundlData = async () => {
        const response = await axios.get(`${base_url}/api/package/`, Config);
        setBundlAddons(response.data.designs_details);
        setDesignListTab(Object.keys(response.data.designs_details)[0])
    }


    return (
        <>
            <Navbar />
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
                            {adjustments.map((adjustment) => {
                                if (adjustment.english_adjustment_name == adjustmenTab) {
                                    return <div className='my-6'>
                                        <div className='flex justify-between my-1'> <span className='font-bold'>{adjustment.english_adjustment_name}</span>
                                            <p className='flex items-center  text-center text-[#1BA56F]'>
                                                <span className='flex items-center mr-10'><img className='mr-2' src={dollorIcon}></img> {adjustment.price} SAR  </span>
                                                <span> <AccessTimeIcon /> {adjustment.time_limit} Days </span>
                                            </p>
                                        </div>
                                        <p className='font-medium text-[18px]'>What would you like to change?</p>
                                        <p ><input placeholder='Tell us your thoughts...' className='border px-2 py-1 border-[#000000A0]  w-[80%]'></input><button className='w-[20%] py-1 bg-[#1BA56F] text-white '>Submit Edit</button></p>
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
                                        <p className={`flex justify-between font-semibold text-[18px] pb-2  ${expantedTabs[category] ?'':'border-b' } border-[#00000080]`}> {category}      <button
                                            onClick={() => toggleDescription(category)}
                                            className="text-blue-500 cursor-pointer"
                                        >
                                            <img className='w-10' src={expantedTabs[category] ? upArrow : downArrow}></img>
                                        </button></p>
                                        {expantedTabs[category] && <div className='my-3'>
                                        {category in bundlAddons && bundlAddons[category].design_list.map(item=>{
                                            return <div className='flex justify-between font-semibold text-[18px] py-2 border-b !border-[#1BA56F]'>
                                                <span className='font-semibold text-[#1BA56F]'>{item.name_english}</span>

                                            </div>
                                        })}
                                        </div>}
                       
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='basis-1/4 px-4'>
              <p className='text-[18px] font-semibold'>Summary of Edits</p>
 
            {selectedItems?.map((item, idx) => (
              <div key={idx} className='one-brand-identity'>
                <p style={{ color: '#000000', fontSize: '20px', fontWeight: '700', width: '60%' }}>{item.quantity} {item.name_english}</p>
                <div style={{ display: 'flex' }}>
                  <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>+ {item.total_time} Days</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>+ {item.total_price} SAR</p>
                </div>
              </div>
            ))}
             <div className='bundl-name'>
             <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>Add ons</p>
            </div>
            {addonPayLoads?.item_list?.map((addon, idx) => (
              <div key={idx} className='one-brand-identity'>
                <p style={{ color: '#000000', fontSize: '20px', fontWeight: '700', width: '60%' }}>{addon.qty} {addon.addon_name}</p>
                <div style={{ display: 'flex' }}>
                  <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>+ {addon.unit_time * addon.qty} Days</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>+ {addon.unit_price * addon.qty} SAR</p>
                </div>
              </div>
            ))}
            <div className='bundl-checkout'>
              <div className='total flex' >
                <p className='basis-3/5'><img src={BlackDollor} alt="Total Price" />Total Price</p>
                <p className='basis-2/5'>{totalCost + addonPayLoads.total_price } SAR</p>
              </div>
              <div className='total flex'>
                <p className='basis-3/5'><img src={BlackTime} alt="Total Duration" />Total Duration</p>
                <p className='basis-2/5'>{totalDuration + addonPayLoads.total_time} Days</p>
              </div>

              <div className='proceed-checkout'>
                <button onClick={createPayload} className='proceed'>Proceed Checkout</button>
              </div>
              <p className='proceed-text'>Your minimum total should be above 700 SAR</p>
            </div>
                </div> */}
            </div>
            <Footer />

        </>

    )
}
