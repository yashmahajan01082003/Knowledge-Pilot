import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/chatui/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access);
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user data

        navigate('/chat'); // Redirect to chat UI
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative z-10">
      <div className="text-3xl font-bold text-gray-800 mb-6">LOG IN</div>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-b-2 border-gray-300 focus:border-gray-700 outline-none py-2 transition-all duration-300"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-gray-300 focus:border-gray-700 outline-none py-2 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-md transition-all duration-300 hover:bg-gray-300 focus:outline-none mt-1 mb-4"
        >
          GO
        </button>
        {error && <p className="mb-3 text-red-500 text-center">{error}</p>}
        <button className="w-full bg-gray-800 text-white py-2 rounded-md transition-all duration-300 hover:bg-gray-700 focus:outline-none mb-4">Admin Login</button>
        <a href="/" className="text-gray-500 block text-center hover:underline">Forgot your password?</a>
      </form>
    </div>
  );
};

export default Login;
