import React, { useMemo, useEffect, useState, useRef } from "react";
import "../Navbar/Navbar.css";
import NavLogo from "../../../Images/Navbar/Navlogo.svg";
import HomeLogo from "../../../Images/Bundles/logo-black.svg";
import Language from "../../../Images/Bundles/icon-language.png";
import Search from "../../../Images/Navbar/searchicon.svg";
import Cart from "../../../Images/Bundles/icon-cart.png";
import User from "../../../Images/Bundles/icon-user.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ConfigToken } from "../../Auth/ConfigToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../Auth/BackendAPIUrl";
import { loginAction } from "../../../Redux/Action";
import { useDispatch } from "react-redux";

export const Navbar = ({ isLang, setIsLang }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileVisible, setProfileVisible] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [searchQry, setSearchQry] = useState("");
  const [token, setToken] = useState(null);
  const popupRef = useRef(null);
  const searchRef = useRef(null);
  const navigationRef = useRef(null);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const commonPaths = [];

  const Logout = async () => {
    try {
      const response = await axios.get(`${base_url}/api/logout`, ConfigToken());
      document.cookie = `token=; path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      dispatch(loginAction(null));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  };

  useEffect(() => {
    setToken(getCookie("token"));
  }, []);

  useEffect(() => {
    const direction = isLang === "ar" ? "rtl" : "ltr";
    if (document.body.dir !== direction) {
      document.body.dir = direction;
    }
    const navElements = document.getElementsByClassName("nav-section");
    if (navElements.length > 0) {
      Array.from(navElements).forEach((el) => {
        el.setAttribute("dir", "ltr");
      });
    }
    const navMenuAr = document.getElementById("nav-menus-ar");
    if (navMenuAr) {
      navMenuAr.setAttribute("dir", direction);
    }
  }, [isLang]);

  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (event.target.closest(".navIcons")) {
          return; // Skip handling the click if it's on the profile icon
        } else {
          setProfileVisible(false);
        }
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchShow(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutsideProfile);
    return () => {
      document.removeEventListener("mouseup", handleClickOutsideProfile);
    };
  }, []);

  function checkEnterKey(event) {
    if (event.key === "Enter") {
      navigate(`/search?query=${event.target.value}`);
    }
  }

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const changeLanguage = (lang) => {
    localStorage?.setItem("lang", lang);
    setIsLang(lang);
  };
  const isCommonNavbar = commonPaths.includes(window.location.pathname);
  return (
    <>
      {isCommonNavbar ? (
        <div className="nav-section ">
          <div className="">
            <div className="row align-items-center">
              <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                <div className="navbar navbar-expand-lg justify-content-between">
                  <a className="navbar-brand" href="/">
                    <img src={HomeLogo} alt="" className="img-fluid"></img>
                  </a>
                </div>
              </div>
              <div className="col-1 col-md-1 col-lg-6">
                <div className="navbar navbar-expand-lg justify-content-end">
                  <div className=" navbar-collapse " id="mainNav">
                    <ul className="navbar-nav  mt-[3%] mx-auto align-items-center ">
                      <li className="nav-item">
                        <a className="nav-link" href="/aboutus">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/#ourBundl">
                          Bundls
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/our-work">
                          Works
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/contact-us">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-7 relative !mt-5 col-md-8 col-lg-3 text-end ">
                <div className="navbar  float-right">
                  <ul className=" mr-auto h-list align-items-center ">
                    <li>
                      <a
                        onClick={() => {
                          setSearchShow(!searchShow);
                          setProfileVisible(false);
                        }}
                      >
                        <img
                          src={Search}
                          alt=""
                          className="navIcons cursor-pointer ml-2"
                        ></img>{" "}
                      </a>
                      <div ref={searchRef}>
                        {searchShow ? (
                          <input
                            placeholder="Search"
                            onKeyDown={(e) => checkEnterKey(e)}
                            className="border-b mt-3 focus:outline-none py-1 px-2 text-black border-black rounded-none"
                            value={searchQry}
                            onChange={(e) => setSearchQry(e.target.value)}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </li>
                    <li className="px-[6px] inner-nav">
                      <a
                        className=""
                        onClick={() => {
                          setProfileVisible(!profileVisible);
                          setSearchShow(false);
                        }}
                      >
                        <img
                          src={User}
                          alt=""
                          className="navIcons cursor-pointer"
                        ></img>
                      </a>
                      <nav
                        className={`w-44 inner-nav-item absolute xs:top-[80px] md:top-[50px] shodow-sm ${
                          isLang === "ar"
                            ? "left-[6rem] text-left"
                            : "right-[6rem] text-right"
                        }  bg-white  py-2 px-3  ${
                          profileVisible
                            ? "opacity-100 visible z-10"
                            : "opacity-0 invisible"
                        }`}
                      >
                        <div ref={popupRef}>
                          {profileVisible && (
                            <ul>
                              {token ? (
                                <>
                                  <li className="relative p-1 inner-nav-li">
                                    <a
                                      href="/dashboard"
                                      className="!text-black"
                                      previewlistener="true"
                                    >
                                      Projects
                                    </a>
                                  </li>
                                  <li className="relative p-1 inner-nav-li">
                                    <a
                                      href="/purchase-history"
                                      className="!text-black"
                                      previewlistener="true"
                                    >
                                      History
                                    </a>
                                  </li>
                                  <li className="relative p-1 inner-nav-li">
                                    <a
                                      href="/profile"
                                      className="!text-black"
                                      previewlistener="true"
                                    >
                                      Profile
                                    </a>
                                  </li>
                                  <li className="relative p-1 inner-nav-li">
                                    <a
                                      className="cursor-pointer !text-black"
                                      onClick={() => {
                                        Logout();
                                      }}
                                      previewlistener="true"
                                    >
                                      Logout
                                    </a>
                                  </li>
                                </>
                              ) : (
                                <li className="relative p-1 inner-nav-li">
                                  <a
                                    href="/login"
                                    className="!text-black"
                                    previewlistener="true"
                                  >
                                    Login
                                  </a>
                                </li>
                              )}
                            </ul>
                          )}
                        </div>
                      </nav>
                    </li>
                    <li>
                      <a className="" href="/mycart?direct=true">
                        <img src={Cart} alt="" className="navIcons  ml-2"></img>
                      </a>
                    </li>
                    <li>
                      <a className="">
                        <img
                          src={Language}
                          alt=""
                          className="navIcons  ml-2"
                        ></img>
                      </a>
                    </li>
                    <li className="nav-item xs:!block sm:!hidden  inner-nav text-center !hidden menu mr-auto">
                      <button
                        onClick={toggleMenu}
                        type="button"
                        id="menu-toggle"
                      >
                        {menuVisible ? (
                          <CloseIcon className="!text-[50px]" />
                        ) : (
                          <MenuIcon className="!text-[50px]" />
                        )}
                      </button>
                      <nav
                        className={`w-44 inner-nav-item absolute xs:top-[80px] md:top-[50px] shadow-sm -right-2 text-right  bg-white p-2 ${
                          menuVisible
                            ? "opacity-100 visible z-10"
                            : "opacity-0 invisible"
                        }`}
                      >
                        <div ref={navigationRef}>
                          {menuVisible && (
                            <ul className=" inner-nav-item">
                              <li className="relative p-1 inner-nav-li">
                                <a
                                  href="/#ourBundl"
                                  className="!text-black"
                                  previewlistener="true"
                                >
                                  Bundls
                                </a>
                              </li>
                              <li className="relative p-1 inner-nav-li">
                                <a
                                  href="/our-work"
                                  className="!text-black"
                                  previewlistener="true"
                                >
                                  Our Work
                                </a>
                              </li>
                              <li className="relative p-1 inner-nav-li">
                                <a
                                  href="/aboutus"
                                  className="!text-black"
                                  previewlistener="true"
                                >
                                  About Us
                                </a>
                              </li>
                              <li className="relative p-1 inner-nav-li">
                                <a
                                  href="/contact-us"
                                  className="!text-black"
                                  previewlistener="true"
                                >
                                  Contact Us
                                </a>
                              </li>
                            </ul>
                          )}
                        </div>
                      </nav>
                    </li>
                  </ul>
                  <nav className="navigation">
                    <ul className="navbar">
                      <li>
                        <a href="/#ourBundl" previewlistener="true">
                          Bundls
                        </a>
                      </li>
                      <li>
                        <a href="/our-work" previewlistener="true">
                          Our Work
                        </a>
                      </li>
                      <li>
                        <a href="/aboutus" previewlistener="true">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="/contact-us" previewlistener="true">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" nav-container">
          <div className="nav-section  border-b border-black bg-[#FFFFFF] w-[100%] z-[1] sticky top-0">
            <div style={{ padding: "0% 0%" }} className="">
              <div className="row items-center">
                <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                  <div className="navbar navbar-expand-lg justify-content-between">
                    <a className="navbar-brand" href="/">
                      <img src={HomeLogo} alt="" className="img-fluid"></img>
                    </a>
                  </div>
                </div>
                <div className="col-1 col-md-1 col-lg-6" id="nav-menus-ar">
                  <div className="navbar navbar-expand-lg justify-content-end">
                    <div className=" navbar-collapse" id="mainNav">
                      <ul className="navbar-nav mt-[3%] mx-auto align-items-center ">
                        <li className="nav-item">
                          <a className="nav-link" href="/aboutus">
                            {isLang === "ar" ? "عن بندل" : "About"}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/#ourBundl">
                            {isLang === "ar" ? "باقاتنا" : "Bundls"}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/our-work">
                            {isLang === "ar" ? "مشاريعنا" : "Work"}
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/contact-us">
                            {isLang === "ar" ? "تواصل معنا" : "Contact Us"}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-7 relative col-md-8  col-lg-3 text-end ">
                  <div className={`navbar navbar-expand-lg float-right`}>
                    <ul
                      className={`${
                        isLang === "ar" ? "sm:mt-[3vh]" : "sm:mt-[5vh]"
                      } xs:mt-0 mr-auto h-list align-items-center `}
                    >
                      <li className="px-[7px]">
                        <a
                          className="w-[26px] cursor-pointer"
                          onClick={() => {
                            setSearchShow(!searchShow);
                            setProfileVisible(false);
                          }}
                        >
                          <img src={Search} alt="" className="navIcons"></img>
                        </a>
                        <div className="absolute" ref={searchRef}>
                          {searchShow ? (
                            <input
                              placeholder="Search"
                              onKeyDown={(e) => checkEnterKey(e)}
                              className="border-b mt-3 focus:outline-none py-1 px-2 text-black border-black rounded-none"
                              value={searchQry}
                              onChange={(e) => setSearchQry(e.target.value)}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </li>

                      <li className="px-[7px] inner-nav">
                        <a
                          className="w-[26px]"
                          onClick={() => {
                            setProfileVisible(!profileVisible);
                            setSearchShow(false);
                          }}
                        >
                          <img
                            src={User}
                            alt=""
                            className="navIcons cursor-pointer"
                          ></img>
                        </a>
                        <nav
                          ref={popupRef}
                          className={`w-44 border-black border-[1px] absolute xs:top-[80px] md:top-[80px] shodow-sm ${
                            isLang === "ar"
                              ? "right-[6rem] text-left"
                              : "right-[6rem] text-right"
                          }  bg-white py-0 px-0  ${
                            profileVisible
                              ? "opacity-100 visible z-10"
                              : "opacity-0 invisible"
                          }`}
                        >
                          <div>
                            {profileVisible && (
                              <ul>
                                {token ? (
                                  <>
                                    <li
                                      className="relative px-3 inner-nav-li"
                                      onClick={() => navigate("/dashboard")}
                                    >
                                      <a
                                        href="/dashboard"
                                        className="text-black"
                                        previewlistener="true"
                                      >
                                        {isLang === "ar"
                                          ? "المشاريع"
                                          : "Projects"}
                                      </a>
                                    </li>
                                    <li
                                      className="relative px-3 inner-nav-li"
                                      onClick={() =>
                                        navigate("/purchase-history")
                                      }
                                    >
                                      <a
                                        href="/purchase-history"
                                        className="text-black"
                                        previewlistener="true"
                                      >
                                        {isLang === "ar"
                                          ? "تاريخ الطلبات​"
                                          : "History"}
                                      </a>
                                    </li>
                                    <li
                                      className="relative px-3 inner-nav-li"
                                      onClick={() => navigate("/profile")}
                                    >
                                      <a
                                        href="/profile"
                                        className="text-black"
                                        previewlistener="true"
                                      >
                                        {isLang === "ar" ? "حسابك​" : "Profile"}
                                      </a>
                                    </li>
                                    <li
                                      className="relative px-3 inner-nav-li"
                                      onClick={() => {
                                        Logout();
                                      }}
                                    >
                                      <a
                                        className="cursor-pointer text-black"
                                        onClick={() => {
                                          Logout();
                                        }}
                                        previewlistener="true"
                                      >
                                        {isLang === "ar"
                                          ? "تسجيل خروج​"
                                          : "Logout"}
                                      </a>
                                    </li>
                                  </>
                                ) : (
                                  <li
                                    className="relative p-1 inner-nav-li"
                                    onClick={() => navigate("/login")}
                                  >
                                    <a
                                      href="/login"
                                      className="text-black"
                                      previewlistener="true"
                                    >
                                      {isLang === "ar"
                                        ? "تسجيل الدخول"
                                        : "Login"}
                                    </a>
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        </nav>
                      </li>
                      <li className="px-[7px]">
                        <a className="w-[26px]" href="/mycart?direct=true">
                          <img src={Cart} alt="" className="navIcons"></img>
                        </a>
                      </li>
                      <li className="px-[7px]">
                        <a
                          className="w-[26px] cursor-pointer"
                          onClick={() =>
                            changeLanguage(isLang == "ar" ? "En" : "ar")
                          }
                        >
                          {isLang === "ar" ? (
                            <p className="mb-0 font-[700] lg:text-[32px] md:text-[32px] xs:text-[24px] text-black mt-[5px] transition-transform duration-300 hover:scale-[1.2]">
                              En
                            </p>
                          ) : (
                            <img
                              src={Language}
                              alt=""
                              className="navIcons"
                            ></img>
                          )}
                        </a>
                      </li>
                      <li className="nav-item xs:!block sm:!hidden  inner-nav text-center !hidden menu mr-auto">
                        <button
                          onClick={toggleMenu}
                          type="button"
                          id="menu-toggle"
                        >
                          {menuVisible ? (
                            <CloseIcon className="!text-[50px]" />
                          ) : (
                            <MenuIcon className="!text-[50px]" />
                          )}
                        </button>
                        <nav
                          className={`w-44 absolute border-[1px] border-black  shadow-sm -right-2 ${
                            isLang === "ar" ? "text-left" : "text-right"
                          } bg-white   ${
                            menuVisible
                              ? "opacity-100 visible z-10"
                              : "opacity-0 invisible"
                          }`}
                        >
                          <div ref={navigationRef}>
                            {menuVisible && (
                              <ul className=" inner-nav-item">
                                <li
                                  className="relative p-1 inner-nav-li"
                                  onClick={() => navigate("/#ourBundl")}
                                >
                                  <a
                                    href="/#ourBundl"
                                    className="text-black"
                                    previewlistener="true"
                                  >
                                    {isLang === "ar" ? "باقاتنا" : "Bundls"}
                                  </a>
                                </li>
                                <li
                                  className="relative p-1 inner-nav-li"
                                  onClick={() => navigate("/our-work")}
                                >
                                  <a
                                    href="/our-work"
                                    className="text-black"
                                    previewlistener="true"
                                  >
                                    {isLang === "ar" ? "مشاريعنا" : "Our Work"}
                                  </a>
                                </li>
                                <li
                                  className="relative p-1 inner-nav-li"
                                  onClick={() => navigate("/aboutus")}
                                >
                                  <a
                                    href="/aboutus"
                                    className="text-black"
                                    previewlistener="true"
                                  >
                                    {isLang === "ar" ? "عن بندل" : "About us"}
                                  </a>
                                </li>
                                <li
                                  className="relative p-1 inner-nav-li"
                                  onClick={() => navigate("/contact-us")}
                                >
                                  <a
                                    href="/contact-us"
                                    className="text-black"
                                    previewlistener="true"
                                  >
                                    {isLang === "ar"
                                      ? "تواصل معنا"
                                      : "Contact Us"}
                                  </a>
                                </li>
                              </ul>
                            )}
                          </div>
                        </nav>
                      </li>
                    </ul>
                    <nav className="navigation">
                      <ul className="navbar">
                        <li>
                          <a href="/#ourBundl" previewlistener="true">
                            Bundls{" "}
                          </a>
                        </li>
                        <li>
                          <a href="/our-work" previewlistener="true">
                            Our Work
                          </a>
                        </li>
                        <li>
                          <a href="/aboutus" previewlistener="true">
                            About Us
                          </a>
                        </li>
                        <li>
                          <a href="/contact-us" previewlistener="true">
                            Contact Us
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
