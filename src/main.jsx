import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SecondPAge from './pages/SecondPAge';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import LoginPage from './pages/authPages/LoginPage';
import RegPage from './pages/authPages/RegPage';
import ProfilePage from './pages/profilePages/ProfilePage';


const router = createBrowserRouter([
  {
   path: "/",
   element: <FirstPage></FirstPage>,
  },
  {
   path: "/huy",
   element: <SecondPAge></SecondPAge>,
  },  
  {
   path: "/login",
   element: <LoginPage></LoginPage>,
  },  
  {
   path: "/register",
   element: <RegPage></RegPage>,
  },  
  {
   path: "/profile",
   element: <ProfilePage></ProfilePage>,
  },  
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);