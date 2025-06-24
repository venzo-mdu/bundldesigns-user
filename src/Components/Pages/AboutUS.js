import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import aboutUs from '../../json/aboutUs.json'
// import cloud_bg from '../../Images/bg-cloud.png'
import cloud_bg from '../../Images/imageoptimize/bg-cloud.png'
import cloud_bg_arabic from '../../Images/imageoptimize/bg-cloud-arabic.webp'
import gray_bg from '../../Images/Background/grey_cloud.svg'
import loaderSticker from '../../Images/load sticker.svg'
import paperPlane from '../../Images/Background/paper plane.svg'
import glass from '../../Images/Background/glass.svg'
import paper_plane_rose from '../../Images/paperPlaneRose.svg'
import letterIcon from '../../Images/letterIcon.svg'
import blueSticker from '../../Images/Sticker_blue.svg'
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import axios from 'axios'
import packagingGIF from '../../Images/aboutus/packaging.gif'
import identityGIF from '../../Images/aboutus/Identity.gif'
import websiteGIF from '../../Images/aboutus/website.gif'
import socialMediaGIF from '../../Images/aboutus/socialMedia.gif'
import identityImg from '../../Images/aboutus/Identity.svg'
import ClearIcon from '@mui/icons-material/Clear';
import { Bgloader } from '../Common/Background/Bgloader'
import workOurGIF from '../../Images/ourWorkGIF.gif'
import workBrandGIF from '../../Images/ourWorkBranding.gif'

