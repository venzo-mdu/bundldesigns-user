// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import '../Purchase/Purchase.css'
// import { Navbar } from '../Common/Navbar/Navbar'
// import { Footer } from '../Common/Footer/Footer'
// import { Accordian } from '../Common/Accordian'

// import Dollor from '../../Images/BundlDetail/dollor.svg'
// import Time from '../../Images/BundlDetail/time.svg'
// import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
// import BlackTime from '../../Images/BundlDetail/blacktime.svg'

// import { NavLink, useLocation } from 'react-router-dom'
// import { base_url } from '../Auth/BackendAPIUrl'

// export const BundlDetail = ({
//   bundlTitle,
//   bundlAmount,
//   days,
//   bundlDefinition
// }) => {

//   const location = useLocation();
//   const [bundlAddons, setBundlAddons] = useState([])

//   useEffect(() => {
//     document.documentElement.scrollTo({
//       top: 0,
//       left: 0
//     });
//     getBundlData();
//   }, []);

//   const getBundlData = async () => {
//     const response = await axios.get(`${base_url}/api/package/?bundle_id=${location.state.bundlDetail?.id}`);
//     console.log(response);
//     setBundlAddons(response.data)
//   }


//   return (
//     <div>
//       <Navbar />
//       <div className='bundl-detail'>
//         <div style={{ borderBottom: '1px solid #000000' }}>
//           <h2>{location.state?.bundlDetail?.name_english}</h2>
//           <div className='bundl-amount'>
//             <p><img src={Dollor}></img>3750 SAR</p>
//             <p><img src={Time}></img>30 Days</p>
//           </div>
//           <p className='bundl-desc-title'>Main outcomes: Brand Identity, Commerce Collateral, Social Media Starter Kit.</p>
//           <p className='bundl-desc'>{location.state?.bundlDetail?.description_english}</p>
//           <p className='one-minor'>* This Bundl includes one minor revision</p>
//         </div>

//         <div className='bundl-section'>
//           <div className='brand-details'>
//             <p style={window.innerWidth <= 441 ? { fontSize: '24px', fontWeight: '700' } : { textAlign: 'left', fontSize: '32px', fontWeight: '700' }}>What is the name of your brand?</p>
//             <input className='brand-input'></input>
//             <div className='brand-identity'>
//               <p className='collateral-text'>Brand Identity</p>
//               <p>Includes bla bla</p>
//               <div style={window.innerWidth < 441 ? { display: 'block', width: '100%' } : { display: 'flex', width: '100%' }}>
//                 <p className='logo-design'>Logo design</p>
//                 <div className='languages' style={{ display: 'flex' }}>
//                   <p><input type='radio'></input> English</p>
//                   <p><input type='radio'></input> Arabic</p>
//                   <p><input type='radio'></input> Both (+2000SAR)</p>
//                 </div>
//               </div>
//             </div>

//             {/* <div className='commerce-collateral'>
//               <p className='collateral-text'>Commerce Collateral</p>
//               <p style={{ opacity: '50%' }}>This includes bla bla</p>
//               <div className='commerce-sections'>
//                 <p style={{ width: '35%' }}>Business cards</p>
//                 <p className='minimum'>Minimum quantity cannot be decreased</p>
//                 <div className="quantity">
//                   <button className="minus" aria-label="Decrease">&minus;</button>
//                   <input type="number" className="input-box" value="1" min="1" max="10"></input>
//                   <button className="minus" aria-label="Increase">+</button>
//                 </div>
//               </div>
//             </div>

//             <div className='commerce-collateral'>
//               <p className='collateral-text'>Social Media Starter Kit</p>
//               <p style={{ opacity: '50%' }}>This includes bla bla</p>
//               <div className='commerce-sections'>
//                 <p style={{ width: '85%' }}>Profile Cover</p>
//                 <div className="quantity">
//                   <button className="minus" aria-label="Decrease">&minus;</button>
//                   <input type="number" className="input-box" value="1" min="1" max="10"></input>
//                   <button className="minus" aria-label="Increase">+</button>
//                 </div>
//               </div>
//             </div> */}

