import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Navbar from "../components/Navbar";
import style from "../components/TitlesSlider.module.css";
import TitlesSlider from "../components/TitlesSlider";


const SecondPAge = () => {
 const [userList, setUserList] = useState([]);
 const [likedList, setLikedList] = useState([]);
 const [user, setUser] = useState({ likedAnime: [] });
 const [socket, setSocket] = useState(null);  

 useEffect(() => {
  const newSocket = io("http://localhost:3001", { transports: ["websocket"] });

  newSocket.on("userConnected", (userId) => {
   console.log(`User connected: ${userId}`);
  });
  newSocket.on("userList", (usernames) => {
   setUserList(usernames);
  });
  newSocket.on("likedList", (likedanime) => {
    setLikedList(likedanime);
  });
  newSocket.on("updateLikedList", (updatedLikedList) => {
    setLikedList(updatedLikedList);
  });

  setSocket(newSocket);

  return () => {
   newSocket.disconnect();
  };
 }, []);

 const onSwipe = (updatedLikedList) => {
  socket.emit("userArray", { likedAnime: updatedLikedList });
};



const SecondPAge = () => {
 return (
  <div className="  w-72  my-0 mx-auto">
   <h1>React Tinder Card</h1>
   {likedList.length > 0 && (
        <ul>
          {likedList.map((likedAnime, index) => (
            <li key={index}>{likedAnime.name}</li>
          ))}
        </ul>
      )}
   {userList.map((username, index) => (
    <li key={index}>{username}</li>
   ))}

{socket && (
     <TitlesSlider
     socket={socket}
     user={user}
     setUser={setUser}
     onSwipe={onSwipe}
   />
   )}

  <div>
   <Navbar></Navbar>
   <div className={style.sliderBlock}>
    <TitlesSlider></TitlesSlider>
   </div>

  </div>
 );
};

export default SecondPAge;
