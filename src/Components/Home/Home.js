// import React, { useMemo, useEffect, useState, useRef } from 'react'
// import "../Home/Home.css"
// import { Bgloader } from '../Common/Background/Bgloader'
// import HomeLogo from '../../Images/Bundles/logo-black.svg'
// import Search from '../../Images/Bundles/icon-search.png'
// import User from '../../Images/Bundles/icon-user.png'
// import Cart from '../../Images/Bundles/icon-cart.png'
// import Language from '../../Images/Bundles/icon-language.png'
// import CarMarquee from '../../Images/Bundles/car-marquee.svg'
// import LemonMarquee from '../../Images/Bundles/green-lemon-margquee.webp'
// import MouthMarquee from '../../Images/Bundles/mouth.webp'
// import PaintMarquee from '../../Images/Bundles/paint-marquee.webp'
// import RocketMarquee from '../../Images/Bundles/paper-rocket-marquee.webp'
// import EyeMarquee from '../../Images/Bundles/eye-margquee.svg'
// import Loader from '../../Images/Home/load sticker.svg'
// import BundlSticker from '../../Images/Bundles/bundl-sticker.png'
// import MagicIcon from '../../Images/Bundles/magic-icon.webp'
// import BuyBundl from '../../Images/Bundles/buy_a_bundl.webp'
// import FillQuestionnarie from '../../Images/Bundles/fill_a_questtionaire.webp'
// import Approve from '../../Images/Bundles/approve_edit.webp'
// import UploadContent from '../../Images/Bundles/upload_content.webp'
// import Getthedesign from '../../Images/Bundles/get_the_design.webp'
// import QubeIcon from '../../Images/Bundles/qube-icon.webp'
// import Money from '../../Images/Bundles/money-icon.webp'
// import Time from '../../Images/Bundles/time-icon.webp'
// import Food from '../../Images/Bundles/food-icon.svg'
// import Eye from '../../Images/Bundles/eye-icon.svg'
// import Eyevintage from '../../Images/Bundles/eye-vintage.webp'
// import Diamond from '../../Images/Bundles/diamond-icon.svg'
// import MaginIcon from '../../Images/Bundles/magin-icon.svg'
// import Create from '../../Images/Bundles/create-captivate-elevate.webp'
// import Car from '../../Images/Bundles/car.webp'
// import Lemon from '../../Images/Bundles/lemon.webp'
// import Mouth from '../../Images/Bundles/mouth.webp'
// import Rocket from '../../Images/Bundles/rocket-blue-for-animation.webp'
// import Pinkpaint from '../../Images/Bundles/pink-paint.webp'
// import GrownIcon from '../../Images/Bundles/grown-icon.svg'
// import SystemIcon from '../../Images/Bundles/system-icon.svg'
// import Instafeed from '../../Images/Bundles/insta-feed.webp'
// import RocketCandy from '../../Images/Bundles/rocket-with-candy.webp'
// import FiveStar from '../../Images/Bundles/5-star-rating.svg'
// import Linkedin from '../../Images/Bundles/linkedin-icon.png'
// import Instagram from '../../Images/Bundles/instagram-icon.png'
// import X from '../../Images/Bundles/X-icon.png'
// import Facbook from '../../Images/Bundles/facebook-icon.png'
// import Pinterestpng from '../../Images/Home/Pinterestpng.png'
// import Tiktokpng from '../../Images/Home/Tiktokpng.png'
// import { NavLink, useLocation, useNavigate,useParams } from 'react-router-dom'
// import CartIcon from '../../Images/Home/Carticon.svg'
// import axios from 'axios'
// import { base_url } from '../Auth/BackendAPIUrl'
// import { ConfigToken } from '../Auth/ConfigToken'
// import { Popup } from '../Common/Popup/Popup'
// import { Footer } from '../Common/Footer/Footer'
// import { Scale } from '@mui/icons-material'
// import MenuIcon from '@mui/icons-material/Menu';
// import popupGIF from '../../Images/popupGIF.gif'
// import CloseIcon from '@mui/icons-material/Close';
// import { loginAction } from '../../Redux/Action'
// import { useDispatch } from 'react-redux'
// import plusImage from '../../Images/Bundles/plus-icon.png'
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// export const Home = ({lang,setLang}) => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const imageArray = [Car, Lemon, Mouth, Rocket, Pinkpaint];
//     const [selectedIndex, setSelectedIndex] = useState(null)
//     const [searchShow, setSearchShow] = useState(false)
//     const [searchQry, setSearchQry] = useState('')
//     const [token, setToken] = useState(null)
//     const [menuVisible, setMenuVisible] = useState(false);
//     const popupRef = useRef(null)
//     const searchRef = useRef(null)
//     const navigationRef = useRef(null)
//     const [profileVisible, setProfileVisible] = useState(false)
//     const toggleMenu = () => {
//         setMenuVisible(!menuVisible);
//     };
//     const [loading, setLoading] = useState(false);
//     const [slideImage, setSlideImage] = useState(imageArray[0]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [activeProcess, setActiveProcess] = useState(0);
//     const [ourworks, setOurworks] = useState([])
//     const [currentWork, setCurrentWork] = useState(1)
//     const [isActiveProcess, setIsActiveProcess] = useState([false, false, false, false, false]);
//     const [isbgChecked, setIsbgChecked] = useState([false, false, false, false, false]);
//     const [bundlData, setBundlData] = useState([]);
//     const [routeNames , setRouteNames] = useState({
//         4:'foodie',
//         12:'newbie',
//         13:'boutiquer',
//         22:'socialite'
//       })
//     // const translateX = (activeProcess * 200) +60;
//     // const translateX = activeProcess * (window.innerWidth <= 475 ? activeProcess <= 4 ? 88.5: window.innerWidth <= 390 ? 80 : 80 : window.innerWidth <= 768 ? 150 : activeProcess < 3 ? 200 : 195) + (window.innerWidth > 1450 ? 60 : 0);
//     let translateX = 0;
//     let translateX_arabic = 0;
//     if (window.innerWidth <= 390) {
//         translateX = activeProcess === 4 ? 285 : activeProcess * 78.5;
//         translateX_arabic = activeProcess === 4 ? -190 : activeProcess * -78.5 + 100;
//     }
//     else if (window.innerWidth <= 400) {
//         translateX = activeProcess === 4 ? 315 : activeProcess * 82.5;
//         translateX_arabic = activeProcess === 4 ? -210 : activeProcess * -82.5 + 100;
//     }
//     else if (window.innerWidth <= 475) {
//         translateX = activeProcess * (activeProcess <= 3 ? 88.5 : 87);
//         translateX_arabic = activeProcess * (activeProcess <= 3 ? -88.5 : -87) + 100;
//     }
//     else if (window.innerWidth <= 768) {
//         translateX = activeProcess * 150;
//         translateX_arabic = activeProcess * 150;
//     }
//     else if (window.innerWidth <= 1450) {
//         translateX = activeProcess * (activeProcess < 3 ? 200 : 195);
//         translateX_arabic = activeProcess * (activeProcess < 3 ? -196 : -195) + 80;
//     }
//     else {
//         translateX = activeProcess * (activeProcess < 3 ? 200 : 195) + 60;
//         translateX_arabic = activeProcess * (activeProcess < 3 ? -200 : -195) + -60;
//     }
//     const bundlImages = [QubeIcon, Diamond, Eye, Food, Money]
//     const textColor = ["pink-text", "green-text", "blue-text", "pink-text"]
//     const titles = ["Just to get started", "For Restaurants and Cafés", "For Salons and Other Services", "For Shops and Online Stores"]
//     const processData = [
//         {
//             title: "BUY A BUNDL",
//             arabic_title:"إشتري بندل",
//             description: "Choose from our tailored Bundls, or customize your very own according to your project needs.",
//             arabic_description:"اختر البندل المناسب لمشروعك. لم تجد ما تبحث عنه؟ صمم البندل الملائم لك",
//             imgSrc: BuyBundl,
//             fill: '#4FA472',
//             color: '#000',
//         },
//         {
//             title: "FILL A QUESTIONARE",
//             arabic_title:"املأ الاستبيان",
//             description: "Tell us about your project and what you need. Not sure what you want? Our questionnaire will help you.",
//             arabic_description:"أخبرنا عن مشروعك وما تريد تصميمه. لست متأكد مما تريد؟ سوف يساعدك استبياننا",
//             imgSrc: FillQuestionnarie,
//             fill: '#00A8C8',
//             color: '#000',
//         },
//         {
//             title: "APPROVE EDIT",
//             arabic_title:"الموافقة / التعديل",
//             description: "Your brand logo will be sent for your approval. Need something changed? Just Add-on an adjustment.",
//             arabic_description:"سيتم إرسال تصميم هويتك للحصول على موافقتك. تحتاج إلى تغيير شيء؟ فقط قم بإضافة تعديل",
//             imgSrc: Approve,
//             fill: '#F175AD',
//             color: '#000',
//         },
//         {
//             title: "UPLOAD CONTENT",
//             arabic_title:"تحميل المحتوى",
//             description: "You can easily upload the contents for the items in your bundl, to be designed following your approved brand.",
//             arabic_description:"يمكنك بسهولة تحميل محتويات المواد الموجودة في البندل الخاصة بك. ستتبع جميع التصاميم ارشادات تصميم هويتك الموافق عليها.",
//             imgSrc: UploadContent,
//             fill: '#4FA472',
//             color: '#000',
//         },
//         {
//             title: "GET DESIGNS",
//             arabic_title:"احصل \عدل تصاميمك",
//             description: "Your designs will be sent to your account. Need more items? some adjustments? Just Add-on to your bundl.",
//             arabic_description:"سيتم إرسال تصاميمك إلى حسابك. هل تحتاج إلى المزيد؟ بعض التعديلات؟ فقط اضف ما تريد إلى البندل الخاصة بك",
//             imgSrc: Getthedesign,
//             fill: '#00A8C8',
//             color: '#000',
//         },
//     ];
//     const [mediaUrls, setmediaUrls] = useState({
//         instagram: '',
//         facebook: '',
//         linked_in: '',
//         twitter: ''
//     })

//     const getMediaUrls = async () => {
//         const response = await axios.get(`${base_url}/api/content?section=settings`);
//         if (response.data) {
//             setmediaUrls(response.data)
//         }
//     }
//     const Logout = async () => {
//         try {
//             const response = await axios.get(`${base_url}/api/logout`, ConfigToken());
//             document.cookie = `token=; path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
//             dispatch(loginAction(null));
//             window.location.reload()

//         } catch (err) {
//             console.log(err)
//         }
//     }

//     const changeLanguage = (lang) =>{
//         localStorage?.setItem('lang',lang)
//         setLang(lang);
//     }
//     const getCookie = (name) => {
//         const value = `; ${document.cookie}`;
//         const parts = value.split(`; ${name}=`);
//         if (parts.length === 2) {
//             return parts.pop().split(';').shift()
//         };
//         return null;
//     };
//     const handleScroll = () => {
//         const hash = window.location.hash;
//         if (hash) {
//             // Select the element based on the hash
//             const element = document.getElementById(hash.substring(1));
//             if (element) {
//                 element.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the element
//             }
//         }
//     };

//     // useEffect(() => {
//     //     const fetchInstagramPosts = async () => {
//     //       try {
//     //         const response = await fetch(
//     //           `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink&access_token=YOUR_ACCESS_TOKEN`
//     //         );
//     //         const data = await response.json();
//     //         console.log(data)
//     //         setPosts(data.data.slice(0, 9)); // Get the last 9 posts
//     //       } catch (error) {
//     //         console.error("Error fetching Instagram posts:", error);
//     //       }
//     //     };

//     //     fetchInstagramPosts();
//     //   }, []);

//     useEffect(() => {

//         // Add an event listener for changes in the hash
//         window.addEventListener('hashchange', handleScroll);

//         // Clean up the event listener on component unmount
//         return () => {
//             window.removeEventListener('hashchange', handleScroll);
//         };
//     }, []);

//     useEffect(() => {
//         const direction = lang === 'ar' ? 'rtl' : 'ltr';
//         if (document.body.dir !== direction) {
//             document.body.dir = direction;
//         }
//     }, [lang]);

//     useEffect(() => {
//         setTimeout(() => {
//             setLoading(true);
//         }, 1000);

//         const intervalId = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
//         }, 500);

//         return () => clearInterval(intervalId);
//     }, []);

//     useEffect(() => {
//         setSlideImage(imageArray[currentIndex]);
//     }, [currentIndex]);

//     function checkEnterKey(event) {
//         if (event.key === 'Enter') {
//             navigate(`/search?query=${event.target.value}`)
//         }
//     }
//     useEffect(() => {
//         getBundl();
//         getMediaUrls()
//         setToken(getCookie('token'))
//         handleScroll()
//     }, []);
//     useEffect(() => {
//         const handleClickOutsideProfile = (event) => {
//             if (popupRef.current && !popupRef.current.contains(event.target)) {
//                 if (event.target.closest('.navIcons')) {
//                     return;
//                   }else{
//                     setProfileVisible(false);
//                   }
//               }
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setSearchShow(false)
//             }

//         };

//         document.addEventListener("mouseup", handleClickOutsideProfile);
//         return () => {
//             document.removeEventListener("mouseup", handleClickOutsideProfile);
//         };
//     }, []);

//     useEffect(() => {
//         const handleClickOutsideMenu = (event) => {
//             if (navigationRef.current && !navigationRef.current.contains(event.target)) {
//                 setMenuVisible(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutsideMenu);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutsideMenu);
//         };
//     }, []);

//     const getBundl = async () => {
//         const response = await axios.get(`${base_url}/api/homepage/`);
//         setOurworks(response.data.projects)
//         setBundlData(response.data);
//     }
//     const slideChange = (action) => {
//         setCurrentWork((prev) => (action == 'next' ? prev + 1 : prev - 1))
//     }

//     const addToCart = async (index) => {
//         try {
//             // const response = await axios.get(`${base_url}/api/order/cart/`, ConfigToken());
//             // if (response.data.order_status === 'in_cart') {
//             //     setOpenPopup(true);
//             //     setSelectedIndex(index)
//             // } else {
//                 setSelectedIndex(null)
//                navigate(`/bundldetail/${routeNames[bundlData?.packages[index]?.id]}`,);
//                 // navigate(`/bundldetail/${bundlData.packages[index].id}`,);
//             // }
//         } catch (error) {
//             console.error('An error occurred:', error);
//             navigate(`/login?next_url=bundldetail/${routeNames[bundlData?.packages[index]?.id]}`);
//         }
//     };

//     const updateActiveProcess = (index) => {
//         const updatedActiveProcess = isActiveProcess.map((_, i) => i <= index);
//         setIsActiveProcess(updatedActiveProcess);
//     };

//     useEffect(() => {
//         if(location?.hash){
//             setTimeout(()=>{
//                 const element = document.getElementById('ourBundl');
//                 element?.scrollIntoView({ behavior: 'smooth' });
//             },1000)
//         }
//     }, [location?.hash]);
//     return (
//         <>
//             {
//                 !loading ?
//                     <Bgloader /> :
//                     <div>
//                         <section className="container-fluid header-section" style={{ overflow: "hidden" }}>
//                             <div className="nav-section">
//                                 <div className="">
//                                     <div className="row align-items-center">
//                                         <div className="col-4 col-md-3 col-lg-3 justify-content-between">
//                                             <div className="navbar navbar-expand-lg justify-content-between">
//                                                 <a className="navbar-brand" href="#ourBundl"><img src={HomeLogo} alt="" className="img-fluid"></img></a>

//                                             </div>
//                                         </div>

//                                         <div className="col-1 col-md-1 col-lg-6">
//                                             <div className="navbar navbar-expand-lg justify-content-end">
//                                                 <div className=" navbar-collapse !mt-4" id="mainNav">
//                                                     <ul className=" mx-auto flex align-items-center ">
//                                                         <li className="nav-item">
//                                                             <a className="nav-link" href="/aboutus">{lang === 'ar' ? 'عن بندل' : 'About'}</a>

//                                                         </li>
//                                                         <li className="nav-item">
//                                                             <a className="nav-link" href="/#ourBundl">{lang === 'ar' ? 'باقاتنا' : 'Bundls'}</a>

//                                                         </li>
//                                                         <li className="nav-item">
//                                                             <a className="nav-link" href="/our-work">{lang === 'ar' ? 'مشاريعنا' : 'Work'}</a>

//                                                         </li>
//                                                         <li className="nav-item">
//                                                             <a className="nav-link" href="/contact-us">{lang === 'ar' ? 'تواصل معنا ' : 'Contact Us'}</a>

