import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ConfigToken } from "../src/Components/Auth/ConfigToken";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { base_url } from "../src/Components/Auth/BackendAPIUrl";
import { Home } from "../src/Components/Home/Home";
import { Login } from "../src/Components/Auth/Login/Login";
import { Signup } from "./Components/Auth/Signup/Signup";
import { BundlDetail } from "./Components/Purchase/BundlDetail";
import { MyCart } from "./Components/Purchase/MyCart";
import { CustomBundl } from "./Components/Purchase/CustomBundl";
import { QuestionnaireLayout } from "./Components/Questionnarie/QuestionnaireLayout";
import { Thankyoucard } from "./Components/Questionnarie/Thankyoucard";
import { AboutUs } from "./Components/Pages/AboutUS";
import FAQ from "./Components/Pages/FAQ";
import Career from "./Components/Pages/Career";
import OurWork from "./Components/Pages/OurWork";
import WebsterForm from "./Components/Pages/WebsterForm";
import PremiumForm from "./Components/Pages/PremiumForm";
import Dashboard from "./Components/Pages/Dashboard";
import UploadContent from "./Components/Pages/UploadContent";
import Adjustments from "./Components/Pages/Adjustments";
import WebsterPremiumForm from "./Components/Pages/WebsterPremiumForm";
import Search from "./Components/Pages/Search";
import Legal from "./Components/Pages/Legal";
import TermsAndConditions from "./Components/Pages/TermsAndConditions";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import Profile from "./Components/Pages/Profile";
import ResetPassword from "./Components/Auth/ResetPassword";
import { Purchasehistory } from "./Components/Pages/Purchasehistory";
import { Contactus } from "./Components/Pages/Contactus";
import ForgotpasswordMail from "./Components/Auth/ForgotpasswordMail/ForgotpasswordMail";
import ForgotPassword from "./Components/Auth/ForgotPassword/Forgotpass";
import PasswordResetSent from "./Components/Auth/ForgotpasswordMail/PasswordResetSent";
import { useSearchParams } from "react-router-dom";
import Animation from "./Components/Pages/Animation";
import VerifyMail from "./Components/Auth/Verifymailpage/verifyMail";
import { fetchQuestionAnswer } from "./Components/Questionnarie/questionnaire.slice";

import { data } from "./Components/Questionnarie/1";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
};

// const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// if (isSafari) {
//   console.log("User is on Safari");
// } else {
//   console.log("User is NOT on Safari");
// }

