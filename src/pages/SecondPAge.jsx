import React, { useEffect, useState } from "react";
import io from "socket.io-client";


import TitlesSlider from "../components/TitlesSlider";  

const SecondPAge = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000', { transports: ['websocket'] });

    socket.on('userConnected', (userId) => {
      console.log(`User connected: ${userId}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

 return (
    <div className="  w-72  my-0 mx-auto">
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <TitlesSlider ></TitlesSlider>
    </div>
 );
};

export default SecondPAge;
