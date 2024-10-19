import React from 'react';
import { Button } from "@material-tailwind/react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate('/login');
  };

  return (
    <div className='flex w-full items-center justify-between'>
      <span className='text-indigo-500 font-bold'><span className='text-gray-600'>File</span> Uploader</span>
      <div className='items-center gap-2 hidden sm:flex'>
        <Button className='bg-indigo-500 capitalize'>Profile</Button>
        <Button className='bg-red-300 px-3 capitalize' onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
