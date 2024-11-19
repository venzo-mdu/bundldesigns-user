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

export default function Dashboard() {

    const [projects, setProjects] = useState([])
    const [currentTab, setCurrentTab] = useState(1);
    const [dashboardJson, setDashboardJson] = useState(dashboard.english)
    const base_url = process.env.REACT_APP_BACKEND_URL
    const getprojects = async () => {
        console.log(base_url)
        const response = await axios.get(`${base_url}/api/order/`, Config);
        if (response.data) {
            console.log(response.data)
            setProjects(response.data.data);
            if (response.data.data.length) {
                setCurrentTab(response.data.data[0].id)
            }
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
                    <h1 className='text-[40px]'> {dashboardJson.main_title} </h1>
                    <p className='text-[20px] text-[#00000080]'>{dashboardJson.title_content} </p>
                </div>

                <div className='border-b border-black py-8 px-14'>
                    <h1 className='text-[18px] flex mb-4'>  <span className='mr-2'>{dashboardJson.second_title}</span> <img className='mr-2' src={ltIcon}></img>  <img src={gtIcon}></img> </h1>

                    <p className='flex mb-0'>
                        {projects.map(project => <button onClick={(e) => setCurrentTab(project.id)} 
                        className={`py-1 px-4 border !border-[#1BA56F] ${project.id == currentTab ? 'bg-[#1BA56F] text-white' : 'bg-white text-[#1BA56F]'}
                         flex justify-around items-center`}>
                            {project.project_name}{project.id == currentTab && <img width='15px' className='ml-2' src={editIcon}></img>}</button>)}
                        <button className='p-1 flex bg-black text-white items-center text-[20px]'>+</button>
                    </p>

                    <div className='border mt-0 !border-black py-2 px-4'>

                    </div>

                </div>

            </div>
            <Footer />
        </>

    )

}
