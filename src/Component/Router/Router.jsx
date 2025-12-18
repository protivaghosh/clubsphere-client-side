import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayOut from '../LayOut/RootLayOut/RootLayOut';
import Home from '../Page/Home/Home';
import Login from '../Page/Auth/Login/Login';
import Register from '../Page/Auth/Register/Register';
import ErrorPage from '../Page/Home/ErrorPage/ErrorPage';
import DashboardLayout from '../LayOut/DashboardLayout/DashboardLayout';
import CreateClub from '../Page/DashBoard/CreateClub/CreateClub';
import ManageClub from '../Page/DashBoard/ManageClub/ManageClub';
import Clubs from '../Page/Home/Clubs/Clubs';
import ClubDetails from '../Page/Home/ClubsDetails/ClubsDetails';
import CreateEvent from '../Page/DashBoard/CreateEvent/CreateEvent';
import ManagerEvents from '../Page/DashBoard/ManagerEvents/ManagerEvents';

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
        },
        {
          path : '/clubs',
          element: <Clubs></Clubs>
        },
        {
          path :'/clubs/:id',
          element : <ClubDetails></ClubDetails>
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
    },
    {
      path : '/dashboard/admin/clubs',
      element:<ManageClub></ManageClub>
    },
    {
      path : '/dashboard/manager/create-club',
      element : <CreateClub></CreateClub>
    },
    {
      path: '/dashboard/manager/createEvents',
      element : <CreateEvent></CreateEvent>
    },
    {
      path: '/dashboard/manager/events',
      element : <ManagerEvents></ManagerEvents>
    }
  ]
}

]);


export default Router;