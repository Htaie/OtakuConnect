import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem('token');
      setLoggedIn(!!token);
    };

    checkLoggedInStatus();
  }, []);

  return isLoggedIn;
};

export default useAuth;