//             <div  className='commerce-collateral'>
//               {bundlAddons.bundle_details?.map((bundle, index) => (
//                 <div key={index} className='bundle-section' style={{margin:'3% 0 0 0'}}>
//                   <p className='collateral-text'>{bundle.name_english}</p>
//                   <p style={{ opacity: '50%' }}>This includes bla bla</p>
//                   {bundle.design_list.map((design, idx) => {
//                       const isSingleItem = bundle.design_list.length === 1;
//                       const isLastIndex = idx === bundle.design_list.length - 1;
//                       const sectionClassName = !isSingleItem && !isLastIndex ? 'commerce-sections' : 'commerce-sections1';
//                   return(
//                     <div key={idx} className={sectionClassName}>
//                       <p style={{ width: '60%' }}>{design.name_english}</p>
//                       <p style={{ width: '20%' }}><img src={BlackDollor} alt="Price icon" />{design.price} SAR</p>
//                       <p style={{ width: '20%' }}><img src={BlackTime} alt="Time icon" />{design.time} Days</p>
//                       <div className="quantity">
//                         <button className="minus" aria-label="Decrease">&minus;</button>
//                         <input type="number" className="input-box" value="1" min="1" max="10"></input>
//                         <button className="minus" aria-label="Increase">+</button>
//                       </div>
//                       {/* <div className='quantity'>
//                         <button className="minus" aria-label="Decrease">−</button>
//                         <input
//                           type="number"
//                           className="input-box"
//                           value={design.quantity}
//                           min="1"
//                           max="10"
//                           readOnly
//                         />
//                         <button className="minus" aria-label="Increase">+</button>
//                       </div> */}
//                       {/* <p>Price: {design.price} SAR</p> */}
//                       {/* <p>Time: {design.time} days</p> */}
//                       {/* {design.dual_lang_price > 0 && (
//                         <p>Dual Language (+{design.dual_lang_price} SAR, +{design.dual_lang_time} days)</p>
//                       )} */}
//                     </div>
//                   )})}
//                 </div>
//               ))}
//             </div>
//             <Accordian accordianTitle={'Something feels missing ?'} />
//           </div>

//           <div className='bundl-summary'>
//             <div className='bundl-name'>
//               <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>Summary</p>
//               <div style={{ display: 'flex' }}>
//                 <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>Boutique Bundl</p>
//                 <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>6000 sar</p>
//               </div>
//             </div>
//             <p className='one-heading'>1 Brand Identity</p>
//             <div className='one-brand-identity'>
//               <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>2 Bags</p>
//               <div style={{ display: 'flex' }}>
//                 <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>+ 5 Days</p>
//                 <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>+ 180 sar</p>
//               </div>
//             </div>
//             <p className='one-heading'>1 Box</p>
//             <p className='one-heading'>1 Business Card</p>
//             <div className='one-brand-identity'>
//               <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>6 Profile covers</p>
//               <div style={{ display: 'flex' }}>
//                 <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>+ 5 Days</p>
//                 <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>+ 180 sar</p>
//               </div>
//             </div>
//             <p className='one-heading'>3 GIF posts</p>
//             <div className='bundl-checkout'>
//               <div className='total' style={{ display: 'flex' }}>
//                 <p style={{ width: '60%' }}><img src={BlackDollor}></img>Total Price</p>
//                 <p style={{ width: '40%' }}>8000 sar</p>
//               </div>
//               <div className='total' style={{ display: 'flex' }}>
//                 <p style={{ width: '60%' }}><img src={BlackTime}></img>Total Duration</p>
//                 <p style={{ width: '40%' }}>45 Days</p>
//               </div>
//               <div className='proceed-checkout'>
//                 <NavLink to="/mycart"> <button className='proceed'>Proceed Checkout</button></NavLink>
//               </div>
//               <p className='proceed-text'>Your minimum total should be above 700 SAR</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }



import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Purchase/Purchase.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Accordian } from '../Common/Accordian'
import Dollor from '../../Images/BundlDetail/dollor.svg'
import Time from '../../Images/BundlDetail/time.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { base_url } from '../Auth/BackendAPIUrl'
import { ConfigToken } from '../Auth/ConfigToken'

