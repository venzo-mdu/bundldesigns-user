import React, { useMemo, useEffect, useState } from "react";
import "../Home/Home.css";
import { Bgloader } from "../Common/Background/Bgloader";
import HomeLogo from "../../Images/Bundles/logo-black.svg";
import Search from "../../Images/Bundles/icon-search.png";
import User from "../../Images/Bundles/icon-user.png";
import Cart from "../../Images/Bundles/icon-cart.png";
import Language from "../../Images/Bundles/icon-language.png";
import CarMarquee from "../../Images/Bundles/car-marquee.webp";
import LemonMarquee from "../../Images/Bundles/green-lemon-margquee.webp";
import MouthMarquee from "../../Images/Bundles/mouth-margquee.webp";
import PaintMarquee from "../../Images/Bundles/paint-marquee.webp";
import RocketMarquee from "../../Images/Bundles/paper-rocket-marquee.webp";
import EyeMarquee from "../../Images/Bundles/eye-margquee.webp";
import Loader from "../../Images/Home/load sticker.svg";
import BundlSticker from "../../Images/Bundles/bundl-sticker.png";
import MagicIcon from "../../Images/Bundles/magic-icon.webp";
import BuyBundl from "../../Images/Bundles/buy_a_bundl.webp";
import FillQuestionnarie from "../../Images/Bundles/fill_a_questtionaire.webp";
import Approve from "../../Images/Bundles/approve_edit.webp";
import UploadContent from "../../Images/Bundles/upload_content.webp";
import Getthedesign from "../../Images/Bundles/get_the_design.webp";
import QubeIcon from "../../Images/Bundles/qube-icon.webp";
import Money from "../../Images/Bundles/money-icon.webp";
import Time from "../../Images/Bundles/time-icon.webp";
import Food from "../../Images/Bundles/food-icon.svg";
import Eye from "../../Images/Bundles/eye-icon.svg";
import Eyevintage from "../../Images/Bundles/eye-vintage.webp";
import Diamond from "../../Images/Bundles/diamond-icon.svg";
import MaginIcon from "../../Images/Bundles/magin-icon.svg";
import Create from "../../Images/Bundles/create-captivate-elevate.webp";
import Car from "../../Images/Bundles/car.webp";
import Lemon from "../../Images/Bundles/lemon.webp";
import Mouth from "../../Images/Bundles/mouth.webp";
import Rocket from "../../Images/Bundles/rocket-blue-for-animation.webp";
import Pinkpaint from "../../Images/Bundles/pink-paint.webp";
import GrownIcon from "../../Images/Bundles/grown-icon.svg";
import SystemIcon from "../../Images/Bundles/system-icon.svg";
import Instafeed from "../../Images/Bundles/insta-feed.webp";
import RocketCandy from "../../Images/Bundles/rocket-with-candy.webp";
import FiveStar from "../../Images/Bundles/5-star-rating.svg";
import Linkedin from "../../Images/Bundles/linkedin-icon.png";
import Instagram from "../../Images/Bundles/instagram-icon.png";
import X from "../../Images/Bundles/X-icon.png";
import Facbook from "../../Images/Bundles/facebook-icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import CartIcon from "../../Images/Home/Carticon.svg";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
import { ConfigToken } from "../Auth/ConfigToken";
import { Popup } from "../Common/Popup/Popup";
import { Footer } from "../Common/Footer/Footer";

