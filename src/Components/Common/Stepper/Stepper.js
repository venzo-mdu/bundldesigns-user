import React, { useEffect, useState } from 'react';
import '../Stepper/Stepper.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { questionnaireAction1,questionnaireAction2,questionnaireAction3,questionnaireAction4,questionnaireAction5 } from '../../../Redux/Action';

export const Stepper = ({ pageNo ,formData, answersData , fillId , lang }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeProcess, setActiveProcess] = useState(0);
    const [isActiveProcess, setIsActiveProcess] = useState([false, false, false, false, false]);
    const [lineWidth, setLineWidth] = useState(365); // default for large screens
    const [translateX, setTranslateX] = useState(0);
    const [prevTransx,setTransx] = useState(0)

    const processData = [
        { title:lang === 'ar' ? "عن مشروعك" : "ABOUT YOUR BUSINESS", fill: '#F175AD', color: '#000' },
        { title:lang === 'ar' ? "العملاء والمنافسين" : "AUDIENCE & COMPETITION", fill: '#4FA472', color: '#000' },
        { title:lang === 'ar' ? "هويتك" : "YOUR BRANDING", fill: '#00A8C8', color: '#000' },
        { title:lang === 'ar' ? "هويتك البصرية" : "YOUR IDENTITY", fill: '#FFFFFF', color: '#000' },
        { title:lang === 'ar' ? "اللمسات الأخيرة" : "FINAL TOUCHES", fill: '#F175AD', color: '#000' },
    ];

    // Adjust the dotted line width based on screen size
    const adjustLineWidth = () => {
        let lineWidth;
        let translateXValues = [];
        if (window.innerWidth <= 375) {
            lineWidth = 85;
            translateXValues = lang === 'ar' ? [85, -50, -130, -195, -265] : [-15, 50, 130, 195, 265];
        }
        if (window.innerWidth <= 390) {
            lineWidth = 85;
            translateXValues = lang === 'ar' ? [85, -50, -115, -185, -255]  : [-15, 50, 110, 180, 250];
        }
        else if (window.innerWidth <= 390) {
            lineWidth = 85;
            translateXValues = lang === 'ar' ? [85, -50, -130, -205, -280]  : [-25, 50, 130, 205, 280];
        }
        else if (window.innerWidth <= 425) {
            lineWidth = 85;
            translateXValues = lang === 'ar' ? [95, -50, -130, -205, -285] : [-25, 50, 130, 205, 285];
        }
        else if (window.innerWidth <= 600) {
            lineWidth = 85;
            translateXValues = lang === 'ar' ? [115, -100, -190, -270,-340] : [15, 100, 190, 270, 340];
        } 
        else if (window.innerWidth <= 768) {
            lineWidth = 150;
            translateXValues = lang === 'ar' ? [0, -160, -300, -450, -600] : [0, 160, 300, 450, 600];
        } 
        else if (window.innerWidth <= 1024) {
            lineWidth = 180;
            translateXValues =  lang === 'ar' ? [0, -340, -395, -575, -780] : [0, 340, 395, 575, 780];
        } 
        else if (window.innerWidth === 1440) {
            lineWidth = 250;
            translateXValues = lang === 'ar' ? [0, -275, -540, -810, -1090] : [0, 275, 540, 810, 1090];
        }
        else if (window.innerWidth === 1536) {
            lineWidth = 290;
            translateXValues = lang === 'ar' ? [-5, -300, -580, -875, -1170] : [5, 300, 580, 875, 1170];
        }
        else if (window.innerWidth <= 1705) {
            lineWidth = 250;
            translateXValues = lang === 'ar' ? [200, -260, -510, -770, -1025]  : [0, 265, 510, 770, 1025];
        } 
        else {
            lineWidth = 365;
            translateXValues = lang === 'ar' ? [270, -380, -750,-1110 ,-1470] : [0, 380, 750,1110 ,1470];
        }
    
        // Set the line width
        const transX = localStorage.getItem('transx');
        if(transX){
            setTransx(transX)
        }
        setLineWidth(lineWidth);
        // Set translateX based on the activeProcess
        if (activeProcess >= 0 && activeProcess < translateXValues.length) {
            setTranslateX(translateXValues[activeProcess]);
            if(translateXValues[activeProcess]>0){
                localStorage.setItem('transx',translateXValues[activeProcess]);
            }
        }
    };


    useEffect(() => {
        setActiveProcess(pageNo - 1);
        updateActiveProcess(pageNo - 1);
        adjustLineWidth();
    }, [pageNo, activeProcess]);

    const updateActiveProcess = (index) => {
        const updatedActiveProcess = isActiveProcess.map((_, i) => i <= index);
        setIsActiveProcess(updatedActiveProcess);
    };
    // useEffect(() => {
    //     // This will run whenever translateX changes, updating prevTransx accordingly
    //     setTransx(translateX);
    // }, [translateX]);
    
    const animationName = `moveRight-${prevTransx}-${translateX}`;
    const answers1 = useSelector((state) => state.questionnaire1);
    const answers2 = useSelector((state) => state.questionnaire2);
    const answers3 = useSelector((state) => state.questionnaire3);
    const answers4 = useSelector((state) => state.questionnaire4);
    const answers5 = useSelector((state) => state.questionnaire5);


    const getStoreAnswers = (page) => {
        switch (page) {
          case 1:
            return answers1;
          case 2:
            return answers2;
          case 3:
            return answers3;
          case 4:
            return answers4;
          case 5:
            return answers5;  
          default:
            return {}; // Return an empty object if no matching page is found
        }
      };

    const handleRoute = (page) => {
            //   dispatch(questionnaireAction1(formData));
            const reduxact = {
                1: questionnaireAction1,
                2: questionnaireAction2,
                3: questionnaireAction3,
                4: questionnaireAction4,
                5: questionnaireAction5,
              };
              
              if (reduxact[page]) {
                dispatch(reduxact[page](formData));
              } else {
                console.error(`No action found for page: ${page}`);
              }
        navigate(`/questionnaire/${page}`, {
            state: {
                [`questionnaireData${page}`]: getStoreAnswers(page),
                orderId:fillId,
                pageNo:page
            },
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });

    };
    

    return (
        <div className="stepper relative" >
            {processData.map((process, index) => (
                <div
                    // onClick={()=>handleRoute(index+1)}
                    key={index}
                    className={`flower ${activeProcess === index ? "active-flower" : ""}`}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <svg
                        style={{ fill: 'rgb(0,0,0)' }}
                        width="35" className="ash" height="35" viewBox="0 0 35 35"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z" fill={isActiveProcess[index] ? 'black' : 'grey'} />
                    </svg>
                    {index === 4 ? '' : (
                        <svg
                            style={{ opacity: isActiveProcess[index + 1] ? 1 : 0.3, margin: '1% 0 0 0' }}
                            className="dotted-line" width={lineWidth} height="3" viewBox={`0 0 ${lineWidth} 3`}
                            fill="black" xmlns="http://www.w3.org/2000/svg"
                        >
                            <line x1="0" y1="1.5" x2={lineWidth} y2="1.5" stroke="black" strokeWidth="2" strokeDasharray="10 10" />
                        </svg>
                    )}
                    <div
                        className="content_section"
                        style={{ transition: '1s', opacity: isActiveProcess[index] ? 1 : 0.3 }}
                    >
                        {process.title.split("  ").map((word, i) => (
                            <span className='xl:text-[14px] lg:text-[14px] md:text-[14px] font-[700] xs:text-[10px]' 
                            // onClick={()=>handleRoute(index+1)} 
                            key={i}>{word}</span>
                        ))}
                    </div>
                </div>
            ))}
            <svg 
                className={`rocket overlay ${activeProcess === 0 ? lang === 'ar' ? '!lg:right-[10%] !md:right-[10%] !xs:right-0' : '!lg:left-[10%] !md:left-[10%] !xs:left-0' : lang === 'ar' ? '!right-[9%]' :'!left-[9%]' }`}
                style={lang === 'ar' ?{ animation: `${animationName} 2s forwards`, margin: '1% 0px 0 -150px'} :{ animation: `${animationName} 2s forwards`, margin: '1% -150px 0 0' }}
                width="103" height="51" viewBox="0 0 103 51" fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                    <style>
                {lang === 'ar' ? `
                 @keyframes ${animationName} {
                        0% { transform: translateX(${prevTransx}px) scaleX(-1); }
                        100% { transform: translateX(${translateX}px) scaleX(-1); }
                    }
                ` :`
                    @keyframes ${animationName} {
                        0% { transform: translateX(${prevTransx}px); }
                        100% { transform: translateX(${translateX}px); }
                    }
                `}
            </style>
                <g style={{ mixBlendMode: "multiply" }}>
                    <path
                        d="M17.0243 20.1751L0.10283 39.9605L20.7547 38.3386L33.3441 50.4381L52.0055 44.0664L53.6119 42.9629L58.3442 42.0547L63.9225 39.9665L76.0922 37.2171L100.775 30.1494L102.466 29.1142L102.303 27.853L101.161 27.3343L72.3146 16.0341L49.3982 6.77805L32.8747 0.593947L28.2324 6.28473L25.3511 9.71008L23.2039 11.6917L20.7801 14.6193L19.3632 15.5849L21.3765 19.2735L21.7309 21.025L17.0243 20.1751Z"
                        fill={processData[activeProcess].fill}
                    />
                </g>
            </svg>
        </div>
    );
};
