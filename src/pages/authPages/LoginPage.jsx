import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const data = {
        login: login,
        password: password,
      }

      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log('Вход успешен! Токен:', responseData.token)
        console.log('Имя пользователя:', responseData.username)

        localStorage.setItem('token', responseData.token)
        localStorage.setItem('username', responseData.username)

        navigate('/profile')
      } else {
        console.error('Ошибка входа')
      }
    } catch (error) {
      console.error('Произошла ошибка:', error)
    }
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col h-auto w-56 bg-white mb-0 mt-0 mx-auto">
        <input
          type="text"
          placeholder="Логин"
          className="mb-5 bg-slate-600"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="mb-5 bg-slate-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border" onClick={handleLogin}>
          Войти
        </button>
      </div>
    </div>
  )
}

export default LoginPage
