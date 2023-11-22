import React, { useEffect, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import style from "./TitlesSlider.module.css";
import axios from "axios";


const TitlesSlider = ({ onSwipe, user, setUser }) => {
  const BASE_URL = "https://api.jikan.moe/v4/top/anime";
  const [db, setDb] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  );


  const swiped = async (direction, nameToDelete,index) => {
    if (direction === "right") {
      const likedAnime = dataDisplay.find((elem) => elem.name === nameToDelete);
      user.likedAnime.push(likedAnime);
      setLastDirection(direction);
      console.log(`Swiped ${direction}`);
          updateCurrentIndex(index - 1);

      setDataDisplay((prevData) => prevData.filter((elem) => elem.name !== nameToDelete));
      console.log(user.likedAnime);


      onSwipe([...user.likedAnime]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;



  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx) {
      setDb((prevDb) => prevDb.filter((_, i) => i !== idx));
      updateCurrentIndex(currentIndexRef.current - 1);

    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      console.log("Swiping:", dir);
      await childRefs[currentIndex].current.swipe(dir);
      setDb((prevDb) => prevDb.slice(0, currentIndex).concat(prevDb.slice(currentIndex + 1)));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (db.length <= 5) {

        const randomPage = Math.floor(Math.random() * 1000) + 1;
        const response = await axios.get(`${BASE_URL}?page=${randomPage}`);
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const data = response.data.data || [];
        if (data.length > 0) {
          const newDataDisplay = data.map((elem) => ({
            id: elem.mal_id,
            image: elem.images.jpg.large_image_url,
            name: elem.title,
          }));
          const newData = [...db, ...newDataDisplay];
          setDb(newData)
          updateCurrentIndex(newData.length - 1)
        } }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [BASE_URL, db]);
  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className={style.cardContainer}>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={style.swipe}
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.image + ')' }}
              className={style.card}
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className={style.buttons}>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>

        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
    </div>
  )
}

export default TitlesSlider;