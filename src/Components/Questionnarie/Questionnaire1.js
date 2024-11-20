// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Questionnaire } from './Questionnaire';
// import { base_url } from '../Auth/BackendAPIUrl';
// import Load from '../../Images/Bundles/load_sticker.webp'
// import { useNavigate } from 'react-router-dom';

// export const Questionnaire1 = () => {
//   const [questions, setQuestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`${base_url}/api/content?section=brand_questions`);
//         const questionsJSX = response.data.map((question, index) => (
//           <div className='questions' key={index}>
//             <p className='questions-title'>
//               {question.question}
//               <span><sup>*</sup></span>
//             </p>
//             <input className='question-input' />
//             {
//               index === 0 ? 
//               <div className='img-rotate-qf'>
//                 <img className='rotating-image' src={Load}></img>
//               </div>
//             :''
//             }
//           </div>
//         ));
//         setQuestions(questionsJSX);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const onClick = () =>{
//     navigate(`/questionnaire/${2}`);
//   }
//   return (
//     <div>
//       <Questionnaire 
//         pageNo={1}
//         questions={questions} 
//         bgTitle={'About your business'}
//         onNextClick={onClick}
//       />
//     </div>
//   );
// };

import React, { useEffect, useState ,useCallback } from 'react';
import axios from 'axios';
import { Questionnaire } from './Questionnaire';
import { base_url } from '../Auth/BackendAPIUrl';
import Load from '../../Images/Bundles/load_sticker.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { questionnaireAction1 } from '../../Redux/Action';

export const Questionnaire1 = () => {

  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(location.state?.questionnaireData1);

 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=1`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleInputChange = (questionId, value) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  
  const onNextClick = () => {
    dispatch(questionnaireAction1(formData));
    navigate(`/questionnaire/${2}`);
  };

 

  return (
    <div>
      <Questionnaire
        pageNo={1}
        bgTitle={'About your business'}
        onNextClick={onNextClick}
        questions={questions.map((question, index) => (
          <div className='questions' key={index}>
            <p className='questions-title'>
              {question.question}
              <span><sup>*</sup></span>
            </p>
            {
              question.answer_type === "brand" ?
              <div style={{display:'flex',gap:'10px'}}>
                <button className='product-btn'>Product</button>
                <button className='service-btn'>Service</button>
              </div> : ''
            }
            <input
              className='question-input'
              value={formData?.[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)} // Update Redux
            />
            {index === 0 ? (
              <div className='img-rotate-qf'>
                <img className='rotating-image' src={Load} alt="Loading" />
              </div>
            ) : ''}
          </div>
        ))}
      >
        
      </Questionnaire>
    </div>
  );
};
