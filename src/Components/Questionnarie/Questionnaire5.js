import React, { useEffect , useState } from 'react'
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Questionnaire5 = () => {

  const navigate = useNavigate();
  const answers = useSelector((state) => state.questionnaire4);
  const [questions , setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=5`);
        const questionsJSX = response.data.map((question, index) => (
          <div className="questions" key={index}>
            <p className="questions-title">
              {question.question}
              <span>
                <sup>*</sup>
              </span>
            </p>
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


  const onBackClick = () =>{
    navigate(`/questionnaire/${4}`,{state:{questionnaireData4:answers}});
  }

  return (
    <div>
      <Questionnaire 
        pageNo={5}
        storeAnswers={answers}
        onBackClick={onBackClick}
        questions={questions}
        bgTitle={'Final Thoughts'}
      />
    </div>
  )
}
