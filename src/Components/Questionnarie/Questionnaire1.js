// import React,{useEffect , useState} from 'react'
// import axios from 'axios'
// import { Questionnaire } from './Questionnaire'
// import { base_url } from '../Auth/BackendAPIUrl'

// export const Questionnaire1 = () => {

//   const [questions, setQuestions] = useState([]);

//     const fetchQuestions = async () => {
//         const response = await axios.get(`${base_url}/api/content?section=brand_questions`);
//         console.log(response)
//         setQuestions(response.data); 
//       return (
//         <div className='questions'>
//               {
//                 response.data.map((question,index)=>{
//                   return(
//                     <>
//                     <p key={index} className='questions-title'>{question.question}<span><sup>*</sup></span></p>
//                     <input className='question-input'></input>    
//                     </>
//                   )
//                 })
//               }
//             </div>
//        )
//     }
    
//   return (
//     <div>
//       <Questionnaire 
//         pageNo={1}
//         questions={fetchQuestions()}
//         bgTitle={'About your business'}
//       />
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Questionnaire } from './Questionnaire';
import { base_url } from '../Auth/BackendAPIUrl';

export const Questionnaire1 = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions`);
        const questionsJSX = response.data.map((question, index) => (
          <div className='questions' key={index}>
            <p className='questions-title'>
              {question.question}
              <span><sup>*</sup></span>
            </p>
            <input className='question-input' />
          </div>
        ));
        setQuestions(questionsJSX);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <Questionnaire 
        pageNo={1}
        questions={questions} // Pass the JSX-rendered questions
        bgTitle={'About your business'}
      />
    </div>
  );
};
