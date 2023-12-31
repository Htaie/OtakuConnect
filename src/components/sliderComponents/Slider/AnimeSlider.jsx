import React, { useEffect, useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import PropTypes from 'prop-types';
import style from './SliderStyle/AnimeSlider.module.css';
import { BASE_URL } from '../../../constants/constants';
import Overlay from '../OverlaySlider/Overlay';

const TitlesSlider = ({ onSwipe, user }) => {
  const [db, setDb] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);

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
  }, [BASE_URL, db]);

  return (
    <div className="h-40 w-40">
      <div className={style.cardContainer}>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={style.swipe}
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div style={{ backgroundImage: 'url(' + character.image + ')' }} className={style.card}>
              <Overlay
                title={character.name}
                rating={character.score}
                episode={character.episode}
                year={character.year}
              />
            </div>
          </TinderCard>
        ))}
      </div>
      <div className={style.buttons}>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>
          Swipe left!
        </button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>
          Swipe right!
        </button>
      </div>
    </div>
  );
};
TitlesSlider.propTypes = {
  onSwipe: PropTypes.func,
  user: PropTypes.object,
};
export default TitlesSlider;
