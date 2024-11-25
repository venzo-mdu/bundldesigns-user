// import React,{useEffect, useState} from 'react'
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import axios from 'axios';
// import { base_url } from '../Auth/BackendAPIUrl';

// export const Accordian = ({accordianTitle}) => {
//     const [isDropdown, setIsDropdown] = useState([false, false, false, false, false, false, false]); 
//     const [addOnData , setAddonData] = useState([]);
//     const titleArr = [
//         "Branding",
//         "Stationary",
//        " Social Media",
//         "Products",
//         "Documents",
//         "E-designs",
//         "Special Designs"
//     ]

//     useEffect(()=>{
//       getAddons();
//     },[])

//     const getAddons = async() =>{
//       const response = await axios.get(`${base_url}/api/package`);
//       console.log(response,'addons')
//       setAddonData(response.data)

//     }
//     const toggleDropdown = (index) => {
//       setIsDropdown((prevState) =>
//         prevState.map((_, i) => i === index ? !prevState[i] : false)
//       );
//     };
//   return (
//     <div>
//         <div className='bundl-accordian'> 
//               <p className='accordian-heading'>{accordianTitle}</p>
//               <p style={{opacity:'50%'}}>Add anything want to your bundl to fit your brand!</p>
//               <div className='tab-buttons'>
//                 {/* <button onClick={() => toggleDropdown(0)}>Branding</button>
//                 <button onClick={() => toggleDropdown(1)}></button>
//                 <button onClick={() => toggleDropdown(2)}></button>
//                 <button onClick={() => toggleDropdown(3)}></button>
//                 <button onClick={() => toggleDropdown(4)}></button>
//                 <button onClick={() => toggleDropdown(5)}></button>
//                 <button onClick={() => toggleDropdown(6)}></button> */}
//                 {
//                     titleArr.map((buttons,index)=>{
//                         return(
//                             <button className={`${isDropdown[index]? 'active-button':'accordian-button'}`} onClick={() => toggleDropdown(index)}>{buttons}</button>
//                         )
//                     })
//                 }
//               </div>
//               {
//                 addOnData.designs_details.map((data,index)=>{
//                   console.log(data)
//                   return(
//                     <>
//  <Accordion  expanded={isDropdown[index]}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1bh-content"
//                   id="panel1bh-header"
//                 >
//                   <Typography sx={{ color: 'text.secondary' }}>{data[titleArr[index]].name_english}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>
//                     Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
//                     Aliquam eget maximus est, id dignissim quam.
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//                     </>
//                   )
//                 })
//               }


//               <Accordion  expanded={isDropdown[1]}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1bh-content"
//                   id="panel1bh-header"
//                 >
//                   <Typography sx={{ color: 'text.secondary' }}>Stationary</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>
//                     Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
//                     Aliquam eget maximus est, id dignissim quam.
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>

//               <Accordion  expanded={isDropdown[2]}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1bh-content"
//                   id="panel1bh-header"
//                 >
//                   <Typography sx={{ color: 'text.secondary' }}>Socail Media</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>
//                     Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
//                     Aliquam eget maximus est, id dignissim quam.
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>

//               <Accordion  expanded={isDropdown[3]}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1bh-content"
//                   id="panel1bh-header"
//                 >
//                   <Typography sx={{ color: 'text.secondary' }}>Products</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>
//                     Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
//                     Aliquam eget maximus est, id dignissim quam.
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>

//               <Accordion  expanded={isDropdown[4]}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1bh-content"
//                   id="panel1bh-header"
//                 >
//                   <Typography sx={{ color: 'text.secondary' }}>Documents</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>
//                     Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
//                     Aliquam eget maximus est, id dignissim quam.
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>

//               <Accordion  expanded={isDropdown[5]}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1bh-content"
//                   id="panel1bh-header"
//                 >
//                   <Typography sx={{ color: 'text.secondary' }}>E-designs</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>
//                     Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
//                     Aliquam eget maximus est, id dignissim quam.
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>

//               <Accordion expanded={isDropdown[6]}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1bh-content"
//                   id="panel1bh-header"
//                 >
//                   <Typography sx={{ color: 'text.secondary' }}>Space Designs</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>
//                     Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
//                     Aliquam eget maximus est, id dignissim quam.
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//             </div>
//     </div>
//   )
// }




// import React, { useEffect, useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import axios from 'axios';
// import { base_url } from '../Auth/BackendAPIUrl';

// import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
// import BlackTime from '../../Images/BundlDetail/blacktime.svg'

// export const Accordian = ({ accordianTitle }) => {
//   const [isDropdown, setIsDropdown] = useState([false, false, false, false, false, false, false]);
//   const [addOnData, setAddonData] = useState({});
//   const titleArr = [
//     "Branding",
//     "Stationary",
//     "Social Media",
//     "Products",
//     "Documents",
//     "E-designs",
//     "Special Designs"
//   ];

//   useEffect(() => {
//     getAddons();
//   }, []); 

//   const getAddons = async () => {
//     try {
//       const response = await axios.get(`${base_url}/api/package`);
//       setAddonData(response.data);
//     } catch (error) {
//       console.error("Error fetching addons data:", error);
//     }
//   };

