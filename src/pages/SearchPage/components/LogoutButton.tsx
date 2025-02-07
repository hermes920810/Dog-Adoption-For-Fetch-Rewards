import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAPI } from '../../../services';
import { logout } from '../../../slices/authSlice';
import { clearFavorites } from '../../../slices/favoritesSlice';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAPI();               // Call the API to invalidate the session
      dispatch(logout());              // Clear auth state in Redux
      dispatch(clearFavorites());      // Optional: Clear favorites on logout
      navigate('/login');              // Redirect to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
