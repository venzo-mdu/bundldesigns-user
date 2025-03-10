import React, { useEffect, useState } from 'react'
import '../Footer/Footer.css'
import Bundllogo from '../../../Images/Footer/Footerbundllogo.svg'
import Message from '../../../Images/Footer/Messageicon.svg'
import Whatsapp from '../../../Images/Footer/Whatsapp.svg'
import Linkedin from '../../../Images/Footer/Linkedin.svg'
import Facebook from '../../../Images/Footer/Facebook.svg'
import TikTok from '../../../Images/Footer/Tiktok.svg'
import Pinterest from '../../../Images/Footer/Pinterest.svg'
import Instagram from '../../../Images/Footer/Instagram.svg'
import mailIcon from '../../../Images/Footer/mailicon.svg'
import WhatsappIcon from '../../../Images/Footer/WhatsappBlack.svg'
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
            icon:TikTok,
            path:'https://www.tiktok.com/@bundl_designs'
            //path:mediaUrls.facebook
        },
        {
            icon:Pinterest,
            path:'https://id.pinterest.com/BundlDesigns/'
            //path:mediaUrls.twitter
        },
        {
            icon:Linkedin,
            path:mediaUrls.linked_in
        },
        {
            icon:WhatsappIcon,
            path: 'https://wa.me/547754124'
        },
        {
            icon : mailIcon,
            path:'mailto:info@bundldesigns.com'
        }
    ]
    return (
        <div className='footer-section'>
            <div>
                <div className='footer'>
                    <div className='left-content'>
                        <img className='bundl-logo-footer' src={Bundllogo} alt='footer-logo'></img>
                        <p className='footer-text-left'>Elevating Brands & Shaping Legacies.</p>
                    </div>
                    <div className='right-content'>
                        <div className='platform'>
                            <p className='font-medium text-[20px] mb-1 text-[#ECEAEB]'>Platform</p>
                            <ul>
                                <li>
                                    <a href='/our-work' className='text-[#ECEAEB] hover:text-[#f175ad]'> Our Work</a></li>
                                <li>   <a href='/' className='text-[#ECEAEB] hover:text-[#f175ad]'> Bundls</a></li>
                                <li>   <a href='/dashboard' className='text-[#ECEAEB] hover:text-[#f175ad]'> Dashboard</a></li>
                            </ul>
                        </div>
                        <div className='information'>
                            <p className='font-medium text-[20px] mb-1 text-[#ECEAEB]'>Information</p>
                            <ul> 
                                <li>  <a href='/aboutus' className='text-[#ECEAEB] font-normal hover:text-[#f175ad]'> About us</a></li>
                                <li>  <a href='/faq' className='text-[#ECEAEB] hover:text-[#f175ad]'> FAQs</a></li>
                                <li>  <a href='/jobs' className='text-[#ECEAEB] hover:text-[#f175ad]'> Jobs</a></li>
                            </ul>
                        </div>
                        <div className='contact-us'>
                            <p className='font-medium !text-[20px] mb-1 text-[#ECEAEB]'>Contact Us</p>
                            <div className='xs:mt-3 sm:mt-auto' style={{display:'flex',width:'100%'}}>
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
                    <p className='copyright'> 2025 BundlDesigns, All rights reserved.</p>
                    <div className='policies'>
                        <a className='!text-[14px] !text-[#FFFFFFCC]' href='/terms-and-conditions'>Terms & Conditions</a>
                        <a className='!text-[14px] !text-[#FFFFFFCC]' href='privacy-policy'>Privacy Policy</a>
                        <a className='!text-[14px] !text-[#FFFFFFCC]' href='/legal'>Legal</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
