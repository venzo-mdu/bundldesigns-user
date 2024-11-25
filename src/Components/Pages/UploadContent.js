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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UploadContent() {

    const { orderId } = useParams();
    const [uploadContent, setUploadContent] = useState({})
    const [designQuestions, setDesignQuestions] = useState([])
    const [skipId, setSkipId] = useState([])

    
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
    }, [])


    const uploadFile = async(e, id, field) =>{
        if(e.target.files.length){
            const formData = new FormData()
            formData.append('file',e.target.files[0])
            formData.append('file_name',e.target.files[0]?.name)
            const response = await axios.post(`${base_url}api/upload_file/`, formData, Config);
            console.log(response.data,'res');
            setUploadContent((prev) => ({
                ...prev,
                [id]: {
                    ...prev[id], // Preserve other fields for this ID
                    [field]: response.data.file_url, // Update the file or other field
                    ...(field === 'file' && { filename: e.target.files[0]?.name || '' }), // Update filename if file is changed
                },
            }));
        }
    }

    const saveContent = async(itemId) => {
        const formData = {answers:{[itemId]: uploadContent[itemId]},orderId:order.id}
        const response = await axios.post(`${base_url}api/upload_content/`, formData, Config);
        getOrderDetails()
    }

    const saveAllContent = async()=>{
        const formData = {answers:uploadContent,orderId:order.id}
        const response = await axios.post(`${base_url}api/upload_content/`, formData, Config);
        window.location.href = '/dashboard'
    }
    
    console.log(JSON.stringify(uploadContent),'uppp')
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
                    <p onClick={()=>{window.location.href ='/dashboard'}} className='flex text-[18px] items-center text-black'> <img src={backIcon} className='mr-2' ></img> Back to dashboard </p>
                    <div className='mx-12'>
                        <h3 className='my-4'> Upload Content </h3>

                        {order && <>
                            {order.item_details.bundle_items.map(item => {
                                if (item.item__category != 1) {
                                    return <div className=" border-b !border-black space-x-2">
                                        <p className="mb-0 font-semibold text-[22px">{item.item_name}</p>
                                        {designQuestions[item.item__id]?.language && <p className='mt-2'>
                                            <label className='mr-6 '>
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

                                        {designQuestions[item.item__id].attachment && <><p>Have something to show us?</p>
                                            <p
                                                className="border-b-2 w-[150px] !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer"
                                                onClick={() => document.getElementById(`file-${item.id}`).click()} // Trigger click on hidden input
                                            >
                                                <input
                                                    type="file"
                                                    hidden
                                                    name="file"
                                                    id={`file-${item.id}`} // Use a unique ID for each input
                                                    onChange={(e) => uploadFile(e, item.id, 'file')}
                                                />
                                                <img src={uploadIcon} alt="Upload Icon" />
                                                {uploadContent?.[item?.id]?.filename || 'Upload Content'}
                                            </p></>}
                                    </div>
                                }
                            })}
                            {
                                order.item_details.addon_items.map(item => {
                                    if (!skipId.includes(item.id) && item.status == 'questionnaire required') {

                                        return <div className=" border-b !border-black space-x-2">
                                            <p className="mb-0 font-semibold text-[22px">{item.item_name}</p>
                                            {designQuestions[item.item__id]?.language && <p className='mt-2 mb-0'>
                                                <label className='mr-6 '>
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

                                            {designQuestions[item.item__id]?.content && <p className='flex w-[70%] mt-2'>
                                                <input placeholder='Slogan & Number....' value={uploadContent?.[item?.id]?.content || ''} onChange={(e) => handleChange(e, item.id, 'content')} className='border !border-black py-2 px-2 ' ></input><button className='bg-black flex text-[16px] items-center px-2 py-1 text-white'> <img className='mr-2' src={starIcon}></img> Suggest  Content </button>
                                            </p>}
                                            {designQuestions[item.item__id]?.measurement && <>
                                                <p className='mb-0'>Measurements</p>
                                                <p className='ml-2'>
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

                                            {designQuestions[item.item__id]?.attachment && <><p className='mb-0'>Have something to show us?</p>
                                                <p
                                                    className="border-b-2 w-[150px] !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer"
                                                    onClick={() => document.getElementById(`file-${item.id}`).click()} // Trigger click on hidden input
                                                >
                                                    <input
                                                        type="file"
                                                        hidden
                                                        name="file"
                                                        id={`file-${item.id}`} // Use a unique ID for each input
                                                        onChange={(e) => uploadFile(e, item.id, 'file')}
                                                    />
                                                    <img src={uploadIcon} alt="Upload Icon" />
                                                    {uploadContent?.[item?.id]?.filename || 'Upload Content'}
                                                </p></>}

                                            <p className='my-6'> <button onClick={() => {
                                                setSkipId([...skipId, item.id])
                                            }} className='text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] mr-2'>Skip For Now</button>
                                            <button onClick={()=>saveContent(item.id)} className='text-white bg-[#1BA56F] py-1 px-2'>Save & Next</button></p>
                                        </div>
                                    }

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
                                        <div className='w-[23px] flex justify-center'>
                                        {item.status == 'questionnaire required' ?
                                            <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div> :
                                            <img src={tickCircleIcon}></img>}
                                        </div>
                                        <p className="mb-0 font-medium">{item.item_name}</p>
                                    </div>
                                })
                            }
                        </>
                    }

                    <p className='flex justify-center mt-4 mb-2 text-[#00000080]'> <button onClick={()=>saveAllContent()} className='text-[16px] px-4 border !border-[#00000080] font-medium'>  Submit content </button> </p>
                    <p className='flex justify-center text-[#1BA56F]'> <button onClick={()=>saveAllContent()} className='text-[16px] px-6 border !border-[#1BA56F] font-medium'> Save for Later </button> </p>

                </div>
            </div>
            <Footer />
        </>

    )

}
