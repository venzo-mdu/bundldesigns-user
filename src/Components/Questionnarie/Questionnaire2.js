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

export const Questionnaire2 = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [activeButtons, setActiveButtons] = useState([]); // Tracks active buttons

  const femaleImages = [Female1, Female2, Female3, Female4, Female5, Female6];
  const MaleImages = [Male1, Male2, Male3, Male4, Male5, Male6];


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions`);
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
    setActiveButtons([]);
  };



  const handleButtonClick = (buttonId) => {
    setActiveButtons((prevActiveButtons) =>
      prevActiveButtons.includes(buttonId)
        ? prevActiveButtons.filter((id) => id !== buttonId) // Remove button if already active
        : [...prevActiveButtons, buttonId] // Add button if not active
    );
  };

  return (
    <div>
      <Questionnaire
        pageNo={2}
        questions={
          <>
            {questions}
            <div className="ideal-customers">
              <p className='customer-text'>Who is your ideal customer?</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className={selectedGender === 'female' || selectedGender === 'both' ? 'female-active' : 'female'} value="female" onClick={() => handleGenderChange('female')}>Female</button>
                <button className={selectedGender === 'male' || selectedGender === 'both' ? 'male-active' : 'male'} value={'male'} onClick={() => handleGenderChange('male')}>Male</button>
              </div>
              {(selectedGender === 'female' || selectedGender === 'both') ? (
                <div className="female-section">
                  {/* Render female images */}
                  <div className="female-buttons">
                    {['10 or Less', '11-17', '18-23', '24-30', '41-60', '61+'].map((label, index) => (

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <img
                          key={`female-img-${index}`}
                          src={femaleImages[index]}
                          alt={`Female ${index + 1}`}
                          className="female-image"
                          onClick={() => handleButtonClick(`female-${index}`)}
                        />
                        <button
                          key={`female-${index}`}
                          className={`female-btn ${activeButtons.includes(`female-${index}`) ? 'active' : ''}`}
                          onClick={() => handleButtonClick(`female-${index}`)}
                        >
                          {label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
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
              )}

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
                          onClick={() => handleButtonClick(`male-${index}`)}
                        />
                        <button
                          key={`male-${index}`}
                          className={`male-btn ${activeButtons.includes(`male-${index}`) ? 'active' : ''}`}
                          onClick={() => handleButtonClick(`male-${index}`)}
                        >
                          {label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          </>
        }
        bgTitle={'AUDIENCE & COMPETITION'}
      />
    </div>
  );
};



