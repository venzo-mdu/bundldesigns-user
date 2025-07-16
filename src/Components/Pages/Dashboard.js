// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { ConfigToken } from '../Auth/ConfigToken'
// import { base_url } from '../Auth/BackendAPIUrl';
// import { Footer } from '../Common/Footer/Footer'
// import { Navbar } from '../Common/Navbar/Navbar'
// import ltIcon from '../../Images/lt_icon.svg'
// import gtIcon from '../../Images/gt_icon.svg'
// import editIcon from '../../Images/edit_icon.svg'
// import dashboard from '../../json/dashboard.json'
// import reload from '../../Images/reload.svg'
// import { format } from "date-fns";
// import starIcon from '../../Images/star.svg'
// import paperPlane from '../../Images/paper plane.svg'
// import greenStarIcon from '../../Images/greenStar.svg'
// import { isBefore, addDays, parseISO, differenceInSeconds, addSeconds } from 'date-fns';
// import downloadIcon from '../../Images/downloadIcon.svg'
// import ItemWaitingIcon from '../../Images/orderItemWaiting.svg'
// import ItemProgressIcon from '../../Images/orderItemProgress.svg'
// import ItemFinishedIcon from '../../Images/orderItemFinished.svg'
// import downloadBlackIcon from '../../Images/downloadIconBlack.svg'
// import ClearIcon from '@mui/icons-material/Clear';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { Popup } from '../Common/Popup/Popup';
// import { DashboardPopup } from '../Common/Popup/DashboardPopup';
// import { redirect, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { Bgloader } from '../Common/Background/Bgloader';
// import DoneIcon from '@mui/icons-material/Done';
// import { BorderAllRounded } from '@mui/icons-material';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width:window?.innerWidth<=500 ?'90%': '50%',
//     height: '75vh',
//     bgcolor: 'background.paper',
//     // border: '2px solid #000',
//     boxShadow: 24,
//     display: 'flex',
//     padding:'2% 2%',
//     flexDirection:'column',
//     borderRadius:'4px'
// };
// export default function Dashboard({lang,setLang}) {

//     const navigate = useNavigate();
//     const [currentUser , setCurrentUser] = useState([]);
//     const [projectName, setProjectName] = useState('')
//     const [projectToEdit, setProjectEdit] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [projects, setProjects] = useState([])
//     const [purchases, setPurchases] = useState([])
//     const [reOrderId, setReOrderId] = useState()
//     const [openPopup, setOpenPopup] = useState(false)
//     const [completePopup, setCompletePopup] = useState(false)
//     const [currentTab, setCurrentTab] = useState('');
//     const [Files, setFiles] = useState([]);
//     const [Links , setLinks] = useState([])
//     const [showPdf, setShowPdf] = useState(false)
//     const [addOnFile, setAddonFile] = useState([])
//     const [isEdit, setIsEdit] = useState(false)
//     const [counter, setCounter] = useState(0)
//     const [processIndex, setProcessIndex] = useState(0)
//     const [order, setOrder] = useState({})
//     const [dashboardJson, setDashboardJson] = useState(dashboard)
//     const [purchased, setPurchased] = useState('not')
//     const ProcessIndexDict = ['purchase', 'questionnaire_required', 'in_progress', 'send_for_approval', 'add_ons', 'content_uploaded']
//     const base_url = process.env.REACT_APP_BACKEND_URL
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     let purchase_id = queryParams.get('purchase', null);
//     const [purchasePopUp, setPurchasePopUp] = useState(purchased == 'done' ? true : false)
//     const [showFull, setShowFull] = useState(false);

//     const checkPurchase = async () => {
//         const response = await axios.get(`${base_url}/api/order/${purchase_id}/`, ConfigToken());
//         console.log(response.data.data, 'data')
//         if (response.data.data.payment_status) {
//             setPurchasePopUp(true)
//         }
//     }

//     const getprojects = async (id = null) => {
//         const response = await axios.get(`${base_url}/api/order/`, ConfigToken());
//         if (purchase_id) {
//             checkPurchase();
//         }
//         if (response.data) {
//             const resProjects = response.data.data.filter(item => item.order_status != 'in_cart')
//             // const resProjects = response.data.data.filter(item => item.order_status != 'completed' && item.order_status != 'in_cart')
//             setProjects(resProjects);
//             setPurchases(response.data.data.filter(item => item.order_status != 'in_cart'))
//             if (resProjects.length) {
//                 getOrderDetails(id ? id : resProjects[0].id)
//             }
//         }
//         setLoading(false)
//     }

//     const getOrderDetails = async (orderId) => {
//         setCurrentTab(orderId)
//         const response = await axios.get(`${base_url}/api/order/${orderId}/`, ConfigToken());
//         const orderData = response.data.data
//         if (orderData) {
//             orderData.item_details = orderData.item_details = [
//                 ...(orderData.item_details.bundle_items || []),
//                 ...(orderData.item_details.addon_items || [])
//             ];
//             setOrder(orderData)
//             const index = ProcessIndexDict.indexOf(ProcessIndexDict.find((key) => key == orderData.order_status))
//             if (orderData.order_status == 'in_review' || orderData.order_status == 'completed' ) {
//                 setProcessIndex(ProcessIndexDict.length - 1)
//             } else {
//                 setProcessIndex(index)
//             }
//             if (orderData.content_uploaded_date) {
//                 const uploadedDateObj = parseISO(orderData.content_uploaded_date)
//                 console.log(uploadedDateObj, 'dateee')
//                 const oneDayLater = addDays(uploadedDateObj, 1);
//                 console.log(oneDayLater, new Date())
//                 if (isBefore(new Date(), oneDayLater) && orderData?.next_status !== 'in_progress') {
//                     setIsEdit(true)
//                     console.log(differenceInSeconds(oneDayLater, new Date()), 'dateeeeee')
//                     setCounter(differenceInSeconds(oneDayLater, new Date()))
//                 }
//                 if (orderData.order_status == 'in_progress' && orderData.next_status !== 'in_progress')
//                     setProcessIndex(1)
//             }
//             if (orderData.order_status == 'send_for_approval' || orderData.order_status == 'add_ons' || orderData.order_status == 'in_review' || orderData.order_status == 'completed' || orderData.order_status == 'content_uploaded' ) {
//                 console.log(response.data.order_items_managements[0]?.delivery_files, 'del')
//                 // const parts = response.data.order_items_managements[0]?.delivery_files.length ? response.data.order_items_managements[0]?.delivery_files[0].split('/') : null
//                 // parts && setBrandFile(parts[parts.length - 1])

//                 // const brandFiles = response.data.order_items_managements
//                 // .flatMap(item => item?.delivery_files || []) // Flatten the array and remove undefined/null
//                 // .map(file => file.split('/').pop()); // Get only the file name
//                 let files = [] ;
//                 let links = [];
//                 // response.data.order_items_managements.forEach(item => {
//                 //     console.log(item)
//                 //     if (item.delivery_type === "File" && item.delivery_files) {
//                 //         files.push(...item?.delivery_files?.map(file => decodeURIComponent(file).split('/').pop()));
//                 //     } else if (item.delivery_type === "Link" && item.delivery_files) {
//                 //         links.push(item.delivery_link);
//                 //     }
//                 // });
//                 const extractFilesAndLinks = (items) => {
//                     items.forEach((item) => {
//                         const formattedDate = item.created_at
//                         ? new Date(item.created_at).toLocaleDateString("en-GB") // Format: DD/MM/YYYY
//                         : "-";
//                       if (item.delivery_type === "File" && item.delivery_files) {
//                           files.push(...item.delivery_files.map((file) => ({
//                             created_at: formattedDate || "",
//                             data: decodeURIComponent(file).split("/").pop()})
//                         ))
//                         // files.push(
//                         //     ...item.delivery_files.map((file) => {
//                         //       const fileName = decodeURIComponent(file).split("/").pop();
//                         //       console.log( fileName.replace(/-\d{4}-\d{2}-\d{2} \d{6}/, "").trim() )
//                         //       return fileName.replace(/-\d{13,}-\d+/, "").trim(); // Removes timestamp + random number
//                         //     })
//                         //   );

//                       } else if (item.delivery_type === "Link" && item.delivery_link) {
//                         links.push(({
//                             created_at: formattedDate || "",
//                             data: item.delivery_link
//                           }));
//                       }
//                     });
//                   };

//                   // Extract from order_items_managements
//                   if (response.data.order_items_managements) {
//                     extractFilesAndLinks(response.data.order_items_managements);
//                   }

//                   // Extract from adjustment_items
//                   if (response.data.adjustment_items) {
//                     extractFilesAndLinks(response.data.adjustment_items);
//                   }
//                 setFiles(files);
//                 setLinks(links);
//             }
//         }
//     }

//     const fillQuestionaire = () => {
//         navigate('/questionnaire/1', {
//             state: {
//                 orderId: order.id
//             }
//         })
//     }
//     const CheckCart = async (id) => {
//         const response = await axios.get(`${base_url}/api/order/cart/`, ConfigToken());
//         console.log(response)
//         if (response.status === 206) {
//             reOrder(id)
//         } else {
//             setReOrderId(id)
//             setOpenPopup(true)
//         }
//     }
//     const approveBrand = async () => {
//         const json = { 'status': 'add_ons' }
//         const response = await axios.post(`${base_url}/api/order_update/${order.id}/`, json, ConfigToken());
//         getOrderDetails(order.id)
//     }
//     const completeOrder = async () => {
//         const json = { 'status': 'completed' }
//         const response = await axios.post(`${base_url}/api/order_update/${order.id}/`, json, ConfigToken());
//         setCompletePopup(true)
//         getprojects()
//     }

//     const reOrder = async (id) => {
//         const response = await axios.get(`${base_url}/api/reorder/${id}/`, ConfigToken());
//         window.location.href = '/mycart'
//     }

//     const renderContent = () => {
//         const expectedDate = order.dead_line ? format(order.dead_line, 'dd/MM/yy') : null
//         const hours = Math.floor(counter / 3600);
//         const minutes = Math.floor((counter % 3600) / 60);
//         const seconds = counter % 60;

//         // Format into HH:mm:ss
//         const formattedCounter = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//         switch (order.order_status) {
//             // switch ('send_for_approval') {

//             case 'questionnaire_required':
//                 return (
//                     <div className="text-center">
//                         <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
//                             {lang === 'ar' ? dashboardJson.process_content.questionnaire_arabic : dashboardJson.process_content.questionnaire}
//                         </h2>
//                         <button
//                             onClick={() => fillQuestionaire()}
//                             className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2 xs:min-w-[200px] lg:min-w-0 md:min-w-0 uppercase"
//                         >
//                             {lang === 'ar' ? dashboardJson.process_content.questionnaire_fill_arabic :dashboardJson.process_content.questionnaire_fill}
//                         </button>
//                     </div>
//                 );

//             case 'in_progress':

//                 if (isEdit) {
//                     return (
//                         <div className="text-center">
//                             <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
//                                {lang === 'ar' ? 'لديك' :'You have'}  <span className='text-[#1BA56F]'>{formattedCounter}</span> {lang === 'ar' ? ' لتعديل الاستبيان الخاص' :'to edit your questionnaire'}
//                             </h2>
//                             <p className="text-[18px] text-[#1BA56F] font-medium">
//                                 {lang === 'ar'? dashboardJson.process_content.questionnaire_edit_content_arabic :dashboardJson.process_content.questionnaire_edit_content}
//                             </p>
//                             <button
//                                 onClick={() => fillQuestionaire()}
//                                 className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2 uppercase"
//                             >
//                                 {lang === 'ar' ? dashboardJson.process_content.questionnaire_edit_action_arabic  : dashboardJson.process_content.questionnaire_edit_action}
//                             </button>
//                         </div>
//                     );
//                 }
//                 return (
//                     <div className="text-center flex items-center flex-col">
//                         <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000] lg:w-[100%] md:w-[100%] xs:w-[90%]">
//                             {lang === 'ar'? dashboardJson.process_content.design_brand_arabic :dashboardJson.process_content.design_brand}
//                         </h2>
//                         <p className="text-[18px] text-[#1BA56F] font-medium">
//                             {lang === 'ar'? dashboardJson.process_content.expected_date_arabic : dashboardJson.process_content.expected_date} {expectedDate}
//                         </p>
//                     </div>
//                 );

