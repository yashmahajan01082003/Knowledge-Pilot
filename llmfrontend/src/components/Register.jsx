import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/chatui/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username, 
          email, 
          password, 
          password_confirm: passwordConfirm,
          profile_image: "http://localhost:5173/login" 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Reloading...');
        setTimeout(() => {
          window.location.reload(); // Reload the page after a short delay
        }, 2000); // Delay of 2 seconds
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-md">
      <div className="text-3xl font-bold text-gray-600 mb-6">REGISTER</div>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Profile Image URL"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div> */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Repeat Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-gray-800 py-2 rounded-md transition-all duration-300 hover:bg-gray-200 focus:outline-none mt-2 mb-4"
        >
          REGISTER
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
      </form>
    </div>
  );
};

export default Register;
