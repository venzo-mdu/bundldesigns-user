import React from 'react'
import '../Footer/Footer.css'
import Bundllogo from '../../../Images/Footer/Footerbundllogo.svg'
import Message from '../../../Images/Footer/Messageicon.svg'
import Whatsapp from '../../../Images/Footer/Whatsapp.svg'
import Linkedin from '../../../Images/Footer/Linkedin.svg'
import Facebook from '../../../Images/Footer/Facebook.svg'
import Instagram from '../../../Images/Footer/Instagram.svg'
import X from '../../../Images/Footer/icons8-twitterx-16.svg'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
    




    const socialIcons = [
        {
            icon:Instagram,
            path:'https://www.instagram.com/bundl_designs/'
        },
        {
            icon:Facebook,
            path:'https://www.facebook.com/bundldesigns/'
        },
        {
            icon:X,
            path:'https://twitter.com/BundlDesigns'
        },
        {
            icon:Linkedin,
            path:'https://www.linkedin.com/company/bundl-designs'
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
                            <p className='join-text'>Join our newsletter!</p>
                            {/* <p className='message-text'> Enter your email</p> */}
                            <div style={{position:'relative'}}>
                            <input className='footer-input' placeholder='Enter your email'></input>
                            <img className='input-message' src={Message} alt='message'></img>
                            </div>
                        </div>
                        <button className='subscribe'>Subscribe</button>
                    </div>
                    <div className='right-content'>
                        <div className='platform'>
                            <p>Platform</p>
                            <ul>
                                <li>Our Work</li>
                                <li>Bundl</li>
                                <li>Dashboard</li>
                            </ul>
                        </div>
                        <div className='information'>
                            <p>Information</p>
                            <ul>
                                <li>About us</li>
                                <li>FAQ's</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div className='contact-us'>
                            <p>Contact Us</p>
                            <p><img src={Message} alt='message' className="inline-block"/><span> info@bundldesigns.com</span></p>
                            <p><img src={Whatsapp} alt='whatsapp' className="inline-block"></img><span> +(966) 547754124</span></p>
                            <div style={{display:'flex',width:'100%'}}>
                                {
                                    socialIcons.map((item, index) => {
                                        return (
                                            <NavLink target='_blank' to={item.path} style={index>0?{marginLeft:'5%'}:{}} className='social-icons'>
                                                <img style={{width:'30px'}} key={index} src={item.icon} alt='social-media'></img> 
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