//             case 'send_for_approval':
//                 return (
//                     <div className="text-center">
//                         <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
//                             {dashboardJson.process_content.approve_brand_content}
//                         </h2>
//                         <p className="flex justify-center w-full">
//                             <button onClick={() => { setShowPdf(true) }} className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase">
//                                 <img className={`${lang === 'ar' ?'ml-2':'mr-2'}`} src={downloadIcon} alt="Download Icon" />
//                                 {lang === 'ar' ? 'اضغط هنا للتحميل':'Click Here to Download'}
//                             </button>
//                         </p>
//                         <p>
//                             <button
//                                 onClick={() => { navigate('/adjustment', { state: { orderId: order.id, orderItemId: null } }) }}
//                                 className="px-3 py-1 text-[#1BA56F] font-[500] border !border-[#1BA56F] text-[16px] mt-2 mr-2"
//                             >
//                                 {lang === 'ar' ? dashboardJson.process_content.request_edit_arabic : dashboardJson.process_content.request_edit}
//                             </button>
//                             <button
//                                 onClick={() => approveBrand()}
//                                 className="bg-[#1BA56F] px-3 py-1 font-[500] text-[#fff] text-[16px] mt-2 uppercase"
//                             >
//                                 {lang === 'ar' ? dashboardJson.process_content.approve_brand_arabic :dashboardJson.process_content.approve_brand}
//                             </button>
//                         </p>
//                     </div>
//                 );

//             case 'add_ons':
//                 return (
//                     <div className="text-center">
//                         <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000] lg:w-[100%] md:w-[100%] xs:w-[400px]">
//                             {lang === 'ar' ? dashboardJson.process_content.addons_arabic :dashboardJson.process_content.addons}
//                         </h2>
//                         {order?.bundle_id !== null &&
//                         <p className="flex mt-3 justify-center w-full">
//                             <button onClick={() => { setShowPdf(true) }} className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase">
//                                 <img className={`${lang === 'ar' ?'ml-2':'mr-2'}`} src={downloadIcon} alt="Download Icon" />
//                                {lang === 'ar' ? 'اضغط هنا للتحميل':'Click Here to Download'}
//                             </button>
//                         </p>
//                         }
//                         <p>
//                             <button
//                                 onClick={() => (window.location.href = `/upload-content/${order.id}`)}
//                                 className="bg-[#1BA56F] lg:px-4 md:px-4 xs:px-[10%] py-1 text-[#fff] text-[16px] mt-2 uppercase"
//                             >
//                                 {lang === 'ar' ? dashboardJson.process_content.upload_content_arabic : dashboardJson.process_content.upload_content}
//                             </button>
//                         </p>
//                     </div>
//                 );

//             case 'content_uploaded':
//                 return (
//                     <div className="text-center">
//                         <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
//                             {lang === 'ar' ? dashboardJson.process_content.receive_designs_arabic : dashboardJson.process_content.receive_designs}
//                         </h2>
//                         <p className="flex justify-center w-full">
//                             <button onClick={() => { setShowPdf(true) }} className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase">
//                                 <img className={`${lang === 'ar' ?'ml-2':'mr-2'}`} onClick={() => { }} src={downloadIcon} alt="Download Icon" />
//                                 {lang === 'ar' ? 'اضغط هنا للتحميل':'Click Here to Download'}
//                             </button>
//                         </p>
//                         <p className="text-[18px] text-[#1BA56F] font-medium">
//                         {lang === 'ar'? dashboardJson.process_content.expected_date_arabic : dashboardJson.process_content.expected_date} {expectedDate}
//                         </p>
//                     </div>
//                 );

//             case 'in_review':
//                 return (
//                     <div className="text-center flex items-center flex-col">
//                         <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000] lg:w-[100%] md:w-[100%] xs:w-[80%]">
//                             {lang === 'ar' ? dashboardJson.process_content.file_send_arabic :dashboardJson.process_content.file_send}
//                         </h2>
//                         <p className="flex justify-center w-full">
//                             <button onClick={() => { setShowPdf(true) }} className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase">
//                                 <img className={`${lang === 'ar' ?'ml-2':'mr-2'}`} onClick={() => { }} src={downloadIcon} alt="Download Icon" />
//                                 {lang === 'ar' ? 'اضغط هنا للتحميل':'Click Here to Download'}
//                             </button>
//                         </p>
//                         <p>
//                             {
//                                 order.order_status === 'completed' ? '' :
//                                     <button
//                                         onClick={() => { completeOrder() }}
//                                         className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2 uppercase"
//                                     >
//                                         {lang === 'ar' ? dashboardJson.process_content.mark_complete_arabic :dashboardJson.process_content.mark_complete}
//                                     </button>
//                             }

//                         </p>
//                     </div>
//                 );
//             case 'completed':
//                 return (
//                     <div className="text-center">
//                         <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
//                            {lang === 'ar' ? dashboardJson.process_content.file_send_arabic :dashboardJson.process_content.file_send}
//                         </h2>
//                         <p className="flex justify-center w-full">
//                             <button onClick={() => { setShowPdf(true) }} className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase">
//                                 <img className={`${lang === 'ar' ?'ml-2':'mr-2'}`} onClick={() => { }} src={downloadIcon} alt="Download Icon" />
//                                 {lang === 'ar' ? 'اضغط هنا للتحميل':'Click Here to Download'}
//                             </button>
//                         </p>
//                     </div>
//                 );

//             default:
//                 return '';
//         }

//     }

//     const renderProcessData = () => {
//         return ProcessIndexDict.map((key, index) => {
//             const isCurrentProcess = index === processIndex;
//             const isPreviousProcess = index < processIndex;
//             const isLast = index === ProcessIndexDict.length - 1;

//             // Common classes for the containers
//             // const containerClasses = `flex relative mt-[3%] ${!isLast ? 'basis-1/5' : ''} items-center`;
//             const containerClasses = `flex relative ${lang === 'ar' ? 'lg:right-[0px] md:right-[30px] xs:right-0':'lg:left-[0px] md:left-[30px] xs:left-0'} mt-[3%] ${!isLast ? 'lg:basis-[45%] md:basis-[20%] xs:basis-1/5' : 'md:w-[75px] lg:w-[165px] xs:w-[75px]'} items-center`;

//             // Determine the image and line styles based on process state
//             let iconSrc = starIcon; // Default icon
//             let lineClasses = 'border-t-2 border-[#00000080]'; // Default line
//             let lineBorderClass = '';

//             if (isCurrentProcess) {
//                 iconSrc = paperPlane;
//             } else if (isPreviousProcess) {
//                 iconSrc = greenStarIcon;
//                 lineBorderClass = '!border-[#1BA56F]'; // Green line for previous process
//             }
//             return (
//                 <div className={containerClasses} key={index}>
//                     <img className={`m-0 absolute ${(isPreviousProcess || isCurrentProcess) ? (window.innerWidth<= 475 && isCurrentProcess) ?`top-[-20px] ${lang === 'ar' ?`right-[-10px] ${isCurrentProcess && 'scale-x-[-1]' }`:'left-[-10px] '}`:`top-[-25px] ${lang === 'ar' ?`right-[-10px] ${isCurrentProcess && 'scale-x-[-1]' }`:'left-[-10px]'}`:`top-[-10px] ${lang === 'ar' ?`right-[-10px] ${isCurrentProcess && 'scale-x-[-1]' }`:'left-[-10px]'}`}`} src={iconSrc} alt={`Process Icon ${index}`} />
//                     {!isLast && (
//                         <div className="m-auto w-full">
//                             <div className={`w-full ${lineClasses} ${lineBorderClass}`}></div>
//                         </div>
//                     )}
//                 </div>
//             );
//         })
//     }

//     useEffect(() => {
//         // Wait for 2 seconds, then hide the loader
//         if (purchase_id) {
//             const timer = setTimeout(() => {
//                 getprojects()
//             }, 1000);
//             return () => clearTimeout(timer);
//         } else {
//             getprojects()
//         }
//         // Cleanup the timer to avoid memory leaks
//     }, []);

//     useEffect(() => {
//         if (counter <= 0) {
//             setIsEdit(false)
//             return
//         };

//         const timer = setInterval(() => {
//             setCounter((prevTime) => prevTime - 1);
//         }, 1000);

//         return () => clearInterval(timer); // Cleanup on component unmount
//     }, [counter]);

//     useEffect(() => {
//         const getAuthUser = async () => {
//           try {
//             const response = await axios.get(`${base_url}/api/profile/`, ConfigToken());
//             console.log(response.data);

//             // Function to format the name
//             const formatName = (name) => {
//               return name
//                 .split(' ') // Split the name by spaces
//                 .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
//                 .join(' '); // Join back into a single string
//             };

//             // Format the full name before setting state
//             const formattedUser = {
//               ...response.data,
//               full_name: formatName(response.data?.full_name || "")
//             };

//             setCurrentUser(formattedUser);
//           } catch (error) {
//             console.error("Error fetching user profile:", error);
//           }
//         };

//         getAuthUser();
//       }, []); // Add dependencies if needed

//     const nameChange = async () => {
//         const response = await axios.patch(`${base_url}/api/order-name/${projectToEdit}/`, { 'project_name': projectName }, ConfigToken());
//         purchase_id = null;
//         getprojects(projectToEdit)
//         setProjectEdit(null)
//         setProjectName(null)
//     }

//     const handleSelectChange = async(event) =>{
//         console.log(event.target.value);
//         const id = event.target.value
//         await getOrderDetails(id);
//     }

// //     const handleDownload = (file) => {
// //         // const aTag = document.createElement('a');
// //         // aTag.href = `${base_url}/api/download/${file}`;
// //         // aTag.target = "_blank";
// //         // aTag.download = file;
// //         // aTag.click()

// //         const link = document.createElement("a");
// //   link.href = `${base_url}/api/download/${file}`; // Replace with your file URL
// //   link.download = file; // Suggested file name
// //   document.body.appendChild(link);
// //   link.click();
// //   document.body.removeChild(link);
// //     };
// const handleDownload = async (file) => {
//     try {
//       const response = await fetch(`${base_url}/api/download/${file}`, {
//         method: "GET",
//         headers: {
//           // Add authentication headers if needed
//           // Authorization: `Bearer your_token_here`
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = file.replace(/-\d{13,}-\d+/, "").trim();
//       link.target="_blank"
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed:", error);
//     }
//   };

//     return (
//         <>
//             {
//                 loading ?
//                     <Bgloader /> :
//                     <>
//                         <Navbar isLang={lang} setIsLang={setLang}/>
//                         {
//                             openPopup && <DashboardPopup
//                                 openpopup={openPopup}
//                                 isCancel={false}
//                                 setPopup={setOpenPopup}
//                                 title={'Empty your cart'}
//                                 // subTitle={'Are you sure, you want to empty the cart.'}
//                                 onClick={() => reOrder(reOrderId)}
//                                 save={'Yes'}
//                                 cancel={'Cancel'}
//                             />
//                         }
//                         {
//                             purchasePopUp && <DashboardPopup
//                                 openpopup={purchasePopUp}
//                                 isCancel={true}
//                                 setPopup={setPurchasePopUp}
//                                 title={'Thank you for your purchase'}
//                                 subTitle={"We're so happy you're here! Let's create something amazing together."}
//                                 onClick={() => { setPurchasePopUp(false);navigate('/dashboard') }}
//                                 save={'Continue to Dashboard'}
//                             // cancel={'Cancel'}
//                             />
//                         }
//                         {
//                             completePopup && <DashboardPopup
//                                 openpopup={completePopup}
//                                 isCancel={true}
//                                 setPopup={setCompletePopup}
//                                 title={"And that's a wrap!"}
//                                 subTitle={"That's a wrap on the design project! It's been a fun and creative process. Enjoy the files."}
//                                 onClick={() => window.location.reload()}
//                                 save={'Continue to Dashboard'}
//                             />
//                         }
//                         <div className='font-Helvetica'>
//                             <div className='text-center py-2 border-b border-black'>
//                                 <h1 className='lg:text-[40px] text-[#000] md:text-[32px] xs:text-[32px] xs:font-[700] lg:mt-[2%] md:mt-[2%] xs:mt-[5%]'> {lang === 'ar' ? dashboardJson?.main_title_arabic :dashboardJson.main_title} {currentUser?.full_name}! </h1>
//                                 <p className='lg:text-[20px] md:text-[16px] text-[#00000080] lg:block md:block xs:hidden sm:hidden'>{lang === 'ar' ? dashboardJson?.title_content_arabic : dashboardJson.title_content} </p>
//                             </div>

//                             {
//                                 projects.length ? <div className=' border-black  lg:py-16 md:py-16 xs:py-8 lg:px-14 md:px-14 xs:px-0 '>
//                                     {
//                                         window.innerWidth <=475 ?
//                                         <div className='w-[100%] flex px-[5%]'>
//                                         <p className='text-[#000000] opacity-[50%] text-[20px] font-[500] font-Helvetica  w-[70%]'>{lang === 'ar' ? 'بلدي بوندلز' :'My Bundls'}</p>
//                                         <div className={`w-[30%] ${lang === 'ar' ?'text-left':'text-right'} mt-[0%]`}>
//                                             <button onClick={() => { window.location.href = '/' }} className='bg-black text-white h-[35px] w-[35px] text-[22px]'>+</button>
//                                             </div>
//                                         </div>
//                                         :
//                                         <h1 className='lg:text-[32px] md:text-[24px] flex mb-4 xs:px-0'>  <span className='mr-2'>{lang === 'ar' ? dashboardJson.second_title_arabic : dashboardJson.second_title}</span> <img className={`${lang === 'ar' ? 'scale-x-[-1]':'scale-x-[1]'} mr-2`} src={ltIcon}></img>  <img className={`${lang === 'ar' ? 'scale-x-[-1] mr-2':'scale-x-[1]'} `} src={gtIcon}></img> </h1>
//                                     }

