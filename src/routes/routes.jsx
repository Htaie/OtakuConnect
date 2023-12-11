import { createBrowserRouter } from 'react-router-dom'
import FirstPage from '../pages/FirstPage'
import SecondPage from '../pages/SecondPAge'
import LoginPage from '../pages/authPages/LoginPage'
import RegPage from '../pages/authPages/RegPage'
import ProfilePage from '../pages/profilePages/ProfilePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FirstPage></FirstPage>,
  },
  {
    path: '/tinder',
    element: <SecondPage></SecondPage>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/register',
    element: <RegPage></RegPage>,
  },
  {
    path: '/profile',
    element: <ProfilePage></ProfilePage>,
  },
])
