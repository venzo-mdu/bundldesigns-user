import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../Auth/BackendAPIUrl';
import { Questionnaire } from './Questionnaire';
import { colorCodes } from '../../json/QuestionnaireColorCodes';
import { textStyle } from '../../json/QuestionnaireColorCodes';
import { textureImages1 } from '../../json/QuestionnaireColorCodes';
import { textureImages2 } from '../../json/QuestionnaireColorCodes';
import { textureImages3 } from '../../json/QuestionnaireColorCodes';
import { textureImages4 } from '../../json/QuestionnaireColorCodes';
import { textureImages5 } from '../../json/QuestionnaireColorCodes';
import { textureImages6 } from '../../json/QuestionnaireColorCodes';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import X from '../../Images/Questionnaire/x icon.png'
import Color1 from '../../Images/Questionnaire/img1.png'
import Color2 from '../../Images/Questionnaire/img2.png'
import Color3 from '../../Images/Questionnaire/img3.png'
import Link from '../../Images/Questionnaire/icons8-link-26.png'
import { useNavigate } from 'react-router-dom';

export const Questionnaire4 = () => {

  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // To store selected color codes
  const [inputValue, setInputValue] = useState(''); // For input field
  const [activeButtons, setActiveButtons] = useState([]);
  const [shadeBackgroundColor, setShadeBackgroundColor] = useState('rgb(228, 222, 216)'); 
  const [shadeColor, setshadeColor] = useState('rgb(0, 0, 0)'); 




  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=4`);
        
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const displayedColors = colorCodes.slice(0, 90); 

  const handleColorClick = (color) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleRemoveColor = (color) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddColor = () => {
    if (colorCodes.includes(inputValue) && !selectedColors.includes(inputValue)) {
      setSelectedColors([...selectedColors, inputValue]);
      setInputValue('');
    }
    else {
      setSelectedColors([inputValue]);
      setInputValue('');
    }
  };

  const handleButtonClick = (index) => {
    if (activeButtons.includes(index)) {
        // Remove index if already selected
        setActiveButtons(activeButtons.filter((i) => i !== index));
    } else {
        // Add index if not selected
        setActiveButtons([...activeButtons, index]);
    }
  };

  const handleShadeButtonClick = (color,textColor) => {
    setShadeBackgroundColor(color);
    setshadeColor(textColor)
  };

  const onBackClick = () =>{
    navigate(`/questionnaire/${3}`);
  }
  const onNextClick = () =>{
    navigate(`/questionnaire/${5}`);
  }

  return (
    <div>
      <Questionnaire
        pageNo={4}
        onBackClick={onBackClick}
        onNextClick={onNextClick}
        questions={
          <>
           { questions.map((question, index) => (
          <div className="questions" key={index}>
            <p className="questions-title">
              {question.question}
              <span>
                <sup>*</sup>
              </span>
            </p>
            {   
              question.answer_type === 'shade' && (
                <>
                <div className='shade-background'  style={{ backgroundColor: shadeBackgroundColor }}>
                    <div className='shade-buttons'>
                      <div className='button-shade-group'>
                        <img src={Color1}></img>
                        <button className={shadeBackgroundColor === 'rgb(228, 222, 216)' ? 'shade-btn-active':'shade-btn'} onClick={() => handleShadeButtonClick('rgb(228, 222, 216)','rgb(0, 0, 0)')}>CLEAN & CLASSIC</button>
                      </div>
                      <div className='button-shade-group'>
                        <img src={Color2}></img>
                        <button className={shadeBackgroundColor === 'rgb(9, 50, 108)' ? 'shade-btn-active':'shade-btn'} onClick={() => handleShadeButtonClick('rgb(9, 50, 108)','rgb(255, 98, 10)')}>CONTRASTING COLORS</button>
                      </div>
                      <div className='button-shade-group'>
                        <img src={Color3}></img>
                        <button className={shadeBackgroundColor === 'rgb(221, 45, 45)' ? 'shade-btn-active':'shade-btn'} onClick={() => handleShadeButtonClick('rgb(221, 45, 45)','rgb(255, 136, 136)')}>ONE COLOR SHADES</button>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                    <p className='shade-bundl-text' style={{color:shadeColor}}>Bundl</p>
                    <p className='not-sure'>Not sure ? It’s okay!</p>
                    <button className='surprise'>surprise me</button>
                    </div>
                </div>
                </>
              )
            }
            {
              question.answer_type === 'font' && (
                <div
                    className='font-grid'
                >
                 {
                    textStyle.map((font,index)=>{
                      return (
                        <>
                        <div className='font-background'>
                            <img style={{margin:'3% 0 0% 0'}} src={font.img}></img>
                            <button className={`font-buttons ${
                            activeButtons.includes(index) ? 'font-buttons-active' : ''
                        }`} onClick={() => handleButtonClick(index)}>{font.fontStyle}</button>
                        </div>
                        </>
                      )
                    })
                 }
                </div>
              )
            }
            {
               question.answer_type === 'color' && (
                 <>
                 <div
              className="color-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                margin: '2% 0 0 0',
                padding: '0% 10%',
                columnGap:'10px'
              }}
            >
              {/* {displayedColors.map((color, index) => (
                <div
                  key={index}
                  className="specific-color"
                  style={{ backgroundColor: `${colorCodes[index]}` }}
                  onClick={() => handleColorClick(color)}
                ></div>
              ))} */}
              {displayedColors.map((color, index) => {

                  const isTopRow = index < 9; 
                  const isBottomRow = index >= displayedColors.length - 9; 

                  const borderRadiusStyle = {
                    borderTopLeftRadius: isTopRow ? "8px" : "0", // Top-left corner
                    borderTopRightRadius: isTopRow  ? "8px" : "0", // Top-right corner
                    borderBottomLeftRadius: isBottomRow ? "8px" : "0", // Bottom-left corner
                    borderBottomRightRadius: isBottomRow  ? "8px" : "0", // Bottom-right corner
                  };

                  return (
                    <div
                      key={index}
                      className="specific-color"
                      style={{
                        backgroundColor: `${colorCodes[index]}`,
                        ...borderRadiusStyle, 
                      }}
                      onClick={() => handleColorClick(color)}
                    ></div>
                  );
              })}

            </div>
            <div
              className="selected-colors"
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px',
                flexWrap: 'wrap',
                width: '100%',
                height: '40px',
                alignItems: 'center',
                justifyContent: 'center',
                height:'inherit'
              }}
            >
              {selectedColors.map((color, index) => (
                <div
                  key={index}
                  className="selected-color"
                  style={{
                    backgroundColor: color,
                    width: '120px',
                    height: '30px',
                    border: '1px solid #000000',
                  }}
                >
                  <span
                    style={{
                      margin: '-5% 1% 0 0',
                      float: 'right',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={X} alt='X-icon' onClick={() => handleRemoveColor(color)}></img>
                  </span>
                </div>
              ))}
            </div>
            <div
              className="color-input"
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                position: 'relative'
              }}
            >
              <p className='enter-colors'>OR enter the hex code of colours you want.</p>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="ex: #E1483D"
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  width: window.innerWidth<=441 ? '200px':'400px'
                }}
              />
              <button
                onClick={handleAddColor}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#343a40',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '-55px 0px 0px 53.5%'
                }}
              >
                <AddCircleRoundedIcon onClick={handleAddColor} />
              </button>
              <p className='not-sure'>Not sure ? It’s okay!</p>
              <button className='surprise'>surprise me</button>
            </div>
                 </>
               )
            }
            {
              question.answer_type === 'texture' && (
                <>
                <div className="form-group">
                        <span className="font-error valid-error text-purple"></span>
                        
                        <ul className="h-list select-btns grid-view padding-top-20 checkbox-btn-img h-list-check">                            
                            <li className="checkbox checkbox-btn">
                                <input type="checkbox" name="13" value="patterns" id="patterns" className="validThis"></input>
                                <label for="patterns">
                                    <figure className="image-container img-animation">
                                      {
                                        textureImages1.map((images)=>{
                                          return(
                                            <img src={images} alt="Clean"></img>

                                          )
                                        })
                                      }
                                        {/* <img src="assets_user/images/visual-elements/patterns-2.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/patterns-3.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/patterns-4.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/patterns-5.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/patterns-6.png" alt="Clean"></img> */}
                                    </figure>
                                    <span className="button-text">Patterns</span>
                                </label>
                            </li>
                            <li className="checkbox checkbox-btn">
                                <ul className="valid-error text-purple"></ul>
                                <input type="checkbox" name="13" value="textures" id="textures"></input>
                                <label for="textures">
                                    <figure className="image-container img-animation">
                                    {
                                        textureImages2.map((images)=>{
                                          return(
                                            <img src={images} alt="Clean"></img>

                                          )
                                        })
                                      }
                                        {/* <img src="assets_user/images/visual-elements/textures-1.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/textures-2.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/textures-3.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/textures-4.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/textures-5.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/textures-6.png" alt="Clean"></img> */}
                                    </figure>
                                    <span className="button-text">Textures</span>
                                </label>
                            </li>
                            <li className="checkbox checkbox-btn">
                                <ul className="valid-error text-purple"></ul>
                                <input type="checkbox" name="13" value="collages" id="collages"></input>
                                <label for="collages">
                                    <figure className="image-container img-animation">
                                    {
                                        textureImages3.map((images)=>{
                                          return(
                                            <img src={images} alt="Clean"></img>

                                          )
                                        })
                                      }
                                        {/* <img src="assets_user/images/visual-elements/collages-1.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/collages-2.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/collages-3.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/collages-4.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/collages-5.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/collages-6.png" alt="Clean"></img> */}
                                    </figure>
                                    <span className="button-text">
                                        Collages
                                    </span>
                                </label>
                            </li>
                            <li className="checkbox checkbox-btn">
                                <ul className="valid-error text-purple"></ul>
                                <input type="checkbox" name="13" value="cleanvisual" id="cleanvisual"></input>
                                <label for="cleanvisual">
                                    <figure className="image-container img-animation">
                                    {
                                        textureImages4.map((images)=>{
                                          return(
                                            <img src={images} alt="Clean"></img>

                                          )
                                        })
                                      }
                                        {/* <img src="assets_user/images/visual-elements/clean-1.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/clean-2.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/clean-3.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/clean-4.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/clean-5.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/clean-6.png" alt="Clean"></img> */}
                                    </figure>
                                    <span className="button-text">
                                        Clean
                                    </span>
                                </label>
                            </li>
                            <li className="checkbox checkbox-btn">
                                <ul className="valid-error text-purple"></ul>
                                <input type="checkbox" name="13" value="illustrations" id="illustrations"></input>
                                <label for="illustrations">
                                    <figure className="image-container img-animation">
                                    {
                                        textureImages5.map((images)=>{
                                          return(
                                            <img src={images} alt="Clean"></img>

                                          )
                                        })
                                      }
                                        {/* <img src="assets_user/images/visual-elements/illustrations-1.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/illustrations-2.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/illustrations-3.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/illustrations-4.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/illustrations-5.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/illustrations-6.png" alt="Clean"></img> */}
                                    </figure>
                                    <span className="button-text">
                                        Illustrations
                                    </span>
                                </label>
                            </li>
                            <li className="checkbox checkbox-btn">
                                <ul className="valid-error text-purple"></ul>
                                <input type="checkbox" name="13" value="frames" id="frames"></input>
                                <label for="frames">
                                    <figure className="image-container img-animation">
                                    {
                                        textureImages6.map((images)=>{
                                          return(
                                            <img src={images} alt="Clean"></img>

                                          )
                                        })
                                      }
                                        {/* <img src="assets_user/images/visual-elements/frames-1.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/frames-2.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/frames-3.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/frames-4.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/frames-1.png" alt="Clean"></img>
                                        <img src="assets_user/images/visual-elements/frames-3.png" alt="Clean"></img> */}
                                    </figure>
                                    <span className="button-text">
                                        Frames
                                    </span>
                                </label>
                            </li>
                            <li className="checkbox checkbox-btn">
                                <ul className="valid-error text-purple"></ul>
                                <input type="checkbox" name="13" value="surprise me" id="surprisemepatter"></input>
                                <label for="surprisemepatter" className="b-none">                                    
                                    <figure>
                                        <i>Not sure ? It's okay!</i>
                                    </figure>
                                    <span  className="button-text">Surprise me!
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </>
              )
            }
            {
              question.id === 21 ?
              <div
              className="color-input"
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                position: 'relative'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  width: window.innerWidth<=441 ? '200px':'400px'
                }}
              />
              <button
                onClick={handleAddColor}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '-55px 0px 0px 53.5%'
                }}
              >
                <img src={Link}></img>
              </button>
            </div> :''
            }
            <input className="question-input" />
          </div>
        ))}
            
          </>
        }
        bgTitle={'Your visual identity'}
      />
    </div>
  );
};


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { base_url } from '../Auth/BackendAPIUrl';
// import { Questionnaire } from './Questionnaire';
// import { colorCodes } from '../../json/QuestionnaireColorCodes';

// import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// import X from '../../Images/Questionnaire/x icon.png'

// export const Questionnaire4 = () => {
//   const [questions, setQuestions] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]); // To store selected color codes
//   const [inputValue, setInputValue] = useState(''); // For input field

//   const displayedColors = colorCodes.slice(0, 90);

//   const fetchQuestions = async () => {

//     const handleColorClick = (color) => {
//       if (!selectedColors.includes(color)) {
//         setSelectedColors([...selectedColors, color]);
//       }
  
//     };
//     const handleRemoveColor = (color) => {
//       setSelectedColors(selectedColors.filter((c) => c !== color));
//     };
  
//     const handleInputChange = (e) => {
//       setInputValue(e.target.value);
//     };

//     const handleAddColor = (value) => { 
//       if (colorCodes.includes(value) && !selectedColors.includes(value)) {
//         setSelectedColors([...selectedColors, value]);
//       }
//       else {
//         setSelectedColors([...selectedColors,value]);
//       }
//     };
//     try {
//       const response = await axios.get(`${base_url}/api/content?section=brand_questions&page=4`);
//       const questionsJSX = response.data.map((question, index) => (
//         <div className="questions" key={index}>
//           <p className="questions-title">
//             {question.question}
//             <span>
//               <sup>*</sup>
//             </span>
//           </p>
//           {
//             question.answer_type === "color" && (
//               <>
//               <div
//               className="color-grid"
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(9, 1fr)',
//                 margin: '2% 0 0 0',
//                 padding: '0% 10%',
//                 columnGap:'10px'
//               }}
//             >
//               {displayedColors.map((color, index) => (
//                 <div
//                   key={index}
//                   className="specific-color"
//                   style={{ backgroundColor: `${colorCodes[index]}` }}
//                   onClick={() => handleColorClick(color)}
//                 ></div>
//               ))}
//             </div>
//             <div
//               className="selected-colors"
//               style={{
//                 display: 'flex',
//                 gap: '10px',
//                 marginTop: '20px',
//                 flexWrap: 'wrap',
//                 width: '100%',
//                 height: '40px',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             >
//               {selectedColors.map((color, index) => (
//                 <div
//                   key={index}
//                   className="selected-color"
//                   style={{
//                     backgroundColor: color,
//                     width: '120px',
//                     height: '30px',
//                     border: '1px solid #000000',
//                   }}
//                 >
//                   <span
//                     style={{
//                       margin: '-5% 1% 0 0',
//                       float: 'right',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     <img src={X} alt='X-icon' onClick={() => handleRemoveColor(color)}></img>
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <div
//               className="color-input"
//               style={{
//                 marginTop: '20px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: '10px',
//                 position: 'relative'
//               }}
//             >
//               <p className='enter-colors'>OR enter the hex code of colours you want.</p>
//               <input
//                 type="text"
//                 // value={inputValue}
//                 onChange={(e)=>setInputValue(e.target.value.trim())}
//                 placeholder="ex: #E1483D"
//                 style={{
//                   padding: '8px',
//                   border: '1px solid #000000',
//                   outline: 'none',
//                   width: '400px'
//                 }}
//               />
//               <button
//                 onClick={()=>handleAddColor(inputValue)}
//                 style={{
//                   padding: '8px 16px',
//                   backgroundColor: '#343a40',
//                   color: '#fff',
//                   border: 'none',
//                   cursor: 'pointer',
//                   margin: '-55px 0px 0px 53.5%'
//                 }}
//               >
//                 <AddCircleRoundedIcon onClick={()=>handleAddColor(inputValue)} />
//               </button>
//               <p className='not-sure'>Not sure ? It’s okay!</p>
//               <button className='surprise'>surprise me</button>
//             </div>
//             </>
//             )
//           }
//           <input className="question-input" />
          
//         </div>
//       ));
//       setQuestions(questionsJSX);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   useEffect(() => {
//     console.log('11')
//     fetchQuestions();
//   }, []);
//   return (
//     <div>
//       <Questionnaire
//         pageNo={4}
//         questions={
//           <>
//             {questions}
      
//           </>
//         }
//         bgTitle={'Your visual identity'}
//       />
//     </div>
//   );
// };