//                                     <p className='flex lg:overflow-auto md:overflow-auto xs:overflow-hidden mb-0'>

//                                       {
//                                         window.innerWidth > 768 ?

//                                             projects.map(project =>
//                                             <button onClick={(e) => getOrderDetails(project.id)}
//                                                 className={`py-1 px-4 min-w-fit border-[2px] !border-[#1BA56F] ${project.id == currentTab ? 'bg-[#1BA56F] text-white' : 'bg-white text-[#1BA56F]'}
//                                                     flex justify-around items-center border-r-0`}>
//                                                 {projectToEdit === project.id ? (
//                                                     <>
//                                                         <input
//                                                             className="px-2 py-1 !text-black w-full rounded-none"
//                                                             value={projectName}
//                                                             onChange={(e) => setProjectName(e.target.value)}
//                                                         />
//                                                         <button onClick={() => nameChange()}><DoneIcon className='ml-2' /></button>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         {project.project_name}
//                                                         {project.id === currentTab && (
//                                                             <img width="15px" className={`${lang === 'ar' ? 'mr-2':'ml-2'}`} src={editIcon} onClick={() => { setProjectEdit(project.id); setProjectName(project.project_name) }} alt="Edit Icon" />
//                                                         )}
//                                                     </>
//                                                 )}
//                                             </button>

//                                             ) :
//                                             <div className='xs:px-[5%] xs:flex xs:w-[100%]'>
//                                                 {/* <div className="select-container"> */}
//                                             <select id='dashboardSelect' className='w-full h-[45px] text-[32px] font-[700] outline-none border-none px-0 rounded-none ' onChange={(e)=>handleSelectChange(e)}>
//                                                 {projects?.map((project, index) => (
//                                                     <option className="text-[16px] font-[500] " key={index} value={project.id}>
//                                                         {project.project_name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             {/* </div> */}

//                                         </div>

//                                       }

//                                        {
//                                         window?.innerWidth >=475 &&
//                                         <button onClick={() => { window.location.href = '/' }} className='lg:py-2 lg:px-2 lg:sticky lg:right-0 md:sticky md:right-0 flex bg-black text-white items-center lg:text-[32px] md:text-[24px] leading-[0px]  xs:text-[24px] xs:py-4 xs:px-4 xs:relative xs:left-[0%]'>+</button>
//                                        }
//                                     </p>
//                                     {window.innerWidth<768 && (<div className='px-[5%] mt-2 font-Helvetica'>
//                                         <p className='px-32text-[18px] font-[400] opacity-50'>
//                                             {processIndex + 1}/{dashboardJson.project_process.length} - {lang === 'ar' ? dashboardJson.project_process_arabic[processIndex] :dashboardJson.project_process[processIndex]}
//                                         </p>
//                                     </div>)}
//                                     <div className='lg:border-[1.5px] md:border-[1.5px] xs:border-b-[1.5px] mt-0  lg:border-black md:border-black border-transparent py-2 lg:px-6 md:px-6 xs:px-0 xs:border-black'>
//                                         <div className={`flex items-center macm1:w-[80%] lg:w-[78%] w-[80%] md:w-[87%]   lg:mx-auto md:mx-auto lg:mt-10 md:mt-10 xs:mt-2 lg:px-0 ${processIndex === 5 ? 'xs:w-[100%]':'xs:w-[108%]'} xs:px-[2%] xs:ml-[2%]`}>{renderProcessData()}</div>
//                                         <div className={`flex ${lang === 'ar' ?' macm1:p-[0px_0px_0px_40px] lg:p-[0px_0px_0px_30px] md:p-[15px_70px_0px_15px] macm2:p-[0px_0px_0px_35px]':'macm1:p-[0px_40px_0px_0px] lg:p-[0px_30px_0px_0px] md:p-[15px_15px_0px_70px] macm2:p-[0px_35px_0px_0px]'}  mb-12 lg:w-[90%] w-[80%] md:w-[100%] xs:w-[100%] lg:m-auto md:m-0`}>
//                                         {/* <div className={`flex ${lang === 'ar' ?' macm1:p-[0px_0px_0px_40px] lg:p-[0px_0px_0px_30px] md:p-[15px_70px_0px_15px] macm2:p-[0px_0px_0px_35px]':'macm1:p-[0px_40px_0px_0px] lg:p-[0px_30px_0px_0px] md:p-[15px_15px_0px_70px] macm2:p-[0px_35px_0px_0px]'}  mb-12 lg:w-[90%] w-[80%] md:w-[100%] xs:w-[100%] lg:m-auto md:m-0`}> */}
//                                             {window.innerWidth > 768 && (lang === 'ar' ? dashboardJson.project_process_arabic : dashboardJson.project_process)?.map((item, index) => {
//                                                 return <div className='lg:basis-[45%] md:basis-[20%] xs:basis-1/5 text-center lg:text-[16px] md:text-[14px] mt-[2%]'>  <p className={`pb-0 lg:max-w-[75%] md:max-w-[75%] macm2:w-[70%] max-w-[95%] lg:mx-auto md:mx-0 xs:mx-auto mb-0 ${index == processIndex && 'font-bold'}`}> {item} </p>
//                                                     {index == processIndex && <p className='text-[#1BA56F] font-[700] lg:text-center md:text-justify ml-0'>{lang === 'ar' ? 'أنت الآن هنا !' :'You’re now Here!'}</p>}
//                                                 </div>
//                                             })}
//                                         </div>
//                                         <div className='my-4'>{renderContent()}</div>
//                                         <div className='lg:w-[100%] md:w-[100%] xs:w-[100%] lg:px-[5%] md:px-[5%] xs:mx-0 xs:px-6'>

//                                             {order && order.item_details && Array.isArray(order.item_details) && <>
//                                             {order?.brand_identity && <>                                                <p className={`lg:text-[22px] md:text-[22px] xs:text-[18px] font-bold my-2 ${processIndex < 2 ? processIndex === 1 && order?.order_status !== 'in_progress' ?'text-[#00000080]': 'text-black': 'text-black'}`}>{lang === 'ar' ? 'العلامة التجارية والهوية البصرية' : 'Brand & Visual Identity'} <span className='text-[#1BA56F] lg:text-[18px] md:text-[18px] xs:text-[16px]  font-[500]'> -
//                                                     {processIndex < 2 ? processIndex === 1 && order?.order_status !== 'in_progress' ? lang === 'ar' ? 'قيد الانتظار' : ' ON HOLD' :lang === 'ar' ? 'قيد التقدم' :'IN PROGRESS' : processIndex >= 4 ? lang === 'ar' ? 'كاملة':' COMPLETE' : lang === 'ar' ? 'قيد التقدم' :'IN PROGRESS'}</span> </p>
//                                                 <p className={`font-medium lg:text-[18px] md:text-[18px] xs:text-[16px] ${processIndex < 2 ? processIndex === 1 && order?.order_status !== 'in_progress' ?'text-[#00000080]' : 'text-black' : 'text-[#000]'}`}>{lang === 'ar' ? order?.brand_identity?.item__name_arabic : order?.brand_identity?.item_name} {processIndex >= 4 && <button className='bg-[#1BA56F] px-2 !py-0  text-[16px] ml-4 text-white font-[400] uppercase' onClick={() => { navigate('/adjustment', { state: { orderId: order.id, orderItemId: null } }) }}>{lang === 'ar' ? 'طلب تعديلات' :'Request Edits'}</button>} </p></>}

//                                                 <p className={`text-[22px] ${processIndex < 4 && 'text-[#00000080]'} font-bold my-2`}>{lang === 'ar' ? 'التطبيقات ' :'Applications'}

//                                                     <span className='text-[#1BA56F] lg:text-[18px] md:text-[18px] xs:text-[16px]  font-[500]'> -
//                                                         {processIndex < 4 ? lang === 'ar' ? 'قيد الانتظار' : ' ON HOLD' :order.order_status =='completed' || order.order_status =='in_review' ? lang === 'ar' ? 'كاملة':' COMPLETE' : lang === 'ar' ? 'قيد التقدم' :'IN PROGRESS'}</span>
//                                                 </p>
//                                                 {order?.item_details
//                                                     ?.filter(item => item?.item__id !==76 && item.type !== 'bundl')
//                                                     ?.map((item, index, filteredArray) => {
//                                                         const isProcessing = processIndex < 4;
//                                                         const isLastItem = index === filteredArray.length - 1;
//                                                         return <p className={`font-medium ${isProcessing && 'text-[#00000080]'} text-[18px] mx-1 lg:my-2 md:my-2 xs:my-0 lg:py-1 md:py-1 xs:py-2
//                                                         ${!isLastItem &&'border-b'} border-[#00000080] flex justify-between`}><span className='lg:text-[16px] md:text-[16px] xs:text-[16px]'>{lang === 'ar' ? item?.item__name_arabic :item.item_name}</span>
//                                                             <span className={`flex lg:items-center md:items-center xs:items-end lg:flex-row md:flex-row ${item.status == 'questionnaire required' || item.status == 'in process' ? 'xs:flex-row' : 'xs:flex-col-reverse'} text-[#00000080] text-[14px]`}>{processIndex >= 4 ? <>
//                                                                 {item.status == 'questionnaire required' ? <>
//                                                                     <span className={`${lang === 'ar' ? 'ml-2':'mr-2'} font-normal`}>{lang === 'ar' ? 'انتظار المحتوى' :'Waiting content'}</span>
//                                                                     <img src={ItemWaitingIcon}></img>
//                                                                 </> : item.status == 'in process' ? <>
//                                                                     <span className={`${lang === 'ar' ? 'ml-2':'mr-2'} font-normal`}>{lang === 'ar' ? 'قيد التقدم' : 'In Progress'}</span>
//                                                                     <img src={ItemProgressIcon}></img>
//                                                                 </> : <>
//                                                                     <button className={`bg-[#1BA56F] ${lang === 'ar' ?'lg:ml-5 md:ml-5 xs:ml-0':'lg:mr-5 md:mr-5 xs:mr-0'} px-2 !py-0 text-[16px] ml-4 text-white font-[400] lg:mt-0 md:mt-0 xs:mt-[5%] uppercase`} onClick={() => { navigate('/adjustment', { state: { orderId: order.id, orderItemId: item.id } }) }}>{lang === 'ar' ? 'طلب تعديلات' :'Request Edits'}</button>
//                                                                     <div className='flex'>
//                                                                         <span className={`${lang === 'ar' ? 'ml-2':'mr-2'} text-[16px] font-semibold text-[#1BA56F] mt-1`}>{lang === 'ar' ? 'تم الانتهاء ' :'Completed'}</span>
//                                                                         <img src={ItemFinishedIcon}></img>
//                                                                     </div>

//                                                                 </>}
//                                                             </> : ''}</span>
//                                                         </p>

//                                                     })}

//                                             </>}
//                                         </div>
//                                     </div>

//                                 </div> :

//                                     <div className="text-center p-10">
//                                         <h1 className="text-[#00000080]">No Orders</h1>
//                                         <a href="/" className="text-blue-500 hover:underline">Make Some Orders</a>
//                                     </div>
//                             }

//                             {/* {
//                                 window.innerWidth > 768 ?

//                                     purchases.length ? <div className='px-14 mt-4 mb-4'>
//                                         <h2 className='lg:text-[32px] text-[#000] md:text-[24px]'>{dashboardJson.third_title}</h2>

