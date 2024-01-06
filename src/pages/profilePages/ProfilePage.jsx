// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavigationBar/Navbar';
// import MainButtons from '../../components/ui/buttons/MainButtons';
import PostBlock from '../../components/ProfileComponents/PostBlock';
import ProfileBlock from '../../components/ProfileComponents/ProfileBlock/ProfileBlock';

const ProfilePage = () => {
  // const navigate = useNavigate();
  // const [username, setUsername] = useState('');

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem('username');
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   }
  // }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('username');

  //   navigate('/login');
  // };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container my-0 mx-auto">
        <ProfileBlock></ProfileBlock>
        <h1 className="text-3xl text-center pb-4 pt-4">Posts</h1>
        <PostBlock></PostBlock>
      </div>
    </div>
  );
};

export default ProfilePage;