//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="col-7 relative !mt-4 col-md-8 col-lg-3 text-end ">
//                                             <div className={`navbar navbar-expand-lg ${lang !== 'ar' && 'float-right'}`}>
//                                                 <ul className=" mr-auto h-list align-items-center ">
//                                                     <li className='px-[6px]' >
//                                                         <a onClick={() => { setSearchShow(!searchShow);setProfileVisible(false) }} className="cursor-pointer"><img src={Search} alt="" className="navIcons"></img></a>
//                                                         <div className='absolute' ref={searchRef}>
//                                                             {searchShow ? <input placeholder='Search' onKeyDown={(e) => checkEnterKey(e)} className='border-b focus:outline-none py-1 px-2 mt-3 text-black border-black' value={searchQry} onChange={(e) => setSearchQry(e.target.value)} /> : ''}
//                                                         </div>
//                                                     </li>
//                                                     <li className='px-[6px] inner-nav'>
//                                                         <a className="" onClick={() => { setProfileVisible(!profileVisible);setSearchShow(false) }}><img src={User} alt="" className="navIcons cursor-pointer"></img></a>
//                                                         <nav className={`w-44 absolute top-full right-[6rem] text-right bg-white py-2 px-3  ${profileVisible ? 'opacity-100 visible z-10' : 'opacity-0 invisible'
//                                                             }`}>
//                                                             <div ref={popupRef}>
//                                                                 {profileVisible && (
//                                                                     <ul>
//                                                                         {token ? (
//                                                                             <>
//                                                                                 <li className='relative p-1 inner-nav-li'>
//                                                                                     <a href="/dashboard" className='!text-black' previewlistener="true">{lang === 'ar' ?'مشاريعنا':'Projects'}</a>
//                                                                                 </li>
//                                                                                 <li className='relative p-1 inner-nav-li'>
//                                                                                     <a href="/purchase-history" className='!text-black' previewlistener="true">{lang === 'ar' ?'تاريخ':'History'}</a>
//                                                                                 </li>
//                                                                                 <li className='relative p-1 inner-nav-li'>
//                                                                                     <a href="/profile" className='!text-black' previewlistener="true">{lang === 'ar' ? 'حسابك' :'Profile'}</a>
//                                                                                 </li>
//                                                                                 <li className='relative p-1 inner-nav-li'>
//                                                                                     <a className='cursor-pointer !text-black' onClick={() => { Logout() }} previewlistener="true">{lang === 'ar' ? 'خروج تسجيل ':'Logout'}</a>
//                                                                                 </li>
//                                                                             </>
//                                                                         ) : (
//                                                                             <li className='relative p-1 inner-nav-li'>
//                                                                                 <a href="/login" className='!text-black' previewlistener="true">{lang === 'ar' ?'تسجيل الدخول':'Login'}</a>
//                                                                             </li>
//                                                                         )}
//                                                                     </ul>
//                                                                 )}
//                                                             </div>
//                                                         </nav>
//                                                     </li>
//                                                     <li className='px-[6px]'>
//                                                         <a className="" href="/mycart?direct=true"><img src={Cart} alt="" className="navIcons"></img></a>
//                                                     </li>
//                                                     <li className='px-[6px]'>
//                                                         <a className="cursor-pointer" onClick={()=>changeLanguage(lang == 'ar' ? 'En' :'ar')}>{lang === 'ar' ?<p className='mb-0 font-[700] text-[32px] text-black'>En</p>:<img src={Language} alt="" className="navIcons"></img>}</a>
//                                                     </li>
//                                                     <li className="nav-item xs:!block sm:!hidden  inner-nav text-center !hidden menu mr-auto">
//                                                         <button onClick={toggleMenu} type="button" id="menu-toggle">
//                                                             {menuVisible ? <CloseIcon className='!text-[50px]' /> : <MenuIcon className='!text-[50px]' />}
//                                                         </button>
//                                                         <nav className={`w-44 absolute top-full -right-2 text-right bg-white p-2  ${menuVisible ? 'opacity-100 visible z-10' : 'opacity-0 invisible'
//                                                             }`}>
//                                                             {/* <ul >
//                                                                 <li  className='relative p-1 inner-nav-li'>
//                                                                     <a href="/" previewlistener="true">Bundl Offers</a>
//                                                                 </li>
//                                                                 <li  className='relative p-1 inner-nav-li'>
//                                                                     <a href="/our-work" previewlistener="true">Our Work</a>
//                                                                 </li>
//                                                                 <li  className='relative p-1 inner-nav-li'>
//                                                                     <a href="/aboutus" previewlistener="true">About Us</a>
//                                                                 </li>
//                                                                 <li  className='relative p-1 inner-nav-li'>
//                                                                     <a href="#" previewlistener="true">Contact Us</a>
//                                                                 </li>
//                                                             </ul> */}

//                                                             <div ref={navigationRef}>
//                                                                 {
//                                                                     menuVisible && (
//                                                                         <ul className=' inner-nav-item'>
//                                                                             <li className='relative p-1 inner-nav-li'>
//                                                                                 <a href="#ourBundl" className='!text-black' previewlistener="true">Bundls</a>
//                                                                             </li>
//                                                                             <li className='relative p-1 inner-nav-li'>
//                                                                                 <a href="/our-work" className='!text-black' previewlistener="true">Our Work</a>
//                                                                             </li>
//                                                                             <li className='relative p-1 inner-nav-li'>
//                                                                                 <a href="/aboutus" className='!text-black' previewlistener="true">About Us</a>
//                                                                             </li>
//                                                                             <li className='relative p-1 inner-nav-li'>
//                                                                                 <a href="/contact-us" className='!text-black' previewlistener="true">Contact Us</a>
//                                                                             </li>
//                                                                         </ul>
//                                                                     )
//                                                                 }

//                                                             </div>
//                                                         </nav>
//                                                     </li>
//                                                 </ul>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="nav-sider mt-20">
//                                 <div className="scroller bg-grey">
//                                     <ul className="tag-list h-[46px] scroller__inner">
//                                         <img src={CarMarquee} className="slidee  w-[54px]"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'بصرية هوية':'BRAND identity'}</span>
//                                         <img src={LemonMarquee} alt="" className="img-fluid w-[41px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ? 'الكترونية متاجر':'web design'}</span>
//                                         <img src={MouthMarquee} alt="" className="img-fluid w-[30px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'جرافيكي تصميم':'graphic design'}</span>
//                                         <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'بصرية هوية':'BRAND identity'}</span>
//                                         <img src={EyeMarquee} alt="" className="img-fluid w-[47px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ? 'الكترونية متاجر':'web design'}</span>
//                                         <img src={PaintMarquee} alt="" className="img-fluid w-[56px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'جرافيكي تصميم':'graphic design'}</span>
//                                         <img src={CarMarquee} className="img-fluid w-[54px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'بصرية هوية':'BRAND identity'}</span>
//                                         <img src={LemonMarquee} alt="" className="img-fluid w-[41px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ? 'الكترونية متاجر':'web design'}</span>
//                                         <img src={MouthMarquee} alt="" className="img-fluid w-[30px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'جرافيكي تصميم':'graphic design'}</span>
//                                         <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'بصرية هوية':'BRAND identity'}</span>
//                                         <img src={EyeMarquee} alt="" className="img-fluid w-[47px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ? 'الكترونية متاجر':'web design'}</span>
//                                         <img src={PaintMarquee} alt="" className="img-fluid w-[56px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'جرافيكي تصميم':'graphic design'}</span>
//                                         <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'بصرية هوية':'BRAND identity'}</span>
//                                         <img src={LemonMarquee} alt="" className="img-fluid w-[41px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ? 'الكترونية متاجر':'web design'}</span>
//                                         <img src={MouthMarquee} alt="" className="img-fluid w-[30px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'جرافيكي تصميم':'graphic design'}</span>
//                                         <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'بصرية هوية':'BRAND identity'}</span>
//                                         <img src={EyeMarquee} alt="" className="img-fluid w-[47px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ? 'الكترونية متاجر':'web design'}</span>
//                                         <img src={PaintMarquee} alt="" className="img-fluid w-[56px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'جرافيكي تصميم':'graphic design'}</span>
//                                         <img src={CarMarquee} className="slidee  w-[54px]"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'بصرية هوية':'BRAND identity'}</span>
//                                         <img src={LemonMarquee} alt="" className="img-fluid w-[41px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ? 'الكترونية متاجر':'web design'}</span>
//                                         <img src={MouthMarquee} alt="" className="img-fluid w-[30px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'جرافيكي تصميم':'graphic design'}</span>
//                                         <img src={RocketMarquee} alt="" className="img-fluid w-[70px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'بصرية هوية':'BRAND identity'}</span>
//                                         <img src={EyeMarquee} alt="" className="img-fluid w-[47px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ? 'الكترونية متاجر':'web design'}</span>
//                                         <img src={PaintMarquee} alt="" className="img-fluid w-[56px] slidee"></img>
//                                         <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">{lang === 'ar' ?'جرافيكي تصميم':'graphic design'}</span>
//                                     </ul>
//                                 </div>
//                                 {/* <div className="img-rotate">
//                                     <img src={Loader} alt="" className="rotating-image"></img>
//                                 </div> */}
//                             </div>
//                             <div className="xs:min-h-[54vh] sm:min-h-[73vh]">
//                                 <div className="hero-text">
//                                     <div className="justify-content-cnter text-center mx-auto">
//                                         <div className="px-2">

//                                         </div>
//                                         {/* <h1 className='!text-black sm:px-[9%] xs:px-[11%]  lg:px-[10%] !w-[100%] xs:!text-[26px] sm:!text-[58px] !text-[58px]'><span>هوية بصرية تصميم جرافيكي متاجر
//                     الكترونية​ Elevating</span> brands & shaping legacies, one <span>extraordinary design</span> at a <i>time.</i></h1> */}
//                       <h1 className='!text-black sm:px-[9%] xs:px-[11%]  lg:px-[10%] !w-[100%] xs:!text-[26px] sm:!text-[58px] !text-[58px]'><span>Elevating</span> brands & shaping legacies, one <span>extraordinary design</span> at a <i>time.</i></h1>
//                                         <div className="button-container scroller">
//                                             <ul className="scroll-button h-[46px] scroller__inner_btn">
//                                                 <li><span><a className='text-black' href='#ourBundl'>{lang === 'ar' ?'باقاتنا تصفح':'Shop our Bundls'}</a></span></li>
//                                                 <li><span><img src={MagicIcon} alt="" className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"></img></span></li>
//                                                 <li><span><a className='text-black' href='#ourBundl'>{lang === 'ar' ?'باقاتنا تصفح':'Shop our Bundls'}</a></span></li>
//                                                 <li><span><img src={MagicIcon} alt="" className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"></img></span></li>
//                                                 <li><span><a className='text-black' href='#ourBundl'>{lang === 'ar' ?'باقاتنا تصفح':'Shop our Bundls'}</a></span></li>
//                                                 <li><span><img src={MagicIcon} alt="" className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"></img></span></li>
//                                                 <li><span><a className='text-black' href='#ourBundl'>{lang === 'ar' ?'باقاتنا تصفح':'Shop our Bundls'}</a></span></li>
//                                             </ul>
//                                             <div className="hover-animation btn-blank-hover">
//                                                 <span className="blue"></span>
//                                                 <span className="green"></span>
//                                                 <span className="pink"></span>
//                                                 <span className="hover-txt"> <a className='sm:text-white hover:!text-white xs:text-black' href='#ourBundl'>{lang === 'ar' ?'باقاتنا تصفح':'Shop our Bundls'}</a></span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section >

//                         <div className='divider '></div>
//                         <section className="container-fluid our-process xs:py-[65px] sm:py-[80px]">
//                             <div className="container-fluid">
//                                 <div className="row justify-content-center mb-4">
//                                     <div className="col-md-5 text-center">
//                                         <h2 className="sub-headeing text-black xs:mt-">{lang === 'ar' ? 'آليتنا ':'Our Process'}</h2>
//                                         {/* <p className="p-24">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p> */}
//                                     </div>
//                                 </div>
//                                 <div class="image_slider">
//                                     <div class="slider">
//                                         <div class="slides">
//                                             <input type="radio" name="radio-btn" id="radio0" checked={activeProcess === 0}></input>
//                                             <input type="radio" name="radio-btn" id="radio1" checked={activeProcess === 1}></input>
//                                             <input type="radio" name="radio-btn" id="radio2" checked={activeProcess === 2}></input>
//                                             <input type="radio" name="radio-btn" id="radio3" checked={activeProcess === 3}></input>
//                                             <input type="radio" name="radio-btn" id="radio4" checked={activeProcess === 4}></input>
//                                             <div class="slide first" style={activeProcess === 0 ? { transform: 'scale(1.2)', opacity: 1 } : {}}>
//                                                 <img src={BuyBundl} slice width="100%" height="100%"></img>
//                                             </div>
//                                             <div class="slide" style={activeProcess === 1 ? { transform: 'scale(1.1)', opacity: 1 } : {}}>
//                                                 <img src={FillQuestionnarie} slice width="100%" height="100%"></img>
//                                             </div>
//                                             <div class="slide" style={activeProcess === 2 ? { transform: 'scale(1.1)', opacity: 1 } : {}}>
//                                                 <img src={Approve} slice width="100%" height="100%"></img>
//                                             </div>
//                                             <div class="slide" style={activeProcess === 3 ? { transform: 'scale(1.2)', opacity: 1 } : {}}>
//                                                 <img src={UploadContent} slice width="100%" height="100%"></img>
//                                             </div>
//                                             <div class="slide" style={activeProcess === 4 ? { transform: 'scale(1.2)', opacity: 1 } : {}}>
//                                                 <img src={Getthedesign} slice width="100%" height="100%"></img>
//                                             </div>
//                                         </div>
//                                         {/* <div class="navigation-manual">
//                                             <label for="radio0" class="manual-btn"></label>
//                                             <label for="radio1" class="manual-btn"></label>
//                                             <label for="radio2" class="manual-btn"></label>
//                                             <label for="radio3" class="manual-btn"></label>
//                                             <label for="radio4" class="manual-btn"></label>
//                                         </div> */}
//                                     </div>
//                                 </div>
//                                 <div className="process_content_s">
//                                     <div className="content_s text-center">
//                                         <div className="title-cover relative xs:py-[24px] sm:py-[2rem]">
//                                             {processData.map((process, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className={`process_title xs:text-[30px] sm:text-[30px] font-[700] ${activeProcess === index ? "title-active" : ""}`}
//                                                 >
//                                                     {lang === 'ar' ? process.arabic_title:process.title}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="desc-cover relative xs:h-[70px] xs:mt-[20px] sm:h-[80px]">
//                                             {processData.map((process, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className={`process_description f-20 text-center ${activeProcess === index ? "desc-active" : ""}`}
//                                                 >

//                                                     { lang === 'ar' ? process.arabic_description : process.description }
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mini-slide">
//                                     <div className="navigation-auto">
//                                         {processData.map((process, index) => (
//                                             <div
//                                                 key={index}
//                                                 className={`flower ${activeProcess === index ? "active-flower" : ""}`}
//                                                 style={window.innerWidth <= 475 ? { display: "flex", flexDirection: "column", alignItems: "center",marginTop:'1%' }:{ display: "flex", flexDirection: "column", alignItems: "center" }}
//                                                 onMouseEnter={() => {
//                                                     setActiveProcess(index);
//                                                     updateActiveProcess(index)
//                                                 }}
//                                             >
//                                                 <svg style={{ fill: 'rgb(0,0,0)' }}
//                                                     width="35" className="ash" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
//                                                     <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z"
//                                                         fill={isActiveProcess[index] ? 'black' : 'grey'} />
//                                                 </svg>
//                                                 {
//                                                     index === 4 ? '' :
//                                                         <svg style={{ opacity: isActiveProcess[index + 1] ? 1 : 0.3 }} className="dotted-line" width="193" height="3" viewBox="0 0 193 3" fill="black" xmlns="http://www.w3.org/2000/svg">
//                                                             <line x1="0.128418" y1="1.42773" x2="192.397" y2="1.42773" stroke="black" fill='#000' stroke-width="2" stroke-dasharray="10 10" />
//                                                         </svg>
//                                                 }

//                                                 <div className="content_section !cursor-pointer" style={{ transition: '1s', opacity: isActiveProcess[index] ? 1 : 0.3 }}>
//                                                     {(lang === 'ar' ? process.arabic_title : process.title).split("  ").map((word, i) => (
//                                                         <span key={i}>{word}</span>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <svg className="rocket overlay sm:ml-[-50px] lg:ml-[-50px] md:ml-[-50px] xs:ml-[0px]" style={lang === 'ar' ? { transform: `translateX(${translateX_arabic}px) scaleX(-1)`, } :{ transform: `translateX(${translateX}px)` }} width="103" height="51" viewBox="0 0 103 51" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <g style={{ mixBlendMode: "multiply" }}>
//                                             <path d="M17.0243 20.1751L0.10283 39.9605L20.7547 38.3386L33.3441 50.4381L52.0055 44.0664L53.6119 42.9629L58.3442 42.0547L63.9225 39.9665L76.0922 37.2171L100.775 30.1494L102.466 29.1142L102.303 27.853L101.161 27.3343L72.3146 16.0341L49.3982 6.77805L32.8747 0.593947L28.2324 6.28473L25.3511 9.71008L23.2039 11.6917L20.7801 14.6193L19.3632 15.5849L21.3765 19.2735L21.7309 21.025L17.0243 20.1751Z" fill={processData[activeProcess].fill} />
//                                         </g>
//                                     </svg>
//                                 </div>
//                             </div>
//                         </section>
//                         <div className="plus relative plus-deivide">
//                             <img className='w-[50px] h-[50px] mx-auto relative -top-[30px]' src={plusImage}></img>
//                         </div>

