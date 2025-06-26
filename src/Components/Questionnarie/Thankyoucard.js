import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Questionnarie/Questionnaire.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'

import HomeLogo from '../../Images/Bundles/logo-black.svg'
import Search from '../../Images/Bundles/icon-search.png'
import User from '../../Images/Bundles/icon-user.png'
import Cart from '../../Images/Bundles/icon-cart.png'
import Language from '../../Images/Bundles/icon-language.png'


import Thankyou from '../../Images/Bundles/load_sticker.webp'
import workBrandGIF from '../../Images/ourWorkBranding.gif'
import { useSelector } from 'react-redux'

export const Thankyoucard = ({lang,setLang}) => {
  return (
    <div>
        <Navbar isLang={lang} setIsLang={setLang}/>
        <div className='thankyou-card'>
          <img src={workBrandGIF} alt='thank-image' className='lg:w-[8%] md:w-[8%] xs:w-[15%]'></img>
          <p className='thank-you-text'>{lang === 'ar' ? 'شكرًا على طلبك!' : 'THANK YOU FOR YOUR ORDER!'}</p>
          <p className='thank-you-desc'>{ lang === 'ar' ? 'متحمسين للبدء في مشروعك!' :  'We’re excited to start on your project!'}</p>
          <NavLink to={"/dashboard"}><button className='back-to-home'>{lang === 'ar' ? 'العودة إلى لوحة القيادة' : 'BACK TO DASHBOARD'}</button></NavLink>
        </div>
        {/* <Footer/> */}
    </div>
  )
}
