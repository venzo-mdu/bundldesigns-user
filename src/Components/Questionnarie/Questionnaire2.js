import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';

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
    fetchQuestions();
  }, []);

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



  const handleButtonClick = (buttonId,gender,label) => {
    if(gender=== 'female'){
      setActiveFemaleButtons((prevActiveButtons) =>
        prevActiveButtons.includes(label)
          ? prevActiveButtons.filter((id) => id !== label) 
          : [...prevActiveButtons,label] 
      );
      setFormData((prevFormData) => {
        const updatedFemaleAgeGroups = prevFormData?.femaleAgeGroups || [];
        return {
          ...prevFormData,
          female: updatedFemaleAgeGroups.includes(label)
            ? updatedFemaleAgeGroups.filter((age) => age !== label) // Remove if deselected
            : [...updatedFemaleAgeGroups, label], // Add if selected
        };
      });
    }
    if(gender === 'male'){
      setActiveMaleButtons((prevActiveButtons) =>
        prevActiveButtons.includes(label)
          ? prevActiveButtons.filter((id) => id !== label) 
          : [...prevActiveButtons,label] 
      );
      setFormData((prevFormData) => {
        const updatedMaleAgeGroups = prevFormData?.maleAgeGroups || [];
        return {
          ...prevFormData,
          male: updatedMaleAgeGroups.includes(label)
            ? updatedMaleAgeGroups.filter((age) => age !== label) // Remove if deselected
            : [...updatedMaleAgeGroups, label], // Add if selected
        };
      });
    };
  }
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
    dispatch(questionnaireAction2(formData))
    navigate(`/questionnaire/${3}`);
  }
  const onSaveLaterClick = async() =>{
    let data ={
      answers:formData,
      orderId:16,
      status:'not submitted'
    }
     try{
      const response = await axios.post(`${base_url}/api/questionnaire/create`,data,ConfigToken());
     }
     catch(e){
      console.log(e)
     }
  }
  return (
    <div>
      <Questionnaire
        pageNo={2}
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
                          onClick={() => handleButtonClick(`female-${index}`,'female',label)}
                        />
                        <button
                          key={`female-${index}`}
                          className={`female-btn ${activeFemaleButtons.includes(label) ? 'active' : ''}`}
                          onClick={() => handleButtonClick(`female-${index}`,'female',label)}
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
                          onClick={() => handleButtonClick(`male-${index}`,'male',label)}
                        />
                        <button
                          key={`male-${index}`}
                          className={`male-btn ${activeMaleButtons.includes(label) ? 'active' : ''}`}
                          onClick={() => handleButtonClick(`male-${index}`,'male',label)}
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
            <input className="question-input" placeholder={placeHolders[index]} value={formData?.[question.id]} onChange={(e)=>handleChange(question.id,e.target.value)}/>
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



