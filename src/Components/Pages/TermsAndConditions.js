// import React from 'react'
// import {Navbar} from '../Common/Navbar/Navbar'
// import {Footer} from '../Common/Footer/Footer'
// import TermsAndConditionsJson from '../../json/termsandConditions.json'

// const TermsAndConditions = ({lang,setLang}) => {
//   return (
//     <div>
//     <Navbar isLang={lang} setIsLang={setLang}/>
//        <div className='font-Helvetica'>
//               <div className='text-center py-2 border-b border-black'>
//                   <h1 className='lg:text-[40px] md:text-[40px] xs:text-[30px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase'>{lang === 'ar' ? '' : ' Terms & Conditions'} </h1>
//               </div>
//                  <div className='lg:my-[3%] md:my-[5%] xs:my-[5%] lg:p-0 md:p-0 xs:p-[1%_5%]'>
//                       <div className='flex items-center justify-center mx-auto'>
//                         {/* <p className='lg:text-[18px] md:text-[18px] xs:text-[14px] font-[400] lg:w-[40%] md:w-[50%]'>{PrivacyPolicyJson?.privacy_desc}</p> */}
//                       </div>
//                       <div className={`flex flex-col items-center justify-center mx-auto w-full ${lang === 'ar'?'text-right':'text-left'}`}>
//                         <div className="w-full lg:max-w-[85%] md:max-w-[90%] xs:max-w-[100%] mt-2">
//                         <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] '>{lang === 'ar' ? '' : 'We thank you for shopping at BundlDesigns.com'}</p>
//                         <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] '>{lang === 'ar' ? '' : 'Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the http://www.BundlDesigns.com website (the "Service") operated by Bundl ("us", "we", or "our").'}</p>
//                         <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] '>{lang === 'ar' ? '' : 'Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.'}</p>
//                         </div>

//                         <p className='font-[700] lg:text-[18px] md:text-[18px] xs:text-[14px] lg:w-[85%] md:w-[90%] xs:w-[100%]'>{lang === 'ar' ? '' : 'By accessing or using the Service you agree to be bound by these Terms.'} </p>
//                         {
//                           TermsAndConditionsJson?.terms_and_conditions?.map((items, index) => {
//                             return (
//                               <div key={index} className="w-full lg:max-w-[85%] md:max-w-[90%] xs:max-w-[100%] mt-2">
//                                 <p className='font-[700] lg:text-[18px] md:text-[18px] xs:text-[14px] lg:w-[45%] md:w-[45%] xs:w-[100%]'>{items?.title}:</p>
//                                 <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] '>{items?.content}</p>
//                                 {
//                                   items?.sub_content?.map((item,index)=>{
//                                     return <p className='font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] px-[5%]'>{item?.content}</p>
//                                   })
//                                 }
//                               </div>
//                             )
//                           })
//                         }

//                       </div>
//                       </div>
//           </div>
//       <Footer isLang={lang}/>
//     </div>
//   )
// }

// export default TermsAndConditions

// ---------------- Updated Arabic content ----------------

import React from "react";
import { Navbar } from "../Common/Navbar/Navbar";
import { Footer } from "../Common/Footer/Footer";
import TermsAndConditionsJson from "../../json/termsandConditions.json";

const TermsAndConditions = ({ lang, setLang }) => {
  return (
    <div>
      <Navbar isLang={lang} setIsLang={setLang} />
      <div className="font-Helvetica">
        <div className="text-center py-2 border-b border-black">
          <h1 className="lg:text-[40px] md:text-[40px] xs:text-[30px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase">
            {lang === "ar" ? "الشروط والأحكام" : " Terms & Conditions"}{" "}
          </h1>
        </div>
        <div className="lg:my-[3%] md:my-[5%] xs:my-[5%] lg:p-0 md:p-0 xs:p-[1%_5%]">
          <div className="flex items-center justify-center mx-auto">
            {/* <p className='lg:text-[18px] md:text-[18px] xs:text-[14px] font-[400] lg:w-[40%] md:w-[50%]'>{PrivacyPolicyJson?.privacy_desc}</p> */}
          </div>
          <div
            className={`flex flex-col items-center justify-center mx-auto w-full ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            <div className="w-full lg:max-w-[85%] md:max-w-[90%] xs:max-w-[100%] mt-2">
              <p className="font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] ">
                {lang === "ar"
                  ? "نشكرك لطلبك من بندل ديزاينز"
                  : "We thank you for shopping at BundlDesigns.com"}
              </p>
              <p className="font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] ">
                {lang === "ar"
                  ? "الرجاء قراءة الشروط والأحكام"
                  : 'Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the http://www.BundlDesigns.com website (the "Service") operated by Bundl ("us", "we", or "our").'}
              </p>
              <p className="font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] ">
                {lang === "ar"
                  ? "باستخدامك للخدمة، فأنت تؤكد أنك قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام"
                  : "By using or accessing this service, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions."}
              </p>
            </div>

            <p className="font-[700] lg:text-[18px] md:text-[18px] xs:text-[14px] lg:w-[85%] md:w-[90%] xs:w-[100%]">
              {lang === "ar"
                ? "باستخدامك للخدمة، فأنت تؤكد أنك قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام"
                : "By using or accessing this service, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions."}{" "}
            </p>
            {TermsAndConditionsJson?.terms_and_conditions?.map(
              (items, index) => {
                return (
                  <div
                    key={index}
                    className={`w-full lg:max-w-[85%] md:max-w-[90%] xs:max-w-[100%] mt-2 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    <p className="font-[700] lg:text-[18px] md:text-[18px] xs:text-[14px] lg:w-[45%] md:w-[45%] xs:w-[100%]">
                      {lang === "ar" ? items?.arabic_title : items?.title}:
                    </p>

                    <p className="font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px]">
                      {lang === "ar" ? items?.arabic_content : items?.content}
                    </p>

                    {items?.sub_content?.map((item, index) => (
                      <p
                        key={index}
                        className="font-[400] lg:text-[18px] md:text-[18px] xs:text-[14px] px-[5%]"
                      >
                        {lang === "ar" ? item?.arabic_content : item?.content}
                      </p>
                    ))}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <Footer isLang={lang} />
    </div>
  );
};

export default TermsAndConditions;
