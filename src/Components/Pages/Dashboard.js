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


export default function Dashboard() {

    const [projects, setProjects] = useState([])
    const [currentTab, setCurrentTab] = useState('');
    const [processIndex,setProcessIndex] = useState(0)
    const [order,setOrder] = useState({})
    const [dashboardJson, setDashboardJson] = useState(dashboard.english)
    const ProcessIndexDict = ['purchase','questionnaire_required','in_process','adjustment_detail','add_ons','review']
    const base_url = process.env.REACT_APP_BACKEND_URL
    const getprojects = async () => {
        const response = await axios.get(`${base_url}/api/order/`, Config);
        if (response.data) {
            console.log(response.data)
            setProjects(response.data.data);
            
            if (response.data.data.length) {
                getOrderDetails(response.data.data[0].id)
            }
        }
    }
    const getOrderDetails = async (orderId)=>{
        setCurrentTab(orderId)
        const response = await axios.get(`http://127.0.0.1:8000/api/order/${orderId}/`, Config);
        if (response.data) {
            setOrder(response.data);
        }
    }
    useEffect(() => {
        getprojects()
        // const lang = localStorage.getItem('lang')
        // setDashboardJson(dashboard[lang])
    }, [])


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
                        <div className='flex'>
                        {ProcessIndexDict.map(index=>{
                                if(index == processIndex){
                                    return <img src={paperPlane}></img>
                                }
                                else if(index > processIndex ){
                                    return <img src={greenStarIcon}></img>
                                }
                                else{
                                    return <img src={starIcon}></img>
                                }
                        })}
                        </div>
                    <div>

                    </div>
                        {'item_details' in order && Object.keys(order.item_details.bundle_items).map((key)=>{
                         return  <><p className='text-[22px] font-bold my-2'>{key}</p>
                            {order.item_details.bundle_items[key].map((item)=>{
                                return <p className='font-medium text-[18px]'>{item.item_name}</p>
                            })}
                            </>
                        })}

                        {'item_details' in order && 'addon_items' in order.item_details && <><p className='text-[22px] font-bold my-2'>Add Ons</p>
                        
                        {order.item_details.addon_items.map((item)=>{
                                return <p className='font-medium text-[18px] mx-1 my-2 py-1 border-b border-[#00000080]'>{item.item_name}</p>
                            })}
                        </>  }
                    
                       

                        
                    </div>

                </div>

                <div className='px-14'>
                    <h2 className='lg:text-[32px] md:text-[24px]'>{dashboardJson.third_title}</h2>

                    <table className='w-full border-separate border-spacing-y-2 border-spacing-x-0'>
                        <thead>
                            <tr className='!mb-4'>
                                {Object.keys(dashboardJson.table_heads).map((purchase_key)=>{
                                   return <th className='text-[#00000080] pb-2 lg:text-[20px] md:text-[16px] font-Helvetica font-medium'>{dashboardJson.table_heads[purchase_key]}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project,index)=>{
                                return <tr className=' '>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${ index != projects.length-1 ?'border-b !border-[#00000080]':''}`}>{project.id}</td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${ index != projects.length-1 ?'border-b !border-[#00000080]':''}`}>{project.project_name}</td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${ index != projects.length-1 ?'border-b !border-[#00000080]':''}`}>{project.grand_total}</td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${ index != projects.length-1 ?'border-b !border-[#00000080]':''} text-[#1BA56F]`}>Completed</td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${ index != projects.length-1 ?'border-b !border-[#00000080]':''}`}><img className='lg:w-[30px] md:w-[20px]' src={reload}></img></td>
                                    <td className={`lg:text-[20px] font-medium md:text-[16px] pb-2 ${ index != projects.length-1 ?'border-b !border-[#00000080]':''}`}>{format(new Date(project.purchase_date), "dd/MM/yy")}</td>
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
            <Footer />
        </>

    )

}
