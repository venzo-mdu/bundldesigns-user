
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import {Home} from '../src/Components/Home/Home';
import {Login} from '../src/Components/Auth/Login/Login'
import { Signup } from "./Components/Auth/Signup/Signup";
import { BundlDetail } from "./Components/Purchase/BundlDetail";
import { MyCart } from "./Components/Purchase/MyCart";
import { CustomBundl } from "./Components/Purchase/CustomBundl";
import { AboutUs } from "./Components/Pages/AboutUs";
// ----------------------------------------------------------------------

export default function AppRouter() {


  return useRoutes([

    {
      path: "/",
      element:<Home/>,
    },
    {
      path:"/login",
      element:<Login/> 
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/bundldetail",
      element:<BundlDetail/>
    },
    {
      path:"/custombundl",
      element:<CustomBundl/>
    },
    {
      path:"/mycart",
      element:<MyCart/>
    },
    {
      path:"/aboutus",
      element:<AboutUs/>
    }
  ]);
}
