import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Navbar from "../components/Navbar";
import style from "../components/TitlesSlider.module.css";
import TitlesSlider from "../components/TitlesSlider";
import { useNavigate, useParams } from "react-router-dom";

const SecondPAge = () => {
 const [userList, setUserList] = useState([]);
 const [likedList, setLikedList] = useState([]);
 const [user, setUser] = useState({ likedAnime: [] });
 const [socket, setSocket] = useState(null);
 const { roomId, setRoomId } = useParams();
 const { roomId, setRoomId } = useParams();
 const [pisa, setPisa] = useState([]);
 const navigate = useNavigate();
 
 useEffect(() => {
  const newSocket = io("http://89.104.65.22", { transports: ["polling", "websocket"] });
  const kek =0 
  const kek2 =0 
  const kek3 =0 
  const kek3 =0 
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
  newSocket.on("room-created", (data) => {
    setRoomId(data.roomId);
  })

  setSocket(newSocket);

  return () => {
   newSocket.disconnect();
  };
 }, []);

 const onSwipe = (updatedLikedList) => {
  socket.emit("updateLikedList", { likedAnime: updatedLikedList });
 };

 const handleShareButtonClick = () => {
  const currentURL = window.location.href;

  navigator.clipboard.writeText(currentURL).then(() => {
    console.log("URL скопирован в буфер обмена");
  });
};

setTimeout(() => {
  console.log(pisa)

}, 5000);

useEffect(() => {
  if(roomId) {
    navigate(`/room/${roomId}`);
  }
}, [roomId]);

 return (


  <div>
   <Navbar></Navbar>
   <div className=" w-screen  my-0 mx-auto">
    <ul>
     {likedList.map((likedAnime, index) => (
      <li className="text-white" key={index}>{likedAnime.name}</li>
     ))}
    </ul>
    <div>
    {userList.map((username, index) => (
     <li className="text-white list-none" key={index}>{username}</li>
    ))}
    </div>
     <li className="text-white list-none">{pisa.name}</li>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:focus:ring-blue-800 font-medium rounded-lg 
        text-sm px-10 py-2.5 text-center me-2 mb-2"
        onClick={handleShareButtonClick}
      >
      Поделиться
      </button>
    </div>
    {socket && (
     <div className={style.sliderBlock}>
      <TitlesSlider
       socket={socket}
       user={user}
       setUser={setUser}
       onSwipe={onSwipe}
       roomId={roomId}
      />
      ,
     </div>
    )}
   </div>
  </div>
 );
};

export default SecondPAge;
