import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayOut from '../LayOut/RootLayOut/RootLayOut';
import Home from '../Page/Home/Home';
import Login from '../Page/Auth/Login/Login';
import Register from '../Page/Auth/Register/Register';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut></RootLayOut>,
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
]);


export default Router;