import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//all updates will be soon
const NewsCards = () =>{
    const NEWS_BASE_URL = "https://api.jikan.moe/v4/anime/1/news";
    const [newsDb, setNewsDb] = useState([]);

    useEffect(() => {
        const fetchNewsData = async () => {
          try {
            const newsResponse = await axios.get(`${NEWS_BASE_URL}?page=1`);
            if (newsResponse.status !== 200) {
              throw new Error("Network response was not ok");
            }
    
            const data = newsResponse.data.data || [];
            if (data.length > 0) {
              const newNewsDisplay = data.map((elem) => ({
                id: elem.mal_id,
                image: elem.images.jpg.image_url,
                title: elem.title,
                url: elem.url,
              }));
    
              
              setNewsDb((prevNewsDb) => [...prevNewsDb, ...newNewsDisplay]);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchNewsData();
      }, [NEWS_BASE_URL]);
      console.log(newsDb)

    return (
      <div className="flex flex-row flex-wrap max-sm:p-4">
        {newsDb.slice(0, 6).map((news, i) => (
          <Link key={news.id} to={news.url} className="flex bg-white rounded-lg shadow md:flex-row md:max-w-xl hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700 mb-6 md:mr-6 md:w-1/2 md:ml-9">
            <img className="object-cover w-48 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={news.image} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{news.title}</h5>
            </div>
          </Link>
        ))}
      </div>
    )
}
export default NewsCards;