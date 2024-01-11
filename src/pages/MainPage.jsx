import { Link } from 'react-router-dom';
import NewsCards from '../components/InfoBlocks/NewsAnime/NewsCards';
import style from './MainPage.module.css';
import Navbar from '../components/NavigationBar/Navbar';
import { Route, SERVER_URL } from '../constants/constants';

import MainButtons from '../components/ui/buttons/MainButtons';

const MainPage = () => {
  console.log(SERVER_URL);
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex container mx-auto justify-between my-10 ">
        <div className="Descriptions w-2/4  max-sm:w-screen pl-4">
          <h2 className="text-3xl pb-12">Привет</h2>
          <p className="text-lg pb-14 text-white">
            ОтакуКонект - это уникальное приложение для подбора аниме, созданное специально для любителей японской
            анимации. Сочетая в себе элементы популярных социальных платформ и функциональность приложений для
            знакомств, ОтакуКонект предоставляет пользователям возможность находить аниме-партнеров с общими интересами.
          </p>

          <Link to={Route.TINDER}>
            <MainButtons> Попробовать</MainButtons>
          </Link>
        </div>
        <div className={style.ImagesBlock}>
          <img
            className="h-96"
            src="https://i.pinimg.com/originals/a4/a9/02/a4a90264589c2249f6f710e0c31ba1d8.jpg"
            alt="Main image"
          />
        </div>
      </div>
      <div className="container mx-auto justify-between">
        <h1 className="text-3xl font-bold font-sans text-left pb-10">Anime News</h1>
        <div className="h-auto flex flex-row">
          <NewsCards></NewsCards>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
