import React, { useState } from 'react';
import Sidebar from './SideBar2';
import ChatArea from './ChatArea';
import ProfilePage from './ProfilePage';

function ChatUI() {
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {showProfile ? (
        <ProfilePage onBack={() => setShowProfile(false)} />
      ) : (
        <>
          <Sidebar 
            expanded={sidebarExpanded} 
            onToggle={handleSidebarToggle}
            onChatSelect={handleChatSelect} 
          />
          <ChatArea 
            sidebarExpanded={sidebarExpanded} 
            selectedChatId={selectedChatId} 
          />
          <button 
            onClick={() => setShowProfile(true)} 
            className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transform hover:scale-105 transition-transform duration-200"
          >
            Profile
          </button>
        </>
      )}
    </div>
  );
}

export default ChatUI;
