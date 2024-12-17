import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Questionnaire } from './Questionnaire';
import { base_url } from '../Auth/BackendAPIUrl';
import Load from '../../Images/Bundles/load_sticker.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { questionnaireAction1 } from '../../Redux/Action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigToken } from '../Auth/ConfigToken'

export const Questionnaire1 = () => {

  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(location.state?.questionnaireData1);
  const [activeType, setActiveType] = useState(null);
  const [fetchQ1Answers, setFetchQ1Answers] = useState([]);
  const [requiredQuestions , setRequiredQuestions] = useState([])

  const placeHolders = [
    "Project Name",
    "(ex:Fashion,Food,Services,Personal Brand,etc...)",
    "(ex:Riyadh , Saudi Arabia)",
    "List them here...",
    "(ex:Only style in the market , high quality)",
    "Type your website URL",
    "Share your social media link"
  ]



  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=1`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${base_url}/api/questionnaire/update/${location.state.orderId}`, ConfigToken());
        setFetchQ1Answers(response.data.data)
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
    fetchAnswers();
  }, []);

  const showToastMessage = () => {
    toast.error("The Value is required!", {
      position: toast?.POSITION?.TOP_RIGHT,
    });
  };

  const handleTypeClick = (type) => {
    setActiveType((prevType) => (prevType === type ? null : type)); // Toggle state
    let brandingType = activeType
    setFormData((prev) => ({
      ...prev,
      // type: type, // Update formData accordingly
    }));
  };


  const handleInputChange = (questionId, value) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const getAnswerValue = (questionId) => {

    const formValue = formData?.[questionId];
    if (formValue !== undefined) {
      return formValue;
    }

    const fetchedAnswer = fetchQ1Answers.find((answer) => answer.question_id === questionId)?.answer;
    if (fetchedAnswer !== undefined && formValue === undefined) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [questionId]: fetchedAnswer,
      }));
    }
    return fetchedAnswer ?? '';
  }


  const validateFields = () => {
    // Filter required questions that are either unanswered or contain invalid values
    const unansweredRequiredQuestions = questions.filter((q) => {
      return (
        q.required && // Check if the question is marked as required
        (!formData?.[q.id] || formData?.[q.id].trim() === "") // Check if there's no answer or only whitespace
      );
    });
  
  
    if (unansweredRequiredQuestions.length > 0) {
      showToastMessage(); // Display the error toast
      return false;
    }
  
    return true; // All required fields are valid
  };
  


  const onNextClick = () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    else{
      dispatch(questionnaireAction1(formData));
      navigate(`/questionnaire/${2}`,{state:{
        orderId:location.state?.orderId
      }});
    }
  };

  const onSaveLaterClick = async () => {
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    else{
      let data = {
        answers: formData,
        orderId: location.state?.orderId,
        status: 'not submitted'
      }
      try {
        const response = await axios.post(`${base_url}/api/questionnaire/create`, data, ConfigToken());
        if (response.status === 200) {
          navigate('/dashboard', {
            state: {
              orderId: location.state?.orderId
            }
          })
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div>
      <ToastContainer />
      <Questionnaire
        pageNo={1}
        storeAnswers={location.state?.questionnaireData1}
        orderId={location.state?.orderId}
        bgTitle={'About your business'}
        onNextClick={onNextClick}
        onSaveLaterClick={onSaveLaterClick}
        questions={questions.map((question, index) => (
          <div className='questions' key={index}>
            <p className='questions-title'>
              {question.question}
              {
                question.required && (
                  <span><sup>*</sup></span>
                )
              }
            </p>
            {question.answer_type === "brand" && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className={`product-btn ${activeType === 'Product' ? 'active' : ''}`}
                  onClick={() => handleTypeClick('Product')}
                >
                  Product
                </button>
                <button
                  className={`service-btn ${activeType === 'Service' ? 'active' : ''}`}
                  onClick={() => handleTypeClick('Service')}
                >
                  Service
                </button>
              </div>
            )}
            <input
              className='question-input'
              placeholder={placeHolders[index]}
              // value={formData?.[question.id] || fetchQ1Answers[2].answer }
              value={getAnswerValue(question.id)}
              onChange={(e) => handleInputChange(question.id, e.target.value)} // Update Redux
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
