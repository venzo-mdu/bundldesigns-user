import React from 'react'
import '../Questionnarie/Questionnaire.css'
import {Navbar} from '../Common/Navbar/Navbar'
import {Footer} from '../Common/Footer/Footer'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Stepper } from '../Common/Stepper/Stepper'

export const Questionnaire = ({
  bgTitle,
  navigationPage,
  activePage,
  pageNo
}) => {

  const navigate = useNavigate();
  return (
    <div>
        <Navbar/>
        <div style={{padding:'1% 5%'}}>
        <div style={{padding:'2% 0%',borderBottom:'5px solid #000000'}}>
        <div className='questionnaire'>
          <p className='title-questionnaire'>{bgTitle}</p>
        </div>
        </div>

        </div>
        <div className='questonnaire-actions'>
            {pageNo > 1 && (
              <button className='back' onClick={() => navigate(`/questionnaire/${pageNo - 1}`)}>BACK</button>
            )}
            {pageNo < 5 ? (
              <button className='next' onClick={()=>navigate(`/questionnaire/${pageNo+1}`)}>NEXT</button>
            ):
            <button className='next' onClick={()=>navigate(`/thankyou`)}>FINISH</button>
            }
        </div>
        <div className='questonnaire-actions1'>
            <button className='save'>SAVE FOR LATER</button>
        </div>
        <Stepper pageNo={pageNo}/>
        <Footer/>


    </div>
  )
}
