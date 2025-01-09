import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    console.log('clicked');

    try {
      const response = await fetch('https://backend-app-c5d0.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data, "data");
      if (response.ok) {
        setMessage('Registration successful!');
        setTimeout(() => navigate('/login'), 1500); // Redirect to login
      } else {
        setMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleSocialLogin = (provider) => {
    // Placeholder logic for social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input type="text" name="mobileNumber" placeholder="Mobile Number" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button className='register-btn' type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
      <div className="social-login">
        <p>Or login with:</p>
        <div className='icons-container'>
          <button className="social-button" onClick={() => handleSocialLogin('Google')}>
            <img src='https://www.svgrepo.com/show/303108/google-icon-logo.svg' alt='google' className='google'/>
          </button>
          <button className="social-button" onClick={() => handleSocialLogin('Facebook')}>
            <img src='https://www.svgrepo.com/show/303114/facebook-3-logo.svg' alt='facebook' className='facebook'/>
          </button>
          <button className="social-button" onClick={() => handleSocialLogin('Apple')}>
            <img src='https://www.svgrepo.com/show/303110/apple-black-logo.svg' alt='apple' className='apple'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
