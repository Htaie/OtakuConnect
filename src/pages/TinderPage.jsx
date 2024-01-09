import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from '../components/NavigationBar/Navbar';
import style from '../components/sliderComponents/AnimeSlider/AnimeSlider.module.css';
import AnimeSlider from '../components/sliderComponents/AnimeSlider/AnimeSlider';
import { useNavigate, useParams } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';

import { DEV_URL } from '../constants/constants';
import MainButtons from '../components/ui/buttons/MainButtons';
import MatchResults from '../components/MatchAnime/MatchResults';

const TinderPage = () => {
  const { roomId, setRoomId } = useParams();

  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [user, setUser] = useState({ likedAnime: [] });
  const [socket, setSocket] = useState(null);
  const [matchingAnime, setMatchingAnime] = useState([]);

  useEffect(() => {
    const newSocket = io('http://' + DEV_URL + ':3001', {
      transports: ['polling', 'websocket'],
    });

    newSocket.on('userConnected', (userId) => {
      console.log(`User connected: ${userId}`);
    });
    newSocket.on('userList', (usernames) => {
      setUserList(usernames);
    });
    newSocket.on('likedList', (likedanime) => {
      setLikedList(likedanime);
    });
    newSocket.on('updateLikedList', (updateLikedList) => {
      setLikedList(updateLikedList);
    });
    newSocket.on('matchingAnime', (data) => {
      setMatchingAnime(data);
    });
    newSocket.on('room-created', (data) => {
      setRoomId(data.roomId);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  const onSwipe = (updatedLikedList) => {
    socket.emit('updateLikedList', { likedAnime: updatedLikedList });
  };

  const handleShareButtonClick = () => {
    const currentURL = window.location.href;

    navigator.clipboard.writeText(currentURL).then(() => {
      console.log('URL скопирован в буфер обмена');
    });
  };

  useEffect(() => {
    if (roomId) {
      navigate(`/huy/${roomId}`);
    }
  }, [roomId]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="w-screen my-0 mx-auto pl-5">
        <div className="absolute top-24 left-2">
          <MainButtons onClick={handleShareButtonClick}>Поделиться</MainButtons>
          <ul>
            {likedList.map((likedAnime, index) => (
              <li className="text-white" key={index}>
                {likedAnime.name}
              </li>
            ))}
          </ul>
          <div className="border border-white w-40 rounded p-3">
            <GroupIcon className="text-white" />
            {userList.map((username, index) => (
              <li className="text-white list-none" key={index}>
                {username}
              </li>
            ))}
          </div>
          {/* {console.log(!!matchingAnime.name)} */}
          {matchingAnime.name && (
            <MatchResults
              openModal={true}
              matchingAnimeName={matchingAnime.name}
              matchingAnimeImage={matchingAnime.image}
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></div>
        {socket && (
          <div className={style.sliderBlock}>
            <AnimeSlider socket={socket} user={user} setUser={setUser} onSwipe={onSwipe} roomId={roomId} />,
          </div>
        )}
      </div>
    </div>
  );
};

export default TinderPage;
