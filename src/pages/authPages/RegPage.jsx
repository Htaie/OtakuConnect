import React from 'react'

const RegPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col h-auto w-56 bg-white mb-0 mt-0 mx-auto">
        <input type="text" placeholder="Логин" className="mb-5 bg-slate-600" />
        <input type="text" placeholder="Имя" className="mb-5 bg-slate-600" />
        <input type="text" placeholder="Пароль" className="mb-5 bg-slate-600" />
        <button className='border'>Войти</button>
      </div>
    </div>
  )
}

export default RegPage
