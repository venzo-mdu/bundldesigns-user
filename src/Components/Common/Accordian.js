import React,{useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Accordian = ({accordianTitle}) => {
    const [isDropdown, setIsDropdown] = useState([false, false, false, false, false, false, false]); 
    const titleArr = [
        "Branding",
        "Stationary",
       " Social Media",
        "Products",
        "Documents",
        "E-designs",
        "Special Designs"
    ]
    console.log(isDropdown)
  
    const toggleDropdown = (index) => {
      setIsDropdown((prevState) =>
        prevState.map((_, i) => i === index ? !prevState[i] : false)
      );
    };
  return (
    <div>
        <div className='bundl-accordian'> 
              <p className='accordian-heading'>{accordianTitle}</p>
              <p style={{opacity:'50%'}}>Add anything want to your bundl to fit your brand!</p>
              <div className='tab-buttons'>
                {/* <button onClick={() => toggleDropdown(0)}>Branding</button>
                <button onClick={() => toggleDropdown(1)}></button>
                <button onClick={() => toggleDropdown(2)}></button>
                <button onClick={() => toggleDropdown(3)}></button>
                <button onClick={() => toggleDropdown(4)}></button>
                <button onClick={() => toggleDropdown(5)}></button>
                <button onClick={() => toggleDropdown(6)}></button> */}
                {
                    titleArr.map((buttons,index)=>{
                        return(
                            <button className={`${isDropdown[index]? 'active-button':'accordian-button'}`} onClick={() => toggleDropdown(index)}>{buttons}</button>
                        )
                    })
                }
              </div>
              <Accordion  expanded={isDropdown[0]}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }}>Branding</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion  expanded={isDropdown[1]}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }}>Stationary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion  expanded={isDropdown[2]}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }}>Socail Media</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion  expanded={isDropdown[3]}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }}>Products</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion  expanded={isDropdown[4]}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }}>Documents</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion  expanded={isDropdown[5]}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }}>E-designs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={isDropdown[6]}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ color: 'text.secondary' }}>Space Designs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
    </div>
  )
}
