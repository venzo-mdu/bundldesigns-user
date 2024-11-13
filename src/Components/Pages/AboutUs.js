import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import aboutUs from '../../json/aboutUs.json'
import { Footer } from '../Common/Footer/Footer'
import cloud_bg from '../../Images/Background/cloud-bg.svg'
import gray_bg from '../../Images/Background/grey cloud.svg'
import loaderSticker from '../../Images/Background/loadsticker.svg'
import paperPlane from '../../Images/Background/paper plane.svg'
import glass from '../../Images/Background/glass.svg'

import { Navbar } from '../Common/Navbar/Navbar'

export const AboutUs = () => {
  const [testimonials,setTestimonials] = useState([])

  const getTestimonials =() =>{

  }
  
  useEffect(()=>{

  },[])

  console.log(aboutUs)
    return (
      <>
    <div  style={{
      backgroundImage: `url(${cloud_bg})`,
    backgroundSize: 'cover',
    backgroundPosition: '100% 9%',
  }} className='font-Helvetica'>
        < Navbar />

    <div className='h-[50vh]'>
  <h1 className='font-Helvetica w-[70vw] mx-auto my-[80px] text-center'>{aboutUs.main_content} </h1> 
<img  className='animate-rotate-animation ml-[25vw]' width='100px' height='100px' src={loaderSticker}></img>
    </div >


    <div className='flex justify-between text-center '>
      <div className='basis-[50%] border-t border-r border-l relative  py-4 px-28  !border-black'>
        <h1 className='text-[32px]'>Mission</h1>
        <p className='text-[20px]'>{aboutUs.mission}</p>
        <img className='absolute' src={paperPlane}></img>

      </div>
      <div className='basis-[50%] border-t border-r  py-4 px-[8%]  relative !border-black'>
      <img className='absolute bottom-[15px] right-[0%]' src={glass}></img>

      <h1 className='text-[32px]'>Vision</h1>
      <p className='text-[20px]'>{aboutUs.vission}</p>
        </div>
      
    </div>
    <div className='text-center border py-4 px-3 !border-black'>
  <h1 className='text-[32px]'>Our Values</h1>
  <p className='text-[20px]'>{aboutUs.our_values}</p>
    </div>
        </div>

        <div>
          
          </div>



          <div>
          
          </div>
          <div>
          
          </div>
          <div>
          
          </div>
        <Footer />
      </>
    )
}

