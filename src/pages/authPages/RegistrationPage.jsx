import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegPage = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      const data = {
        login: login,
        username: username,
        password: password,
      }

      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log('Регистрация успешна!')
        navigate('/login')
      } else {
        console.error('Ошибка регистрации')
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
          type="text"
          placeholder="Имя"
          className="mb-5 bg-slate-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="mb-5 bg-slate-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border" onClick={handleRegister}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  )
}

export default RegPage