export const BundlDetail = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [bundlAddons, setBundlAddons] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addonPayLoads, setAddonPayLoads] = useState({});
  const [brandInput , setBrandInput] = useState('');

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0 });
    getBundlData();
  }, []);

  const getBundlData = async () => {
    const response = await axios.get(`${base_url}/api/package/?bundle_id=${location.state.bundlDetail?.id}`,ConfigToken());
    setBundlAddons(response.data);
  }


  const handleQuantityChange = (designName, change) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [designName]: Math.max(1, (prevQuantities[designName] || 1) + change)
    }));
  };

  const createPayload = async() => {
    if (!bundlAddons.bundle_details) {
      console.warn("No bundle details available yet.");
      return;
    }

    const total_price = Object.keys(quantities).reduce((total, designName) => {
      const item = bundlAddons.bundle_details
        .flatMap(bundle => bundle.design_list)
        .find(design => design.name_english === designName);
      const quantity = quantities[designName];
      return item ? total + item.price * quantity : total;
    }, 0);

    const total_time = Object.keys(quantities).reduce((total, designName) => {
      const item = bundlAddons.bundle_details
        .flatMap(bundle => bundle.design_list)
        .find(design => design.name_english === designName);
      const quantity = quantities[designName];
      return item ? total + item.time * quantity : total;
    }, 0);

    const taxRate = 18;
    const tax = Math.round(total_price * (taxRate / 100));

    const item_list = bundlAddons.bundle_details.flatMap((bundle, index) =>
      bundle.design_list.map((design, idx) => {
        const quantity = quantities[design.name_english] || 1;
        return {
          design_id: design.id,
          unit_price: design.price.toString(),
          unit_time: design.time.toString(),
          qty: quantity.toString(),
          item_type: "bundl"
        };
      })
    );

    const payload = {
      order_name:brandInput || "New Order",
      bundle_id: location.state.bundlDetail?.id,
      total_time: totalDuration + addonPayLoads.total_time,
      total_price: totalCost + addonPayLoads.total_price,
      tax_treatment: taxRate + addonPayLoads.tax_treatment,
      tax: tax + addonPayLoads.tax,
      item_list: item_list,
      addons:addonPayLoads,
      order_status:"in_cart"
    };
    
    try {
      const response = await axios.post(
        `${base_url}/api/order/create/`, 
        payload,   // Ensure 'payload' is an object with the data you need to send
        ConfigToken()     // 'Config' should be an object containing headers or other Axios options
      );
      console.log(response.data); 
      if (response.status === 201) {
        navigate('/mycart', { state: { orderData: response.data.data.data } });
      }// Optional: Log or handle the response as needed
    } catch (error) {
      console.error("Error creating order:", error); // Optional: Handle errors here
    }
    
    
  };


  const selectedItems = bundlAddons.bundle_details?.flatMap(bundle =>
    bundle.design_list.map(design => ({
      ...design,
      quantity: quantities[design.name_english] || 1,
      total_price: (quantities[design.name_english] || 1) * design.price,
      total_time: (quantities[design.name_english] || 1) * design.time
    }))
  );

  const totalCost = selectedItems?.reduce((total, item) => total + item.total_price, 0);
  const totalDuration = selectedItems?.reduce((total, item) => total + item.total_time, 0);

  return (
    <div>
      <Navbar />
      <div className='bundl-detail'>
        <div style={{ borderBottom: '1px solid #000000',width:'100%' }}>
          <h2>{location.state?.bundlDetail?.name_english}</h2>
          <div className='bundl-amount'>
            <p><img src={Dollor} alt="Dollar icon" className="inline-block"/><span>{Math.round(location.state?.bundlDetail?.price) || "3750 SAR"} SAR</span></p>
            <p><img src={Time} alt="Time icon" className="inline-block"/><span> {location.state?.bundlDetail?.time || "30 Days"} Days</span></p>
          </div>
          <p className='bundl-desc-title'>Main outcomes: Brand Identity, Commerce Collateral, Social Media Starter Kit.</p>
          <p className='bundl-desc'>{location.state?.bundlDetail?.description_english}</p>
          <p className='one-minor'>* This Bundl includes one minor revision</p>
        </div>

        <div className='bundl-section'>
          <div className='brand-details'>
            <p style={window.innerWidth<=441 ? {fontSize:'24px',fontWeight: '700'}:{ textAlign: 'left', fontSize: '32px', fontWeight: '700' }}>What is the name of your brand?</p>
            <input className='brand-input' onChange={(e)=>setBrandInput(e.target.value)}/>

            <div className='commerce-collateral'>
              {bundlAddons.bundle_details?.map((bundle, index) => (
                <div key={index} className='bundle-section' style={{ margin: '3% 0 0 0' }}>
                  <p className='collateral-text'>{bundle.name_english}</p>
                  <p style={{ opacity: '50%' }}>This includes bla bla</p>
                  {
                    bundle.name_english === "Brand Identity" && (
                      <div style={window.innerWidth < 441 ? { display: 'block', width: '100%' } : { display: 'flex', width: '100%' }}>
                    <p className='logo-design'>Logo design</p>
                    <div className='languages' style={{ display: 'flex' }}>
                      <p><input type='radio'></input> English</p>
                      <p><input type='radio'></input> Arabic</p>
                      <p><input type='radio'></input> Both (+2000SAR)</p>
                    </div>
                  </div>
                    )
                  }
                  {bundle.design_list.map((design, idx) => {
                    const isSingleItem = bundle.design_list.length === 1;
                    const isLastIndex = idx === bundle.design_list.length - 1;
                    const sectionClassName = !isSingleItem && !isLastIndex ? 'commerce-sections' : 'commerce-sections1';
                    return (
                      <div key={idx} className={sectionClassName}>
                        <p style={{ width: '60%' }}>{design.name_english}</p>
                        <p style={window.innerWidth<=441 ? {width: '50%'}:{ width: '20%' }}><img src={BlackDollor} alt="Price icon" className="inline-block"/>{design.price} SAR</p>
                        <p style={window.innerWidth<=441 ? {width: '50%'}:{ width: '20%' }}><img src={BlackTime} alt="Time icon" className="inline-block"/>{design.time} Days</p>
                        <div className="quantity">
                          <button className="minus" onClick={() => handleQuantityChange(design.name_english, -1)}>&minus;</button>
                          <input type="number" className="input-box" value={quantities[design.name_english] || 1} readOnly />
                          <button className="minus" onClick={() => handleQuantityChange(design.name_english, 1)}>+</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            <Accordian accordianTitle={'Something feels missing ?'} addOnPayload={setAddonPayLoads} bundlePackageId={location.state.bundlDetail?.id}/>
          </div>

          <div className='bundl-summary'>
            <div className='bundl-name'>
              <p style={{ fontSize: '24px', fontWeight: '700', padding: '2% 0%' }}>Summary</p>
            </div>
            <div style={{ display: 'flex', padding: '1% 5%' }}>
              <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>{location.state?.bundlDetail?.name_english}</p>
              <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>{Math.round(location.state?.bundlDetail?.price)} SAR</p>
            </div>
            {selectedItems?.map((item, idx) => (
              <div key={idx} className='one-brand-identity'>
                <p style={{ color: '#000000', fontSize: '20px', fontWeight: '700', width: '60%' }}>{item.quantity} {item.name_english}</p>
                <div style={{ display: 'flex' }}>
                  <p style={{ fontSize: '20px', fontWeight: '700', width: '60%' }}>+ {item.total_time} Days</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', width: '40%' }}>+ {item.total_price} SAR</p>
                </div>
              </div>
            ))}
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
            <div className='bundl-checkout mt-3'>
              <div className='total' style={{ display: 'flex' }}>
                <p style={{ width: '60%' }}><img src={BlackDollor} alt="Total Price" className="inline-block"/><span className='ml-3'>Total Price</span></p>
                <p style={{ width: '40%' }} >{totalCost + addonPayLoads.total_price } SAR</p>
              </div>
              <div className='total' style={{ display: 'flex' }}>
                <p style={{ width: '60%' }}><img src={BlackTime} alt="Total Duration" className="inline-block"/><span className='ml-3'>Total Duration</span></p>
                <p style={{ width: '40%' }}>{totalDuration + addonPayLoads.total_time} Days</p>
              </div>

              <div className='proceed-checkout'>
                <button onClick={createPayload} className='proceed'>Proceed Checkout</button>
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

