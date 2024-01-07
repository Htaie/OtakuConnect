import { useEffect, useState } from 'react';
import NavBar from '../../components/NavigationBar/Navbar';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

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
      <div className="container mx-auto">
        <div className="text-white flex">
          <a href={anime.url} target="_blank" rel="noreferrer">
            <img
              src={
                anime.images?.jpg?.large_image_url ||
                'https://avatanplus.com/files/resources/mid/590249aeb6e3a15bb0efd29d.png'
              }
              alt=""
              style={{ width: '252px', height: '352px' }}
            />
          </a>
          <div className="flex flex-col ml-4">
            <div className="flex items-center mb-2">
              <StarOutlinedIcon className="text-yellow-500 size-6" />
              <p className="text-2xl">{anime.score}</p>
            </div>
            <h1 className="text-3xl mt-4 mb-2">{anime.title}</h1>
            <p className="text-1xl mt-3 mb-2">{anime.title_japanese}</p>
            <div className="flex mt-4">
              <div className="mt-3">
                <p>Duration:</p>
                <p>Episodes:</p>
                <p>Rating:</p>
                <p>Status:</p>
              </div>
              <div className="mt-3 ml-40">
                <p>{anime.duration}</p>
                <p>{anime.episodes}</p>
                <p>{anime.rating}</p>
                <p>{anime.status}</p>
              </div>
            </div>
            <p className="mt-4">{anime.source}</p>
          </div>
        </div>
        <p className="text-white mt-20" style={{ maxWidth: '600px' }}>
          {anime.synopsis}
        </p>
      </div>
    </>
  );
};

export default RandomAnimePage;
