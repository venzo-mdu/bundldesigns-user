import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Questionnarie/Questionnaire.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'

import HomeLogo from '../../Images/Bundles/logo-black.svg'
import Search from '../../Images/Bundles/icon-search.png'
import User from '../../Images/Bundles/icon-user.png'
import Cart from '../../Images/Bundles/icon-cart.png'
import Language from '../../Images/Bundles/icon-language.png'


import Thankyou from '../../Images/Bundles/load_sticker.webp'
export const Thankyoucard = () => {
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
        <div className='thankyou-card'>
          <img src={Thankyou} alt='thank-image'></img>
          <p className='thank-you-text'>THANK YOU!</p>
          <p className='thank-you-desc'>We’ll reach out to you at the earliest convenience.</p>
          <NavLink to={"/"}><button className='back-to-home'>BACK TO HOME PAGE</button></NavLink>
        </div>
        {/* <Footer/> */}
    </div>
  )
}
