// import React from 'react'
// import {Navbar} from '../Common/Navbar/Navbar'
// import {Footer} from '../Common/Footer/Footer'

// const Legal = ({lang,setLang}) => {
//   return (
//     <div>
//       <Navbar isLang={lang} setIsLang={setLang}/>
//        <div className='font-Helvetica'>
//               <div className='text-center py-2 border-b border-black'>
//                   <h1 className='lg:text-[40px] md:text-[40px] xs:text-[30px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase'>{lang === 'ar' ? '' : ' Legal'} </h1>
//               </div>
//               <div className='mt-[3%] lg:p-[1%_5%_4%_25%] md:p-[1%_5%_4%_25%] xs:p-[1%_5%_4%_5%]'>
//                  <p className='lg:text-[24px] md:text-[24px] xs:text-[18px] font-[700] mx-auto uppercase'>{lang === 'ar' ? '' : 'Trade License'}</p>
//                  <p className='lg:text-[20px] md:text-[20px] xs:text-[15px] font-[500]'>{lang === 'ar' ? '' : 'Hala Alhussaini Information Technology Establishment'}</p>
//                  <p className='lg:text-[20px] md:text-[20px] xs:text-[14px] '>{lang === 'ar' ? '' : 'Registration Number: 1010481873'}</p>
//                  <p className='lg:text-[20px] md:text-[20px] xs:text-[14px] '>{lang === 'ar' ? '' : 'Riyadh, Kingdom of Saudi Arabia'}</p>
//                  <p className='lg:text-[20px] md:text-[20px] xs:text-[14px] '>{lang === 'ar' ? '' : 'https://maroof.sa/209442'}</p>
//               </div>
//        </div>
//       <Footer isLang={lang}/>
//     </div>
//   )
// }

// export default Legal



// -------------- Updated Arabic Content -------------- 



import React from 'react'
import {Navbar} from '../Common/Navbar/Navbar'
import {Footer} from '../Common/Footer/Footer'

const Legal = ({lang,setLang}) => {
  return (
    <div>
      <Navbar isLang={lang} setIsLang={setLang}/>
       <div className='font-Helvetica'>
              <div className='text-center py-2 border-b border-black'>
                  <h1 className='lg:text-[40px] md:text-[40px] xs:text-[30px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase'>{lang === 'ar' ? 'البيانات القانونية ​' : ' Legal'} </h1>
              </div>
              <div className={`mt-[3%] ${lang === 'ar' ? 'lg:p-[1%_25%_4%_5%] md:p-[1%_25%_4%_5%] xs:p-[1%_5%_4%_5%]':'lg:p-[1%_5%_4%_25%] md:p-[1%_5%_4%_25%] xs:p-[1%_5%_4%_5%]'}`}>
                 <p className='lg:text-[24px] md:text-[24px] xs:text-[18px] font-[700] mx-auto uppercase'>{lang === 'ar' ? 'الرخصة التجارية' : 'Trade License'}</p>
                 <p className='lg:text-[20px] md:text-[20px] xs:text-[15px] font-[500]'>{lang === 'ar' ? 'مؤسسةالباقة الفنية للتصميم' : 'Al-Baqa Al-Funayya For Designing EST.'}</p>
                 <p className='lg:text-[20px] md:text-[20px] xs:text-[14px] '>{lang === 'ar' ? 'رقم السجل التجاري' : 'Registration Number: 1010481873'}</p>
                 <p className='lg:text-[20px] md:text-[20px] xs:text-[14px] '>{lang === 'ar' ? 'الرياض، المملكة العربية السعودي' : 'Riyadh, Kingdom of Saudi Arabia'}</p>
                 <p className='lg:text-[20px] md:text-[20px] xs:text-[14px] '>{lang === 'ar' ? 'https://maroof.sa/209442' : 'https://maroof.sa/209442'}</p>
              </div>
       </div>
      <Footer isLang={lang}/>
    </div>
  )
}

export default Legal