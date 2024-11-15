import { Navigate, useRoutes } from "react-router-dom";
import { Home } from '../src/Components/Home/Home';
import { Login } from '../src/Components/Auth/Login/Login';
import { Signup } from "./Components/Auth/Signup/Signup";
import { BundlDetail } from "./Components/Purchase/BundlDetail";
import { MyCart } from "./Components/Purchase/MyCart";
import { CustomBundl } from "./Components/Purchase/CustomBundl";
import { Popup } from "./Components/Common/Popup/Popup";
import { AboutUs } from "./Components/Pages/AboutUS";
import FAQ from "./Components/Pages/FAQ";
import Career from "./Components/Pages/Career";
import OurWork from "./Components/Pages/OurWork";
import WebsterForm from "./Components/Pages/WebsterForm";
import PremiumForm from "./Components/Pages/PremiumForm";

// Helper function to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : null;
};

// ProtectedRoute component to handle authentication-based routing
const ProtectedRoute = ({ element }) => {
  const token = getCookie("token");
  return token ? element : <Navigate to="/login" />;
};

// ----------------------------------------------------------------------

export default function AppRouter() {
  const token = getCookie("token");

  return useRoutes([
    {
      path: "/login",
      element: token ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: token ? <Navigate to="/" /> : <Signup />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/bundldetail",
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
      path: "*",
      element: <Navigate to={token ? "/" : "/login"} />,
    },
    {
      path:"/mycart",
      element:<MyCart/>
    },
    {
      path:"/aboutus",
      element:<AboutUs/>
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
      path: '/webster-form',
      element: < WebsterForm />
    },
  ]);
}
