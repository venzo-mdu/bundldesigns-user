import React, { useEffect, useState } from 'react'
import '../Footer/Footer.css'
import Bundllogo from '../../../Images/Footer/Footerbundllogo.svg'
import Message from '../../../Images/Footer/Messageicon.svg'
import Whatsapp from '../../../Images/Footer/Whatsapp.svg'
import Linkedin from '../../../Images/Footer/Linkedin.svg'
import Facebook from '../../../Images/Footer/Facebook.svg'
import Instagram from '../../../Images/Footer/Instagram.svg'
import X from '../../../Images/Footer/icons8-twitterx-16.svg'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { base_url } from '../../Auth/BackendAPIUrl'

export const Footer = () => {
    const [mediaUrls,setmediaUrls] = useState({
        instagram:'',
        facebook:'',
        linked_in:'',
        twitter:''
    })

    const getMediaUrls = async() =>{
        const response = await axios.get(`${base_url}/api/content?section=settings`);
        if (response.data) {
            setmediaUrls(response.data)
        }
    }
    
    useEffect(()=>{
        getMediaUrls()
    },[])
    const socialIcons = [
        {
            icon:Instagram,
            path:mediaUrls.instagram
        },
        {
            icon:Facebook,
            path:mediaUrls.facebook
        },
        {
            icon:X,
            path:mediaUrls.twitter
        },
        {
            icon:Linkedin,
            path:mediaUrls.linked_in
        },
    ]
    return (
        <div className='footer-section'>
            <div>
                <div className='footer'>
                    <div className='left-content'>
                        <img className='bundl-logo-footer' src={Bundllogo} alt='footer-logo'></img>
                        <p className='footer-text-left'>Elevating Brands & Shaping Legacies.</p>
                        <div >
                            <p className='join-text'>Join our newsletter !</p>
                            {/* <p className='message-text'> Enter your email</p> */}
                            <div style={{position:'relative'}}>
                            <input className='footer-input ml-1 placeholder-white' placeholder='Enter your email'></input>
                            <img className='input-message' src={Message} alt='message'></img>
                            </div>
                        </div>
                        <button className='subscribe'>Subscribe</button>
                    </div>
                    <div className='right-content'>
                        <div className='platform'>
                            <p className='font-medium text-[20px] mb-1 text-[#ECEAEB]'>Platform</p>
                            <ul>
                                <li>
                                    <a href='/our-work' className='text-[#ECEAEB]'> Our Work</a></li>
                                <li>   <a href='/' className='text-[#ECEAEB]'> Bundls</a></li>
                                <li>   <a href='/dashboard' className='text-[#ECEAEB]'> Dashboard</a></li>
                            </ul>
                        </div>
                        <div className='information'>
                            <p className='font-medium text-[20px] mb-1 text-[#ECEAEB]'>Information</p>
                            <ul> 
                                <li>  <a href='/aboutus' className='text-[#ECEAEB] font-normal'> About us</a></li>
                                <li>  <a href='/faq' className='text-[#ECEAEB]'> FAQ's</a></li>
                                <li>  <a href='/career' className='text-[#ECEAEB]'> Careers</a></li>
                            </ul>
                        </div>
                        <div className='contact-us'>
                            <p className='font-medium !text-[20px] mb-1 text-[#ECEAEB]'>Contact Us</p>
                            <p><img src={Message} alt='message' className="inline-block"/><span> info@bundldesigns.com</span></p>
                            <p><img src={Whatsapp} alt='whatsapp' className="inline-block"></img><span> +(966) 547754124</span></p>
                            <div style={{display:'flex',width:'100%'}}>
                                {
                                    socialIcons.map((item, index) => {
                                        return (
                                            <NavLink target='_blank' to={item.path} className='!w-[32px] !h-[32px] social-icons mr-5'>
                                                <img style={{width:'16px'}} key={index} src={item.icon} alt='social-media'></img> 
                                            </NavLink>
                                            
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='footer-bottom'>
                    <p className='copyright'> 2024 BundlDesigns, All rights reserved.</p>
                    <div className='policies'>
                        <p>Terms of service</p>
                        <p>Privacy policy</p>
                        <p>Legal</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
