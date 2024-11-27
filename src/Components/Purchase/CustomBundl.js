import React, { useEffect , useState } from 'react'
import '../Purchase/Purchase.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Accordian } from '../Common/Accordian'


import Dollor from '../../Images/BundlDetail/dollor.svg'
import Time from '../../Images/BundlDetail/time.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import Edit from '../../Images/BundlDetail/editicon.svg'
import Xmark from '../../Images/BundlDetail/xmarkicon.svg'

import { NavLink, useLocation } from 'react-router-dom'

export const CustomBundl = () => {

  const location = useLocation();
  const [addonPayLoads, setAddonPayLoads] = useState({});


  useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
  },[]);

  // const getCustomBundl = async()=>{
  //   const response = await axios.get
  // }

  return (
    <div>
      <Navbar />
      <div className='bundl-detail'>
        <div style={{ borderBottom: '1px solid #000000', width: '100%' }}>
          <h2>{location?.state?.title || 'Custom Bundl!' }</h2>
          <div className='bundl-amount'>
            <p><img src={Dollor} className="inline-block"></img><span>3750 SAR</span></p>
            <p><img src={Time} className="inline-block"></img><span>30 Days</span></p>
          </div>
          {/* <p className='bundl-desc-title'>Main outcomes: Brand Identity, Commerce Collateral, Social Media Starter Kit.</p> */}
          <p className='bundl-desc'>In this bundl, you have the freedom to mix and match from different add-ons that have been carefully curated to guarantee you find all the items needed for the success of your project.</p>
          <p className='one-minor'>* This Bundl includes one minor revision</p>
        </div>

        <div className='bundl-section'>
          <div className='brand-details'>
            <p style={window.innerWidth<=441 ? {fontSize:'24px',fontWeight: '700'}:{ textAlign: 'left', fontSize: '32px', fontWeight: '700' }}>What is the name of your brand?</p>
            <input className='brand-input'></input>
            {/* <div className='brand-identity'>
              <p className='collateral-text'>Brand Identity</p>
              <p>Includes bla bla</p>
              <div style={{ display: 'flex', width: '100%' }}>
                <p className='logo-design'>Logo design</p>
                <div className='languages' style={{ display: 'flex', width: '35%' }}>
                  <p><input type='radio'></input> English</p>
                  <p><input type='radio'></input> Arabic</p>
                  <p><input type='radio'></input> Both (+2000SAR)</p>
                </div>
              </div>
            </div> */}
            {/* <div className='commerce-collateral'>
              <p className='collateral-text'>Commerce Collateral</p>
              <p style={{ opacity: '50%' }}>This includes bla bla</p>
              <div className='commerce-sections'>
                <p style={{ width: '35%' }}>Business cards</p>
                <p className='minimum' style={{ width: '50%' }}>Minimum quantity cannot be decreased</p>
                <div className="quantity">
                  <button className="minus" aria-label="Decrease">&minus;</button>
                  <input type="number" className="input-box" value="1" min="1" max="10"></input>
                  <button className="minus" aria-label="Increase">+</button>
                </div>
              </div>
            </div> */}

            {/* <div className='commerce-collateral'>
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
            </div> */}

            <div style={{ margin: '5% 0 0 0' }}>
              <Accordian
                accordianTitle={'Custom Your Bundl!'}
                addOnPayload={setAddonPayLoads}
              />
            </div>

          </div>

          <div className='bundl-summary'>
            <div className='bundl-name'>
              <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>Summary</p>
              {/* <div style={{ display: 'flex' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>Boutique Bundl</p>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>6000 sar</p>
              </div> */}
            </div>
            {/* <p className='one-heading'>1 Brand Identity</p> */}
            <div className='one-brand-identity'>
              <p style={{ fontSize: '20px', fontWeight: '700', width: '60%', color: '#000000' }}><img src={Edit} className="inline-block"></img> <img src={Xmark}></img> Typography</p>
              <div style={{ display: 'flex' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}><img src={Time} className="inline-block"></img> 5 Days</p>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}><img src={Dollor} className="inline-block"></img> 180 sar</p>
              </div>
            </div>
            {/* <p className='one-heading'>1 Box</p> */}
            {/* <p className='one-heading'>1 Business Card</p> */}
            <div className='one-brand-identity'>
              <p style={{ fontSize: '20px', fontWeight: '700', width: '60%', color: '#000000' }}><img src={Edit}></img> <img src={Xmark} className="inline-block"></img> Logo Option</p>
              <div style={{ display: 'flex' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}><img src={Time} className="inline-block"></img> 5 Days</p>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}><img src={Dollor} className="inline-block"></img> 180 sar</p>
              </div>
            </div>
            <div className='one-brand-identity'>
              <p style={{ fontSize: '20px', fontWeight: '700', width: '60%', color: '#000000' }}><img src={Edit} className="inline-block"></img> <img src={Xmark}></img> Logo Option</p>
              <div style={{ display: 'flex' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}><img src={Time} className="inline-block"></img> 5 Days</p>
                <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}><img src={Dollor} className="inline-block"></img> 180 sar</p>
              </div>
            </div>
            <div className='bundl-name'>
              <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>Add ons</p>
              </div>
            {addonPayLoads?.item_list?.map((addon, idx) => (
              <div key={idx} className='one-brand-identity'>
                <p style={{ color: '#000000', fontSize: '20px', fontWeight: '700', width: '60%' }}>{addon.qty} {addon.addon_name}</p>
                <div style={{ display: 'flex' }}>
                  <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>+ {addon.unit_time * addon.qty} Days</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>+ {addon.unit_price * addon.qty} SAR</p>
                </div>
              </div>
            ))}
            {/* <p className='one-heading'>3 GIF posts</p> */}
            <div className='bundl-checkout'>
              <div className='total' style={{ display: 'flex' }}>
                <p style={{ width: '60%' }}><img src={BlackDollor} className="inline-block"></img>Total Price</p>
                <p style={{ width: '40%' }}>8000 sar</p>
              </div>
              <div className='total' style={{ display: 'flex' }}>
                <p style={{ width: '60%' }}><img src={BlackTime} className="inline-block"></img>Total Duration</p>
                <p style={{ width: '40%' }}>45 Days</p>
              </div>
              <div className='proceed-checkout'>
                <NavLink to="/mycart"> <button className='proceed'>Proceed Checkout</button></NavLink>
              </div>
              {/* <p className='proceed-text'>Your minimum total should be above 700 SAR</p> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
