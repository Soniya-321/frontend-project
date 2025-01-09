import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, removeAuthToken } from '../utils/auth';

const LandingPage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch('https://backend-app-c5d0.onrender.com/api/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set user details from API response
        } else {
          navigate('/login'); // Redirect to login if unauthorized
        }
      } catch {
        navigate('/login'); // Redirect to login on error
      }
    };
    fetchUser();
  }, [navigate]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <button className='register-btn logout-btn' onClick={handleLogout}>Logout</button>
      <h1>
        {getGreeting()} <span> {user.firstName} {user.lastName} </span>
      </h1>
    </div>
  );
};

export default LandingPage;
