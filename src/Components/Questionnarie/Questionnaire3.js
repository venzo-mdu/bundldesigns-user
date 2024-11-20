// import React, { useEffect , useState } from 'react'
// import axios from 'axios';
// import { styled } from '@mui/material/styles';
// import { base_url } from '../Auth/BackendAPIUrl';
// import { Questionnaire } from './Questionnaire'
// import LinearProgress from '@mui/material/LinearProgress';


// export const Questionnaire3 = () => {

//   const [questions , setQuestions] = useState([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `${base_url}/api/content?section=brand_questions&page=3`
//         );
//         console.log(response.data);  // Log the data for inspection
//         const questionsJSX = response.data.map((question, index) => (
//           <div className="questions" key={index}>
//             <p className="questions-title">
//               {question.question}
//               <span>
//                 <sup>*</sup>
//               </span>
//             </p>
//             {question.answer_type === 'bar' && (
//              <>
//              <div style={{display:'flex'}}>
//                <p>Masculine</p>
//                <input type='range' className='question-progress' min={0} max={100} value={"50"}></input>
//                <p>Feminine</p>
//              </div>
//              </>
//             )}
//             <input className="question-input" />
//           </div>
//         ));
//         setQuestions(questionsJSX);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };
//     fetchQuestions();
//   }, []);
  

//   return (
//     <div>
//       <Questionnaire 
//       pageNo={3}
//       questions={questions}
//       bgTitle={'YOUR project BRANDING'}/>
//     </div>
//   )
// }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { base_url } from '../Auth/BackendAPIUrl';
// import { Questionnaire } from './Questionnaire';
// import { selectClasses } from '@mui/material';

// export const Questionnaire3 = () => {
//   const [questions, setQuestions] = useState([]);
//   const [sliderValues, setSliderValues] = useState({}); // Store slider values by question ID or index

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `${base_url}/api/content?section=brand_questions&page=3`
//         );

//         // Initialize sliderValues for all questions with "bar" answer_type
//         const initialSliderValues = response.data
//           .filter((q) => q.answer_type === 'bar')
//           .reduce((acc, question, index) => {
//             acc[index] = 50; // Default slider value
//             return acc;
//           }, {});

//         setSliderValues(initialSliderValues);

//         const questionsJSX = response.data.map((question, index) => (
//           <div className="questions" key={index}>
//             <p className="questions-title">
//               {question.question}
//               <span>
//                 <sup>*</sup>
//               </span>
//             </p>
//             {question.answer_type === 'bar' && (
//               <>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                   <p className='progress-text'>Masculine</p>
//                   <input
//                     type="range"
//                     className="question-progress"
//                     min={0}
//                     max={100}
//                     // value={sliderValues[index] || 50}
//                     onChange={(e) => handleSliderChange(index, e.target.value)}
//                   />
//                   <p className='progress-text'>Feminine</p>
//                 </div>
//               </>
//             )}
//             <input className="question-input" />
//           </div>
//         ));

//         setQuestions(questionsJSX);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const handleSliderChange = (index, value) => {
//     setSliderValues((prevValues) => ({
//       ...prevValues,
//       [index]: value,
//     }));
//   };
//   console.log(sliderValues)
//   return (
//     <div>
//       <Questionnaire
//         pageNo={3}
//         questions={questions}
//         bgTitle={'YOUR project BRANDING'}
//       />
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Questionnaire3 = () => {
  
  const navigate = useNavigate();
  const answers = useSelector((state) => state.questionnaire2);
  console.log(answers)
  const [questions, setQuestions] = useState([]);
  const [sliderValues, setSliderValues] = useState({}); // Store slider values by question ID or index

  // Labels for progress bar
  const progressLabels = [
    { left: "Masculine", right: "Feminine" },
    { left: "Economical", right: "Luxurious" },
    { left: "Playful", right: "Sophisticated" },
    { left: "Classics ", right: "Modern " },
    { left: "Mature ", right: " Youthful" },
    { left: "Formal ", right: " Casual" },
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/content?section=brand_questions&page=3`
        );

        // Initialize sliderValues for all questions with "bar" answer_type
        const initialSliderValues = response.data
          .filter((q) => q.answer_type === 'bar')
          .reduce((acc, question, index) => {
            acc[index] = 50; // Default slider value
            return acc;
          }, {});

        setSliderValues(initialSliderValues);

        const questionsJSX = response.data.map((question, index) => (
          <div className="questions" key={index}>
            <p className="questions-title">
              {question.question}
              <span>
                <sup>*</sup>
              </span>
            </p>
            {question.answer_type === 'bar' && (
              progressLabels.map((data,index)=>{
                return(
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <p className="progress-text" style={{textAlign:'left'}}>{data?.left }</p>
                <input
                  type="range"
                  className="question-progress"
                  min={0}
                  max={100}
                  // value={sliderValues[index] || 50}
                  onChange={(e) => handleSliderChange(index, e.target.value)}
                />
                <p className="progress-text" style={{textAlign:'right'}}>{data?.right}</p>
              </div>
                )
              
              })
              
            )}
            <input className="question-input" />
          </div>
        ));

        setQuestions(questionsJSX);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleSliderChange = (index, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const onBackClick = () =>{
    navigate(`/questionnaire/${2}`,{state:{questionnaireData2:answers}});
  }
  const onNextClick = () =>{
    navigate(`/questionnaire/${4}`);
  }

  return (
    <div>
      <Questionnaire
        pageNo={3}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        questions={questions}
        bgTitle={"YOUR project BRANDING"}
      />
    </div>
  );
};
