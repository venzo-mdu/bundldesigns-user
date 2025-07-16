// import React, { useState, useEffect } from "react";
// import "../Login/Login.css";
// import Loginlogo from "../../../Images/Login/loginlogo.svg";
// import { Footer } from "../../Common/Footer/Footer";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginAction } from "../../../Redux/Action";
// import axios from "axios";
// import AppleSignin from "react-apple-signin-auth";
// import { base_url } from "../BackendAPIUrl";
// import { useGoogleLogin } from "@react-oauth/google";
// import ClipLoader from "react-spinners/ClipLoader";
// import { auth } from "../../Firebase/Firebase";
// import { OAuthProvider, signInWithPopup } from "firebase/auth";

// export const Login = ({ lang }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const next_url = searchParams.get("next_url");
//   const { project_name } = location?.state || {};
//   const clientId = process.env.REACT_APP_IOS_CLIENTID;
//   const redirectURI = process.env.REACT_APP_IOS_REDIRECT_URL;

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//     is_social_login: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loginError, setLoginError] = useState(false);

//   useEffect(() => {
//     document.documentElement.scrollTo({
//       top: 0,
//       left: 0,
//     });
//   }, []);

//   useEffect(() => {
//     const direction = lang === "ar" ? "rtl" : "ltr";
//     if (document.body.dir !== direction) {
//       document.body.dir = direction;
//     }
//   }, [lang]);

//   useEffect(() => {
//     const originalAuth = window.AppleID?.auth;
//     window.AppleID.auth = {
//       ...originalAuth,
//       init: (config) => {
//         console.log("Apple auth initialized", config);
//         return originalAuth.init(config);
//       },
//     };

//     return () => {
//       window.AppleID.auth = originalAuth;
//     };
//   }, []);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       console.log("Token Response:", tokenResponse);

//       const accessToken = tokenResponse.access_token; // Correct way to extract token
//       fetch(
//         `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
//       )
//         .then((res) => res.json())
//         .then((userDetails) => {
//           console.log("User Details:", userDetails);

//           loginWithGoogle({
//             email: userDetails.email,
//             full_name: userDetails.name,
//             password: null,
//             is_social_login: true,
//           });
//         })
//         .catch((err) => console.error("Error fetching user details:", err));
//     },
//     onError: () => {
//       console.log("Login Failed");
//     },
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Update the login data state
//     setLoginData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     // Helper function to set errors
//     const setError = (field, errorMessage) => {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [field]: errorMessage,
//       }));
//     };

//     // Email validation
//     if (name === "email") {
//       if (!value.trim()) {
//         setError(
//           "email",
//           lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required"
//         );
//       } else {
//         setError("email", "");
//       }
//     }

//     // Password validation
//     if (name === "password") {
//       if (/\s/.test(value)) {
//         // Check for spaces
//         setError(
//           "password",
//           lang === "ar"
//             ? "لا يمكن أن تحتوي كلمة المرور على مسافات"
//             : "Password cannot contain spaces"
//         );
//       } else if (!value.trim()) {
//         setError(
//           "password",
//           lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required"
//         );
//       } else {
//         setError("password", ""); // clear error if password is valid
//       }
//     }
//   };
//   const validateForm = () => {
//     const errorMessages = {};
//     if (!loginData.email.trim()) {
//       errorMessages.email =
//         lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
//     } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginData.email)) {
//       errorMessages.email =
//         lang === "ar"
//           ? "تنسيق البريد الإلكتروني غير صالح"
//           : "Invalid email format";
//     }
//     if (!loginData.password.trim()) {
//       errorMessages.password =
//         lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
//     } else if (/\s/.test(loginData.password)) {
//       errorMessages.password = 
//       lang === "ar" ? "لا يمكن أن تحتوي كلمة المرور على مسافات" : "Password must not contain spaces";
//     } else if (loginData.password.length > 16) {
//       errorMessages.password = 
//       lang === "ar" ? "يجب أن تكون كلمة المرور 16 أحرف على الأقل":"Password must be at most 16 characters long";
//     }
//     setErrors(errorMessages);
//     return Object.keys(errorMessages).length === 0;
//   };