export const Home = () => {
  const navigate = useNavigate();
  const imageArray = [Car, Lemon, Mouth, Rocket, Pinkpaint];
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [slideImage, setSlideImage] = useState(imageArray[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [isActiveProcess, setIsActiveProcess] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [bundlData, setBundlData] = useState([]);
  const translateX =
    activeProcess *
    (window.innerWidth <= 475 ? 85 : window.innerWidth <= 768 ? 150 : 195);
  const bundlImages = [QubeIcon, Diamond, Eye, Food, Money];
  const textColor = ["pink-text", "green-text", "blue-text", "pink-text"];
  const titles = [
    "Just to get started",
    "For Restaurants and Cafés",
    "For Salons and Other Services",
    "For Shops and Online Stores",
  ];
  const processData = [
    {
      title: "BUY A BUNDL",
      description:
        "Choose from our tailored Bundls, or customize your very own according to your project needs.",
      imgSrc: BuyBundl,
      fill: "#4FA472",
      color: "#000",
    },
    {
      title: "FILL A QUESTIONARE",
      description:
        "Tell us about your project and what you need. Not sure what you want? Our questionnaire will help you.",
      imgSrc: FillQuestionnarie,
      fill: "#00A8C8",
      color: "#000",
    },
    {
      title: "APPROVE EDIT",
      description:
        "Your brand logo will be sent for your approval. Need something changed? Just Add-on an adjustment.",
      imgSrc: Approve,
      fill: "#F175AD",
      color: "#000",
    },
    {
      title: "UPLOAD CONTENT",
      description:
        "You can easily upload the contents for the items in your bundl, to be designed following your approved brand.",
      imgSrc: UploadContent,
      fill: "#4FA472",
      color: "#000",
    },
    {
      title: "GET DESIGNS",
      description:
        "Your designs will be sent to your account. Need more items? some adjustments? Just Add-on to your bundl.",
      imgSrc: Getthedesign,
      fill: "#00A8C8",
      color: "#000",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setSlideImage(imageArray[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    getBundl();
  }, []);

  const getBundl = async () => {
    const response = await axios.get(`${base_url}/api/homepage/`);
    setBundlData(response.data);
  };

  const addToCart = async (bundleData) => {
    try {
      const response = await axios.get(
        `${base_url}/api/order/cart/`,
        ConfigToken()
      );
      console.log(response, "aa");
      if (response.data.order_status === "in_cart") {
        setOpenPopup(true);
      } else {
        navigate("/bundldetail", { state: { bundlDetail: bundleData } });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      navigate("/login");
    }
  };

  const emptyCart = async () => {
    await axios.delete(`${base_url}/api/order/cart/`, ConfigToken());
    setOpenPopup(false);
  };

  const updateActiveProcess = (index) => {
    const updatedActiveProcess = isActiveProcess.map((_, i) => i <= index);
    setIsActiveProcess(updatedActiveProcess);
  };

  return (
    <>
      {!loading ? (
        <Bgloader />
      ) : (
        <div>
          <section
            className="container-fluid header-section"
            style={{ overflow: "hidden" }}
          >
            <div className="nav-section">
              <div style={{ padding: "0% 2%" }} className="">
                <div className="row align-items-center">
                  <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                    <div className="navbar navbar-expand-lg justify-content-between">
                      <a className="navbar-brand" href="/">
                        <img
                          src={HomeLogo}
                          alt="home-logo"
                          className="img-fluid"
                        ></img>
                      </a>
                      {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                                                    aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation" id="navbutton">
                                                    <span className="navbar-toggler-icon"></span>
                                                </button> */}
                    </div>
                  </div>
                  <div className="col-1 col-md-1 col-lg-6">
                    <div className="navbar navbar-expand-lg justify-content-end">
                      <div className=" navbar-collapse" id="mainNav">
                        <ul className=" mx-auto align-items-center ">
                          <li className="nav-item">
                            <a className="nav-link" href="/aboutus">
                              About
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/">
                              Bundls
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/our-work">
                              Work
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
                  <div className="col-7 col-md-8 col-lg-3 text-end">
                    <div className="navbar navbar-expand-lg justify-content-end ">
                      <ul className="  h-list align-items-center">
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            <img
                              src={Search}
                              alt=""
                              className="img-fluid nav-icon"
                            ></img>
                          </a>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/login">
                            <a className="nav-link" href="/login">
                              <img
                                src={User}
                                alt=""
                                className="img-fluid nav-icon"
                              ></img>
                            </a>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/mycart">
                            <img
                              src={Cart}
                              alt=""
                              className="img-fluid nav-icon"
                            ></img>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">
                            <img
                              src={Language}
                              alt=""
                              className="img-fluid nav-icon"
                            ></img>
                          </a>
                        </li>
                        <li className=" menu">
                          <button
                            type="button"
                            className="navbar-toggle"
                            id="menu-toggle"
                          >
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
                            <a href="#" previewlistener="true">
                              Bundls
                            </a>
                          </li>
                          <li>
                            {/* <!-- <a href="">Our Work</a> --> */}
                            <a href="#" previewlistener="true">
                              Our Work
                            </a>
                          </li>
                          <li>
                            <a href="#" previewlistener="true">
                              About Us
                            </a>
                          </li>
                          <li>
                            {/* <!-- <a href="">Contact Us</a> --> */}
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
            <div className="nav-sider mt-20">
              <div className="scroller bg-grey">
                <ul className="tag-list scroller__inner">
                  <li className="slidee ">
                    <img src={CarMarquee} className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>BRAND identity</span>
                  </li>
                  <li className="slidee ">
                    <img src={LemonMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>web design</span>
                  </li>
                  <li className="slidee ">
                    <img src={MouthMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>graphic design</span>
                  </li>
                  <li className="slidee ">
                    <img src={RocketMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>BRAND identity</span>
                  </li>
                  <li className="slidee ">
                    <img src={EyeMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>web design</span>
                  </li>
                  <li className="slidee ">
                    <img src={PaintMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>graphic design</span>
                  </li>

                  <li className="slidee ">
                    <img src={CarMarquee} className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>BRAND identity</span>
                  </li>
                  <li className="slidee ">
                    <img src={LemonMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>web design</span>
                  </li>
                  <li className="slidee ">
                    <img src={MouthMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>graphic design</span>
                  </li>
                  <li className="slidee ">
                    <img src={RocketMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>BRAND identity</span>
                  </li>
                  <li className="slidee ">
                    <img src={EyeMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>web design</span>
                  </li>
                  <li className="slidee ">
                    <img src={PaintMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>graphic design</span>
                  </li>

                  <li className="slidee ">
                    <img src={CarMarquee} className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>BRAND identity</span>
                  </li>
                  <li className="slidee ">
                    <img src={LemonMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>web design</span>
                  </li>
                  <li className="slidee ">
                    <img src={MouthMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>graphic design</span>
                  </li>
                  <li className="slidee ">
                    <img src={RocketMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>BRAND identity</span>
                  </li>
                  <li className="slidee ">
                    <img src={EyeMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>web design</span>
                  </li>
                  <li className="slidee ">
                    <img src={PaintMarquee} alt="" className="img-fluid"></img>
                  </li>
                  <li className="slidee ">
                    <span>graphic design</span>
                  </li>
                </ul>
              </div>
              {/* <div className="img-rotate">
                                    <img src={Loader} alt="" className="rotating-image"></img>
                                </div> */}
            </div>
            <div className="container">
              <div className="hero-text">
                <div className="justify-content-cnter text-center mx-auto">
                  <div className="px-2"></div>
                  <h1>
                    <span>Elevating</span> brands & shaping legacies, one{" "}
                    <span>extraordinary design</span> at a <i>time.</i>
                  </h1>
                  <div className="button-container scroller">
                    <ul className="scroll-button scroller__inner_btn">
                      <li>
                        <span>Shop our Bundls</span>
                      </li>
                      <li>
                        <span>
                          <img
                            src={MagicIcon}
                            alt=""
                            className="img-fluid"
                          ></img>
                        </span>
                      </li>
                      <li>
                        <span>Shop our Bundls</span>
                      </li>
                      <li>
                        <span>
                          <img
                            src={MagicIcon}
                            alt=""
                            className="img-fluid"
                          ></img>
                        </span>
                      </li>
                      <li>
                        <span>Shop our Bundls</span>
                      </li>
                      <li>
                        <span>
                          <img
                            src={MagicIcon}
                            alt=""
                            className="img-fluid"
                          ></img>
                        </span>
                      </li>
                      <li>
                        <span>Shop our Bundls</span>
                      </li>
                    </ul>

                    <div className="hover-animation btn-blank-hover">
                      <span className="blue"></span>
                      <span className="green"></span>
                      <span className="pink"></span>
                      <span className="hover-txt">Shop our Bundls</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <div className="divider process-deivider"></div> */}
          {/* <section className="container-fluid our-process">
                            <div className="container-fluid">
                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-5 text-center">
                                        <h2 className="sub-headeing">Our Process</h2>
                                        <p className="p-24">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p>
                                    </div>
                                </div>
                                <div className="image_slider">
                                    <div className="slider">
                                        <div className="slides">
                                            <input type="radio" name="radio-btn" id="radio0"></input>
                                            <input type="radio" name="radio-btn" id="radio1"></input>
                                            <input type="radio" name="radio-btn" id="radio2"></input>
                                            <input type="radio" name="radio-btn" id="radio3"></input>
                                            <input type="radio" name="radio-btn" id="radio4"></input>
                                            <div className="slide first">
                                                <img src={BuyBundl} slice width="100%" height="100%"></img>
                                            </div>
                                            <div className="slide">
                                                <img src={FillQuestionnarie} slice width="100%" height="100%"></img>
                                            </div>
                                            <div className="slide">
                                                <img src={Approve} slice width="100%" height="100%"></img>
                                            </div>
                                            <div className="slide">
                                                <img src={UploadContent} slice width="100%" height="100%"></img>
                                            </div>
                                            <div className="slide">
                                                <img src={Getthedesign} slice width="100%" height="100%"></img>
                                            </div>
                                        </div>
                                        <div className="navigation-manual">
                                            <label for="radio0" className="manual-btn"></label>
                                            <label for="radio1" className="manual-btn"></label>
                                            <label for="radio2" className="manual-btn"></label>
                                            <label for="radio3" className="manual-btn"></label>
                                            <label for="radio4" className="manual-btn"></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="process_content_s">
                                    <div className="content_s text-center">
                                        <div className="title-cover">
                                            <div className="process_title title-active">BUY A BUNDL</div>
                                            <div className="process_title">FILL A QUESTIONARE</div>
                                            <div className="process_title">APPROVE EDIT</div>
                                            <div className="process_title">UPLOAD CONTENT</div>
                                            <div className="process_title">GET DESIGNS</div>
                                        </div>
                                        <div className="desc-cover">
                                            <div className="process_description f-20 text-center desc-active">
                                                Choose from our tailored Bundls, or customize your very own according to your project needs.
                                            </div>
                                            <div className="process_description f-20 text-center">
                                                Tell us about your project and what you need. Not sure what you want? Our questionnaire will help you.
                                            </div>
                                            <div className="process_description f-20 text-center">
                                                Your brand logo will be sent for your approval. Need something changed? Just Add-on an adjustment.
                                            </div>
                                            <div className="process_description f-20 text-center">
                                                You can easily upload the contents for the items in your bundl, to be designed following your approved brand.
                                            </div>
                                            <div className="process_description f-20 text-center">
                                                Your designs will be sent to your account. Need more items? some adjustments? Just Add-on to your bundl.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mini-slide">
                                    <div className="navigation-auto">
                                        <div className="auto-btn0 flower" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <svg width="35" className="ash" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z" fill="#000" />
                                            </svg>
                                            <svg className="dotted-line" width="193" height="3" viewBox="0 0 193 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="0.128418" y1="1.42773" x2="192.397" y2="1.42773" stroke="black" stroke-width="2" stroke-dasharray="10 10" />
                                            </svg>
                                            <div className="content_section" style={{ opacity: "1" }}>BUY A<br></br> BUNDLE</div>
                                        </div>
                                        <div className="auto-btn1 flower" style={{ display: "flex", flexDirection: "column", aligItems: "center" }}>
                                            <svg width="35" className="ash" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z" />
                                            </svg>
                                            <svg className="dotted-line" width="193" height="3" viewBox="0 0 193 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="0.128418" y1="1.42773" x2="192.397" y2="1.42773" stroke="black" stroke-width="2" stroke-dasharray="10 10" />
                                            </svg>
                                            <div className="content_section">FILL A<br></br> QUESTIONARE</div>
                                        </div>
                                        <div className="auto-btn2 flower" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <svg width="35" className="ash" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z" />
                                            </svg>
                                            <svg className="dotted-line" width="193" height="3" viewBox="0 0 193 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="0.128418" y1="1.42773" x2="192.397" y2="1.42773" stroke="black" stroke-width="2" stroke-dasharray="10 10" />
                                            </svg>
                                            <div className="content_section">APPROVE<br></br> EDIT</div>
                                        </div>
                                        <div className="auto-btn3 flower" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <svg width="35" className="ash" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z" />
                                            </svg>
                                            <svg className="dotted-line" width="193" height="3" viewBox="0 0 193 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="0.128418" y1="1.42773" x2="192.397" y2="1.42773" stroke="black" stroke-width="2" stroke-dasharray="10 10" />
                                            </svg>
                                            <div className="content_section">UPLOAD<br></br> CONTENT</div>
                                        </div>
                                        <div className="auto-btn4 flower" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <svg width="35" className="ash" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z" />
                                            </svg>
                                            <div className="content_section">GET<br></br> DESIGNS</div>
                                            <div className="line" style={{ visibility: "hidden" }}></div>
                                        </div>
                                    </div>
                                    <svg className="rocket overlay" width="103" height="51" viewBox="0 0 103 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g style={{ mixBlendMode: "multiply" }}>
                                            <path d="M17.0243 20.1751L0.10283 39.9605L20.7547 38.3386L33.3441 50.4381L52.0055 44.0664L53.6119 42.9629L58.3442 42.0547L63.9225 39.9665L76.0922 37.2171L100.775 30.1494L102.466 29.1142L102.303 27.853L101.161 27.3343L72.3146 16.0341L49.3982 6.77805L32.8747 0.593947L28.2324 6.28473L25.3511 9.71008L23.2039 11.6917L20.7801 14.6193L19.3632 15.5849L21.3765 19.2735L21.7309 21.025L17.0243 20.1751Z" fill="#00A8C8" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </section> */}
          <div className="divider "></div>
          <section className="container-fluid our-process">
            <div className="container-fluid">
              <div className="row justify-content-center mb-4">
                <div className="col-md-5 text-center">
                  <h2 className="sub-headeing">Our Process</h2>
                  {/* <p className="p-24">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p> */}
                </div>
              </div>
              <div className="image_slider">
                <div className="slider">
                  <div className="slides">
                    {processData.map((process, index) => (
                      <div
                        className={`slide ${
                          activeProcess === index ? "active-slide" : ""
                        }`}
                        key={index}
                      >
                        <img
                          src={processData[activeProcess].imgSrc}
                          alt={process.title}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="process_content_s">
                <div className="content_s text-center">
                  <div className="title-cover">
                    {processData.map((process, index) => (
                      <div
                        key={index}
                        className={`process_title ${
                          activeProcess === index ? "title-active" : ""
                        }`}
                      >
                        {process.title}
                      </div>
                    ))}
                  </div>
                  <div className="desc-cover">
                    {processData.map((process, index) => (
                      <div
                        key={index}
                        className={`process_description f-20 text-center ${
                          activeProcess === index ? "desc-active" : ""
                        }`}
                      >
                        {process.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mini-slide">
                <div className="navigation-auto">
                  {processData.map((process, index) => (
                    <div
                      key={index}
                      className={`flower ${
                        activeProcess === index ? "active-flower" : ""
                      }`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onMouseEnter={() => {
                        setActiveProcess(index);
                        updateActiveProcess(index);
                      }}
                    >
                      <svg
                        style={{ fill: "rgb(0,0,0)" }}
                        width="35"
                        className="ash"
                        height="35"
                        viewBox="0 0 35 35"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z"
                          fill={isActiveProcess[index] ? "black" : "grey"}
                        />
                      </svg>
                      {index === 4 ? (
                        ""
                      ) : (
                        <svg
                          style={{
                            opacity: isActiveProcess[index + 1] ? 1 : 0.3,
                          }}
                          className="dotted-line"
                          width="193"
                          height="3"
                          viewBox="0 0 193 3"
                          fill="black"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            x1="0.128418"
                            y1="1.42773"
                            x2="192.397"
                            y2="1.42773"
                            stroke="black"
                            fill="#000"
                            stroke-width="2"
                            stroke-dasharray="10 10"
                          />
                        </svg>
                      )}

                      <div
                        className="content_section"
                        style={{
                          transition: "1s",
                          opacity: isActiveProcess[index] ? 1 : 0.3,
                        }}
                      >
                        {process.title.split("  ").map((word, i) => (
                          <span key={i}>{word}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <svg
                  className="rocket overlay"
                  style={{ transform: `translateX(${translateX}px)` }}
                  width="103"
                  height="51"
                  viewBox="0 0 103 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g style={{ mixBlendMode: "multiply" }}>
                    <path
                      d="M17.0243 20.1751L0.10283 39.9605L20.7547 38.3386L33.3441 50.4381L52.0055 44.0664L53.6119 42.9629L58.3442 42.0547L63.9225 39.9665L76.0922 37.2171L100.775 30.1494L102.466 29.1142L102.303 27.853L101.161 27.3343L72.3146 16.0341L49.3982 6.77805L32.8747 0.593947L28.2324 6.28473L25.3511 9.71008L23.2039 11.6917L20.7801 14.6193L19.3632 15.5849L21.3765 19.2735L21.7309 21.025L17.0243 20.1751Z"
                      fill={processData[activeProcess].fill}
                    />
                  </g>
                </svg>
              </div>
            </div>
          </section>
          {/* <div className="divider ourBundl-deivide"></div> */}
          <div className="plus plus-deivide"></div>
          <div className="container">
            <div className="row justify-content-center bundl-pack-head">
              <div className="col-md-11 col-lg-9">
                <h4
                  style={{ margin: "10% 0 0 0" }}
                  className="sub-headeing  text-center"
                >
                  Our Bundls
                </h4>
                {/* <div className="our-bundles text-center">
                                        <div className="text-animation">
                                            WE <div className="bunl"><img src={BundlSticker} width={200} alt="bundl-sticker" className="img-fluie"></img></div>  DESIGN TO MAKE YOUR BRAND
                                            <span className="second_text text-start">
                                                <i className="bundl_animate impression">IMPRESSIVE</i>
                                                <i className="bundl_animate">UNIQUE</i>
                                                <i className="bundl_animate">TOP-NOTCH</i>
                                                <i className="bundl_animate">RELIABLE</i>
                                                <i className="bundl_animate">BREATHTAKING</i>
                                            </span>
                                        </div>
                                    </div> */}
              </div>
            </div>
          </div>

          <div className="bundle_design">
            <div className="pick_design">
              <div className="pick_design_content">
                {" "}
                Pick a design bundle suited to you{" "}
              </div>
            </div>
            {bundlData.packages?.map((bundles, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="sliding_section border-top1"
                    style={{ display: "flex" }}
                  >
                    <input
                      type="checkbox"
                      id={`newbie_no${index + 1}`}
                      className="button_section"
                    ></input>

                    <div className={`icon_section${index + 1}`}>
                      <div className={`subzero${index + 1}`}>
                        <span
                          onClick={() => addToCart(bundles)}
                          className={`buiscut_layer${index + 1}`}
                        >
                          <img
                            style={{ width: "30%" }}
                            src={CartIcon}
                            alt="cart-icon"
                          ></img>
                          <NavLink
                            style={{ color: "white", margin: "2% 0 0 0" }}
                          >
                            {" "}
                            ADD <br />
                            TO CART !
                          </NavLink>
                        </span>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => addToCart(bundles)}
                          className={`main_inside${index + 1}`}
                        ></div>
                      </div>
                    </div>

                    <div className={`bg_color${index + 1}`}></div>

                    <div
                      className={`open_arrow${index + 1}  position-relative`}
                    >
                      <label
                        for={`newbie_no${index + 1}`}
                        style={{ cursor: "pointer" }}
                      >
                        <svg
                          width="18"
                          height="28"
                          viewBox="0 0 18 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029"
                            stroke="auto"
                            stroke-width="4"
                          />
                        </svg>
                      </label>
                    </div>
                    <div className="newbie_section">
                      <div className="change_brand">
                        <div className="table_icon">
                          <img
                            src={bundlImages[index]}
                            alt=""
                            className="img-fluid"
                          ></img>
                        </div>
                        <div className="newbie">{bundles.name_english}</div>
                        <div className="pkg-sub-title">{titles[index]}</div>
                      </div>
                      <div className="second_brand_section">
                        {Object.keys(bundles.design_details).map(
                          (key, index) => (
                            <div className="box-child">
                              <div className="pack-inner-title">
                                <span>{key}</span>
                                {bundles.design_details[key]?.design_list?.map(
                                  (designItem, idx) => (
                                    <React.Fragment key={`${index}-${idx}`}>
                                      <ul className="second_brand_list">
                                        <li>{designItem.name_english}</li>
                                      </ul>
                                    </React.Fragment>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="newbie_description">
                      <div className="third_section_toggle">
                        {/* <div className="brand_identity pink-text">Brand Identity + <br></br>
                                                            Add-Ons To Your Bundl
                                                        </div> */}
                        <div className={`brand_identity ${textColor[index]}`}>
                          {Object.keys(bundles.design_details).map(
                            (key, index) => (
                              <>
                                {key} +<br></br>
                              </>
                            )
                          )}
                        </div>
                        <div className="change_brand_name">
                          <div className="second_section_image">
                            <img
                              src={bundlImages[index]}
                              alt=""
                              className="img-fluid"
                            ></img>
                          </div>
                          <div
                            className="second_section_text"
                            style={{ paddingTop: "10px" }}
                          >
                            {bundles.name_english}
                          </div>
                        </div>
                      </div>
                      <>
                        <div className="sar d-flex align-items-center">
                          {/* <img src={Money} alt="" className="img-fluid"></img> */}
                          <span className="sar_text px-2">
                            <span>
                              {" "}
                              {bundles.name_english === "The Newbie"
                                ? "Starting from"
                                : ""}
                            </span>{" "}
                            {Math.round(bundles.price)} SAR
                          </span>
                        </div>
                        <div className="work_time d-flex align-items-center">
                          {/* <img src={Time} alt="" className="ing-fluid"></img> */}
                          <span className="working_days px-2">
                            <span>
                              {bundles.name_english === "The Newbie"
                                ? "Starting from"
                                : ""}
                            </span>{" "}
                            {Math.round(bundles.time)} WORKING DAYS
                          </span>
                        </div>
                      </>
                    </div>
                  </div>
                </>
              );
            })}
            <div className="sliding_section" style={{ display: "flex" }}>
              <input
                type="checkbox"
                id="newbie_no5"
                className="button_section"
              ></input>

              <div className="icon_section5">
                <div className="subzero5">
                  <span className="buiscut_layer5">
                    <img
                      style={{ width: "30%" }}
                      src={CartIcon}
                      alt="cart-icon"
                    ></img>
                    <NavLink
                      style={{ color: "white" }}
                      to="/custombundl"
                      state={{ title: "Custom Bundl" }}
                    >
                      ADD <br></br>TO CART
                    </NavLink>
                  </span>
                  <div className="main_inside5"></div>
                </div>
              </div>

              <div className="bg_color5"></div>

              <div className="open_arrow5 position-relative">
                <label for="newbie_no5" style={{ cursor: "pointer" }}>
                  <svg
                    width="18"
                    height="28"
                    viewBox="0 0 18 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029"
                      stroke="auto"
                      stroke-width="4"
                    />
                  </svg>
                </label>
              </div>
              <div className="newbie_section" style={{ justifyContent: "end" }}>
                <div className="change_brand">
                  <div className="table_icon">
                    <img src={MaginIcon} alt="" className="img-fluid" />
                  </div>
                  <div className="newbie">Customized</div>
                  <div className="pkg-sub-title">Customize your Bundl</div>
                </div>

                <div className="second_brand_section" style={{ height: "75%" }}>
                  <span className="pack-sub-title">Choose from</span>
                  <div
                    className="box-child box-f-cuztomize-bundl"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="pack-inner-title">
                      <span>+ Branding</span>
                    </div>
                    <div className="pack-inner-title">
                      <span>+ E-designs</span>
                    </div>
                    <div className="pack-inner-title">
                      <span>+ Products</span>
                    </div>
                  </div>
                  <div
                    className="box-child box-f-cuztomize-bundl"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="pack-inner-title">
                      <span>+ Publications</span>
                    </div>
                    <div className="pack-inner-title">
                      <span>+ Social Media</span>
                    </div>
                    <div className="pack-inner-title">
                      <span>+ Space Design</span>
                    </div>
                  </div>
                  <div
                    className="box-child box-f-cuztomize-bundl"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div className="pack-inner-title mobile-t-25">
                      <span>+ Stationery</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="newbie_description">
                <div className="third_section_toggle">
                  <div className="brand_identity">
                    <div className="block">
                      <span className="newbie">Mix & Match</span>
                      <div className="pkg-sub-title" style={{ opacity: "0" }}>
                        Customize your Bundl
                      </div>
                    </div>
                  </div>
                  <div className="change_brand_name">
                    <div className="second_section_image">
                      <img src={MaginIcon} alt="" className="img-fluid" />
                    </div>
                    <div
                      className="second_section_text"
                      style={{ paddingTop: "10px" }}
                    >
                      Customized
                    </div>
                  </div>
                </div>
                {/* <div className="sar d-flex align-items-center">
                                        <img src={Money} alt="" className="img-fluid"></img>
                                        <span className="sar_text">8000 SAR</span>
                                    </div>
                                    <div className="work_time d-flex align-items-center">
                                        <img src={Time} alt="" className="ing-fluid"></img>
                                        <span className="working_days">40 WORKING DAYS</span>
                                    </div> */}
              </div>
            </div>
          </div>

          <section style={{ margin: "5% 0%" }} className="container-fluid py-1">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="home-img-rotation">
                    <div className="text-container">
                      <p className="rotating-text">
                        <img src={Create} alt="" className="img-fluid"></img>
                      </p>
                    </div>
                    <div className="slideshow-container">
                      <div className="mySlides">
                        <img
                          className="slideImages"
                          src={slideImage}
                          alt="Image 1"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bunbl-box-news-section">
            <div className="row justify-content-center bt-1">
              <div className="col-md-6 center-block text-center br-1">
                <div className="bundl-box-inner">
                  <div className="icon">
                    <img src={GrownIcon} alt="" className="img-fluid"></img>
                  </div>
                  <div className="title">Premium Section</div>
                  <div className="desc">
                    Prefer a one-on-one design experience?
                  </div>
                  <a href="/form/premium" className="btn bundl-btn bt-1">
                    Send us a message
                  </a>
                </div>
              </div>
              <div className="col-md-6 text-center">
                <div className="bundl-box-inner">
                  <div className="icon">
                    <img src={SystemIcon} alt="" className="img-fluid"></img>
                  </div>
                  <div className="title">website section</div>
                  <div className="desc">Dreaming of a perfect website?</div>
                  <a href="/form/webster" className="btn bundl-btn bt-1">
                    Send us a message
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="eyeDivider ourWork-deivide"></div>
          <section className="container-fluid our-work">
            <div className="container">
              <div className="section-head">
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <h2 className="sub-headeing text-center">Our Work</h2>
                    {/* <p className="f-20 text-center">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p> */}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <div className="insta-feed">
                    <img src={Instafeed} alt="" className="img-fluid"></img>
                  </div>
                  <div className="social-cta text-center">
                    <a
                      href="#"
                      className="btn bundl-btn-border text-upper mt-5"
                    >
                      Follow us on instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container-fluid section fact-section">
            <div className="container">
              <h2 className="sub-head  text-upper">SO FAR WE’ve completed </h2>
              <h2 className="title">145</h2>
              <h3 className="desc text-upper">projects for happy clients</h3>
            </div>
          </section>

          <div className="love love-divider"></div>
          <section className="container-fluid testimonial">
            <span className="testimonial-bg1">
              <img src={RocketCandy} alt="" className="img-fluid"></img>
            </span>
            <span className="testimonial-bg2">
              <img src={RocketCandy} alt="" className="img-fluid"></img>
            </span>
            <span className="testimonial-bg3">
              <img src={RocketCandy} alt="" className="img-fluid"></img>
            </span>
            <div className="container w-75">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="section-head">
                    <h2 className="sub-headeing text-center">love letters</h2>
                    <p className="f-20 text-center">
                      We work hard to bring your brand dreams to life. But don’t
                      take only our word for it! Listen to what our clients have
                      to say about us.
                    </p>
                  </div>
                </div>
              </div>
              <div className="testimonial-container">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="testimonial-inner">
                      <div className="testimonial_content">
                        Commitment, variety, clarity, fast delivery of different
                        options, accuracy and art is the least that can describe
                        how good they are! Keep up the good work, and we would
                        surely get back to you over and over again!
                      </div>
                      <div className="rating">
                        <img src={FiveStar} alt="" className="img-fluid"></img>
                      </div>
                      <div className="name">
                        SHAWERMAMA <span className="company-name"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 mx-auto mt-5 text-center">
                <a href="#" className="btn bundl-btn-border">
                  Leave a review
                </a>
              </div>
            </div>
          </section>

          <div className="bundledivider"></div>
          <section className="container-fluid section">
            <div className="container">
              <div className="quetions-container">
                <h2 className="sub-headeing text-upper text-center mb-3">
                  HAVE A QUESTION OR IDEA ?
                </h2>
                <h4 className="h3 text-upper text-center mb-4">
                  let’s discuss
                </h4>
              </div>
              <div className="social-link  align-items-center">
                <ul className="d-flex justify-content-center">
                  <li className="social-item">
                    <a href="">
                      <img
                        src={Linkedin}
                        alt=""
                        className="img-fluid social-icon"
                      ></img>
                    </a>
                  </li>
                  <li className="social-item">
                    <a href="">
                      <img
                        src={Instagram}
                        alt=""
                        className="img-fluid social-icon"
                      ></img>
                    </a>
                  </li>
                  <li className="social-item">
                    <a href="">
                      <img
                        src={X}
                        alt=""
                        className="img-fluid social-icon"
                      ></img>
                    </a>
                  </li>
                  <li className="social-item">
                    <a href="">
                      <img
                        src={Facbook}
                        alt=""
                        className="img-fluid social-icon"
                      ></img>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="container-fluid footer primary-black">
            <div style={{ padding: "2% 2%" }} className="container">
              <div className="row p-2">
                <div className="col-4 col-md-3">
                  <div className="footer_inner text-white">
                    <h3>Customer Care</h3>
                    <ul>
                      <li>
                        <a href="#">Contact us</a>
                      </li>
                      <li>
                        <a href="#">FAQs</a>
                      </li>
                      <li>
                        <a href="#">Jobs</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-4 col-md-3">
                  <div className="footer_inner text-white">
                    <h3>My Dasboard</h3>
                    <ul>
                      <li>
                        <a href="#">My Profile</a>
                      </li>
                      <li>
                        <a href="#">Feedack</a>
                      </li>
                      <li>
                        <a href="#">Recommend Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-4 col-md-3">
                  <div className="footer_inner text-white">
                    <h3>Information</h3>
                    <ul>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Legal</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="copy-right p-3">
                <h6 className="copy-txt text-white">
                  2024 BundlDesigns, &copy; All rights reserved.
                </h6>
              </div>
            </div>
          </section>
          {/* <Footer /> */}
        </div>
      )}
      {openPopup && (
        <Popup
          openpopup={openPopup}
          setPopup={setOpenPopup}
          title={"Your Cart was already full"}
          subTitle={"Are you sure, you want to empty the cart."}
          onClick={emptyCart}
          save={"Empty Cart"}
          cancel={"Cancel"}
        />
      )}
    </>
  );
};
