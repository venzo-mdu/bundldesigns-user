import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Config } from '../Auth/ConfigToken'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import ltIcon from '../../Images/lt_icon.svg'
import gtIcon from '../../Images/gt_icon.svg'
import editIcon from '../../Images/edit_icon.svg'
import dashboard from '../../json/dashboard.json'
import reload from '../../Images/reload.svg'
import { format } from "date-fns";
import starIcon from '../../Images/star.svg'
import paperPlane from '../../Images/paper plane.svg'
import greenStarIcon from '../../Images/greenStar.svg'
import { isBefore, addDays, parseISO, differenceInSeconds, addSeconds } from 'date-fns';
import downloadIcon from '../../Images/downloadIcon.svg'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '10vh',
  left: '10vw',
//   transform: 'translate(-50%, -50%)',
  width: '80vw',
  height:'80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function Dashboard() {

    const [projects, setProjects] = useState([])
    const [currentTab, setCurrentTab] = useState('');
    const [brandFile, setBrandFile] = useState({})
    const [showPdf, setShowPdf] = useState(false)
    const [addOnFile, setAddonFile] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [counter, setCounter] = useState(0)
    const [processIndex, setProcessIndex] = useState(0)
    const [order, setOrder] = useState({})
    const [dashboardJson, setDashboardJson] = useState(dashboard.english)
    const ProcessIndexDict = ['purchase', 'questionnaire_required', 'in_progress', 'send_for_approval', 'add_ons', 'content_uploading']
    const base_url = process.env.REACT_APP_BACKEND_URL
    const getprojects = async () => {
        const response = await axios.get(`${base_url}/api/order/`, Config);
        if (response.data) {
            setProjects(response.data.data);
            if (response.data.data.length) {
                getOrderDetails(response.data.data[0].id)
            }
        }
    }
    const getOrderDetails = async (orderId) => {
        setCurrentTab(orderId)
        const response = await axios.get(`http://127.0.0.1:8000/api/order/${orderId}/`, Config);
        const orderData = response.data.data
        if (orderData) {

            orderData.item_details = orderData.item_details = [
                ...(orderData.item_details.bundle_items || []),
                ...(orderData.item_details.addon_items || [])
            ];
            setOrder(orderData)
            const index = ProcessIndexDict.indexOf(ProcessIndexDict.find((key) => key == orderData.order_status))

            if (orderData.order_status == 'in_review') {
                setProcessIndex(ProcessIndexDict.length - 1)
            } else {
                setProcessIndex(index)
            }
            if (orderData.content_uploaded_date) {

                const uploadedDateObj = parseISO(orderData.content_uploaded_date)
                const oneDayLater = addDays(uploadedDateObj, 1);
                console.log(oneDayLater)
                if (isBefore(new Date(), oneDayLater)) {
                    setIsEdit(true)
                    setCounter(differenceInSeconds(oneDayLater, new Date()))
                }
            }
            if (orderData.order_status == 'send_for_approval') {
                const parts = response.data.brand_item_management.delivery_files[0].split('/');
                setBrandFile(parts[parts.length - 1])
            }
        }
    }

    const fillQuestionaire = () => {
        const orderdetail = order
        orderdetail.order_status = 'in_progress'
        const index = ProcessIndexDict.indexOf(ProcessIndexDict.find((key) => key == orderdetail.order_status))
        setProcessIndex(index)
    }

    const renderContent = () => {
        const expectedDate = order.content_uploaded_date ? format(addDays(new Date(order.content_uploaded_date), order.total_time), 'dd/MM/yy') : null
        const formattedCounter = counter > 0 ? format(addSeconds(new Date(0), counter), 'HH:mm:ss') : '00:00:00';
        switch (order.order_status) {
            case 'questionnaire_required':
                return (
                    <div className="text-center">
                        <h2 className="text-[22px] text-[#000000]">
                            {dashboardJson.process_content.questionnaire}
                        </h2>
                        <button
                            onClick={() => fillQuestionaire()}
                            className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2"
                        >
                            {dashboardJson.process_content.questionnaire_fill}
                        </button>
                    </div>
                );

            case 'in_progress':

                if (isEdit) {
                    return (
                        <div className="text-center">
                            <h2 className="text-[22px] text-[#000000]">
                                You have {formattedCounter} to edit your questionnaire
                            </h2>
                            <p className="text-[18px] text-[#1BA56F] font-medium">
                                {dashboardJson.process_content.questionnaire_edit_content}
                            </p>
                            <button
                                onClick={() => fillQuestionaire()}
                                className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2"
                            >
                                {dashboardJson.process_content.questionnaire_edit_action}
                            </button>
                        </div>
                    );
                }
                return (
                    <div className="text-center">
                        <h2 className="text-[22px] text-[#000000]">
                            {dashboardJson.process_content.design_brand}
                        </h2>
                        <p className="text-[18px] text-[#1BA56F] font-medium">
                            {dashboardJson.process_content.expected_date} {expectedDate}
                        </p>
                    </div>
                );

            case 'send_for_approval':
                return (
                    <div className="text-center">
                        <h2 className="text-[22px] text-[#000000]">
                            {dashboardJson.process_content.approve_brand_content}
                        </h2>
                        <p className="flex justify-center w-full">
                            <button onClick={()=>{setShowPdf(true)}} className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center">
                                <img className="mr-2" src={downloadIcon} alt="Download Icon" />
                                Click Here to Download
                            </button>
                        </p>
                        <p>
                            <button
                                onClick={() => {window.location.href = `/adjustment/${order.id}`}}
                                className="px-2 py-1 text-[#1BA56F] border border-[#1BA56F] text-[16px] mt-2"
                            >
                                {dashboardJson.process_content.request_edit}
                            </button>
                            <button
                                onClick={() => fillQuestionaire()}
                                className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2"
                            >
                                {dashboardJson.process_content.approve_brand}
                            </button>
                        </p>
                    </div>
                );

            case 'add_ons':
                return (
                    <div className="text-center">
                        <h2 className="text-[22px] text-[#000000]">
                            {dashboardJson.process_content.addons}
                        </h2>
                        <p className="flex justify-center w-full">
                            <button className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center">
                                <img className="mr-2" src={downloadIcon} alt="Download Icon" />
                                Click Here to Download
                            </button>
                        </p>
                        <p>
                            <button
                                onClick={() => (window.location.href = `/upload-content/${order.id}`)}
                                className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2"
                            >
                                {dashboardJson.process_content.upload_content}
                            </button>
                        </p>
                    </div>
                );

            case 'content_uploading':
                return (
                    <div className="text-center">
                        <h2 className="text-[22px] text-[#000000]">
                            {dashboardJson.process_content.receive_designs}
                        </h2>
                        <p className="text-[18px] text-[#1BA56F] font-medium">
                            {dashboardJson.process_content.expected_date} {expectedDate}
                        </p>
                    </div>
                );

            case 'in_review':
                return (
                    <div className="text-center">
                        <h2 className="text-[22px] text-[#000000]">
                            {dashboardJson.process_content.file_send}
                        </h2>
                        <p className="flex justify-center w-full">
                            <button className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center">
                                <img className="mr-2" src={downloadIcon} alt="Download Icon" />
                                Click Here to Download
                            </button>
                        </p>
                        <p>
                            <button
                                onClick={() => (window.location.href = `/upload-content/${order.id}`)}
                                className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2"
                            >
                                {dashboardJson.process_content.mark_complete}
                            </button>
                        </p>
                    </div>
                );

            default:
                return '';
        }

    }

    const renderProcessData = () => {
        return ProcessIndexDict.map((key, index) => {
            const isCurrentProcess = index === processIndex;
            const isPreviousProcess = index < processIndex;
            const isLast = index === ProcessIndexDict.length - 1;

            // Common classes for the containers
            const containerClasses = `flex ${!isLast ? 'basis-1/5' : ''} items-start`;

            // Determine the image and line styles based on process state
            let iconSrc = starIcon; // Default icon
            let lineClasses = 'border-t-2 border-[#00000080]'; // Default line
            let lineBorderClass = '';

            if (isCurrentProcess) {
                iconSrc = paperPlane;
            } else if (isPreviousProcess) {
                iconSrc = greenStarIcon;
                lineBorderClass = '!border-[#1BA56F]'; // Green line for previous process
            }
            console.log(isLast)
            return (
                <div className={containerClasses} key={index}>
                    <img className='m-0' src={iconSrc} alt={`Process Icon ${index}`} />
                    {!isLast && (
                        <div className="m-auto w-full">
                            <div className={`w-full ${lineClasses} ${lineBorderClass}`}></div>
                        </div>
                    )}
                </div>
            );
        })
    }

    useEffect(() => {
        getprojects()
        // const lang = localStorage.getItem('lang')
        // setDashboardJson(dashboard[lang])
    }, [])

    useEffect(() => {
        if (counter <= 0) {
            setIsEdit(false)
            return
        };

        const timer = setInterval(() => {
            setCounter((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, [counter]);

    

    return (
        <>
            <Navbar />
            <div className='font-Helvetica'>
                <div className='text-center py-2 border-b border-black'>
                    <h1 className='lg:text-[40px] md:text-[32px]'> {dashboardJson.main_title} </h1>
                    <p className='lg:text-[20px] md:text-[16px] text-[#00000080]'>{dashboardJson.title_content} </p>
                </div>

                <div className=' border-black py-16 px-14'>
                    <h1 className='lg:text-[32px] md:text-[24px] flex mb-4'>  <span className='mr-2'>{dashboardJson.second_title}</span> <img className='mr-2' src={ltIcon}></img>  <img src={gtIcon}></img> </h1>

                    <p className='flex mb-0'>
                        {projects.map(project => <button onClick={(e) => getOrderDetails(project.id)}
                            className={`py-1 px-4 border !border-[#1BA56F] ${project.id == currentTab ? 'bg-[#1BA56F] text-white' : 'bg-white text-[#1BA56F]'}
                         flex justify-around items-center`}>
                            {project.project_name}{project.id == currentTab && <img width='15px' className='ml-2' src={editIcon}></img>}</button>)}
                        <button className='py-1 flex bg-black text-white items-center lg:text-[32px] md:text-[24px] leading-[0px] px-2'>+</button>
                    </p>

                    <div className='border mt-0 !border-black py-2 px-6'>
                        <div className='flex items-center w-[80%] mx-auto mt-10 px-20'>{renderProcessData()}</div>
                        <div className='flex mb-12 w-[80%] m-auto'>
                            {dashboardJson.project_process.map((item, index) => {
                                return <div className='basis-1/5 text-center text-[16px]'>  <p className={`pb-0 mb-0 ${index == processIndex && 'font-bold'}`}> {item} </p>
                                    {index == processIndex && <p className='text-[#1BA56F]'>You’re now Here!</p>}
                                </div>
                            })}
                        </div>
                        <div className='my-4'>{renderContent()}</div>
                        <div className='w-[80%] mx-auto'>

                            {order && order.item_details && Array.isArray(order.item_details) && <>
                                <p className={`text-[22px] font-bold my-2 ${processIndex < 2 && isEdit == false ? 'text-[#00000080]' : 'text-black'}`}>Brand & Visual Identity <span className='text-[#1BA56F] text-[18px] font-semibold'> -
                                    {processIndex < 2 && isEdit == false ? 'ON HOLD' : processIndex >= 4 ? 'COMPLETE' : 'IN PROGRESS'}</span> </p>
                                <p className='font-medium text-[18px]'>{order?.brand_identity?.item_name}</p>
                                <p className='text-[22px] font-bold my-2'>Add Ons </p>

                                {order?.item_details?.map((item, index) => {
                                    return <p className={`font-medium text-[18px] mx-1 my-2 py-1 ${index != (order?.item_details.length - 1) && 'border-b'} border-[#00000080]`}>{item.item_name}</p>
                                })}
                            </>}
                        </div>
                    </div>

                </div>

                <div className='px-14'>
                    <h2 className='lg:text-[32px] md:text-[24px]'>{dashboardJson.third_title}</h2>

                    <table className='w-full border-separate border-spacing-y-2 border-spacing-x-0'>
                        <thead>
                            <tr className='!mb-4'>
                                {Object.keys(dashboardJson.table_heads).map((purchase_key) => {
                                    return <th className='text-[#00000080] pb-2 lg:text-[20px] md:text-[16px] font-Helvetica font-medium'>{dashboardJson.table_heads[purchase_key]}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, index) => {
                                return <tr className=' '>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != projects.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.id}</td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != projects.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.project_name}</td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != projects.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.grand_total}</td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != projects.length - 1 ? 'border-b !border-[#00000080]' : ''} text-[#1BA56F]`}>Completed</td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != projects.length - 1 ? 'border-b !border-[#00000080]' : ''}`}><img className='lg:w-[30px] md:w-[20px]' src={reload}></img></td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != projects.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{format(new Date(project.purchase_date), "dd/MM/yy")}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='text-center py-16'>
                    <h2 className='lg:text-[32px] md:text-[24px]'>{dashboardJson.rate_us}</h2>
                    <p className='lg:text-[20px] text-[#00000080] md:text-[16px]'>{dashboardJson.rate_us_content}</p>
                    <button className='px-12 py-1 lg:text-[20px] md:text-[16px] text-white bg-[#1BA56F]'>{dashboardJson.review_google}</button>
                </div>

            </div>
            <Modal
                open={showPdf}
                onClose={()=>{setShowPdf(false)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <iframe
                            src={`${base_url}api/view_pdf?file=${brandFile}#toolbar=0`}
                            title="PDF Viewer"
                            className="flex-grow w-full h-full border-none m-0 p-0"
                        ></iframe>
                    <a blank='true' download href={`${base_url}api/download/${brandFile}`}><img src={downloadIcon}></img></a>
                </Box>
            </Modal>
            <Footer />
        </>

    )

}
