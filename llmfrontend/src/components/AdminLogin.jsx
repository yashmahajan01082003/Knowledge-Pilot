import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin_login/", formData);
      
      setSuccessMessage("Admin Login Successful!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1200);

      localStorage.setItem("adminAccessToken", response.data.tokens.access);
      localStorage.setItem("adminRefreshToken", response.data.tokens.refresh);
      localStorage.setItem('newChatId', response.data.new_chat_id);  

      navigate('/dashboard');
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle both array and string error messages
        const errorMessage = error.response.data.detail || 
          (typeof error.response.data === 'object' ? 
            Object.values(error.response.data)[0]?.[0] : 
            "Invalid credentials or not an admin");
            
        setErrorMessage(errorMessage);
        setTimeout(() => {
          setErrorMessage(null);
          setFormData({
            email: "",
            password: ""
          });
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-4 left-4 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
        aria-label="Go Back"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="relative w-80">
          <div className="bg-white p-8 rounded-lg shadow-md relative z-10">
            <div className="text-3xl font-bold text-gray-800 mb-6">ADMIN LOGIN</div>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:border-gray-700 outline-none py-2 transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:border-gray-700 outline-none py-2 transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-md transition-all duration-300 hover:bg-gray-300 focus:outline-none mt-1 mb-4"
              >
                {isLoading ? 'Logging in...' : 'GO'}
              </button>
              {error && <p className="mb-3 text-red-500 text-center">{error}</p>}
              {successMessage && <p className="mb-3 text-green-500 text-center">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
