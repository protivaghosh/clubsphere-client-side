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
import Events from '../Page/Events/Events';
import EventsDetails from '../Page/Events/EventsDetails';
import MyClubs from '../Page/DashBoard/MyClubs/MyClubs';
import EditEvent from '../Page/DashBoard/EditEvent/EditEvent';
import EventRegistrations from '../Page/DashBoard/EventRegistrations/EventRegistrations';
import ManageUsers from '../Page/DashBoard/ManageUsers/ManageUsers';
import PaymentSuccess from '../Page/DashBoard/PaymentSuccess/PaymentSuccess';
import PaymentCancel from '../Page/DashBoard/PaymentCancel/PaymentCancel';
import MemberOverview from '../Page/DashBoard/MemberOverview/MemberOverview';
import MemberClubs from '../Page/DashBoard/MemberClubs/MemberClubs';
import MemberEvents from '../Page/DashBoard/MemberEvents/MemberEvents';
import AdminOverview from '../Page/DashBoard/AdminOverview/AdminOverview';
import PrivateRoute from '../Routes/PrivateRoute/PrivateRoute';
import AdminRoute from '../Routes/AdminRoute/AdminRoute';
import ManagerRoute from '../Routes/ManagerRoute/ManagerRoute';
import ManagerOverview from '../Page/DashBoard/MemberOverview/MemberOverview';


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
          element :<PrivateRoute><ClubDetails></ClubDetails></PrivateRoute> 
        },
        {
          path: '/events',
          element: <Events></Events>
        },
        {
         path : '/events/:id',
         element :<PrivateRoute><EventsDetails></EventsDetails></PrivateRoute> 
        },
        ]
  },
  {
  path: "/dashboard",
  element:<PrivateRoute><DashboardLayout /> </PrivateRoute>,
  children: [
    {
      index: true,
      element: <h2>Welcome to Dashboard</h2>
    },
    {
      path: '/dashboard/admin',
      element:<AdminRoute><AdminOverview></AdminOverview></AdminRoute> 
    },
    {
      path : '/dashboard/admin/clubs',
      element:<AdminRoute>
        <ManageClub></ManageClub>
      </AdminRoute>
    },
    {
       path:"/dashboard/admin/users",
       element:<AdminRoute>
        <ManageUsers />
        </AdminRoute>
    },
    {
      path: '/dashboard/manager',
      element: <ManagerRoute>
        <ManagerOverview></ManagerOverview>
      </ManagerRoute>
    }, 
    {
      path : '/dashboard/manager/create-club',
      element :<ManagerRoute>
        <CreateClub></CreateClub>
      </ManagerRoute> 
    },
    {
      path: '/dashboard/manager/createEvents',
      element :<ManagerRoute>
        <CreateEvent></CreateEvent>
      </ManagerRoute> 
    },
    {
      path: '/dashboard/manager/events',
      element :<ManagerRoute>
        <ManagerEvents></ManagerEvents>
        </ManagerRoute> 
    },
      
    {
      path: "/dashboard/manager/events/edit/:id",
      element :<ManagerRoute>
        <EditEvent></EditEvent>
      </ManagerRoute> 
    },
    {
   path: "/dashboard/manager/event-registrations/:id",
   element:<ManagerRoute>
    <EventRegistrations/>
   </ManagerRoute> 
   },
    {
        path : 'payment-success',
        element : <PaymentSuccess></PaymentSuccess>
      },
      {
        path : 'payment-cancel',
        element : <PaymentCancel></PaymentCancel>
      },
    {
      path : '/dashboard/manager/my-clubs',
      element :<ManagerRoute>
        <MyClubs></MyClubs>
      </ManagerRoute> 
    },
    {
          path: "/dashboard/member",
          element: <MemberOverview />
        },
        {
          path: "/dashboard/member/my-clubs",
          element: <MemberClubs />
        },
        {
          path: "/dashboard/member/events",
          element: <MemberEvents />
        }
  ]
}

]);


export default Router;