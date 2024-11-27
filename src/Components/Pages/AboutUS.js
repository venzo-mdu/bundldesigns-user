import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import aboutUs from '../../json/aboutUs.json'
import cloud_bg from '../../Images/Background/cloud-bg.svg'
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
import { Config } from '../Auth/ConfigToken'

export const AboutUs = () => {
  const [testimonials, setTestimonials] = useState([])
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
      <div style={{
        backgroundImage: `url(${cloud_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: '100% 6%',
      }} className='font-Helvetica'>
        < Navbar />

        <div className='xl:h-[56vh] lg:h-[56vh] md:h-[75vh] relative'>
          <h1 className='font-Helvetica md:w-[60vw] lg:text-[38px] md:text-[36px] xl:w-[50vw] xl:text-[45px] mx-auto py-[8%] my-[2%] text-center'>{aboutUs.main_content} </h1>
          <img className='animate-rotate-animation absolute xl:top-[73%]  lg:top-[57%] lg:ml-[25vw] md:ml-[25vw] md:top-[55%] xl:ml-[26vw]' width='100px' height='100px' src={loaderSticker}></img>
        </div >


        <div className='flex justify-between text-center '>
          <div className='basis-[50%] border-t border-r border-l relative py-4 !border-black'>
            <h1 className='px-28 text-[32px] md:text-[28px]'>Mission</h1>
            <p className='xl:px-48 md:px-20 xl:text-[20px] md:text-[18px]'>{aboutUs.mission}</p>
            <img className='absolute md:top-[150px] left-6 xl:top-[70px] xl:w-[260px] md:w-[160px]' src={paperPlane}></img>

          </div>
          <div className='!z-10 basis-[50%] border-t border-r  py-4   relative !border-black'>

            <h1 className='px-[8%] md:text-[28px] xl:text-[32px]'>Vision</h1>
            <p className=' xl:px-[200px] md:px-20 md:text-[18px] xl:text-[20px]'>{aboutUs.vission}</p>
            <img className='absolute md:bottom-[80px] xl:bottom-[-25px]  right-0 xl:w-[240px] md:w-[160px]' src={glass}></img>

          </div>

        </div>

      </div>

      <div className="bg-cover bg-no-repeat border-b border-black"
style={{
  // backgroundImage: `linear-gradient(to bottom,#e9eaec, #d8d6d7), url(${gray_bg})`,
  background:`url(${gray_bg})`,
  backgroundPosition: 'center',
  backgroundSize:'cover',
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
          <h1 className='text-[32px] md:text-[28px]'>Our Values</h1>
          <p className='text-[20px] md:text-[18px]'>{aboutUs.our_values}</p>
        </div>
        <div className='text-center text-Helvetica md:pt-[5%] lg:pt-[3%]'>
          <h2 className='pb-[2%] md:text-[28px]'> The Founders</h2>
          <p className='xl:w-[38vw] md:w-[57vw] md:text-[18px] mx-auto leading-[28px] text-[20px]'> {aboutUs.founders} </p>
        </div>
        <div className='text-center text-Helvetica md:pt-[4%] lg:pt-[3%] pb-[4%]'>
          <h2 className='pb-[2%] md:text-[28px]'> Our Talents</h2>
          <p className='xl:w-[38vw] md:w-[56vw] md:text-[18px] mx-auto leading-[28px] text-[20px]'>{aboutUs.our_talents}</p>
        </div>
      </div>

      <div className='text-center relative border-black leading-[40px] py-[3%] border-b'>
        <img className='absolute md:top-[-72px] lg:top-[-100px] xl:top-[-80px] lg:w-[150px] xl:w-[150px] left-[12vw] md:w-[150px] ' width='200px' height='140px' src={blueSticker} />
        <h2 className=' text-[32px] font-bold pb-[30px]'>What we do</h2>
        <p className='underline text-[24px] font-bold'>Brand Identity</p>
        <p className='underline text-[24px] font-bold'>Packaging</p>
        <p className='underline text-[24px] font-bold'>Social Media Designs</p>
        <p className='underline text-[24px] font-bold'>Shopify Websites</p>
      </div>

      <div className='text-center py-10 border-b border-black relative min-h-[60vh] '>
        <p className='text-center flex justify-center'>   
           <img src={letterIcon}></img></p>
    
        <h2 className=' text-[28px] capitalize ' > LOVE LETTERS </h2>
        <p className='w-[29vw] mx-auto text-[16px]' > We work hard to bring your brand dreams to life. But don’t take only our word for it! Listen to what our clients have to say about us.</p>
        <img className='absolute md:left-[20vw] top-12 left-[24vw]' width='140px' height='140px' style={{ transform: 'rotate(320deg)'}} src={paper_plane_rose}></img>
        <img className='absolute' width='320px' height='320px'  src={paper_plane_rose}></img>
        <img className='absolute top-16 right-[16vw] md:right-10' width='320px' height='320px' style={{ transform: 'rotate(320deg)'}}  src={paper_plane_rose}></img>

        <div>
          <div className='text-[16px] w-[40vw] relative flex mx-auto'> 
          <p className='text-[90px] absolute top-0 font-bold '>“</p> 
          <p className='px-12 pt-4 text-[20px] font-medium'>{testimonials.length ? testimonials[0].description_english : ''}</p>  
          <p className='text-[90px] right-0 absolute font-bold bottom-[-60px]'>”</p>
          </div>
         
        <div className='flex justify-center'>
          <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars >= 1? '[#000]':'[red]' }`}>
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
              <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
            </svg>
          </div>
          <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars >= 2? 'black':'grey' }`}>
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
              <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
            </svg>
          </div>
          <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars >= 3? 'black':'grey' }`}>
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
              <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
            </svg>
          </div>
          <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars >= 4? 'black':'grey' }`}>
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
              <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
            </svg>
          </div>
          <div class={`w-12 h-12 text-${testimonials.length && testimonials[0].stars == 5? 'black':'grey' }`}>
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
              <path d="M12 2.75c.3 0 .6.17.74.46l1.88 3.82 4.21.61c.33.05.6.28.7.6.1.32 0 .68-.25.9l-3.05 2.97.72 4.21c.06.33-.08.67-.34.87-.26.2-.62.23-.92.07L12 15.73l-3.78 1.99c-.3.16-.66.13-.92-.07a.752.752 0 0 1-.34-.87l.72-4.21-3.05-2.97c-.25-.22-.35-.58-.25-.9.1-.32.37-.55.7-.6l4.21-.61L11.26 3.2a.75.75 0 0 1 .74-.45z" />
            </svg>
          </div>
          </div>
        <p className='text-[16px] font-bold'>{testimonials.length ? testimonials[0].customer_english : ''}</p>
        </div>

      </div>
      <div className='text-center py-12 '>
      <h2 className='w-[35vw] text-[32px] mx-auto'>Inspired to start your journey to launch your next big thing ?</h2>
      <p className='text-center'> <button className='py-1 px-3  mt-4 bg-black text-white'>Get started!</button> </p>
      </div>

      <Footer />
    </>
  )
}
