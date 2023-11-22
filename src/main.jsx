import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SecondPAge from './pages/SecondPAge';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import FirstPage from './pages/FirstPage';


const router = createBrowserRouter([
  {
   path: "/",
   element: <FirstPage></FirstPage>,
  },
  {
   path: "/huy",
   element: <SecondPAge></SecondPAge>,
  },  
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);