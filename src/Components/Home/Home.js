import React, { useMemo, useEffect, useState, useRef } from 'react'
import "../Home/Home.css"
import { Bgloader } from '../Common/Background/Bgloader'
import HomeLogo from '../../Images/Bundles/logo-black.svg'
import Search from '../../Images/Bundles/icon-search.png'
import User from '../../Images/Bundles/icon-user.png'
import Cart from '../../Images/Bundles/icon-cart.png'
import Language from '../../Images/Bundles/icon-language.png'
import CarMarquee from '../../Images/Bundles/car-marquee.svg'
import LemonMarquee from '../../Images/Bundles/green-lemon-margquee.webp'
import MouthMarquee from '../../Images/Bundles/mouth.webp'
import PaintMarquee from '../../Images/Bundles/paint-marquee.webp'
import RocketMarquee from '../../Images/Bundles/paper-rocket-marquee.webp'
import EyeMarquee from '../../Images/Bundles/eye-margquee.svg'
import Loader from '../../Images/Home/load sticker.svg'
import BundlSticker from '../../Images/Bundles/bundl-sticker.png'
import MagicIcon from '../../Images/Bundles/magic-icon.webp'
import BuyBundl from '../../Images/Bundles/buy_a_bundl.webp'
import FillQuestionnarie from '../../Images/Bundles/fill_a_questtionaire.webp'
import Approve from '../../Images/Bundles/approve_edit.webp'
import UploadContent from '../../Images/Bundles/upload_content.webp'
import Getthedesign from '../../Images/Bundles/get_the_design.webp'
import QubeIcon from '../../Images/Bundles/qube-icon.webp'
import Money from '../../Images/Bundles/money-icon.webp'
import Time from '../../Images/Bundles/time-icon.webp'
import Food from '../../Images/Bundles/food-icon.svg'
import Eye from '../../Images/Bundles/eye-icon.svg'
import Eyevintage from '../../Images/Bundles/eye-vintage.webp'
import Diamond from '../../Images/Bundles/diamond-icon.svg'
import MaginIcon from '../../Images/Bundles/magin-icon.svg'
import Create from '../../Images/Bundles/create-captivate-elevate.webp'
import Car from '../../Images/Bundles/car.webp'
import Lemon from '../../Images/Bundles/lemon.webp'
import Mouth from '../../Images/Bundles/mouth.webp'
import Rocket from '../../Images/Bundles/rocket-blue-for-animation.webp'
import Pinkpaint from '../../Images/Bundles/pink-paint.webp'
import GrownIcon from '../../Images/Bundles/grown-icon.svg'
import SystemIcon from '../../Images/Bundles/system-icon.svg'
import Instafeed from '../../Images/Bundles/insta-feed.webp'
import RocketCandy from '../../Images/Bundles/rocket-with-candy.webp'
import FiveStar from '../../Images/Bundles/5-star-rating.svg'
import Linkedin from '../../Images/Bundles/linkedin-icon.png'
import Instagram from '../../Images/Bundles/instagram-icon.png'
import X from '../../Images/Bundles/X-icon.png'
import Facbook from '../../Images/Bundles/facebook-icon.png'
import Pinterestpng from '../../Images/Home/Pinterestpng.png'
import Tiktokpng from '../../Images/Home/Tiktokpng.png'
import { NavLink, useLocation, useNavigate,useParams } from 'react-router-dom'
import CartIcon from '../../Images/Home/Carticon.svg'
import axios from 'axios'
import { base_url } from '../Auth/BackendAPIUrl'
import { ConfigToken } from '../Auth/ConfigToken'
import { Popup } from '../Common/Popup/Popup'
import { Footer } from '../Common/Footer/Footer'
import { Scale } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import popupGIF from '../../Images/popupGIF.gif'
import CloseIcon from '@mui/icons-material/Close';
import { loginAction } from '../../Redux/Action'
import { useDispatch } from 'react-redux'
import plusImage from '../../Images/Bundles/plus-icon.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const imageArray = [Car, Lemon, Mouth, Rocket, Pinkpaint];
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [searchShow, setSearchShow] = useState(false)
    const [searchQry, setSearchQry] = useState('')
    const [token, setToken] = useState(null)
    const [menuVisible, setMenuVisible] = useState(false);
    const popupRef = useRef(null)
    const searchRef = useRef(null)
    const navigationRef = useRef(null)
    const [profileVisible, setProfileVisible] = useState(false)
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const [loading, setLoading] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [slideImage, setSlideImage] = useState(imageArray[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeProcess, setActiveProcess] = useState(0);
    const [ourworks, setOurworks] = useState([])
    const [currentWork, setCurrentWork] = useState(1)
    const [isActiveProcess, setIsActiveProcess] = useState([false, false, false, false, false]);
    const [bundlData, setBundlData] = useState([]);
    const [routeNames , setRouteNames] = useState({
        4:'foodie',
        12:'newbie',
        13:'boutiquer',
        22:'socialite'
      })
    // const translateX = (activeProcess * 200) +60;
    // const translateX = activeProcess * (window.innerWidth <= 475 ? activeProcess <= 4 ? 88.5: window.innerWidth <= 390 ? 80 : 80 : window.innerWidth <= 768 ? 150 : activeProcess < 3 ? 200 : 195) + (window.innerWidth > 1450 ? 60 : 0);
    let translateX = 0;
    if (window.innerWidth <= 390) {
        translateX = activeProcess === 4 ? 285 : activeProcess * 78.5;
    } 
    else if (window.innerWidth <= 400) {
        translateX = activeProcess === 4 ? 315 : activeProcess * 82.5;
    }
    else if (window.innerWidth <= 475) {
        translateX = activeProcess * (activeProcess <= 3 ? 88.5 : 87);
    } 
    else if (window.innerWidth <= 768) {
        translateX = activeProcess * 150;
    } 
    else if (window.innerWidth <= 1450) {
        translateX = activeProcess * (activeProcess < 3 ? 200 : 195);
    } 
    else {
        translateX = activeProcess * (activeProcess < 3 ? 200 : 195) + 60;
    }
    const bundlImages = [QubeIcon, Diamond, Eye, Food, Money]
    const textColor = ["pink-text", "green-text", "blue-text", "pink-text"]
    const titles = ["Just to get started", "For Restaurants and Cafés", "For Salons and Other Services", "For Shops and Online Stores"]
    const processData = [
        {
            title: "BUY A BUNDL",
            description: "Choose from our tailored Bundls, or customize your very own according to your project needs.",
            imgSrc: BuyBundl,
            fill: '#4FA472',
            color: '#000',
        },
        {
            title: "FILL A QUESTIONARE",
            description: "Tell us about your project and what you need. Not sure what you want? Our questionnaire will help you.",
            imgSrc: FillQuestionnarie,
            fill: '#00A8C8',
            color: '#000',
        },
        {
            title: "APPROVE EDIT",
            description: "Your brand logo will be sent for your approval. Need something changed? Just Add-on an adjustment.",
            imgSrc: Approve,
            fill: '#F175AD',
            color: '#000',
        },
        {
            title: "UPLOAD CONTENT",
            description: "You can easily upload the contents for the items in your bundl, to be designed following your approved brand.",
            imgSrc: UploadContent,
            fill: '#4FA472',
            color: '#000',
        },
        {
            title: "GET DESIGNS",
            description: "Your designs will be sent to your account. Need more items? some adjustments? Just Add-on to your bundl.",
            imgSrc: Getthedesign,
            fill: '#00A8C8',
            color: '#000',
        },
    ];
    const [mediaUrls, setmediaUrls] = useState({
        instagram: '',
        facebook: '',
        linked_in: '',
        twitter: ''
    })

    const getMediaUrls = async () => {
        const response = await axios.get(`${base_url}/api/content?section=settings`);
        if (response.data) {
            setmediaUrls(response.data)
        }
    }
    const Logout = async () => {
        try {
            const response = await axios.get(`${base_url}/api/logout`, ConfigToken());
            document.cookie = `token=; path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            dispatch(loginAction(null));
            window.location.reload()

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
    const handleScroll = () => {
        const hash = window.location.hash;
        if (hash) {
            // Select the element based on the hash
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the element
            }
        }
    };
    useEffect(() => {

        // Add an event listener for changes in the hash
        window.addEventListener('hashchange', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('hashchange', handleScroll);
        };
    }, []);


    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1000);

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setSlideImage(imageArray[currentIndex]);
    }, [currentIndex]);

    function checkEnterKey(event) {
        if (event.key === 'Enter') {
            navigate(`/search?query=${event.target.value}`)
        }
    }
    useEffect(() => {
        getBundl();
        getMediaUrls()
        setToken(getCookie('token'))
        handleScroll()
    }, []);
    useEffect(() => {
        const handleClickOutsideProfile = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                if (event.target.closest('.navIcons')) {
                    return; 
                  }else{
                    setProfileVisible(false);
                  }
              }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchShow(false)
            }

        };

        document.addEventListener("mouseup", handleClickOutsideProfile);
        return () => {
            document.removeEventListener("mouseup", handleClickOutsideProfile);
        };
    }, []);


    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            if (navigationRef.current && !navigationRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideMenu);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, []);


    const getBundl = async () => {
        const response = await axios.get(`${base_url}/api/homepage/`);
        setOurworks(response.data.projects)
        setBundlData(response.data);
    }
    const slideChange = (action) => {
        setCurrentWork((prev) => (action == 'next' ? prev + 1 : prev - 1))
    }

    const addToCart = async (index) => {
        try {
            const response = await axios.get(`${base_url}/api/order/cart/`, ConfigToken());
            if (response.data.order_status === 'in_cart') {
                setOpenPopup(true);
                setSelectedIndex(index)
            } else {
                setSelectedIndex(null)
               navigate(`/bundldetail/${routeNames[bundlData.packages[index].id]}`,);
                // navigate(`/bundldetail/${bundlData.packages[index].id}`,);

            }
        } catch (error) {
            console.error('An error occurred:', error);
            navigate(`/login?next_url=bundldetail/${routeNames[bundlData.packages[index].id]}`);
        }
    };


    const emptyCart = async () => {
        setOpenPopup(false);
        await axios.delete(`${base_url}/api/order/cart/`, ConfigToken());
        addToCart(selectedIndex)
    }


    const updateActiveProcess = (index) => {
        const updatedActiveProcess = isActiveProcess.map((_, i) => i <= index);
        setIsActiveProcess(updatedActiveProcess);
    };



    useEffect(() => {
        setTimeout(()=>{
            const element = document.getElementById('ourBundl');
            element?.scrollIntoView({ behavior: 'smooth' });
        },1000)
             
    }, [location?.hash]);
    return (
        <>
            {
                !loading ?
                    <Bgloader /> :
                    <div>
                        <section className="container-fluid header-section" style={{ overflow: "hidden" }}>
                            <div className="nav-section">
                                <div className="">
                                    <div className="row align-items-center">
                                        <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                                            <div className="navbar navbar-expand-lg justify-content-between">
                                                <a className="navbar-brand" href="#ourBundl"><img src={HomeLogo} alt="" className="img-fluid"></img></a>

                                            </div>
                                        </div>
                                        <div className="col-1 col-md-1 col-lg-6">
                                            <div className="navbar navbar-expand-lg justify-content-end">
                                                <div className=" navbar-collapse !mt-4" id="mainNav">
                                                    <ul className=" mx-auto flex align-items-center ">
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="/aboutus">About</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#ourBundl">Bundls</a>
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
                                        <div className="col-7 relative !mt-4 col-md-8 col-lg-3 text-end ">
                                            <div className="navbar navbar-expand-lg float-right">
                                                <ul className=" mr-auto h-list align-items-center ">
                                                    <li className='px-[6px]' >
                                                        <a onClick={() => { setSearchShow(!searchShow);setProfileVisible(false) }} className="cursor-pointer"><img src={Search} alt="" className="navIcons"></img></a>
                                                        <div className='absolute' ref={searchRef}>
                                                            {searchShow ? <input placeholder='Search' onKeyDown={(e) => checkEnterKey(e)} className='border-b focus:outline-none py-1 px-2 mt-3 text-black border-black' value={searchQry} onChange={(e) => setSearchQry(e.target.value)} /> : ''}
                                                        </div>
                                                    </li>
                                                    <li className='px-[6px] inner-nav'>
                                                        <a className="" onClick={() => { setProfileVisible(!profileVisible);setSearchShow(false) }}><img src={User} alt="" className="navIcons cursor-pointer"></img></a>
                                                        <nav className={`w-44 absolute top-full right-[6rem] text-right bg-white py-2 px-3  ${profileVisible ? 'opacity-100 visible z-10' : 'opacity-0 invisible'
                                                            }`}>
                                                            <div ref={popupRef}>
                                                                {profileVisible && (
                                                                    <ul>
                                                                        {token ? (
                                                                            <>
                                                                                <li className='relative p-1 inner-nav-li'>
                                                                                    <a href="/dashboard" className='!text-black' previewlistener="true">Projects</a>
                                                                                </li>
                                                                                <li className='relative p-1 inner-nav-li'>
                                                                                    <a href="/profile" className='!text-black' previewlistener="true">Profile</a>
                                                                                </li>
                                                                                <li className='relative p-1 inner-nav-li'>
                                                                                    <a className='cursor-pointer !text-black' onClick={() => { Logout() }} previewlistener="true">Logout</a>
                                                                                </li>
                                                                            </>
                                                                        ) : (
                                                                            <li className='relative p-1 inner-nav-li'>
                                                                                <a href="/login" className='!text-black' previewlistener="true">Login</a>
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        </nav>
                                                    </li>
                                                    <li className='px-[6px]'>
                                                        <a className="" href="/mycart?direct=true"><img src={Cart} alt="" className="navIcons"></img></a>
                                                    </li>
                                                    <li className='px-[6px]'>
                                                        <a className="" href="#"><img src={Language} alt="" className="navIcons"></img></a>
                                                    </li>
                                                    <li className="nav-item xs:!block sm:!hidden  inner-nav text-center !hidden menu mr-auto">
                                                        <button onClick={toggleMenu} type="button" id="menu-toggle">
                                                            {menuVisible ? <CloseIcon className='!text-[50px]' /> : <MenuIcon className='!text-[50px]' />}
                                                        </button>
                                                        <nav className={`w-44 absolute top-full -right-2 text-right bg-white p-2  ${menuVisible ? 'opacity-100 visible z-10' : 'opacity-0 invisible'
                                                            }`}>
                                                            {/* <ul >
                                                                <li  className='relative p-1 inner-nav-li'>
                                                                    <a href="/" previewlistener="true">Bundl Offers</a>
                                                                </li>
                                                                <li  className='relative p-1 inner-nav-li'>
                                                                    <a href="/our-work" previewlistener="true">Our Work</a>
                                                                </li>
                                                                <li  className='relative p-1 inner-nav-li'>
                                                                    <a href="/aboutus" previewlistener="true">About Us</a>
                                                                </li>
                                                                <li  className='relative p-1 inner-nav-li'>
                                                                    <a href="#" previewlistener="true">Contact Us</a>
                                                                </li>
                                                            </ul> */}

                                                            <div ref={navigationRef}>
                                                                {
                                                                    menuVisible && (
                                                                        <ul className=' inner-nav-item'>
                                                                            <li className='relative p-1 inner-nav-li'>
                                                                                <a href="#ourBundl" className='!text-black' previewlistener="true">Bundls</a>
                                                                            </li>
                                                                            <li className='relative p-1 inner-nav-li'>
                                                                                <a href="/our-work" className='!text-black' previewlistener="true">Our Work</a>
                                                                            </li>
                                                                            <li className='relative p-1 inner-nav-li'>
                                                                                <a href="/aboutus" className='!text-black' previewlistener="true">About Us</a>
                                                                            </li>
                                                                            <li className='relative p-1 inner-nav-li'>
                                                                                <a href="#" className='!text-black' previewlistener="true">Contact Us</a>
                                                                            </li>
                                                                        </ul>
                                                                    )
                                                                }

                                                            </div>
                                                        </nav>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-sider mt-20">
                                <div className="scroller bg-grey">
                                    <ul className="tag-list h-[46px] scroller__inner">
                                        <img src={CarMarquee} className="slidee  w-[54px]"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">BRAND identity</span>
                                        <img src={LemonMarquee} alt="" className="img-fluid w-[41px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">web design</span>
                                        <img src={MouthMarquee} alt="" className="img-fluid w-[30px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">graphic design</span>
                                        <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">BRAND identity</span>
                                        <img src={EyeMarquee} alt="" className="img-fluid w-[47px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">web design</span>
                                        <img src={PaintMarquee} alt="" className="img-fluid w-[56px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">graphic design</span>
                                        <img src={CarMarquee} className="img-fluid w-[54px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">BRAND identity</span>
                                        <img src={LemonMarquee} alt="" className="img-fluid w-[41px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">web design</span>
                                        <img src={MouthMarquee} alt="" className="img-fluid w-[30px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">graphic design</span>
                                        <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">BRAND identity</span>
                                        <img src={EyeMarquee} alt="" className="img-fluid w-[47px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">web design</span>
                                        <img src={PaintMarquee} alt="" className="img-fluid w-[56px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">graphic design</span>
                                        <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">BRAND identity</span>
                                        <img src={LemonMarquee} alt="" className="img-fluid w-[41px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">web design</span>
                                        <img src={MouthMarquee} alt="" className="img-fluid w-[30px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">graphic design</span>
                                        <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">BRAND identity</span>
                                        <img src={EyeMarquee} alt="" className="img-fluid w-[47px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">web design</span>
                                        <img src={PaintMarquee} alt="" className="img-fluid w-[56px] slidee"></img>
                                        <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">graphic design</span>

                                    </ul>
                                </div>
                                {/* <div className="img-rotate">
                                    <img src={Loader} alt="" className="rotating-image"></img>
                                </div> */}
                            </div>
                            <div className="xs:min-h-[54vh] sm:min-h-[73vh]">
                                <div className="hero-text">
                                    <div className="justify-content-cnter text-center mx-auto">
                                        <div className="px-2">

                                        </div>
                                        <h1 className='!text-black sm:px-[9%] xs:px-[11%]  lg:px-[10%] !w-[100%] xs:!text-[26px] sm:!text-[58px] !text-[58px]'><span>Elevating</span> brands & shaping legacies, one <span>extraordinary design</span> at a <i>time.</i></h1>
                                        <div className="button-container scroller">
                                            <ul className="scroll-button h-[46px] scroller__inner_btn">
                                                <li><span><a className='text-black' href='#ourBundl'>Shop our Bundls</a></span></li>
                                                <li><span><img src={MagicIcon} alt="" className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"></img></span></li>
                                                <li><span><a className='text-black' href='#ourBundl'>Shop our Bundls</a></span></li>
                                                <li><span><img src={MagicIcon} alt="" className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"></img></span></li>
                                                <li><span><a className='text-black' href='#ourBundl'>Shop our Bundls</a></span></li>
                                                <li><span><img src={MagicIcon} alt="" className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"></img></span></li>
                                                <li><span><a className='text-black' href='#ourBundl'>Shop our Bundls</a></span></li>
                                            </ul>
                                            <div className="hover-animation btn-blank-hover">
                                                <span className="blue"></span>
                                                <span className="green"></span>
                                                <span className="pink"></span>
                                                <span className="hover-txt"> <a className='sm:text-white hover:text-white xs:text-black' href='#ourBundl'>Shop our Bundls</a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section >

                        <div className='divider '></div>
                        <section className="container-fluid our-process xs:py-[65px] sm:py-[80px]">
                            <div className="container-fluid">
                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-5 text-center">
                                        <h2 className="sub-headeing text-black xs:mt-">Our Process</h2>
                                        {/* <p className="p-24">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p> */}
                                    </div>
                                </div>
                                <div class="image_slider">
                                    <div class="slider">
                                        <div class="slides">
                                            <input type="radio" name="radio-btn" id="radio0" checked={activeProcess === 0}></input>
                                            <input type="radio" name="radio-btn" id="radio1" checked={activeProcess === 1}></input>
                                            <input type="radio" name="radio-btn" id="radio2" checked={activeProcess === 2}></input>
                                            <input type="radio" name="radio-btn" id="radio3" checked={activeProcess === 3}></input>
                                            <input type="radio" name="radio-btn" id="radio4" checked={activeProcess === 4}></input>
                                            <div class="slide first" style={activeProcess === 0 ? { transform: 'scale(1.2)', opacity: 1 } : {}}>
                                                <img src={BuyBundl} slice width="100%" height="100%"></img>
                                            </div>
                                            <div class="slide" style={activeProcess === 1 ? { transform: 'scale(1.1)', opacity: 1 } : {}}>
                                                <img src={FillQuestionnarie} slice width="100%" height="100%"></img>
                                            </div>
                                            <div class="slide" style={activeProcess === 2 ? { transform: 'scale(1.1)', opacity: 1 } : {}}>
                                                <img src={Approve} slice width="100%" height="100%"></img>
                                            </div>
                                            <div class="slide" style={activeProcess === 3 ? { transform: 'scale(1.2)', opacity: 1 } : {}}>
                                                <img src={UploadContent} slice width="100%" height="100%"></img>
                                            </div>
                                            <div class="slide" style={activeProcess === 4 ? { transform: 'scale(1.2)', opacity: 1 } : {}}>
                                                <img src={Getthedesign} slice width="100%" height="100%"></img>
                                            </div>
                                        </div>
                                        {/* <div class="navigation-manual">
                                            <label for="radio0" class="manual-btn"></label>
                                            <label for="radio1" class="manual-btn"></label>
                                            <label for="radio2" class="manual-btn"></label>
                                            <label for="radio3" class="manual-btn"></label>
                                            <label for="radio4" class="manual-btn"></label>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="process_content_s">
                                    <div className="content_s text-center">
                                        <div className="title-cover relative xs:py-[24px] sm:py-[2rem]">
                                            {processData.map((process, index) => (
                                                <div
                                                    key={index}
                                                    className={`process_title xs:text-[30px] sm:text-[30px] font-[700] ${activeProcess === index ? "title-active" : ""}`}
                                                >
                                                    {process.title}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="desc-cover relative xs:h-[70px] xs:mt-[20px] sm:h-[80px]">
                                            {processData.map((process, index) => (
                                                <div
                                                    key={index}
                                                    className={`process_description f-20 text-center ${activeProcess === index ? "desc-active" : ""}`}
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
                                                className={`flower ${activeProcess === index ? "active-flower" : ""}`}
                                                style={window.innerWidth <= 475 ? { display: "flex", flexDirection: "column", alignItems: "center",marginTop:'1%' }:{ display: "flex", flexDirection: "column", alignItems: "center" }}
                                                onMouseEnter={() => {
                                                    setActiveProcess(index);
                                                    updateActiveProcess(index)
                                                }}
                                            >
                                                <svg style={{ fill: 'rgb(0,0,0)' }}
                                                    width="35" className="ash" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z"
                                                        fill={isActiveProcess[index] ? 'black' : 'grey'} />
                                                </svg>
                                                {
                                                    index === 4 ? '' :
                                                        <svg style={{ opacity: isActiveProcess[index + 1] ? 1 : 0.3 }} className="dotted-line" width="193" height="3" viewBox="0 0 193 3" fill="black" xmlns="http://www.w3.org/2000/svg">
                                                            <line x1="0.128418" y1="1.42773" x2="192.397" y2="1.42773" stroke="black" fill='#000' stroke-width="2" stroke-dasharray="10 10" />
                                                        </svg>
                                                }

                                                <div className="content_section !cursor-pointer" style={{ transition: '1s', opacity: isActiveProcess[index] ? 1 : 0.3 }}>
                                                    {process.title.split("  ").map((word, i) => (
                                                        <span key={i}>{word}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <svg className="rocket overlay sm:ml-[-50px] lg:ml-[-50px] md:ml-[-50px] xs:ml-[0px]" style={{ transform: `translateX(${translateX}px)` }} width="103" height="51" viewBox="0 0 103 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g style={{ mixBlendMode: "multiply" }}>
                                            <path d="M17.0243 20.1751L0.10283 39.9605L20.7547 38.3386L33.3441 50.4381L52.0055 44.0664L53.6119 42.9629L58.3442 42.0547L63.9225 39.9665L76.0922 37.2171L100.775 30.1494L102.466 29.1142L102.303 27.853L101.161 27.3343L72.3146 16.0341L49.3982 6.77805L32.8747 0.593947L28.2324 6.28473L25.3511 9.71008L23.2039 11.6917L20.7801 14.6193L19.3632 15.5849L21.3765 19.2735L21.7309 21.025L17.0243 20.1751Z" fill={processData[activeProcess].fill} />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </section>
                        <div className="plus relative plus-deivide">
                            <img className='w-[50px] h-[50px] mx-auto relative -top-[30px]' src={plusImage}></img>
                        </div>


                        <section id='ourBundl' className="container-fluid our-bundl">
                            <div className="container">
                                <div className="row justify-content-center bundl-pack-head">
                                    <div className="col-md-11 col-lg-9">
                                        <h4 className="sub-headeing mb-4 text-center text-black">Our Bundls</h4>
                                        {/* <!-- <div className="our-bundles text-center">
                        <div className="text-animation">
                            WE <div className="bunl"><img src="asset/images/bundl-sticker.png" alt="" className="img-fluie"></div>DESIGN TO MAKE YOUR BRAND 
                            <span className="second_text text-start">
                                <i className="bundl_animate impression">IMPRESSIVE</i>
                                <i className="bundl_animate">UNIQUE</i>
                                <i className="bundl_animate">TOP-NOTCH</i>
                                <i className="bundl_animate">RELIABLE</i>
                                <i className="bundl_animate">BREATHTAKING</i>
                            </span>
                        </div>
                    </div> --> */}
                                    </div>
                                </div>
                            </div>

                            <div className="bundle_design">
                                <div className="pick_design">
                                    {/* <!-- <div className="pick_design_content"> Pick a design bundle suited to you </div> --> */}
                                </div>
                                {/* <!-- table-1 --> */}
                                <div className="sliding_section border-top1" style={{ display: "flex" }} id='bundls-first-child'>
                                    <input  type="checkbox" id="newbie_no1" className="button_section" />

                                    {/* <!-- rotating buiscut --> */}
                                    <div className="icon_section1">
                                        <div className="subzero1">

                                            <span onClick={() => addToCart(0)} className="buiscut_layer1">
                                                <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                ADD TO <br></br>CART</span>
                                            <div onClick={() => addToCart(0)} className="main_inside1"></div>
                                        </div>
                                    </div>

                                    {/* <!-- background color --> */}
                                    <div className="bg_color1"></div>

                                    <div className="open_arrow1 position-relative">
                                        <label className='cursor-pointer' for="newbie_no1">
                                            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
                                            </svg>
                                        </label>
                                    </div>
                                    <div className="newbie_section cursor-pointer" onClick={() => addToCart(0)} style={window.innerWidth <= 475 ? {padding:'5% 0 2% 2%'}:{}}>
                                        <div className="change_brand">
                                            <div className="table_icon"><img src={QubeIcon} alt="" className="img-fluid"></img></div>
                                            <div className="newbie">The Newbie</div>
                                            <div className="pkg-sub-title">Just to get started</div>
                                        </div>
                                        <div className="second_brand_section">
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>Brand Identity</span></div>
                                                <ul className="second_brand_list">
                                                    <li>Brand Concept</li>
                                                    <li>Brand Direction</li>
                                                    <li>Logo Design</li>
                                                    <li>Logo Variations</li>
                                                    <li>Color Palette</li>
                                                    <li>Typography</li>
                                                    <li>Visual Identity</li>
                                                    <li>Brand Guide</li>
                                                </ul>
                                            </div>
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>{window.innerWidth <=475 ? 'Choose Your Add-ons' : 'Choose Your Add-ons'}</span></div>
                                                <ul className="second_brand_list">
                                                    <li>Branding</li>
                                                    <li>E-designs</li>
                                                    <li>Products</li>
                                                    <li>Publications</li>
                                                    <li>Social Media</li>
                                                    <li>Space Design</li>
                                                    <li>Stationery</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="newbie_description">
                                        <div className="third_section_toggle">
                                            <div className="brand_identity pink-text">Brand Identity + <br />
                                                Add-Ons To Your Bundl
                                            </div>
                                            <div className="change_brand_name">
                                                <div className="second_section_image"><img src={QubeIcon} alt="" className="img-fluid"></img></div>
                                                <div className="second_section_text" style={{ paddingTop: "10px" }}>The Newbie</div>
                                            </div>
                                        </div>
                                        <div className="sar d-flex align-items-center">
                                            {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
                                            <span className="sar_text"><span>Starting from</span> 4880 SAR</span>
                                        </div>
                                        <div className="work_time d-flex align-items-center">
                                            {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
                                            <span className="working_days"><span>Starting from</span> 30 WORKING DAYS</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- table-2 --> */}
                                <div className="sliding_section" style={{ display: "flex" }}>
                                    <input type="checkbox" id="newbie_no2" className="button_section" />

                                    {/* <!-- rotating buiscut --> */}
                                    <div className="icon_section2">
                                        <div className="subzero2">
                                            <span onClick={() => addToCart(1)} className="buiscut_layer2">
                                                <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                ADD TO <br></br>CART</span>
                                            <div onClick={() => addToCart(1)} className="main_inside2"></div>
                                        </div>
                                    </div>

                                    {/* <!-- background color --> */}
                                    <div className="bg_color2"></div>

                                    <div className="open_arrow2 position-relative">
                                        <label className='cursor-pointer' for="newbie_no2">
                                            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
                                            </svg>
                                        </label>
                                    </div>
                                    <div className="newbie_section cursor-pointer" onClick={() => addToCart(1)}>
                                        <div className="change_brand">
                                            <div className="table_icon"><img src={Food} alt="" className="img-fluid"></img></div>
                                            <div className="newbie">The Foodie</div>
                                            <div className="pkg-sub-title xs:!pr-8">For Restaurants and Cafés</div>
                                        </div>
                                        <div className="second_brand_section">
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>Brand Identity</span></div>
                                                <ul className="second_brand_list">
                                                    <li>Brand Concept</li>
                                                    <li>Brand Direction</li>
                                                    <li>Logo Design</li>
                                                    <li>Logo Variations</li>
                                                    <li>Color Palette</li>
                                                    <li>Typography</li>
                                                    <li>Visual Identity</li>
                                                    <li>Brand Guide</li>
                                                </ul>
                                            </div>
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>{window.innerWidth <=475 ? 'Collateral' : 'F&B Collateral'}</span></div>
                                                <ul className="second_brand_list">
                                                    <li>1 Page Price List</li>
                                                    <li>Bag</li>
                                                    <li>Box</li>
                                                    <li>Paper Cup</li>
                                                    <li>Sticker</li>
                                                    <li>Wet wipes</li>
                                                    <li>Wrapping Paper</li>
                                                </ul>
                                            </div>
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>Social Media Starter Kit </span></div>
                                                <ul className="second_brand_list">
                                                    <li>GIF Post</li>
                                                    <li>4 Highlight Cover</li>
                                                    <li>Profile Cover</li>
                                                    <li>3 Static Post</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="newbie_description">
                                        <div className="third_section_toggle">
                                            <div className="brand_identity green-text">Brand Identity + <br />
                                               { window.innerWidth <= 768 ? ' F&B Collateral +':'Food & Beverage Collateral +'} <br />
                                                Social Media Starter Kit <br />
                                            </div>
                                            <div className="change_brand_name">
                                                <div className="second_section_image"><img src={Food} alt="" className="img-fluid"></img></div>
                                                <div className="second_section_text" style={{ paddingTop: "10px" }}>The Foodie</div>
                                            </div>
                                        </div>
                                        <div className="sar d-flex align-items-center">
                                            {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
                                            <span className="sar_text">8000 SAR</span>
                                        </div>
                                        <div className="work_time d-flex align-items-center">
                                            {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
                                            <span className="working_days">40 WORKING DAYS</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- table-3 --> */}
                                <div className="sliding_section" style={{ display: "flex" }}>
                                    <input type="checkbox" id="newbie_no3" className="button_section" />

                                    {/* <!-- rotating buiscut --> */}
                                    <div className="icon_section3">
                                        <div className="subzero3">
                                            <span onClick={() => addToCart(2)} className="buiscut_layer3">
                                                <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                ADD TO <br></br>CART</span>
                                            <div onClick={() => addToCart(2)} className="main_inside3"></div>
                                        </div>
                                    </div>

                                    {/* <!-- background color --> */}
                                    <div className="bg_color3"></div>

                                    <div className="open_arrow3 position-relative">
                                        <label className='cursor-pointer' for="newbie_no3">
                                            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
                                            </svg>
                                        </label>
                                    </div>
                                    <div className="newbie_section cursor-pointer" onClick={() => addToCart(2)}>
                                        <div className="change_brand">
                                            <div className="table_icon"><img src={Eye} alt="" className="img-fluid"></img></div>
                                            <div className="newbie">The socialite</div>
                                            <div className="pkg-sub-title">For Salons and Other Services</div>
                                        </div>
                                        <div className="second_brand_section">
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>Brand Identity</span></div>
                                                <ul className="second_brand_list">
                                                    <li>Brand Concept</li>
                                                    <li>Brand Direction</li>
                                                    <li>Logo Design</li>
                                                    <li>Logo Variations</li>
                                                    <li>Color Palette</li>
                                                    <li>Typography</li>
                                                    <li>Visual Identity</li>
                                                    <li>Brand Guide</li>
                                                </ul>
                                            </div>
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>{window.innerWidth <=475 ? 'Collateral' : 'Services Collateral'}</span></div>
                                                <ul className="second_brand_list">
                                                    <li>1 Page Price List</li>
                                                    <li>Bag</li>
                                                    <li>Business Card</li>
                                                    <li>Loyalty Card</li>
                                                    <li>Paper Cup</li>
                                                    <li>Towel</li>
                                                </ul>
                                            </div>
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>Social Media Starter Kit </span></div>
                                                <ul className="second_brand_list">
                                                    <li>GIF Post</li>
                                                    <li>4 Highlight Cover</li>
                                                    <li>Profile Cover</li>
                                                    <li>3 Static Post</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="newbie_description">
                                        <div className="third_section_toggle">
                                            <div className="brand_identity blue-text">Brand Identity + <br />
                                                Services Collateral + <br />
                                                Social Media Starter Kit
                                            </div>
                                            <div className="change_brand_name">
                                                <div className="second_section_image"><img src={Eye} alt="" className="img-fluid"></img></div>
                                                <div className="second_section_text" style={{ paddingTop: "10px" }}>The socialite</div>
                                            </div>
                                        </div>
                                        <div className="sar d-flex align-items-center">
                                            {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
                                            <span className="sar_text">8000 SAR</span>
                                        </div>
                                        <div className="work_time d-flex align-items-center">
                                            {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">-->  */}
                                            <span className="working_days">40 WORKING DAYS</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- table-4 --> */}
                                <div className="sliding_section" style={{ display: "flex" }}>
                                    <input type="checkbox" id="newbie_no4" className="button_section" />

                                    {/* <!-- rotating buiscut --> */}
                                    <div className="icon_section4">
                                        <div className="subzero4">
                                            <span onClick={() => addToCart(3)} className="buiscut_layer4">
                                                <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                ADD TO <br></br>CART</span>
                                            <div onClick={() => addToCart(3)} className="main_inside4"></div>
                                        </div>
                                    </div>

                                    {/* <!-- background color --> */}
                                    <div className="bg_color4"></div>

                                    <div className="open_arrow4 position-relative">
                                        <label className='cursor-pointer' for="newbie_no4">
                                            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
                                            </svg>
                                        </label>
                                    </div>
                                    <div className="newbie_section cursor-pointer" onClick={() => addToCart(3)}>
                                        <div className="change_brand">
                                            <div className="table_icon"><img src={Diamond} alt="" className="img-fluid"></img></div>
                                            <div className="newbie">The Boutiquer</div>
                                            <div className="pkg-sub-title">For Shops and Online Stores </div>
                                        </div>
                                        <div className="second_brand_section">
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>Brand Identity</span></div>
                                                <ul className="second_brand_list">
                                                    <li>Brand Concept</li>
                                                    <li>Brand Direction</li>
                                                    <li>Logo Design</li>
                                                    <li>Logo Variations</li>
                                                    <li>Color Palette</li>
                                                    <li>Typography</li>
                                                    <li>Visual Identity</li>
                                                    <li>Brand Guide</li>
                                                </ul>
                                            </div>
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>{window.innerWidth <=475 ? 'Collateral' : 'Commerce Collateral'}</span></div>
                                                <ul className="second_brand_list">
                                                    <li>Bag</li>
                                                    <li>Box</li>
                                                    <li>Business Card</li>
                                                    <li>Sticker</li>
                                                    <li>Thank you Card</li>
                                                    <li>Wrapping Paper</li>
                                                </ul>
                                            </div>
                                            <div className="box-child">
                                                <div className="pack-inner-title"><span>Social Media Starter Kit </span></div>
                                                <ul className="second_brand_list">
                                                    <li>GIF Post</li>
                                                    <li>4 Highlight Cover</li>
                                                    <li>Profile Cover</li>
                                                    <li>3 Static Post</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="newbie_description">
                                        <div className="third_section_toggle">
                                            <div className="brand_identity pink-text">Brand Identity + <br />
                                                Commerce Collateral + <br />
                                                Social Media Starter Kit
                                            </div>
                                            <div className="change_brand_name">
                                                <div className="second_section_image"><img src={Diamond} alt="" className="img-fluid"></img></div>
                                                <div className="second_section_text" style={{ paddingTop: "10px" }}>The Boutiquer</div>
                                            </div>
                                        </div>
                                        <div className="sar d-flex align-items-center">
                                            {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
                                            <span className="sar_text">8000 SAR</span>
                                        </div>
                                        <div className="work_time d-flex align-items-center">
                                            {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
                                            <span className="working_days">40 WORKING DAYS</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- table-5 --> */}
                                <div className="sliding_section" style={{ display: "flex" }}>
                                    <input type="checkbox" id="newbie_no5" className="button_section" />

                                    {/* <!-- rotating buiscut --> */}
                                    {/* <div className="icon_section5">
                                        <div className="subzero5">
                                            <span  className="buiscut_layer5">Select <br></br>This<br></br> Bundl</span>
                                            <div  className="main_inside5"></div>
                                        </div>
                                    </div> */}

                                    <div className="icon_section5">
                                        <div className="subzero5">

                                            <span className="buiscut_layer5">
                                                <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                <NavLink style={{ color: 'white' }} to="/custombundl" state={{ title: 'Custom Bundl' }}>
                                                    ADD TO <br></br>CART
                                                </NavLink>
                                            </span>
                                            <div className="main_inside5"></div>
                                        </div>
                                    </div>

                                    {/* <!-- background color --> */}
                                    <div className="bg_color5"></div>

                                    <div className="open_arrow5 position-relative">
                                        <label className='cursor-pointer' for="newbie_no5">
                                            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
                                            </svg>
                                        </label>
                                    </div>
                                    <div className="newbie_section cursor-pointer" onClick={() =>navigate("/custombundl")} style={{ justifyContent: "end" }}>
                                        <div className="change_brand">
                                            <div className="table_icon"><img src={MaginIcon} alt="" className="img-fluid" /></div>
                                            <div className="newbie">Customized</div>
                                            <div className="pkg-sub-title">Customize your Bundl</div>
                                        </div>

                                        <div className="second_brand_section" style={{ height: "75%" }}>
                                            <span className="pack-sub-title">Choose from</span>
                                            <div className="box-child box-f-cuztomize-bundl" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <div className="pack-inner-title"><span>+ Branding</span></div>
                                                <div className="pack-inner-title"><span>+ E-designs</span></div>
                                                <div className="pack-inner-title"><span>+ Products</span></div>
                                            </div>
                                            <div className="box-child box-f-cuztomize-bundl" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <div className="pack-inner-title"><span>+ Publications</span></div>
                                                <div className="pack-inner-title"><span>+ Social Media</span></div>
                                                <div className="pack-inner-title"><span>+ Space Design</span></div>
                                            </div>
                                            <div className="box-child box-f-cuztomize-bundl" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <div className="pack-inner-title lg:mobile-t-25 md:mobile-t-25 xs:mt-[7%]"><span>+ Stationery</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="newbie_description">
                                        <div className="third_section_toggle">
                                            <div className="brand_identity">
                                                <div className="block">
                                                    <span className="newbie">Mix & Match</span>
                                                    <div className="pkg-sub-title" style={{ opacity: 0 }}>Customize your Bundl</div>
                                                </div>
                                            </div>
                                            <div className="change_brand_name">
                                                <div className="second_section_image"><img src={MaginIcon} alt="" className="img-fluid" /></div>
                                                <div className="second_section_text" style={{ paddingTop: "10px" }}>Customized</div>
                                            </div>
                                        </div>
                                        {/* <!--<div className="sar d-flex align-items-center">
                        <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">->
                        <span className="sar_text">8000 SAR</span>
                    </div> -->
                    <!-- <div className="work_time d-flex align-items-center">
                        <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">->
                        <span className="working_days">40 WORKING DAYS</span>
                    </div>--> */}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="container-fluid py-1" >
                            <div className="container mb-16">
                                <div className="row justify-content-center">
                                    <div className="col-md-4 flex justify-center">
                                        <img className='xs:w-[150px] sm:w-[170px]' src={popupGIF}></img>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="bunbl-box-news-section">
                            <div className="row justify-content-center bt-1">
                                <div className="col-md-6 center-block text-center border-black lg:border-r-[1px] md:border-r-[1px] xs:border-r-0">
                                    <div className="bundl-box-inner">
                                        <div className="icon">
                                            <img src={GrownIcon} alt="" className="img-fluid"></img>
                                        </div>
                                        <div className="title">
                                            Premium Section
                                        </div>
                                        <div className="desc">
                                            Prefer a one-on-one design experience?
                                        </div>
                                        <a href="/form/premium" className="btn bundl-btn bt-1">Send us a message</a>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center">
                                    <div className="bundl-box-inner">
                                        <div className="icon">
                                            <img src={SystemIcon} alt="" className="img-fluid"></img>
                                        </div>
                                        <div className="title">
                                            website section
                                        </div>
                                        <div className="desc">
                                            Dreaming of a perfect website?
                                        </div>
                                        <a href="/form/webster" className="btn bundl-btn bt-1">Send us a message</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="eyeDivider ourWork-deivide"></div>
                        <section className="container-fluid our-work">
                            <div className="">
                                <div className="section-head">
                                    <div className="row justify-content-center">
                                        <div className="col-md-7">
                                            <h2 className="sub-headeing text-black text-center">Our Work</h2>
                                            {/* <p className="f-20 text-center">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div id='ourWorkContainer' className="row justify-content-center">
                                    <div className="col-md-10">
                                        <div className={`insta-feed  flex justify-center`}>
                                            {/* <img src={Instafeed} alt="" ></img> */}
                                            <div className={`relative  w-full overflow-hidden`}>
                                                {/* Carousel Content */}
                                                <div
                                                    className="flex transition-transform duration-500"
                                                    style={{ transform: `translateX(-${currentWork * 100}%)` }}
                                                >
                                                    {ourworks.map((item, index) => (
                                                        <div key={index} className={`relative  flex-shrink-0 xl:w-[84%] xs:w-[84%] xs:mx-[8%] md:w-[99%] md:mx-1 xl:mx-[8%] flex flex-wrap ${item.project_images.length > 2 ? 'sm:h-[900px] xs:h-[300px]' : 'sm:h-[450px] xs:h-[300px]'} justify-center`}>
                                                            {item.project_images.map((img, imgIndex) => {
                                                                let borderClasses = "border-black border-solid";

                                                                // Apply borders based on image index
                                                                if (imgIndex === 0) borderClasses += " border-r-[2px] border-b-[2px]"; // 1st Image (Right, Bottom)
                                                                if (imgIndex === 1) borderClasses += " border-l-[2px] border-r-[2px] border-b-[2px]"; // 2nd Image (Left, Right, Bottom)
                                                                if (imgIndex === 2) borderClasses += " border-l-[2px] border-b-[2px]"; // 3rd Image (Left, Bottom)
                                                                if (imgIndex === 3) borderClasses += " border-r-[2px] border-t-[2px]"; // 4th Image (Right, Top)
                                                                if (imgIndex === 4) borderClasses += " border-l-[2px] border-r-[2px] border-t-[2px]"; // 5th Image (Left, Right, Top)
                                                                if (imgIndex === 5) borderClasses += " border-l-[2px] border-t-[2px]"; // 6th Image (Left, Top)
                                                                return (<img
                                                                    key={imgIndex}
                                                                    // className="w-1/3 sm:w-[33%] object-cover border-black border-solid border-[5px]"
                                                                    className={`lg:w-1/3 md:w-1/3 xs:w-[30%] lg:object-cover md:object-cover xs:object-fill ${borderClasses}`}
                                                                    src={img}
                                                                    alt={`Project ${index + 1}`}
                                                                />)
                                                            })}
                                                {currentWork != 0 && <button
                                                    onClick={() => slideChange('prev')}
                                                    className="absolute md:left-20 left-20 xs:left-8 top-1/2 transform -translate-y-1/2 w-[30px] sm:w-[30px] xs:w-[10px] h-[35%] bg-black "
                                                >
                                    <ChevronLeftIcon className="text-white" />

                                                </button>
                                                }
                                                {/* Right Button */}
                                                {currentWork != ourworks.length - 1 && <button
                                                    onClick={() => slideChange('next')}
                                                    className="absolute md:right-20 right-20 xs:right-8 m-auto  top-1/2 transform -translate-y-1/2 w-[30px] sm:w-[30px] xs:w-[10px] h-[35%] bg-black">
                                                    <ChevronRightIcon className="text-white " />
                                                </button>
                                                }
                                                        </div>
                                                        
                                                    ))}
                                                </div>

                                                {/* Left Button */}

                                            </div>
                                        </div>
                                        <div className="social-cta text-center">
                                            <a target='_blank' href={`${mediaUrls.instagram}`} className="btn bundl-btn-border text-upper mt-5">Follow us on instagram</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="container-fluid section fact-section">
                            <div className="container">
                                <h2 className="sub-head  text-upper">SO FAR WE’ve completed </h2>
                                <h2 className="title">{bundlData.noOfProjects || 1}</h2>
                                <h3 className="desc text-upper">projects for happy clients</h3>
                            </div>
                        </section>

                        <div className="love love-divider"></div>
                        <section className="container-fluid testimonial">
                            <span className="testimonial-bg1"><img src={RocketCandy} alt="" className="img-fluid"></img></span>
                            <span className="testimonial-bg2"><img src={RocketCandy} alt="" className="img-fluid"></img></span>
                            <span className="testimonial-bg3"><img src={RocketCandy} alt="" className="img-fluid"></img></span>
                            <div className="container w-75">
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <div className="section-head">
                                            <h2 className="sub-headeing text-black text-center">love letters</h2>
                                            <p className="f-20 text-center">We work hard to bring your brand dreams to life. But don’t take only our word for it! Listen to what our clients have to say about us.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-container">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="testimonial-inner">
                                                <div className="testimonial_content">
                                                    Commitment, variety, clarity, fast delivery of different options, accuracy and art is the least that can describe how good they are! Keep up the good work, and we would surely get back to you over and over again!
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
                                    {
                                        window.innerWidth <= 768 ?
                                        <a target='_blank' href="https://www.google.com/search?sca_esv=c4b1341a4b7b7a8e&rlz=1C1OPNX_enIN1088IN1088&sxsrf=AHTn8zpz8heeFIffXtZFmZcBKyfoZlggHQ:1738924330168&q=bundl+designs+reviews&uds=ABqPDvxhviXT310WMxRmyLGmEwIWGxD1D4UaNg1_5mWkuvL-XEHlBMW0Wi5hXsAWml52GBwP0MgahtCC7xIzOfccgCir8jqEM-EUFl8W5TAQZtW1RiBwrQ6eg9Lumr7a35DA3UW1etJjqySLvsDCAu3swGovni-vtvN9dTjA83v60KOxD9627yKA06c5tUy_FosedF9vWioHYMgsreRYsFewxUb2IPmni2ayZr3gorMNTpcZLIypv5tgzZ33pY3Lm3ZXqLhrBu3CF3C_WNhYjJxca9Q4uc_9kNdOSyf491fLCyNbqThFA6O36UEEQF7vrZUZMHWOAEK22_BQhgx5UwnwyKbCztDiilDDN19JaVdNbCZFQpujpiDNHeroUq9oC1G2YdfLrj9V3eKSJf-u1ebBOTQNfuP-WhDcJVPho7PYBp2cmQ0VmhQ&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzfMxsPAhwiZEXurMaV4FghdFjDxW8-kb_wAl5CzlJ4LuB7A7CZCUrHH6TRDNxXAqy2BU86fOeAnWG4ddtnuW93JPkFUY&sa=X&ved=2ahUKEwiZtPb3rbGLAxX_4zgGHfRGAacQk8gLegQIKBAB&ictx=1&biw=393&bih=736&dpr=2.75#ebo=3" className="btn bundl-btn-border">Leave a review</a>
                                        :
                                        <a target='_blank' href="https://www.google.com/search?q=bundldesigns&rlz=1C1OPNX_enIN1088IN1088&oq=bundldesigns&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIICAQQRRgnGDsyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODA5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3e2efdec17da19b7:0xb10d764716306f04,3,,,," className="btn bundl-btn-border">Leave a review</a>
                                    }
                                        {/* <a target='_blank' href="https://www.google.com/search?q=bundldesigns&rlz=1C1OPNX_enIN1088IN1088&oq=bundldesigns&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIICAQQRRgnGDsyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODA5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3e2efdec17da19b7:0xb10d764716306f04,3,,,," className="btn bundl-btn-border">Leave a review</a> */}

                                </div>

                            </div>
                        </section>

                        <div className="bundledivider"></div>
                        <section className="container-fluid section">
                            <div className="container">
                                <div className="quetions-container">
                                    <h2 className="sub-headeing text-upper text-black text-center mb-3">HAVE A QUESTION OR IDEA ?</h2>
                                    <h4 className="h3 text-upper !text-black text-center mb-4">let’s discuss</h4>
                                </div>
                                <div className="social-link  align-items-center">
                                    <ul className="d-flex justify-content-center">
                                        <li className="social-item"><a href={`${mediaUrls.linked_in}`} target='_blank'><img src={Linkedin} alt="" className="img-fluid social-icon"></img></a></li>
                                        <li className="social-item"><a href={`${mediaUrls.instagram}`} target='_blank'><img src={Instagram} alt="" className="img-fluid social-icon"></img></a></li>
                                        <li className="social-item"><a href={`${'https://www.tiktok.com/@bundl_designs'}`} target='_blank'><img src={Tiktokpng} alt="" className="img-fluid social-icon"></img></a></li>
                                        <li className="social-item"><a href={`${'https://id.pinterest.com/BundlDesigns/'}`} target='_blank'><img src={Pinterestpng} alt="" className="img-fluid social-icon"></img></a></li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <Footer />
                    </div>


            }
            {
                openPopup &&
                <Popup
                    openpopup={openPopup}
                    setPopup={setOpenPopup}
                    title={'Your Cart was already full'}
                    subTitle={'Are you sure, you want to empty the cart.'}
                    onClick={emptyCart}
                    save={'Empty Cart'}
                    cancel={'Cancel'}
                />
            }
        </>
    )
}