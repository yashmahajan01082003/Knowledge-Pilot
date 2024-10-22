import React, { useState, useEffect } from 'react';

function Sidebar({ expanded, onToggle, onChatSelect }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [showModelSettings, setShowModelSettings] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('http://localhost:8000/chatui/chats/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch chat history');
        
        const data = await response.json();
        setChatHistory(data.reverse()); // Reverse to show newest first
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  const addNewChat = async () => {
    try {
      const response = await fetch('http://localhost:8000/chatui/chats/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title: 'New Chat' })
      });

      if (!response.ok) throw new Error('Failed to create chat');
      
      const data = await response.json();
      setChatHistory(prev => [data.chat, ...prev]); // Add new chat at the top
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleChatSelect = (chatId) => {
    onChatSelect(chatId); // Pass chatId to parent component
  };

  return (
    <div className="relative h-full">
      <button 
        onClick={onToggle} 
        className={`absolute top-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-transform duration-300 ${expanded ? 'translate-x-64' : 'translate-x-0'}`}
        style={{ width: '40px', height: '40px' }}
      >
        {expanded ? '<' : '>'}
      </button>

      <div className={`bg-black text-white h-full fixed left-0 top-0 ${expanded ? 'w-64' : 'w-0'} transition-all duration-300 ${expanded ? 'visible' : 'invisible'}`}>
        <div className="p-4 h-full">
          <button onClick={addNewChat} className="w-full bg-blue-600 text-white p-2 rounded-lg mb-4 mt-10">New Chat</button>
          <div className="space-y-2 overflow-y-auto max-h-[calc(100%-200px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
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
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={() => setShowModelSettings(!showModelSettings)} 
              className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700"
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
