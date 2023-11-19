import React, { useEffect, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import styles from "./TitlesSlider.module.css";
import axios from "axios";

const TitlesSlider = () => {
  const BASE_URL = "https://api.jikan.moe/v4/top/anime";

  const [lastDirection, setLastDirection] = useState();
  const [dataDisplay, setDataDisplay] = useState([]);
  const [swipedCards, setSwipedCards] = useState(0);

  const user ={likedAnime: []}
  useEffect(() => {
    if (swipedCards === dataDisplay.length) {
      const randomPage = Math.floor(Math.random() * 1000) + 1;
      console.log('Making API request with random page:', randomPage);
  
      axios
        .get(`${BASE_URL}?page=${randomPage}`)
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
            setDataDisplay((prevData) => [...prevData, ...newDataDisplay]);
            setSwipedCards(0);
          } 
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [swipedCards, dataDisplay.length]);

  const swiped = (direction, nameToDelete) => {
    if (direction === "right") {
      user.likedAnime.push(dataDisplay.filter((elem) => elem.name == nameToDelete)[0]);
    }
    setLastDirection(direction);
    setSwipedCards((prevCount) => prevCount + 1);
    console.log(`Swiped  ${direction}`);

    setDataDisplay((prevData) => prevData.filter((elem) => elem.name !== nameToDelete));
    console.log(user.likedAnime)
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div>
      <div className={styles.cardContainer}>
        {dataDisplay.map((elem) => (
          <TinderCard
            className={styles.swipe}
            key={elem.id}
            onSwipe={(dir) => swiped(dir, elem.name)}
            onCardLeftScreen={() => outOfFrame(elem.name)}
          >
            <div style={{ backgroundImage: 'url(' + elem.image + ')' }} className={styles.card}>
              <h3>{elem.name}</h3>
            </div>
          </TinderCard>
        ))}
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