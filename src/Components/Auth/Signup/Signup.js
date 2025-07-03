import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Signup/Signup.css";
import Loginlogo from "../../../Images/Login/loginlogo.svg";
import Anchor from "../../../Images/Login/anchor.svg";
import Googleicon from "../../../Images/Login/google.svg";
import { Footer } from "../../Common/Footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import AppleSignin from "react-apple-signin-auth";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { base_url } from "../BackendAPIUrl";
import { ToastContainer, toast } from "react-toastify";
import loginGIF from "../../../Images/loginGIF.gif";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../Redux/Action";
import ClipLoader from "react-spinners/ClipLoader";
import PhoneNumberInput from "../../Pages/PhoneNumberInput";
import AppleLogin from "react-apple-login";
import { useGoogleLogin } from "@react-oauth/google";
import { auth } from "../../Firebase/Firebase";
import { OAuthProvider, signInWithPopup } from "firebase/auth";

export const Signup = ({ lang }) => {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const clientId = process.env.REACT_IOS_CLIENTID;
  const redirectURI = process.env.REACT_IOS_REDIRECT_URL;

  const { userInfo } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [phoneError, setPhoneError] = useState(false);
  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    password: "",
    auth_provider: "email",
    phone: "",
    country: "",
    language: "Arabic",
  });

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

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

  const showToastMessage = () => {
    toast.error("The Value is required!", {
      position: toast?.POSITION?.TOP_RIGHT,
      toastId: "required-value-toast",
      icon: false,
      style: {
        color: "#D83D99",
        fontWeight: "700",
      },
    });
  };
  const setError = (field, errorMessage) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const token = tokenResponse.credential;
      const accessToken = tokenResponse.access_token; // Correct way to extract token
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((userDetails) => {
          console.log("User Details:", userDetails);

          signupWithGoogle({
            email: userDetails.email,
            full_name: userDetails.name,
            password: null,
            auth_provider: "google",
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

    // Update the register data state
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Full name validation
    if (name === "full_name") {
      if (!value.trim()) {
        setError("full_name", lang === "ar" ? "الاسم الكامل مطلوب" : "Full name is required");
      } else if (/[^a-zA-Z\s-]/.test(value)) {
        setError(
          "full_name",
          lang === "ar" ? "لا يجب أن يحتوي الاسم الكامل على أرقام أو رموز" : "Full name must not contain numbers or special characters"
        );
      } else if (value.length < 3) {
        setError("full_name", lang === "ar" ? "يجب أن يكون الاسم الكامل 3 أحرف على الأقل" : "Full name must be at least 3 characters");
      } else {
        setError("full_name", "");
      }
    }

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

    if (name === "password") {
      if (/\s/.test(value)) {
        // Check for spaces
        setError("password", lang === "ar" ? "لا يمكن أن تحتوي كلمة المرور على مسافات" : "Password cannot contain spaces");
      } else if (!value.trim()) {
        setError("password", lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required");
      } else if (value.length < 8) {
        setError("password", lang === "ar" ? "يجب أن تكون كلمة المرور 8 أحرف على الأقل" : "Password must be at least 8 characters");
      } else {
        setError("password", ""); // clear error if password is valid
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!registerData.full_name.trim()) errors.full_name = lang === "ar" ? "الاسم مطلوب" : "Name is required";
    else if (/[^a-zA-Z\s-]/.test(registerData.full_name)) {
      errors.full_name = lang === "ar" ? "لا يجب أن يحتوي الاسم الكامل على أرقام أو رموز" : "Full name must not contain numbers or special characters";
    } else if (registerData.full_name.length < 3) {
      errors.full_name = lang === "ar"
  ? "يجب أن يكون الاسم الكامل 3 أحرف على الأقل"
  : "Full name must be at least 3 characters";
    }
    if (!registerData.email.trim()) {
      errors.email =
        lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerData.email)) {
      errors.email =
        lang === "ar"
          ? "عنوان بريد إلكتروني غير صالح"
          : "Invalid email address";
    }
    if (!registerData.phone.trim()) {
      errors.phone =
        lang === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required";
    }
    if (!registerData.country.trim()) {
      errors.country = lang === "ar" ? "الدولة مطلوبة" : "Country is required";
    } else if (/[^a-zA-Z\s-]/.test(registerData.country)) {
      errors.country = lang === "ar" ? "يجب أن يحتوي اسم الدولة على أحرف فقط" : "Country name must contain only letters";
    }
    if (!registerData.language.trim()) {
      errors.language = lang === "ar" ? "اللغة مطلوبة":"Language is required";
    } else if (/[^a-zA-Z\s-]/.test(registerData.language)) {
      errors.language = lang === "ar" ? "يجب أن تحتوي اللغة على أحرف فقط" : "Language must contain only letters";
    }
    if (/\s/.test(registerData.password)) {
      // Check for spaces
      errors.password = lang === "ar"
  ? "لا يمكن أن تحتوي كلمة المرور على مسافات"
  : "Password cannot contain spaces";
    } else if (!registerData.password.trim()) {
      errors.password = lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
    } else if (registerData.password.length < 8) {
      errors.password = lang === "ar" ? "يجب أن تكون كلمة المرور 8 أحرف على الأقل" : "Password must be at least 8 characters";
    } else if (registerData.password.length > 16) {
      errors.password = 
      lang === "ar" ? "يجب أن تكون كلمة المرور 16 أحرف على الأقل":"Password must be at most 16 characters long";

    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const signUp = async (e) => {
    e.preventDefault();
    setRegisterData((prev) => ({
      ...prev,
      auth_provider: "email",
    }));
    if (!validateForm()) return;
    if (!isAgree) {
      setSubmitted(true);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${base_url}/api/register/`,
        registerData
      );
      if (response.status === 201) {
        console.log("Signup successfully");

        navigate("/login");
      }
    } catch (response) {
      const errors = response.response.data || {};
      const formattedErrors = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, value[0]])
      );
      console.log(formattedErrors, response.response, "for");
      setErrors(formattedErrors);
      setLoading(false);
    } finally {
      setRegisterData((prev) => ({
        ...prev,
        auth_provider: "email",
      }));
    }
  };

  const signupWithGoogle = async (data) => {
    try {
      const response = await axios.post(`${base_url}/api/register/`, data);
      if (response.status === 201) {
        document.cookie = `token=${
          response?.data.token || ""
        }; path=/; SameSite=None; Secure`;
        dispatch(loginAction(response.user));
        navigate("/");
      }
    } catch (response) {
      const errors = response.response.data?.error || {};
      const formattedErrors = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, value[0]])
      );
      console.log(formattedErrors, response.response, "for");
      setErrors(formattedErrors);
    }
  };

  // const handleAppleSignupSuccess = async (response) => {
  //   console.log("Apple Login Success:", response);

  //   const { authorization, user } = response;

  //   if (!authorization?.id_token || !authorization?.code) {
  //     console.error("Invalid Apple response:", response);
  //     return;
  //   }

  //   const decodedToken = jwt_decode(authorization.id_token);
  //   console.log("Decoded Apple ID Token:", decodedToken);
  //   const data ={
  //     email:decodedToken?.email,
  //     full_name:decodedToken?.email?.split("@")[0],
  //     password:null,
  //     google:true
  //   }

  //   try {
  //     const response = await axios.post(`${base_url}/api/register/`, data);
  //     if (response.status === 201) {
  //       document.cookie = `token=${response?.data.token || ""}; path=/; SameSite=None; Secure`;
  //       dispatch(loginAction(response.user));
  //       navigate('/');
  //     }
  //   } catch (response) {
  //     const errors = response.response.data?.error || {};
  //     const formattedErrors = Object.fromEntries(
  //       Object.entries(errors).map(([key, value]) => [key, value[0]])
  //     );
  //     console.log(formattedErrors, response.response, 'for')
  //     setErrors(formattedErrors)
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
  //         auth_provider: "apple",
  //       };

  //       const response = await axios.post(`${base_url}/api/register/`, data);
  //       if (response.status === 201) {
  //         document.cookie = `token=${
  //           response?.data.token || ""
  //         }; path=/; SameSite=None; Secure`;
  //         dispatch(loginAction(response.user));
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Apple sign-in failed:", error.message);
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
          auth_provider: "apple",
        }

        const response = await axios.post(`${base_url}/api/register/`, data);
        if (response.status === 201) {
          document.cookie = `token=${response?.data.token || ""}; path=/; SameSite=None; Secure`;
          dispatch(loginAction(response.user));
          navigate('/');
        }

    }
    } catch (error) {
    console.error("Apple sign-in failed:", error.message);
  }
};

  return (
    <div>
      <div className="login !mb-24">
        {/* <img className='anchor' id='anchor' src={loginGIF} alt='login-anchor' /> */}
        <div className="signup-content">
          <p className="welcometext">
            {lang == "ar" ? "مرحبًا بك" : "Welcome to"}{" "}
            <span className="bundle-designs">
              {lang === "ar" ? "مرحبا بكم في بندل ديزاينز​" : "Bundl Designs"}{" "}
            </span>
          </p>
          <a className="signup-brand" href="/">
            <img className="loginlogo" src={Loginlogo} alt="login" />
          </a>
          <form onSubmit={signUp}>
            <label className="mb-2" style={{ width: "100%" }}>
              {lang === "ar" ? "الأسم" : "Name"}
            </label>
            <input
              placeholder={lang === "ar" ? "أدخل اسمك" : "Enter your name"}
              name="full_name"
              value={registerData.full_name}
              onChange={handleChange}
              className="rounded-none"
            />
            {errors.full_name && (
              <p className="error first-letter:capitalize">
                {errors.full_name}
              </p>
            )}

            <label className="mb-2 mt-[3%]" style={{ marginTop: "3%" }}>
              {lang === "ar" ? "البريد الالكتروني" : "Email address"}
            </label>
            <input
              placeholder={
                lang === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"
              }
              name="email"
              value={registerData.email}
              onChange={handleChange}
              className="rounded-none"
            />
            {errors.email && (
              <p className="error first-letter:capitalize text-[#D83D99]">
                {errors.email}
              </p>
            )}

            <div>
              <label className="mb-2 mt-[3%]">
                {lang === "ar" ? " رقم الهاتف" : "Phone Number"}
              </label>
              <PhoneNumberInput
                className={
                  "rounded-none outline-none h-[45px] lg:w-[525px] md:w-[525px] xs:w-full"
                }
                extraInputClass={"h-[50px] rounded-none"}
                name="phone"
                placeholder={
                  lang === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"
                }
                value={registerData.phone}
                status={setRegisterData}
                setPhoneError={setPhoneError}
                setErrors={setErrors}
                formErrors={errors}
              />
              {errors.phone && registerData.phone.length === 0 && (
                <p className="first-letter:capitalize text-[14px] mt-2 text-[#D83D99]">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="lg:w-[50%] md:w-[50%] xs:w-[100%] mt-[3%]">
              <div
                className={`${
                  lang === "ar"
                    ? "lg:ml-[4%] md:ml-[4%] xs:ml-0"
                    : "lg:mr-[4%] md:mr-[4%] xs:mr-0"
                }`}
              >
                <label className="mb-2 mt-[3%]">
                  {lang === "ar" ? "الدولة" : "Country"}{" "}
                </label>
                <select
                  name="country"
                  // id='vacancySelect'
                  value={registerData.country || null}
                  onChange={handleChange}
                  className={`rounded-none outline-none h-[50px] lg:w-[525px] md:w-[525px] xs:w-full  border !border-[#D9D9D9] px-2 py-[5px] w-full`}
                >
                  <option value={null} disabled selected>
                    {" "}
                  </option>
                  {countries.map((country) => (
                    <option>{country}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="error text-[#D83D99] first-letter:capitalize">
                    {errors.country}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 mt-[3%]">
                {lang === "ar" ? "اللغة" : "Language"}
              </label>
              <select
                name="language"
                className="rounded-none outline-none h-[50px] lg:w-[525px] md:w-[525px] xs:w-full border !border-[#D9D9D9] px-2 py-[5px]"
                onChange={handleChange}
              >
                <option value={"English"}>English</option>
                <option value={"Arabic"} selected>
                  Arabic
                </option>
              </select>
              {errors.language && (
                <p className="error text-[#D83D99] first-letter:capitalize">
                  {errors.language}
                </p>
              )}
            </div>

            <label className="mb-2 mt-[3%]">
              {lang === "ar" ? "كلمة المرور" : "Password"}
            </label>
            <input
              type="password"
              placeholder={
                lang === "ar"
                  ? "أدخل كلمة المرور الخاصة بك"
                  : "Enter your Password"
              }
              name="password"
              value={registerData.password}
              onChange={handleChange}
              className="rounded-none"
            />
            {errors.password && (
              <p className="error text-[#D83D99] first-letter:capitalize">
                {errors.password}
              </p>
            )}

            <label className="terms-policy  flex items-center my-1">
              <input
                className={`checkbox ${
                  lang === "ar" ? "ml-2" : "mr-2"
                } rounded-none cursor-pointer`}
                type="checkbox"
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
              />
              <span className="!text-[16px] cursor-pointer">
                {lang === "ar"
                  ? " أوافق على الشروط والأحكام"
                  : "I agree to the terms & policy"}
              </span>
            </label>
            {submitted && !isAgree && (
              <p className="error text-[#D83D99]">
                Please agree to the terms and conditions.
              </p>
            )}
            <button
              type="submit"
              style={{ margin: "0% 0 0 0" }}
              className="signin !text-[24px] uppercase"
            >
              {loading ? (
                <ClipLoader size={25} color={"#FFFFFF"} />
              ) : lang === "ar" ? (
                "تسجيل حساب"
              ) : (
                "Signup"
              )}
            </button>
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
            <p className="signinwithgoogle">
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
                  signupWithGoogle({ full_name: userDetails.name, email: userDetails.email, google: true })
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              /> */}
                <button
                  onClick={() => {
                    setRegisterData((prev) => ({
                      ...prev,
                      auth_provider: "google",
                    }));
                    login();
                  }}
                  type="button"
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    fontFamily: "Helvetica",
                    fontWeight: "400",
                    lineHeight: "25px",
                    fontSize: window?.innerWidth <= 500 ? "14px" : "18px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "0px",
                    width: "100%",
                  }}
                >
                  {/* <img src={GoogleIcon} className='w-[25px] mr-2'></img> */}
                  <i
                    class={`fab fa-google ${lang === "ar" ? "ml-2" : "mr-2"}`}
                  ></i>
                  {lang === "ar"
                    ? "تقم بالتسجيل مع جوجل "
                    : "Sign up with Google"}
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
                  // className={'lg:w-[50%] md:w-[50%] xs:w-[100%] !lg:text-[18px] !md:text-[18px] !xs:text-[14px]'}
                  // onSuccess={handleAppleSignupSuccess}
                  onClick={handleAppleLogin}
                  onError={(error) =>
                    console.error("Apple Login Failed:", error)
                  }
                  render={(props) => (
                    <button
                      {...props}
                      type="button"
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        border: "1px solid #D9D9D9",
                        borderRadius: "0px",
                        fontFamily: "Helvetica",
                        fontWeight: "400",
                        lineHeight: "25px",
                        fontSize: window?.innerWidth <= 500 ? "14px" : "18px",
                        width: "100%",
                      }}
                    >
                      <i className="fa-brands fa-apple px-2 "></i>
                      {lang === "ar"
                        ? "قم بالتسجيل مع أبل"
                        : "Sign up with Apple"}
                    </button>
                  )}
                />
                {/* <AppleLogin
                clientId="com.bundldesigns.app.client"
                redirectURI="https://bundldesigns.web.app/login"
                usePopup={true}
                callback={handleAppleSignupSuccess} // Catch the response
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
            <p className="dont !mt-4 w-[90%]">
              {lang === "ar" ? "لديك حساب" : " Have an account"} ?
              <span>
                <NavLink className="signup !font-[500]" to={"/login"}>
                  &nbsp;{lang === "ar" ? "تسجيل دخول" : "Sign In"}
                </NavLink>
              </span>
            </p>
          </form>
        </div>
        {/* <img className='anchor1 w-[160px]' id='anchor1' src={loginGIF} alt='login-anchor' /> */}
      </div>
      <Footer isLang={lang} />
    </div>
  );
};