//                         <section id='ourBundl' className="container-fluid our-bundl">
//                             <div className="container">
//                                 <div className="row justify-content-center bundl-pack-head">
//                                     <div className="col-md-11 col-lg-9">
//                                         <h4 className="sub-headeing mb-4 text-center text-black">{lang === 'ar' ? 'باقاتنا' :'Our Bundls'}</h4>
//                                         {/* <!-- <div className="our-bundles text-center">
//                         <div className="text-animation">
//                             WE <div className="bunl"><img src="asset/images/bundl-sticker.png" alt="" className="img-fluie"></div>DESIGN TO MAKE YOUR BRAND
//                             <span className="second_text text-start">
//                                 <i className="bundl_animate impression">IMPRESSIVE</i>
//                                 <i className="bundl_animate">UNIQUE</i>
//                                 <i className="bundl_animate">TOP-NOTCH</i>
//                                 <i className="bundl_animate">RELIABLE</i>
//                                 <i className="bundl_animate">BREATHTAKING</i>
//                             </span>
//                         </div>
//                     </div> --> */}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="bundle_design">
//                                 <div className="pick_design">
//                                     {/* <!-- <div className="pick_design_content"> Pick a design bundle suited to you </div> --> */}
//                                 </div>
//                                 {/* <!-- table-1 --> */}
//                                 <div className="sliding_section border-top1" style={{ display: "flex" }} id='bundls-first-child'>
//                                     <input checked={isbgChecked[0]}  type="checkbox" id="newbie_no1" className="button_section" onChange={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[0] = !prevState[0];
//                                         return newState;
//                                     })}/>

//                                     {/* <!-- rotating buiscut --> */}
//                                     <div className="icon_section1">
//                                         <div className="subzero1">

//                                             {/* <span onClick={() => addToCart(0)} className="buiscut_layer1">
//                                                 <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
//                                                 ADD TO <br></br>CART</span> */}
//                                                 <span onClick={() => addToCart(0)} className="buiscut_layer1">
//                                                 {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img> */}
//                                                 </span>
//                                             <div onClick={() => addToCart(0)} className="main_inside1 cursor-pointer"></div>
//                                         </div>
//                                     </div>

//                                     {/* <!-- background color --> */}
//                                     <div className="bg_color1"></div>

//                                     <div className="open_arrow1 position-relative">
//                                         <label className='cursor-pointer' for="newbie_no1">
//                                             <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
//                                             </svg>
//                                         </label>
//                                     </div>
//                                     <div className="newbie_section cursor-pointer"
//                                     onClick={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[0] = !prevState[0];
//                                         return newState;
//                                     })} style={window.innerWidth <= 475 ? lang === 'ar' ? {padding: '5% 3% 2% 0%'} : { padding: '5% 0 2% 2%' } : {}}>
//                                         <div className="change_brand">
//                                             <div className="table_icon"><img src={QubeIcon} alt="" className="img-fluid"></img></div>
//                                             <div className="newbie">{lang === 'ar' ? 'النيوبي' : 'The Newbie'}</div>
//                                             <div className="pkg-sub-title">{lang === 'ar' ? 'بداية مثالية للانطلاق':'Just to get started'}</div>
//                                         </div>
//                                         <div className="second_brand_section">
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{lang === 'ar' ? 'تصميم االهوية':'Brand Identity'}</span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>Brand Concept</li>
//                                                     <li>Brand Direction</li>
//                                                     <li>{lang === 'ar' ? 'تصميم الشعار' :'Logo Design'}</li>
//                                                     <li>{lang === 'ar' ? 'خيار إضافي للشعار' :'Logo Variations'}</li>
//                                                     <li>{lang === 'ar' ? 'لوحة الألوان' :'Color Palette'}</li>
//                                                     <li>{lang === 'ar' ? 'الآحرف والخطوط' :'Typography'}</li>
//                                                     <li>{lang === 'ar' ? 'الهوية البصرية' :'Visual Identity'}</li>
//                                                     <li>Brand Guide</li>
//                                                 </ul>
//                                             </div>
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{window.innerWidth <=475 ? 'Choose Your Add-ons' : 'Choose Your Add-ons'}</span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>{lang === 'ar' ? 'التصميمات الإلكترونية' :'Branding'}</li>
//                                                     <li>{lang === 'ar' ? 'القرطاسية' :'E-designs'}</li>
//                                                     <li>{lang === 'ar' ? 'المطبوعات' :'Products'}</li>
//                                                     <li>{lang === 'ar' ? 'المنتجات' :'Publications'}</li>
//                                                     <li>{lang === 'ar' ? 'الهوية البصرية' :'Social Media'}</li>
//                                                     <li>{lang === 'ar' ? 'تصميم مساحات' :'Space Design'}</li>
//                                                     <li>{lang === 'ar' ? 'سوشال ميديا' :'Stationery'}</li>
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="newbie_description">
//                                         <div className="third_section_toggle">
//                                             <div className="brand_identity pink-text">{lang === 'ar' ? 'تصميم االهوية' : 'Brand Identity'} + <br />
//                                                {lang === 'ar' ? 'إضافات إلى بندل' : 'Add-Ons To Your Bundl'}
//                                             </div>
//                                             <div className="change_brand_name">
//                                                 <div className="second_section_image"><img src={QubeIcon} alt="" className="img-fluid"></img></div>
//                                                 <div className="second_section_text" style={{ paddingTop: "10px" }}>{lang === 'ar' ? 'النيوبي' : 'The Newbie'}</div>
//                                             </div>
//                                         </div>
//                                         <div className="sar d-flex align-items-center">
//                                             {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
//                                             <span className="sar_text"><span>{lang === 'ar' ? 'بدءا من' : 'Starting from'}</span> 4880 {lang === 'ar' ? 'ريال' :'SAR'}</span>
//                                         </div>
//                                         <div className="work_time d-flex align-items-center">
//                                             {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
//                                             <span className="working_days"><span>{lang === 'ar' ? 'بدءا من' : 'Starting from'}</span> 30 {lang === 'ar' ? 'أيام عمل':'WORKING DAYS'}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <!-- table-2 --> */}
//                                 <div className="sliding_section" style={{ display: "flex" }}>
//                                     <input checked={isbgChecked[1]} type="checkbox" id="newbie_no2" className="button_section" onChange={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[1] = !prevState[1];
//                                         return newState;
//                                     })}/>

//                                     {/* <!-- rotating buiscut --> */}
//                                     <div className="icon_section2">
//                                         <div className="subzero2">
//                                             <span onClick={() => addToCart(1)} className="buiscut_layer2">
//                                                 {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
//                                                 ADD TO <br></br>CART */}
//                                                 </span>
//                                             <div onClick={() => addToCart(1)} className="main_inside2 cursor-pointer"></div>
//                                         </div>
//                                     </div>

//                                     {/* <!-- background color --> */}
//                                     <div className="bg_color2"></div>

//                                     <div className="open_arrow2 position-relative">
//                                         <label className='cursor-pointer' for="newbie_no2">
//                                             <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
//                                             </svg>
//                                         </label>
//                                     </div>
//                                     <div className="newbie_section cursor-pointer" onClick={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[1] = !prevState[1];
//                                         return newState;
//                                     })}>
//                                         <div className="change_brand">
//                                             <div className="table_icon"><img src={Food} alt="" className="img-fluid"></img></div>
//                                             <div className="newbie">{lang === 'ar' ? 'الفودي' :'The Foodie'}</div>
//                                             <div className={`pkg-sub-title ${lang === 'ar' ? 'xs:!pl-8' :'xs:!pr-8'}`}>{lang === 'ar' ? 'للمطاعم والمقاهي ' :'For Restaurants and Cafés'}</div>
//                                         </div>
//                                         <div className="second_brand_section">
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{lang === 'ar' ? 'تصميم االهوية' : 'Brand Identity'}</span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>Brand Concept</li>
//                                                     <li>Brand Direction</li>
//                                                     <li>{lang === 'ar' ? 'تصميم الشعار' :'Logo Design'}</li>
//                                                     <li>{lang === 'ar' ? 'خيار إضافي للشعار' :'Logo Variations'}</li>
//                                                     <li>{lang === 'ar' ? 'لوحة الألوان' :'Color Palette'}</li>
//                                                     <li>{lang === 'ar' ? 'الآحرف والخطوط' :'Typography'}</li>
//                                                     <li>{lang === 'ar' ? 'الهوية البصرية' :'Visual Identity'}</li>
//                                                     <li>Brand Guide</li>
//                                                 </ul>
//                                             </div>
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{window.innerWidth <=475 ? lang === 'ar' ? 'تصاميم للمطاعم والمقاهي' : 'Collateral' : lang === 'ar' ? 'تصاميم للمطاعم والمقاهي' : 'F&B Collateral'}</span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>{lang === 'ar' ? 'قائمة الأسعار (للصفحة الواحدة)' : '1 Page Price List'}</li>
//                                                     <li>{lang === 'ar' ? 'كيس' : 'Bag'}</li>
//                                                     <li>{lang === 'ar' ? 'علبة' : 'Box'}</li>
//                                                     <li>{lang === 'ar' ? 'كوب ورقي' : 'Paper Cup'}</li>
//                                                     <li>{lang === 'ar' ? 'ستيكر' : 'Sticker'}</li>
//                                                     <li>{lang === 'ar' ? 'مناديل مبللة' : 'Wet wipes'}</li>
//                                                     <li>{lang === 'ar' ? 'ورق تغليف' : 'Wrapping Paper'}</li>
//                                                 </ul>
//                                             </div>
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{lang === 'ar' ? 'مجموعة السوشال ميديا' : 'Social Media Starter Kit'} </span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>{lang === 'ar' ? 'بوست GIF' : 'GIF Post'}</li>
//                                                     <li>{lang === 'ar' ? '4 غلاف هايلايت' : '4 Highlight Cover'}</li>
//                                                     <li>{lang === 'ar' ? 'غلاف سوشال ميديا' : 'Profile Cover'}</li>
//                                                     <li>{lang === 'ar' ? '3 بوست ثابت' : '3 Static Post'}</li>
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="newbie_description">
//                                         <div className="third_section_toggle">
//                                             <div className="brand_identity green-text">{lang === 'ar' ? 'تصميم االهوية' : 'Brand Identity'} + <br />
//                                                { window.innerWidth <= 768 ? lang === 'ar' ? 'تصاميم للمطاعم والمقاهي' : '  F&B Collateral +': lang === 'ar' ? 'تصاميم للمطاعم والمقاهي' : 'Food & Beverage Collateral +'} <br />
//                                                {lang === 'ar' ? 'مجموعة السوشال ميديا' : 'Social Media Starter Kit '} <br />
//                                             </div>
//                                             <div className="change_brand_name">
//                                                 <div className="second_section_image"><img src={Food} alt="" className="img-fluid"></img></div>
//                                                 <div className="second_section_text" style={{ paddingTop: "10px" }}>{lang === 'ar' ? 'الفودي' :'The Foodie'}</div>
//                                             </div>
//                                         </div>
//                                         <div className="sar d-flex align-items-center">
//                                             {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
//                                             <span className="sar_text">8000 {lang === 'ar' ? 'ريال' :'SAR'}</span>
//                                         </div>
//                                         <div className="work_time d-flex align-items-center">
//                                             {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
//                                             <span className="working_days">40 {lang === 'ar' ? 'أيام عمل':'WORKING DAYS'}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <!-- table-3 --> */}
//                                 <div className="sliding_section" style={{ display: "flex" }}>
//                                     <input checked={isbgChecked[2]} type="checkbox" id="newbie_no3" className="button_section" onChange={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[2] = !prevState[2];
//                                         return newState;
//                                     })}/>

//                                     {/* <!-- rotating buiscut --> */}
//                                     <div className="icon_section3">
//                                         <div className="subzero3">
//                                             <span onClick={() => addToCart(2)} className="buiscut_layer3">
//                                                 {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
//                                                 ADD TO <br></br>CART */}
//                                                 </span>
//                                             <div onClick={() => addToCart(2)} className="main_inside3 cursor-pointer"></div>
//                                         </div>
//                                     </div>

//                                     {/* <!-- background color --> */}
//                                     <div className="bg_color3"></div>

//                                     <div className="open_arrow3 position-relative">
//                                         <label className='cursor-pointer' for="newbie_no3">
//                                             <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
//                                             </svg>
//                                         </label>
//                                     </div>
//                                     <div className="newbie_section cursor-pointer" onClick={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[2] = !prevState[2];
//                                         return newState;
//                                     })}>
//                                         <div className="change_brand">
//                                             <div className="table_icon"><img src={Eye} alt="" className="img-fluid"></img></div>
//                                             <div className="newbie">{lang === 'ar' ? 'السوشلايت' : 'The socialite'}</div>
//                                             <div className="pkg-sub-title">{lang === 'ar' ? 'للصالونات ومشاريع الخدمات' :'For Salons and Other Services'}</div>
//                                         </div>
//                                         <div className="second_brand_section">
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{lang === 'ar' ? 'تصميم االهوية' : 'Brand Identity'}</span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>Brand Concept</li>
//                                                     <li>Brand Direction</li>
//                                                     <li>{lang === 'ar' ? 'تصميم الشعار' :'Logo Design'}</li>
//                                                     <li>{lang === 'ar' ? 'خيار إضافي للشعار' :'Logo Variations'}</li>
//                                                     <li>{lang === 'ar' ? 'لوحة الألوان' :'Color Palette'}</li>
//                                                     <li>{lang === 'ar' ? 'الآحرف والخطوط' :'Typography'}</li>
//                                                     <li>{lang === 'ar' ? 'الهوية البصرية' :'Visual Identity'}</li>
//                                                     <li>Brand Guide</li>
//                                                 </ul>
//                                             </div>
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{window.innerWidth <=475 ? lang === 'ar' ? 'تصاميم الخدمات' : 'Collateral' : lang === 'ar' ? 'تصاميم الخدمات' : 'Services Collateral'}</span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>{lang === 'ar' ? 'قائمة الأسعار (للصفحة الواحدة)' : '1 Page Price List'}</li>
//                                                     <li>{lang === 'ar' ? 'كيس' : 'Bag'}</li>
//                                                     <li>{lang === 'ar' ? 'بطاقة عمل' : 'Business Card'}</li>
//                                                     <li>{lang === 'ar' ? 'بطاقة الولاء' : 'Loyalty Card'}</li>
//                                                     <li>{lang === 'ar' ? 'كوب ورقي' : 'Paper Cup'}</li>
//                                                     <li>{lang === 'ar' ? 'منشفة' : 'Towel'}</li>
//                                                 </ul>
//                                             </div>
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span> {lang === 'ar' ? 'مجموعة السوشال ميديا' :'Social Media Starter Kit'}  </span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>{lang === 'ar' ? 'بوست GIF' : 'GIF Post'}</li>
//                                                     <li>{lang === 'ar' ? '4 غلاف هايلايت' : '4 Highlight Cover'}</li>
//                                                     <li>{lang === 'ar' ? 'غلاف سوشال ميديا' : 'Profile Cover'}</li>
//                                                     <li>{lang === 'ar' ? '3 بوست ثابت' : '3 Static Post'}</li>
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="newbie_description">
//                                         <div className="third_section_toggle">
//                                             <div className="brand_identity blue-text">{lang === 'ar' ? 'تصميم االهوية' : 'Brand Identity'} + <br />
//                                                {lang === 'ar' ? 'تصاميم الخدمات' : 'Services Collateral'}  + <br />
//                                               {lang === 'ar' ? 'مجموعة السوشال ميديا' :'Social Media Starter Kit'}
//                                             </div>
//                                             <div className="change_brand_name">
//                                                 <div className="second_section_image"><img src={Eye} alt="" className="img-fluid"></img></div>
//                                                 <div className="second_section_text" style={{ paddingTop: "10px" }}>{lang === 'ar' ? 'السوشلايت' : 'The socialite'}</div>
//                                             </div>
//                                         </div>
//                                         <div className="sar d-flex align-items-center">
//                                             {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
//                                             <span className="sar_text">8000 {lang === 'ar' ? 'ريال' :'SAR'}</span>
//                                         </div>
//                                         <div className="work_time d-flex align-items-center">
//                                             {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">-->  */}
//                                             <span className="working_days">40 {lang === 'ar' ? 'أيام عمل':'WORKING DAYS'}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <!-- table-4 --> */}
//                                 <div className="sliding_section" style={{ display: "flex" }}>
//                                     <input checked={isbgChecked[3]} type="checkbox" id="newbie_no4" className="button_section" onChange={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[3] = !prevState[3];
//                                         return newState;
//                                     })}/>

//                                     {/* <!-- rotating buiscut --> */}
//                                     <div className="icon_section4">
//                                         <div className="subzero4">
//                                             <span onClick={() => addToCart(3)} className="buiscut_layer4">
//                                                 {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
//                                                 ADD TO <br></br>CART */}
//                                                 </span>
//                                             <div onClick={() => addToCart(3)} className="main_inside4 cursor-pointer"></div>
//                                         </div>
//                                     </div>