//                                         <table className='w-full !border-[#00000080] border-separate border-spacing-y-2 border-spacing-x-0'>
//                                             <thead>
//                                                 <tr className='!mb-4'>
//                                                     {Object.keys(dashboardJson.table_heads).map((purchase_key) => {
//                                                         return <th className='text-[#00000080] pb-2 lg:text-[20px] md:text-[16px] font-Helvetica font-medium'>{dashboardJson.table_heads[purchase_key]}</th>
//                                                     })}
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {purchases.map((project, index) => {
//                                                     return <tr className=' '>
//                                                         <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.id}</td>
//                                                         <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.project_name}</td>
//                                                         <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{Math.round(project.grand_total)}</td>
//                                                         <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''} text-[#1BA56F]`}>Completed</td>
//                                                         <td onClick={() => CheckCart(project.id)} className={`lg:text-[20px] cursor-pointer font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}><img className='lg:w-[30px] md:w-[20px]' src={reload}></img></td>
//                                                         <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{format(new Date(project.purchase_date), "dd/MM/yy")}</td>
//                                                     </tr>
//                                                 })}
//                                             </tbody>
//                                         </table>
//                                     </div> : ''
//                                     :
//                                     <div className="w-full px-[8%]">
//                                         <div className="flex justify-between items-center">
//                                             <p className="text-[20px] font-[500] font-Helvetica opacity-50">Purchase History</p>
//                                             <p
//                                                 className="underline text-[20px] font-[500] font-Helvetica text-[#1BA56F] cursor-pointer"
//                                                 onClick={() => setShowFull(!showFull)}
//                                             >
//                                                 {showFull ? "Show Less" : "See More"}
//                                             </p>
//                                         </div>

//                                         <div className={`transition-all duration-500 ease-out ${showFull ? "h-auto" : "h-[165px] overflow-hidden relative"}`}>
//                                             {purchases.map((order, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className="border-b border-gray-300 py-2 flex flex-col md:flex-row md:items-center justify-between"
//                                                 >
//                                                     <div className="flex justify-between w-full md:w-[50%]">
//                                                         <p className="text-[22px] font-[700] font-Helvetica">{order.project_name.length > 9 ? order.project_name.substring(0, 5) + " (...)" : order.project_name}</p>
//                                                         <p className="text-[22px] font-[700] font-Helvetica">{Math.round(order.grand_total)} SAR</p>
//                                                     </div>

//                                                     <div className="flex justify-between w-full md:w-[50%] mt-1 md:mt-0">
//                                                         <p className="text-[20px] font-[500] text-gray-500 font-Helvetica">{order.id}</p>
//                                                         <p className="text-[20px] font-[500] text-gray-500 font-Helvetica">{format(new Date(order.purchase_date), "dd/MM/yy")}</p>
//                                                         <p className="text-[20px] font-[500] font-Helvetica text-[#1BA56F]">Completed</p>
//                                                     </div>
//                                                 </div>
//                                             ))}

//                                             {!showFull && (
//                                                 <div className="absolute bottom-[-40px] left-0 w-full h-[80px] bg-gradient-to-t from-white via-white/90 to-transparent shadow-[1px] pointer-events-none transition-all duration-500 ease-out "></div>
//                                             )}
//                                         </div>
//                                     </div>
//                             } */}

//                             <div className='font-Helvetica'>
//                                 <div className='text-center pt-20 pb-24'>
//                                     <h2 className='lg:text-[32px] md:text-[24px] xs:text-[32px] xs:font-[700] xs:px-[15%]'>{lang === 'ar'? dashboardJson.rate_us_arabic :dashboardJson.rate_us}</h2>
//                                     <p className='lg:text-[20px] text-[#00000080] md:text-[16px] xs:text-[16px] xs:px-[12%]'>{lang === 'ar'? dashboardJson.rate_us_content_arabic :dashboardJson.rate_us_content}</p>
//                                     {
//                                         window?.innerWidth >= 475 ?
//                                         <a target='_blank' href="https://www.google.com/search?q=bundldesigns&rlz=1C1OPNX_enIN1088IN1088&oq=bundldesigns&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIICAQQRRgnGDsyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODA5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3e2efdec17da19b7:0xb10d764716306f04,3,,,," className='px-12 py-2 lg:text-[20px] md:text-[16px] text-white bg-[#1BA56F] uppercase'>{lang === 'ar'? dashboardJson.review_google_arabic : dashboardJson.review_google}</a>
//                                         :
//                                         <a target='_blank' href="https://www.google.com/search?sca_esv=c4b1341a4b7b7a8e&rlz=1C1OPNX_enIN1088IN1088&sxsrf=AHTn8zpz8heeFIffXtZFmZcBKyfoZlggHQ:1738924330168&q=bundl+designs+reviews&uds=ABqPDvxhviXT310WMxRmyLGmEwIWGxD1D4UaNg1_5mWkuvL-XEHlBMW0Wi5hXsAWml52GBwP0MgahtCC7xIzOfccgCir8jqEM-EUFl8W5TAQZtW1RiBwrQ6eg9Lumr7a35DA3UW1etJjqySLvsDCAu3swGovni-vtvN9dTjA83v60KOxD9627yKA06c5tUy_FosedF9vWioHYMgsreRYsFewxUb2IPmni2ayZr3gorMNTpcZLIypv5tgzZ33pY3Lm3ZXqLhrBu3CF3C_WNhYjJxca9Q4uc_9kNdOSyf491fLCyNbqThFA6O36UEEQF7vrZUZMHWOAEK22_BQhgx5UwnwyKbCztDiilDDN19JaVdNbCZFQpujpiDNHeroUq9oC1G2YdfLrj9V3eKSJf-u1ebBOTQNfuP-WhDcJVPho7PYBp2cmQ0VmhQ&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzfMxsPAhwiZEXurMaV4FghdFjDxW8-kb_wAl5CzlJ4LuB7A7CZCUrHH6TRDNxXAqy2BU86fOeAnWG4ddtnuW93JPkFUY&sa=X&ved=2ahUKEwiZtPb3rbGLAxX_4zgGHfRGAacQk8gLegQIKBAB&ictx=1&biw=393&bih=736&dpr=2.75#ebo=3" className='px-12 py-2 lg:text-[20px] md:text-[16px] text-white bg-[#1BA56F] uppercase'>{lang === 'ar'? dashboardJson.review_google_arabic :dashboardJson.review_google}</a>
//                                     }
//                                 </div>
//                             </div>

//                         </div>
//                         <Modal
//                             open={showPdf}
//                             onClose={() => { setShowPdf(false) }}
//                             aria-labelledby="modal-modal-title"
//                             aria-describedby="modal-modal-description"
//                         >
//                             <Box sx={style}>
//                                       <div className='min-h-[inherit] overflow-y-auto border-[1px] border-black pt-2 font-Helvetica'>
//                                         <p className='px-2 text-[20px] font-[500] font-Helvetica text-[#1BA56F] uppercase'>Artworks</p>
//                                       {(Files.length > 0 || Links.length > 0) ? (
//                                     <div>
//                                             <div className='px-2'>
//                                                 {
//                                                     Files.map((item, index) => (
//                                                         // <a
//                                                         //     key={index}
//                                                         //     className="cursor-pointer ml-2 underline block w-fit break-all"
//                                                         //     onClick={() => handleDownload(item.data)}
//                                                         // >
//                                                         //     {item.data.replace(/-\d{13,}-\d+/, "").trim()}
//                                                         // </a>

//                                                         <div className={`${(Files?.length - 1 !== index || Links?.length > 0 )&& 'border-b border-black'} mt-2 px-2`}>
//                                                             <p>Date : {item?.created_at}</p>
//                                                             <p>Title : File</p>
//                                                             <p onClick={() => handleDownload(item.data)}>Link : <span className='text-blue-500 cursor-pointer underline'>{item.data.replace(/-\d{13,}-\d+/, "").trim()}</span> </p>
//                                                         </div>
//                                                     ))
//                                                 }

//                                             </div>

//                                         {Links.length > 0 && (
//                                             <div className='px-2'>
//                                                 {
//                                                     Links.map((item, index) => {
//                                                         const validUrl = item?.data.startsWith("http://") || item?.data.startsWith("https://") ? item?.data : `https://${item?.data}`;

//                                                         return (

//                                                             <div className={`${Links?.length - 1 !== index && 'border-b border-black'} mt-2 px-2`}>
//                                                             <p>Date : {item?.created_at}</p>
//                                                             <p>Title : Link</p>
//                                                             {/* <p onClick={() => handleDownload(item.data)}>Link : <span className='text-blue-500 cursor-pointer underline'>{item.data.replace(/-\d{13,}-\d+/, "").trim()}</span> </p> */}
//                                                             <p className='flex'>
//                                                                 Link :
//                                                              <a
//                                                                  key={index}
//                                                                  className="cursor-pointer ml-2 underline block w-fit break-all"
//                                                                  href={validUrl}
//                                                                  target="_blank"
//                                                                  rel="noopener noreferrer"
//                                                              >
//                                                                  {item?.data}
//                                                              </a>
//                                                             </p>
//                                                            </div>
//                                                         );
//                                                     })
//                                                 }

//                                             </div>
//                                         )}
//                                     </div>
//                                 ) :
//                                 <div className='flex justify-center items-center'>
//                                     <p className='text-[18px] font-[500]'> No results Found</p>
//                                 </div>

//                             }
//                                       </div>

//                                 <p className={`absolute lg:top-[-30px]  md:top-[-30px]  xs:top-[-40px] ${lang === 'ar' ? ' lg:left-[-40px]  md:left-[-40px] xs:left-[0px]':' lg:right-[-40px]  md:right-[-40px] xs:right-[0px]'}`}>
//                                     < ClearIcon onClick={() => { setShowPdf(false) }} style={{ color: 'white', fontSize: '30px', cursor: 'pointer' }} />
//                                     {/* <a
//                                         href={`${base_url}/api/download/${brandFile}`}
//                                         download
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <img src={downloadBlackIcon} className='w-[30px]' alt="Download Icon" />
//                                     </a> */}

//                                 </p>
//                             </Box>
//                         </Modal>
//                         <Footer isLang={lang}/>
//                     </>

//             }
//         </>
//     )

// }

// -------------------- Updated Arabic Content ---------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ConfigToken } from "../Auth/ConfigToken";
import { base_url } from "../Auth/BackendAPIUrl";
import { Footer } from "../Common/Footer/Footer";
import { Navbar } from "../Common/Navbar/Navbar";
import ltIcon from "../../Images/lt_icon.svg";
import gtIcon from "../../Images/gt_icon.svg";
import editIcon from "../../Images/edit_icon.svg";
import dashboard from "../../json/dashboard.json";
import reload from "../../Images/reload.svg";
import { format } from "date-fns";
import starIcon from "../../Images/star.svg";
import paperPlane from "../../Images/paper plane.svg";
import greenStarIcon from "../../Images/greenStar.svg";
import {
  isBefore,
  addDays,
  parseISO,
  differenceInSeconds,
  addSeconds,
} from "date-fns";
import downloadIcon from "../../Images/downloadIcon.svg";
import ItemWaitingIcon from "../../Images/orderItemWaiting.svg";
import ItemProgressIcon from "../../Images/orderItemProgress.svg";
import ItemFinishedIcon from "../../Images/orderItemFinished.svg";
import downloadBlackIcon from "../../Images/downloadIconBlack.svg";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Popup } from "../Common/Popup/Popup";
import { DashboardPopup } from "../Common/Popup/DashboardPopup";
import { redirect, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bgloader } from "../Common/Background/Bgloader";
import Loader from "../../Images/Home/load sticker.png";
import DoneIcon from "@mui/icons-material/Done";
import { BorderAllRounded } from "@mui/icons-material";
import { processArabicText } from "../Utils/arabicFontParenthesisChecker";
import workOurGIF from "../../Images/ourWorkGIF.gif";
import workBrandGIF from "../../Images/ourWorkBranding.gif";
import {
  fetchQuestionAnswer,
  updateOrderID,
} from "../Questionnarie/questionnaire.slice";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window?.innerWidth <= 500 ? "90%" : "50%",
  height: "75vh",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  display: "flex",
  padding: "2% 2%",
  flexDirection: "column",
  // borderRadius:'4px'
};
export default function Dashboard({ lang, setLang }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectToEdit, setProjectEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [reOrderId, setReOrderId] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [completePopup, setCompletePopup] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [Files, setFiles] = useState([]);
  const [Links, setLinks] = useState([]);
  const [showPdf, setShowPdf] = useState(false);
  const [addOnFile, setAddonFile] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [counter, setCounter] = useState(0);
  const [processIndex, setProcessIndex] = useState(0);
  const [order, setOrder] = useState({});
  const [dashboardJson, setDashboardJson] = useState(dashboard);
  const [purchased, setPurchased] = useState("not");
  const ProcessIndexDict = [
    "purchase",
    "questionnaire_required",
    "in_progress",
    "send_for_approval",
    "add_ons",
    "content_uploaded",
  ];
  const [isApproveBrand, setIsApproveBrand] = useState(false);
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let purchase_id = queryParams.get("purchase", null);
  const [purchasePopUp, setPurchasePopUp] = useState(
    purchased == "done" ? true : false
  );
  const [showFull, setShowFull] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const orderId = Number(params.get("order_id"));

  const checkPurchase = async () => {
    const response = await axios.get(
      `${base_url}/api/order/${purchase_id}/`,
      ConfigToken()
    );

    if (response.data.data.payment_status) {
      setPurchasePopUp(true);
    } else {
      navigate("/mycart");
    }
  };

  const getprojects = async (id = null) => {
    const response = await axios.get(`${base_url}/api/order/`, ConfigToken());
    if (purchase_id) {
      checkPurchase();
    }

    if (response.data) {
      const resProjects = response.data.data.filter(
        (item) => item.order_status != "in_cart"
      );
      // const resProjects = response.data.data.filter(item => item.order_status != 'completed' && item.order_status != 'in_cart')
      setProjects(resProjects);
      setPurchases(
        response.data.data.filter((item) => item.order_status != "in_cart")
      );
      if (resProjects.length) {
        getOrderDetails(id ? id : orderId ? orderId : resProjects[0].id);
      }
    }
    setLoading(false);
  };

  const getOrderDetails = async (orderId) => {
    localStorage.removeItem("reduxState");
    localStorage.removeItem("orderId");
    dispatch(fetchQuestionAnswer([]));
    dispatch(updateOrderID(""));
    setCurrentTab(orderId);
    const response = await axios.get(
      `${base_url}/api/order/${orderId}/`,
      ConfigToken()
    );
    const orderData = response.data.data;
    if (orderData) {
      orderData.item_details = orderData.item_details = [
        ...(orderData.item_details.bundle_items || []),
        ...(orderData.item_details.addon_items || []),
      ];
      setOrder(orderData);
      const index = ProcessIndexDict.indexOf(
        ProcessIndexDict.find((key) => key == orderData.order_status)
      );
      if (orderData.order_status == "custom_in_progress") {
        setIsEdit(true);
        setProcessIndex(1);
      }
      if (
        orderData.order_status == "in_review" ||
        orderData.order_status == "completed"
      ) {
        setProcessIndex(ProcessIndexDict.length - 1);
      } else if (orderData.order_status == "content_uploaded") {
        setProcessIndex(index - 1);
      } else {
        setProcessIndex(index);
      }
      if (orderData.content_uploaded_date) {
        const uploadedDateObj = parseISO(orderData.content_uploaded_date);
        const oneDayLater = addDays(uploadedDateObj, 1);
        if (
          isBefore(new Date(), oneDayLater) &&
          orderData?.next_status !== "in_progress"
        ) {
          setIsEdit(true);
          setCounter(differenceInSeconds(oneDayLater, new Date()));
        }
        if (
          orderData.order_status == "in_progress" &&
          orderData.next_status !== "in_progress"
        )
          setProcessIndex(1);
        if (orderData.order_status == "custom_in_progress") setProcessIndex(1);
      }
      if (
        orderData.order_status == "send_for_approval" ||
        orderData.order_status == "add_ons" ||
        orderData.order_status == "in_review" ||
        orderData.order_status == "completed" ||
        orderData.order_status == "content_uploaded"
      ) {
        // const parts = response.data.order_items_managements[0]?.delivery_files.length ? response.data.order_items_managements[0]?.delivery_files[0].split('/') : null
        // parts && setBrandFile(parts[parts.length - 1])

        // const brandFiles = response.data.order_items_managements
        // .flatMap(item => item?.delivery_files || []) // Flatten the array and remove undefined/null
        // .map(file => file.split('/').pop()); // Get only the file name
        let files = [];
        let links = [];
        // response.data.order_items_managements.forEach(item => {
        //     console.log(item)
        //     if (item.delivery_type === "File" && item.delivery_files) {
        //         files.push(...item?.delivery_files?.map(file => decodeURIComponent(file).split('/').pop()));
        //     } else if (item.delivery_type === "Link" && item.delivery_files) {
        //         links.push(item.delivery_link);
        //     }
        // });
        const extractFilesAndLinks = (items) => {
          items.forEach((item) => {
            const formattedDate = item.created_at
              ? new Date(item.created_at).toLocaleDateString("en-GB") // Format: DD/MM/YYYY
              : "-";
            if (item.delivery_type === "File" && item.delivery_files) {
              files.push(
                ...item.delivery_files.map((file) => ({
                  created_at: formattedDate || "",
                  data: decodeURIComponent(file).split("/").pop(),
                }))
              );
              // files.push(
              //     ...item.delivery_files.map((file) => {
              //       const fileName = decodeURIComponent(file).split("/").pop();
              //       console.log( fileName.replace(/-\d{4}-\d{2}-\d{2} \d{6}/, "").trim() )
              //       return fileName.replace(/-\d{13,}-\d+/, "").trim(); // Removes timestamp + random number
              //     })
              //   );
            } else if (item.delivery_type === "Link" && item.delivery_link) {
              links.push({
                created_at: formattedDate || "",
                data: item.delivery_link,
              });
            }
          });
        };

        // Extract from order_items_managements
        if (response.data.order_items_managements) {
          extractFilesAndLinks(response.data.order_items_managements);
        }

        // Extract from adjustment_items
        if (response.data.adjustment_items) {
          extractFilesAndLinks(response.data.adjustment_items);
        }
        setFiles(files);
        setLinks(links);
      }
    }
  };

  const fillQuestionaire = () => {
    navigate("/questionnaire/1", {
      state: {
        orderId: order.id,
      },
    });
  };
  const CheckCart = async (id) => {
    const response = await axios.get(
      `${base_url}/api/order/cart/`,
      ConfigToken()
    );
    if (response.status === 206) {
      reOrder(id);
    } else {
      setReOrderId(id);
      setOpenPopup(true);
    }
  };
  const approveBrand = async () => {
    const json = { status: "add_ons" };
    setIsApproveBrand(true);
    const response = await axios.post(
      `${base_url}/api/order_update/${order.id}/`,
      json,
      ConfigToken()
    );
    setIsApproveBrand(false);
    getOrderDetails(order.id);
  };
  const completeOrder = async () => {
    const json = { status: "completed" };
    const response = await axios.post(
      `${base_url}/api/order_update/${order.id}/`,
      json,
      ConfigToken()
    );
    setCompletePopup(true);
    getprojects();
  };

  const reOrder = async (id) => {
    const response = await axios.get(
      `${base_url}/api/reorder/${id}/`,
      ConfigToken()
    );
    window.location.href = "/mycart";
  };

  const renderContent = () => {
    const expectedDate = order.dead_line
      ? format(order.dead_line, "dd/MM/yy")
      : null;
    const hours = Math.floor(counter / 3600);
    const minutes = Math.floor((counter % 3600) / 60);
    const seconds = counter % 60;

    // Format into HH:mm:ss
    const formattedCounter = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    switch (order.order_status) {
      // switch ('send_for_approval') {

      case "questionnaire_required":
        return (
          <div className="text-center">
            <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
              {lang === "ar"
                ? dashboardJson.process_content.questionnaire_arabic
                : dashboardJson.process_content.questionnaire}
            </h2>
            <button
              onClick={() => fillQuestionaire()}
              className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2 xs:min-w-[200px] lg:min-w-0 md:min-w-0 uppercase"
            >
              {lang === "ar"
                ? dashboardJson.process_content.questionnaire_fill_arabic
                : dashboardJson.process_content.questionnaire_fill}
            </button>
          </div>
        );

      case "custom_in_progress":
        if (isEdit) {
          return (
            <div className="text-center">
              <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
                {lang === "ar" ? "لديك" : "You have"}{" "}
                <span className="text-[#1BA56F]">{formattedCounter}</span>{" "}
                {lang === "ar"
                  ? " لتعديل الاستبيان"
                  : "to edit your questionnaire"}
              </h2>
              <p className="xs:w-[99%] sm:w-full md:w-full text-[18px] text-[#1BA56F] font-medium">
                {lang === "ar"
                  ? dashboardJson.process_content
                      .questionnaire_edit_content_arabic
                  : dashboardJson.process_content.questionnaire_edit_content}
              </p>
              <button
                onClick={() => fillQuestionaire()}
                className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2 uppercase"
              >
                {lang === "ar"
                  ? dashboardJson.process_content
                      .questionnaire_edit_action_arabic
                  : dashboardJson.process_content.questionnaire_edit_action}
              </button>
            </div>
          );
        }
        return (
          <div className="text-center flex items-center flex-col">
            <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000] lg:w-[100%] md:w-[100%] xs:w-[90%]">
              {lang === "ar"
                ? dashboardJson.process_content.design_brand_arabic
                : dashboardJson.process_content.design_brand}
            </h2>
            <p className="xs:w-[99%] sm:w-full md:w-full text-[18px] text-[#1BA56F] font-medium">
              {lang === "ar"
                ? dashboardJson.process_content.expected_date_arabic
                : dashboardJson.process_content.expected_date}{" "}
              {expectedDate}
            </p>
          </div>
        );

      case "in_progress":
        if (isEdit) {
          return (
            <div className="text-center">
              <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
                {lang === "ar" ? "لديك" : "You have"}{" "}
                <span className="text-[#1BA56F]">{formattedCounter}</span>{" "}
                {lang === "ar"
                  ? " لتعديل الاستبيان"
                  : "to edit your questionnaire"}
              </h2>
              <p className="xs:w-[99%] sm:w-full md:w-full text-[18px] text-[#1BA56F] font-medium">
                {lang === "ar"
                  ? dashboardJson.process_content
                      .questionnaire_edit_content_arabic
                  : dashboardJson.process_content.questionnaire_edit_content}
              </p>
              <button
                onClick={() => fillQuestionaire()}
                className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2 uppercase"
              >
                {lang === "ar"
                  ? dashboardJson.process_content
                      .questionnaire_edit_action_arabic
                  : dashboardJson.process_content.questionnaire_edit_action}
              </button>
            </div>
          );
        }
        return (
          <div className="text-center flex items-center flex-col">
            <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000] lg:w-[100%] md:w-[100%] xs:w-[90%]">
              {lang === "ar"
                ? dashboardJson.process_content.design_brand_arabic
                : dashboardJson.process_content.design_brand}
            </h2>
            <p className="xs:w-[99%] sm:w-full md:w-full text-[18px] text-[#1BA56F] font-medium">
              {lang === "ar"
                ? dashboardJson.process_content.expected_date_arabic
                : dashboardJson.process_content.expected_date}{" "}
              {expectedDate}
            </p>
          </div>
        );

      case "send_for_approval":
        return (
          <div className="text-center">
            <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
              {dashboardJson.process_content.approve_brand_content}
            </h2>
            <p className="flex justify-center w-full">
              <button
                onClick={() => {
                  setShowPdf(true);
                }}
                className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase"
              >
                <img
                  className={`${lang === "ar" ? "ml-2" : "mr-2"}`}
                  src={downloadIcon}
                  alt="Download Icon"
                />
                {lang === "ar" ? "اضغط هنا للتحميل" : "Click Here to Download"}
              </button>
            </p>
            <p className="flex flex-wrap justify-center gap-2 mt-2">
              <button
                onClick={() => {
                  navigate("/adjustment", {
                    state: { orderId: order.id, orderItemId: null },
                  });
                }}
                className={`px-3 py-1 text-[#1BA56F] font-[500] border !border-[#1BA56F] text-[16px] ${
                  lang === "ar" ? "ml-2" : "mr-2"
                }`}
              >
                {lang === "ar"
                  ? dashboardJson.process_content.request_edit_arabic
                  : dashboardJson.process_content.request_edit}
              </button>
              <button
                onClick={() => approveBrand()}
                className="bg-[#1BA56F] px-3 py-1 font-[500] text-[#fff] text-[16px] uppercase"
              >
                {lang === "ar"
                  ? dashboardJson.process_content.approve_brand_arabic
                  : dashboardJson.process_content.approve_brand}
              </button>
            </p>
          </div>
        );

      case "add_ons":
        return (
          <div className="text-center">
            <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000] lg:w-[100%] md:w-[100%] xs:w-[400px]">
              {lang === "ar"
                ? dashboardJson.process_content.addons_arabic
                : dashboardJson.process_content.addons}
            </h2>
            {order?.bundle_id !== null && (
              <p className="flex mt-3 justify-center w-full">
                <button
                  onClick={() => {
                    setShowPdf(true);
                  }}
                  className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase"
                >
                  <img
                    className={`${lang === "ar" ? "ml-2" : "mr-2"}`}
                    src={downloadIcon}
                    alt="Download Icon"
                  />
                  {lang === "ar"
                    ? "اضغط هنا للتحميل"
                    : "Click Here to Download"}
                </button>
              </p>
            )}
            <p>
              <button
                onClick={() =>
                  (window.location.href = `/upload-content/${order.id}`)
                }
                className="bg-[#1BA56F] lg:px-4 md:px-4 xs:px-[10%] py-1 text-[#fff] text-[16px] mt-2 uppercase"
              >
                {lang === "ar"
                  ? dashboardJson.process_content.upload_content_arabic
                  : dashboardJson.process_content.upload_content}
              </button>
            </p>

            {processIndex >= 4 && (
              <button
                className="bg-[#1BA56F] px-4 py-2 text-[16px] text-white font-[400] uppercase md:hidden lg:hidden"
                onClick={() =>
                  navigate("/adjustment", {
                    state: {
                      orderId: order.id,
                      orderItemId: null,
                      purchaseAddOns: true,
                    },
                  })
                }
              >
                {lang === "ar" ? "شراء إضافات" : "Purchase Add Ons"}
              </button>
            )}
          </div>
        );

      case "content_uploaded":
        return (
          <div className="text-center">
            <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
              {lang === "ar"
                ? dashboardJson.process_content.receive_designs_arabic
                : dashboardJson.process_content.receive_designs}
            </h2>
            <p className="flex justify-center w-full">
              <button
                onClick={() => {
                  setShowPdf(true);
                }}
                className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase"
              >
                <img
                  className={`${lang === "ar" ? "ml-2" : "mr-2"}`}
                  onClick={() => {}}
                  src={downloadIcon}
                  alt="Download Icon"
                />
                {lang === "ar" ? "اضغط هنا للتحميل" : "Click Here to Download"}
              </button>
            </p>
            <p className="xs:w-[99%] sm:w-full md:w-full text-[18px] text-[#1BA56F] font-medium">
              {lang === "ar"
                ? dashboardJson.process_content.expected_date_arabic
                : dashboardJson.process_content.expected_date}{" "}
              {expectedDate}
            </p>
          </div>
        );

      case "in_review":
        return (
          <div className="text-center flex items-center flex-col">
            <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000] lg:w-[100%] md:w-[100%] xs:w-[80%]">
              {lang === "ar"
                ? dashboardJson.process_content.file_send_arabic
                : dashboardJson.process_content.file_send}
            </h2>
            <p className="flex justify-center w-full">
              <button
                onClick={() => {
                  setShowPdf(true);
                }}
                className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase"
              >
                <img
                  className={`${lang === "ar" ? "ml-2" : "mr-2"}`}
                  onClick={() => {}}
                  src={downloadIcon}
                  alt="Download Icon"
                />
                {lang === "ar" ? "اضغط هنا للتحميل" : "Click Here to Download"}
              </button>
            </p>
            <p>
              {order.order_status === "completed" ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    completeOrder();
                  }}
                  className="bg-[#1BA56F] px-2 py-1 text-[#fff] text-[16px] mt-2 uppercase"
                >
                  {lang === "ar"
                    ? dashboardJson.process_content.mark_complete_arabic
                    : dashboardJson.process_content.mark_complete}
                </button>
              )}
            </p>
          </div>
        );
      case "completed":
        return (
          <div className="text-center">
            <h2 className="lg:text-[22px] md:text-[22px] xs:text-[18px] xs:px-[10%] text-[#000000]">
              {lang === "ar"
                ? dashboardJson.process_content.file_send_arabic
                : dashboardJson.process_content.file_send}
            </h2>
            <p className="flex justify-center w-full">
              <button
                onClick={() => {
                  setShowPdf(true);
                }}
                className="border-b-2 border-[#1BA56F] pb-0 font-medium text-[#1BA56F] flex items-center uppercase"
              >
                <img
                  className={`${lang === "ar" ? "ml-2" : "mr-2"}`}
                  onClick={() => {}}
                  src={downloadIcon}
                  alt="Download Icon"
                />
                {lang === "ar" ? "اضغط هنا للتحميل" : "Click Here to Download"}
              </button>
            </p>
          </div>
        );

      default:
        return "";
    }
  };

  const renderProcessData = () => {
    return ProcessIndexDict.map((key, index) => {
      const isCurrentProcess = index === processIndex;
      const isPreviousProcess = index < processIndex;
      const isLast = index === ProcessIndexDict.length - 1;

      // Common classes for the containers
      // const containerClasses = `flex relative mt-[3%] ${!isLast ? 'basis-1/5' : ''} items-center`;
      const containerClasses = `flex relative ${
        lang === "ar"
          ? "lg:right-[0px] md:right-[30px] xs:right-0"
          : "lg:left-[0px] md:left-[30px] xs:left-0"
      } mt-[3%] ${
        !isLast
          ? "lg:basis-[45%] md:basis-[20%] xs:basis-1/5"
          : "md:w-[75px] lg:w-[165px] xs:w-[75px]"
      } items-center`;

      // Determine the image and line styles based on process state
      let iconSrc = starIcon; // Default icon
      let lineClasses = "border-t-2 border-[#00000080]"; // Default line
      let lineBorderClass = "";

      if (isCurrentProcess) {
        iconSrc = paperPlane;
      } else if (isPreviousProcess) {
        iconSrc = greenStarIcon;
        lineBorderClass = "!border-[#1BA56F]"; // Green line for previous process
      }
      return (
        <div className={containerClasses} key={index}>
          <img
            className={`m-0 absolute ${
              isPreviousProcess || isCurrentProcess
                ? window.innerWidth <= 475 && isCurrentProcess
                  ? `top-[-20px] ${
                      lang === "ar"
                        ? `right-[-10px] ${isCurrentProcess && "scale-x-[-1]"}`
                        : "left-[-10px] "
                    }`
                  : `top-[-25px] ${
                      lang === "ar"
                        ? `right-[-10px] ${isCurrentProcess && "scale-x-[-1]"}`
                        : "left-[-10px]"
                    }`
                : `top-[-10px] ${
                    lang === "ar"
                      ? `right-[-10px] ${isCurrentProcess && "scale-x-[-1]"}`
                      : "left-[-10px]"
                  }`
            }`}
            src={iconSrc}
            alt={`Process Icon ${index}`}
          />
          {!isLast && (
            <div className="m-auto w-full">
              <div className={`w-full ${lineClasses} ${lineBorderClass}`}></div>
            </div>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    // Wait for 2 seconds, then hide the loader
    if (purchase_id) {
      const timer = setTimeout(() => {
        getprojects();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      getprojects();
    }
    // Cleanup the timer to avoid memory leaks
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      setIsEdit(false);
      return;
    }

    const timer = setInterval(() => {
      setCounter((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [counter]);

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/profile/`,
          ConfigToken()
        );

        // Function to format the name
        const formatName = (name) => {
          return name
            .split(" ") // Split the name by spaces
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ) // Capitalize first letter of each word
            .join(" "); // Join back into a single string
        };

        // Format the full name before setting state
        const formattedUser = {
          ...response.data,
          full_name: formatName(response.data?.full_name || ""),
        };

        setCurrentUser(formattedUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getAuthUser();
  }, []); // Add dependencies if needed

  const nameChange = async () => {
    const response = await axios.patch(
      `${base_url}/api/order-name/${projectToEdit}/`,
      { project_name: projectName },
      ConfigToken()
    );
    purchase_id = null;
    getprojects(projectToEdit);
    setProjectEdit(null);
    setProjectName(null);
  };

  const handleSelectChange = async (event) => {
    const id = event.target.value;
    await getOrderDetails(id);
  };

  //     const handleDownload = (file) => {
  //         // const aTag = document.createElement('a');
  //         // aTag.href = `${base_url}/api/download/${file}`;
  //         // aTag.target = "_blank";
  //         // aTag.download = file;
  //         // aTag.click()

  //         const link = document.createElement("a");
  //   link.href = `${base_url}/api/download/${file}`; // Replace with your file URL
  //   link.download = file; // Suggested file name
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //     };
  const handleDownload = async (file) => {
    try {
      const response = await fetch(`${base_url}/api/download/${file}`, {
        method: "GET",
        headers: {
          // Add authentication headers if needed
          // Authorization: `Bearer your_token_here`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = file.replace(/-\d{13,}-\d+/, "").trim();
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Bgloader />
      ) : (
        <>
          <Navbar isLang={lang} setIsLang={setLang} />
          <div>
            {isApproveBrand && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  // backgroundColor: "transparent",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: "auto",
                  userSelect: "none",
                  zIndex: 9999,
                }}
              >
                {/* <img
                        src={ourWorkBranding}
                        alt="loader-round-icon"
                        style={{ width: 200, height: 200 }}
                        className="loader"
                      /> */}
                <img
                  className="loader"
                  src={Loader}
                  alt="loader-round-icon"
                ></img>
              </div>
            )}
          </div>
          {openPopup && (
            <DashboardPopup
              openpopup={openPopup}
              isCancel={false}
              setPopup={setOpenPopup}
              title={lang === "ar" ? "إفراغ السلة" : "Empty your Cart"}
              // subTitle={'Are you sure, you want to empty the cart.'}
              onClick={() => reOrder(reOrderId)}
              save={lang === "ar" ? "نعم" : "Yes"}
              cancel={lang === "ar" ? "الإلغاء" : "Cancel"}
            />
          )}
          {purchasePopUp && (
            <DashboardPopup
              openpopup={purchasePopUp}
              isCancel={true}
              setPopup={setPurchasePopUp}
              title={
                lang === "ar" ? "شكرا لطلبك!" : "Thank you for your purchase"
              }
              subTitle={
                lang === "ar"
                  ? "خلينا نبدأ أول خطوة في رحلتك الإبداعية"
                  : "We're so happy you're here! Let's create something amazing together."
              }
              onClick={() => {
                setPurchasePopUp(false);
                navigate(`/dashboard?order_id=${purchase_id}`);
              }}
              save={
                lang === "ar"
                  ? "الذهاب إلى لوحة التحكم​"
                  : "CONTINUE TO DASHBOARD"
              }
              // cancel={'Cancel'}
            />
          )}
          {completePopup && (
            <DashboardPopup
              openpopup={completePopup}
              isCancel={true}
              setPopup={setCompletePopup}
              title={lang === "ar" ? "وصلنا للنهاية!" : "And that’s a wrap!"}
              subTitle={
                lang === "ar"
                  ? "أنهينا مشروع التصميم! كانت تجربة ممتعة ومليئة بالإبداع. استمتع بالملفات."
                  : "That's a wrap on the design project! It's been a fun and creative process. Enjoy the files."
              }
              onClick={() => window.location.reload()}
              save={
                lang === "ar"
                  ? "الذهاب إلى لوحة التحكم​"
                  : "CONTINUE TO DASHBOARD"
              }
            />
          )}
          <div className="font-Helvetica">
            <div className="text-center py-2 border-b border-black">
              <h1 className="lg:text-[38px] text-[#000] md:text-[30px] xs:text-[30px] xs:font-[700] lg:mt-[2%] md:mt-[2%] xs:mt-[5%]">
                {" "}
                {lang === "ar"
                  ? dashboardJson?.main_title_arabic
                  : dashboardJson.main_title}{" "}
                {currentUser?.full_name}!{" "}
              </h1>
              <p className="lg:text-[18px] md:text-[16px] text-[#00000080] lg:block md:block xs:hidden sm:hidden">
                {lang === "ar"
                  ? dashboardJson?.title_content_arabic
                  : dashboardJson.title_content}{" "}
              </p>
            </div>

            {projects.length ? (
              <div className=" border-black  lg:py-16 md:py-16 xs:py-8 lg:px-14 md:px-14 xs:px-0 ">
                {window.innerWidth <= 475 ? (
                  <div className="w-[100%] flex px-[5%]">
                    <p className="text-[#000000] opacity-[50%] text-[20px] font-[500] font-Helvetica  w-[70%]">
                      {lang === "ar" ? "باقاتي" : "My Bundls"}
                    </p>
                    <div
                      className={`w-[30%] ${
                        lang === "ar" ? "text-left" : "text-right"
                      } mt-[0%]`}
                    >
                      <button
                        onClick={() => {
                          window.location.href = "/";
                        }}
                        className="bg-black text-white h-[35px] w-[35px] text-[22px]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <h1 className="lg:text-[32px] md:text-[24px] flex mb-4 xs:px-0">
                    {" "}
                    <span className="mr-2">
                      {lang === "ar"
                        ? dashboardJson.second_title_arabic
                        : dashboardJson.second_title}
                    </span>{" "}
                    <img
                      className={`${
                        lang === "ar" ? "scale-x-[-1]" : "scale-x-[1]"
                      } mr-2`}
                      src={ltIcon}
                    ></img>{" "}
                    <img
                      className={`${
                        lang === "ar" ? "scale-x-[-1] mr-2" : "scale-x-[1]"
                      } `}
                      src={gtIcon}
                    ></img>{" "}
                  </h1>
                )}

                <p className="flex lg:overflow-auto md:overflow-auto xs:overflow-hidden mb-0">
                  {window.innerWidth > 768 ? (
                    projects.map((project) => {
                      return (
                        <button
                          onClick={(e) => getOrderDetails(project.id)}
                          className={`py-1 px-4 min-w-fit border-[2px] !border-[#1BA56F] ${
                            project.id == currentTab
                              ? "bg-[#1BA56F] text-white"
                              : "bg-white text-[#1BA56F]"
                          }
                                                    flex justify-around items-center border-r-0`}
                        >
                          {projectToEdit === project.id ? (
                            <>
                              <input
                                className="px-2 py-1 !text-black w-full rounded-none"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                              />
                              <button onClick={() => nameChange()}>
                                <DoneIcon className="ml-2" />
                              </button>
                            </>
                          ) : (
                            <>
                              {project.project_name}
                              {project.id === currentTab && (
                                <img
                                  width="15px"
                                  className={`${
                                    lang === "ar" ? "mr-2" : "ml-2"
                                  }`}
                                  src={editIcon}
                                  onClick={() => {
                                    setProjectEdit(project.id);
                                    setProjectName(project.project_name);
                                  }}
                                  alt="Edit Icon"
                                />
                              )}
                            </>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    // <div className="xs:px-[5%] xs:flex xs:w-[100%]">
                    //   {/* <div className="select-container"> */}
                    //   <select
                    //     id="dashboardSelect"
                    //     className="w-[25%] h-[45px] text-[32px] font-[700] outline-none border-none px-0 rounded-none appearance-none "
                    //     onChange={(e) => handleSelectChange(e)}
                    //   >
                    //     {projects?.map((project, index) => (
                    //       <option
                    //         className="text-[16px] font-[500] "
                    //         key={index}
                    //         value={project.id}
                    //       >
                    //         {project.project_name}
                    //       </option>
                    //     ))}
                    //   </select>
                    //   {/* </div> */}
                    // </div>
<div className="xs:px-[5%] xs:flex xs:w-full">
  <select
    id="dashboardSelect"
    className="w-[75%] h-[45px] text-[24px] font-[700]
               outline-none border border-gray-400
               pr-8 pl-2 rounded-none shadow-none appearance-none truncate"
    onChange={(e) => handleSelectChange(e)}
  >
    {projects?.map((project, index) => (
      <option
        className="text-[16px] font-[500] truncate"
        key={index}
        value={project.id}
      >
        {project.project_name.length > 14
          ? `${project.project_name.slice(0, 14)}...`
          : project.project_name}
      </option>
    ))}
  </select>
</div>

                  )}

                  {window?.innerWidth >= 475 && (
                    <button
                      onClick={() => {
                        window.location.href = "/";
                      }}
                      className="lg:py-2 lg:px-2 lg:sticky lg:right-0 md:sticky md:right-0 flex bg-black text-white items-center lg:text-[32px] md:text-[24px] leading-[0px]  xs:text-[24px] xs:py-4 xs:px-4 xs:relative xs:left-[0%]"
                    >
                      +
                    </button>
                  )}
                </p>
                {window.innerWidth < 768 && (
                  <div className="px-[5%] mt-2 font-Helvetica">
                    <p className="px-32text-[18px] font-[400] opacity-50">
                      {processIndex + 1}/{dashboardJson.project_process.length}{" "}
                      -{" "}
                      {lang === "ar"
                        ? dashboardJson.project_process_arabic[processIndex]
                        : dashboardJson.project_process[processIndex]}
                    </p>
                  </div>
                )}
                <div className="lg:border-[1.5px] md:border-[1.5px] xs:border-b-[1.5px] mt-0  lg:border-black md:border-black border-transparent py-2 lg:px-6 md:px-6 xs:px-0 xs:border-black">
                  <div
                    className={`flex items-center macm1:w-[80%] lg:w-[78%] w-[80%] md:w-[87%]   lg:mx-auto md:mx-auto lg:mt-10 md:mt-10 xs:mt-2 lg:px-0 ${
                      processIndex === 5 ? "xs:w-[100%]" : "xs:w-[108%]"
                    } xs:px-[2%] xs:ml-[2%]`}
                  >
                    {renderProcessData()}
                  </div>
                  <div
                    className={`flex ${
                      lang === "ar"
                        ? " macm1:p-[0px_0px_0px_40px] lg:p-[0px_0px_0px_30px] md:p-[15px_70px_0px_15px] macm2:p-[0px_0px_0px_35px]"
                        : "macm1:p-[0px_40px_0px_0px] lg:p-[0px_30px_0px_0px] md:p-[15px_15px_0px_70px] macm2:p-[0px_35px_0px_0px]"
                    }  mb-12 lg:w-[90%] w-[80%] md:w-[100%] xs:w-[100%] lg:m-auto md:m-0`}
                  >
                    {/* <div className={`flex ${lang === 'ar' ?' macm1:p-[0px_0px_0px_40px] lg:p-[0px_0px_0px_30px] md:p-[15px_70px_0px_15px] macm2:p-[0px_0px_0px_35px]':'macm1:p-[0px_40px_0px_0px] lg:p-[0px_30px_0px_0px] md:p-[15px_15px_0px_70px] macm2:p-[0px_35px_0px_0px]'}  mb-12 lg:w-[90%] w-[80%] md:w-[100%] xs:w-[100%] lg:m-auto md:m-0`}> */}
                    {window.innerWidth > 768 &&
                      (lang === "ar"
                        ? dashboardJson.project_process_arabic
                        : dashboardJson.project_process
                      )?.map((item, index) => {
                        return (
                          <div className="lg:basis-[45%]  md:basis-[20%] xs:basis-1/5 text-center lg:text-[16px] md:text-[14px] mt-[2%]">
                            {" "}
                            {item === "Add Ons" ? (
                              <div
                                className={`${
                                  index == processIndex && lang === "En"
                                    ? "ml-[10%]"
                                    : processIndex == 5 && lang === "En"
                                    ? "ml-[10%]"
                                    : "ml-[3%]"
                                }`}
                              >
                                <p
                                  className={`pb-0 lg:max-w-[75%] md:max-w-[75%] macm2:w-[70%] max-w-[95%] lg:mx-auto md:mx-0 xs:mx-auto mb-0 ${
                                    index == processIndex && "font-bold"
                                  }`}
                                >
                                  {" "}
                                  {item}{" "}
                                </p>
                                {index == processIndex && (
                                  <p className="text-[#1BA56F] font-[700] lg:text-center md:text-justify ml-0">
                                    {lang === "ar"
                                      ? "أنت الآن هنا !"
                                      : "You’re now Here!"}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <>
                                <p
                                  className={`pb-0 lg:max-w-[75%] md:max-w-[75%] macm2:w-[70%] max-w-[95%] lg:mx-auto md:mx-0 xs:mx-auto mb-0 ${
                                    index == processIndex && "font-bold"
                                  }`}
                                >
                                  {" "}
                                  {item}{" "}
                                </p>
                                {index == processIndex && (
                                  <p className="text-[#1BA56F] font-[700] lg:text-center md:text-justify ml-0">
                                    {lang === "ar"
                                      ? "أنت الآن هنا !"
                                      : "You’re now Here!"}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                  </div>
                  <div className="my-4">{renderContent()}</div>
                  <div className="lg:w-[100%] md:w-[100%] xs:w-[100%] lg:px-[5%] md:px-[5%] xs:mx-0 xs:px-6">
                    {order &&
                      order.item_details &&
                      Array.isArray(order.item_details) && (
                        <>
                          {order?.brand_identity && (
                            <>
                              <div className="flex items-center justify-between w-full">
                                {/* Heading */}
                                <p
                                  className={`lg:text-[22px] md:text-[22px] xs:text-[18px] font-bold my-2 ${
                                    processIndex < 2
                                      ? processIndex === 1 &&
                                        order?.order_status !== "in_progress"
                                        ? "text-[#00000080]"
                                        : "text-black"
                                      : "text-black"
                                  }`}
                                >
                                  {lang === "ar"
                                    ? "الهوية البصرية"
                                    : "Brand & Visual Identity"}
                                  <span className="text-[#1BA56F] lg:text-[18px] md:text-[18px] xs:text-[16px] font-[500]">
                                    {" "}
                                    -&nbsp;
                                    {processIndex < 2
                                      ? processIndex === 1 &&
                                        order?.order_status !== "in_progress"
                                        ? lang === "ar"
                                          ? "قيد الانتظار"
                                          : "ON HOLD"
                                        : lang === "ar"
                                        ? "قيد التنفيذ"
                                        : "IN PROGRESS"
                                      : processIndex >= 4
                                      ? lang === "ar"
                                        ? "مكتمل"
                                        : "COMPLETE"
                                      : lang === "ar"
                                      ? "قيد التنفيذ"
                                      : "IN PROGRESS"}
                                  </span>
                                </p>

                                {/* Purchase Add Ons button */}
                                {processIndex >= 4 && (
                                  <button
                                    className=" hidden md:block bg-[#1BA56F] px-4 py-2 text-[16px] text-white font-[400] uppercase"
                                    onClick={() =>
                                      navigate("/adjustment", {
                                        state: {
                                          orderId: order.id,
                                          orderItemId: null,
                                          purchaseAddOns: true,
                                        },
                                      })
                                    }
                                  >
                                    {lang === "ar"
                                      ? "شراء إضافات"
                                      : "Purchase Add Ons"}
                                  </button>
                                )}
                              </div>

                              <div className="flex items-center justify-between w-full">
                                {/* Left side: Text + Left button */}
                                <div className="flex items-center gap-4">
                                  <p
                                    className={`font-[600] lg:text-[18px] md:text-[18px] xs:text-[16px] m-0 ${
                                      processIndex < 2
                                        ? processIndex === 1 &&
                                          order?.order_status !== "in_progress"
                                          ? "text-[#00000080]"
                                          : "text-black"
                                        : "text-[#000]"
                                    }`}
                                  >
                                    {lang === "ar"
                                      ? processArabicText(
                                          order?.brand_identity
                                            ?.item__name_arabic
                                        )
                                      : order?.brand_identity?.item_name}
                                  </p>
                                  {processIndex >= 4 && (
                                    <button
                                      className="bg-[#1BA56F] px-2 py-1 text-[14px] text-white font-[400] uppercase"
                                      onClick={() => {
                                        navigate("/adjustment", {
                                          state: {
                                            orderId: order.id,
                                            orderItemId: null,
                                            purchaseAddOns: false,
                                          },
                                        });
                                      }}
                                    >
                                      {lang === "ar"
                                        ? "طلب تعديلات"
                                        : "Request Edits"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                          <p
                            className={`text-[22px] ${
                              processIndex < 4 && "text-[#00000080]"
                            } font-bold my-2`}
                          >
                            {lang === "ar" ? "الإضافات" : "Add-Ons​"}

                            <span className="text-[#1BA56F] lg:text-[18px] md:text-[18px] xs:text-[16px]  font-[500] xs:!float-end lg:!float-none md:!float-none mt-[4px]">
                              {" "}
                              -&nbsp;
                              {processIndex < 4
                                ? lang === "ar"
                                  ? "قيد الانتظار"
                                  : " ON HOLD"
                                : order.order_status == "completed" ||
                                  order.order_status == "in_review"
                                ? lang === "ar"
                                  ? "مكتمل"
                                  : " COMPLETE"
                                : lang === "ar"
                                ? "قيد التنفيذ"
                                : "IN PROGRESS"}
                            </span>
                          </p>
                          {order?.item_details
                            ?.filter(
                              (item) =>
                                item?.item__id !== 76 && item.type !== "bundl"
                            )
                            ?.map((item, index, filteredArray) => {
                              const isProcessing = processIndex < 4;
                              const isLastItem =
                                index === filteredArray.length - 1;
                              return (
                                <p
                                  className={`font-medium ${
                                    isProcessing && "text-[#00000080]"
                                  } text-[18px] mx-1 lg:my-2 md:my-2 xs:my-0 lg:py-1 md:py-1 xs:py-2 
                                                        ${
                                                          !isLastItem &&
                                                          "border-b"
                                                        } border-[#00000080] flex justify-between`}
                                >
                                  <span className="lg:text-[16px] md:text-[16px] xs:text-[16px]">
                                    {lang === "ar"
                                      ? processArabicText(
                                          item?.item__name_arabic
                                        )
                                      : item.item_name}
                                  </span>
                                  <span
                                    className={`flex lg:items-center md:items-center xs:items-end lg:flex-row md:flex-row ${
                                      item.status == "questionnaire required" ||
                                      item.status == "in process"
                                        ? "xs:flex-row"
                                        : "xs:flex-col-reverse"
                                    } text-[#00000080] text-[14px]`}
                                  >
                                    {processIndex >= 4 ? (
                                      <>
                                        {item.status ==
                                        "questionnaire required" ? (
                                          <>
                                            <span
                                              className={`${
                                                lang === "ar" ? "ml-2" : "mr-2"
                                              } font-normal`}
                                            >
                                              {lang === "ar"
                                                ? "انتظار المحتوى"
                                                : "Waiting content"}
                                            </span>
                                            <img src={ItemWaitingIcon}></img>
                                          </>
                                        ) : item.status == "in process" ? (
                                          <>
                                            <span
                                              className={`${
                                                lang === "ar" ? "ml-2" : "mr-2"
                                              } font-normal`}
                                            >
                                              {lang === "ar"
                                                ? "قيد التنفيذ"
                                                : "In Progress"}
                                            </span>
                                            <img src={ItemProgressIcon}></img>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              className={`bg-[#1BA56F] ${
                                                lang === "ar"
                                                  ? "lg:ml-5 md:ml-5 xs:ml-0"
                                                  : "lg:mr-5 md:mr-5 xs:mr-0"
                                              } px-2 !py-0 text-[14px] ml-4 text-white font-[400] lg:mt-0 md:mt-0 xs:mt-[5%] uppercase`}
                                              onClick={() => {
                                                navigate("/adjustment", {
                                                  state: {
                                                    orderId: order.id,
                                                    orderItemId: item.id,
                                                  },
                                                });
                                              }}
                                            >
                                              {lang === "ar"
                                                ? "طلب تعديلات"
                                                : "Request Edits"}
                                            </button>
                                            <div className="flex">
                                              <span
                                                className={`${
                                                  lang === "ar"
                                                    ? "ml-2"
                                                    : "mr-2"
                                                } text-[16px] font-semibold text-[#1BA56F] mt-1`}
                                              >
                                                {lang === "ar"
                                                  ? "مكتمل "
                                                  : "Completed"}
                                              </span>
                                              <img src={ItemFinishedIcon}></img>
                                            </div>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </p>
                              );
                            })}
                        </>
                      )}
                  </div>
                </div>
              </div>
            ) : (
              // <div className="text-center p-10">
              //   <h1 className="text-[#00000080]">No Orders</h1>
              //   <a href="/" className="text-blue-500 hover:underline">
              //     Make Some Orders
              //   </a>
              // </div>

              <div className="relative py-10 pb-0">
                <img
                  className={`absolute ${
                    lang === "ar"
                      ? "sm:right-12 right-12 xs:right-[-3rem]"
                      : "sm:left-12 left-12 xs:left-[-3rem]"
                  } sm:w-[200px] w-[200px] xs:w-[125px]`}
                  style={{ transform: "rotate(350deg)" }}
                  src={workOurGIF}
                ></img>
                <div className="w-[48%] text-center mx-auto">
                  <h1 className="text-[24px] font-semibold text-black mb-4">
                    {" "}
                    {lang === "ar"
                      ? "لا توجد طلبات حتى الآن."
                      : "No orders yet."}
                  </h1>
                  <p className="flex justify-center mb-0 mt-0">
                    {" "}
                    <img
                      className="animate-rotate-animation"
                      width="150px"
                      height="110px"
                      src={workBrandGIF}
                    ></img>
                  </p>
                  <h2 className="lg:text-[32px] md:text-[32px] xs:text-[24px] sm:text-[32px] !mt-6 lg:mx-auto md:mx-auto xs:mx-0 lg:py-0 lg:px-0 md:py-0 md:px-0 xs:py-[2%] xs:px-[5%]  text-black">
                    {lang === "ar"
                      ? "جاهز تبدأ رحلتك الابداعية معنا؟ "
                      : "Inspired to start your journey to launch your next big thing ?"}
                  </h2>
                  <p className="text-center">
                    {" "}
                    <button
                      onClick={() => {
                        window.location.href = "/";
                      }}
                      className="py-1 px-3  !mt-[50px] border-black border-[1px] !mb-8 bg-white hover:!bg-black text-black uppercase  hover:text-white"
                    >
                      {lang === "ar" ? "ابدأ مشروعك الآن" : "Get started !"}
                    </button>{" "}
                  </p>
                </div>
                <img
                  width="300px"
                  className={`absolute sm:w-[300px] w-[300px] xs:w-[150px] xs:top-[30%] sm:top-[14%] ${
                    lang === "ar"
                      ? "xs:left-[-14%]  sm:left-[3%] left-[3%]"
                      : "xs:right-[-14%]  sm:right-[3%] right-[3%]"
                  } `}
                  style={{ transform: "rotate(320deg)" }}
                  src={workOurGIF}
                ></img>
              </div>
            )}

            {/* {
                                window.innerWidth > 768 ?
                                
                                    purchases.length ? <div className='px-14 mt-4 mb-4'>
                                        <h2 className='lg:text-[32px] text-[#000] md:text-[24px]'>{dashboardJson.third_title}</h2>
    
                                        <table className='w-full !border-[#00000080] border-separate border-spacing-y-2 border-spacing-x-0'>
                                            <thead>
                                                <tr className='!mb-4'>
                                                    {Object.keys(dashboardJson.table_heads).map((purchase_key) => {
                                                        return <th className='text-[#00000080] pb-2 lg:text-[20px] md:text-[16px] font-Helvetica font-medium'>{dashboardJson.table_heads[purchase_key]}</th>
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {purchases.map((project, index) => {
                                                    return <tr className=' '>
                                                        <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.id}</td>
                                                        <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{project.project_name}</td>
                                                        <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{Math.round(project.grand_total)}</td>
                                                        <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''} text-[#1BA56F]`}>Completed</td>
                                                        <td onClick={() => CheckCart(project.id)} className={`lg:text-[20px] cursor-pointer font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}><img className='lg:w-[30px] md:w-[20px]' src={reload}></img></td>
                                                        <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${index != purchases.length - 1 ? 'border-b !border-[#00000080]' : ''}`}>{format(new Date(project.purchase_date), "dd/MM/yy")}</td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div> : ''
                                    :
                                    <div className="w-full px-[8%]">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[20px] font-[500] font-Helvetica opacity-50">Purchase History</p>
                                            <p
                                                className="underline text-[20px] font-[500] font-Helvetica text-[#1BA56F] cursor-pointer"
                                                onClick={() => setShowFull(!showFull)}
                                            >
                                                {showFull ? "Show Less" : "See More"}
                                            </p>
                                        </div>

                                        <div className={`transition-all duration-500 ease-out ${showFull ? "h-auto" : "h-[165px] overflow-hidden relative"}`}>
                                            {purchases.map((order, index) => (
                                                <div
                                                    key={index}
                                                    className="border-b border-gray-300 py-2 flex flex-col md:flex-row md:items-center justify-between"
                                                >
                                                    <div className="flex justify-between w-full md:w-[50%]">
                                                        <p className="text-[22px] font-[700] font-Helvetica">{order.project_name.length > 9 ? order.project_name.substring(0, 5) + " (...)" : order.project_name}</p>
                                                        <p className="text-[22px] font-[700] font-Helvetica">{Math.round(order.grand_total)} SAR</p>
                                                    </div>

                                                    <div className="flex justify-between w-full md:w-[50%] mt-1 md:mt-0">
                                                        <p className="text-[20px] font-[500] text-gray-500 font-Helvetica">{order.id}</p>
                                                        <p className="text-[20px] font-[500] text-gray-500 font-Helvetica">{format(new Date(order.purchase_date), "dd/MM/yy")}</p>
                                                        <p className="text-[20px] font-[500] font-Helvetica text-[#1BA56F]">Completed</p>
                                                    </div>
                                                </div>
                                            ))}

                                            {!showFull && (
                                                <div className="absolute bottom-[-40px] left-0 w-full h-[80px] bg-gradient-to-t from-white via-white/90 to-transparent shadow-[1px] pointer-events-none transition-all duration-500 ease-out "></div>
                                            )}
                                        </div>
                                    </div> 
                            } */}

            <div className="font-Helvetica">
              <div className="text-center lg:pt-0 lg:pb-16 md:pt-0 md:pb-16  xs:pb-16">
                <h2 className="lg:text-[30px] md:text-[24px] xs:text-[22px] xs:font-[700] xs:px-[15%]">
                  {lang === "ar"
                    ? dashboardJson.rate_us_arabic
                    : dashboardJson.rate_us}
                </h2>
                <p className="lg:text-[18px] text-[#00000080] md:text-[16px] xs:text-[16px] xs:px-[12%]">
                  {lang === "ar"
                    ? dashboardJson.rate_us_content_arabic
                    : dashboardJson.rate_us_content}
                </p>
                {window?.innerWidth >= 475 ? (
                  <a
                    target="_blank"
                    href="https://www.google.com/search?q=bundldesigns&rlz=1C1OPNX_enIN1088IN1088&oq=bundldesigns&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIICAQQRRgnGDsyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODA5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3e2efdec17da19b7:0xb10d764716306f04,3,,,,"
                    className="px-12 py-2 lg:text-[18px] md:text-[14px] text-white bg-[#1BA56F] uppercase"
                  >
                    {lang === "ar"
                      ? dashboardJson.review_google_arabic
                      : dashboardJson.review_google}
                  </a>
                ) : (
                  <a
                    target="_blank"
                    href="https://www.google.com/search?sca_esv=c4b1341a4b7b7a8e&rlz=1C1OPNX_enIN1088IN1088&sxsrf=AHTn8zpz8heeFIffXtZFmZcBKyfoZlggHQ:1738924330168&q=bundl+designs+reviews&uds=ABqPDvxhviXT310WMxRmyLGmEwIWGxD1D4UaNg1_5mWkuvL-XEHlBMW0Wi5hXsAWml52GBwP0MgahtCC7xIzOfccgCir8jqEM-EUFl8W5TAQZtW1RiBwrQ6eg9Lumr7a35DA3UW1etJjqySLvsDCAu3swGovni-vtvN9dTjA83v60KOxD9627yKA06c5tUy_FosedF9vWioHYMgsreRYsFewxUb2IPmni2ayZr3gorMNTpcZLIypv5tgzZ33pY3Lm3ZXqLhrBu3CF3C_WNhYjJxca9Q4uc_9kNdOSyf491fLCyNbqThFA6O36UEEQF7vrZUZMHWOAEK22_BQhgx5UwnwyKbCztDiilDDN19JaVdNbCZFQpujpiDNHeroUq9oC1G2YdfLrj9V3eKSJf-u1ebBOTQNfuP-WhDcJVPho7PYBp2cmQ0VmhQ&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzfMxsPAhwiZEXurMaV4FghdFjDxW8-kb_wAl5CzlJ4LuB7A7CZCUrHH6TRDNxXAqy2BU86fOeAnWG4ddtnuW93JPkFUY&sa=X&ved=2ahUKEwiZtPb3rbGLAxX_4zgGHfRGAacQk8gLegQIKBAB&ictx=1&biw=393&bih=736&dpr=2.75#ebo=3"
                    className="px-12 py-2 lg:text-[18px] md:text-[14px] text-white bg-[#1BA56F] uppercase"
                  >
                    {lang === "ar"
                      ? dashboardJson.review_google_arabic
                      : dashboardJson.review_google}
                  </a>
                )}
              </div>
            </div>
          </div>
          <Modal
            open={showPdf}
            onClose={() => {
              setShowPdf(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="min-h-[inherit] overflow-y-auto border-[1px] border-black pt-2 font-Helvetica">
                <p className="px-2 text-[20px] font-[500] font-Helvetica text-[#1BA56F] uppercase">
                  {lang === "ar" ? "الأعمال الفنية" : "Artworks"}
                </p>
                {Files.length > 0 || Links.length > 0 ? (
                  <div>
                    <div className="px-2">
                      {Files.map((item, index) => (
                        // <a
                        //     key={index}
                        //     className="cursor-pointer ml-2 underline block w-fit break-all"
                        //     onClick={() => handleDownload(item.data)}
                        // >
                        //     {item.data.replace(/-\d{13,}-\d+/, "").trim()}
                        // </a>

                        <div
                          className={`${
                            (Files?.length - 1 !== index ||
                              Links?.length > 0) &&
                            "border-b border-black"
                          } mt-2 px-2`}
                        >
                          <p>Date : {item?.created_at}</p>
                          <p>
                            {lang === "ar" ? "التاريخ:" : "Date:"}{" "}
                            {item?.created_at}
                          </p>
                          <p>{lang === "ar" ? "العنوان:" : "Title:"} File</p>
                          <p onClick={() => handleDownload(item.data)}>
                            {lang === "ar" ? "الرابط:" : "Link:"}{" "}
                            <span className="text-blue-500 cursor-pointer underline">
                              {item.data.replace(/-\d{13,}-\d+/, "").trim()}
                            </span>{" "}
                          </p>
                        </div>
                      ))}
                    </div>

                    {Links.length > 0 && (
                      <div className="px-2">
                        {Links.map((item, index) => {
                          const validUrl =
                            item?.data.startsWith("http://") ||
                            item?.data.startsWith("https://")
                              ? item?.data
                              : `https://${item?.data}`;

                          return (
                            <div
                              className={`${
                                Links?.length - 1 !== index &&
                                "border-b border-black"
                              } mt-2 px-2`}
                            >
                              <p>
                                {lang === "ar" ? "التاريخ:" : "Date:"}{" "}
                                {item?.created_at}
                              </p>
                              <p>
                                {lang === "ar" ? "العنوان:" : "Title:"} File
                              </p>
                              {/* <p onClick={() => handleDownload(item.data)}>Link : <span className='text-blue-500 cursor-pointer underline'>{item.data.replace(/-\d{13,}-\d+/, "").trim()}</span> </p> */}
                              <p className="flex">
                                {lang === "ar" ? "الرابط:" : "Link:"}
                                <a
                                  key={index}
                                  className="cursor-pointer ml-2 underline block w-fit break-all"
                                  href={validUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item?.data}
                                </a>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <p className="text-[18px] font-[500]"> No results Found</p>
                  </div>
                )}
              </div>

              <p
                className={`absolute lg:top-[-30px]  md:top-[-30px]  xs:top-[-40px] ${
                  lang === "ar"
                    ? " lg:left-[-40px]  md:left-[-40px] xs:left-[0px]"
                    : " lg:right-[-40px]  md:right-[-40px] xs:right-[0px]"
                }`}
              >
                <ClearIcon
                  onClick={() => {
                    setShowPdf(false);
                  }}
                  style={{
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                />
                {/* <a
                                        href={`${base_url}/api/download/${brandFile}`}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={downloadBlackIcon} className='w-[30px]' alt="Download Icon" />
                                    </a> */}
              </p>
            </Box>
          </Modal>
          <Footer isLang={lang} />
        </>
      )}
    </>
  );
}
