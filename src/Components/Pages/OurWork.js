import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { base_url } from '../Auth/BackendAPIUrl';
import { Footer } from '../Common/Footer/Footer'
import { Navbar } from '../Common/Navbar/Navbar'
import loaderSticker from '../../Images/Background/loadsticker.svg'
import paperPlane from '../../Images/paperPlaneRose.svg'
import paperplane from '../../Images/our-work.gif'
import { Bgloader } from '../Common/Background/Bgloader';
import workOurGIF from '../../Images/ourWorkGIF.gif'
import workBrandGIF from '../../Images/ourWorkBranding.gif'

export default function OurWork() {
  const [loading,setLoading] = useState(true)
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
    setLoading(true)
    const response = await axios.get(`${base_url}/api/content?section=projects`);
    if (response.data) {
      console.log(response.data)
      setProjects(response.data);
    }
    setLoading(false)
  }
  useEffect(() => {
    getprojects()
  }, [])


  return (
    loading ? 
    <Bgloader /> :
    <>
      <Navbar />
      <div className='font-Helvetica'>
        <div className='text-center py-2 border-b border-black'>
          <h1 className='lg:text-[40px] md:text-[40px] xs:text-[30px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%]'> Our Work </h1>
          <p className='text-[20px] text-[#00000080]'>Where we answer all your questions!</p>
        </div>
        <div className=' sm:p-3 border-b px-[3%] border-black'>
          <div className='flex py-4 justify-center sm:w-[80%] xs:w-[100%] mx-auto'>
            {Object.keys(categories).map((key, index) => {
              return <button className={`basis-1/5 ${currentTab == key ? 'text-white bg-[#1BA56F] ' : 'text-[#1BA56F] bg-white '} py-[5px] font-[500] sm:text-[20px] xs:text-[14px] border-r border-t border-b
                           ${index == 0 && 'border-l'} ${index == categories.length && 'border-l-0 border-r'}
                   !border-[#1BA56F]`}
                onClick={() => setCurrentTab(key)}>{categories[key]}</button>
            })}
          </div>
          <div className='lg:mt-8 md:mt-8 xs:mt-0 text-[32px]'>
          {projects
  .filter(
    (project) => project.category === currentTab || currentTab === 'all'
  )
  .map((project, index,filteredProjects) => (
    <div
      key={index}
      className={`sm:flex flex items-center xs:block x w-full ${
        index !== filteredProjects.length - 1 ? 'border-b' : ''
      } mt-2 !border-black items-start mb-2 pb-4 p-2 px-4`}
    >
      {/* Left Column */}
      <div className="basis-1/2 sm:ml-[22px] ml-[22px] xs:ml-[0px] w-full">
        <h2 className="text-[28px]">{project.name_english}</h2>
        <div className="mb-2">
          <button
            className="px-[20px] text-[18px] text-white bg-[#1BA56F] py-[5px] !border-[#1BA56F]"
          >
            {categories[project.category]}
          </button>
        </div>
        <div
          id="description"
          className="!text-[#00000080] lg:w-[70%] md:w-[70%] xs:w-[100%] text-[16px]"
          dangerouslySetInnerHTML={{ __html: project.description_english }}
        />
        <a  target='_blank' href={`${project.instagram? project.instagram:'https://www.instagram.com/bundl_designs'}`} className="lg:w-[70%] xl:w-[60%] md:w-[80%] text-[16px] px-2 block text-center mt-4 bg-black py-2 text-white">
          Follow Our Instagram
        </a>
      </div>

      {/* Right Column */}
      <div className="flex flex-wrap basis-1/2 xs:mt-6 w-full">
        {project.project_images.map((img, imgIndex) => (
          <img
            key={imgIndex}
            className="sm:w-[32%] w-[32%] xs:w-[50%]"
            width="200px"
            src={img}
            alt={`Project ${index} Image ${imgIndex}`}
          />
        ))}
      </div>
    </div>
  ))}
          </div>
        </div>
        <div className='relative py-10 pb-24'>
          <img className='absolute sm:left-12 left-12 xs:left-[-3rem] sm:w-[200px] w-[200px] xs:w-[125px]' style={{ transform: 'rotate(350deg)'}}  src={workOurGIF}></img>
          <div className='w-[48%] text-center mx-auto'>
          <p className='flex justify-center mb-0 mt-0'> <img  className='animate-rotate-animation' width='150px' height='110px' src={workBrandGIF}></img></p>
          <h2 className='text-[40px] xs:text-[24px] sm:text-[40px]'>Inspired to start your journey to launch your next big thing ?</h2>
          <p> <button onClick={()=>{window.location.href='/'}} className='bg-[#000] mt-4 text-[20px] text-white py-[5px] px-[18px]'>Get started!</button> </p>
          </div>
          <img width='300px' className='absolute sm:w-[300px] w-[300px] xs:w-[150px] xs:top-[30%] xs:right-[-14%] sm:top-[14%] sm:right-[3%] right-[3%]' style={{ transform: 'rotate(320deg)'}}  src={workOurGIF}></img>
        </div> 
      </div>
      <Footer />
    </>

  )

}

