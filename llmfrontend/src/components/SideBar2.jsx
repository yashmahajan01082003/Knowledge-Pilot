import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sidebar({ expanded, toggleSidebar, onChatSelect }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [showModelSettings, setShowModelSettings] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chats/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken') || localStorage.getItem('adminAccessToken')}`
          }
        });
        setChatHistory(response.data.reverse()); // Reverse to show newest first
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  const addNewChat = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/chats/create/',
        { title: 'New Chat' },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken') || localStorage.getItem('adminAccessToken')}`
          }
        }
      );
      setChatHistory(prev => [response.data.chat, ...prev]); // Add new chat at the top
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleChatSelect = (chatId) => {
    onChatSelect(chatId); // Pass chatId to parent component
  };

  return (
    <div className="relative h-full">
      <div 
        className={`bg-gray-950 text-white h-full fixed left-0 top-18 border rounded ${expanded ? 'w-64' : 'w-0'} transition-all duration-300 ${expanded ? 'visible' : 'invisible'}`}
      >
        <div className="p-4 h-full">
          <button onClick={addNewChat} className={`w-full bg-gray-600 text-white p-2 rounded-lg mb-4 ${expanded ? 'visible' : 'invisible'}`}>New Chat</button>
          <div className="space-y-2 overflow-y-auto max-h-[calc(100%-150px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
            {chatHistory.map(chat => (
              <div
                key={chat.id}
                className="p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                onClick={() => handleChatSelect(chat.id)}
              >
                {chat.title}
              </div>
            ))}
          </div>
          <div className={`absolute bottom-10 left-4 right-4 ${expanded ? 'visible' : 'invisible'}`}>
            <button 
              onClick={() => setShowModelSettings(!showModelSettings)} 
              className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
            >
              Model Settings
            </button>
            {showModelSettings && (
              <div className="bg-gray-700 p-4 rounded-md mt-2 space-y-2">
                <div>
                  <label className="block mb-1">Temperature (0 to 1)</label>
                  <input type="range" min="0" max="1" step="0.1" className="w-full" />
                </div>
                <div>
                  <label className="block mb-1">Max Tokens</label>
                  <input type="number" className="w-full bg-gray-600 p-1 rounded" />
                </div>
                <button className="w-full bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700">Generate Corresponding Diagram</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
