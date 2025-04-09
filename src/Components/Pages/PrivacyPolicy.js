import React from 'react'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import PrivacyPolicyJson from '../../json/privacyPolicy.json'

const PrivacyPolicy = ({lang,setLang}) => {

  return (
    <div>
      <Navbar isLang={lang} setIsLang={setLang}/>
      <div className='font-Helvetica'>
        <div className='text-center py-2 border-b border-black'>
          <h1 className='lg:text-[40px] md:text-[40px] xs:text-[30px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase'>{lang === 'ar' ? '' : ' Privacy Policy'} </h1>
        </div>
        <div className='lg:my-[3%] md:my-[5%] xs:my-[5%] lg:p-0 md:p-0 xs:p-[1%_5%]'>
        <div className='flex items-center justify-center mx-auto'>
          <p className='lg:text-[18px] md:text-[18px] xs:text-[14px] font-[400] lg:w-[85%] md:w-[90%]'>{PrivacyPolicyJson?.privacy_desc}</p>
        </div>
        <div className={`flex flex-col items-center justify-center mx-auto w-full ${lang === 'ar'?'text-right':'text-left'}`}>
          {
            PrivacyPolicyJson?.privacy_policies?.map((items, index) => {
              return (
                <div key={index} className="w-full lg:max-w-[85%] md:max-w-[90%] xs:max-w-[100%] mt-2">
                  <p className='font-[700] lg:text-[18px] md:text-[18px] xs:text-[14px] lg:w-[45%] md:w-[45%] xs:w-[100%]'>{items?.privacy_policy_title}</p>
                  <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] '>{items?.privacy_policy_desc}</p>
                  {
                    items?.privacy_policy_list?.map((contents, index) => {
                      return <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] mb-0' key={index}>{contents?.content}</p>
                    })
                  }
                </div>
              )
            })
          }
        <div className="w-full lg:max-w-[85%] md:max-w-[90%] xs:max-w-[100%]">
        <p className='font-[700] lg:text-[18px] md:text-[18px] xs:text-[14px] '>{PrivacyPolicyJson?.privacy_policy_contact_title}</p>
        <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] '>{PrivacyPolicyJson?.privacy_policy_contact_desc}</p>
        <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] '>{PrivacyPolicyJson?.privacy_policy_contact_owner}</p>
        <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px]  hover:text-black text-blue-400 cursor-pointer'>{PrivacyPolicyJson?.privacy_policy_contact_mail}</p>
        </div>
        </div>
        </div>
      

      </div>
      <Footer isLang={lang}/>
    </div>
  )
}

export default PrivacyPolicy