//                                     {/* <!-- background color --> */}
//                                     <div className="bg_color4"></div>

//                                     <div className="open_arrow4 position-relative">
//                                         <label className='cursor-pointer' for="newbie_no4">
//                                             <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
//                                             </svg>
//                                         </label>
//                                     </div>
//                                     <div  className="newbie_section cursor-pointer" onClick={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[3] = !prevState[3];
//                                         return newState;
//                                     })}>
//                                         <div className="change_brand">
//                                             <div className="table_icon"><img src={Diamond} alt="" className="img-fluid"></img></div>
//                                             <div className="newbie">{lang === 'ar' ? 'البوتيكر' :'The Boutiquer'}</div>
//                                             <div className="pkg-sub-title">{lang === 'ar' ? 'للمتاجر' :'For Shops and Online Stores '}</div>
//                                         </div>
//                                         <div className="second_brand_section">
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{lang === 'ar' ? 'تصميم االهوية' : 'Brand Identity'}</span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>Brand Concept</li>
//                                                     <li>Brand Direction</li>
//                                                     <li>{lang === 'ar' ? 'تصميم الشعار' :'Logo Design'}</li>
//                                                     <li>{lang === 'ar' ? 'خيار إضافي للشعار' :'Logo Variations'}</li>
//                                                     <li>{lang === 'ar' ? 'لوحة الألوان' :'Color Palette'}</li>
//                                                     <li>{lang === 'ar' ? 'الآحرف والخطوط' :'Typography'}</li>
//                                                     <li>{lang === 'ar' ? 'الهوية البصرية' :'Visual Identity'}</li>
//                                                     <li>Brand Guide</li>
//                                                 </ul>
//                                             </div>
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{window.innerWidth <=475 ? lang === 'ar' ? 'تصاميم للتجارة' : 'Collateral' : lang === 'ar' ? 'تصاميم للتجارة' : 'Commerce Collateral'}</span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>{lang === 'ar' ? 'كيس' : 'Bag'}</li>
//                                                     <li>{lang === 'ar' ? 'علبة' : 'Box'}</li>
//                                                     <li>{lang === 'ar' ? 'بطاقة عمل' : 'Business Card'}</li>
//                                                     <li>{lang === 'ar' ? 'ستيكر' : 'Sticker'}</li>
//                                                     <li>{lang === 'ar' ? 'كرت شكر' : 'Thank you Card'}</li>
//                                                     <li>{lang === 'ar' ? 'ورق تغليف' : 'Wrapping Paper'}</li>
//                                                 </ul>
//                                             </div>
//                                             <div className="box-child">
//                                                 <div className="pack-inner-title"><span>{lang === 'ar' ? 'مجموعة السوشال ميديا' :'Social Media Starter Kit'} </span></div>
//                                                 <ul className="second_brand_list">
//                                                     <li>{lang === 'ar' ? 'بوست GIF' : 'GIF Post'}</li>
//                                                     <li>{lang === 'ar' ? '4 غلاف هايلايت' : '4 Highlight Cover'}</li>
//                                                     <li>{lang === 'ar' ? 'غلاف سوشال ميديا' : 'Profile Cover'}</li>
//                                                     <li>{lang === 'ar' ? '3 بوست ثابت' : '3 Static Post'}</li>
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="newbie_description">
//                                         <div className="third_section_toggle">
//                                             <div className="brand_identity pink-text">{lang === 'ar' ? 'تصميم االهوية' : 'Brand Identity'} + <br />
//                                             { lang === 'ar' ? 'تصاميم للتجارة' : 'Commerce Collateral'} + <br />
//                                                 {lang === 'ar' ? 'مجموعة السوشال ميديا' :'Social Media Starter Kit'}
//                                             </div>
//                                             <div className="change_brand_name">
//                                                 <div className="second_section_image"><img src={Diamond} alt="" className="img-fluid"></img></div>
//                                                 <div className="second_section_text" style={{ paddingTop: "10px" }}>{lang === 'ar' ? 'البوتيكر' :'The Boutiquer'}</div>
//                                             </div>
//                                         </div>
//                                         <div className="sar d-flex align-items-center">
//                                             {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
//                                             <span className="sar_text">8000 {lang === 'ar' ? 'ريال' :'SAR'}</span>
//                                         </div>
//                                         <div className="work_time d-flex align-items-center">
//                                             {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
//                                             <span className="working_days">40 {lang === 'ar' ? 'أيام عمل':'WORKING DAYS'}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <!-- table-5 --> */}
//                                 <div className="sliding_section" style={{ display: "flex" }}>
//                                     <input checked={isbgChecked[4]} type="checkbox" id="newbie_no5" className="button_section" onChange={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[4] = !prevState[4];
//                                         return newState;
//                                     })}/>

//                                     {/* <!-- rotating buiscut --> */}
//                                     {/* <div className="icon_section5">
//                                         <div className="subzero5">
//                                             <span  className="buiscut_layer5">Select <br></br>This<br></br> Bundl</span>
//                                             <div  className="main_inside5"></div>
//                                         </div>
//                                     </div> */}

//                                     <div className="icon_section5">
//                                         <div className="subzero5">

//                                             <span className="buiscut_layer5">
//                                                 {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img> */}
//                                                 {/* <NavLink style={{ color: 'white' }} to="/custombundl" state={{ title: 'Custom Bundl' }}>
//                                                     ADD TO <br></br>CART
//                                                 </NavLink> */}
//                                             </span>
//                                             <div className="main_inside5 cursor-pointer" onClick={()=>navigate('/custombundl',{state:{title: 'Custom Bundl'}})}></div>
//                                         </div>
//                                     </div>

//                                     {/* <!-- background color --> */}
//                                     <div className="bg_color5"></div>

//                                     <div className="open_arrow5 position-relative">
//                                         <label className='cursor-pointer' for="newbie_no5">
//                                             <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M2.26122 1.6006L14.4624 13.8018L2.26122 26.0029" stroke="auto" stroke-width="4" />
//                                             </svg>
//                                         </label>
//                                     </div>
//                                     <div className="newbie_section cursor-pointer" onClick={() => setIsbgChecked(prevState => {
//                                         const newState = [...prevState];
//                                         newState[4] = !prevState[4];
//                                         return newState;
//                                     })}style={{ justifyContent: "end" }}>
//                                         <div className="change_brand">
//                                             <div className="table_icon"><img src={MaginIcon} alt="" className="img-fluid" /></div>
//                                             <div className="newbie">Customized</div>
//                                             <div className="pkg-sub-title">{lang === 'ar' ? 'صمم البندل الخاص بك' : 'Customize your Bundl'}</div>
//                                         </div>

//                                         <div className="second_brand_section" style={{ height: "75%" }}>
//                                             <span className="pack-sub-title">Choose from</span>
//                                             <div className="box-child box-f-cuztomize-bundl" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                                                 <div className="pack-inner-title"><span>+ {lang === 'ar' ? 'التصميمات الإلكترونية' :'Branding'}</span></div>
//                                                 <div className="pack-inner-title"><span>+ {lang === 'ar' ? 'القرطاسية' :'E-designs'}</span></div>
//                                                 <div className="pack-inner-title"><span>+ {lang === 'ar' ? 'المطبوعات' :'Products'}</span></div>
//                                             </div>
//                                             <div className="box-child box-f-cuztomize-bundl" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                                                 <div className="pack-inner-title"><span>+ {lang === 'ar' ? 'المنتجات' :'Publications'}</span></div>
//                                                 <div className="pack-inner-title"><span>+ {lang === 'ar' ? 'الهوية البصرية' :'Social Media'}</span></div>
//                                                 <div className="pack-inner-title"><span>+ {lang === 'ar' ? 'تصميم مساحات' :'Space Design'}</span></div>
//                                             </div>
//                                             <div className="box-child box-f-cuztomize-bundl" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                                                 <div className="pack-inner-title lg:mobile-t-25 md:mobile-t-25 xs:mt-[7%]"><span>+ {lang === 'ar' ? 'سوشال ميديا' :'Stationery'}</span></div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="newbie_description">
//                                         <div className="third_section_toggle">
//                                             <div className="brand_identity">
//                                                 <div className="block">
//                                                     <span className="newbie">{lang === 'ar' ? 'طابق & اخلط' :'Mix & Match'}</span>
//                                                     <div className="pkg-sub-title" style={{ opacity: 0 }}>{lang === 'ar' ? 'صمم البندل الخاص بك' : 'Customize your Bundl'}</div>
//                                                 </div>
//                                             </div>
//                                             <div className="change_brand_name">
//                                                 <div className="second_section_image"><img src={MaginIcon} alt="" className="img-fluid" /></div>
//                                                 <div className="second_section_text" style={{ paddingTop: "10px" }}>Customized</div>
//                                             </div>
//                                         </div>
//                                         {/* <!--<div className="sar d-flex align-items-center">
//                         <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">->
//                         <span className="sar_text">8000 SAR</span>
//                     </div> -->
//                     <!-- <div className="work_time d-flex align-items-center">
//                         <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">->
//                         <span className="working_days">40 WORKING DAYS</span>
//                     </div>--> */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         <section className="container-fluid py-1" >
//                             <div className="container mb-16">
//                                 <div className="row justify-content-center">
//                                     <div className="col-md-4 flex justify-center">
//                                         <img className='xs:w-[150px] sm:w-[170px]' src={popupGIF}></img>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         <div className="bunbl-box-news-section">
//                             <div className="row justify-content-center bt-1">
//                                 <div className={`col-md-6 center-block text-center border-black ${lang === 'ar' ?'lg:border-l-[1px] md:border-l-[1px] xs:border-l-0':'lg:border-r-[1px] md:border-r-[1px] xs:border-r-0' }`}>
//                                     <div className="bundl-box-inner">
//                                         <div className="icon">
//                                             <img src={GrownIcon} alt="" className="img-fluid"></img>
//                                         </div>
//                                         <div className="title">
//                                           {lang === 'ar' ? 'بندل بريميوم ' :'Premium Section'}
//                                         </div>
//                                         <div className="desc">
//                                            {lang === 'ar' ? 'تفضل تجربة تصميم مخصصة لك؟' :'Prefer a one-on-one design experience?'}
//                                         </div>
//                                         <a href="/form/premium" className="btn bundl-btn bt-1">{lang === 'ar' ? 'تواصل معنا':'Send us a message'}</a>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6 text-center">
//                                     <div className="bundl-box-inner">
//                                         <div className="icon">
//                                             <img src={SystemIcon} alt="" className="img-fluid"></img>
//                                         </div>
//                                         <div className="title">
//                                            {lang === 'ar' ? 'متاجر الكترونية' :'website section'}
//                                         </div>
//                                         <div className="desc">
//                                             {lang === 'ar' ? 'تحتاج متجر الكتروني مثالي لمشروعك؟':'Dreaming of a perfect website?'}
//                                         </div>
//                                         <a href="/form/webster" className="btn bundl-btn bt-1">{lang === 'ar' ? 'تواصل معنا':'Send us a message'}</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="eyeDivider ourWork-deivide"></div>
//                         <section className="container-fluid our-work">
//                             <div className="">
//                                 <div className="section-head">
//                                     <div className="row justify-content-center">
//                                         <div className="col-md-7">
//                                             <h2 className="sub-headeing text-black text-center">{lang === 'ar' ?'أعمالنا':'Our Work'}</h2>
//                                             {/* <p className="f-20 text-center">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div id='ourWorkContainer' className="row justify-content-center">
//                                     <div className="col-md-10">
//                                         <div className={`insta-feed  flex justify-center`}>
//                                             {/* <img src={Instafeed} alt="" ></img> */}
//                                             <div className={`relative  w-full overflow-hidden`}>
//                                                 {/* Carousel Content */}
//                                                 <div
//                                                     className="flex transition-transform duration-500"
//                                                     style={lang === 'ar' ? { transform: `translateX(${currentWork * 100}%)` }:{ transform: `translateX(-${currentWork * 100}%)` }}
//                                                 >
//                                                     {ourworks.map((item, index) => (
//                                                         <div key={index} className={`relative  flex-shrink-0 xl:w-[84%] xs:w-[84%] xs:mx-[8%] md:w-[99%] md:mx-1 xl:mx-[8%] flex flex-wrap ${item.project_images.length > 2 ? 'sm:h-[900px] xs:h-[300px]' : 'sm:h-[450px] xs:h-[300px]'} justify-center`}>
//                                                             {item.project_images.map((img, imgIndex) => {
//                                                                 let borderClasses = "border-black border-solid";

//                                                                 // Apply borders based on image index
//                                                                 if (imgIndex === 0) borderClasses += " border-r-[2px] border-b-[2px]"; // 1st Image (Right, Bottom)
//                                                                 if (imgIndex === 1) borderClasses += " border-l-[2px] border-r-[2px] border-b-[2px]"; // 2nd Image (Left, Right, Bottom)
//                                                                 if (imgIndex === 2) borderClasses += " border-l-[2px] border-b-[2px]"; // 3rd Image (Left, Bottom)
//                                                                 if (imgIndex === 3) borderClasses += " border-r-[2px] border-t-[2px]"; // 4th Image (Right, Top)
//                                                                 if (imgIndex === 4) borderClasses += " border-l-[2px] border-r-[2px] border-t-[2px]"; // 5th Image (Left, Right, Top)
//                                                                 if (imgIndex === 5) borderClasses += " border-l-[2px] border-t-[2px]"; // 6th Image (Left, Top)
//                                                                 return (<img
//                                                                     key={imgIndex}
//                                                                     // className="w-1/3 sm:w-[33%] object-cover border-black border-solid border-[5px]"
//                                                                     // className={`lg:w-1/3 md:w-1/3 xs:w-[30%] lg:object-cover md:object-cover xs:object-fill aspect-square ${borderClasses}`}
//                                                                     className={`sm:w-[32%] w-[32%] xs:w-[33%] aspect-square object-cover ${borderClasses}`}
//                                                                     src={img}
//                                                                     alt={`Project ${index + 1}`}
//                                                                 />)
//                                                             })}
//                                                 {currentWork != 0 && <button
//                                                     onClick={() => slideChange('prev')}
//                                                     className="absolute md:left-20 left-20 xs:left-8 top-1/2 transform -translate-y-1/2 w-[30px] sm:w-[30px] xs:w-[10px] h-[35%] bg-black "
//                                                 >
//                                     <ChevronLeftIcon className="text-white" />

//                                                 </button>
//                                                 }
//                                                 {/* Right Button */}
//                                                 {currentWork != ourworks.length - 1 && <button
//                                                     onClick={() => slideChange('next')}
//                                                     className="absolute md:right-20 right-20 xs:right-8 m-auto  top-1/2 transform -translate-y-1/2 w-[30px] sm:w-[30px] xs:w-[10px] h-[35%] bg-black">
//                                                     <ChevronRightIcon className="text-white " />
//                                                 </button>
//                                                 }
//                                                         </div>

//                                                     ))}
//                                                 </div>

//                                                 {/* Left Button */}

//                                             </div>
//                                         </div>
//                                         <div className="social-cta text-center">
//                                             <a target='_blank' href={`${mediaUrls.instagram}`} className="btn bundl-btn-border text-upper mt-5">{lang === 'ar' ? 'اتبع إنستاغارم لدينا' :'Follow us on instagram'}</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                         <section className="container-fluid section fact-section">
//                             <div className="container">
//                                 <h2 className="sub-head  text-upper">{lang === 'ar' ? 'حتى الآن، أكملنا' :'SO FAR WE’ve completed'} </h2>
//                                 <h2 className="title">{bundlData.noOfProjects || 1}</h2>
//                                 <h3 className="desc text-upper">{lang === 'ar' ? 'مشروعًا ' :'projects for happy clients'}</h3>
//                             </div>
//                         </section>

