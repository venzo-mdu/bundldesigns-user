import { useEffect } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
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

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : null;
};


export default function AppRouter() {
  const token = getCookie("token");
  const location = useLocation()
  const ProtectedRoute = ({ element }) => {

    const token = getCookie("token");
    return token != null ? element : <Navigate to={{ pathname: "/login", search: `?next_url=${location.pathname.slice(1)}` }}  />;
  };
  
  useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0
    })
  },[token]);
  

  return useRoutes([
    {
      path: "/login",
      element:  <Login />,
    },
    {
      path: "/signup",
      element:  <Signup />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/bundldetail/:packageID",
      element: <ProtectedRoute element={<BundlDetail />} />,
    },
    {
      path: "/custombundl",
      element: <ProtectedRoute element={<CustomBundl />} />,
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
      path:'/adjustment',
      element:<ProtectedRoute element={<Adjustments />} />
    },
    {
      path:"/aboutus",
      element:<AboutUs/>
    },
    {
      path:"/search",
      element:<Search/>
    },
    {
      path:'/career',
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
      path:'/form/:form_type',
      element:<WebsterPremiumForm />

    },
    {
      path: '/webster-form',
      element: < WebsterForm />
    },
    {
      path: "*",
      element: <Navigate to={token ? "/" : "/login"} />,
    },
  ]);
}
 