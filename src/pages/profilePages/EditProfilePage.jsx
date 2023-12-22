import { useState } from 'react';
import Navbar from '../../components/Navbar';

const EditProfilePage = () => {
  const [newNickname, setNewNickname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNicknameSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Токен отсутствует или недействителен.');
        return;
      }

      console.log('Sending request with newNickname:', newNickname);

      const response = await fetch('http://localhost:3001/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newNickname,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Токен отсутствует или недействителен.');
        return;
      }

      console.log('Sending request with currentPassword and newPassword');

      const response = await fetch('http://localhost:3001/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ошибка при изменении пароля:', errorData.message);
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <img src="../../public/logo.png" alt="" className="w-20 h-20" />
      <div className="flex">
        <div className="w-800 h-500 bg-blue-600 p-4 flex space-x-5">
          <div>
            <div className="p-4">
              <input
                type="nickname"
                placeholder="Новый ник"
                className="mb-2 p-2"
                value={newNickname}
                onChange={handleNicknameChange}
              />
              <button className="bg-blue-900 text-white p-2 rounded-md ml-2" onClick={handleNicknameSubmit}>
                Подтвердить
              </button>
            </div>
            <div className="p-4">
              <input
                type="editpassword"
                placeholder="Текущий пароль"
                className="mb-2 p-2"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
              <input
                type="editpassword"
                placeholder="Новый пароль"
                className="mb-2 p-2 ml-2"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <button className="bg-blue-900 text-white p-2 rounded-md ml-2" onClick={handlePasswordSubmit}>
                Подтвердить
              </button>
            </div>
          </div>
          <div>
            <form className="max-w-lg mx-auto">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">
                Сменить аватар
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
              />
              <button className="bg-blue-900 text-white p-2 rounded-md">Подтвердить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
