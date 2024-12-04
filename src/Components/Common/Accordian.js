import React, { useCallback, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';

import BlackDollor from '../../Images/BundlDetail/blackdollor.svg';
import BlackTime from '../../Images/BundlDetail/blacktime.svg';
import { ConfigToken } from '../Auth/ConfigToken';

export const Accordian = ({ accordianTitle, addOnPayload, bundlePackageId }) => {
  const [isDropdown, setIsDropdown] = useState([false, false, false, false, false, false, false]);
  const [addOnData, setAddonData] = useState({});
  const [quantities, setQuantities] = useState({});
  const titleArr = [
    "Branding",
    "Stationary",
    "Social Media",
    "Products",
    "Documents",
    "E-designs",
    "Special Designs"
  ];

  useEffect(() => {
    getAddons();
  }, []);

  useEffect(() => {
    addOnPayload(addOnPayloads());
  }, [addOnData, quantities]);


  const getAddons = async () => {
    try {
      const response = await axios.get(`${base_url}/api/package/?bundle_id=${bundlePackageId}`, ConfigToken());
      setAddonData(response.data);
    } catch (error) {
      console.error("Error fetching addons data:", error);
    }
  };

  const toggleDropdown = (index) => {
    setIsDropdown((prevState) =>
      prevState.map((_, i) => (i === index ? !prevState[i] : false))
    );
  };

  // const handleQuantityChange = (designName, change) => {
  //   setQuantities(prevQuantities => ({
  //     ...prevQuantities,
  //     [designName]: Math.max(1, (prevQuantities[designName] || 1) + change)
  //   }));
  // };

  const handleQuantityChange = (designName, change) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[designName] || 0; // Default to 0 if not defined
      const newQuantity = Math.max(0, currentQuantity + change); // Prevent negative values
      return { ...prevQuantities, [designName]: newQuantity };
    });
  };

  // const addOnPayloads = () => {
  //   const allDesigns = titleArr.flatMap(title => addOnData.designs_details?.[title]?.design_list || []);
  //   let total_price = 0;
  //   let total_time = 0;

  //   const item_list = allDesigns.map((design, index) => {
  //   const quantity = quantities[design.name_english] || 1; 

  //     total_price += design.price * quantity;
  //     total_time += design.time * quantity;

  //     return {
  //       design_id: design.id,
  //       addon_name:design.name_english,
  //       unit_price: design.price.toString(),
  //       unit_time: design.time.toString(),
  //       qty: quantity.toString(),
  //       item_type: "addon"
  //     };
  //   });


  //   const taxRate = 18;
  //   const tax = Math.round(total_price * (taxRate / 100));

  //   const payload = {
  //     order_name: "Addons",
  //     total_time: total_time,
  //     total_price: total_price,
  //     tax_treatment: taxRate,
  //     tax: tax,
  //     item_list: item_list
  //   };

  //   return payload;
  // };

  const addOnPayloads = () => {
    const allDesigns = titleArr.flatMap(
      (title) => addOnData.designs_details?.[title]?.design_list || []
    );

    let total_price = 0;
    let total_time = 0;

    // Filter and map designs with non-zero quantities
    const item_list = allDesigns
      .filter((design) => (quantities[design.name_english] || 0) > 0) // Include only non-zero quantities
      .map((design) => {
        const quantity = quantities[design.name_english] || 0;

        total_price += design.price * quantity;
        total_time += design.time * quantity;

        return {
          design_id: design.id,
          addon_name: design.name_english,
          unit_price: design.price.toString(),
          unit_time: design.time.toString(),
          qty: quantity.toString(),
          item_type: "addon",
        };
      });

    const taxRate = 18; // Define the tax rate
    const tax = Math.round(total_price * (taxRate / 100));

    // Prepare payload
    const payload = {
      order_name: "Addons",
      total_time: total_time,
      total_price: total_price,
      tax_treatment: taxRate,
      tax: tax,
      item_list: item_list,
    };

    return payload;
  };



  return (
    <div>
      <div className='bundl-accordian'>
        <p className='accordian-heading'>{accordianTitle}</p>
        <p style={{ opacity: '50%' }}>Add anything you want to your bundle to fit your brand!</p>
        <div className='tab-buttons'>
          {titleArr.map((title, index) => (
            <button
              key={index}
              className={`${isDropdown[index] ? 'active-button' : 'accordian-button'}`}
              onClick={() => toggleDropdown(index)}
            >
              {title}
            </button>
          ))}
        </div>

        {titleArr.map((title, index) => (
          // <Accordion key={index} expanded={isDropdown[index]}>
          //   <AccordionSummary
          //     expandIcon={<ExpandMoreIcon />}
          //     aria-controls={`panel${index + 1}-content`}
          //     id={`panel${index + 1}-header`}
          //   >
          //     <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
          //   </AccordionSummary>
          //   <AccordionDetails>
          //     <Typography>
          //       {addOnData && addOnData.designs_details && addOnData.designs_details[title] &&
          //         addOnData.designs_details[title].design_list.length > 0 ? (
          //         addOnData.designs_details[title].design_list.map((design, i) => (
          //           <div key={i} style={{
          //             display:  window.innerWidth<=441 ?'block':'flex',
          //             borderBottom: i === addOnData.designs_details[title].design_list.length - 1 ? 'none' : '1px solid #0BA6C4',
          //             padding: '1% 0%'
          //           }}>
          //             <Typography sx={{ color: '#0BA6C4', display: 'block', marginRight: '10px',marginBottom:'5%', width: '60%' }}>
          //               {design.name_english}
          //             </Typography>
          //             <p style={window.innerWidth<=441 ? {width: '50%'}:{ width: '20%' }}><img src={BlackDollor} alt="Price icon" className='inline-block'/>{Math.round(design.price)} SAR</p>
          //             <p style={window.innerWidth<=441 ? {width: '50%'}:{ width: '20%' }}><img src={BlackTime} alt="Time icon" className='inline-block'/>{Math.round(design.time)} Days</p>
          //             <div style={{border:'0'}} className="quantity">
          //               <button style={{border:'1px solid #0BA6C4',color:'#0BA6C4'}} className="" onClick={() => handleQuantityChange(design.name_english, -1)}>&minus;</button>
          //               <input style={{border:'1px solid #0BA6C4',color:'#0BA6C4',height:'35px'}} type="number" className="input-box" value={quantities[design.name_english] || 0} readOnly />
          //               <button style={{border:'1px solid #0BA6C4',color:'#0BA6C4'}} className="minus" onClick={() => handleQuantityChange(design.name_english, 1)}>+</button>
          //             </div>
          //           </div>
          //         ))
          //       ) : (
          //         'No designs available'
          //       )}
          //     </Typography>
          //   </AccordionDetails>
          // </Accordion>

          <Accordion  key={index} expanded={isDropdown[index]}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {addOnData && addOnData.designs_details && addOnData.designs_details[title] &&
                  addOnData.designs_details[title].design_list.length > 0 ? (
                  addOnData.designs_details[title].design_list.map((design, i) => (
                    <div
                      key={i}
                      style={{
                        display: window.innerWidth <= 441 ? 'block' : 'flex',
                        borderBottom: i === addOnData.designs_details[title].design_list.length - 1 ? 'none' : '1px solid #0BA6C4',
                        padding: '1% 0%',
                        height:'60px'
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#0BA6C4',
                          display: 'block',
                          marginRight: '10px',
                          marginBottom: '5%',
                          width: '60%'
                        }}
                      >
                        {design.name_english}
                      </Typography>
                      <p style={window.innerWidth <= 441 ? { width: '50%' } : { width: '20%' }}>
                        <img src={BlackDollor} alt="Price icon" className="inline-block" />
                        {Math.round(design.price)} SAR
                      </p>
                      <p style={window.innerWidth <= 441 ? { width: '50%' } : { width: '20%' }}>
                        <img src={BlackTime} alt="Time icon" className="inline-block" />
                        {Math.round(design.time)} Days
                      </p>
                      <div style={{ border: '0' }} className="quantity">
                        <button
                          style={{ border: '1px solid #0BA6C4', color: '#0BA6C4' }}
                          className=""
                          onClick={() => handleQuantityChange(design.name_english, -1)}
                        >
                          &minus;
                        </button>
                        <input
                          style={{ border: '1px solid #0BA6C4', color: '#0BA6C4', height: '35px' }}
                          type="number"
                          className="input-box"
                          value={quantities[design.name_english] || 0}
                          readOnly
                        />
                        <button
                          style={{ border: '1px solid #0BA6C4', color: '#0BA6C4' }}
                          className="minus"
                          onClick={() => handleQuantityChange(design.name_english, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  'No designs available'
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );


};
