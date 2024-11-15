import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Config } from '../Auth/ConfigToken'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import loaderSticker from '../../Images/Background/loadsticker.svg'
import paperPlane from '../../Images/paperPlaneRose.svg'
import paperplane from '../../Images/our-work.gif'
export default function OurWork() {

  const [projects, setProjects] = useState([])
  const [currentTab, setCurrentTab] = useState('All');
  const categories = ['All', 'Social Media', 'Packaging', 'Websites', 'Brand Identity']
  const base_url = process.env.REACT_APP_BACKEND_URL
  const getprojects = async () => {
    console.log(base_url)
    const response = await axios.get(`${base_url}/api/content?section=projects`);
    if (response.data) {
      console.log(response.data)
      setProjects(response.data);
    }
  }
  useEffect(() => {
    getprojects()
  }, [])


  return (
    <>
      <Navbar />
      <div className='font-Helvetica'>
        <div className='text-center py-2 border-b border-black'>
          <h1 className='text-[40px]'> Our Work </h1>
          <p className='text-[20px] text-[#00000080]'>Where we answer all your questions!</p>
        </div>
        <div className=' sm:p-3 border-b px-[3%] border-black'>
          <div className='flex py-4 justify-center'>
            {categories.map((category, index) => {
              return <button className={`px-[20px] ${currentTab == category ? 'text-white bg-[#1BA56F] ' : 'text-[#1BA56F] bg-white '}py-[5px] text-[20px] border-r border-t border-b
                           ${index == 0 && 'border-l'} ${index == categories.length && 'border-l-0 border-r'}
                   !border-[#1BA56F]`}
                onClick={() => setCurrentTab(category)}>{category}</button>
            })}
          </div>
          <div className='mt-8 text-[32px]'>
            {
              projects.map((project,index) => {
                if (project.category == currentTab || currentTab == 'All') {
                  return <div className={`flex w-full ${index+1 != projects.length && 'border-b'} mt-2 !border-black items-start mb-2 pb-4 p-2 px-4`}>

                    <div className='basis-1/2 w-full'>
                      <h2 className='text-[28px]'> {project.name_english} </h2>
                      <div className='mb-2'> <button className={`px-[20px] text-[18px] text-white bg-[#1BA56F] py-[5px]             
                   !border-[#1BA56F]`}
                      >{project.category}</button> </div>
                      <div id="description"
                        className=" text-gray-700 w-[70%]"
                        dangerouslySetInnerHTML={{ __html: project.description_english }}
                      />
                      <button className='lg:w-[80%] xl:w-[60%] text-[20px] px-1  bg-black py-1 text-white'>Follow Our Instagram</button>
                    </div>
                    <div className='flex flex-wrap basis-1/2 w-full'>
                      {project.project_images.map(img => <img className='width-[30%]' width='200px' src={img}></img>)}
                    </div>


                  </div>
                }
              })
            }
          </div>
        </div>
        <div className='relative py-10'>
          <img className='absolute left-12' width='160px' style={{ transform: 'rotate(0deg)'}}  src={paperPlane}></img>
          <div className='w-[45%] text-center mx-auto'>
          <p className='flex justify-center'> <img  className='animate-rotate-animation' width='110px' height='110px' src={loaderSticker}></img></p>
          <h2>Inspired to start your journey to launch your next big thing ?</h2>
          <p> <button className='bg-[#000] mt-4 text-[20px] text-white py-[5px] px-[18px]'>Get started!</button> </p>
          </div>
  <img width='210px' className='absolute top-[8%] right-[8%]' style={{ transform: 'rotate(320deg)'}}  src={paperPlane}></img>
        </div> 
      </div>
      <Footer />
    </>

  )

}