//   const loginWithGoogle = async (data) => {
//     try {
//       const response = await axios.post(`${base_url}/api/login/`, data);
//       if (response.status === 200) {
//         document.cookie = `token=${
//           response?.data?.data.token || ""
//         }; path=/; SameSite=None; Secure`;
//         dispatch(loginAction(response.data.user));
//         console.log(next_url);
//         if (next_url) {
//           navigate(`/${next_url}`, {
//             state: {
//               project_name: project_name,
//               fromLogin: true,
//             },
//           });
//         } else {
//           navigate("/");
//         }
//       }
//     } catch (response) {
//       setLoginError(response.response.data.data);
//     }
//   };

//   const [widthClass, setWidthClass] = useState("w-full");

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;

//       if (width > 641 && width < 768) {
//         setWidthClass("w-[460px]");
//       } else if (width >= 768 && width < 1024) {
//         setWidthClass("w-[552px]");
//       } else if (width >= 1024 && width < 1399) {
//         setWidthClass("w-[526px]");
//       } else if (width >= 1440) {
//         setWidthClass("w-[525px]");
//       } else {
//         setWidthClass("w-full");
//       }
//     };
//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleAppleLogin = async () => {
//     const provider = new OAuthProvider("apple.com");
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       console.log("Apple user:", user);

