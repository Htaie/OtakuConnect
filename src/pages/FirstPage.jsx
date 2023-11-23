import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import NewsCards from "../components/NewsCards";
import style from "./FirstPage.module.css";

const FirstPage = () => {


 return (
  <div>
   <Navbar></Navbar>
   <div className="flex justify-around pb-20 pt-20 ">
    <div className="Descriptions w-2/4">
     <h2 className="text-3xl pb-12">Привет</h2>
     <p className="text-lg pb-14">
      ОтакуКонект - это уникальное приложение для подбора аниме, созданное
      специально для любителей японской анимации. Сочетая в себе элементы
      популярных социальных платформ и функциональность приложений для
      знакомств, ОтакуКонект предоставляет пользователям возможность находить
      аниме-партнеров с общими интересами.
     </p>
     <Link
      to={"/huy"}
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
       dark:focus:ring-blue-800 font-medium rounded-lg 
       text-sm px-10 py-2.5 text-center me-2 mb-2"
     >
      Попробовать
     </Link>
    </div>
    <div className="ImagesBlock">
     {/* <img className="h-96" src={image} alt="" /> */}
    </div>
   </div>
   <div className="w-screen h-auto flex flex-row">
   <NewsCards></NewsCards>
   </div>
  </div>
 );
};

export default FirstPage;
