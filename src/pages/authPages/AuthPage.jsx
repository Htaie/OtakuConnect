import React, { useState } from 'react'
import LoginBlock from '../../components/authComponents/LoginBlock'
import RegistrationBlock from '../../components/authComponents/RegistrationBlock'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-white p-8 rounded-md shadow-lg overflow-hidden relative">
        <div className="h-12 flex mb-4">
          <button
            className={`flex-1 h-full text-center cursor-pointer z-10 ${
              activeTab === 'login'
                ? 'text-white bg-stone-700'
                : 'text-black bg-white'
            }`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 h-full text-center cursor-pointer z-10 ${
              activeTab === 'signup'
                ? 'text-white bg-stone-700'
                : 'text-black bg-white'
            }`}
            onClick={() => handleTabChange('signup')}
          >
            Signup
          </button>
        </div>
        <div className="h-full relative overflow-hidden">
          <div
            className="slider-container flex transition-transform"
            style={{
              transform:
                activeTab === 'login' ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            <div className="w-full">
              {activeTab === 'login' && <LoginBlock />}
            </div>
          </div>
          <div
            className="slider-container flex transition-transform"
            style={{
              transform:
                activeTab === 'signup' ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            <div className="w-full">
              {activeTab === 'signup' && <RegistrationBlock />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
