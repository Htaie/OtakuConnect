import axios from "axios";
import React, { useEffect, useState } from "react";

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


    return (
      <div className="flex flex-row">
        {newsDb.map((news, i) => (
          <a key={news.id} href={news.url} className="flex bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-72 h-144 md:h-auto md:w-72 md:rounded-none md:rounded-s-lg" src={news.image} alt="" />
            <div className="flex flex-col justify-between p-6 leading-normal">
              <h5 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{news.title}</h5>
            </div>
          </a>
        )).slice(0, 3)}
      </div>
    )
}
export default NewsCards;