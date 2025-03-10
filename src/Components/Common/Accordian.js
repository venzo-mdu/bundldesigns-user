import React, { useCallback, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { ToastContainer, toast } from 'react-toastify'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg';
import BlackTime from '../../Images/BundlDetail/blacktime.svg';
import { ConfigToken } from '../Auth/ConfigToken';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const Accordian = ({ accordianTitle, addOnPayload,extraQty, bundlePackageId, textColor,searchParams=null }) => {
  const [isDropdown, setIsDropdown] = useState([false, false, false, false, false, false, false]);
  const [addOnData, setAddonData] = useState({});
  const [quantities, setQuantities] = useState({});
  const titleArr = [
    "Branding",
    "Stationary",
    "Social Media",
    "Products",
    "Documents",
    "E-Designs",
    "Space Design"
  ];

  useEffect(() => {
    getAddons();
  }, []);

  useEffect(() => {
    addOnPayload(addOnPayloads());
  }, [addOnData, quantities,extraQty]);

  const getAddons = async () => {
    try {
      const url = window.location.pathname === "/custombundl"
        ? `${base_url}/api/package/`
        : `${base_url}/api/package/?bundle_id=${bundlePackageId}`;
  
      const response = await axios.get(url, ConfigToken());
  
      if (response.data) {
        setAddonData(response.data);
  
        if (searchParams) {
          const searchIndex = titleArr.findIndex((key) => {
            const designs = response.data.designs_details[key]?.design_list || [];
            return designs.some((item) => item.id == searchParams);
          });
  
          if (searchIndex !== -1) {
            setIsDropdown((prevState) =>
              prevState.map((_, i) => (i === searchIndex ? true : false)) // Open only the matched dropdown
            );
          } else {
            console.warn("No matching index found for searchParams");
          }
        }
      }
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
        toast.success(`Cart updated successfully`, {
            position: toast?.POSITION?.TOP_RIGHT,
          });
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[designName] || 0; // Default to 0 if not defined
      const newQuantity = Math.max(0, currentQuantity + change); // Prevent negative values
      return { ...prevQuantities, [designName]: newQuantity };
    });
  };

  let total_price = 0
  const addOnPayloads = () => {
    const allDesigns = titleArr.flatMap(
      (title) => addOnData.designs_details?.[title]?.design_list || []
    );

    let total_time = allDesigns
    .filter((design) => (quantities[design.name_english] || 0) + (extraQty[design.name_english] || 0) > 0)
    .reduce((max, design) => {
      return Math.max(max, design.time);
    }, 0);


    // Filter and map designs with non-zero quantities
    const item_list = allDesigns
    .filter((design) => (quantities[design.name_english] || 0) + (extraQty[design.name_english] || 0) > 0) // Include only non-zero quantities
    .map((design) => {
      const quantity = (quantities[design.name_english] || 0) + (extraQty[design.name_english] || 0);
      const current_total = quantity == 1
      ? parseFloat(design.price)
      : parseFloat(design.price) + ((parseFloat(design.price) / 100) * design.price_increment * (quantity - 1));
      total_price += current_total
      return {
        design_id: design.id,
        addon_name: design.name_english,
        unit_price: design.price.toString(),
        unit_time: design.time.toString(),
        price_increment:design.price_increment,
        qty: quantity.toString(),
        item_type: "addon",
        total_price:current_total
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
        <p className='accordian-heading mb-1  leading-[1.2] '>{accordianTitle}</p>
        <p className='xs:tesxt-[20px] sm:text-[16px] text-[16px] xs:w-full sm:w-full w-full' style={{ opacity: '50%' }}>Add anything you want to your bundle to fit your brand!</p>
        <div className='tab-buttons !border-b-0'>
          {titleArr.map((title, index) => (
            <button
              key={index}
              style={{
                color: isDropdown[index] ? '#fff' : textColor,
                border: `1px solid ${textColor}`,
                backgroundColor: isDropdown[index] ? textColor : '#fff'
              }}
              className={`!font-[500] uppercase !text-[${textColor}] ${isDropdown[index] ? 'active-button' : 'accordian-button'} accordion-btn-${index+1}`}
              onClick={() => {toggleDropdown(index)
                const element = document.getElementById(`${index}_list`);
                element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {title}
            </button>
          ))}
        </div>

        {titleArr.map((title, index) => (

          <Accordion sx={{
            boxShadow: 'none !important',
            borderBottom: index === titleArr.length - 1 ? 'none' : '1px solid #000000',
            paddingTop: index == 0 ? '18px' : 'auto',
            '&::before': {
            display: 'none' // Hides the default before border
    }
          }} key={index} expanded={isDropdown[index]} id={`${index}_list`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className='text-[#000]' />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
              onClick={() => toggleDropdown(index)}
              sx={{
                border:'none'
              }}
            >
              <Typography className='!font-[700] !text-[24px]'>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <Typography>
                {addOnData && addOnData.designs_details && addOnData.designs_details[title] &&
                  addOnData.designs_details[title].design_list.length > 0 ? (
                  addOnData.designs_details[title].design_list.map((design, i) => (
                    <div
                      id={design.id}
                      style={{
                        display: 'flex',
                        borderBottom: i === addOnData.designs_details[title].design_list.length - 1 ? 'none' : `1px solid ${textColor}`,
                        padding: window.innerWidth<=475 ?'3% 0%' :'1% 0',
                      }}
                      className='items-center flex-wrap'
                    >
                      <Typography
                        sx={{
                          color:  `${design.id == searchParams?'#0F5C3C': textColor}` ,
                          display: 'block',
                          marginRight: '5px',
                          marginBottom: '8px',

                          fontWeight: '500'
                        }}
                        className='sm:basis-[35%] basis-[35%] xs:basis-[69%] '
                      >
                        {design.name_english}
                      </Typography>
                      <p className={`flex xs:order-3 sm:order-2 items-center sm:w-[35%] w-[35%] xs:w-[100%] !mb-2 ${bundlePackageId && 'xs:hidden sm:flex'}`}>
                        <p className='flex items-center mb-1 sm:min-w-[120px] min-w-[120px] xs:min-w-[100px] font-[500]'>
                          <img src={BlackDollor} alt="Price icon" className="inline-block mr-2" />
                          {Math.round(design.price)} SAR
                        </p>
                        <p className='flex items-center mb-1 font-[500] uppercase' >
                          <img src={BlackTime} alt="Time icon" className="inline-block mr-1" />
                          {Math.round(design.time)} Days

                        </p>
                      </p>

                      <p style={{ color: textColor }} className={`xs:order-2 sm:order-3 sm:w-[29%] w-[29%] xs:w-[29%] max-h-[36px] !mb-2 flex justify-end text-[${textColor}] `}>
                        <button style={{
                          borderColor: textColor,
                          borderStyle: 'solid',
                          borderWidth: '1px',
                        }} onClick={() => handleQuantityChange(design.name_english, -1)} className={` !border-r-0 !py-[17px]  px-1  flex  items-center`}><RemoveIcon /></button>
                        <span style={{
                          borderColor: textColor,
                          borderStyle: 'solid',
                          borderWidth: '1px',
                        }} className={`!border-r-0 px-2 !text-[20px]`}> {quantities[design.name_english] || 0}</span>
                        <button style={{
                          borderColor: textColor,
                          borderStyle: 'solid',
                          borderWidth: '1px',
                        }} onClick={() => handleQuantityChange(design.name_english, 1)} className={`flex  items-center px-1  !py-[5px] `}><AddIcon /></button>
                      </p>

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
