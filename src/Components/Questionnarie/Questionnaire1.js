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
        questions={questions} 
        bgTitle={'About your business'}
      />
    </div>
  );
};
