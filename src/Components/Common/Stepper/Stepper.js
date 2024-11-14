
// import React, { useEffect, useState } from 'react';
// import '../Stepper/Stepper.css'

// export const Stepper = ({ pageNo }) => {
//     const [activeProcess, setActiveProcess] = useState(0);
//     const [isActiveProcess, setIsActiveProcess] = useState([false, false, false, false, false]);

//     const translateX = activeProcess * (window.innerWidth <= 475 ? 85 : window.innerWidth <= 768 ? 150 : 195);
    
//     const processData = [
//         { title: "ABOUT YOUR BUSINESS", fill: '#4FA472', color: '#000' },
//         { title: "AUDIENCE & COMPETITION", fill: '#00A8C8', color: '#000' },
//         { title: "YOUR BRANDING", fill: '#F175AD', color: '#000' },
//         { title: "VISUAL IDENTITY", fill: '#4FA472', color: '#000' },
//         { title: "FINAL TOUCHES", fill: '#00A8C8', color: '#000' },
//     ];

//     useEffect(() => {
//         setActiveProcess(pageNo-1);
//         updateActiveProcess(pageNo-1);
//     }, [pageNo]);

//     const updateActiveProcess = (index) => {
//         const updatedActiveProcess = isActiveProcess.map((_, i) => i <= index);
//         setIsActiveProcess(updatedActiveProcess);
//     };

//     return (
//         <>
//         <div className='stepper'>

//                     {processData.map((process, index) => (
//                         <div
//                             key={index}
//                             className={`flower ${activeProcess === index ? "active-flower" : ""}`}
//                             style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//                         >
//                             <svg style={{ fill: 'rgb(0,0,0)' }}
//                                 width="35" className="ash" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M8.03907 32.2075L3.09615 27.3207L9.21812 21.2682L0.571776 21.2682L0.571778 14.3639L9.21811 14.3639L3.09614 8.31139L8.03907 3.42457L14.161 9.47706L14.161 0.928853H21.1446V9.47706L27.2666 3.42457L32.2095 8.31139L26.0875 14.3639H34.7339L34.7339 21.2682L26.0875 21.2682L32.2095 27.3207L27.2666 32.2075L21.1446 26.155L21.1446 34.7032L14.161 34.7032L14.161 26.155L8.03907 32.2075Z"
//                                     fill={isActiveProcess[index] ? 'black' : 'grey'} />
//                             </svg>
//                             {index === 4 ? '' :
//                                 <svg style={{ opacity: isActiveProcess[index + 1] ? 1 : 0.3 }} className="dotted-line" width="193" height="3" viewBox="0 0 193 3" fill="black" xmlns="http://www.w3.org/2000/svg">
//                                     <line x1="0.128418" y1="1.42773" x2="192.397" y2="1.42773" stroke="black" fill='#000' strokeWidth="2" strokeDasharray="10 10" />
//                                 </svg>
                                
//                             }
//                             <div className="content_section" style={{ transition: '1s', opacity: isActiveProcess[index] ? 1 : 0.3 }}>
//                                 {process.title.split("  ").map((word, i) => (
//                                     <span key={i}>{word}</span>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 <svg className="rocket overlay" style={{ transform: `translateX(${translateX}px)`,margin:'1% 0 0 0' }} width="103" height="51" viewBox="0 0 103 51" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <g style={{ mixBlendMode: "multiply" }}>
//                         <path d="M17.0243 20.1751L0.10283 39.9605L20.7547 38.3386L33.3441 50.4381L52.0055 44.0664L53.6119 42.9629L58.3442 42.0547L63.9225 39.9665L76.0922 37.2171L100.775 30.1494L102.466 29.1142L102.303 27.853L101.161 27.3343L72.3146 16.0341L49.3982 6.77805L32.8747 0.593947L28.2324 6.28473L25.3511 9.71008L23.2039 11.6917L20.7801 14.6193L19.3632 15.5849L21.3765 19.2735L21.7309 21.025L17.0243 20.1751Z" fill={processData[activeProcess].fill} />
//                     </g>
//                 </svg>
//         </div>

//         </>
//     )
// };

import React, { useEffect, useState } from 'react';
import '../Stepper/Stepper.css';

export const Stepper = ({ pageNo }) => {
    const [activeProcess, setActiveProcess] = useState(0);
    const [isActiveProcess, setIsActiveProcess] = useState([false, false, false, false, false]);
    const [lineWidth, setLineWidth] = useState(195); // default for large screens

    // Calculate translateX based on activeProcess
    const translateX = activeProcess * (window.innerWidth <= 475 ? 85 : window.innerWidth <= 768 ? 150 : lineWidth);

    const processData = [
        { title: "ABOUT YOUR BUSINESS", fill: '#4FA472', color: '#000' },
        { title: "AUDIENCE & COMPETITION", fill: '#00A8C8', color: '#000' },
        { title: "YOUR BRANDING", fill: '#F175AD', color: '#000' },
        { title: "VISUAL IDENTITY", fill: '#4FA472', color: '#000' },
        { title: "FINAL TOUCHES", fill: '#00A8C8', color: '#000' },
    ];

    // Adjust the dotted line width based on screen size
    const adjustLineWidth = () => {
        if (window.innerWidth <= 475) {
            setLineWidth(85);
        } else if (window.innerWidth <= 768) {
            setLineWidth(150);
        } else if (window.innerWidth <= 1705) {
            setLineWidth(170); // Adjusted width for screens up to 1705px
        } else {
            setLineWidth(195); // Default width for larger screens
        }
    };

    useEffect(() => {
        setActiveProcess(pageNo - 1);
        updateActiveProcess(pageNo - 1);
        adjustLineWidth();
        // window.addEventListener('resize', adjustLineWidth);
        // return () => window.removeEventListener('resize', adjustLineWidth);
    }, [pageNo]);

    const updateActiveProcess = (index) => {
        const updatedActiveProcess = isActiveProcess.map((_, i) => i <= index);
        setIsActiveProcess(updatedActiveProcess);
    };

    return (
        <div className="stepper">
            {processData.map((process, index) => (
                <div
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
                            style={{ opacity: isActiveProcess[index + 1] ? 1 : 0.3 }}
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
                        {process.title.split(" ").map((word, i) => (
                            <span key={i}>{word}</span>
                        ))}
                    </div>
                </div>
            ))}
            <svg
                className="rocket overlay"
                style={{ transform: `translateX(${translateX}px)`, margin: '1% 0 0 0' }}
                width="103" height="51" viewBox="0 0 103 51" fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
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
