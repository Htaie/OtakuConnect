import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';


import TitlesSlider from "../components/TitlesSlider";  


const SecondPAge = ({popular}) => {


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