export const AboutUs = ({ lang, setLang }) => {
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState([])
  const [whatwedo, setWhatwedo] = useState(null)
  const [isHovered, setIsHovered] = useState('');
  const [WWDImg, setWWDImg] = useState(null)
  const base_url = process.env.REACT_APP_BACKEND_URL
  const getTestimonials = async () => {
    const response = await axios.get(`${base_url}/api/content?section=testimonials`);
    if (response.data) {
      setTestimonials(response.data);
    }
    setLoading(false)
  }
  useEffect(() => {
    getTestimonials()
  }, [])

  useEffect(() => {
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    if (document.body.dir !== direction) {
      document.body.dir = direction;
    }
  }, [lang]);


  return (
    <>
      {
        loading ?
          <Bgloader /> :
          <>
            <div id='AboutusContainer' className={`bg-cover  md:bg-[100%_7%] lg:bg-[100%_7%] xs:[120%_10%] font-Helvetica`}
              style={{
                backgroundImage: `url(${lang=== 'ar' ?cloud_bg_arabic:cloud_bg})`,
              }}
              >
              <Navbar isLang={lang} setIsLang={setLang} />

              <div className='xl:h-[56vh]  lg:h-[60vh] md:h-[58vh] xs:h-[280px] relative'>
                <h1 className='font-Helvetica !text-black md:w-[60vw] lg:text-[36px] xs:text-[22px] sm:text-[22px] sm:w-[70vw] xs:w-[100vw] md:text-[34px] xl:w-[50vw] xl:text-[42px] lg:mx-auto md:mx-auto  xs:mx-0 py-[8%] lg:py-[6%] md:py-[2%] my-[2%] text-center'>{lang === 'ar' ? aboutUs.main_content_arabic : aboutUs.main_content} </h1>
                <img className={`animate-rotate-animation absolute   ${lang === 'ar' ?'xl:top-[65%] xs:mr-[36vw] lg:mr-[25vw] md:mr-[25vw] xl:mr-[26vw]':' xl:top-[70%] xs:ml-[36vw] lg:ml-[25vw] md:ml-[25vw] xl:ml-[26vw]'} md:top-[60%] lg:top-[50%] `} width='100px' height='100px' src={loaderSticker}></img>
              </div >


              <div className='flex md:flex sm:block xs:block justify-between text-center '>
                <div className='basis-[50%] border-t border-r border-l relative py-4 !border-black'>
                  <h1 className='px-28 text-[32px] !text-black sm:text-[22px] xs:text-[22px]   md:text-[26px] uppercase'>{lang === 'ar' ? 'مهمتنا' : 'Mission'}</h1>
                  <p className='xl:px-48 md:px-20 xl:text-[18px] md:text-[18px] xs:text-[16px] xs:px-[5%]'>{lang === 'ar' ? aboutUs?.mission_arabic : aboutUs.mission}</p>
                  <img className={`absolute lg:top-[130px]  top-[130px]  xs:top-[-50px] xs:w-[100px] ${lang === 'ar' ? 'right-0 scale-x-[-1] xl:top-[10px] md:top-[75px]':'left-0 md:top-[130px]'} xl:top-[70px] xl:w-[260px] md:w-[160px]`} src={paperPlane}></img>

                </div>
                <div className='!z-10 basis-[50%] border-t border-r xs:border-l md:border-l-0  py-4   relative !border-black font-Helvetica'>

                  <h1 className='px-[8%]  text-[32px] !text-black sm:text-[22px] xs:text-[22px]   md:text-[26px] uppercase'>{lang === 'ar' ? 'رؤيتنا' : 'Vision'}</h1>
                  <p className=' xl:px-[200px] md:px-20 md:text-[18px] xl:text-[18px] xs:text[16px] xs:px-[5%] xs:text-[16px]'>{lang === 'ar' ? aboutUs?.vission_arabic : aboutUs.vission}</p>
                  <img className={`absolute  xs:w-[100px] xl:bottom-[-25px]  ${lang === 'ar' ?'left-[-45px] rotate-[90deg] lg:top-[-165px] md:top-[-105px] top-[-95px] xs:top-[-60px]':'right-[10px] md:top-[-95px] top-[-95px] xs:top-[-60px]'} xl:w-[240px] md:w-[160px]`} src={glass}></img>

                </div>

              </div>

            </div>

            <div className="bg-cover bg-no-repeat border-b border-black"
              style={{
                // backgroundImage: `linear-gradient(to bottom,#e9eaec, #d8d6d7), url(${gray_bg})`,
                background: `url(${gray_bg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay', // Optional: blends the gradient and image
              }}

            // style={{
            //   backgroundImage: `linear-gradient(to bottom,#e9eaec, #d8d6d7), url(${gray_bg})`,
            //   backgroundPosition: 'center',
            //   backgroundSize:'cover',
            //   backgroundBlendMode: 'overlay', // Optional: blends the gradient and image
            // }}
            >
              <div className='text-center border py-4 px-3 z-0 !border-black'>
                <h1 className='text-[32px] sm:text-[22px] xs:text-[22px]  md:text-[26px] text-black uppercase'>{lang === 'ar' ? 'قیمنا' : 'Our Values'}</h1>
                <p className='lg:text-[18px] sm:text-[20px] xs:text-[16px]  md:text-[18px] mt-[2%]'>{lang === 'ar' ? aboutUs?.our_values_arabic : aboutUs.our_values}</p>
              </div>
              <div className='text-center text-Helvetica md:pt-[5%] xs:pt-[5%]  lg:pt-[3%]'>
                <h2 className='pb-[2%] md:text-[26px] sm:text-[22px] xs:text-[22px] text-black uppercase'>{lang === 'ar' ? 'المؤسسون' : 'The Founders'} </h2>
                <p className='xl:w-[38vw] md:w-[57vw] xs:w-[100vw] lg:mx-auto md:mx-auto xs:mx-0 leading-[28px] lg:text-[18px] md:text-[18px]  xs:text-[16px] lg:py-0 lg:px-0 md:py-0 md:px-0 xs:py-[2%] xs:px-[5%]'> {lang === 'ar' ? aboutUs?.founders_arabic : aboutUs.founders} </p>
              </div>
              <div className='text-center text-Helvetica md:pt-[4%] lg:pt-[3%] pb-[4%]'>
                <h2 className='pb-[2%] md:text-[26px] sm:text-[22px] xs:text-[22px] text-black uppercase'>{lang === 'ar' ? 'مواهبنا' : 'Our Talents'} </h2>
                <p className='xl:w-[38vw] md:w-[56vw] xs:w-[100vw] lg:mx-auto md:mx-auto xs:mx-0 leading-[28px] lg:text-[18px] md:text-[18px] xs:text-[16px] lg:py-0 lg:px-0 md:py-0 md:px-0 xs:py-[2%] xs:px-[5%]'>{lang === 'ar' ? aboutUs?.our_talents_arabic : aboutUs.our_talents}</p>
              </div>
            </div>

            <div style={{ backgroundColor: whatwedo ? aboutUs[whatwedo].bgColor : 'inherit' }} className={`text-center relative border-black leading-[40px] border-b transition delay-150 duration-300 ease-in`}>
              <img className={`absolute md:top-[-72px] xl:top-[-100px] sm:w-[100px] xs:w-[80px] 
        xs:top-[-30px] z-10 sm:top-[-52px] lg:top-[-80px] md:w-[150px] xl:w-[200px] ${lang === 'ar' ? 'right-[12vw]' : 'left-[12vw]'} `}
                width='200px' height='140px' src={blueSticker} />
              {
                whatwedo ?
                  <>
                    <p className={`${lang === 'ar' ? 'text-left' : 'text-end'} sm:pr-10 pr-10 xs:pr-0 sm:mb-4 mb-4 xs:!mb-0 pb-0`}>
                      <ClearIcon onClick={() => {
                        setWhatwedo(null)
                        setWWDImg(null)
                        setIsHovered(null)
                      }}
                        className="mr-1  cursor-pointer !w-[50px] !h-[50px] text-white" />
                    </p>
                    <div className='sm:flex xs:block mb-2'>
                      <div className='basis-1/5'>
                        <img className='sm:min-w-[230px] min-w-[230px] mt-3 xs:mx-auto xs:w-[180px] xs:my-[-6%]' src={WWDImg}></img>
                      </div>
                      <div className='basis-3/5 mt-[2%] mb-[3%] text-center text-white'>
                        <h2 className='text-white sm:text-[30px] text-[32px] xs:text-[20px] '>{aboutUs[whatwedo].title}</h2>
                        <p className='sm:text-[18px] text-[20px] xs:text-[16px] px-2 mb-4'>{aboutUs[whatwedo].content}</p>
                        <p> <a href='/our-work' className={`text-[white] font-[500] sm:text-[18px] text-[20px] xs:text-[14px] hover:text-[white] px-[17px] py-[.5rem] !border-white border ${lang === 'ar' ? 'ml-4' : 'mr-4'} uppercase`}>{lang === 'ar' ? 'اطلع على أعمالنا' : 'View Our Work'}</a>
                          <a href='/' className={`bg-white text-[${aboutUs[whatwedo].bgColor}] font-[500] border hover:text-[${aboutUs[whatwedo].bgColor}] !border-white px-[17px] sm:text-[18px] text-[20px] xs:text-[14px] py-[.5rem] uppercase`}>{lang === 'ar' ? 'اطلب التصاميم الآن' : 'Purchase Now'}</a> </p>
                      </div>

                    </div>

                  </> :
                  <div className='flex overflow-hidden'>
                    <div className='basis-[35%] relative'>
                      <img
                        className={`w-[320px] absolute brandIdentity transition-all top-[10%] transform duration-700 ease-out 
                ${isHovered === 'socialMedia' || isHovered === 'socialMedia_arabic'
                            ? lang === 'ar'
                              ? 'right-[-140px] opacity-100 scale-x-[-1]'
                              : 'left-[-140px] opacity-100'
                            : lang === 'ar'
                              ? 'right-[-330px] opacity-0'
                              : 'left-[-330px] opacity-0'
                          }`}
                        src={socialMediaGIF}
                      />

                      <img
                        className={`w-[320px] absolute z-0 transition-all transform duration-700 ease-out 
              ${isHovered === 'packaging' || isHovered === 'packaging_arabic' ? 'bottom-[-50px] opacity-100' : 'bottom-[-330px] opacity-0'}`}
                        src={packagingGIF}
                      />

                      <img
                        className={`w-[320px] absolute z-0 left-[25%] transition-all transform duration-700 ease-out rotate-180 
              ${isHovered === 'websites' || isHovered === 'websites_arabic' ? 'top-[-10px] opacity-100' : 'top-[-330px] opacity-0'}`}
                        src={websiteGIF}
                      />

                      <img
                        className={`w-[400px] absolute z-0 transition-all transform duration-700 ease-out 
              ${isHovered === 'brandIdentity' || isHovered === 'brandIdentity_arabic' ? 'bottom-[-120px] opacity-100 rotate-[10deg]' : 'bottom-[-330px] opacity-0 rotate-[-15deg]'}`}
                        src={identityImg}
                      />

                    </div>
                    <div className={`sm:basis-[30%] basis-[30%]  !pb-8  lg:!pt-16 md:!pt-16 xs:pt-12 xs:basis-[100%]  ${whatwedo ? "xs:!pt-6" : "sm:!pt-16"}`}>
                      <h2 className=' mt-2 md:text-[30px] sm:text-[24px] xs:text-[24px]  font-bold pb-[30px] text-black uppercase'>{lang === 'ar' ? 'خدماتنا ' : 'What we do'}</h2>
                      <div className='flex mb-2 flex-col'>
                        <p
                          onClick={() => {
                            setWhatwedo(lang !== 'ar' ? 'brandIdentity' : 'brandIdentity_arabic')
                            setWWDImg(identityImg)
                          }}
                          onMouseEnter={() => setIsHovered(lang !== 'ar' ? 'brandIdentity' : 'brandIdentity_arabic')}
                          onMouseLeave={() => setIsHovered(null)}
                          className={`cursor-pointer BIText ${isHovered ? 'no-underline' : 'underline'} hover:text-[#1BA56F]  md:text-[22px] sm:text-[22px] xs:text-[22px] font-bold`}>
                          {lang === 'ar' ? 'تصميم الهوية' : 'Brand Identity'}
                        </p>
                        <p
                          onClick={() => {
                            setWhatwedo(lang !== 'ar' ? 'packaging' : 'packaging_arabic')
                            setWWDImg(packagingGIF)
                          }}
                          onMouseEnter={() => setIsHovered(lang !== 'ar' ? 'packaging' : 'packaging_arabic')}
                          onMouseLeave={() => setIsHovered(null)}
                          className={`cursor-pointer ${isHovered ? 'no-underline' : 'underline'} hover:text-[#0BA6C4] md:text-[22px] sm:text-[22px] xs:text-[22px] font-bold`}>
                          {lang === 'ar' ? 'تصاميم المطبوعات' : 'Packaging'}
                        </p>
                        <p
                          onClick={() => {
                            setWhatwedo(lang === 'ar' ? 'socialMedia_arabic' : 'socialMedia')
                            setWWDImg(socialMediaGIF)
                          }}
                          onMouseEnter={() => setIsHovered(lang !== 'ar' ? 'socialMedia' : 'socialMedia_arabic')}
                          onMouseLeave={() => setIsHovered(null)}
                          className={`cursor-pointer ${isHovered ? 'no-underline' : 'underline'} hover:text-[#1BA56F]  md:text-[22px] sm:text-[22px] xs:text-[22px] font-bold`}>
                          {lang === 'ar' ? 'تصاميم حسابات السوشال ميديا' : 'Social Media Designs'}
                        </p>
                        <p
                          onClick={() => {
                            setWhatwedo(lang !== 'ar' ? 'websites' : 'websites_arabic')
                            setWWDImg(websiteGIF)
                          }}
                          onMouseEnter={() => setIsHovered(lang !== 'ar' ? 'websites' : 'websites_arabic')}
                          onMouseLeave={() => setIsHovered(null)}
                          className={`cursor-pointer ${isHovered ? 'no-underline' : 'underline'} hover:text-[#F3B7CE] md:text-[22px] sm:text-[22px] xs:text-[22px] font-bold`}>
                          {lang === 'ar' ? 'تطوير المتاجر الالكترونية' : 'Shopify Websites'}
                        </p>
                      </div>

                    </div>
                    <div className='basis-[35%] relative'>
                      <img
                        className={`w-[320px] absolute brandIdentity transition-all top-[10%] transform duration-700 ease-out 
                ${isHovered === 'socialMedia' || isHovered === 'socialMedia_arabic'
                            ? lang === 'ar'
                              ? 'left-[-100px] opacity-100 scale-x-[-1]'
                              : 'right-[-100px] opacity-100'
                            : lang === 'ar'
                              ? 'left-[-330px] opacity-0'
                              : 'right-[-330px] opacity-0'
                          }`}
                        src={socialMediaGIF}
                      />

                      <img
                        className={`w-[320px] absolute z-0 transition-all transform duration-700 ease-out rotate-180 
              ${isHovered === 'packaging' || isHovered === 'packaging_arabic' ? 'top-[-50px] opacity-100' : 'top-[-330px] opacity-0'}`}
                        src={packagingGIF}
                      />

                      <img
                        className={`w-[320px] absolute z-0 transition-all transform duration-700 ease-out 
              ${isHovered === 'websites' || isHovered === 'websites_arabic' ? 'bottom-[-10px] opacity-100' : 'bottom-[-330px] opacity-0'}`}
                        src={websiteGIF}
                      />

                      <img
                        className={`w-[400px] absolute z-0 transition-all transform duration-700 ease-out 
              ${isHovered === 'brandIdentity' || isHovered === 'brandIdentity_arabic' ? 'top-[-120px] opacity-100 rotate-[-30deg]' : 'top-[-330px] opacity-0 rotate-0'}`}
                        src={identityImg}
                      />
                    </div>

                  </div>
              }
            </div>



            <div className='text-center py-10 border-b border-black relative min-h-[60vh] '>
              <p className='text-center flex justify-center'>
                <img src={letterIcon}></img></p>

              <h2 className=' text-[28px] capitalize text-black' >{lang === 'ar' ? 'رسائل حب' : 'LOVE LETTERS'}  </h2>
              <p className='md:w-[29vw] xs:w-[70vw] mx-auto text-[16px]' >{lang === 'ar' ? 'نحن نعمل بجد لتحقيق أحلام علامتك التجارية في الحياة .لكن لا تأخذ كلمتنا فقط !استمع إلى ما يقوله عملاؤنا عنا' : 'We work hard to bring your brand dreams to life. But don’t take only our word for it! Listen to what our clients have to say about us.'} </p>
              <img className={`absolute md:block  md:top-12 ${lang === 'ar' ? 'md:right-[20vw] right-[24vw] xs:right-[-20px] ':'md:left-[20vw] left-[24vw] xs:left-[-20px] '} xs:top-[10vh] md:w-[140px] xs:w-[100px]`} width='140px' height='140px' style={lang === 'ar'?{transform: 'rotate(390deg) scaleX(-1)',}:{ transform: 'rotate(320deg)' }} src={paper_plane_rose}></img>
              <img className={`absolute md:block xs:!top-[50%] sm:top-0 top-0 ${lang === 'ar' ?'sm:right-0 right-0 xs:right-[-41px] scale-x-[-1]':'sm:left-0 left-0 xs:left-[-41px]'}  w-[320px] sm:w-[320px] xs:w-[150px] `} src={paper_plane_rose}></img>
              <img className={`absolute md:block top-16 sm:top-16 xs:top-0 w-[320px] sm:w-[320px] xs:w-[160px] ${lang === 'ar' ?'left-[16vw] sm:left-[16vw] xs:left-[-36px] md:left-10':'right-[16vw] sm:right-[16vw] xs:right-[-36px] md:right-10'}` } style={lang === 'ar'?{transform: 'rotate(390deg) scaleX(-1)',}:{ transform: 'rotate(320deg)' }} src={paper_plane_rose}></img>
              <div>
                <div className='text-[16px] md:w-[40vw] xs:w-[80vw] relative flex mx-auto'>
                  <p className='text-[90px] absolute lg:top-[-34px] md:top-[-34px] xs:top-[-55px] xs:left-[-20px] font-bold '>“</p>
                  <p className='lg:px-12 md:px-12 xs:px-[10%] pt-4 lg:text-[20px] md:text-[20px] xs:text-[16px] font-medium'>{lang === 'ar' ? 'لالتزام والتنوع والوضوح والتسليم السريع للخيارات المختلفة والدقة والفن ه   أقل ما يمكن أن يصف مدى جودتها  هل !استمروا في العمل الجيد ، وسنعود بالتأكيد إلى  أنت مرارا وتكرارا!' : testimonials.length ? testimonials[0].description_english : ''}</p>
                  <p className='text-[90px] right-0 absolute font-bold lg:bottom-[-60px] md:bottom-[-60px] xs:bottom-[-90px] xs:right-[-20px]'>”</p>
                </div>

                <div className='flex justify-center'>
                  <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars >= 1 ? '[#000]' : '[red]'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                      <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
                    </svg>
                  </div>
                  <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars >= 2 ? 'black' : 'grey'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                      <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
                    </svg>
                  </div>
                  <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars >= 3 ? 'black' : 'grey'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                      <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
                    </svg>
                  </div>
                  <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars >= 4 ? 'black' : 'grey'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                      <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
                    </svg>
                  </div>
                  <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars == 5 ? 'black' : 'grey'}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                      <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
                    </svg>
                  </div>
                </div>
                <div
                  id="description"
                  className="text-[16px] font-bold"
                  dangerouslySetInnerHTML={{ __html: testimonials.length ? testimonials[0].customer_english : '' }}
                />
                {/* <p className='text-[16px] font-bold'>{testimonials.length ? testimonials[0].customer_english : ''}</p> */}
              </div>

            </div>
            {/* <div className='text-center py-14 '>
              <h2 className='sm:w-[600px] w-[50vw] xs:w-[100vw] text-[32px] !mt-6 lg:mx-auto md:mx-auto xs:mx-0 lg:py-0 lg:px-0 md:py-0 md:px-0 xs:py-[2%] xs:px-[5%]  text-black'>{lang === 'ar' ? 'جاهز تبدأ رحلتك الابداعية معنا؟ ' : 'Inspired to start your journey to launch your next big thing ?'}</h2>
              <p className='text-center'> <button onClick={() => { window.location.href = '/' }} className='py-1 px-3  !mt-[50px] border-black border-[1px] !mb-8 bg-white hover:!bg-black text-black uppercase  hover:text-white'>{lang === 'ar' ? 'ابدأ مشروعك الآن' : 'Get started !'}</button> </p>
            </div> */}

            <div className='relative py-10 pb-0'>
              <img className={`absolute ${lang === 'ar' ? 'sm:right-12 right-12 xs:right-[-3rem]' : 'sm:left-12 left-12 xs:left-[-3rem]'} sm:w-[200px] w-[200px] xs:w-[125px]`} style={{ transform: 'rotate(350deg)' }} src={workOurGIF}></img>
              <div className='w-[48%] text-center mx-auto'>
                <p className='flex justify-center mb-0 mt-0'> <img className='animate-rotate-animation' width='150px' height='110px' src={workBrandGIF}></img></p>
              <h2 className='lg:text-[32px] md:text-[32px] xs:text-[24px] sm:text-[32px] !mt-6 lg:mx-auto md:mx-auto xs:mx-0 lg:py-0 lg:px-0 md:py-0 md:px-0 xs:py-[2%] xs:px-[5%]  text-black'>{lang === 'ar' ? 'جاهز تبدأ رحلتك الابداعية معنا؟ ' : 'Inspired to start your journey to launch your next big thing ?'}</h2>
                <p className='text-center'> <button onClick={() => { window.location.href = '/' }} className='py-1 px-3  !mt-[50px] border-black border-[1px] !mb-8 bg-white hover:!bg-black text-black uppercase  hover:text-white'>{lang === 'ar' ? 'ابدأ مشروعك الآن' : 'Get started !'}</button> </p>
              </div>
              <img width='300px' className={`absolute sm:w-[300px] w-[300px] xs:w-[150px] xs:top-[30%] sm:top-[14%] ${lang === 'ar' ? 'xs:left-[-14%]  sm:left-[3%] left-[3%]' : 'xs:right-[-14%]  sm:right-[3%] right-[3%]'} `} style={{ transform: 'rotate(320deg)' }} src={workOurGIF}></img>
            </div> 
            <Footer isLang={lang} />
          </>
      }

    </>
  )
}
