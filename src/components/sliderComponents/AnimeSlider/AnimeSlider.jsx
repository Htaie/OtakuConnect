import React, { useEffect, useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import PropTypes from 'prop-types';
import style from './AnimeSlider.module.css';
import { BASE_URL } from '../../../constants/constants';
import Overlay from '../OverlaySlider/Overlay';
import { OverlayInfo } from '../OverlaySlider/OverlayInfo';

import MainButtons from '../../ui/buttons/MainButtons';

const TitlesSlider = ({ onSwipe, user }) => {
  const [db, setDb] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [activeTrailerUrl, setActiveTrailerUrl] = useState(null);
  const [isTrailerVisibleForCard, setTrailerVisibleForCard] = useState({});

  const handleInfoClick = (index) => {
    setOverlayVisible((prevVisible) => !prevVisible);

    if (!isOverlayVisible) {
      const trailerUrl = db[index].trailers.length > 0 ? db[index].trailers[0].embed_url : '';
      setActiveTrailerUrl(trailerUrl);
      setTrailerVisibleForCard((prev) => ({ ...prev, [index]: true }));
    } else {
      setActiveTrailerUrl(null);
      setTrailerVisibleForCard((prev) => ({ ...prev, [index]: false }));
    }
  };

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  );

  const swiped = async (direction, nameToDelete, index) => {
    if (direction === 'right') {
      const likedAnime = db.find((elem) => elem.name === nameToDelete);
      user.likedAnime.push(likedAnime);
      console.log(`Swiped ${direction}`);

      console.log(user.likedAnime);
      onSwipe([...user.likedAnime]);
    }
    setTimeout(() => {
      setDb((prevData) => prevData.filter((elem) => elem.name !== nameToDelete));
      updateCurrentIndex(index - 1);
    }, 200);
    setOverlayVisible(false);
  };
  const canSwipe = currentIndex >= 0;

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx) {
      setDb((prevDb) => prevDb.filter((_, i) => i !== idx));
      updateCurrentIndex(currentIndexRef.current - 1);
    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      console.log('Swiping:', dir);
      await childRefs[currentIndex].current.swipe(dir);
      setDb((prevDb) => prevDb.slice(0, currentIndex).concat(prevDb.slice(currentIndex + 1)));
    }
  };
  useEffect(() => {
    // const randomPage = Math.floor(Math.random() * 1000) + 1; //  Костыль для рандомного выбора страницы
    const fetchData = async () => {
      try {
        if (db.length <= 5) {
          const response = await fetch(`${BASE_URL}?page=1`);
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log(data);

          if (data.data.length > 0) {
            const newDataDisplay = data.data.map((elem) => ({
              id: elem.mal_id,
              image: elem.images.jpg.large_image_url,
              name: elem.title,
              year: elem.year,
              score: elem.score,
              episode: elem.episodes,
              synopsis: elem.synopsis,
              demographics: elem.demographics[0]?.name,
              genres: elem.genres.map((genre) => genre.name).join(', '),
              trailers: [
                {
                  embed_url: elem.trailer.embed_url,
                },
              ],
            }));

            const newData = [...db, ...newDataDisplay];
            console.log(newDataDisplay);

            setDb(newData);
            updateCurrentIndex(newData.length - 1);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [db]);

  return (
    <div className="flex" style={{ width: '800px', height: '600px' }}>
      <div style={{ height: '600px', width: '400px' }}>
        <div className={style.cardContainer}>
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className={style.swipe}
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              {isOverlayVisible && activeTrailerUrl && isTrailerVisibleForCard[index] ? (
                <div className={style.cardWithTrailer}>
                  <iframe
                    ref={childRefs[index]}
                    width="400"
                    height="600"
                    src={activeTrailerUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              ) : (
                <div style={{ backgroundImage: 'url(' + character.image + ')' }} className={style.card}>
                  <Overlay
                    title={character.name}
                    rating={character.score}
                    episode={character.episode}
                    year={character.year}
                    genres={character.genres}
                    onInfoClick={() => handleInfoClick(index)}
                  />
                </div>
              )}
            </TinderCard>
          ))}
        </div>
        <div className={style.buttons}>
          <MainButtons onClick={() => swipe('left')}> Swipe left!</MainButtons>
          <MainButtons onClick={() => swipe('right')}> Swipe right!</MainButtons>
        </div>
      </div>
      {isOverlayVisible && <OverlayInfo data={db[currentIndex]} />}
    </div>
  );
};

TitlesSlider.propTypes = {
  onSwipe: PropTypes.func,
  user: PropTypes.object,
};
export default TitlesSlider;
