import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const editProfile = () => {
    navigate('/edit');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    navigate('/login');
  };

  return (
    <div className="text-white flex">
      <img src="../../public/logo.png" alt="" className="w-20 h-20" />
      <div className="div">
        <p>Профиль</p>
        <p>{username}</p>
        <button onClick={editProfile}>Личный кабинет</button>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
};

export default ProfilePage;
