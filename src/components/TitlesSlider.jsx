import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import styles from "./TitlesSlider.module.css";
import axios from "axios";



const TitlesSlider = () => {
  const BASE_URL = "https://api.jikan.moe/v4/top/anime";
  const randomPage = Math.floor(Math.random() * 1000) + 1;

  const [lastDirection, setLastDirection] = useState();
  const [dataDisplay, setDataDisplay] = useState([]);
  const [swipedCards, setSwipedCards] = useState(0);
  const [canSwipe, setCanSwipe] = useState(true);


  useEffect(() => {
    if (swipedCards === dataDisplay.length) {
      axios
      .get(`${BASE_URL}?page=${randomPage}`)
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
          setSwipedCards(0);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [swipedCards, dataDisplay.length]);
  
  useEffect(() => {
    if (swipedCards === dataDisplay.length && canSwipe) {
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
          } else {
            setCanSwipe(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [swipedCards, dataDisplay.length, canSwipe]);

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction);
    setSwipedCards((prevCount) => prevCount + 1);
    console.log(`Swiped  ${direction}`);

    setDataDisplay((prevData) => prevData.filter((elem) => elem.name !== nameToDelete));
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < dataDisplay.length) {
      await childRefs[currentIndex].current.swipe(dir)  //Swipe не юзается почему то
    }
  }

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!"); //ХЗ надо это ил нет вообще
  };

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