import React, { useState, useEffect } from "react";
import "../ForgotpasswordMail/ForgotpasswordMail.css";
import Loginlogo from "../../../Images/Login/loginlogo.svg";
import { Footer } from "../../Common/Footer/Footer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { base_url } from "../BackendAPIUrl";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "../../Firebase/Firebase";
import { OAuthProvider, signInWithPopup } from "firebase/auth";

export const ForgotpasswordMail = ({ lang }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const next_url = searchParams.get("next_url");
  const { project_name } = location?.state || {};
  const clientId = process.env.REACT_APP_IOS_CLIENTID;
  const redirectURI = process.env.REACT_APP_IOS_REDIRECT_URL;
  const [emailSent, setEmailSent] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    language: localStorage.getItem("lang") === "ar" ? "arabic" : "english",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

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
  };
  const validateForm = () => {
    const errorMessages = {};
    if (!loginData.email.trim()) {
      errorMessages.email =
        lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginData.email)) {
      errorMessages.email = lang === "ar" ? "تنسيق البريد الإلكتروني غير صالح" : "Invalid email format";
    }
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${base_url}/api/forget-password/`, {
        email: loginData.email,
        language: loginData.language,
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/reset-sent", {
          state: { email: loginData.email, lang },
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setSubmitError(
        error?.response?.data?.message ||
          error?.response?.data?.data ||
           (lang === "ar" ? "مرة أخرى حدث خطأ ما!" : "Something went wrong!")
      );
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
            {lang === "ar" ? "مرحبا بكم مجددا" : "Forgot Password"}
          </p>
          <a className="forgot-brand" href="/">
          <img className="loginlogo" src={Loginlogo} alt="login" />
          </a>
          <form onSubmit={onSubmit} className="lg:mt-0 md:mt-0 xs:mt-[8%]">
            <label className="xs:mb-5">
              {lang === "ar"
                ? "الرجاء إدخال عنوان البريد الإلكتروني المسجل لإرسال رابط إعادة تعيين كلمة السر"
                : "Please enter registered email to send reset password link."}{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder={
                emailSent
                  ? ""
                  : lang === "ar"
                  ? " بريد إلكتروني"
                  : "Enter your email"
              }
              value={emailSent ? "" : loginData.email}
              onChange={handleChange}
              className="rounded-none"
            />
            {errors.email && <p className="error">{errors.email}</p>}

            {/* General error message */}
            {errors.general && <p className="error">{errors.general}</p>}
            {/* <p className='text-[red] mb-1'>{loginError}</p>
            <button className='signin !text-[24px] uppercase' type='submit'>
              {loading ? <ClipLoader size={25} color={'#FFFFFF'} /> :lang === 'ar' ? 'تسجيل دخول' : 'Sign In'}
            </button>  */}

            <p className="text-[#D83D99] mb-1">{submitError}</p>
            {emailSent && (
              <p className="success">
                {lang === "ar"
                  ? "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني."
                  : "Reset link has been sent to your email."}
              </p>
            )}

            <button className="signin !text-[24px] uppercase" type="submit">
              {loading ? (
                <ClipLoader size={25} color={"#FFFFFF"} />
              ) : lang === "ar" ? (
                "تسجيل دخول"
              ) : (
                "Send"
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
export default ForgotpasswordMail;
