import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import style from "../components/TitlesSlider.module.css";


import TitlesSlider from "../components/TitlesSlider";

const SecondPAge = () => {
 return (
  <div>
   <Navbar></Navbar>
   <div className={style.sliderBlock}>
    <TitlesSlider></TitlesSlider>
   </div>
  </div>
 );
};

export default SecondPAge;
