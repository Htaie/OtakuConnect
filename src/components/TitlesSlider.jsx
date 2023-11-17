import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import styles from "./TitlesSlider.module.css";
import axios from "axios";


const TitlesSlider = () => {
  const [lastDirection, setLastDirection] = useState();
  const [dataDisplay, setDataDisplay] = useState([]);
  const [swipedCards, setSwipedCards] = useState(0);

  const [canSwipe, setCanSwipe] = useState(true);

  useEffect(() => {
    if (swipedCards === dataDisplay.length && canSwipe) {
      // All cards swiped, make a new API request
      const randomPage = Math.floor(Math.random() * 1000) + 1;
      axios
        .get(`https://api.jikan.moe/v4/top/anime?page=${randomPage}`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Network response was not ok");
          }
          return response.data.data;
        })
        .then((data) => {
          if (data.length > 0) {
            const newDataDisplay = data.map((elem) => ({
              id: elem.mal_id,
              image: elem.images.jpg.large_image_url,
              name: elem.title,
            }));

            // Добавить новые данные к существующим
            setDataDisplay((prevData) => [...prevData, ...newDataDisplay]);
            setSwipedCards(0); // Сбросить счетчик свайпнутых карточек
          } else {
            // Если нет новых данных, отключить возможность свайпа
            setCanSwipe(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [swipedCards, dataDisplay.length, canSwipe]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    setSwipedCards((prevCount) => prevCount + 1);

    // Реакция на свайп в зависимости от направления
    if (direction === 'left') {
      // Действия при свайпе влево
      console.log('Swiped left!');
    } else if (direction === 'right') {
      // Действия при свайпе вправо
      console.log('Swiped right!');
    }

    setDataDisplay((prevData) => prevData.filter((elem) => elem.name !== nameToDelete));
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < dataDisplay.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  useEffect(() => {
    if (swipedCards === dataDisplay.length) {
      // All cards swiped, make a new API request
      const randomPage = Math.floor(Math.random() * 1000) + 1;
      axios
        .get(`https://api.jikan.moe/v4/top/anime?page=${randomPage}`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Network response was not ok");
          }
          return response.data.data;
        })
        .then((data) => {
          const newDataDisplay = data.map((elem) => ({
            id: elem.mal_id,
            image: elem.images.jpg.large_image_url,
            name: elem.title,
          }));
          setDataDisplay(newDataDisplay);
          setSwipedCards(0); // Reset swiped cards count
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [swipedCards, dataDisplay.length]);


 return (
  <div >
   <div className={styles.cardContainer} >
   {dataDisplay.map((elem) =>
          <TinderCard className={styles.swipe} key={elem.id} onSwipe={(dir) => swiped(dir, elem.name)} onCardLeftScreen={() => outOfFrame(elem.name)}>
            <div style={{ backgroundImage: 'url(' + elem.image + ')' }} className={styles.card}>
              <h3>{elem.name}</h3>
            </div>
          </TinderCard>
        )}
   </div>

   {lastDirection ? (
    <h2 className={styles.infoText}>You swiped {lastDirection}</h2>
   ) : (
    <h2 className={styles.infoText} />
   )}
  </div>
 );
};

export default TitlesSlider;