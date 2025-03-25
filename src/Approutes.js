import React from 'react'
import axios from 'axios'
import { ConfigToken } from '../src/Components/Auth/ConfigToken'
import { useEffect, useState } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { base_url } from '../src/Components/Auth/BackendAPIUrl'; 
import { Home } from '../src/Components/Home/Home';
import { Login } from '../src/Components/Auth/Login/Login';
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
import Legal from './Components/Pages/Legal';
import TermsAndConditions from './Components/Pages/TermsAndConditions';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy';
import Profile from './Components/Pages/Profile';
import ResetPassword from './Components/Auth/ResetPassword';
import { Purchasehistory } from './Components/Pages/Purchasehistory';
import { Contactus } from './Components/Pages/Contactus';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : null;
};

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
  console.log("User is on Safari");
} else {
  console.log("User is NOT on Safari");
}

export default function AppRouter() {


  const token = getCookie("token");
  const [transLanguage , setTransLanguage] = useState('');
  const location = useLocation();
  const [user , setUser] = useState([]);
  const ProtectedRoute = ({ element }) => {

    const token = getCookie("token");
    return token != null ? element : <Navigate to={{ pathname: "/login", search: `?next_url=${location.pathname.slice(1)}` }}  />;
  };
  
  useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
    setTransLanguage(localStorage?.getItem('lang'));
  },[transLanguage]);

    useEffect(() => {
        const direction = localStorage?.getItem('lang') === 'ar' ? 'rtl' : 'ltr';
        if (document.body.dir !== direction) {
            document.body.dir = direction;
        }
    }, [localStorage?.getItem('lang')]);

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const response = await axios.get(`${base_url}/api/profile/`, ConfigToken());
        console.log(response.data);
  
        // Function to format the name
        const formatName = (name) => {
          return name
            .split(' ') // Split the name by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
            .join(' '); // Join back into a single string
        };
  
        // Format the full name before setting state
        const formattedUser = {
          ...response.data,
          full_name: formatName(response.data?.full_name || "")
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
      element:  <Login lang={transLanguage}/>,
    },
    {
      path: "/signup",
      element:  <Signup lang={transLanguage}/>,
    },
    {
      path: "/reset-password",
      element:  <ResetPassword />,
    },
    {
      path: "/",
      element: <Home lang={transLanguage} setLang={setTransLanguage}/>,
    },
    {
      path: "/profile",
      element: <Profile user={user}/>,
      //element: <ProtectedRoute element={<BundlDetail />} />,
    },
    {
      path: "/bundldetail/:packageID",
      element: <BundlDetail user={user}/>,
      //element: <ProtectedRoute element={<BundlDetail />} />,
    },
    {
      path: "/custombundl",
      element: <CustomBundl />,
      // element: <ProtectedRoute element={<CustomBundl />} />,
    },
    {
      path: "/mycart",
      element: <ProtectedRoute element={<MyCart />} />,
    },
    {
      path:"/questionnaire/:pageno",
      element:<ProtectedRoute element={<QuestionnaireLayout/>} />
    },
    {
      path:"/thankyou",
      element:<ProtectedRoute element={<Thankyoucard/>} />
    },
    {
      path :"/upload-content/:orderId",
      element:<ProtectedRoute element={<UploadContent />} />
    },
    {
      path:'/dashboard',
      element:<ProtectedRoute element={<Dashboard />} />
    },
    {
      path:'/purchase-history',
      element:<ProtectedRoute element={<Purchasehistory />} />
    },
    {
      path:'/adjustment',
      element:<ProtectedRoute element={<Adjustments user={user}/>} />
    },
    {
      path:"/aboutus",
      element:<AboutUs lang={transLanguage} setLang={setTransLanguage}/>
    },
    {
      path:"/search",
      element:<Search/>
    },
    {
      path:'/jobs',
      element: <Career/>
    },
    {
      path:'/faq',
      element:<FAQ />
    },
    {
      path:'/our-work',
      element: <OurWork />
    },
    {
      path: '/premium-form',
      element: < PremiumForm />
    },
    {
      path: '/contact-us',
      element: <Contactus />
    },
    {
      path:'/form/:form_type',
      element:<WebsterPremiumForm />

    },
    {
      path: '/webster-form',
      element: < WebsterForm />
    },
    {
      path:"/terms-and-conditions",
      element:<TermsAndConditions/>
    },
    {
      path:"/privacy-policy",
      element:<PrivacyPolicy/>
    },
    {
      path:"/legal",
      element:<Legal/>
    },
    {
      path: "*",
      element: <Navigate to={token ? "/" : "/login"} />,
    },
  ]);
}
 