import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import styles from "./TitlesSlider.module.css";
import axios from "axios";


const TitlesSlider = () => {


 const [lastDirection, setLastDirection] = useState();

 const [dataDisplay, setDataDisplay] = useState([]);


 useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime&limit=100")
      .then((response) => {
        // Check if the response status is OK (200)
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data.data; // Access the 'data' property of the response
      })
      .then((data) => {
        const newDataDisplay = data.map((elem) => ({
          id: elem.mal_id,
          image: elem.images.jpg.large_image_url,
          name: elem.title,
        }));
        setDataDisplay(newDataDisplay);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // The empty dependency array ensures that the effect runs only once

const swiped = (direction, nameToDelete) => {
  console.log("removing: " + nameToDelete);
  setLastDirection(direction);
 };

 console.log(dataDisplay.length)


 const outOfFrame = (name) => {
  console.log(name + " left the screen!");
 };
 return (
  <div >
   <div className={styles.cardContainer}>
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
