import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayOut from '../LayOut/RootLayOut/RootLayOut';
import Home from '../Page/Home/Home';
import Login from '../Page/Auth/Login/Login';
import Register from '../Page/Auth/Register/Register';
import ErrorPage from '../Page/Home/ErrorPage/ErrorPage';
import DashboardLayout from '../LayOut/DashboardLayout/DashboardLayout';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut></RootLayOut>,
    errorElement : <ErrorPage></ErrorPage>,
    children : [
        {
         index: true,
        element: <Home></Home>
        },
        {
          path: '/login',
          element : <Login></Login>
        },
        {
          path : '/register',
          element : <Register></Register> 
        }
    ]
  },
  {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <h2>Welcome to Dashboard</h2>
    }
  ]
}

]);


export default Router;