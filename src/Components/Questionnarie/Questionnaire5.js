import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigToken } from '../Auth/ConfigToken';
import { questionnaireAction5, questionnaireAnswers } from '../../Redux/Action';

export const Questionnaire5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const answers1 = useSelector((state) => state.questionnaire1);
  const answers2 = useSelector((state) => state.questionnaire2);
  const answers3 = useSelector((state) => state.questionnaire3);
  const answers4 = useSelector((state) => state.questionnaire4);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState(null);


  const placeHolders = [
    "",
    "insert the link below or send it to our email info@bundldesigns.com",
    ""
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=5`);
        const questionsData = response.data.map((question, index) => ({
          ...question,
          placeholder: placeHolders[index],
        }));
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLanguageChange = (language,questionId) => {
    setSelectedLanguage(language);
    setFormData((prevData)=>({
      ...prevData,
      [questionId]:language
    }))
  };
  

  const onBackClick = () => {
    navigate(`/questionnaire/${4}`, { state: { questionnaireData4: answers4 } });
  };

  const FinishClick = async () => {
    try {
      let finalFormData = {
        answers:{
          ...answers1,
          ...answers2,
          ...answers3,
          ...answers4,
          ...formData,
        },
        status:'submit',
        orderId:43
      };
      const response = await axios.post(
        `${base_url}/api/questionnaire/create`,
        finalFormData,
        ConfigToken()
      );
      dispatch(questionnaireAnswers(finalFormData));
      navigate("/thankyou");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const onSaveLaterClick = async() =>{
    try {
      let data = {
        formData,
        status:'not submitted',
        orderId:location.state.orderId
      };
      const response = await axios.post(
        `${base_url}/api/questionnaire/create`,
        data,
        ConfigToken()
      );
      dispatch(questionnaireAction5(formData))
      navigate("/thankyou");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }


  return (
    <div>
      <Questionnaire
        pageNo={5}
        storeAnswers={answers4} // Pass the local answers to the Questionnaire
        onBackClick={onBackClick}
        onNextClick={FinishClick}
        onSaveLaterClick={onSaveLaterClick}
        questions={questions.map((question) => (
          <div className="questions" key={question.id}>
            <p className="questions-title">
              {question.question}
              {question.required && (
                <span>
                  <sup>*</sup>
                </span>
              )}
            </p>
            {question.id === 24 && (
              <div className="flex items-center justify-center gap-[20px]">
                <div>
                  <button  onClick={() => handleLanguageChange("English",question.id)}  className="font-[18px] h-[45px] w-[150px] border-[1px] border-solid border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF]">
                    English
                  </button>
                </div>
                <div>
                  <button  onClick={() => handleLanguageChange("Arabic",question.id)} className="font-[18px] h-[45px] w-[150px] border-[1px] border-solid border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF]">
                    Arabic
                  </button>
                </div>
              </div>
            )}
            <input
              placeholder={question.placeholder}
              className="question-input"
              // value={formData[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          </div>
        ))}
        bgTitle={'Final Thoughts'}
      />
    </div>
  );
};