//                         <div className="love love-divider"></div>
//                         <section className="container-fluid testimonial">
//                             <span className="testimonial-bg1"><img src={RocketCandy} alt="" className="img-fluid"></img></span>
//                             <span className="testimonial-bg2"><img src={RocketCandy} alt="" className="img-fluid"></img></span>
//                             <span className="testimonial-bg3"><img src={RocketCandy} alt="" className="img-fluid"></img></span>
//                             <div className="container w-75">
//                                 <div className="row justify-content-center">
//                                     <div className="col-md-8">
//                                         <div className="section-head">
//                                             <h2 className="sub-headeing text-black text-center">{lang === 'ar' ? 'رسائل حب' : 'love letters'} </h2>
//                                             <p className="f-20 text-center">{lang === 'ar' ? 'نحن نعمل بجد لتحقيق أحلام علامتك التجارية في الحياة .لكن لا تأخذ كلمتنا فقط !استمع إلى ما يقوله عملاؤنا عنا' : 'We work hard to bring your brand dreams to life. But don’t take only our word for it! Listen to what our clients have to say about us.'}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="testimonial-container">
//                                     <div className="row justify-content-center">
//                                         <div className="col-md-8">
//                                             <div className="testimonial-inner">
//                                                 <div className="testimonial_content">
//                                                     Commitment, variety, clarity, fast delivery of different options, accuracy and art is the least that can describe how good they are! Keep up the good work, and we would surely get back to you over and over again!
//                                                 </div>
//                                                 <div className="rating">
//                                                     <img src={FiveStar} alt="" className="img-fluid"></img>
//                                                 </div>
//                                                 <div className="name">
//                                                     SHAWERMAMA <span className="company-name"></span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="px-5 mx-auto mt-5 text-center">
//                                     {
//                                         window.innerWidth <= 768 ?
//                                         <a target='_blank' href="https://www.google.com/search?sca_esv=c4b1341a4b7b7a8e&rlz=1C1OPNX_enIN1088IN1088&sxsrf=AHTn8zpz8heeFIffXtZFmZcBKyfoZlggHQ:1738924330168&q=bundl+designs+reviews&uds=ABqPDvxhviXT310WMxRmyLGmEwIWGxD1D4UaNg1_5mWkuvL-XEHlBMW0Wi5hXsAWml52GBwP0MgahtCC7xIzOfccgCir8jqEM-EUFl8W5TAQZtW1RiBwrQ6eg9Lumr7a35DA3UW1etJjqySLvsDCAu3swGovni-vtvN9dTjA83v60KOxD9627yKA06c5tUy_FosedF9vWioHYMgsreRYsFewxUb2IPmni2ayZr3gorMNTpcZLIypv5tgzZ33pY3Lm3ZXqLhrBu3CF3C_WNhYjJxca9Q4uc_9kNdOSyf491fLCyNbqThFA6O36UEEQF7vrZUZMHWOAEK22_BQhgx5UwnwyKbCztDiilDDN19JaVdNbCZFQpujpiDNHeroUq9oC1G2YdfLrj9V3eKSJf-u1ebBOTQNfuP-WhDcJVPho7PYBp2cmQ0VmhQ&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzfMxsPAhwiZEXurMaV4FghdFjDxW8-kb_wAl5CzlJ4LuB7A7CZCUrHH6TRDNxXAqy2BU86fOeAnWG4ddtnuW93JPkFUY&sa=X&ved=2ahUKEwiZtPb3rbGLAxX_4zgGHfRGAacQk8gLegQIKBAB&ictx=1&biw=393&bih=736&dpr=2.75#ebo=3" className="btn bundl-btn-border">Leave a review</a>
//                                         :
//                                         <a target='_blank' href="https://www.google.com/search?q=bundldesigns&rlz=1C1OPNX_enIN1088IN1088&oq=bundldesigns&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIICAQQRRgnGDsyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODA5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3e2efdec17da19b7:0xb10d764716306f04,3,,,," className="btn bundl-btn-border">Leave a review</a>
//                                     }
//                                         {/* <a target='_blank' href="https://www.google.com/search?q=bundldesigns&rlz=1C1OPNX_enIN1088IN1088&oq=bundldesigns&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIICAQQRRgnGDsyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODA5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3e2efdec17da19b7:0xb10d764716306f04,3,,,," className="btn bundl-btn-border">Leave a review</a> */}

//                                 </div>

//                             </div>
//                         </section>

//                         <div className="bundledivider"></div>
//                         <section className="container-fluid section">
//                             <div className="container">
//                                 <div className="quetions-container">
//                                     <h2 className="sub-headeing text-upper text-black text-center mb-3">{lang === 'ar' ? 'فكره أو سؤال عندك ':'HAVE A QUESTION OR IDEA ?'}</h2>
//                                     <h4 className="h3 text-upper !text-black text-center mb-4">{lang === 'ar' ?'معنا تواصل':'let’s discuss'}</h4>
//                                 </div>
//                                 <div className="social-link  align-items-center">
//                                     <ul className="d-flex justify-content-center">
//                                         <li className="social-item"><a href={`${mediaUrls.linked_in}`} target='_blank'><img src={Linkedin} alt="" className="img-fluid social-icon"></img></a></li>
//                                         <li className="social-item"><a href={`${mediaUrls.instagram}`} target='_blank'><img src={Instagram} alt="" className="img-fluid social-icon"></img></a></li>
//                                         <li className="social-item"><a href={`${'https://www.tiktok.com/@bundl_designs'}`} target='_blank'><img src={Tiktokpng} alt="" className="img-fluid social-icon"></img></a></li>
//                                         <li className="social-item"><a href={`${'https://id.pinterest.com/BundlDesigns/'}`} target='_blank'><img src={Pinterestpng} alt="" className="img-fluid social-icon"></img></a></li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </section>

//                         <Footer isLang={lang}/>
//                     </div>

//             }

//         </>
//     )
// }

import React, { useMemo, useEffect, useState, useRef } from "react";
import "../Home/Home.css";
import { Bgloader } from "../Common/Background/Bgloader";
import HomeLogo from "../../Images/Bundles/logo-black.svg";
import Search from "../../Images/Bundles/icon-search.png";
import User from "../../Images/Bundles/icon-user.png";
import Cart from "../../Images/Bundles/icon-cart.png";
import Language from "../../Images/Bundles/icon-language.png";
import CarMarquee from "../../Images/Bundles/car-marquee.svg";
import LemonMarquee from "../../Images/Bundles/green-lemon-margquee.webp";
import MouthMarquee from "../../Images/Bundles/mouth.webp";
import PaintMarquee from "../../Images/Bundles/paint-marquee.webp";
import RocketMarquee from "../../Images/Bundles/paper-rocket-marquee.webp";
import EyeMarquee from "../../Images/Bundles/eye-margquee.svg";
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
import Pinterestpng from "../../Images/Home/Pinterestpng.png";
import Tiktokpng from "../../Images/Home/Tiktokpng.png";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import CartIcon from "../../Images/Home/Carticon.svg";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
import { ConfigToken } from "../Auth/ConfigToken";
import { Popup } from "../Common/Popup/Popup";
import { Footer } from "../Common/Footer/Footer";
import { Scale } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import popupGIF from "../../Images/popupGIF.gif";
import CloseIcon from "@mui/icons-material/Close";
import { loginAction } from "../../Redux/Action";
import { useDispatch } from "react-redux";
import plusImage from "../../Images/Bundles/plus-icon.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { amountDecimal } from "../Utils/amountDecimal";
import { processArabicText } from "../Utils/arabicFontParenthesisChecker";


