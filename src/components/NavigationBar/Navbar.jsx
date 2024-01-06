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
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={Route.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="src/image/logo.png" className="h-8" alt="Otaku Logo" />
          <span className="self-center text-base font-semibold whitespace-nowrap dark:text-white">OtakuConnect</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            to={isLoggedIn ? Route.PROFILE : Route.LOGIN}
            className="block py-2 px-3 text-lg rounded  text-white hover:underline"
          >
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
        <Link to={Route.TINDER} className={cn('block py-2 px-3 text-lg rounded  text-white hover:underline')}>
          Tinder
        </Link>
        <Link to={Route.RANDOM} className={cn('block py-2 px-3 text-lg  rounded text-white hover:underline')}>
          Random Anime
        </Link>
        <Link to={Route.TINDER} className={cn('block py-2 px-3 text-lg  rounded text-white hover:underline')}>
          Anime List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
