import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import TinderPage from '../pages/TinderPage'
import LoginPage from '../pages/authPages/LoginPage'
import ProfilePage from '../pages/profilePages/ProfilePage'
import RegistrationPage from '../pages/authPages/RegistrationPage'

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
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/register',
    element: <RegistrationPage></RegistrationPage>,
  },
  {
    path: '/profile',
    element: <ProfilePage></ProfilePage>,
  },
])
