import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import aboutUs from '../../json/aboutUs.json'
import cloud_bg from '../../Images/bg-cloud.png'
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


export const AboutUs = () => {
  const [testimonials, setTestimonials] = useState([])
  const [whatwedo, setWhatwedo] = useState(null)
  const [isHovered, setIsHovered] = useState('');
  const [WWDImg, setWWDImg] = useState(null)
  const base_url = process.env.REACT_APP_BACKEND_URL
  const getTestimonials = async () => {
    console.log(base_url)
    const response = await axios.get(`${base_url}/api/content?section=testimonials`);
    if (response.data) {
      setTestimonials(response.data);
    }
  }
  useEffect(() => {
    getTestimonials()
  }, [])


  console.log(aboutUs)
  return (
    <>
      <div className={`bg-cover  md:bg-[100%_7%] lg:bg-[100%_7%] xs:[120%_10%] font-Helvetica`}
        style={{
          backgroundImage: `url(${cloud_bg})`,
        }}>
        < Navbar />

        <div className='xl:h-[56vh]  lg:h-[60vh] md:h-[58vh] xs:h-[40vh] relative'>
          <h1 className='font-Helvetica md:w-[60vw] lg:text-[38px] xs:text-[22px] sm:text-[22px] sm:w-[70vw] xs:w-[70vw] md:text-[36px] xl:w-[50vw] xl:text-[45px] mx-auto py-[8%] lg:py-[6%] md:py-[2%] my-[2%] text-center'>{aboutUs.main_content} </h1>
          <img className='animate-rotate-animation absolute  xl:top-[75%] lg:ml-[25vw] md:ml-[25vw] md:top-[60%] xl:ml-[26vw]' width='100px' height='100px' src={loaderSticker}></img>
        </div >


        <div className='flex md:flex sm:block xs:block justify-between text-center '>
          <div className='basis-[50%] border-t border-r border-l relative py-4 !border-black'>
            <h1 className='px-28 text-[32px] sm:text-[22px] xs:text-[22px]   md:text-[28px]'>Mission</h1>
            <p className='xl:px-48 md:px-20 xl:text-[20px] md:text-[18px]'>{aboutUs.mission}</p>
            <img className='absolute md:top-[130px] xs:w-[100px] left-0 xl:top-[70px] xl:w-[260px] md:w-[160px]' src={paperPlane}></img>

          </div>
          <div className='!z-10 basis-[50%] border-t border-r  py-4   relative !border-black'>

            <h1 className='px-[8%] md:text-[28px] xl:text-[32px]'>Vision</h1>
            <p className=' xl:px-[200px] md:px-20 md:text-[18px] xl:text-[20px]'>{aboutUs.vission}</p>
            <img className='absolute md:bottom-[50px] xs:w-[100px] xl:bottom-[-25px]  right-[10px] xl:w-[240px] md:w-[160px]' src={glass}></img>

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
          <h1 className='text-[32px] sm:text-[22px] xs:text-[22px]  md:text-[28px]'>Our Values</h1>
          <p className='text-[20px] sm:text-[20px] xs:text-[20px]  md:text-[20px]'>{aboutUs.our_values}</p>
        </div>
        <div className='text-center text-Helvetica md:pt-[5%] lg:pt-[3%]'>
          <h2 className='pb-[2%] md:text-[28px] sm:text-[22px] xs:text-[22px] '> The Founders</h2>
          <p className='xl:w-[38vw] md:w-[57vw] md:text-[20px] mx-auto leading-[28px] text-[20px]'> {aboutUs.founders} </p>
        </div>
        <div className='text-center text-Helvetica md:pt-[4%] lg:pt-[3%] pb-[4%]'>
          <h2 className='pb-[2%] md:text-[28px] sm:text-[22px] xs:text-[22px] '> Our Talents</h2>
          <p className='xl:w-[38vw] md:w-[56vw] md:text-[20px] mx-auto leading-[28px] text-[20px]'>{aboutUs.our_talents}</p>
        </div>
      </div>

      <div style={{ backgroundColor: whatwedo ? aboutUs[whatwedo].bgColor : 'inherit' }} className={`text-center py-1 relative border-black leading-[40px] border-b`}>
        <img className='absolute md:top-[-72px] xl:top-[-100px] sm:w-[100px] xs:w-[100px] 
        xs:top-[-30px] sm:top-[-52px] lg:top-[-80px] md:w-[150px] xl:w-[200px] left-[12vw] '
          width='200px' height='140px' src={blueSticker} />
        {
          whatwedo ?
            <>
              <p className='text-end pr-10 pb-0'>                 
                <ClearIcon onClick={() => {
                setWhatwedo(null)
                setWWDImg(null)
              }}
                className="mr-1  cursor-pointer !w-[50px] !h-[50px] text-white" />
              </p>
              <div className='flex mb-2'>
                <div className='basis-1/5'>
                  <img className='min-w-[230px]' src={WWDImg}></img>
                </div>
                <div className='basis-3/5 text-center text-white'>
                  <h2 className='text-white text-[32px]'>{aboutUs[whatwedo].title}</h2>
                  <p className='text-[20px] px-2 mb-4'>{aboutUs[whatwedo].content}</p>
                  <p> <a href='/our-work' className='text-[white] font-[500] text-[20px] px-[17px] py-1 !border-white border mr-2'>View Our Work</a>
                    <a href='/' className={`bg-white text-[${aboutUs[whatwedo].bgColor}] font-[500] border !border-white px-[17px] text-[20px] py-1 `}>Purchase Now</a> </p>
                </div>

              </div>

            </> :
            <div className='flex'>
              <div className='basis-[35%] relative'>
              <img className={`w-[320px] absolute brandIdentity transition-transform duration-700 ease-out ${isHovered ? 'left-[-140px]' : 'left-[-330px]'}`}  src={socialMediaGIF}></img>
              </div>
              <div className='basis-[30%] '>
                <h2 className=' mt-2 md:text-[32px] sm:text-[24px] xs:text-[24px]  font-bold pb-[30px]'>What we do</h2>
                <div className='flex mb-2 flex-col'>
                  <p
                    onClick={() => {
                      setWhatwedo('brandIdentity')
                      setWWDImg(identityImg)
                    }}
                    onMouseEnter={() => setIsHovered(identityImg)}
                    onMouseLeave={() => setIsHovered(null)}
                    className={`cursor-pointer BIText ${isHovered ? 'no-underline' : 'underline'} hover:text-[#1BA56F]  md:text-[24px] sm:text-[22px] xs:text-[22px] font-bold`}>
                    Brand Identity
                  </p>
                  <p
                    onClick={() => {
                      setWhatwedo('packaging')
                      setWWDImg(packagingGIF)
                    }}
                    onMouseEnter={() => setIsHovered(packagingGIF)}
                    onMouseLeave={() => setIsHovered(null)}
                    className={`cursor-pointer ${isHovered ? 'no-underline' : 'underline'} hover:text-[#0BA6C4] md:text-[24px] sm:text-[22px] xs:text-[22px] font-bold`}>
                    Packaging
                  </p>
                  <p
                    onClick={() => {
                      setWhatwedo('socialMedia')
                      setWWDImg(socialMediaGIF)
                    }}
                    onMouseEnter={() => setIsHovered(socialMediaGIF)}
                    onMouseLeave={() => setIsHovered(null)}
                    className={`cursor-pointer ${isHovered ? 'no-underline' : 'underline'} hover:text-[#1BA56F]  md:text-[24px] sm:text-[22px] xs:text-[22px] font-bold`}>
                    Social Media Designs
                  </p>
                  <p
                    onClick={() => {
                      setWhatwedo('websites')
                      setWWDImg(websiteGIF)
                    }}
                    onMouseEnter={() => setIsHovered(websiteGIF)}
                    onMouseLeave={() => setIsHovered(null)}
                    className={`cursor-pointer ${isHovered ? 'no-underline' : 'underline'} hover:text-[#F3B7CE] md:text-[24px] sm:text-[22px] xs:text-[22px] font-bold`}>
                    Shopify Websites
                  </p>
                </div>

              </div>
              <div className='basis-[35%] relative'>
              {isHovered && <img className='w-[320px] absolute' src={isHovered}></img>}
              </div>

            </div>
        }
      </div>



      <div className='text-center py-10 border-b border-black relative min-h-[60vh] '>
        <p className='text-center flex justify-center'>
          <img src={letterIcon}></img></p>

        <h2 className=' text-[28px] capitalize ' > LOVE LETTERS </h2>
        <p className='md:w-[29vw] xs:w-[70vw] mx-auto text-[16px]' > We work hard to bring your brand dreams to life. But don’t take only our word for it! Listen to what our clients have to say about us.</p>
        <img className='absolute md:block md:left-[20vw] md:top-12 left-[24vw] xs:left-[0vw] xs:hidden md:w-[140px] xs:w-[80px]' width='140px' height='140px' style={{ transform: 'rotate(320deg)' }} src={paper_plane_rose}></img>
        <img className='absolute md:block xs:hidden' width='320px' height='320px' src={paper_plane_rose}></img>
        <img className='absolute md:block top-16 xs:hidden right-[16vw] md:right-10' width='320px' height='320px' style={{ transform: 'rotate(320deg)' }} src={paper_plane_rose}></img>

        <div>
          <div className='text-[16px] md:w-[40vw] xs:w-[80vw] relative flex mx-auto'>
            <p className='text-[90px] absolute top-[-34px] font-bold '>“</p>
            <p className='px-12 pt-4 text-[20px] font-medium'>{testimonials.length ? testimonials[0].description_english : ''}</p>
            <p className='text-[90px] right-0 absolute font-bold bottom-[-60px]'>”</p>
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
      <div className='text-center py-14 '>
        <h2 className='w-[50vw] xs:w-[70vw] text-[32px] mx-auto'>Inspired to start your journey to launch your next big thing ?</h2>
        <p className='text-center'> <button onClick={() => { window.location.href = '/' }} className='py-1 px-3  mt-8 bg-black text-white'>Get started!</button> </p>
      </div>
      <Footer />
    </>
  )
}
