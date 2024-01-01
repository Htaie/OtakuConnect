import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Route } from '../../constants/constants';
const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={Route.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="src/image/logo.png" className="h-8" alt="Otaku Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OtakuConnect</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to={Route.LOGIN} className="text-white text-2xl">
            Войти
          </Link>
          <Link to={Route.PROFILE} className="text-white text-2xl">
            Профиль
          </Link>
        </div>
        <Link to={Route.TINDER} className={cn('block py-2 px-3 text-2xl rounded  text-white hover:underline')}>
          Tinder
        </Link>
        <Link to={Route.TINDER} className={cn('block py-2 px-3 text-2xl  rounded text-white hover:underline')}>
          AnimeList
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