export const Home = ({ lang, setLang }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const imageArray = [Car, Lemon, Mouth, Rocket, Pinkpaint];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchShow, setSearchShow] = useState(false);
  const [searchQry, setSearchQry] = useState("");
  const [token, setToken] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const popupRef = useRef(null);
  const searchRef = useRef(null);
  const navigationRef = useRef(null);
  const [profileVisible, setProfileVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const [loading, setLoading] = useState(false);
  const [slideImage, setSlideImage] = useState(imageArray[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [ourworks, setOurworks] = useState([]);
  const [currentWork, setCurrentWork] = useState(1);
  const [isActiveProcess, setIsActiveProcess] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isbgChecked, setIsbgChecked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [bundlData, setBundlData] = useState([]);
  const [routeNames, setRouteNames] = useState({
    4: "foodie",
    12: "newbie",
    13: "boutiquer",
    22: "socialite",
  });
  // const translateX = (activeProcess * 200) +60;
  // const translateX = activeProcess * (window.innerWidth <= 475 ? activeProcess <= 4 ? 88.5: window.innerWidth <= 390 ? 80 : 80 : window.innerWidth <= 768 ? 150 : activeProcess < 3 ? 200 : 195) + (window.innerWidth > 1450 ? 60 : 0);
  let translateX = 0;
  let translateX_arabic = 0;
  if (window.innerWidth <= 390) {
    translateX = activeProcess === 4 ? 285 : activeProcess * 78.5;
    translateX_arabic =
      activeProcess === 4 ? -190 : activeProcess * -78.5 + 100;
  } else if (window.innerWidth <= 400) {
    translateX = activeProcess === 4 ? 315 : activeProcess * 82.5;
    translateX_arabic =
      activeProcess === 4 ? -210 : activeProcess * -82.5 + 100;
  } else if (window.innerWidth <= 475) {
    translateX = activeProcess * (activeProcess <= 3 ? 88.5 : 87);
    translateX_arabic =
      activeProcess * (activeProcess <= 3 ? -88.5 : -87) + 100;
  } else if (window.innerWidth <= 768) {
    translateX = activeProcess * 150;
    translateX_arabic = activeProcess * 150;
  } else if (window.innerWidth <= 1450) {
    translateX = activeProcess * (activeProcess < 3 ? 200 : 195);
    translateX_arabic = activeProcess * (activeProcess < 3 ? -196 : -195) + 80;
  } else {
    translateX = activeProcess * (activeProcess < 3 ? 200 : 195) + 20;
    translateX_arabic = activeProcess * (activeProcess < 3 ? -200 : -195) +70;
  }
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
      arabic_title: "اشتري باقة",
      description:
        "Choose from our tailored Bundls, or customize your very own according to your project needs.",
      arabic_description:
        "اختر الباقة المناسبة لمشروعك، لم تجد ما تبحث عنه؟ صمم الباقة المناسبة لك​",
      imgSrc: BuyBundl,
      fill: "#4FA472",
      color: "#000",
    },
    {
      title: "FILL A QUESTIONARE",
      arabic_title: "املأ الاستبيان",
      description:
        "Tell us about your project and what you need. Not sure what you want? Our questionnaire will help you.",
      arabic_description:
        "أخبرنا عن مشروعك وما تريد تصميمه. لست متأكد مما تريد؟ حيساعدك استبياننا",
      imgSrc: FillQuestionnarie,
      fill: "#00A8C8",
      color: "#000",
    },
    {
      title: "APPROVE EDIT",
      arabic_title: "الموافقة / التعديل",
      description:
        "Your brand logo will be sent for your approval. Need something changed? Just Add-on an adjustment.",
      arabic_description:
        "سيتم إرسال تصميم هويتك للحصول على موافقتك. تحتاج إلى تغيير شيء؟ فقط قم بإضافة تعديل",
      imgSrc: Approve,
      fill: "#F175AD",
      color: "#000",
    },
    {
      title: "UPLOAD CONTENT",
      arabic_title: "إضافة المحتوى",
      description:
        "You can easily upload the contents for the items in your bundl, to be designed following your approved brand.",
      arabic_description:
        "يمكنك بسهولة تحميل محتويات العناصر الموجودة في باقتك. التصاميم حتتبع تفاصيل هويتك",
      imgSrc: UploadContent,
      fill: "#4FA472",
      color: "#000",
    },
    {
      title: "GET DESIGNS",
      arabic_title: "حمل / عدل تصاميمك​",
      description:
        "Your designs will be sent to your account. Need more items? some adjustments? Just Add-on to your bundl.",
      arabic_description:
        "سيتم ارسال تصاميمك إلى حسابك. تحتاج مزيد من العناصر؟ بعد التعديلات؟ اضف ما تريد إلى الباقة",
      imgSrc: Getthedesign,
      fill: "#00A8C8",
      color: "#000",
    },
  ];
  const [mediaUrls, setmediaUrls] = useState({
    instagram: "",
    facebook: "",
    linked_in: "",
    twitter: "",
  });

  const getMediaUrls = async () => {
    const response = await axios.get(
      `${base_url}/api/content?section=settings`
    );
    if (response.data) {
      setmediaUrls(response.data);
    }
  };
  const Logout = async () => {
    try {
      const response = await axios.get(`${base_url}/api/logout`, ConfigToken());
      document.cookie = `token=; path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      dispatch(loginAction(null));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const changeLanguage = (lang) => {
    localStorage?.setItem("lang", lang);
    setLang(lang);
  };
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  };
  const handleScroll = () => {
    const hash = window.location.hash;
    if (hash) {
      // Select the element based on the hash
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the element
      }
    }
  };

  // useEffect(() => {
  //     const fetchInstagramPosts = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink&access_token=YOUR_ACCESS_TOKEN`
  //         );
  //         const data = await response.json();
  //         console.log(data)
  //         setPosts(data.data.slice(0, 9)); // Get the last 9 posts
  //       } catch (error) {
  //         console.error("Error fetching Instagram posts:", error);
  //       }
  //     };

  //     fetchInstagramPosts();
  //   }, []);

  useEffect(() => {
    // Add an event listener for changes in the hash
    window.addEventListener("hashchange", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleScroll);
    };
  }, []);

  useEffect(() => {
    const navElements = document.getElementsByClassName("nav-section");
    if (navElements.length > 0 && lang === "ar") {
      Array.from(navElements).forEach((el) => {
        el.setAttribute("dir", "ltr");
      });
    }
    const navMenuAr = document.getElementById("nav-menus-ar");
    if (navMenuAr) {
      navMenuAr.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
  });

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
    if (event.key === "Enter") {
      navigate(`/search?query=${event.target.value}`);
    }
  }
  useEffect(() => {
    getBundl();
    getMediaUrls();
    setToken(getCookie("token"));
    handleScroll();
  }, []);
  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (event.target.closest(".navIcons")) {
          return;
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

  const getBundl = async () => {
    const response = await axios.get(`${base_url}/api/homepage/`);
    setOurworks(response.data.projects);
    setBundlData(response.data);
  };
  const slideChange = (action) => {
    setCurrentWork((prev) => (action == "next" ? prev + 1 : prev - 1));
  };

  const addToCart = async (index) => {
    try {
      // const response = await axios.get(`${base_url}/api/order/cart/`, ConfigToken());
      // if (response.data.order_status === 'in_cart') {
      //     setOpenPopup(true);
      //     setSelectedIndex(index)
      // } else {
      setSelectedIndex(null);
      navigate(`/bundldetail/${routeNames[bundlData?.packages?.[index]?.id]}`);
      // navigate(`/bundldetail/${bundlData.packages[index].id}`,);
      // }
    } catch (error) {
      console.error("An error occurred:", error);
      navigate(
        `/login?next_url=bundldetail/${
          routeNames[bundlData?.packages[index]?.id]
        }`
      );
    }
  };

  const updateActiveProcess = (index) => {
    const updatedActiveProcess = isActiveProcess.map((_, i) => i <= index);
    setIsActiveProcess(updatedActiveProcess);
  };

  useEffect(() => {
    if (location?.hash) {
      setTimeout(() => {
        const element = document.getElementById("ourBundl");
        element?.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  }, [location?.hash]);
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
              <div className="">
                <div className="row align-items-center">
                  <div className="col-4 col-md-3 col-lg-3 justify-content-between">
                    <div className="navbar navbar-expand-lg justify-content-between">
                      <a className="navbar-brand1" href="#ourBundl">
                        <img src={HomeLogo} alt="" className="img-fluid"></img>
                      </a>
                    </div>
                  </div>

                  <div className="col-1 col-md-1 col-lg-6" id="nav-menus-ar">
                    <div className="navbar navbar-expand-lg justify-content-end">
                      <div className="nav1 navbar-collapse mt-4 lg:!mt-8" id="mainNav">
                        <ul className=" mx-auto flex align-items-center ">
                          <li className="nav-item">
                            <a className="nav-link" href="/aboutus">
                              {lang === "ar" ? "عن بندل" : "About"}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/#ourBundl">
                              {lang === "ar" ? "باقاتنا" : "Bundls"}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/our-work">
                              {lang === "ar" ? "مشاريعنا" : "Work"}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/contact-us">
                              {lang === "ar" ? "تواصل معنا" : "Contact Us "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* ${lang !== 'ar' && 'float-right'} */}
                  <div className="col-7 relative !mt-4 col-md-8 col-lg-3 text-end ">
                    <div className={`navbar navbar-expand-lg float-right`}>
                      <ul className=" mr-auto h-list align-items-center ">
                        <li className="px-[6px]">
                          <a
                            onClick={() => {
                              setSearchShow(!searchShow);
                              setProfileVisible(false);
                            }}
                            className="cursor-pointer"
                          >
                            <img src={Search} alt="" className="navIcons"></img>
                          </a>
                          <div className="absolute" ref={searchRef}>
                            {searchShow ? (
                              <input
                                placeholder="Search"
                                onKeyDown={(e) => checkEnterKey(e)}
                                className="border-b focus:outline-none py-1 px-2 mt-3 text-black border-black"
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
                            className={`w-44 border-black border-[1px] absolute top-full ${
                              lang === "ar"
                                ? "right-[6rem] text-left"
                                : "right-[6rem] text-right"
                            } bg-white   ${
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
                                      <li
                                        className="relative p-1 inner-nav-li"
                                        onClick={() => navigate("/dashboard")}
                                      >
                                        <a
                                          href="/dashboard"
                                          className=" text-black"
                                          previewlistener="true"
                                        >
                                          {lang === "ar"
                                            ? "مشاريعنا"
                                            : "Projects"}
                                        </a>
                                      </li>
                                      <li
                                        className="relative p-1 inner-nav-li"
                                        onClick={() =>
                                          navigate("/purchase-history")
                                        }
                                      >
                                        <a
                                          href="/purchase-history"
                                          className="text-black"
                                          previewlistener="true"
                                        >
                                          {lang === "ar" ? "تاريخ" : "History"}
                                        </a>
                                      </li>
                                      <li
                                        className="relative p-1 inner-nav-li"
                                        onClick={() => navigate("/profile")}
                                      >
                                        <a
                                          href="/profile"
                                          className="text-black"
                                          previewlistener="true"
                                        >
                                          {lang === "ar" ? "حسابك" : "Profile"}
                                        </a>
                                      </li>
                                      <li
                                        className="relative p-1 inner-nav-li"
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
                                          {lang === "ar"
                                            ? "تسجيل خروج "
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
                                        {lang === "ar" ? "تسجيل دخول" : "Login"}
                                      </a>
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </nav>
                        </li>
                        <li className="px-[6px]">
                          <a className="" href="/mycart?direct=true">
                            <img src={Cart} alt="" className="navIcons"></img>
                          </a>
                        </li>
                        <li className="px-[6px]">
                          <a
                            className="cursor-pointer"
                            onClick={() =>
                              changeLanguage(lang == "ar" ? "En" : "ar")
                            }
                          >
                            {lang === "ar" ? (
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
                            className={`w-44 absolute border-[1px] border-black top-full -right-2 ${
                              lang === "ar" ? "text-left" : "text-right"
                            } bg-white   ${
                              menuVisible
                                ? "opacity-100 visible z-10"
                                : "opacity-0 invisible"
                            }`}
                          >
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
                              {menuVisible && (
                                <ul className=" inner-nav-item">
                                  <li
                                    className="relative p-1 inner-nav-li"
                                    onClick={() => navigate("/#ourBundl")}
                                  >
                                    <a
                                      href="#ourBundl"
                                      className="text-black"
                                      previewlistener="true"
                                    >
                                      {lang === "ar" ? "باقاتنا" : "Bundls"}
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
                                      {lang === "ar" ? "مشاريعنا" : "Our Work"}
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
                                      {lang === "ar" ? "عن بندل" : "About us"}
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
                                      {lang === "ar"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-sider mt-20">
              <div className="scroller bg-grey">
                <ul className="tag-list h-[46px] scroller__inner">
                  <img src={CarMarquee} className="slidee  w-[54px]"></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم الهوية" : "BRAND identity"}
                  </span>
                  <img
                    src={LemonMarquee}
                    alt=""
                    className="img-fluid w-[41px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "متاجر الكترونية" : "web design"}
                  </span>
                  <img
                    src={MouthMarquee}
                    alt=""
                    className="img-fluid w-[30px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم جرافيكي" : "graphic design"}
                  </span>
                  <img
                    src={RocketMarquee}
                    alt=""
                    className="img-fluid w-[70px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم الهوية" : "BRAND identity"}
                  </span>
                  <img
                    src={EyeMarquee}
                    alt=""
                    className="img-fluid w-[47px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "متاجر الكترونية" : "web design"}
                  </span>
                  <img
                    src={PaintMarquee}
                    alt=""
                    className="img-fluid w-[56px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم جرافيكي" : "graphic design"}
                  </span>
                  <img
                    src={CarMarquee}
                    className="img-fluid w-[54px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم الهوية" : "BRAND identity"}
                  </span>
                  <img
                    src={LemonMarquee}
                    alt=""
                    className="img-fluid w-[41px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "متاجر الكترونية" : "web design"}
                  </span>
                  <img
                    src={MouthMarquee}
                    alt=""
                    className="img-fluid w-[30px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم جرافيكي" : "graphic design"}
                  </span>
                  <img
                    src={RocketMarquee}
                    alt=""
                    className="img-fluid w-[70px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم الهوية" : "BRAND identity"}
                  </span>
                  <img
                    src={EyeMarquee}
                    alt=""
                    className="img-fluid w-[47px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "متاجر الكترونية" : "web design"}
                  </span>
                  <img
                    src={PaintMarquee}
                    alt=""
                    className="img-fluid w-[56px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم جرافيكي" : "graphic design"}
                  </span>
                  <img
                    src={RocketMarquee}
                    alt=""
                    className="img-fluid w-[70px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم الهوية" : "BRAND identity"}
                  </span>
                  <img
                    src={LemonMarquee}
                    alt=""
                    className="img-fluid w-[41px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "متاجر الكترونية" : "web design"}
                  </span>
                  <img
                    src={MouthMarquee}
                    alt=""
                    className="img-fluid w-[30px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم جرافيكي" : "graphic design"}
                  </span>
                  <img
                    src={RocketMarquee}
                    alt=""
                    className="img-fluid w-[70px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم الهوية" : "BRAND identity"}
                  </span>
                  <img
                    src={EyeMarquee}
                    alt=""
                    className="img-fluid w-[47px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "متاجر الكترونية" : "web design"}
                  </span>
                  <img
                    src={PaintMarquee}
                    alt=""
                    className="img-fluid w-[56px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم جرافيكي" : "graphic design"}
                  </span>
                  <img src={CarMarquee} className="slidee  w-[54px]"></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم الهوية" : "BRAND identity"}
                  </span>
                  <img
                    src={LemonMarquee}
                    alt=""
                    className="img-fluid w-[41px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "متاجر الكترونية" : "web design"}
                  </span>
                  <img
                    src={MouthMarquee}
                    alt=""
                    className="img-fluid w-[30px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم جرافيكي" : "graphic design"}
                  </span>
                  <img
                    src={RocketMarquee}
                    alt=""
                    className="img-fluid w-[70px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم الهوية" : "BRAND identity"}
                  </span>
                  <img
                    src={EyeMarquee}
                    alt=""
                    className="img-fluid w-[47px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "متاجر الكترونية" : "web design"}
                  </span>
                  <img
                    src={PaintMarquee}
                    alt=""
                    className="img-fluid w-[56px] slidee"
                  ></img>
                  <span className="slidee md:text-[22px] text-[22px] xs:text-[16px] font-[700] mx-3 uppercase">
                    {lang === "ar" ? "تصميم جرافيكي" : "graphic design"}
                  </span>
                </ul>
              </div>
              {/* <div className="img-rotate">
                                    <img src={Loader} alt="" className="rotating-image"></img>
                                </div> */}
            </div>
            <div className="xs:min-h-[54vh] sm:min-h-[73vh]">
              <div className="hero-text">
                <div className="justify-content-cnter text-center mx-auto">
                  <div className="px-2"></div>
                  {/* <h1 className='!text-black sm:px-[9%] xs:px-[11%]  lg:px-[10%] !w-[100%] xs:!text-[26px] sm:!text-[58px] !text-[58px]'><span>هوية بصرية تصميم جرافيكي متاجر
                    الكترونية​ Elevating</span> brands & shaping legacies, one <span>extraordinary design</span> at a <i>time.</i></h1> */}
                  {lang === "ar" ? (
                    // <h1 className='!text-black sm:px-[9%] xs:px-[11%]  lg:px-[10%] !w-[100%] xs:!text-[24px] sm:!text-[56px] !text-[56px]'>                 نرتقي بالمشاريع  لصنع أثرا يدوم   بتصاميم استثنائية في كل مره</h1>
                    <h1 className="!text-black sm:px-[9%] xs:px-[11%]  lg:px-[10%] !w-[100%] xs:!text-[24px] sm:!text-[56px] !text-[56px]">
                      {" "}
                      نرتقي <span>بالمشاريع</span> لصنع أثرا يدوم <br></br>
                      <span>بتصاميم استثنائية</span> في كل <i>مره</i>
                    </h1>
                  ) : (
                    <h1 className="!text-black sm:px-[9%] xs:px-[11%]  lg:px-[10%] !w-[100%] xs:!text-[24px] sm:!text-[56px] !text-[56px]">
                      <span>Elevating </span>brands & shaping legacies, one{" "}
                      <span>extraordinary design </span> at a <i>time.</i>
                    </h1>
                  )}

                  {/* <h1 className='!text-black sm:px-[9%] xs:px-[11%]  lg:px-[10%] !w-[100%] xs:!text-[24px] sm:!text-[56px] !text-[56px]'><span>{lang === 'ar' ? 'نرتقي بالمشاريع' :'Elevating '} </span>{lang === 'ar' ? 'لصنع أثرًا يدوم' : 'brands & shaping legacies, one ' }<span>{lang === 'ar' ? 'بتصاميم استثنائية' :'extraordinary design '}</span>{lang === 'ar' ? 'في كل مرة' : ' at a ' }<i>{lang === 'ar' ? '' :'time.'}</i></h1> */}
                  <div className="button-container scroller">
                    <ul className="scroll-button h-[46px] scroller__inner_btn">
                      <li>
                        <span>
                          <a className="text-black" href="#ourBundl">
                            {lang === "ar" ? "تصفح باقاتنا" : "Shop our Bundls"}
                          </a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src={MagicIcon}
                            alt=""
                            className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"
                          ></img>
                        </span>
                      </li>
                      <li>
                        <span>
                          <a className="text-black" href="#ourBundl">
                            {lang === "ar" ? "تصفح باقاتنا" : "Shop our Bundls"}
                          </a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src={MagicIcon}
                            alt=""
                            className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"
                          ></img>
                        </span>
                      </li>
                      <li>
                        <span>
                          <a className="text-black" href="#ourBundl">
                            {lang === "ar" ? "تصفح باقاتنا" : "Shop our Bundls"}
                          </a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <img
                            src={MagicIcon}
                            alt=""
                            className="img-fluid !mt-[25%] !ml-[10%] !w-[30px]"
                          ></img>
                        </span>
                      </li>
                      <li>
                        <span>
                          <a className="text-black" href="#ourBundl">
                            {lang === "ar" ? "تصفح باقاتنا" : "Shop our Bundls"}
                          </a>
                        </span>
                      </li>
                    </ul>
                    <div className="hover-animation btn-blank-hover">
                      <span className="blue"></span>
                      <span className="green"></span>
                      <span className="pink"></span>
                      <span className="hover-txt">
                        {" "}
                        <a
                          className="sm:text-white hover:!text-white xs:text-black"
                          href="#ourBundl"
                        >
                          {lang === "ar" ? "تصفح باقاتنا" : "Shop our Bundls"}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="divider "></div>
          <section className="container-fluid our-process xs:py-[65px] sm:py-[80px]">
            <div className="container-fluid">
              <div className="row justify-content-center mb-4">
                <div className="col-md-5 text-center">
                  <h2 className="sub-headeing text-black xs:mt-">
                    {lang === "ar" ? "آليتنا " : "Our Process"}
                  </h2>
                  {/* <p className="p-24">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p> */}
                </div>
              </div>
              <div class="image_slider">
                <div class="slider">
                  <div class="slides">
                    <input
                      type="radio"
                      name="radio-btn"
                      id="radio0"
                      checked={activeProcess === 0}
                    ></input>
                    <input
                      type="radio"
                      name="radio-btn"
                      id="radio1"
                      checked={activeProcess === 1}
                    ></input>
                    <input
                      type="radio"
                      name="radio-btn"
                      id="radio2"
                      checked={activeProcess === 2}
                    ></input>
                    <input
                      type="radio"
                      name="radio-btn"
                      id="radio3"
                      checked={activeProcess === 3}
                    ></input>
                    <input
                      type="radio"
                      name="radio-btn"
                      id="radio4"
                      checked={activeProcess === 4}
                    ></input>
                    <div
                      class="slide first"
                      style={
                        activeProcess === 0
                          ? { transform: "scale(1.2)", opacity: 1 }
                          : {}
                      }
                    >
                      <img
                        src={BuyBundl}
                        slice
                        width="100%"
                        height="100%"
                      ></img>
                    </div>
                    <div
                      class="slide"
                      style={
                        activeProcess === 1
                          ? { transform: "scale(1.1)", opacity: 1 }
                          : {}
                      }
                    >
                      <img
                        src={FillQuestionnarie}
                        slice
                        width="100%"
                        height="100%"
                      ></img>
                    </div>
                    <div
                      class="slide"
                      style={
                        activeProcess === 2
                          ? { transform: "scale(1.1)", opacity: 1 }
                          : {}
                      }
                    >
                      <img src={Approve} slice width="100%" height="100%"></img>
                    </div>
                    <div
                      class="slide"
                      style={
                        activeProcess === 3
                          ? { transform: "scale(1.2)", opacity: 1 }
                          : {}
                      }
                    >
                      <img
                        src={UploadContent}
                        slice
                        width="100%"
                        height="100%"
                      ></img>
                    </div>
                    <div
                      class="slide"
                      style={
                        activeProcess === 4
                          ? { transform: "scale(1.2)", opacity: 1 }
                          : {}
                      }
                    >
                      <img
                        src={Getthedesign}
                        slice
                        width="100%"
                        height="100%"
                      ></img>
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
                        className={`process_title xs:text-[18px] sm:text-[28px] font-[700] ${
                          activeProcess === index ? "title-active" : ""
                        }`}
                      >
                        {lang === "ar" ? process.arabic_title : process.title}
                      </div>
                    ))}
                  </div>
                  <div className="desc-cover relative xs:h-[70px] xs:mt-[20px] sm:h-[80px]">
                    {processData.map((process, index) => (
                      <div
                        key={index}
                        className={`process_description f-20 text-center ${
                          activeProcess === index ? "desc-active" : ""
                        }`}
                      >
                        {lang === "ar"
                          ? process.arabic_description
                          : process.description}
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
                      style={
                        window.innerWidth <= 475
                          ? {
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              marginTop: "1%",
                            }
                          : {
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }
                      }
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
                        className="content_section !cursor-pointer"
                        style={{
                          transition: "1s",
                          opacity: isActiveProcess[index] ? 1 : 0.3,
                        }}
                      >
                        {(lang === "ar" ? process.arabic_title : process.title)
                          .split("  ")
                          .map((word, i) => (
                            <span key={i}>{word}</span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
                <svg
                  className="rocket overlay sm:ml-[-50px] lg:ml-[-50px] md:ml-[-50px] xs:ml-[0px]"
                  style={
                    lang === "ar"
                      ? {
                          transform: `translateX(${translateX_arabic}px) scaleX(-1)`,
                        }
                      : { transform: `translateX(${translateX}px)` }
                  }
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
          <div className="plus relative plus-deivide">
            <img
              className="w-[50px] h-[50px] mx-auto relative -top-[30px]"
              src={plusImage}
            ></img>
          </div>

          <section id="ourBundl" className="container-fluid our-bundl">
            <div className="container">
              <div className="row justify-content-center bundl-pack-head">
                <div className="col-md-11 col-lg-9">
                  <h4 className="sub-headeing mb-4 text-center text-black">
                    {lang === "ar" ? "باقاتنا" : "Our Bundls"}
                  </h4>
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
              <div
                className="sliding_section border-top1"
                style={{ display: "flex" }}
                id="bundls-first-child"
              >
                <input
                  checked={isbgChecked[0]}
                  type="checkbox"
                  id="newbie_no1"
                  className="button_section"
                  onChange={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[0] = !prevState[0];
                      return newState;
                    })
                  }
                />

                {/* <!-- rotating buiscut --> */}
                <div className="icon_section1">
                  <div className="subzero1">
                    {/* <span onClick={() => addToCart(0)} className="buiscut_layer1">
                                                <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                ADD TO <br></br>CART</span> */}
                    <span
                      onClick={() => addToCart(0)}
                      className="buiscut_layer1"
                    >
                      {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img> */}
                    </span>
                    <div
                      onClick={() => addToCart(0)}
                      className="main_inside1 cursor-pointer"
                    ></div>
                  </div>
                </div>

                {/* <!-- background color --> */}
                <div className="bg_color1"></div>

                <div className="open_arrow1 position-relative">
                  <label className="cursor-pointer" for="newbie_no1">
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
                <div
                  className="newbie_section cursor-pointer"
                  onClick={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[0] = !prevState[0];
                      return newState;
                    })
                  }
                  style={
                    window.innerWidth <= 475
                      ? lang === "ar"
                        ? { padding: "5% 3% 2% 0%" }
                        : { padding: "5% 0 2% 2%" }
                      : {}
                  }
                >
                  <div className="change_brand">
                    <div className="table_icon">
                      <img src={QubeIcon} alt="" className="img-fluid"></img>
                    </div>
                    <div className="newbie">
                      {lang === "ar" ? "النيوبي" : "The Newbie"}
                    </div>
                    <div className="pkg-sub-title">
                      {lang === "ar"
                        ? "بداية مثالية للانطلاق"
                        : "Just to get started"}
                    </div>
                  </div>
                  <div className="second_brand_section">
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {lang === "ar" ? " تصميم الهوية " : "Brand Identity"}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>
                          {lang === "ar" ? "فكره المشروع" : "Brand Concept"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "التوجه الفني للمشروع"
                            : "Brand Direction"}
                        </li>
                        <li>
                          {lang === "ar" ? "تصميم الشعار" : "Logo Design"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "خيار إضافي للشعار"
                            : "Logo Variations"}
                        </li>
                        <li>
                          {lang === "ar" ? "لوحة الألوان" : "Color Palette"}
                        </li>
                        <li>
                          {lang === "ar" ? "الأحرف والخطوط" : "Typography"}
                        </li>
                        <li>
                          {lang === "ar" ? "الهوية البصرية" : "Visual Identity"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "دليل الهوية البصرية"
                            : "Brand Guide"}
                        </li>
                      </ul>
                    </div>
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {window.innerWidth <= 475
                            ? lang === "ar"
                              ? "اختر الإضافات المناسبة لك​" 
                              : "Choose Your Add-ons"
                            : lang === "ar"
                            ? "اختر الإضافات المناسبة لك"
                            : "Choose Your Add-ons"}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>{lang === "ar" ? "الهوية البصرية" : "Branding"}</li>
                        <li>
                          {lang === "ar" ? "التصاميم الالكترونية" : "E-designs"}
                        </li>
                        <li>{lang === "ar" ? "المنتجات" : "Products"}</li>
                        <li>{lang === "ar" ? "المطبوعات" : "Publications"}</li>
                        <li>
                          {lang === "ar" ? "سوشال ميديا " : "Social Media"}
                        </li>
                        <li>
                          {lang === "ar" ? "تصميم مساحات" : "Space Design"}
                        </li>
                        <li>{lang === "ar" ? "سوشال ميديا" : "Stationery"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="newbie_description">
                  <div className="third_section_toggle">
                    <div className="brand_identity pink-text">
                      {lang === "ar" ? "تصميم الهوية" : "Brand Identity"} +{" "}
                      <br />
                      {lang === "ar"
                        ? "إضافات إلى بندل"
                        : "Add-Ons To Your Bundl"}
                    </div>
                    <div className="change_brand_name">
                      <div className="second_section_image">
                        <img src={QubeIcon} alt="" className="img-fluid"></img>
                      </div>
                      <div
                        className="second_section_text"
                        style={{ paddingTop: "10px" }}
                      >
                        {lang === "ar" ? "النيوبي" : "The Newbie"}
                      </div>
                    </div>
                  </div>
                  <div className="sar d-flex align-items-center">
                    {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
                    <span className="sar_text">
                      <span>
                        {lang === "ar" ? "تبدأ من​" : "Starting from"}
                      </span>{" "}
                      {amountDecimal(4880)}  {lang === "ar" ? "ريال" : "SAR"}
                    </span>
                  </div>
                  <div className="work_time d-flex align-items-center">
                    {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
                    <span className="working_days">
                      <span>
                        {lang === "ar" ? "تبدأ من​" : "Starting from"}
                      </span>{" "}
                      30 {lang === "ar" ? "أيام عمل" : "WORKING DAYS"}
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- table-2 --> */}
              <div className="sliding_section" style={{ display: "flex" }}>
                <input
                  checked={isbgChecked[1]}
                  type="checkbox"
                  id="newbie_no2"
                  className="button_section"
                  onChange={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[1] = !prevState[1];
                      return newState;
                    })
                  }
                />

                {/* <!-- rotating buiscut --> */}
                <div className="icon_section2">
                  <div className="subzero2">
                    <span
                      onClick={() => addToCart(1)}
                      className="buiscut_layer2"
                    >
                      {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                ADD TO <br></br>CART */}
                    </span>
                    <div
                      onClick={() => addToCart(1)}
                      className="main_inside2 cursor-pointer"
                    ></div>
                  </div>
                </div>

                {/* <!-- background color --> */}
                <div className="bg_color2"></div>

                <div className="open_arrow2 position-relative">
                  <label className="cursor-pointer" for="newbie_no2">
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
                <div
                  className="newbie_section cursor-pointer"
                  onClick={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[1] = !prevState[1];
                      return newState;
                    })
                  }
                >
                  <div className="change_brand">
                    <div className="table_icon">
                      <img src={Food} alt="" className="img-fluid"></img>
                    </div>
                    <div className="newbie">
                      {lang === "ar" ? "الفودي" : "The Foodie"}
                    </div>
                    <div
                      className={`pkg-sub-title ${
                        lang === "ar" ? "xs:!pl-8" : "xs:!pr-8"
                      }`}
                    >
                      {lang === "ar"
                        ? "للمطاعم والمقاهي "
                        : "For Restaurants and Cafés"}
                    </div>
                  </div>
                  <div className="second_brand_section">
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {lang === "ar" ? "تصميم الهوية" : "Brand Identity"}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>
                          {lang === "ar" ? "فكره المشروع" : "Brand Concept"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "التوجه الفني للمشروع"
                            : "Brand Direction"}
                        </li>
                        <li>
                          {lang === "ar" ? "تصميم الشعار" : "Logo Design"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "خيار إضافي للشعار"
                            : "Logo Variations"}
                        </li>
                        <li>
                          {lang === "ar" ? "لوحة الألوان" : "Color Palette"}
                        </li>
                        <li>
                          {lang === "ar" ? "الأحرف والخطوط" : "Typography"}
                        </li>
                        <li>
                          {lang === "ar" ? "الهوية البصرية" : "Visual Identity"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "دليل الهوية البصرية"
                            : "Brand Guide"}
                        </li>
                      </ul>
                    </div>
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {window.innerWidth <= 475
                            ? lang === "ar"
                              ? "تصاميم المطاعم والمقاهي"
                              : "Collateral"
                            : lang === "ar"
                            ? "تصاميم المطاعم والمقاهي"
                            : "F&B Collateral"}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>
                          {lang === "ar"
                            ? processArabicText("قائمة الأسعار (للصفحة الواحدة)")
                            : "1 Page Price List"}
                        </li>
                        <li>{lang === "ar" ? "كيس" : "Bag"}</li>
                        <li>{lang === "ar" ? "علبة" : "Box"}</li>
                        <li>{lang === "ar" ? "كوب ورقي" : "Paper Cup"}</li>
                        <li>{lang === "ar" ? "ستيكر" : "Sticker"}</li>
                        <li>{lang === "ar" ? "مناديل مبللة" : "Wet wipes"}</li>
                        <li>
                          {lang === "ar" ? "ورق تغليف" : "Wrapping Paper"}
                        </li>
                      </ul>
                    </div>
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {lang === "ar"
                            ? "مجموعة السوشال ميديا"
                            : "Social Media Starter Kit"}{" "}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>{lang === "ar" ? "بوست GIF" : "GIF Post"}</li>
                        <li>
                          {lang === "ar"
                            ? "4 غلاف هايلايت"
                            : "4 Highlight Cover"}
                        </li>
                        <li>
                          {lang === "ar" ? "غلاف سوشال ميديا" : "Profile Cover"}
                        </li>
                        <li>
                          {lang === "ar" ? "3 بوست ثابت" : "3 Static Post"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="newbie_description">
                  <div className="third_section_toggle">
                    <div className="brand_identity green-text">
                      {lang === "ar" ? "تصميم الهوية" : "Brand Identity"} +{" "}
                      <br />
                      {window.innerWidth <= 768
                        ? lang === "ar"
                          ? "تصاميم المطاعم والمقاهي"
                          : "  F&B Collateral +"
                        : lang === "ar"
                        ? "تصاميم المطاعم والمقاهي"
                        : "Food & Beverage Collateral +"}{" "}
                      <br />
                      {lang === "ar"
                        ? "مجموعة السوشال ميديا"
                        : "Social Media Starter Kit "}{" "}
                      <br />
                    </div>
                    <div className="change_brand_name">
                      <div className="second_section_image">
                        <img src={Food} alt="" className="img-fluid"></img>
                      </div>
                      <div
                        className="second_section_text"
                        style={{ paddingTop: "10px" }}
                      >
                        {lang === "ar" ? "الفودي" : "The Foodie"}
                      </div>
                    </div>
                  </div>
                  <div className="sar d-flex align-items-center">
                    {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
                    <span className="sar_text">
                     {amountDecimal (8000) } {lang === "ar" ? "ريال" : "SAR"}
                    </span>
                  </div>
                  <div className="work_time d-flex align-items-center">
                    {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
                    <span className="working_days">
                      40 {lang === "ar" ? "أيام عمل" : "WORKING DAYS"}
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- table-3 --> */}
              <div className="sliding_section" style={{ display: "flex" }}>
                <input
                  checked={isbgChecked[2]}
                  type="checkbox"
                  id="newbie_no3"
                  className="button_section"
                  onChange={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[2] = !prevState[2];
                      return newState;
                    })
                  }
                />

                {/* <!-- rotating buiscut --> */}
                <div className="icon_section3">
                  <div className="subzero3">
                    <span
                      onClick={() => addToCart(2)}
                      className="buiscut_layer3"
                    >
                      {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                ADD TO <br></br>CART */}
                    </span>
                    <div
                      onClick={() => addToCart(2)}
                      className="main_inside3 cursor-pointer"
                    ></div>
                  </div>
                </div>

                {/* <!-- background color --> */}
                <div className="bg_color3"></div>

                <div className="open_arrow3 position-relative">
                  <label className="cursor-pointer" for="newbie_no3">
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
                <div
                  className="newbie_section cursor-pointer"
                  onClick={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[2] = !prevState[2];
                      return newState;
                    })
                  }
                >
                  <div className="change_brand">
                    <div className="table_icon">
                      <img src={Eye} alt="" className="img-fluid"></img>
                    </div>
                    <div className="newbie">
                      {lang === "ar" ? "السوشلايت" : "The socialite"}
                    </div>
                    <div className="pkg-sub-title">
                      {lang === "ar"
                        ? "للصالونات ومشاريع الخدمات"
                        : "For Salons and Other Services"}
                    </div>
                  </div>
                  <div className="second_brand_section">
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {lang === "ar" ? "تصميم الهوية" : "Brand Identity"}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>
                          {lang === "ar" ? "فكره المشروع" : "Brand Concept"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "التوجه الفني للمشروع"
                            : "Brand Direction"}
                        </li>
                        <li>
                          {lang === "ar" ? "تصميم الشعار" : "Logo Design"}
                        </li>
                        {/* <li>
                          {lang === "ar"
                            ? "خيار إضافي للشعار"
                            : "Logo Variations"}
                        </li> */}
                        <li>
                          {lang === "ar" ? "لوحة الألوان" : "Color Palette"}
                        </li>
                        <li>
                          {lang === "ar" ? "الأحرف والخطوط" : "Typography"}
                        </li>
                        <li>
                          {lang === "ar" ? "الهوية البصرية" : "Visual Identity"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "دليل الهوية البصرية"
                            : "Brand Guide"}
                        </li>
                      </ul>
                    </div>
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {window.innerWidth <= 475
                            ? lang === "ar"
                              ? "تصاميم الخدمات"
                              : "Collateral"
                            : lang === "ar"
                            ? "تصاميم الخدمات"
                            : "Services Collateral"}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>
                          {lang === "ar"
                            ? processArabicText("قائمة الأسعار (للصفحة الواحدة)")
                            : "1 Page Price List"}
                        </li>
                        <li>{lang === "ar" ? "كيس" : "Bag"}</li>
                        <li>{lang === "ar" ? "بطاقة عمل" : "Business Card"}</li>
                        <li>
                          {lang === "ar" ? "بطاقة الولاء" : "Loyalty Card"}
                        </li>
                        <li>{lang === "ar" ? "كوب ورقي" : "Paper Cup"}</li>
                        <li>{lang === "ar" ? "منشفة" : "Towel"}</li>
                      </ul>
                    </div>
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {" "}
                          {lang === "ar"
                            ? "مجموعة السوشال ميديا"
                            : "Social Media Starter Kit"}{" "}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>{lang === "ar" ? "بوست GIF" : "GIF Post"}</li>
                        <li>
                          {lang === "ar"
                            ? "4 غلاف هايلايت"
                            : "4 Highlight Cover"}
                        </li>
                        <li>
                          {lang === "ar" ? "غلاف سوشال ميديا" : "Profile Cover"}
                        </li>
                        <li>
                          {lang === "ar" ? "3 بوست ثابت" : "3 Static Post"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="newbie_description">
                  <div className="third_section_toggle">
                    <div className="brand_identity blue-text">
                      {lang === "ar" ? "تصميم الهوية" : "Brand Identity"} +{" "}
                      <br />
                      {lang === "ar"
                        ? "تصاميم الخدمات"
                        : "Services Collateral"}{" "}
                      + <br />
                      {lang === "ar"
                        ? "مجموعة السوشال ميديا"
                        : "Social Media Starter Kit"}
                    </div>
                    <div className="change_brand_name">
                      <div className="second_section_image">
                        <img src={Eye} alt="" className="img-fluid"></img>
                      </div>
                      <div
                        className="second_section_text"
                        style={{ paddingTop: "10px" }}
                      >
                        {lang === "ar" ? "السوشلايت" : "The socialite"}
                      </div>
                    </div>
                  </div>
                  <div className="sar d-flex align-items-center">
                    {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
                    <span className="sar_text">
                      {amountDecimal(8000)} {lang === "ar" ? "ريال" : "SAR"}
                    </span>
                  </div>
                  <div className="work_time d-flex align-items-center">
                    {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">-->  */}
                    <span className="working_days">
                      40 {lang === "ar" ? "أيام عمل" : "WORKING DAYS"}
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- table-4 --> */}
              <div className="sliding_section" style={{ display: "flex" }}>
                <input
                  checked={isbgChecked[3]}
                  type="checkbox"
                  id="newbie_no4"
                  className="button_section"
                  onChange={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[3] = !prevState[3];
                      return newState;
                    })
                  }
                />

                {/* <!-- rotating buiscut --> */}
                <div className="icon_section4">
                  <div className="subzero4">
                    <span
                      onClick={() => addToCart(3)}
                      className="buiscut_layer4"
                    >
                      {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img>
                                                ADD TO <br></br>CART */}
                    </span>
                    <div
                      onClick={() => addToCart(3)}
                      className="main_inside4 cursor-pointer"
                    ></div>
                  </div>
                </div>

                {/* <!-- background color --> */}
                <div className="bg_color4"></div>

                <div className="open_arrow4 position-relative">
                  <label className="cursor-pointer" for="newbie_no4">
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
                <div
                  className="newbie_section cursor-pointer"
                  onClick={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[3] = !prevState[3];
                      return newState;
                    })
                  }
                >
                  <div className="change_brand">
                    <div className="table_icon">
                      <img src={Diamond} alt="" className="img-fluid"></img>
                    </div>
                    <div className="newbie">
                      {lang === "ar" ? "البوتيكر" : "The Boutiquer"}
                    </div>
                    <div className="pkg-sub-title">
                      {lang === "ar"
                        ? "للمتاجر"
                        : "For Shops and Online Stores "}
                    </div>
                  </div>
                  <div className="second_brand_section">
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {lang === "ar" ? "تصميم الهوية" : "Brand Identity"}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>
                          {lang === "ar" ? "فكره المشروع" : "Brand Concept"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "التوجه الفني للمشروع"
                            : "Brand Direction"}
                        </li>
                        <li>
                          {lang === "ar" ? "تصميم الشعار" : "Logo Design"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "خيار إضافي للشعار"
                            : "Logo Variations"}
                        </li>
                        <li>
                          {lang === "ar" ? "لوحة الألوان" : "Color Palette"}
                        </li>
                        <li>
                          {lang === "ar" ? "الأحرف والخطوط" : "Typography"}
                        </li>
                        <li>
                          {lang === "ar" ? "الهوية البصرية" : "Visual Identity"}
                        </li>
                        <li>
                          {lang === "ar"
                            ? "دليل الهوية البصرية"
                            : "Brand Guide"}
                        </li>
                      </ul>
                    </div>
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {window.innerWidth <= 475
                            ? lang === "ar"
                              ? "تصاميم التجارة"
                              : "Collateral"
                            : lang === "ar"
                            ? "تصاميم التجارة"
                            : "Commerce Collateral"}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>{lang === "ar" ? "كيس" : "Bag"}</li>
                        <li>{lang === "ar" ? "علبة" : "Box"}</li>
                        <li>{lang === "ar" ? "بطاقة عمل" : "Business Card"}</li>
                        <li>{lang === "ar" ? "ستيكر" : "Sticker"}</li>
                        <li>{lang === "ar" ? "كرت شكر" : "Thank you Card"}</li>
                        <li>
                          {lang === "ar" ? "ورق تغليف" : "Wrapping Paper"}
                        </li>
                      </ul>
                    </div>
                    <div className="box-child">
                      <div className="pack-inner-title">
                        <span>
                          {lang === "ar"
                            ? "مجموعة السوشال ميديا"
                            : "Social Media Starter Kit"}{" "}
                        </span>
                      </div>
                      <ul className="second_brand_list">
                        <li>{lang === "ar" ? "بوست GIF" : "GIF Post"}</li>
                        <li>
                          {lang === "ar"
                            ? "4 غلاف هايلايت"
                            : "4 Highlight Cover"}
                        </li>
                        <li>
                          {lang === "ar" ? "غلاف سوشال ميديا" : "Profile Cover"}
                        </li>
                        <li>
                          {lang === "ar" ? "3 بوست ثابت" : "3 Static Post"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="newbie_description">
                  <div className="third_section_toggle">
                    <div className="brand_identity pink-text">
                      {lang === "ar" ? "تصميم الهوية" : "Brand Identity"} +{" "}
                      <br />
                      {lang === "ar"
                        ? "تصاميم التجارة"
                        : "Commerce Collateral"}{" "}
                      + <br />
                      {lang === "ar"
                        ? "مجموعة السوشال ميديا"
                        : "Social Media Starter Kit"}
                    </div>
                    <div className="change_brand_name">
                      <div className="second_section_image">
                        <img src={Diamond} alt="" className="img-fluid"></img>
                      </div>
                      <div
                        className="second_section_text"
                        style={{ paddingTop: "10px" }}
                      >
                        {lang === "ar" ? "البوتيكر" : "The Boutiquer"}
                      </div>
                    </div>
                  </div>
                  <div className="sar d-flex align-items-center">
                    {/* <!--<img src="asset/images/money-icon.webp" alt="" className="img-fluid">--> */}
                    <span className="sar_text">
                      {amountDecimal(8000)} {lang === "ar" ? "ريال" : "SAR"}
                    </span>
                  </div>
                  <div className="work_time d-flex align-items-center">
                    {/* <!--<img src="asset/images/time-icon.webp" alt="" className="ing-fluid">--> */}
                    <span className="working_days">
                      40 {lang === "ar" ? "أيام عمل" : "WORKING DAYS"}
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- table-5 --> */}
              <div className="sliding_section" style={{ display: "flex" }}>
                <input
                  checked={isbgChecked[4]}
                  type="checkbox"
                  id="newbie_no5"
                  className="button_section"
                  onChange={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[4] = !prevState[4];
                      return newState;
                    })
                  }
                />

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
                      {/* <img style={{ width: '30%' }} src={CartIcon} alt='cart-icon'></img> */}
                      {/* <NavLink style={{ color: 'white' }} to="/custombundl" state={{ title: 'Custom Bundl' }}>
                                                    ADD TO <br></br>CART
                                                </NavLink> */}
                    </span>
                    <div
                      className="main_inside5 cursor-pointer"
                      onClick={() =>
                        navigate("/custombundl", {
                          state: { title: lang === "ar" ? "" : "Custom Bundl" },
                        })
                      }
                    ></div>
                  </div>
                </div>

                {/* <!-- background color --> */}
                <div className="bg_color5"></div>

                <div className="open_arrow5 position-relative">
                  <label className="cursor-pointer" for="newbie_no5">
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
                <div
                  className="newbie_section cursor-pointer"
                  onClick={() =>
                    setIsbgChecked((prevState) => {
                      const newState = [...prevState];
                      newState[4] = !prevState[4];
                      return newState;
                    })
                  }
                  style={{ justifyContent: "end" }}
                >
                  <div className="change_brand">
                    <div className="table_icon">
                      <img src={MaginIcon} alt="" className="img-fluid" />
                    </div>
                    <div className="newbie">
                      {lang === "ar"
                        ? "صمم الباقة الخاصة بك"
                        : "Customize your Bundl"}
                    </div>
                    {/* <div className="pkg-sub-title">{lang === 'ar' ? 'صمم البندل الخاص بك' : 'Customize your Bundl'}</div> */}
                  </div>

                  <div
                    className="second_brand_section"
                    style={{ height: "75%" }}
                  >
                    <span className="pack-sub-title">
                      {lang === "ar" ? "" : "Choose from"}
                    </span>
                    <div
                      className="box-child box-f-cuztomize-bundl"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="pack-inner-title">
                        <span>
                          + {lang === "ar" ? "الهوية البصرية" : "Branding"}
                        </span>
                      </div>
                      <div className="pack-inner-title">
                        <span>
                          +{" "}
                          {lang === "ar" ? "التصاميم الالكترونية" : "E-designs"}
                        </span>
                      </div>
                      <div className="pack-inner-title">
                        <span>+ {lang === "ar" ? "المنتجات" : "Products"}</span>
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
                        <span>
                          + {lang === "ar" ? "المطبوعات" : "Publications"}
                        </span>
                      </div>
                      <div className="pack-inner-title">
                        <span>
                          + {lang === "ar" ? "سوشال ميديا " : "Social Media"}
                        </span>
                      </div>
                      <div className="pack-inner-title">
                        <span>
                          + {lang === "ar" ? "تصميم مساحات" : "Space Design"}
                        </span>
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
                        <span>
                          + {lang === "ar" ? "سوشال ميديا" : "Stationery"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="newbie_description">
                  <div className="third_section_toggle">
                    <div className="brand_identity">
                      <div className="block">
                        {/* <div
                          className="newbie choose"
                          style={
                            lang !== "ar"
                              ? {
                                  fontSize: "30px",
                                  lineHeight: "1.4",
                                  minHeight: "80px",
                                  top: "40px",
                                  position: "relative",
                                }
                              : {
                                  minHeight: "40px",
                                  position: "relative",
                                  top: "40px", 
                                }
                          }
                        > */}

                        <div className={`newbie choose ${lang === "ar" ? "lang-ar" : "lang-en"}`}>
                          {lang === "ar" ? (
                            "اختر ما تحتاجه من قائمة العناص"
                          ) : (
                            <>
                              Choose what you need from <br />
                              our list of items
                            </>
                          )}
                        </div>

                        <div className="pkg-sub-title" style={{ opacity: "0" }}>
                          {lang === "ar"
                            ? "صمم البندل الخاص بك"
                            : "Customize your Bundl"}
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
                        {lang === "ar" ? "باقة خاصة " : "Customized"}
                      </div>
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

          <section className="container-fluid py-1">
            <div className="container mb-16">
              <div className="row justify-content-center">
                <div className="col-md-4 flex justify-center">
                  <img
                    className="xs:w-[150px] sm:w-[170px]"
                    src={popupGIF}
                  ></img>
                </div>
              </div>
            </div>
          </section>

          <div className="bunbl-box-news-section">
            <div className="row justify-content-center bt-1">
              <div
                className={`col-md-6 center-block text-center border-black ${
                  lang === "ar"
                    ? "lg:border-l-[1px] md:border-l-[1px] xs:border-l-0"
                    : "lg:border-r-[1px] md:border-r-[1px] xs:border-r-0"
                }`}
              >
                <div className="bundl-box-inner">
                  <div className="icon">
                    <img src={GrownIcon} alt="" className="img-fluid"></img>
                  </div>
                  <div className="title">
                    {lang === "ar" ? "بندل بريميوم " : "Premium Section"}
                  </div>
                  <div className="desc">
                    {lang === "ar"
                      ? "تفضل تجربة تصميم مخصصة لك؟"
                      : "Prefer a one-on-one design experience?"}
                  </div>
                  <a href="/form/premium" className="btn bundl-btn bt-1">
                    {lang === "ar" ? "تواصل معنا" : "Send us a message"}
                  </a>
                </div>
              </div>
              <div className="col-md-6 text-center">
                <div className="bundl-box-inner">
                  <div className="icon">
                    <img src={SystemIcon} alt="" className="img-fluid"></img>
                  </div>
                  <div className="title">
                    {lang === "ar" ? "متاجر الكترونية" : "website section"}
                  </div>
                  <div className="desc">
                    {lang === "ar"
                      ? "تحتاج متجر الكتروني مثالي لمشروعك؟"
                      : "Dreaming of a perfect website?"}
                  </div>
                  <a href="/form/webster" className="btn bundl-btn bt-1">
                    {lang === "ar" ? "تواصل معنا" : "Send us a message"}
                  </a>
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
                    <h2 className="sub-headeing text-black text-center">
                      {lang === "ar" ? "أعمالنا" : "Our Work"}
                    </h2>
                    {/* <p className="f-20 text-center">We, at Bundl, understand the design complexities that can trip up even the most seasoned brand. That's why we cut through the clutter and empower a smooth, collaborative journey for our clients.</p> */}
                  </div>
                </div>
              </div>
              <div id="ourWorkContainer" className="row justify-content-center">
                <div className="col-md-10">
                  <div className={`insta-feed  flex justify-center`}>
                    {/* <img src={Instafeed} alt="" ></img> */}
                    <div className={`relative  w-full overflow-hidden`}>
                      {/* Carousel Content */}
                      <div
                        className="flex transition-transform duration-500"
                        style={
                          lang === "ar"
                            ? { transform: `translateX(${currentWork * 100}%)` }
                            : {
                                transform: `translateX(-${currentWork * 100}%)`,
                              }
                        }
                      >
                        {ourworks.map((item, index) => (
                          <div
                            key={index}
                            className={`relative  flex-shrink-0 xl:w-[84%] xs:w-[84%] xs:mx-[8%] md:w-[99%] md:mx-1 xl:mx-[8%] flex flex-wrap ${
                              item.project_images.length > 2
                                ? "sm:h-[900px] xs:h-[300px]"
                                : "sm:h-[450px] xs:h-[300px]"
                            } justify-center`}
                          >
                            {item.project_images.map((img, imgIndex) => {
                              let borderClasses = "border-black border-solid";

                              // Apply borders based on image index
                              if (imgIndex === 0)
                                borderClasses +=
                                  " border-r-[2px] border-b-[2px]"; // 1st Image (Right, Bottom)
                              if (imgIndex === 1)
                                borderClasses +=
                                  " border-l-[2px] border-r-[2px] border-b-[2px]"; // 2nd Image (Left, Right, Bottom)
                              if (imgIndex === 2)
                                borderClasses +=
                                  " border-l-[2px] border-b-[2px]"; // 3rd Image (Left, Bottom)
                              if (imgIndex === 3)
                                borderClasses +=
                                  " border-r-[2px] border-t-[2px]"; // 4th Image (Right, Top)
                              if (imgIndex === 4)
                                borderClasses +=
                                  " border-l-[2px] border-r-[2px] border-t-[2px]"; // 5th Image (Left, Right, Top)
                              if (imgIndex === 5)
                                borderClasses +=
                                  " border-l-[2px] border-t-[2px]"; // 6th Image (Left, Top)
                              return (
                                <img
                                  key={imgIndex}
                                  // className="w-1/3 sm:w-[33%] object-cover border-black border-solid border-[5px]"
                                  // className={`lg:w-1/3 md:w-1/3 xs:w-[30%] lg:object-cover md:object-cover xs:object-fill aspect-square ${borderClasses}`}
                                  className={`sm:w-[32%] w-[32%] xs:w-[33%] aspect-square object-cover ${borderClasses}`}
                                  src={img}
                                  alt={`Project ${index + 1}`}
                                />
                              );
                            })}
                            {currentWork != 0 && (
                              <button
                                onClick={() => slideChange("prev")}
                                className="absolute md:left-20 left-20 xs:left-8 top-1/2 transform -translate-y-1/2 w-[30px] sm:w-[30px] xs:w-[10px] h-[35%] bg-black "
                              >
                                <ChevronLeftIcon className="text-white" />
                              </button>
                            )}
                            {/* Right Button */}
                            {currentWork != ourworks.length - 1 && (
                              <button
                                onClick={() => slideChange("next")}
                                className="absolute md:right-20 right-20 xs:right-8 m-auto  top-1/2 transform -translate-y-1/2 w-[30px] sm:w-[30px] xs:w-[10px] h-[35%] bg-black"
                              >
                                <ChevronRightIcon className="text-white " />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Left Button */}
                    </div>
                  </div>
                  <div className="social-cta text-center">
                    <a
                      target="_blank"
                      href={`${mediaUrls.instagram}`}
                      className="btn bundl-btn-border text-upper mt-5"
                    >
                      {lang === "ar"
                        ? "تابعنا على الانستاغرام"
                        : "Follow us on instagram"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container-fluid section fact-section">
            <div className="container">
              <h2 className="sub-head  text-upper">
                {lang === "ar" ? "حتى الآن، أكملنا" : "SO FAR WE’ve completed"}{" "}
              </h2>
              <h2 className="title">{bundlData.noOfProjects || 1}</h2>
              <h3 className="desc text-upper">
                {lang === "ar" ? "مشروعًا " : "projects for happy clients"}
              </h3>
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
                    <h2 className="sub-headeing text-black text-center">
                      {lang === "ar" ? "رسائل حب" : "love letters"}{" "}
                    </h2>
                    <p className="f-20 text-center">
                      {lang === "ar"
                        ? "نشتغل بكل شغف عشان نحوّل أحلام مشروعك إلى واقع جميل! اسمع رأي عملائنا عن تجاربهم معنا"
                        : "We work hard to bring your brand dreams to life. But don’t take only our word for it! Listen to what our clients have to say about us."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="testimonial-container">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="testimonial-inner">
                      <div className="testimonial_content">
                        {lang === "ar"
                          ? ""
                          : "Commitment, variety, clarity, fast delivery of different options, accuracy and art is the least that can describe how good they are! Keep up the good work, and we would surely get back to you over and over again!"}
                      </div>
                      <div className="rating">
                        <img src={FiveStar} alt="" className="img-fluid"></img>
                      </div>
                      <div className="name">
                        {lang === "ar" ? "" : "SHAWERMAMA"}{" "}
                        <span className="company-name"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 mx-auto mt-5 text-center">
                {window.innerWidth <= 768 ? (
                  <a
                    target="_blank"
                    href="https://www.google.com/search?sca_esv=c4b1341a4b7b7a8e&rlz=1C1OPNX_enIN1088IN1088&sxsrf=AHTn8zpz8heeFIffXtZFmZcBKyfoZlggHQ:1738924330168&q=bundl+designs+reviews&uds=ABqPDvxhviXT310WMxRmyLGmEwIWGxD1D4UaNg1_5mWkuvL-XEHlBMW0Wi5hXsAWml52GBwP0MgahtCC7xIzOfccgCir8jqEM-EUFl8W5TAQZtW1RiBwrQ6eg9Lumr7a35DA3UW1etJjqySLvsDCAu3swGovni-vtvN9dTjA83v60KOxD9627yKA06c5tUy_FosedF9vWioHYMgsreRYsFewxUb2IPmni2ayZr3gorMNTpcZLIypv5tgzZ33pY3Lm3ZXqLhrBu3CF3C_WNhYjJxca9Q4uc_9kNdOSyf491fLCyNbqThFA6O36UEEQF7vrZUZMHWOAEK22_BQhgx5UwnwyKbCztDiilDDN19JaVdNbCZFQpujpiDNHeroUq9oC1G2YdfLrj9V3eKSJf-u1ebBOTQNfuP-WhDcJVPho7PYBp2cmQ0VmhQ&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzfMxsPAhwiZEXurMaV4FghdFjDxW8-kb_wAl5CzlJ4LuB7A7CZCUrHH6TRDNxXAqy2BU86fOeAnWG4ddtnuW93JPkFUY&sa=X&ved=2ahUKEwiZtPb3rbGLAxX_4zgGHfRGAacQk8gLegQIKBAB&ictx=1&biw=393&bih=736&dpr=2.75#ebo=3"
                    className="btn bundl-btn-border"
                  >
                    {lang === "ar" ? "اترك تقييمك" : "Leave a review"}
                  </a>
                ) : (
                  <a
                    target="_blank"
                    href="https://www.google.com/search?q=bundldesigns&rlz=1C1OPNX_enIN1088IN1088&oq=bundldesigns&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIICAQQRRgnGDsyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODA5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3e2efdec17da19b7:0xb10d764716306f04,3,,,,"
                    className="btn bundl-btn-border"
                  >
                    {lang === "ar" ? "اترك تقييمك" : "Leave a review"}
                  </a>
                )}
                {/* <a target='_blank' href="https://www.google.com/search?q=bundldesigns&rlz=1C1OPNX_enIN1088IN1088&oq=bundldesigns&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIICAQQRRgnGDsyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODA5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3e2efdec17da19b7:0xb10d764716306f04,3,,,," className="btn bundl-btn-border">Leave a review</a> */}
              </div>
            </div>
          </section>

          <div className="bundledivider"></div>
          <section className="container-fluid section">
            <div className="container">
              <div className="quetions-container">
                <h2 className="sub-headeing text-upper text-black text-center mb-3">
                  {lang === "ar"
                    ? "عندك فكرة أو سؤال"
                    : "HAVE A QUESTION OR IDEA ?"}
                </h2>
                {/* <h4 className="h3 text-upper !text-black text-center mb-4">{lang === 'ar' ?'تواصل معنا':'let’s discuss'}</h4> */}
              </div>
              <div className="flex justify-center mx-auto">
                <a href="/contact-us" className="btn bundl-btn-border">
                  {lang === "ar" ? "تواصل معنا" : "Contact us"}
                </a>
              </div>
              {/* <div className="social-link  align-items-center">
                                    <ul className="d-flex justify-content-center">
                                        <li className="social-item"><a href={`${mediaUrls.linked_in}`} target='_blank'><img src={Linkedin} alt="" className="img-fluid social-icon"></img></a></li>
                                        <li className="social-item"><a href={`${mediaUrls.instagram}`} target='_blank'><img src={Instagram} alt="" className="img-fluid social-icon"></img></a></li>
                                        <li className="social-item"><a href={`${'https://www.tiktok.com/@bundl_designs'}`} target='_blank'><img src={Tiktokpng} alt="" className="img-fluid social-icon"></img></a></li>
                                        <li className="social-item"><a href={`${'https://id.pinterest.com/BundlDesigns/'}`} target='_blank'><img src={Pinterestpng} alt="" className="img-fluid social-icon"></img></a></li>
                                    </ul>
                                </div> */}
            </div>
          </section>

          <Footer isLang={lang} />
        </div>
      )}
    </>
  );
};