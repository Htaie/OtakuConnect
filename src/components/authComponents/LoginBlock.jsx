import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEV_URL, Route } from '../../constants/constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const data = {
        login,
        password,
      };

      const response = await fetch(`http://${DEV_URL}:3001/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Вход успешен! Токен:', responseData.token);
        console.log('Имя пользователя:', responseData.username);

        localStorage.setItem('token', responseData.token);
        localStorage.setItem('username', responseData.username);

        navigate(Route.HOME);
      } else {
        console.error('Ошибка входа');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <div className=" items-center ">
      <div className="">
        <input
          type="text"
          placeholder="Логин"
          className="mb-5 p-2 rounded-md bg-transparent border border-gray-500 w-full"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <div className="relative mb-5">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            className="p-2 rounded-md bg-transparent border border-gray-500 pr-10  w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={`absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg
              className={`flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-600`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showPassword && (
                <>
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                  <line x1="15" x2="19" y1="15" y2="19" />
                </>
              )}
              <line x1="19" x2="15" y1="15" y2="19" />
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        <button className="w-full p-2 border rounded-md bg-gray-500 text-white" onClick={handleLogin}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
