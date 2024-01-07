import React from 'react';
import MainButtons from '../../ui/buttons/MainButtons';
import { useNavigate } from 'react-router-dom';

const ProfileBlock = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    navigate('/login');
  };
  const imageURLs = Array.from(
    { length: 5 },
    (_, index) =>
      'https://w7.pngwing.com/pngs/215/897/png-transparent-happy-material-free-anime-characters-girls-lovely-thumbnail.png'
  );

  return (
    <div
      className="grid  gap-20  mx-auto  border rounded-lg p-4 mt-16 "
      style={{ gridTemplateColumns: '200px 600px 280px' }}
    >
      <div>
        <img
          src="https://i.pinimg.com/736x/25/3b/55/253b55063cfd0228461afef2c8d3f162.jpg"
          alt=""
          className="w-48 h-48 rounded-full mr-4 mb-8"
        />
        <MainButtons onClick={handleLogout}>Выйти</MainButtons>
      </div>
      <div className="text-white">
        <div className="h-16">
          <p className="text-3xl">12321</p>
        </div>
        <div>
          <p className="text-xl mb-4">
            LOREM LOREM LOREM LOREM LOREMLOREM LOREM LOREM LOREM LOREMLOREM LOREM LOREM LOREM LOREMLOREM LOREM LOREM
            LOREM LOREMLOREM LOREM LOREM LOREM LOREMLOREM LOREM LOREM LOREM LOREM
          </p>
        </div>
        <div className="flex ">
          {imageURLs.map((url, index) => (
            <img key={index} src={url} alt="" className="w-14 h-14 rounded-full mr-2 mb-2" />
          ))}
        </div>
      </div>
      <div className=" self-center">
        <MainButtons onClick={handleLogout}>Добавить в друзья</MainButtons>
        <MainButtons onClick={handleLogout}>Удалить из друзей</MainButtons>
      </div>
    </div>
  );
};

export default ProfileBlock;
