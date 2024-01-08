import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import TinderPage from '../pages/TinderPage';
import ProfilePage from '../pages/profilePages/ProfilePage';
import AuthPage from '../pages/authPages/AuthPage';
import RandomAnimePage from '../pages/RandomAnime/RandomAnimePage';
import { Route } from '../constants/constants';

export const router = createBrowserRouter([
  {
    path: Route.HOME,
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
    path: '/random',
    element: <RandomAnimePage></RandomAnimePage>,
  },
]);