//       if (user?.accessToken) {
//         const data = {
//           email: user?.auth?.currentUser?.email,
//           full_name: user?.auth?.currentUser?.email?.split("@")[0],
//           password: null,
//           is_social_login: true,
//         };
//         const response = await axios.post(`${base_url}/api/login/`, data);
//         if (response.status === 200) {
//           document.cookie = `token=${
//             response?.data?.data.token || ""
//           }; path=/; SameSite=None; Secure`;
//           dispatch(loginAction(response.data.user));
//           console.log(next_url);
//           if (next_url) {
//             navigate(`/${next_url}`, {
//               state: {
//                 project_name: project_name,
//                 fromLogin: true,
//               },
//             });
//           } else {
//             navigate("/");
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Apple sign-in failed:", error.message);
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(`${base_url}/api/login/`, loginData);
//       console.log(response);
//       if (response.status === 200) {
//         document.cookie = `token=${
//           response?.data?.data.token || ""
//         }; path=/; SameSite=None; Secure`;
//         dispatch(loginAction(response.data.user));
//         if (next_url) {
//           navigate(`/${next_url}`, {
//             state: {
//               project_name: project_name,
//               fromLogin: true,
//             },
//           });
//         } else {
//           navigate("/");
//         }
//       }
//     } catch (response) {
//       setLoginError(response.response.data.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="login !mb-[8rem] ">
//         {/* <img className='anchor w-[100px]' src={loginGIF} alt='login-anchor' /> */}
//         <div className="login-content ">
//           <p className="welcometext">
//             {lang === "ar" ? "مرحبا بكم مجددا" : "Welcome Back!"}
//           </p>
//           <a className="login-brand" href="/">
//             <img className="loginlogo" src={Loginlogo} alt="login" />
//           </a>
//           {/* < div> */}
//           <form onSubmit={onSubmit} className="lg:mt-0 md:mt-0 xs:mt-[8%]">
//             <div>
//               <label className="xs:mb-2">
//                 {lang === "ar" ? "البريد الإلكتروني" : "Email address"}{" "}
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder={
//                   lang === "ar" ? " بريد إلكتروني" : "Enter your email"
//                 }
//                 value={loginData.email}
//                 onChange={handleChange}
//                 className="rounded-none"
//               />
//               {errors.email && <p className="error">{errors.email}</p>}
//               <label className="xs:mb-2" style={{ marginTop: "3%" }}>
//                 {lang === "ar" ? "كلمة المرور" : "Password"}
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder={lang === "ar" ? " كلمة المرور" : "Password"}
//                 value={loginData.password}
//                 onChange={handleChange}
//                 className="rounded-none"
//               />
//               {errors.password && <p className="error">{errors.password}</p>}

//               {/* General error message */}
//               {errors.general && <p className="error">{errors.general}</p>}

//               {loginData.password && loginError && (
//                 <p className="text-[#D83D99] error mb-1">
//                   {lang === "ar" ? "بيانات اعتماد غير صالحة" : loginError}
//                 </p>
//               )}

//               <button className="signin !text-[24px] uppercase" type="submit">
//                 {loading ? (
//                   <ClipLoader size={25} color={"#FFFFFF"} />
//                 ) : lang === "ar" ? (
//                   "تسجيل دخول"
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//               <div className={` flex forgotpass justify-end ${widthClass}`}>
//                 <NavLink
//                   to="/forgotpassword-mail"
//                   className="text-black text-[18px] no-underline 
//                hover:no-underline hover:text-black 
//                focus:text-black active:text-black 
//                visited:text-black"
//                 >
//                   {lang === "ar" ? "هل نسيت كلمة المرور؟" : "Forgot Password?"}
//                 </NavLink>
//               </div>
//             </div>

//             <p
//               className={`or mt-[4vh] flex items-center justify-center ${
//                 lang === "ar" ? "mr-2" : "ml-2"
//               } font-[500] text-[11px]`}
//             >
//               {" "}
//               <span className="border-[#F5F5F5] border-b h-[2px] basis-[41%] mr-[2%] border-[1.5px]"></span>
//               {lang === "ar" ? "أو" : "Or"}
//               <span
//                 className={`border-[#F5F5F5] border-b h-[2px] basis-[43%] ${
//                   lang === "ar" ? "mr-[2%]" : "ml-[2%]"
//                 } border-[1.5px]`}
//               ></span>
//             </p>
//             <p className="signinwithgoogle !text-[17px] !font-bold">
//               {/* <img src={Googleicon} alt='google-icon' /> Sign in with Google */}
//               <div className="lg:w-[50%] md:w-[45%] xs:w-[100%]">
//                 <button
//                   onClick={login}
//                   type="button"
//                   style={{
//                     backgroundColor: "white",
//                     padding: 10,
//                     fontFamily: "none",
//                     lineHeight: "25px",
//                     fontSize: window?.innerWidth <= 500 ? "12px" : "18px",
//                     border: "1px solid #D9D9D9",
//                     borderRadius: "0px",
//                     fontFamily: "Helvetica",
//                     fontWeight: "400",
//                     width: "100%",
//                   }}
//                 >
//                   {/* <img src={GoogleIcon} className='w-[25px] mr-2'></img> */}
//                   <i
//                     class={`fab fa-google ${lang === "ar" ? "ml-2" : "mr-2"}`}
//                   ></i>
//                   {lang === "ar" ? "تسجيل دخول جوجل" : "Sign in with Google"}
//                 </button>
//               </div>
//               <div
//                 className={`lg:w-[50%] md:w-[45%] xs:w-[100%] ${
//                   lang == "ar" ? "mr-[5%]" : "ml-[5%]"
//                 }`}
//               >
//                 <AppleSignin
//                   authOptions={{
//                     clientId: clientId,
//                     redirectURI: redirectURI,
//                     scope: "email name",
//                     usePopup: true,
//                     responseType: "code id_token",
//                     responseMode: "form_post",
//                   }}
//                   onError={(error) =>
//                     console.error("Apple Login Failed:", error)
//                   }
//                   onClick={handleAppleLogin}
//                   render={(props) => (
//                     <button
//                       {...props}
//                       type="button"
//                       style={{
//                         backgroundColor: "white",
//                         padding: 10,
//                         fontFamily: "none",
//                         lineHeight: "25px",
//                         fontSize: window?.innerWidth <= 500 ? "12px" : "18px",
//                         border: "1px solid #D9D9D9",
//                         borderRadius: "0px",
//                         fontFamily: "Helvetica",
//                         fontWeight: "400",
//                         width: "100%",
//                       }}
//                     >
//                       <i className="fa-brands fa-apple px-2 "></i>
//                       {lang === "ar" ? "تسجيل دخول أبل" : "Sign in with Apple"}
//                     </button>
//                   )}
//                 />
//               </div>
//             </p>
//             <p className="dont !mt-4 w-[100%] sm:w-[100%] xs:w-full">
//               {lang === "ar" ? "ليس لديك حساب؟" : "Don’t Have an account ?"}{" "}
//               <span>
//                 <NavLink className="signup !font-[500]" to={"/signup"}>
//                   &nbsp;{lang === "ar" ? "تسجيل حساب" : "Sign Up"}
//                 </NavLink>
//               </span>
//             </p>
//           </form>
//         </div>
//       </div>
//       <Footer isLang={lang} />
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import Loginlogo from "../../../Images/Login/loginlogo.svg";
import { Footer } from "../../Common/Footer/Footer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../Redux/Action";
import axios from "axios";
import AppleSignin from "react-apple-signin-auth";
import { base_url } from "../BackendAPIUrl";
import { useGoogleLogin } from "@react-oauth/google";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "../../Firebase/Firebase";
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { ConfigToken } from "../ConfigToken";

export const Login = ({ lang }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const next_url = searchParams.get("next_url");
  const { project_name } = location?.state || {};
  const clientId = process.env.REACT_APP_IOS_CLIENTID;
  const redirectURI = process.env.REACT_APP_IOS_REDIRECT_URL;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    is_social_login: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  useEffect(() => {
    const direction = lang === "ar" ? "rtl" : "ltr";
    if (document.body.dir !== direction) {
      document.body.dir = direction;
    }
  }, [lang]);

  useEffect(() => {
    const originalAuth = window.AppleID?.auth;
    window.AppleID.auth = {
      ...originalAuth,
      init: (config) => {
        console.log("Apple auth initialized", config);
        return originalAuth.init(config);
      },
    };

    return () => {
      window.AppleID.auth = originalAuth;
    };
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Token Response:", tokenResponse);

      const accessToken = tokenResponse.access_token; // Correct way to extract token
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((userDetails) => {
          console.log("User Details:", userDetails);

          loginWithGoogle({
            email: userDetails.email,
            full_name: userDetails.name,
            password: null,
            is_social_login: true,
          });
        })
        .catch((err) => console.error("Error fetching user details:", err));
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the login data state
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Helper function to set errors
    const setError = (field, errorMessage) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMessage,
      }));
    };

    // Email validation
    if (name === "email") {
      if (!value.trim()) {
        setError(
          "email",
          lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required"
        );
      } else {
        setError("email", "");
      }
    }

    // Password validation
    if (name === "password") {
      if (/\s/.test(value)) {
        // Check for spaces
        setError(
          "password",
          lang === "ar"
            ? "لا يمكن أن تحتوي كلمة المرور على مسافات"
            : "Password cannot contain spaces"
        );
      } else if (!value.trim()) {
        setError(
          "password",
          lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required"
        );
      } else {
        setError("password", ""); // clear error if password is valid
      }
    }
  };
  const validateForm = () => {
    const errorMessages = {};
    if (!loginData.email.trim()) {
      errorMessages.email =
        lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginData.email)) {
      errorMessages.email =
        lang === "ar"
          ? "تنسيق البريد الإلكتروني غير صالح"
          : "Invalid email format";
    }
    if (!loginData.password.trim()) {
      errorMessages.password =
        lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    } else if (/\s/.test(loginData.password)) {
      errorMessages.password = 
      lang === "ar" ? "لا يمكن أن تحتوي كلمة المرور على مسافات" : "Password must not contain spaces";
    } else if (loginData.password.length > 16) {
      errorMessages.password = 
      lang === "ar" ? "يجب أن تكون كلمة المرور 16 أحرف على الأقل":"Password must be at most 16 characters long";
    }
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

