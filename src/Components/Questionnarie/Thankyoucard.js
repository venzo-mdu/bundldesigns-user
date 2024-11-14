import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Questionnarie/Questionnaire.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'

import Thankyou from '../../Images/Bundles/load_sticker.webp'
export const Thankyoucard = () => {
  return (
    <div>
        <Navbar/>
        <div className='thankyou-card'>
          <img src={Thankyou} alt='thank-image'></img>
          <p className='thank-you-text'>THANK YOU!</p>
          <p className='thank-you-desc'>We’ll reach out to you at the earliest convenience.</p>
          <NavLink to={"/"}><button className='back-to-home'>BACK TO HOME PAGE</button></NavLink>
        </div>
        <Footer/>
    </div>
  )
}
