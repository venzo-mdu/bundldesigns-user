import { Navigate, useRoutes } from "react-router-dom";
import { Home } from '../src/Components/Home/Home';
import { Login } from '../src/Components/Auth/Login/Login';
import { Signup } from "./Components/Auth/Signup/Signup";
import { BundlDetail } from "./Components/Purchase/BundlDetail";
import { MyCart } from "./Components/Purchase/MyCart";
import { CustomBundl } from "./Components/Purchase/CustomBundl";
import { QuestionnaireLayout } from "./Components/Questionnarie/QuestionnaireLayout";
import { Thankyoucard } from "./Components/Questionnarie/Thankyoucard";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : null;
};

const ProtectedRoute = ({ element }) => {
  const token = getCookie("token");
  return token ? element : <Navigate to="/login" />;
};

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
      path:"/questionnaire/:pageno",
      element:<ProtectedRoute element={<QuestionnaireLayout/>} />
    },
    {
      path:"/thankyou",
      element:<ProtectedRoute element={<Thankyoucard/>} />
    },
    {
      path: "*",
      element: <Navigate to={token ? "/" : "/login"} />,
    },
  ]);
}
 