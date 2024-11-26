import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { questionnaireAction3 } from '../../Redux/Action';

export const Questionnaire3 = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const answers = useSelector((state) => state.questionnaire2);
  const [questions, setQuestions] = useState([]);
  const [sliderValues, setSliderValues] = useState({});
  const [formData , setFormData] = useState(location.state.questionnaireData3?.formData);

  console.log(location.state.questionnaireData3)
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
        setQuestions(response.data);

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

  const handleChange = (questionId,value) =>{
    setFormData((formValues) => ({
      ...formValues,
      [questionId]: value,
    }));
  }
  const onBackClick = () =>{
    navigate(`/questionnaire/${2}`,{state:{questionnaireData2:answers}});
  }
  const onNextClick = () =>{
    console.log(formData,'sdfsdf')
    let dataQ3 = {
      sliderValues:sliderValues,
      formData:formData
    }
    dispatch(questionnaireAction3(dataQ3))
    navigate(`/questionnaire/${4}`);
    // console.log(sliderValues,formData)
  }
  

  return (
    <div>
      <Questionnaire
        pageNo={3}
        storeAnswers={answers}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        questions={
          questions.map((question, index) => (
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
                  className='progress-section-q3'
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
              <input value={formData?.[question.id]} className="question-input" onChange={(e)=>handleChange(question.id,e.target.value)}/>
            </div>
          ))
        }
        bgTitle={"YOUR project BRANDING"}
      />
    </div>
  );
};
