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
 const [pisa, setPisa] = useState([]);

 useEffect(() => {
  const newSocket = io("http://localhost:8080", { transports: ["polling", "websocket"] });

  newSocket.on("userConnected", (userId) => {
   console.log(`User connected: ${userId}`);
  });
  newSocket.on("userList", (usernames) => {
   setUserList(usernames);
  });
  newSocket.on("likedList", (likedanime) => {
   setLikedList(likedanime);
  });
  newSocket.on("updateLikedList", (updateLikedList) => {
   setLikedList(updateLikedList);
  });
  newSocket.on("matchingAnime", (data) => {
    setPisa(data);
  }); 

  setSocket(newSocket);

  return () => {
   newSocket.disconnect();
  };
 }, []);

 const onSwipe = (updatedLikedList) => {
  socket.emit("userArray", { likedAnime: updatedLikedList });
 };

setTimeout(() => {
  console.log(pisa)

}, 5000)
 return (


  <div>
   <Navbar></Navbar>
   <div className=" w-72  my-0 mx-auto">
    <h1 className="text-white">React Tinder Card</h1>
    <ul>
     {likedList.map((likedAnime, index) => (
      <li className="text-white" key={index}>{likedAnime.name}</li>
     ))}
    </ul>
    <div className="border border-blue-500 p-4">
    {userList.map((username, index) => (
     <li className="text-white list-none" key={index}>{username}</li>
    ))}
    </div>
     <li className="text-white list-none">{pisa.name}</li>
    {socket && (
     <div className={style.sliderBlock}>
      <TitlesSlider
       socket={socket}
       user={user}
       setUser={setUser}
       onSwipe={onSwipe}
      />
      ,
     </div>
    )}
   </div>
  </div>
 );
};

export default SecondPAge;
