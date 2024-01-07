import { useEffect, useState } from 'react';
import NavBar from '../../components/NavigationBar/Navbar';
const RandomAnimePage = () => {
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    const fetchRandomAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/random/anime');
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomAnime();
  }, []);
  console.log(anime);
  return (
    <>
      <NavBar />
      <div className="text-white">
        <h1>{anime.title}</h1>
        <p>{anime.synopsis}</p>
        <img
          src={
            anime.images?.jpg?.large_image_url ||
            'https://avatanplus.com/files/resources/mid/590249aeb6e3a15bb0efd29d.png'
          }
          alt=""
        />
        <p>{anime.url}</p>
        <p>{anime.duration}</p>
        <p>{anime.eposodes}</p>
        <p>{anime.rating}</p>
        <p>{anime.score}</p>
        <p>{anime.status}</p>
        <p>{anime.source}</p>
        <p>{anime.title_japanese}</p>
      </div>
    </>
  );
};

export default RandomAnimePage;
