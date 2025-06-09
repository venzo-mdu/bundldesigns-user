import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import Loginlogo from "../../../Images/Login/loginlogo.svg";
import Anchor from "../../../Images/Login/anchor.svg";
import Googleicon from "../../../Images/Login/google.svg";
import { Footer } from "../../Common/Footer/Footer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../Redux/Action";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import AppleSignin from "react-apple-signin-auth";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { base_url } from "../BackendAPIUrl";
import { useGoogleLogin } from "@react-oauth/google";
import loginGIF from "../../../Images/loginGIF.gif";
import ClipLoader from "react-spinners/ClipLoader";
import AppleLogin from "react-apple-login";
import GoogleIcon from "../../../Images/Login/icons8-google.svg";
import { auth } from "../../Firebase/Firebase";
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";

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

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     const token = tokenResponse.credential;
  //     const userDetails = jwt_decode(token);
  //     console.log('User Details:', userDetails);
  //     console.log('Name:', userDetails.name);
  //     console.log('Email:', userDetails.email);
  //     console.log('Profile Picture:', userDetails.picture);

  //     loginWithGoogle({
  //       email: userDetails.email,
  //       full_name: userDetails.name,
  //       password: null,
  //       google: true
  //     });
  //   },
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  // });

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
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        setError(
          "email",
          lang === "ar"
            ? "عنوان بريد إلكتروني غير صالح"
            : "Invalid email address"
        );
      } else {
        setError("email", ""); // clear error if email is valid
      }
    }

    // Password validation
    if (name === "password") {
      if (/\s/.test(value)) {
        // Check for spaces
        setError("password", "Password cannot contain spaces");
      } else if (!value.trim()) {
        setError("password", "Password is required");
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
      errorMessages.email = "Invalid email format";
    }
    if (!loginData.password.trim()) {
      errorMessages.password = "Password is required";
    } else if (/\s/.test(loginData.password)) {
      errorMessages.password = "Password must not contain spaces";
    } else if (loginData.password.length > 16) {
      errorMessages.password = "Password must be at most 16 characters long";
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

  // const handleAppleLoginSuccess = async (response) => {
  //   console.log("Apple Login Success:", response);

  //   const { authorization, user } = response;

  //   console.log(authorization,user,"res")

  //   if (!authorization?.id_token || !authorization?.code) {
  //     console.error("Invalid Apple response:", response);
  //     return;
  //   }

  //   const decodedToken = jwt_decode(authorization.id_token);
  //   console.log("Decoded Apple ID Token:", decodedToken);
  //   const data = {
  //     email: user?.email,
  //     full_name: user?.email?.split("@")[0],
  //     password: null,
  //     google: true
  //   }

  //   try {
  //     const response = await axios.post(`${base_url}/api/login/`, data);
  //     if (response.status === 200) {
  //       document.cookie = `token=${response?.data?.data.token || ""}; path=/; SameSite=None; Secure`;
  //       dispatch(loginAction(response.data.user));
  //       if (next_url) {
  //         navigate(`${process.env.REACT_APP_URL}/${next_url}`, {
  //           state: {
  //             project_name: project_name,
  //             fromLogin: true,
  //           }
  //         })
  //         // window.location.href =`${process.env.REACT_APP_URL}/${next_url}`
  //       } else { navigate('/'); }

  //     }

  //   } catch (response) {

  //     setLoginError(response.response.data.data)
  //   }

  // };

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

  // const handleAppleLogin = async () => {
  //   const provider = new OAuthProvider("apple.com");
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log("Apple user:", user);

  //     if (user?.accessToken) {
  //       const data = {
  //         email: user?.auth?.currentUser?.email,
  //         full_name: user?.auth?.currentUser?.email?.split("@")[0],
  //         password: null,
  //         is_social_login: true,
  //       };
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
  //     }
  //   } catch (error) {
  //     console.error("Apple sign-in failed:", error.message);
  //   }
  // };

  // const handleAppleLogin = async () => {
  //   const provider = new OAuthProvider("apple.com");
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log("Apple user:", user);

  //     if (user?.accessToken) {
  //       const data = {
  //         email: user?.auth?.currentUser?.email,
  //         full_name: user?.auth?.currentUser?.email?.split("@")[0],
  //         password: null,
  //         is_social_login: true,
  //       };
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
  //     }
  //   } catch (error) {
  //     console.error("Apple sign-in failed:", error.message);
  //   }
  // };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  useEffect(() => {
    // Check if we're returning from an Apple redirect login
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect result:", result);
          handleLoginResult(result);
        }
      } catch (error) {
        console.error("Redirect sign-in failed:", error.message);
      }
    };

    checkRedirectResult();
  }, []);

  const handleLoginResult = async (result) => {
    const user = result.user;
    if (user?.accessToken) {
      try {
        const email = user?.email || user?.auth?.currentUser?.email;
        const data = {
          email: email,
          full_name: email?.split("@")[0],
          password: null,
          is_social_login: true,
        };

        const response = await axios.post(`${base_url}/api/login/`, data);
        if (response.status === 200) {
          document.cookie = `token=${response?.data?.data.token || ""}; path=/; SameSite=None; Secure`;
          dispatch(loginAction(response.data.user));

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
      } catch (error) {
        console.error("Login failed:", error.message);
      }
    }
  };

  const handleAppleLogin = async () => {
    const provider = new OAuthProvider("apple.com");

    try {
      if (isIOS) {
        alert("Using redirect for iOS", auth, provider);
        await signInWithRedirect(auth, provider);
      } else {
        alert("Using popup for desktop", auth, provider);
        const result = await signInWithPopup(auth, provider);
        handleLoginResult(result);
      }
    } catch (error) {
      alert(error.message || "Authentication error");
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
              {/* <p className='text-[red] mb-1'>{loginError}</p>
            <button className='signin !text-[24px] uppercase' type='submit'>
              {loading ? <ClipLoader size={25} color={'#FFFFFF'} /> :lang === 'ar' ? 'تسجيل دخول' : 'Sign In'}
            </button>  */}

              <p className="text-[#D83D99] mb-1">{loginError}</p>

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
            {/* </div> */}
            {/* <div className="w-[320px] mx-auto mt-2 flex justify-end"> */}
            {/* <div className="w-[300px] mt-2 flex justify-end"> */}
            {/* <div className="absolute left-0 mt-2"></div> */}
            {/* <div className="mt-2" style={{ textAlign: 'right', marginRight:"-15px" }}> */}

            {/* </div> */}

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
                {/* <GoogleLogin
                  onSuccess={credentialResponse => {
                    const token = credentialResponse.credential;
                    const userDetails = jwt_decode(token);
                    console.log('User Details:', userDetails);
                    // Example of how to access user info
                    console.log('Name:', userDetails.name);
                    console.log('Email:', userDetails.email);
                    console.log('Profile Picture:', userDetails.picture);
                    loginWithGoogle({
                      email: userDetails.email,
                      full_name: userDetails.name,
                      password: null,
                      google: true
                    })
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                /> */}
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
                  // className={'lg:w-[50%] md:w-[50%] xs:w-[100%] !lg:text-[18px] !md:text-[18px] !xs:text-[16px]'}
                  // onSuccess={handleAppleLoginSuccess}
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
                {/* <AppleLogin
                clientId="com.bundldesigns.app.client"
                redirectURI="https://bundldesigns.web.app/login"
                app
                usePopup={true}
                callback={handleAppleLoginSuccess} // Catch the response
                scope="email name"
                responseMode="query"
                render={renderProps => (  //Custom Apple Sign in Button
                  <button
                    onClick={renderProps.onClick}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      // border: "1px solid black",
                      fontFamily: "none",
                      lineHeight: "25px",
                      fontSize:window?.innerWidth<=500?"12px":"18px"
                    }}
                  >
                    <i className="fa-brands fa-apple px-2 "></i>
                    Continue with Apple
                  </button>
                )}
              /> */}
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
        {/* <img className='anchor1 w-[160px]' src={loginGIF} alt='login-anchor' /> */}
      </div>
      <Footer isLang={lang} />
    </div>
  );
};
