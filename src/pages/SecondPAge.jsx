import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import TitlesSlider from "../components/TitlesSlider";

const SecondPAge = () => {
 const [userList, setUserList] = useState([]);
 const [likedList, setLikedList] = useState([]);
 const [user, setUser] = useState({ likedAnime: [] });

 useEffect(() => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  socket.on("userConnected", (userId) => {
   console.log(`User connected: ${userId}`);
  });
  socket.on("userList", (usernames) => {
   setUserList(usernames);
  });
  socket.on("likedList", (likedanime) => {
    setLikedList(likedanime);
  });
  socket.on("updateLikedList", (updatedLikedList) => {
    setLikedList(updatedLikedList);
  });

  return () => {
   socket.disconnect();
  };
 }, []);

 
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

   <TitlesSlider onSwipe={(updatedLikedList) => setLikedList(updatedLikedList)} user={user} setUser={setUser}></TitlesSlider>
  </div>
 );
};

export default SecondPAge;
