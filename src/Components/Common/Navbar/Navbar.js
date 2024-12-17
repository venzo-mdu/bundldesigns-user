import React from 'react'
import '../Navbar/Navbar.css'
import NavLogo from '../../../Images/Navbar/Navlogo.svg'
import HomeLogo from '../../../Images/Bundles/logo-black.svg'
import Language from '../../../Images/Bundles/icon-language.png'
import Search from '../../../Images/Navbar/searchicon.svg'
import Cart from '../../../Images/Bundles/icon-cart.png'
import User from '../../../Images/Bundles/icon-user.png'
import { NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
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

  const isCommonNavbar = commonPaths.includes(window.location.pathname);
  return (
    <>
      {
        isCommonNavbar ?
          (
            // <div className="nav-section">
            //   <div style={{padding:'0% 0%'}}>
            //     <div className="row align-items-center">
            //       <div className="col-4 col-md-3 col-lg-3 justify-content-between">
            //         <div className="navbar navbar-expand-lg justify-content-between">
            //           <a className="navbar-brand" href="/home"><img src={HomeLogo} alt="home-logo" className="img-fluid"></img></a>
            //           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
            //             aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation" id="navbutton">
            //             <span className="navbar-toggler-icon"></span>
            //           </button>
            //         </div>
            //       </div>
            //       <div className="col-1 col-md-1 col-lg-6">
            //         <div className="navbar navbar-expand-lg justify-content-end">
            //           <div className=" navbar-collapse" id="mainNav">
            //             <ul className="navbar-nav mx-auto align-items-center ">
            //               <li className="nav-item">
            //                 <a className="nav-link" >About</a>
            //               </li>
            //               <li className="nav-item">
            //                 <a className="nav-link" >Bundls</a>
            //               </li>
            //               <li className="nav-item">
            //                 <a className="nav-link" >Work</a>
            //               </li>
            //               <li className="nav-item">
            //                 <a className="nav-link" >Contact Us</a>
            //               </li>
            //             </ul>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="col-7 col-md-8 col-lg-3 text-end">
            //         <div className="navbar navbar-expand-lg justify-content-end ">
            //           <ul className="navbar-nav  h-list align-items-center">
            //             <li className="nav-item">
            //               <a className="nav-link" ><img src={Search} alt="" className="img-fluid nav-icon"></img></a>
            //             </li>
            //             <li className="nav-item">
            //               <NavLink to='/login'><a className="nav-link" ><img src={User} alt="" className="img-fluid nav-icon"></img></a></NavLink>
            //             </li>
            //             <li className="nav-item">
            //               <a className="nav-link" href="/mycart"><img src={Cart} alt="" className="img-fluid nav-icon"></img></a>
            //             </li>
            //             <li className="nav-item">
            //               <a className="nav-link"><img src={Language} alt="" className="img-fluid nav-icon"></img></a>
            //             </li>
            //             <li className=" menu">
            //               <button type="button" className="navbar-toggle" id="menu-toggle">
            //                 <span className="icon-bar"></span>
            //                 <span className="icon-bar"></span>
            //                 <span className="icon-bar"></span>
            //               </button>
            //             </li>
            //           </ul>
            //           <nav className="navigation">
            //             <ul className="navbar">
            //               <li>
            //                 {/* <!-- <a href="">Bundls</a> --> */}
            //                 <a href="#" previewlistener="true">Bundl Offers</a>
            //               </li>
            //               <li>
            //                 {/* <!-- <a href="">Our Work</a> --> */}
            //                 <a href="#" previewlistener="true">Our Work</a>
            //               </li>
            //               <li>
            //                 <a href="#" previewlistener="true">About Us</a>

            //               </li>
            //               <li>
            //                 {/* <!-- <a href="">Contact Us</a> --> */}
            //                 <a href="#" previewlistener="true">Contact Us</a>

            //               </li>

            //             </ul>
            //           </nav>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>


            <div className="nav-section">
              <div className="">
                <div className="row align-items-center">
                  <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                    <div className="navbar navbar-expand-lg justify-content-between">
                      <a className="navbar-brand" href="/"><img src={HomeLogo} alt="" className="img-fluid"></img></a>
                      {/* <!--<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"-->
                            <!--    aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation" id="navbutton">-->
                            <!--    <span className="navbar-toggler-icon"></span>-->
                            <!--</button> */}
                    </div>
                  </div>
                  <div className="col-1 col-md-1 col-lg-6">
                    <div className="navbar navbar-expand-lg justify-content-end">
                      <div className=" navbar-collapse" id="mainNav">
                        <ul className="navbar-nav mx-auto align-items-center ">
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
                  <div className="col-7 col-md-8 col-lg-3 text-end ">
                    <div className="navbar  float-right">
                      <ul className="navbar-nav mr-auto h-list align-items-center ">
                        <li >
                          <a className="" href="#"><img src={Search} alt="" className="navIcons"></img></a>
                        </li>
                        <li >
                          <a className="" href="/login"><img src={User} alt="" className="navIcons"></img></a>
                        </li>
                        <li >
                          <a className="" href="/mycart"><img src={Cart} alt="" className="navIcons"></img></a>
                        </li>
                        <li >
                          <a className="" href="#"><img src={Language} alt="" className="navIcons"></img></a>
                        </li>
                        <li className="nav-item menu mr-auto">
                          <button type="button" className="navbar-toggle" id="menu-toggle">
                           <MenuIcon />
                          </button>
                        </li>
                      </ul>
                      <nav className="navigation">
                        <ul className="navbar">
                          <li>
                            {/* <!-- <a href="">Bundls</a> --> */}
                            <a href="/" previewlistener="true">Bundl Offers</a>
                          </li>
                          <li>
                            {/* <!-- <a href="">Our Work</a> --> */}
                            <a href="/our-work" previewlistener="true">Our Work</a>
                          </li>
                          <li>
                            <a href="/aboutus" previewlistener="true">About Us</a>

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
          ) :
          (


                       <div className=' nav-container'>
              <div className="nav-section bg-[#FFFFFF] w-[100%] z-[1] sticky top-0" >
                <div style={{ padding: '0% 0%' }} className="">
                  <div className="row align-items-center">
                    <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                      <div className="navbar navbar-expand-lg justify-content-between">
                        <a className="navbar-brand" href="/"><img src={HomeLogo} alt="" className="img-fluid"></img></a>
                        {/* <!--<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"-->
                            <!--    aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation" id="navbutton">-->
                            <!--    <span className="navbar-toggler-icon"></span>-->
                            <!--</button> */}
                      </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-6">
                      <div className="navbar navbar-expand-lg justify-content-end">
                        <div className=" navbar-collapse" id="mainNav">
                          <ul className="navbar-nav mx-auto align-items-center ">
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
                    <div className="col-7 col-md-8 col-lg-3 text-end ">
                      <div className="navbar navbar-expand-lg float-right">
                        <ul className="navbar-nav mr-auto h-list align-items-center ">
                          <li >
                            <a className="" href="#"><img src={Search} alt="" className="navIcons"></img></a>
                          </li>
                          <li >
                            <a className="" href="/login"><img src={User} alt="" className="navIcons"></img></a>
                          </li>
                          <li >
                            <a className="" href="/mycart"><img src={Cart} alt="" className="navIcons"></img></a>
                          </li>
                          <li >
                            <a className="" href="#"><img src={Language} alt="" className="navIcons"></img></a>
                          </li>
                          <li className="nav-item menu mr-auto">
                            <button type="button" className="navbar-toggle" id="menu-toggle">
                            <MenuIcon />
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
            </div>
          )
      }

    </>


  )
}
