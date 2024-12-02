import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          };
          await axios.get("http://127.0.0.1:8000/api/user/", config);
          setIsLoggedIn(true);
        } catch (error) {
          setIsLoggedIn(false);
        }
      }
    };
    checkLoggedInUser();
  }, []);
  useEffect(() => {
    const checkLoggedInAdmin = async () => {
      const token = localStorage.getItem("adminAccessToken");
      if (token) {
        try {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          };
          await axios.get("http://127.0.0.1:8000/api/user/", config);
          setIsAdminLoggedIn(true);
        } catch (error) {
          setIsAdminLoggedIn(false);
        }
      }
    };
    checkLoggedInAdmin();
  }, []);

  const handleChatButtonClick = () => {
    if (isLoggedIn || isAdminLoggedIn) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  const handleDashboardButtonClick = () => {
    if (isAdminLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
  
      <main className="flex-grow bg-gray-50 py-5">
      <Header />
        <div className="text-center w-full max-w-5xl mx-auto">
          <h2 className="text-6xl font-bold text-gray-900 mb-8">Welcome to KnowledgePilot</h2>
          <p className="text-xl text-gray-800 mb-12">
            Empowering university students with quick and accurate academic support. KnowledgePilot, your AI-powered chatbot, utilizes a cutting-edge 1-bit Large Language Model to provide the answers you need, when you need them.
          </p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900">1-bit LLM Implementation</h3>
              <p className="text-gray-700">Efficient and accurate model responses.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900">File Conversion Software</h3>
              <p className="text-gray-700">Convert files to Markdown efficiently.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900">Custom Dataset Creation</h3>
              <p className="text-gray-700">Tailored datasets for academic needs.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900">Model Performance Analytics</h3>
              <p className="text-gray-700">Comprehensive model evaluation.</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleChatButtonClick}
              className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg"
            >
              Use Chatbot
            </button>
              <button
              onClick={handleDashboardButtonClick}
               className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg">
                Go to Dashboard
              </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-70 text-gray-900 py-4 mt-1">
        <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <p>&copy; {new Date().getFullYear()} VIT, Pune. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
