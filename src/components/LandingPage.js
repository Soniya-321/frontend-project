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
        const response = await fetch('https://backend-app-c5d0.onrender.com/api/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          navigate('/login'); // Redirect to login if unauthorized
        }
      } catch {
        navigate('/login');
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
      <h1>
        {getGreeting()} {user.firstName} {user.lastName}
      </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LandingPage;
