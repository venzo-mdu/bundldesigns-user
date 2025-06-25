import React, { useState, useEffect } from "react";
import "../ForgotPassword/ForgotPassword.css";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams } from "react-router-dom";
import { Language } from "@mui/icons-material";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const next_url = searchParams.get("next_url");
  const { project_name } = location?.state || {};
  const clientId = process.env.REACT_APP_IOS_CLIENTID;
  const redirectURI = process.env.REACT_APP_IOS_REDIRECT_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { id } = useParams();
  const languageQuery = searchParams.get("language");
  const [lang, setLang] = useState("en");
  const [loginData, setLoginData] = useState({
    new_password: "",
    confirm_password: "",
    google: false,
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
  const langParam = searchParams.get("language");
  if (langParam === "arabic") {
    setLang("ar");
  } else if (langParam === "english") {
    setLang("en");
  }
}, [location.search]);

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
            google: true,
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
        setError("password", lang === "ar" ? "لا يمكن أن تحتوي كلمة المرور على مسافات" : "Password cannot contain spaces");
      } else if (!value.trim()) {
        setError("password", lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required");
      } else {
        setError("password", ""); // clear error if password is valid
      }
    }
  };

  const validateForm = () => {
    const errorMessages = {};
    const { new_password, confirm_password } = loginData;

    if (!new_password.trim()) {
      errorMessages.password =
        lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    } else if (/\s/.test(new_password)) {
      errorMessages.password =
        lang === "ar"
          ? "لا يمكن أن تحتوي كلمة المرور على مسافات"
          : "Password must not contain spaces";
    } else if (new_password.length < 8 || new_password.length > 16) {
      errorMessages.password =
        lang === "ar"
          ? "يجب أن تتكون كلمة المرور من 8 إلى 16 حرفًا"
          : "Password must be between 8 and 16 characters";
    }

    if (new_password !== confirm_password) {
      errorMessages.confirmPassword =
        lang === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match";
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
          google: true,
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
      const response = await axios.post(
        `${base_url}/api/reset-password/${id}/`,
        loginData
      );
      console.log(response);

      if (
        response.status === 200 &&
        (
    response.data?.message === "Password reset successfully" ||
    response.data?.message === "تم إعادة تعيين كلمة المرور بنجاح"
  )
      ) {
        // Redirect to login page after successful password reset
        navigate("/login", {
          state: {
            fromPasswordReset: true,
          },
        });
      }
    } catch (response) {
      setLoginError(response.response?.data?.data || (lang === "ar" ? "فشل في إعادة تعيين كلمة المرور" : "Password reset failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="login !mb-[8rem] ">
        {/* <img className='anchor w-[100px]' src={loginGIF} alt='login-anchor' /> */}
        <div className="login-content ">
          <p className="forgot-welcometext">
            {lang === "ar" ? "مرحبا بكم مجددا" : "Forgot Password?"}
          </p>
          <a className="login-brand" href="/">
          <img className="loginlogo" src={Loginlogo} alt="login" />
          </a>

          <form onSubmit={onSubmit} className="lg:mt-0 md:mt-0 xs:mt-[8%]">
            {/* New Password */}
            <label className="xs:mb-2">
              {lang === "ar" ? "كلمة المرور الجديدة" : "New Password"}{" "}
            </label>
            <div className="relative password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="new_password"
                placeholder={
                  lang === "ar"
                    ? "أدخل كلمة المرور الجديدة"
                    : "Enter your New Password"
                }
                value={loginData.new_password}
                onChange={handleChange}
                className={`password-input ${
                  lang === "ar" ? "pr-3 pl-10" : "pr-10 pl-3"
                } w-full rounded-none`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={`eye-icon absolute top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 ${
                  lang === "ar" ? "left-2" : "right-2"
                }`}
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}

            {/* Confirm Password */}

            <label className="xs:mb-2" style={{ marginTop: "3%" }}>
              {lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
            </label>
            <div className="relative password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                placeholder={
                  lang === "ar" ? "تأكيد كلمة المرور" : "Confirm your Password"
                }
                value={loginData.confirm_password}
                onChange={handleChange}
                className={`password-input ${
                  lang === "ar" ? "pr-3 pl-10" : "pr-10 pl-3"
                } w-full rounded-none`}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`eye-icon absolute top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 ${
                  lang === "ar" ? "left-2" : "right-2"
                }`}
              >
                {showConfirmPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}

            {/* General error message */}
            {errors.general && <p className="error">{errors.general}</p>}
            {/* <p className="text-[red] mb-1">{loginError}</p> */}
            <p className="error">{loginError}</p>
            <button
              className="signin !text-[24px] uppercase"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={25} color={"#FFFFFF"} />
              ) : lang === "ar" ? (
                "تسجيل دخول"
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
        {/* <img className='anchor1 w-[160px]' src={loginGIF} alt='login-anchor' /> */}
      </div>
      <Footer isLang={lang} />
    </div>
  );
};
export default ForgotPassword;
