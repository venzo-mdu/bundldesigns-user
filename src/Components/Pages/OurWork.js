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
  const [currentTab, setCurrentTab] = useState('all');
  const categories = {
    all: 'All',
    social_media:'Social Media',
    packaging :'Packaging',
    websites :'Websites',
    brand_identity:'Brand Identity'
  }
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
            {Object.keys(categories).map((key, index) => {
              return <button key={key} className={`px-[20px] ${currentTab == key ? 'text-white bg-[#1BA56F] ' : 'text-[#1BA56F] bg-white '}py-[5px] text-[20px] border-r border-t border-b
                           ${index == 0 && 'border-l'} ${index == categories.length && 'border-l-0 border-r'}
                   !border-[#1BA56F]`}
                onClick={() => setCurrentTab(key)}>{categories[key]}</button>
            })}
          </div>
          <div className='mt-8 text-[32px]'>
          {projects
  .filter(
    (project) => project.category === currentTab || currentTab === 'all'
  )
  .map((project, index,filteredProjects) => (
    <div
      key={index}
      className={`flex flex-col sm:flex-row w-full ${
        index !== filteredProjects.length - 1 ? 'border-b' : ''
      } mt-2 !border-black items-start mb-2 pb-4 p-2 px-4`}
    >
      {/* Left Column */}
      <div className="w-full sm:basis-1/2">
        <h2 className="text-[28px]">{project.name_english}</h2>
        <div className="mb-2">
          <button
            className="px-[20px] text-[18px] text-white bg-[#1BA56F] py-[5px]"
          >
            {categories[project.category]}
          </button>
        </div>
        <div
          id="description"
          className="text-gray-700 w-full"
          dangerouslySetInnerHTML={{ __html: project.description_english }}
        />
        <button className="w-full sm:w-[80%] lg:w-[70%] text-[20px] px-1 bg-black py-1 text-white mt-2">
          Follow Our Instagram
        </button>
      </div>

      {/* Right Column */}
      <div className="grid grid-cols-3  mt-4 w-full">
      {project.project_images.map((img, imgIndex) => (
        <div key={imgIndex} className="w-full">
        <img
          className="w-full h-[150px] object-cover"       
            src={img}
            alt={`Project ${index} Image ${imgIndex}`}
          />
        </div>
        ))}
      </div>
    </div>
  ))}
          </div>
        </div>
        <div className='relative py-10'>
          <img className='absolute left-12' width='160px' style={{ transform: 'rotate(0deg)'}}  src={paperPlane}></img>
          <div className='w-[90%] sm:w-[45%] text-center mx-auto'>
          <p className='flex justify-center mb-1'> <img  className='animate-rotate-animation' width='200px' height='200px' src={loaderSticker}></img></p>
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

