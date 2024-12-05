import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { ToastContainer, toast } from 'react-toastify';


import Male1 from '../../Images/Questionnaire/male1.png';
import Male2 from '../../Images/Questionnaire/male2.png';
import Male3 from '../../Images/Questionnaire/male3.png';
import Male4 from '../../Images/Questionnaire/male4.png';
import Male5 from '../../Images/Questionnaire/male5.png';
import Male6 from '../../Images/Questionnaire/male6.png';

import Female1 from '../../Images/Questionnaire/female1.png';
import Female2 from '../../Images/Questionnaire/female2.png';
import Female3 from '../../Images/Questionnaire/female3.png';
import Female4 from '../../Images/Questionnaire/female4.png';
import Female5 from '../../Images/Questionnaire/female5.png';
import Female6 from '../../Images/Questionnaire/female6.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { questionnaireAction2 } from '../../Redux/Action';
import { ConfigToken } from '../Auth/ConfigToken';


export const Questionnaire2 = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const answers = useSelector((state) => state.questionnaire1);

  const [questions, setQuestions] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [activeFemaleButtons, setActiveFemaleButtons] = useState([]);
  const [activeMaleButtons, setActiveMaleButtons] = useState([]);
  const [formData, setFormData] = useState(location.state?.questionnaireData2);
  const [fetchQ2Answers, setFetchQ2Answers] = useState([]);

  const femaleImages = [Female1, Female2, Female3, Female4, Female5, Female6];
  const MaleImages = [Male1, Male2, Male3, Male4, Male5, Male6];
  const placeHolders = [
    "Enter your competitor name",
    "(ex: Colours too bright, Logo too playful, Identity too serious, etc...)",
    "",
    "(ex: Shopping, Painting, Sports, etc...)",

  ]

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=2`);
       
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`${base_url}/api/questionnaire/update/${location.state.orderId}`, ConfigToken());
        setFetchQ2Answers(response.data.data)
        const ageDataQuestion = response.data.data.find(
          (item) => item.answer_type === "age-data"
        );
        
        if (ageDataQuestion?.answer?.female) {
          setActiveFemaleButtons(ageDataQuestion.answer.female);
          setSelectedGender("female");
        }
        if(ageDataQuestion?.answer?.male){
          setActiveMaleButtons(ageDataQuestion.answer.male);
          setSelectedGender("male");
        }  
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
    fetchAnswers();
  }, []);
  
  const getAnswerValue = (questionId) => {

    const formValue = formData?.[questionId];
    if (formValue !== undefined) {
      return formValue;
    }

    const fetchedAnswer = fetchQ2Answers.find((answer) => answer.question_id === questionId)?.answer;
    if (fetchedAnswer !== undefined && formValue === undefined) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [questionId]: fetchedAnswer,
      }));
    }
    return fetchedAnswer ?? '';
  };
  
  const handleGenderChange = (selected) => {
    if (selectedGender === 'both') {
      if (selected === 'male') {
        setSelectedGender('female');
      } else if (selected === 'female') {
        setSelectedGender('male');
      }
    } else if (selected === selectedGender) {
      setSelectedGender('');
    } else if (
      (selected === 'male' && selectedGender === 'female') ||
      (selected === 'female' && selectedGender === 'male')
    ) {
      setSelectedGender('both');
    } else {
      setSelectedGender(selected);
    }
  };

  const showToastMessage = () => {
    toast.error("The Value is required!", {
      position: toast?.POSITION?.TOP_RIGHT,
    });
  };

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


  const handleButtonClick = (buttonId, gender, label, questionId) => {
    setFormData((prevFormData) => {
      // Retrieve the current state of male and female data for the specific question
      const currentFemaleData = activeFemaleButtons || [];
      const currentMaleData = activeMaleButtons || [];
      // Determine the updated data based on the gender
      let updatedGenderData;
      if (gender === 'female') {
        updatedGenderData = currentFemaleData.includes(label)
          ? currentFemaleData.filter((item) => item !== label) // Remove if already selected
          : [...currentFemaleData, label]; // Add if not present
  
        setActiveFemaleButtons(updatedGenderData); // Update active female buttons
        return {
          ...prevFormData,
          [questionId]: {
            female: updatedGenderData, // Update female data
            male: currentMaleData, // Preserve male data
          },
        };
      }
  
      if (gender === 'male') {
        updatedGenderData = currentMaleData.includes(label)
          ? currentMaleData.filter((item) => item !== label) // Remove if already selected
          : [...currentMaleData, label]; // Add if not present
  
        setActiveMaleButtons(updatedGenderData); // Update active male buttons
  
        return {
          ...prevFormData,
          [questionId]: {
            female: currentFemaleData, // Preserve female data
            male: updatedGenderData, // Update male data
          },
        };
      }
  
      return prevFormData; // Default case (shouldn't occur)
    });
  };
  

  const handleChange = (questionId , value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [questionId]: value, 
    }));
  };

  const onBackClick = () =>{
    navigate(`/questionnaire/${1}`,{state:{questionnaireData1:answers}});
  }
  const onNextClick = () =>{
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    dispatch(questionnaireAction2(formData))
    navigate(`/questionnaire/${3}`,{
      state:{
        orderId:location.state?.orderId
      }
    });
  }
  const onSaveLaterClick = async() =>{
    if (!validateFields()) {
      return; // Stop execution if validation fails
    }
    let data ={
      answers:formData,
      orderId:location.state?.orderId,
      status:'not submitted'
    }
     try{
      const response = await axios.post(`${base_url}/api/questionnaire/create`,data,ConfigToken());
      if(response.status === 200){
        navigate('/dashboard',{
          state:{
            orderId:location.state?.orderId
          }
        })
      }
     }
     catch(e){
      console.log(e)
     }
  }
  return (
    <div>
      <ToastContainer />
      <Questionnaire
        pageNo={2}
        orderId={location.state?.orderId}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        onSaveLaterClick={onSaveLaterClick}
        storeAnswers={answers}
        questions={
          <>
          {
          questions.map((question, index) => (
          <div className="questions" key={index}>
            <p className="questions-title">
              {question.question}
              {
                question.required && (
                  <span><sup>*</sup></span>
                )
              }
            </p>
            {
              question.answer_type === "age-data" && (
                <>
                 <div className="ideal-customers">
              {/* <p className='customer-text'>Who is your ideal customer?</p> */}
              <div style={{ display: 'flex', gap: '25px' }}>
                <button className={selectedGender === 'female' || selectedGender === 'both' ? 'female-active' : 'female'} value="female" onClick={() => handleGenderChange('female')}>Female</button>
                <button className={selectedGender === 'male' || selectedGender === 'both' ? 'male-active' : 'male'} value={'male'} onClick={() => handleGenderChange('male')}>Male</button>
              </div>
              <div className='border-b-[1px] border-solid border-[#000000] mb-4'>
              {(selectedGender === 'female' || selectedGender === 'both') ? (
                <div className="female-section mb-[5%]">
                  {/* Render female images */}
                  <div className="female-buttons">
                    {['10 or Less', '11-17', '18-23', '24-30', '41-60', '61+'].map((label, index) => (

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <img
                          key={`female-img-${index}`}
                          src={femaleImages[index]}
                          alt={`Female ${index + 1}`}
                          className="female-image"
                          onClick={() => handleButtonClick(`female-${index}`,'female',label,question.id)}
                        />
                        <button
                          key={`female-${index}`}
                          className={`female-btn ${activeFemaleButtons?.includes(label) ? 'active' : ''}`}
                          onClick={() => handleButtonClick(`female-${index}`,'female',label,question.id)}
                        >
                          {label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="female-section mb-[5%]">
                <div className="female-buttons">
                  {['10 or Less', '11-17', '18-23', '24-30', '41-60', '61+'].map((label, index) => (

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <img
                        key={`female-img-${index}`}
                        src={femaleImages[index]}
                        alt={`Female ${index + 1}`}
                        className="female-image-disable"
                      />
                      <button
                        disabled
                        key={`female-${index}`}
                        className="female-btn"
                      >
                        {label}
                      </button>
                    </div>
                  ))}
                </div>
                </div>
              )}
              </div>
              {(selectedGender === 'male' || selectedGender === 'both') ? (
                <div className="male-section">
                  {/* Render female images */}
                  <div className="male-buttons">
                    {['10 or Less', '11-17', '18-23', '24-30', '41-60', '61+'].map((label, index) => (

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <img
                          key={`male-img-${index}`}
                          src={MaleImages[index]}
                          alt={`Male ${index + 1}`}
                          className="male-image"
                          onClick={() => handleButtonClick(`male-${index}`,'male',label,question.id)}
                        />
                        <button
                          key={`male-${index}`}
                          className={`male-btn ${activeMaleButtons.includes(label) ? 'active' : ''}`}
                          onClick={() => handleButtonClick(`male-${index}`,'male',label,question.id)}
                        >
                          {label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='male-section'>
                <div className="male-buttons">
                  {['10 or Less', '11-17', '18-23', '24-30', '41-60', '61+'].map((label, index) => (

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <img
                        key={`male-img-${index}`}
                        src={MaleImages[index]}
                        alt={`Male ${index + 1}`}
                        className="male-image-disable"
                      />
                      <button
                        disabled
                        key={`male-${index}`}
                        className="male-btn"
                      >
                        {label}
                      </button>
                    </div>
                  ))}
                </div>
                </div>
              )}
            </div>
                </>
              )
            }
            <input className="question-input" placeholder={placeHolders[index]} value={ question.answer_type === "age-data" ?'':getAnswerValue(question.id)} onChange={(e)=>handleChange(question.id,e.target.value)}/>
          </div>
        ))
      }
          </>
        }
        bgTitle={'AUDIENCE & COMPETITION'}
      />
    </div>
  );
};



