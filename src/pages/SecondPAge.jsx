import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import TitlesSlider from "../components/TitlesSlider";

const SecondPAge = () => {
 const [userList, setUserList] = useState([]);

 useEffect(() => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  socket.on("userConnected", (userId) => {
   console.log(`User connected: ${userId}`);
  });
  socket.on("userList", (usernames) => {
   setUserList(usernames);
  });
  return () => {
   socket.disconnect();
  };
 }, []);


 return (
  <div className="  w-72  my-0 mx-auto">
   <h1>React Tinder Card</h1>
   {userList.map((username, index) => (
    <li key={index}>{username}</li>
   ))}

   <TitlesSlider></TitlesSlider>
  </div>
 );
};

export default SecondPAge;
