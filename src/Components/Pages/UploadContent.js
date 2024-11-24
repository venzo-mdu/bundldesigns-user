import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Config } from '../Auth/ConfigToken'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import { format } from "date-fns";
import tickCircleIcon from "../../Images/tickCircleIcon.svg"
import starIcon from "../../Images/starIcon.svg"
import backIcon from "../../Images/backIcon.svg"
import uploadIcon from "../../Images/uploadIcon.svg"
import { useParams } from "react-router-dom";


export default function UploadContent() {

    const { orderId } = useParams();
    const [uploadContent, setUploadContent] = useState({})
    const [designQuestions, setDesignQuestions] = useState([])

    const [order, setOrder] = useState(null)
    const getOrderDetails = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/order/${orderId}/`, Config);
        if (response.data) {
            setOrder(response.data.data);
            setDesignQuestions(response.data.design_question)
        }
    }
    useEffect(() => {
        getOrderDetails()
        // const lang = localStorage.getItem('lang')
        // setDashboardJson(dashboard[lang])
    }, [])

    const handleChange = (e, id, field) => {
        const newValue = field === 'file' ? e.target.files[0] : e.target.value;

        setUploadContent((prev) => ({
            ...prev,
            [id]: {
                ...prev[id], // Preserve other fields for this ID
                [field]: newValue, // Update the file or other field
                ...(field === 'file' && { filename: e.target.files[0]?.name || '' }), // Update filename if file is changed
            },
        }));
    };


    return (
        <>
            <Navbar />
            <div className='font-Helvetica px-6 py-2 flex'>
                <div className='basis-3/4 border-r border-black'>
                    <p className='flex text-[18px] items-center text-black'> <img src={backIcon} className='mr-2' ></img> Back to dashboard </p>
                    <div className='mx-12'>
                        <h3 className='my-4'> Upload Content </h3>

                        {order && <>
                            {order.item_details.bundle_items.map(item => {
                                if (item.item__category != 1) {
                                    return <div className=" border-b !border-black space-x-2">
                                    <p className="mb-0 font-medium text-[22px">{item.item_name}</p>
                                    {designQuestions[item.item__id]?.language && <p>
                                        <label className='mr-6'>
                                            <input
                                                type="radio"
                                                value="English"
                                                checked={uploadContent[item.id]?.language === "English"}
                                                onChange={(e) => handleChange(e, item.id, 'language')}
                                                className="form-radio accent-[#1BA56F] mr-2"
                                            /> English

                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="Arabic"
                                                checked={uploadContent[item.id]?.language === "Arabic"}
                                                onChange={(e) => handleChange(e, item.id, 'language')}
                                                className="form-radio accent-[#1BA56F] mr-2"
                                            />  Arabic  </label>
                                    </p>}

                                   {designQuestions[item.item__id].content && <p className='flex w-[70%]'>
                                        <input placeholder='Slogan & Number....' value={uploadContent?.[item?.id]?.content || ''} onChange={(e) => handleChange(e, item.id, 'content')} className='border !border-black py-2 px-2 ' ></input><button className='bg-black flex text-[16px] items-center px-2 py-1 text-white'> <img className='mr-2' src={starIcon}></img> Suggest  Content </button>
                                    </p>}
                                    {designQuestions[item.item__id].measurements && <>
                                    <p>Measurements</p>
                                    <p>
                                        <label className='mr-6'>
                                            <input
                                                type="radio"
                                                value="Standard"
                                                checked={uploadContent[item.id]?.measurements === "Standard"}
                                                onChange={(e) => handleChange(e, item.id, 'measurements')}
                                                className="form-radio accent-[#1BA56F] mr-2"
                                            /> Standard </label>
                                        <label className='mr-2'>
                                            <input
                                                type="radio"
                                                value="Customize"
                                                checked={uploadContent[item.id]?.measurements === "Customize"}
                                                onChange={(e) => handleChange(e, item.id, 'measurements')}
                                                className="form-radio accent-[#1BA56F] mr-2"
                                            />  Customize  </label>

                                        {uploadContent[item.id]?.measurements === "Customize" && <>
                                            <label className='text-[#1BA56F] mr-2'> width : <input type='number' min='0' onChange={(e) => handleChange(e, item.id, 'width')} value={uploadContent?.[item?.id]?.width || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                            <label className='text-[#1BA56F] mr-2'> height : <input type='number' min='0' onChange={(e) => handleChange(e, item.id, 'height')} value={uploadContent?.[item?.id]?.height || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                            <label className='text-[#1BA56F] mr-2'> length : <input type='number' min='0' onChange={(e) => handleChange(e, item.id, 'length')} value={uploadContent?.[item?.id]?.length || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                            <span className='text-[#1BA56F] mr-2'> CM </span> </>}
                                    </p>
                                    </>}

                                   { designQuestions[item.item__id].attachment && <><p>Have something to show us?</p>
                                    <p
                                        className="border-b-2 w-[150px] !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer"
                                        onClick={() => document.getElementById(`file-${item.id}`).click()} // Trigger click on hidden input
                                    >
                                        <input
                                            type="file"
                                            hidden
                                            name="file"
                                            id={`file-${item.id}`} // Use a unique ID for each input
                                            onChange={(e) => handleChange(e, item.id, 'file')}
                                        />
                                        <img src={uploadIcon} alt="Upload Icon" />
                                        {uploadContent?.[item?.id]?.filename || 'Upload Content'}
                                    </p></>}
                                </div>
                                }
                            })}
                            {
                                order.item_details.addon_items.map(item => {
                                    return <div className=" border-b !border-black space-x-2">
                                        <p className="mb-0 font-medium text-[22px">{item.item_name}</p>
                                        <p>
                                            <label className='mr-6'>
                                                <input
                                                    type="radio"
                                                    value="English"
                                                    checked={uploadContent[item.id]?.language === "English"}
                                                    onChange={(e) => handleChange(e, item.id, 'language')}
                                                    className="form-radio accent-[#1BA56F] mr-2"
                                                /> English

                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="Arabic"
                                                    checked={uploadContent[item.id]?.language === "Arabic"}
                                                    onChange={(e) => handleChange(e, item.id, 'language')}
                                                    className="form-radio accent-[#1BA56F] mr-2"
                                                />  Arabic  </label>
                                        </p>

                                        <p className='flex w-[70%]'>
                                            <input placeholder='Slogan & Number....' value={uploadContent?.[item?.id]?.content || ''} onChange={(e) => handleChange(e, item.id, 'content')} className='border !border-black py-2 px-2 ' ></input><button className='bg-black flex text-[16px] items-center px-2 py-1 text-white'> <img className='mr-2' src={starIcon}></img> Suggest  Content </button>
                                        </p>
                                        <p>Measurements</p>
                                        <p>
                                            <label className='mr-6'>
                                                <input
                                                    type="radio"
                                                    value="Standard"
                                                    checked={uploadContent[item.id]?.measurements === "Standard"}
                                                    onChange={(e) => handleChange(e, item.id, 'measurements')}
                                                    className="form-radio accent-[#1BA56F] mr-2"
                                                /> Standard </label>
                                            <label className='mr-2'>
                                                <input
                                                    type="radio"
                                                    value="Customize"
                                                    checked={uploadContent[item.id]?.measurements === "Customize"}
                                                    onChange={(e) => handleChange(e, item.id, 'measurements')}
                                                    className="form-radio accent-[#1BA56F] mr-2"
                                                />  Customize  </label>

                                            {uploadContent[item.id]?.measurements === "Customize" && <>
                                                <label className='text-[#1BA56F] mr-2'> width : <input type='number' min='0' onChange={(e) => handleChange(e, item.id, 'width')} value={uploadContent?.[item?.id]?.width || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                <label className='text-[#1BA56F] mr-2'> height : <input type='number' min='0' onChange={(e) => handleChange(e, item.id, 'height')} value={uploadContent?.[item?.id]?.height || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                <label className='text-[#1BA56F] mr-2'> length : <input type='number' min='0' onChange={(e) => handleChange(e, item.id, 'length')} value={uploadContent?.[item?.id]?.length || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                <span className='text-[#1BA56F] mr-2'> CM </span> </>}
                                        </p>
                                        <p>Have something to show us?</p>
                                        <p
                                            className="border-b-2 w-[150px] !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer"
                                            onClick={() => document.getElementById(`file-${item.id}`).click()} // Trigger click on hidden input
                                        >
                                            <input
                                                type="file"
                                                hidden
                                                name="file"
                                                id={`file-${item.id}`} // Use a unique ID for each input
                                                onChange={(e) => handleChange(e, item.id, 'file')}
                                            />
                                            <img src={uploadIcon} alt="Upload Icon" />
                                            {uploadContent?.[item?.id]?.filename || 'Upload Content'}
                                        </p>
                                    </div>
                                })
                            }
                        </>
                        }

                    </div>

                </div>
                <div className='basis-1/4 my-2 px-2'>

                    <h3 className='text-[22px] font-bold py-2'>Checklist</h3>

                    {order &&
                        <>
                            {order.item_details.bundle_items.map(item => {
                                if (item.item__category != 1) {
                                    return <div className="flex items-center space-x-2 text-[#1BA56F]">
                                        {item.status == 'questionnaire required' ?
                                            <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div> :
                                            <img src={tickCircleIcon}></img>}
                                        <p className="mb-0 font-medium">{item.item_name}</p>
                                    </div>
                                }

                            })}
                            {
                                order.item_details.addon_items.map(item => {
                                    return <div className="flex items-center space-x-2 text-[#1BA56F]">
                                        {item.status == 'questionnaire required' ?
                                            <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div> :
                                            <img src={tickCircleIcon}></img>}
                                        <p className="mb-0 font-medium">{item.item_name}</p>
                                    </div>
                                })
                            }
                        </>
                    }

                    <p className='flex justify-center mt-4 mb-2 text-[#00000080]'> <button className='text-[16px] px-4 border !border-[#00000080] font-medium'>  Submit content </button> </p>
                    <p className='flex justify-center text-[#1BA56F]'> <button className='text-[16px] px-6 border !border-[#1BA56F] font-medium'> Save for Later </button> </p>

                </div>
            </div>
            <Footer />
        </>

    )

}
