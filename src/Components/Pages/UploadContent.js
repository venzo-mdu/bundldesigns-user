import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ConfigToken } from '../Auth/ConfigToken'
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
import { Bgloader } from '../Common/Background/Bgloader';

export default function UploadContent() {

    const { orderId } = useParams();
    const [loading, setLoading] = useState(false)
    const [uploadContent, setUploadContent] = useState({})
    const [designQuestions, setDesignQuestions] = useState([])
    const [skipId, setSkipId] = useState([])
    const [showDetails, setDetails] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 475);


    const [order, setOrder] = useState(null)
    const getOrderDetails = async () => {
        const response = await axios.get(`${base_url}/api/order/${orderId}/`, ConfigToken());
        if (response.data) {
            setOrder(response.data.data);
            setDesignQuestions(response.data.design_question)
        }
    }

    useEffect(() => {
        getOrderDetails()
    }, [])


    const uploadFile = async (e, id, field) => {
        if (e.target.files.length) {
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            formData.append('file_name', e.target.files[0]?.name)
            const response = await axios.post(`${base_url}/api/upload_file/`, formData, ConfigToken());
            console.log(response.data, 'res');
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

    const saveContent = async (itemId) => {
        const formData = { answers: { [itemId]: uploadContent[itemId] }, orderId: order.id, status: 'save_later' }
        const response = await axios.post(`${base_url}/api/upload_content/`, formData, ConfigToken());
        getOrderDetails()
    }

    const saveAllContent = async (status) => {
        const formData = { answers: uploadContent, orderId: order.id, status: status }
        const response = await axios.post(`${base_url}/api/upload_content/`, formData, ConfigToken());
        window.location.href = '/dashboard'
    }

    console.log(JSON.stringify(uploadContent), 'uppp')
    const handleChange = (e, id, field) => {
        console.log(e)
        let newValue = field === 'file' ? e.target.files[0] : e.target.value;

        if (field === 'height' || field === 'length' || field === 'width') {
            newValue = newValue.replace(/[^0-9]/g, ''); // Allow only digits
        }

        setUploadContent((prev) => ({
            ...prev,
            [id]: {
                ...prev[id], // Preserve other fields for this ID
                [field]: newValue, // Update the file or other field
                ...(field === 'file' && { filename: e.target.files[0]?.name || '' }), // Update filename if file is changed
            },
        }));
    };
console.log(skipId)

    return (
        loading ?
            <Bgloader /> :
            <>
                <Navbar />
                {
                    window.innerWidth <= 475 ?
                        <div className='px-[4%] py-4 font-Helvetica'>
                            <p onClick={() => window.location.href = "/dashboard"} className='flex font-[500] !text-[20px] items-center text-black cursor-pointer'> <img src={backIcon} className='mr-2 w-[30px]' ></img> Back to dashboard </p>
                            <div className='px-2'>
                                <h3 className='my-4'> Upload Content </h3>

                                {order && <>
                                    {order.item_details.bundle_items
                                        .filter(item=>item.item__category !== 1 && !skipId?.includes(item.id))
                                        .map((item,index,filterArr) => {
                                            return <div className={`${( filterArr.length === 1 || index === filterArr.length -1)  ? '' : 'border-b !border-black'} space-x-2 mt-[2%]`}>
                                            
                                                <p className="mb-0 font-[700] text-[20px]">{item.item_name}</p>
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

                                                {designQuestions[item.item__id]?.content && <p className='w-[100%]'>
                                                    <input placeholder='Slogan & Number....' value={uploadContent?.[item?.id]?.content || ''} onChange={(e) => handleChange(e, item.id, 'content')} className='border !border-black h-[55px] w-full py-2 px-2 rounded-[5px]' ></input>
                                                </p>}
                                                {designQuestions[item.item__id]?.measurements && <>
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
                                                            <label className='text-[#1BA56F] mr-2'> width : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'width')} value={uploadContent?.[item?.id]?.width || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                            <label className='text-[#1BA56F] mr-2'> height : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'height')} value={uploadContent?.[item?.id]?.height || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                            <label className='text-[#1BA56F] mr-2'> length : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'length')} value={uploadContent?.[item?.id]?.length || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                            <span className='text-[#1BA56F] mr-2'> CM </span> </>}
                                                    </p>
                                                </>}

                                                {designQuestions[item.item__id]?.attachment && <><p className='font-[500] text-[20px]'>Have something to show us?</p>
                                                    <p
                                                        className={`border-b-2 ${uploadContent?.[item?.id]?.filename ? 'w-fit':'w-[150px]'} !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
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
                                                    <p className='my-6 flex justify-center'> <button onClick={() => { 
                                                        setSkipId([...skipId, item.id])
                                                    }} className='text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] mr-2'>Skip For Now</button>
                                                        <button onClick={() => saveContent(item.id)} className='text-white bg-[#1BA56F] py-1 px-2'>Save & Next</button></p>
                                            </div>
                                    })}
                                    {
                                        order.item_details.addon_items
                                        .filter(item=>!skipId.includes(item.id) && item.status == 'questionnaire required')
                                        .map((item,index,filterArr) => {
                                                return <div className={`${( filterArr.length === 1 || index === filterArr.length)  ? '' : 'border-b !border-black'} space-x-2 mt-[2%]`}>
                                                    <p className="mb-0 font-[700] text-[20px]">{item.item_name}</p>
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

                                                    {designQuestions[item.item__id]?.content && <p className='w-[100%] mt-2'>
                                                        <input placeholder='Slogan & Number....' value={uploadContent?.[item?.id]?.content || ''} onChange={(e) => handleChange(e, item.id, 'content')} className='border !border-black h-[55px] w-full py-2 px-2 rounded-[5px]' ></input>
                                                    </p>}
                                                    {designQuestions[item.item__id]?.measurement && <>
                                                        <p className='mb-0 font-[500] text-[20px]'>Measurements</p>
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
                                                                <span className='text-[#1BA56F] mr-2'> CM </span> </>}
                                                            {
                                                                uploadContent[item.id]?.measurements === "Customize" && (
                                                                    <div className='flex'>
                                                                        <label className='text-[#1BA56F] mr-2'> width : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'width')} value={uploadContent?.[item?.id]?.width || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                        <label className='text-[#1BA56F] mr-2'> height : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'height')} value={uploadContent?.[item?.id]?.height || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                        <label className='text-[#1BA56F] mr-2'> length : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'length')} value={uploadContent?.[item?.id]?.length || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                    </div>
                                                                )
                                                            }
                                                        </p>
                                                    </>}

                                                    {designQuestions[item.item__id]?.attachment && <><p className='mb-0 font-[500] text-[20px]'>Have something to show us?</p>
                                                        <p
                                                            className={`border-b-2 ${uploadContent?.[item?.id]?.filename ? 'w-fit':'w-[150px]'} !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
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

                                                    <p className='my-6 flex justify-start'> <button onClick={() => {
                                                        setSkipId([...skipId, item.id])
                                                    }} className='text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] mr-2'>Skip For Now</button>
                                                        <button onClick={() => saveContent(item.id)} className='text-white bg-[#1BA56F] py-1 px-2'>Save & Next</button></p>
                                                </div>

                                        })
                                    }
                                </>
                                }

                            </div>

                            <div className={`bundl-summary  border ${showDetails? 'max-h-[80%]':'h-[200px]'} w-full left-0 z-[1]`} >
                                <div className='bundl-name '>
                                    <p className='sm:text-[24px] xs:mb-0 xs:flex xs:justify-between sm:block font-[700] px-0 !mb-2'>
                                        <span className='font-[400] text-[16px] font-Helvetica'>Checklist</span>
                                        {isMobile && <button onClick={() => setDetails(!showDetails)} className='text-[14px] font-[500] underline text-[#1BA56F]'>{!showDetails ? 'Show Details':'Hide Details'}</button>}
                                    </p>
                                </div>
                                {isMobile ? <>
                                    <div>
                                        <div className='!mt-[15px] my-2 w-full'>
                                            {order &&
                                                <div className='px-[5%]'>
                                                    {order.item_details.bundle_items.map(item => {
                                                        if (item.item__category != 1) {
                                                            return <div className="flex items-center  text-[#1BA56F] w-[100%]">
                                                                <p className="mb-0 font-medium w-[95%]">{item.item_name}</p>

                                                                {item.status == 'questionnaire required' ?
                                                                    <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div> :
                                                                    <img src={tickCircleIcon}></img>}
                                                            </div>
                                                        }

                                                    })}
                                                    {
                                                        order.item_details.addon_items.map(item => {
                                                            return <div className="flex items-center  text-[#1BA56F]">
                                                                <div className='flex  w-[100%]'>
                                                                    <p className="mb-0 font-medium w-[95%]">{item.item_name}</p>
                                                                    {item.status == 'questionnaire required' ?
                                                                        <div className="w-4 h-4 border-2 border-[#1BA56F] rounded-full"></div> :
                                                                        <img src={tickCircleIcon}></img>}
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            }
                                            <div className='border-b-[1px] border-black mt-4'></div>
                                            <p className='flex justify-center mt-4 mb-2 text-[#00000080] px-[5%]'> <button onClick={() => saveAllContent('submit')} className='text-[16px] px-4 border !border-[#00000080] font-medium w-full h-[35px]'>  Submit content </button> </p>
                                            <p className='flex justify-center text-[#1BA56F] px-[5%]'> <button onClick={() => saveAllContent('save_later')} className='text-[16px] px-4 border !border-[#1BA56F] font-medium w-full h-[35px]'> Save for Later </button> </p>

                                        </div>
                                    </div>




                                </> : ''}


                            </div>
                        </div>
                        :
                        <div className='font-Helvetica flex'>
                            <div className='basis-3/4 border-r border-black py-4'>
                                <p onClick={() => { window.location.href = '/dashboard' }} className='flex cursor-pointer text-[18px] items-center text-black px-4'> <img src={backIcon} className='mr-2' ></img> Back to dashboard </p>
                                <div className=''>
                                    <h3 className='my-4 px-[5%]'> Upload Content </h3>

                                    {order && <>
                                        {order.item_details.bundle_items
                                            .filter(item=>item.item__category !== 1 && !skipId?.includes(item.id))
                                            .map((item,index,filterArr) => {
                                                return <div className={`${filterArr.length === 1 || index === filterArr.length - 1 ? '' : 'border-b border-black'} px-[5%] space-x-2 mt-[2%]`}>
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

                                                    {designQuestions[item.item__id]?.content && <p className='flex lg:w-[70%] md:w-[90%]'>
                                                        <input placeholder='Slogan & Number....' value={uploadContent?.[item?.id]?.content || ''} onChange={(e) => handleChange(e, item.id, 'content')} className='border !border-black py-2 px-2 w-full rounded-[5px]' ></input><button className='bg-black flex text-[16px] items-center px-2 py-1 text-white  lg:w-[25%] md:w-[30%]'> <img className='mr-2' src={starIcon}></img> Suggest  Content </button>
                                                    </p>}
                                                    {designQuestions[item.item__id]?.measurements && <>
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
                                                                <label className='text-[#1BA56F] mr-2'> width : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'width')} value={uploadContent?.[item?.id]?.width || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                <label className='text-[#1BA56F] mr-2'> height : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'height')} value={uploadContent?.[item?.id]?.height || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                <label className='text-[#1BA56F] mr-2'> length : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'length')} value={uploadContent?.[item?.id]?.length || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                <span className='text-[#1BA56F] mr-2'> CM </span> </>}
                                                        </p>
                                                    </>}

                                                    {designQuestions[item.item__id]?.attachment && <><p>Have something to show us?</p>
                                                        <p
                                                            className={`border-b-2 ${uploadContent?.[item?.id]?.filename ? 'w-fit':'w-[150px]'} !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
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
                                                        <p className='my-6 flex justify-start'> <button onClick={() => {
                                                        setSkipId([...skipId, item.id])
                                                    }} className='text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] mr-2 text-[18px] font-[500]'>Skip For Now</button>
                                                        <button onClick={() => saveContent(item.id)} className='text-white bg-[#1BA56F] py-1 px-2 text-[20px] font-[500]'>Save & Next</button></p>
                                                </div>
                                        })}
                                        {
                                            
                                            order.item_details.addon_items
                                            .filter(item => !skipId.includes(item.id) && item.status === 'questionnaire required')
                                            .map((item,index,filteredArr) => {
                                                          
                                                    return <div className={`${( filteredArr.length === 1 || index === filteredArr.length)  ? '' : 'border-b !border-black'} px-[5%] space-x-2 mt-[2%]`}>
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

                                                        {designQuestions[item.item__id]?.content && <p className='flex lg:w-[70%] md:w-[90%] mt-2'>
                                                            <input placeholder='Slogan & Number....' value={uploadContent?.[item?.id]?.content || ''} onChange={(e) => handleChange(e, item.id, 'content')} className='border !border-black py-2 px-2 w-full rounded-[5px]' ></input><button className='bg-black flex text-[16px] items-center px-2 py-1 text-white lg:w-[25%] md:w-[30%]'> <img className='mr-2' src={starIcon}></img> Suggest  Content </button>
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
                                                                    <label className='text-[#1BA56F] mr-2'> width : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'width')} value={uploadContent?.[item?.id]?.width || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                    <label className='text-[#1BA56F] mr-2'> height : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'height')} value={uploadContent?.[item?.id]?.height || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                    <label className='text-[#1BA56F] mr-2'> length : <input type='text' min='0' onChange={(e) => handleChange(e, item.id, 'length')} value={uploadContent?.[item?.id]?.length || ''} className='w-[50px] border !border-[#1BA56F]'></input></label>
                                                                    <span className='text-[#1BA56F] mr-2'> CM </span> </>}
                                                            </p>
                                                        </>}

                                                        {designQuestions[item.item__id]?.attachment && <><p className='mb-0'>Have something to show us?</p>
                                                            <p
                                                                className={`border-b-2 ${uploadContent?.[item?.id]?.filename ? 'w-fit':'w-[150px]'} !border-[#1BA56F] flex items-start text-[#1BA56F] cursor-pointer`}
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
                                                        }} className='text-[#1BA56F] py-1 px-2 border !border-[#1BA56F] mr-2 text-[18px] font-[500]'>Skip For Now</button>
                                                            <button onClick={() => saveContent(item.id)} className='text-white bg-[#1BA56F] py-1 px-2 text-[20px] font-[500]'>Save & Next</button></p>
                                                    </div>

                                            })
                                        }
                                    </>
                                    }

                                </div>

                            </div>
                            <div className='basis-1/4   my-2 px-2'>

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
                                                    <div className='flex justify-center'>
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

                                <p className='flex justify-start mt-4 mb-2 text-[#00000080]'> <button onClick={() => saveAllContent('submit')} className='text-[16px] px-4 border !border-[#00000080] font-medium'>  Submit content </button> </p>
                                <p className='flex justify-start text-[#1BA56F]'> <button onClick={() => saveAllContent('save_later')} className='text-[16px] px-[6.5%] border !border-[#1BA56F] font-medium'> Save for Later </button> </p>

                            </div>
                        </div>
                }

                <Footer />
            </>

    )

}
