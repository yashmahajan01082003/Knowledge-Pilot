import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
      setSuccessMessage("Registration Successful!");
      setTimeout(() => {
        setSuccessMessage(null);
        setFormData({
          username: "",
          email: "",
          password1: "",
          password2: "",
        });
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach(field => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setErrorMessage(errorMessages[0]); // Set the first error message
            setTimeout(() => {
              setErrorMessage(null); // Clear the error message after 2 seconds
              // Optionally, you can decide whether to reset form fields here
            }, 2000);
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-md">
      <div className="text-3xl font-bold text-gray-200 mb-6">REGISTER</div>
      <form onSubmit={handleSubmit}> {/* Make sure to set the form's onSubmit to handleSubmit */}
        <div className="mb-4">
          <input
            type="text"
            name='username'
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name='email'
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password1" // Added name attribute
            placeholder="Password"
            value={formData.password1}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password2" // Added name attribute
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white outline-none py-2 text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
        <button
          type="submit" disabled={isLoading} // Correctly use type="submit"
          className="w-full bg-white text-gray-800 py-2 rounded-md transition-all duration-300 hover:bg-gray-200 focus:outline-none mt-2 mb-4"
        >
          REGISTER
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