//   const toggleDropdown = (index) => {
//     setIsDropdown((prevState) =>
//       prevState.map((_, i) => (i === index ? !prevState[i] : false))
//     );
//   };

//   return (
//     <div>
//       <div className='bundl-accordian'>
//         <p className='accordian-heading'>{accordianTitle}</p>
//         <p style={{ opacity: '50%' }}>Add anything you want to your bundle to fit your brand!</p>
//         <div className='tab-buttons'>
//           {titleArr.map((title, index) => (
//             <button
//               key={index}
//               className={`${isDropdown[index] ? 'active-button' : 'accordian-button'}`}
//               onClick={() => toggleDropdown(index)}
//             >
//               {title}
//             </button>
//           ))}
//         </div>

//         {titleArr.map((title, index) => (
//           <Accordion
//             key={index}
//             expanded={isDropdown[index]}
//           >
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel${index + 1}-content`}
//               id={`panel${index + 1}-header`}
//             >
//               <Typography sx={{ color: 'text.secondary' }}>
//                 {title}
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>

//               <Typography>
//                 {addOnData && addOnData.designs_details && addOnData.designs_details[title] &&
//                   addOnData.designs_details[title].design_list.length > 0 ? (
//                   addOnData.designs_details[title].design_list.map((design, i) => (
//                     <div key={i} style={{ display: 'flex',
//                     borderBottom: i === addOnData.designs_details[title].design_list.length - 1 ? 'none' : '1px solid #0BA6C4',
//                     padding:'1% 0%'}}>
//                       <Typography
//                         sx={{ color: '#0BA6C4', display: 'block', marginRight: '10px',width:'50%' }}
//                       >
//                         {design.name_english}
//                       </Typography>
//                       <p style={{width:'20%'}}><img src={BlackDollor} alt="Price icon" />{design.price} SAR</p>
//                       <p style={{width:'20%'}}><img src={BlackTime} alt="Time icon" />{design.time} Days</p>
//                       <div className="quantity">
//                         <button className="minus" aria-label="Decrease">&minus;</button>
//                         <input type="number" className="input-box" value="1" min="1" max="10"></input>
//                         <button className="minus" aria-label="Increase">+</button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   'No designs available'
//                 )}
//               </Typography>


//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </div>
//     </div>
//   );
// };


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
import { Config } from '../Auth/ConfigToken';

export const Accordian = ({ accordianTitle, addOnPayload }) => {
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

  // useEffect(() => {
  //   console.log('calls')
  //   getAddons();
  //   addOnPayload(addOnPayloads());
  // }, [quantities]);

  useEffect(() => {
    getAddons(); 
  }, []);
  
  useEffect(() => {
      addOnPayload(addOnPayloads()); 
  }, [addOnData, quantities]); 
  


  const getAddons = async () => {
    try {
      const response = await axios.get(`${base_url}/api/package`,Config);
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

  const handleQuantityChange = (designName, change) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [designName]: Math.max(1, (prevQuantities[designName] || 1) + change)
    }));
  };
 
  const addOnPayloads = () => {
    const allDesigns = titleArr.flatMap(title => addOnData.designs_details?.[title]?.design_list || []);
    let total_price = 0;
    let total_time = 0;
  
    const item_list = allDesigns.map((design, index) => {
    const quantity = quantities[design.name_english] || 1; 
  
      total_price += design.price * quantity;
      total_time += design.time * quantity;
  
      return {
        design_id: design.id,
        addon_name:design.name_english,
        unit_price: design.price.toString(),
        unit_time: design.time.toString(),
        qty: quantity.toString(),
        item_type: "addon"
      };
    });
  
  
    const taxRate = 18;
    const tax = Math.round(total_price * (taxRate / 100));
  
    const payload = {
      order_name: "Addons",
      total_time: total_time,
      total_price: total_price,
      tax_treatment: taxRate,
      tax: tax,
      item_list: item_list
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
          <Accordion key={index} expanded={isDropdown[index]}>
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
                    <div key={i} style={{
                      display:  window.innerWidth<=441 ?'block':'flex',
                      borderBottom: i === addOnData.designs_details[title].design_list.length - 1 ? 'none' : '1px solid #0BA6C4',
                      padding: '1% 0%'
                    }}>
                      <Typography sx={{ color: '#0BA6C4', display: 'block', marginRight: '10px',marginBottom:'5%', width: '60%' }}>
                        {design.name_english}
                      </Typography>
                      <p style={window.innerWidth<=441 ? {width: '50%'}:{ width: '20%' }}><img src={BlackDollor} alt="Price icon" />{design.price} SAR</p>
                      <p style={window.innerWidth<=441 ? {width: '50%'}:{ width: '20%' }}><img src={BlackTime} alt="Time icon" />{design.time} Days</p>
                      <div className="quantity">
                        <button className="minus" onClick={() => handleQuantityChange(design.name_english, -1)}>&minus;</button>
                        <input type="number" className="input-box" value={quantities[design.name_english] || 1} readOnly />
                        <button className="minus" onClick={() => handleQuantityChange(design.name_english, 1)}>+</button>
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
