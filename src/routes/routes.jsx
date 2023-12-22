import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import TinderPage from '../pages/TinderPage';
import ProfilePage from '../pages/profilePages/ProfilePage';
import AuthPage from '../pages/authPages/AuthPage';
import EditProfilePage from '../pages/profilePages/EditProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage></MainPage>,
  },
  {
    path: '/tinder',
    element: <TinderPage></TinderPage>,
  },
  {
    path: '/login',
    element: <AuthPage></AuthPage>,
  },
  {
    path: '/profile',
    element: <ProfilePage></ProfilePage>,
  },
  {
    path: '/edit',
    element: <EditProfilePage></EditProfilePage>,
  },
]);
