import React, { useMemo, useEffect, useState } from 'react'
import '../Navbar/Navbar.css'
import NavLogo from '../../../Images/Navbar/Navlogo.svg'
import HomeLogo from '../../../Images/Bundles/logo-black.svg'
import Language from '../../../Images/Bundles/icon-language.png'
import Search from '../../../Images/Navbar/searchicon.svg'
import Cart from '../../../Images/Bundles/icon-cart.png'
import User from '../../../Images/Bundles/icon-user.png'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ConfigToken } from '../../Auth/ConfigToken'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../Auth/BackendAPIUrl';
import { loginAction } from '../../../Redux/Action'
import { useDispatch } from 'react-redux'


export const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileVisible, setProfileVisible] = useState(false)
  const [token, setToken] = useState(null)
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const commonPaths = [
    "/aboutus",
    "/career",
    "/faq",
    "/premium-form",
    "/webster-form",
    "/our-work",
    "/dashboard",
    "/adjustment",
    "/upload-content",
    "/mycart",
    "/bundldetail"
  ];

  const Logout = async () => {
    try {
      const response = await axios.get(`${base_url}/api/logout`, ConfigToken());
      document.cookie = `token=; path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      dispatch(loginAction(null));
      navigate('/');

    } catch (err) {
      console.log(err)
    }
  }
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    };
    return null;
  };
  useEffect(() => {
    setToken(getCookie('token'))
  }, [])
  const isCommonNavbar = commonPaths.includes(window.location.pathname);
  return (
    <>
      {
        isCommonNavbar ?
          (
            <div className="nav-section">
              <div className="">
                <div className="row align-items-center">
                  <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                    <div className="navbar navbar-expand-lg justify-content-between">
                      <a className="navbar-brand" href="/"><img src={HomeLogo} alt="" className="img-fluid"></img></a>
                    </div>
                  </div>
                  <div className="col-1 col-md-1 col-lg-6">
                    <div className="navbar navbar-expand-lg justify-content-end">
                      <div className=" navbar-collapse" id="mainNav">
                        <ul className="navbar-nav  mt-[3%] mx-auto align-items-center ">
                          <li className="nav-item">
                            <a className="nav-link" href="/aboutus">About</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/">Bundls</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/our-work">Works</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Contact Us</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-7 !mt-5 col-md-8 col-lg-3 text-end ">
                    <div className="navbar  float-right">
                      <ul className=" mr-auto h-list align-items-center ">
                        <li >
                          <a className="" href="#"><img src={Search} alt="" className="navIcons  ml-2"></img> </a>
                        </li>
                        <li className='px-[6px] inner-nav'>

                          <a className="" onClick={() => { setProfileVisible(!profileVisible) }}><img src={User} alt="" className="navIcons cursor-pointer"></img></a>
                          <nav className={`w-44 inner-nav-item absolute xs:top-[80px] md:top-[50px] shodow-sm -right-2 text-right bg-white p-2 transition-all duration-300 ease-in-out ${profileVisible ? 'opacity-100 visible z-10' : 'opacity-0 invisible'
                            }`}>
                            <ul >
                              {token ? <>
                                <li className='relative p-1 inner-nav-li'>
                                  <a href="/dashboard" previewlistener="true">Projects</a>
                                </li>
                                <li className='relative p-1 inner-nav-li'>
                                  <a href="#" previewlistener="true">Profile</a>
                                </li>
                                <li className='relative p-1 inner-nav-li'>
                                  <a
                                    className="cursor-pointer"
                                    onClick={Logout}
                                    previewlistener="true"
                                  >
                                    Logout
                                  </a>
                                </li>
                              </> :
                                <>  <li className='relative p-1 inner-nav-li'>
                                  <a href="/login" previewlistener="true">Login</a>
                                </li>
                                </>}


                            </ul>
                          </nav>
                        </li>
                        <li >
                          <a className="" href="/mycart"><img src={Cart} alt="" className="navIcons  ml-2"></img></a>
                        </li>
                        <li >
                          <a className="" ><img src={Language} alt="" className="navIcons  ml-2"></img></a>
                        </li>
                        <li className="nav-item xs:!block sm:!hidden  inner-nav text-center !hidden menu mr-auto">
                          <button onClick={toggleMenu} type="button" id="menu-toggle">
                            {menuVisible ? <CloseIcon className='!text-[50px]' /> : <MenuIcon className='!text-[50px]' />}
                          </button>
                          <nav className={`w-44 inner-nav-item absolute xs:top-[80px] md:top-[50px] shadow-sm -right-2 text-right  bg-white p-2 transition-all duration-300 ease-in-out ${menuVisible ? 'opacity-100 visible z-10' : 'opacity-0 invisible'
                            }`}>
                            <ul >
                              <li className='relative p-1 inner-nav-li'>
                                <a href="/" previewlistener="true">Bundl Offers</a>
                              </li>
                              <li className='relative p-1 inner-nav-li'>
                                <a href="/our-work" previewlistener="true">Our Work</a>
                              </li>
                              <li className='relative p-1 inner-nav-li'>
                                <a href="/aboutus" previewlistener="true">About Us</a>
                              </li>
                              <li className='relative p-1 inner-nav-li'>
                                <a href="#" previewlistener="true">Contact Us</a>
                              </li>
                            </ul>
                          </nav>
                        </li>
                      </ul>
                      <nav className="navigation">
                        <ul className="navbar">
                          <li>
                            <a href="/" previewlistener="true">Bundl Offers</a>
                          </li>
                          <li>
                            <a href="/our-work" previewlistener="true">Our Work</a>
                          </li>
                          <li>
                            <a href="/aboutus" previewlistener="true">About Us</a>

                          </li>
                          <li>
                            <a href="#" previewlistener="true">Contact Us</a>

                          </li>

                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) :
          (


            <div className=' nav-container'>
              <div className="nav-section bg-[#FFFFFF] w-[100%] z-[1] sticky top-0" >
                <div style={{ padding: '0% 0%' }} className="">
                  <div className="row items-center">
                    <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                      <div className="navbar navbar-expand-lg justify-content-between">
                        <a className="navbar-brand" href="/"><img src={HomeLogo} alt="" className="img-fluid"></img></a>
                      </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-6">
                      <div className="navbar navbar-expand-lg justify-content-end">
                        <div className=" navbar-collapse" id="mainNav">
                          <ul className="navbar-nav mt-[3%] mx-auto align-items-center ">
                            <li className="nav-item">
                              <a className="nav-link" href="/aboutus">About</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/">Bundls</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/our-work">Work</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#">Contact Us</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-7 col-md-8  col-lg-3 text-end ">
                      <div className="navbar navbar-expand-lg float-right">
                        <ul className="mt-[5vh] mr-auto h-list align-items-center ">
                          <li className='px-[7px]'>
                            <a className="w-[26px]" href="#"><img src={Search} alt="" className="navIcons"></img></a>
                          </li>
                          
                          <li className='px-[7px] inner-nav'>

                            <a className="w-[26px]" onClick={() => { setProfileVisible(!profileVisible) }}><img src={User} alt="" className="navIcons cursor-pointer"></img></a>
                            <nav className={`w-44  absolute xs:top-[80px] md:top-[80px] shodow-sm -right-2 text-right bg-white p-2 transition-all duration-300 ease-in-out ${profileVisible ? 'opacity-100 visible z-10' : 'opacity-0 invisible'}`}>
                              <ul  >
                                {token ? <>
                                  <li className='relative p-1 inner-nav-li'>
                                    <a href="/dashboard" previewlistener="true">Projects</a>
                                  </li>
                                  <li className='relative p-1 inner-nav-li'>
                                    <a href="#" previewlistener="true">Profile</a>
                                  </li>
                                  <li className='relative p-1 inner-nav-li'>
                                    <a onClick={() => { Logout() }} previewlistener="true">Logout</a>
                                  </li>
                                </> :
                                  <>  <li className='relative p-1 inner-nav-li'>
                                    <a href="/login" previewlistener="true">Login</a>
                                  </li>
                                  </>}



                              </ul>
                            </nav>
                          </li>
                          <li className='px-[7px]'>
                            <a className="w-[26px]" href="/mycart"><img src={Cart} alt="" className="navIcons"></img></a>
                          </li>
                          <li className='px-[7px]'>
                            <a className="w-[26px]" ><img src={Language} alt="" className="navIcons"></img></a>
                          </li>
                          <li className="nav-item xs:!block sm:!hidden  inner-nav text-center !hidden menu mr-auto">
                            <button onClick={toggleMenu} type="button" id="menu-toggle">
                              {menuVisible ? <CloseIcon className='!text-[50px]' /> : <MenuIcon className='!text-[50px]' />}
                            </button>
                            <nav className={`w-44 absolute  shadow-sm -right-2 text-right bg-white p-2 transition-all duration-300 ease-in-out ${menuVisible ? 'opacity-100 visible z-10' : 'opacity-0 invisible'
                              }`}>
                              <ul className=' inner-nav-item'>
                                <li className='relative p-1 inner-nav-li'>
                                  <a href="/" previewlistener="true">Bundl Offers</a>
                                </li>
                                <li className='relative p-1 inner-nav-li'>
                                  <a href="/our-work" previewlistener="true">Our Work</a>
                                </li>
                                <li className='relative p-1 inner-nav-li'>
                                  <a href="/aboutus" previewlistener="true">About Us</a>
                                </li>
                                <li className='relative p-1 inner-nav-li'>
                                  <a href="#" previewlistener="true">Contact Us</a>
                                </li>
                              </ul>
                            </nav>
                          </li>
                        </ul>
                        <nav className="navigation">
                          <ul className="navbar">
                            <li >
                              <a href="#" previewlistener="true">Bundl Offers </a>
                            </li>
                            <li>
                              <a href="#" previewlistener="true">Our Work</a>
                            </li>
                            <li>
                              <a href="#" previewlistener="true">About Us</a>

                            </li>
                            <li>
                              <a href="#" previewlistener="true">Contact Us</a>

                            </li>

                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      }

    </>


  )
}