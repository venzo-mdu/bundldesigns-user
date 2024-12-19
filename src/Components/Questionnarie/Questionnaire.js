import React from 'react'
import '../Questionnarie/Questionnaire.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Stepper } from '../Common/Stepper/Stepper'
import { NavLink } from 'react-router-dom'

import HomeLogo from '../../Images/Bundles/logo-black.svg'
import Search from '../../Images/Bundles/icon-search.png'
import User from '../../Images/Bundles/icon-user.png'
import Cart from '../../Images/Bundles/icon-cart.png'
import Language from '../../Images/Bundles/icon-language.png'
import Eyesspoon from '../../Images/Questionnaire/eyespoon.webp'
import Eyesspoon2 from '../../Images/Questionnaire/eyespoon2.webp'
import Mouth from '../../Images/Questionnaire/mouth.webp'
import Announcement from '../../Images/Bundles/announcement.webp'
import Buy from '../../Images/Bundles/buy_a_bundl.webp'
import Eye from '../../Images/Bundles/eye-vintage.webp'
import Cloud1 from '../../Images/Questionnaire/cloud1stoff.webp'
import Cloud2 from '../../Images/Questionnaire/cloud2ndoff.webp'
import Rocket from '../../Images/Bundles/rocket-with-candy.webp'

export const Questionnaire = ({
  bgTitle,
  navigationPage,
  activePage,
  pageNo,
  questions,
  onBackClick,
  onNextClick,
  onSaveLaterClick,
  storeAnswers,
  orderId
}) => {

  const navigate = useNavigate();

  const bgColors = ['#F3B7CE', '#1BA56F', '#00A8C8', '#F3B7CE']
  return (
    <div>
      <Navbar />

      <div style={{ padding: '1% 5%' }}>
        <div style={{ padding: '2% 0%', borderBottom: '9px solid #000000' }}>
          <div className=''>
            {/* <p className='title-questionnaire'>{bgTitle}</p> */}
            <div class=" pic-container position-relative" style={{ zIndex: -1}}>
              <div class="d-flex flex-row gag1 scroll-ani">
                <img src={Cloud1} alt="Natural" />
                <img src={Cloud2} alt="Natural" />
              </div>
              <div className='flex justify-center items-center'>
              <p className='title-questionnaire'>{bgTitle}</p>
              </div>
            </div>
            {
              pageNo === 1 ?
                <div className='eyespoon'>
                  <img width={500} height={500} src={Eyesspoon}></img>
                </div> : ''
            }
            {
              pageNo === 1 ?
                <div className='eyespoon2'>
                  <img src={Eyesspoon2} width={300} height={500}></img>
                </div> : ''
            }
            {
              pageNo === 2 ?
                <div>
                  <img className='miclady' src={Announcement}></img>
                  <img className='lips position-absolute' src={Mouth}></img>
                </div> : ''
            }
            {
              pageNo === 3 ?
                <div className='mirror'>
                  <img src={Buy}></img>
                </div> : ''
            }
            {
              pageNo === 4 ?
                <div className='eyeball'>
                  <img className='animate verticalmove' src={Eye}></img>
                  <img className='animate verticalmove animation-delay-slow' src={Eye}></img>
                  <img className='animate verticalmove animate--delay' src={Eye}></img>
                </div> : ''
            }

            {
              pageNo === 5 ?
                <div className="candy-rocket position-absolute -z-[1]">
                  <img className="candy" width="120" height="120" alt="eye" src={Rocket}></img>
                </div> : ''
            }
          </div>
        </div>
        <div>
        {questions}
        </div>
      </div>
      <div className='questonnaire-actions-height'>
        <div className='questonnaire-actions'>
          {pageNo > 1 && (
            <button className='back' onClick={onBackClick}>BACK</button>
          )}
          {pageNo < 5 ? (
            <button style={{ backgroundColor: bgColors[pageNo - 1] }} className='next' onClick={onNextClick}>NEXT</button>
          ) :
            <button className='next' onClick={onNextClick}>FINISH</button>
          }
        </div>
        <div className='questonnaire-actions1'>
          <button className='save' onClick={onSaveLaterClick}>SAVE FOR LATER</button>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '0' }}>
        <Stepper pageNo={pageNo} answersData={storeAnswers} fillId={orderId}/>
      </div>
      {/* <Footer/> */}
    </div>
  )
}
