import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Questionnaire } from './Questionnaire';
import { base_url } from '../Auth/BackendAPIUrl';
import Load from '../../Images/Bundles/load_sticker.webp'
import { useNavigate } from 'react-router-dom';

export const Questionnaire1 = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

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
            {
              index === 0 ? 
              <div className='img-rotate-qf'>
                <img className='rotating-image' src={Load}></img>
              </div>
            :''
            }
          </div>
        ));
        setQuestions(questionsJSX);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const onClick = () =>{
    navigate(`/questionnaire/${2}`);
  }
  return (
    <div>
      <Questionnaire 
        pageNo={1}
        questions={questions} 
        bgTitle={'About your business'}
        onNextClick={onClick}
      />
    </div>
  );
};
