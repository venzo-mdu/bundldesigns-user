import React, { useState } from 'react'
import '../Navbar/Navbar.css'
import NavLogo from '../../../Images/Navbar/Navlogo.svg'
import HomeLogo from '../../../Images/Bundles/logo-black.svg'
import Language from '../../../Images/Bundles/icon-language.png'
import Search from '../../../Images/Navbar/searchicon.svg'
import Cart from '../../../Images/Bundles/icon-cart.png'
import User from '../../../Images/Bundles/icon-user.png'

import { NavLink } from 'react-router-dom'
export const Navbar = () => {
   
   const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown toggle

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    // <div className='common-navbar'>
    //     <div className='nav-logo'>
    //     <NavLink style={{color:'#000000'}} to="/"><img src={NavLogo}></img></NavLink>
    //     </div>

    //     <div className='nav-items'>
    //        <p><NavLink style={{color:'#000000'}} to="/">Home</NavLink></p>
    //        <p>About</p>
    //        <p>Work</p>
    //        <p>Bundls</p>
    //     </div>
    //     <div className='profile'>
    //       <input className='profile-input'></input>
    //       <img className='search-icon' src={Search}></img>

    //       <NavLink to="/mycart">
    //       <img className='cart-icon' src={Cart}></img>
    //       </NavLink>
    //       <img className='user-icon' src={User}></img>
    //       <div className='profile-name'>HS</div>
    //     </div>
    // </div>
    // <div className="nav-section">
    //   <div style={{padding:'0% 1%'}}>
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
 
 //mobile view changes
<div className="nav-container">
      <div className="nav-section fixed top-0 w-[100%] z-[1]">
        <div style={{ padding: "0% 2%" }} className="">
          <div className="row align-items-center">
            {/* Logo Section */}
            <div className="col-6">
              <a className="navbar-brand" href="/">
                <img src={HomeLogo} alt="home-logo" className="img-fluid" />
              </a>
            </div>

            {/* Toggle Menu for Mobile */}
            <div className="col-6 text-end">
              <button
                type="button"
                className="navbar-toggle"
                onClick={toggleDropdown}
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
           
            {dropdownOpen && (
              <div className="col-12" >
                 <ul className="dropdown-menu show">
                 <li>
                    <a className="dropdown-item" href="/aboutus">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Bundls
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/our-work">
                      Work
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

{/* // Handle screen size changes
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480); // Check if screen width is <= 768px (mobile breakpoint)
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call on mount to set initial state

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
    }
   
<div className='mb-[10%] nav-container'>

    <div className="nav-section bg-[#FFFFFF] w-[100%] z-[1] fixed top-0" >
                                <div style={{padding:'0% 2%'}} className="">
                                    <div className="row align-items-center">
                                        <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                                            <div className="navbar navbar-expand-lg justify-content-between">
                                                <a className="navbar-brand" href="/"><img src={HomeLogo} alt="home-logo" className="img-fluid"></img></a>
                                                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                                                    aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation" id="navbutton">
                                                    <span className="navbar-toggler-icon"></span>
                                                </button> */}
                                             //   </div>
                                              //  </div>
                                              
                                                //   <div className="col-1 col-md-1 col-lg-6">
                                                 //   <div className="navbar navbar-expand-lg justify-content-end">
                                                  //      <div className=" navbar-collapse" id="mainNav">
                                                  {/*}          <ul className="navbar-nav mx-auto align-items-center ">
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
                                                <div className="col-7 col-md-8 col-lg-3 text-end">
                                                    <div className="navbar navbar-expand-lg justify-content-end ">
                                                        <ul className="navbar-nav  h-list align-items-center">
                                                            <li className="nav-item">
                                                                <a className="nav-link" href="#"><img src={Search} alt="" className="img-fluid nav-icon"></img></a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <NavLink to='/login'><a className="nav-link" href="/login"><img src={User} alt="" className="img-fluid nav-icon"></img></a></NavLink>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" href="/mycart"><img src={Cart} alt="" className="img-fluid nav-icon"></img></a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" href="#"><img src={Language} alt="" className="img-fluid nav-icon"></img></a>
                                                            </li>
                                                            <li className="nav-item">
            <div className="dropdown position-relative">
                <a
                    className="nav-link dropdown-toggle"
                    id="menuDropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    onClick={(e) => {
                        e.preventDefault(); // Prevent the default link behavior
                        setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
                    }}
                    href="#"
                >
                    <button type="button" className="navbar-toggle" id="menu-toggle">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </a>
                <ul
                    className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                    aria-labelledby="menuDropdown"
                    style={{
                        top: '100%', // Position the dropdown below the toggle
                        left: '0',   // Align it to the left edge
                        position: 'absolute',
                    }}
                >
                    <li>
                        <a className="dropdown-item" href="/aboutus">About</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/">Bundls</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/our-work">Our-Work</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">Contact us</a>
                    </li>
                </ul>
            </div>
        </li>
        
                                                        </ul>
                                                        <nav className="navigation">
                                                            <ul className="navbar">
                                                                <li>
                                                                    {/* <!-- <a href="">Bundls</a> --> */}
                                                              //      <a href="/" previewlistener="true">Bundl Offers</a>
                                                              //  </li>
                                                              //  <li>
                                                                    {/* <!-- <a href="">Our Work</a> --> */}
                                                               //     <a href="/our-work" previewlistener="true">Our Work</a>
                                                              //  </li>
                                                              //  <li>
                                                               //     <a href="/aboutus" previewlistener="true">About Us</a>
        
                                                               // </li>
                                                               {/*} <li>
                                                                    {/* <!-- <a href="">Contact Us</a> --> */}
                                                                   // <a href="#" previewlistener="true">Contact Us</a>
        
                                                               // </li>
        
                                                         //  </ul>
                                                       // </nav>
                                                  //  </div>
                                              //  </div>
                                           // </div>
                                      //  </div>
                                   // </div>
      //  </div>
        
      //    )
      //  }
      //  }
        