const loginWithGoogle = async (data) => {
  try {
    const response = await axios.post(`${base_url}/api/login/`, data);
    if (response.status === 200) {
      document.cookie = `token=${
        response?.data?.data.token || ""
      }; path=/; SameSite=None; Secure`;
      dispatch(loginAction(response.data.user));
      
      console.log(next_url);
      if (next_url) {
        // Check if there's a saved payload that should be processed
        const savedPayload = localStorage.getItem("payloads");
        if (savedPayload && next_url.includes('bundldetail')) {
          // Instead of going back to bundle detail, process the saved payload directly
          try {
            const payload = JSON.parse(savedPayload);
            const createResponse = await axios.post(
              `${base_url}/api/order/create/`,
              payload,
              ConfigToken()
            );
            navigate("/mycart", {
              state: { 
                orderData: createResponse.data.data.data, 
                selectedLanguage: payload.language 
              },
            });
            // Clear the saved payload after successful processing
            localStorage.removeItem("payloads");
            return;
          } catch (error) {
            console.error("Error processing saved payload:", error);
            // If processing fails, fall back to normal navigation
          }
        }
        
        navigate(`/${next_url}`, {
          state: {
            project_name: project_name,
            fromLogin: true,
          },
        });
      } else {
        navigate("/");
      }
    }
  } catch (response) {
    setLoginError(response.response.data.data);
  }
};
  const [widthClass, setWidthClass] = useState("w-full");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 641 && width < 768) {
        setWidthClass("w-[460px]");
      } else if (width >= 768 && width < 1024) {
        setWidthClass("w-[552px]");
      } else if (width >= 1024 && width < 1399) {
        setWidthClass("w-[526px]");
      } else if (width >= 1440) {
        setWidthClass("w-[525px]");
      } else {
        setWidthClass("w-full");
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAppleLogin = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Apple user:", user);

      if (user?.accessToken) {
        const data = {
          email: user?.auth?.currentUser?.email,
          full_name: user?.auth?.currentUser?.email?.split("@")[0],
          password: null,
          is_social_login: true,
        };
        const response = await axios.post(`${base_url}/api/login/`, data);
        if (response.status === 200) {
          document.cookie = `token=${
            response?.data?.data.token || ""
          }; path=/; SameSite=None; Secure`;
          dispatch(loginAction(response.data.user));
          console.log(next_url);
          if (next_url) {
            navigate(`/${next_url}`, {
              state: {
                project_name: project_name,
                fromLogin: true,
              },
            });
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.error("Apple sign-in failed:", error.message);
    }
  };

const onSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);
  try {
    const response = await axios.post(`${base_url}/api/login/`, loginData);
    console.log(response);
    if (response.status === 200) {
      document.cookie = `token=${
        response?.data?.data.token || ""
      }; path=/; SameSite=None; Secure`;
      dispatch(loginAction(response.data.user));
      
      if (next_url) {
        // Check if there's a saved payload that should be processed
        const savedPayload = localStorage.getItem("payloads");
        if (savedPayload && next_url.includes('bundldetail')) {
          try {
            const payload = JSON.parse(savedPayload);
            const createResponse = await axios.post(
              `${base_url}/api/order/create/`,
              payload,
              ConfigToken()
            );
            navigate("/mycart", {
              state: { 
                orderData: createResponse.data.data.data, 
                selectedLanguage: payload.language 
              },
            });
            localStorage.removeItem("payloads");
            return;
          } catch (error) {
            console.error("Error processing saved payload:", error);
          }
        }
        
        navigate(`/${next_url}`, {
          state: {
            project_name: project_name,
            fromLogin: true,
          },
        });
      } else {
        navigate("/");
      }
    }
  } catch (response) {
    setLoginError(response.response.data.data);
  } finally {
    setLoading(false);
  }
};
  return (
    <div>
      <div className="login !mb-[8rem] ">
        {/* <img className='anchor w-[100px]' src={loginGIF} alt='login-anchor' /> */}
        <div className="login-content ">
          <p className="welcometext">
            {lang === "ar" ? "مرحبا بكم مجددا" : "Welcome Back!"}
          </p>
          <a className="login-brand" href="/">
            <img className="loginlogo" src={Loginlogo} alt="login" />
          </a>
          {/* < div> */}
          <form onSubmit={onSubmit} className="lg:mt-0 md:mt-0 xs:mt-[8%]">
            <div>
              <label className="xs:mb-2">
                {lang === "ar" ? "البريد الإلكتروني" : "Email address"}{" "}
              </label>
              <input
                type="email"
                name="email"
                placeholder={
                  lang === "ar" ? " بريد إلكتروني" : "Enter your email"
                }
                value={loginData.email}
                onChange={handleChange}
                className="rounded-none"
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <label className="xs:mb-2" style={{ marginTop: "3%" }}>
                {lang === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <input
                type="password"
                name="password"
                placeholder={lang === "ar" ? " كلمة المرور" : "Password"}
                value={loginData.password}
                onChange={handleChange}
                className="rounded-none"
              />
              {errors.password && <p className="error">{errors.password}</p>}

              {/* General error message */}
              {errors.general && <p className="error">{errors.general}</p>}

              {loginData.password && loginError && (
                <p className="text-[#D83D99] error mb-1">
                  {lang === "ar" ? "بيانات اعتماد غير صالحة" : loginError}
                </p>
              )}

              <button className="signin !text-[24px] uppercase" type="submit">
                {loading ? (
                  <ClipLoader size={25} color={"#FFFFFF"} />
                ) : lang === "ar" ? (
                  "تسجيل دخول"
                ) : (
                  "Sign In"
                )}
              </button>
              <div className={` flex forgotpass justify-end ${widthClass}`}>
                <NavLink
                  to="/forgotpassword-mail"
                  className="text-black text-[18px] no-underline 
               hover:no-underline hover:text-black 
               focus:text-black active:text-black 
               visited:text-black"
                >
                  {lang === "ar" ? "هل نسيت كلمة المرور؟" : "Forgot Password?"}
                </NavLink>
              </div>
            </div>

            <p
              className={`or mt-[4vh] flex items-center justify-center ${
                lang === "ar" ? "mr-2" : "ml-2"
              } font-[500] text-[11px]`}
            >
              {" "}
              <span className="border-[#F5F5F5] border-b h-[2px] basis-[41%] mr-[2%] border-[1.5px]"></span>
              {lang === "ar" ? "أو" : "Or"}
              <span
                className={`border-[#F5F5F5] border-b h-[2px] basis-[43%] ${
                  lang === "ar" ? "mr-[2%]" : "ml-[2%]"
                } border-[1.5px]`}
              ></span>
            </p>
            <p className="signinwithgoogle !text-[17px] !font-bold">
              {/* <img src={Googleicon} alt='google-icon' /> Sign in with Google */}
              <div className="lg:w-[50%] md:w-[45%] xs:w-[100%]">
                <button
                  onClick={login}
                  type="button"
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    fontFamily: "none",
                    lineHeight: "25px",
                    fontSize: window?.innerWidth <= 500 ? "12px" : "18px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "0px",
                    fontFamily: "Helvetica",
                    fontWeight: "400",
                    width: "100%",
                  }}
                >
                  {/* <img src={GoogleIcon} className='w-[25px] mr-2'></img> */}
                  <i
                    class={`fab fa-google ${lang === "ar" ? "ml-2" : "mr-2"}`}
                  ></i>
                  {lang === "ar" ? "تسجيل دخول جوجل" : "Sign in with Google"}
                </button>
              </div>
              <div
                className={`lg:w-[50%] md:w-[45%] xs:w-[100%] ${
                  lang == "ar" ? "mr-[5%]" : "ml-[5%]"
                }`}
              >
                <AppleSignin
                  authOptions={{
                    clientId: clientId,
                    redirectURI: redirectURI,
                    scope: "email name",
                    usePopup: true,
                    responseType: "code id_token",
                    responseMode: "form_post",
                  }}
                  onError={(error) =>
                    console.error("Apple Login Failed:", error)
                  }
                  onClick={handleAppleLogin}
                  render={(props) => (
                    <button
                      {...props}
                      type="button"
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        fontFamily: "none",
                        lineHeight: "25px",
                        fontSize: window?.innerWidth <= 500 ? "12px" : "18px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "0px",
                        fontFamily: "Helvetica",
                        fontWeight: "400",
                        width: "100%",
                      }}
                    >
                      <i className="fa-brands fa-apple px-2 "></i>
                      {lang === "ar" ? "تسجيل دخول أبل" : "Sign in with Apple"}
                    </button>
                  )}
                />
              </div>
            </p>
            <p className="dont !mt-4 w-[100%] sm:w-[100%] xs:w-full">
              {lang === "ar" ? "ليس لديك حساب؟" : "Don’t Have an account ?"}{" "}
              <span>
                <NavLink className="signup !font-[500]" to={"/signup"}>
                  &nbsp;{lang === "ar" ? "تسجيل حساب" : "Sign Up"}
                </NavLink>
              </span>
            </p>
          </form>
        </div>
      </div>
      <Footer isLang={lang} />
    </div>
  );
};



