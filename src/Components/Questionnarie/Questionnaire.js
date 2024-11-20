import React from 'react'
import '../Questionnarie/Questionnaire.css'
import {Navbar} from '../Common/Navbar/Navbar'
import {Footer} from '../Common/Footer/Footer'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Stepper } from '../Common/Stepper/Stepper'
import { NavLink } from 'react-router-dom'

import HomeLogo from '../../Images/Bundles/logo-black.svg'
import Search from '../../Images/Bundles/icon-search.png'
import User from '../../Images/Bundles/icon-user.png'
import Cart from '../../Images/Bundles/icon-cart.png'
import Language from '../../Images/Bundles/icon-language.png'
import Eyesspoon from '../../Images/Questionnaire/eyespoon.webp'
import Mouth from '../../Images/Questionnaire/mouth.webp'
import Announcement from '../../Images/Bundles/announcement.webp'
import Buy from '../../Images/Bundles/buy_a_bundl.webp'
import Eye from '../../Images/Bundles/eye-vintage.webp'

export const Questionnaire = ({
  bgTitle,
  navigationPage,
  activePage,
  pageNo,
  questions,
  onBackClick,
  onNextClick
}) => {

  const navigate = useNavigate();

  
  return (
    <div>
        {/* <Navbar/> */}
        <div className="nav-section">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                                            <div className="navbar navbar-expand-lg justify-content-between">
                                                <a className="navbar-brand" href="/home"><img src={HomeLogo} alt="home-logo" className="img-fluid"></img></a>
                                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                                                    aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation" id="navbutton">
                                                    <span className="navbar-toggler-icon"></span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-1 col-md-1 col-lg-6">
                                            <div className="navbar navbar-expand-lg justify-content-end">
                                                <div className="collapse navbar-collapse" id="mainNav">
                                                    <ul className="navbar-nav mx-auto align-items-center ">
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#">About</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#">Bundls</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#">Work</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#">Contact Us</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-7 col-md-8 col-lg-3 text-end">
                                            <div className="navbar navbar-expand-lg justify-content-end ">
                                                <ul className="navbar-nav mr-auto h-list align-items-center">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#"><img src={Search} alt="" className="img-fluid nav-icon"></img></a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <NavLink to='/login'><a className="nav-link" href="#"><img src={User} alt="" className="img-fluid nav-icon"></img></a></NavLink>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="/mycart"><img src={Cart} alt="" className="img-fluid nav-icon"></img></a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#"><img src={Language} alt="" className="img-fluid nav-icon"></img></a>
                                                    </li>
                                                    <li className=" menu">
                                                        <button type="button" className="navbar-toggle" id="menu-toggle">
                                                            <span className="icon-bar"></span>
                                                            <span className="icon-bar"></span>
                                                            <span className="icon-bar"></span>
                                                        </button>
                                                    </li>
                                                </ul>
                                                <nav className="navigation">
                                                    <ul className="navbar">
                                                        <li>
                                                            {/* <!-- <a href="">Bundls</a> --> */}
                                                            <a href="#" previewlistener="true">Bundl Offers</a>
                                                        </li>
                                                        <li>
                                                            {/* <!-- <a href="">Our Work</a> --> */}
                                                            <a href="#" previewlistener="true">Our Work</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" previewlistener="true">About Us</a>

                                                        </li>
                                                        <li>
                                                            {/* <!-- <a href="">Contact Us</a> --> */}
                                                            <a href="#" previewlistener="true">Contact Us</a>

                                                        </li>

                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        <div style={{padding:'1% 5%'}}>
        <div style={{padding:'2% 0%',borderBottom:'5px solid #000000'}}>
        <div className='questionnaire'>
          <p className='title-questionnaire'>{bgTitle}</p>
          {
            pageNo === 1 ?
            <div className='eyespoon'>
             <img src={Eyesspoon} width={500} height={500}></img>
            </div>:''
          }
          {
            pageNo === 1 ?
            <div className='eyespoon2'>
             <img  src={Eyesspoon} width={500} height={500}></img>
            </div>:''
          }
          {
            pageNo === 2 ?
            <div>
              <img className='miclady' src={Announcement}></img>
              <img  className='lips position-absolute' src={Mouth}></img>
            </div> :''
          }
          {
            pageNo === 3 ?
            <div className='mirror'>
              <img src={Buy}></img>
            </div> :''
          }
          {/* {
            pageNo === 4 ?
            <div className='eyeball'>
              <img className='animate verticalmove' src={Eye}></img>
              <img className='animate verticalmove animation-delay-slow' src={Eye}></img>
              <img className='animate verticalmove animate--delay' src={Eye}></img>
            </div>:''
          } */}
        </div>
        </div>
            {questions}
        </div>
        <div className='questonnaire-actions-height'>
        <div className='questonnaire-actions'>
            {pageNo > 1 && (
              <button className='back' onClick={onBackClick}>BACK</button>
            )}
            {pageNo < 5 ? (
              <button className='next' onClick={onNextClick}>NEXT</button>
            ):
            <button className='next' onClick={()=>navigate(`/thankyou`)}>FINISH</button>
            }
        </div>
        <div className='questonnaire-actions1'>
            <button className='save'>SAVE FOR LATER</button>
        </div>
        </div>
        <div style={{position:'fixed',bottom:'0'}}>
        <Stepper pageNo={pageNo}/>
        </div>
        {/* <Footer/> */}
    </div>
  )
}
