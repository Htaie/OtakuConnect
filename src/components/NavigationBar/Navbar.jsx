import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../../constants/constants';
import useAuth from '../../useAuth.js';
const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const authStatus = useAuth();

  useEffect(() => {
    setLoggedIn(authStatus);
  }, [authStatus]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={Route.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="public/logo.png" className="h-8" alt="Otaku Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OtakuConnect</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to={isLoggedIn ? Route.PROFILE : Route.LOGIN} className="text-white mr-4">
            {isLoggedIn ? 'Профиль' : 'Войти'}
          </Link>
          {isLoggedIn && (
            <img
              src="https://i.pinimg.com/736x/25/3b/55/253b55063cfd0228461afef2c8d3f162.jpg"
              className="h-8 rounded-full ml-2"
              alt="Аватар профиля"
            />
          )}
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul
            className={cn(
              'flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 ',
              'rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'
            )}
          >
            <li>
              <Link
                to={Route.TINDER}
                className={cn(
                  'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white',
                  'md:dark:hover:text-blue-500dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                )}
              >
                OtakuLand
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;