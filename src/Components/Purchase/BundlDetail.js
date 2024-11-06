import React, { useEffect, useState  } from 'react'
import '../Purchase/Purchase.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Accordian } from '../Common/Accordian'

import Dollor from '../../Images/BundlDetail/dollor.svg'
import Time from '../../Images/BundlDetail/time.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'

import { NavLink, useLocation } from 'react-router-dom'

export const BundlDetail = ({
  bundlTitle,
  bundlAmount,
  days,
  bundlDefinition
}) => {

  const location = useLocation();

  useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
  },[])


  return (
    <div>
      <Navbar />
      <div className='bundl-detail'>
        <div style={{ borderBottom: '1px solid #000000' }}>
          <h2>{location.state?.title || 'The Boutiquer' }</h2>
          <div className='bundl-amount'>
            <p><img src={Dollor}></img>3750 SAR</p>
            <p><img src={Time}></img>30 Days</p>
          </div>
          <p className='bundl-desc-title'>Main outcomes: Brand Identity, Commerce Collateral, Social Media Starter Kit.</p>
          <p className='bundl-desc'>Elevate your brand, whether online or in-store. This bundle includes comprehensive brand identity (logo, guidelines, colors, typography, patterns) and commerce collateral to enhance customer experience. Plus, get social media designs to boost sales.</p>
          <p className='one-minor'>* This Bundl includes one minor revision</p>
        </div>

        <div className='bundl-section'>
          <div className='brand-details'>
            <p style={window.innerWidth<=441 ? {fontSize:'24px',fontWeight: '700'}:{ textAlign: 'left', fontSize: '32px', fontWeight: '700' }}>What is the name of your brand?</p>
            <input className='brand-input'></input>
            <div className='brand-identity'>
              <p className='collateral-text'>Brand Identity</p>
              <p>Includes bla bla</p>
              <div style={window.innerWidth <441 ? { display:'block', width: '100%' }:{ display:'flex', width: '100%' }}>
                <p className='logo-design'>Logo design</p>
                <div className='languages' style={{ display: 'flex'}}>
                  <p><input type='radio'></input> English</p>
                  <p><input type='radio'></input> Arabic</p>
                  <p><input type='radio'></input> Both (+2000SAR)</p>
                </div>
              </div>
            </div>
            <div className='commerce-collateral'>
              <p className='collateral-text'>Commerce Collateral</p>
              <p style={{ opacity: '50%' }}>This includes bla bla</p>
              <div className='commerce-sections'>
                <p style={{ width: '35%' }}>Business cards</p>
                <p className='minimum'>Minimum quantity cannot be decreased</p>
                <div className="quantity">
                  <button className="minus" aria-label="Decrease">&minus;</button>
                  <input type="number" className="input-box" value="1" min="1" max="10"></input>
                  <button className="minus" aria-label="Increase">+</button>
                </div>
              </div>
            </div>

            <div className='commerce-collateral'>
              <p className='collateral-text'>Social Media Starter Kit</p>
              <p style={{ opacity: '50%' }}>This includes bla bla</p>
              <div className='commerce-sections'>
                <p style={{ width: '85%' }}>Profile Cover</p>
                <div className="quantity">
                  <button className="minus" aria-label="Decrease">&minus;</button>
                  <input type="number" className="input-box" value="1" min="1" max="10"></input>
                  <button className="minus" aria-label="Increase">+</button>
                </div>
              </div>
            </div>

            <Accordian 
              accordianTitle={'Something feels missing ?'}
            />
          </div>
 
          <div className='bundl-summary'>
            <div className='bundl-name'>
              <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>Summary</p>
              <div style={{ display: 'flex' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>Boutique Bundl</p>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>6000 sar</p>
              </div>
            </div>
            <p className='one-heading'>1 Brand Identity</p>
            <div className='one-brand-identity'>
              <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>2 Bags</p>
              <div style={{ display: 'flex' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>+ 5 Days</p>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>+ 180 sar</p>
              </div>
            </div>
            <p className='one-heading'>1 Box</p>
            <p className='one-heading'>1 Business Card</p>
            <div className='one-brand-identity'>
              <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>6 Profile covers</p>
              <div style={{ display: 'flex' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>+ 5 Days</p>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>+ 180 sar</p>
              </div>
            </div>
            <p className='one-heading'>3 GIF posts</p>
            <div className='bundl-checkout'>
              <div className='total' style={{ display: 'flex' }}>
                <p style={{ width: '60%' }}><img src={BlackDollor}></img>Total Price</p>
                <p style={{ width: '40%' }}>8000 sar</p>
              </div>
              <div className='total' style={{ display: 'flex' }}>
                <p style={{ width: '60%' }}><img src={BlackTime}></img>Total Duration</p>
                <p style={{ width: '40%' }}>45 Days</p>
              </div>
              <div className='proceed-checkout'>
                <NavLink to="/mycart"> <button className='proceed'>Proceed Checkout</button></NavLink>
              </div>
              <p className='proceed-text'>Your minimum total should be above 700 SAR</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