export default function AppRouter() {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [transLanguage, setTransLanguage] = useState("");
  const location = useLocation();
  const [user, setUser] = useState([]);

  const orderId = useSelector((state) => state.questionAnswer.orderId);
  async function getQuestionAnswer() {

    if (orderId) {
      const response = await axios.get(
        `${base_url}/api/questionnaire/${orderId}/`,
        ConfigToken()
      );
      dispatch(fetchQuestionAnswer(response.data.data));
    }
  }

  useEffect(() => {
    getQuestionAnswer();
  }, [orderId]);

  const ProtectedRoute = ({ element }) => {
    const token = getCookie("token");
    return token != null ? (
      element
    ) : (
      <Navigate
        to={{
          pathname: "/login",
          search: `?next_url=${location.pathname.slice(1)}`,
        }}
      />
    );
  };

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
    setTransLanguage(localStorage?.getItem("lang"));
  }, [transLanguage]);

  useEffect(() => {
    const direction = localStorage?.getItem("lang") === "ar" ? "rtl" : "ltr";
    if (document.body.dir !== direction) {
      document.body.dir = direction;
    }
  }, [localStorage?.getItem("lang")]);

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/profile/`,
          ConfigToken()
        );
        console.log(response.data);

        // Function to format the name
        const formatName = (name) => {
          return name
            .split(" ") // Split the name by spaces
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ) // Capitalize first letter of each word
            .join(" "); // Join back into a single string
        };

        // Format the full name before setting state
        const formattedUser = {
          ...response.data,
          full_name: formatName(response.data?.full_name || ""),
        };

        setUser(formattedUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getAuthUser();
  }, []);

  return useRoutes([
    {
      path: "/login",
      element: <Login lang={transLanguage} />,
    },
    {
      path: "/forgotpassword-mail",
      element: <ForgotpasswordMail lang={transLanguage} />,
    },
    {
      path: "/forgotpassword/:id",
      element: <ForgotPassword lang={transLanguage} />,
    },
    {
      path: "/reset-sent",
      element: <PasswordResetSent />,
    },
    {
      path: "/signup",
      element: <Signup lang={transLanguage} />,
    },
    {
      path: "/",
      element: <Home lang={transLanguage} setLang={setTransLanguage} />,
    },

    {
      path: "/bundldetail/:packageID",
      element: (
        <BundlDetail
          user={user}
          lang={transLanguage}
          setLang={setTransLanguage}
        />
      ),
      //element: <ProtectedRoute element={<BundlDetail />} />,
    },
    {
      path: "/custombundl",
      element: (
        <CustomBundl
          user={user}
          lang={transLanguage}
          setLang={setTransLanguage}
        />
      ),
      // element: <ProtectedRoute element={<CustomBundl />} />,
    },
    {
      path: "/verify/:id",
      element: <VerifyMail lang={transLanguage} />,
    },
    {
      path: "/reset-password",
      element: (
        <ProtectedRoute
          element={
            <ResetPassword lang={transLanguage} setLang={setTransLanguage} />
          }
        />
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute
          element={
            <Profile
              user={user}
              setUser={setUser}
              lang={transLanguage}
              setLang={setTransLanguage}
            />
          }
        />
      ),
      //element: <ProtectedRoute element={<BundlDetail />} />,
    },
    {
      path: "/mycart",
      element: (
        <ProtectedRoute
          element={<MyCart lang={transLanguage} setLang={setTransLanguage} />}
        />
      ),
    },
    {
      path: "/questionnaire/:pageno",
      element: (
        <ProtectedRoute
          element={
            <QuestionnaireLayout
              lang={transLanguage}
              setLang={setTransLanguage}
            />
          }
        />
      ),
    },
    {
      path: "/thankyou",
      element: (
        <ProtectedRoute
          element={
            <Thankyoucard lang={transLanguage} setLang={setTransLanguage} />
          }
        />
      ),
    },
    {
      path: "/upload-content/:orderId",
      element: (
        <ProtectedRoute
          element={
            <UploadContent lang={transLanguage} setLang={setTransLanguage} />
          }
        />
      ),
    },
    {
      path: "/ani",
      element: (
        <ProtectedRoute
          element={
            <Animation lang={transLanguage} setLang={setTransLanguage} />
          }
        />
      ),
      // element: <Animation lang={transLanguage} setLang={setTransLanguage}/>,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute
          element={
            <Dashboard lang={transLanguage} setLang={setTransLanguage} />
          }
        />
      ),
    },
    {
      path: "/purchase-history",
      element: (
        <ProtectedRoute
          element={
            <Purchasehistory lang={transLanguage} setLang={setTransLanguage} />
          }
        />
      ),
    },
    {
      path: "/adjustment",
      element: (
        <ProtectedRoute
          element={
            <Adjustments
              user={user}
              lang={transLanguage}
              setLang={setTransLanguage}
            />
          }
        />
      ),
    },
    {
      path: "/aboutus",
      element: <AboutUs lang={transLanguage} setLang={setTransLanguage} />,
    },
    {
      path: "/search",
      element: <Search lang={transLanguage} setLang={setTransLanguage} />,
    },
    {
      path: "/jobs",
      element: <Career lang={transLanguage} setLang={setTransLanguage} />,
    },
    {
      path: "/faq",
      element: <FAQ lang={transLanguage} setLang={setTransLanguage} />,
    },
    {
      path: "/our-work",
      element: <OurWork lang={transLanguage} setLang={setTransLanguage} />,
    },
    // {
    //   path: '/premium-form',
    //   element: < PremiumForm lang={transLanguage} setLang={setTransLanguage}/>
    // },
    {
      path: "/contact-us",
      element: <Contactus lang={transLanguage} setLang={setTransLanguage} />,
    },
    {
      path: "/form/:form_type",
      element: (
        <WebsterPremiumForm lang={transLanguage} setLang={setTransLanguage} />
      ),
    },
    // {
    //   path: '/webster-form',
    //   element: < WebsterForm lang={transLanguage} setLang={setTransLanguage}/>
    // },
    {
      path: "/terms-and-conditions",
      element: (
        <TermsAndConditions lang={transLanguage} setLang={setTransLanguage} />
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <PrivacyPolicy lang={transLanguage} setLang={setTransLanguage} />
      ),
    },
    {
      path: "/legal",
      element: <Legal lang={transLanguage} setLang={setTransLanguage} />,
    },
    {
      path: "*",
      element: <Navigate to={token ? "/" : "/login"} />,
    },
  ]);
}
