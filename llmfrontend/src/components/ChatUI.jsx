import React, { useState } from 'react';
import Sidebar from './SideBar2';
import Header from './Header2';
import ChatArea from './ChatArea';
import ProfilePage from './ProfilePage';

function ChatUI() {
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);

  // Function to toggle sidebar visibility
  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 fixed">
      <>
        <Sidebar 
          expanded={sidebarExpanded} 
          toggleSidebar={handleSidebarToggle} // Pass toggle function to Sidebar
          onChatSelect={handleChatSelect} 
        />
        <ChatArea 
          sidebarExpanded={sidebarExpanded} 
          selectedChatId={selectedChatId} 
        />
        {/* If you have a profile page and need to show it, handle its visibility here */}
        {showProfile && <ProfilePage />}
      </>
    </div>
  );
}

export default ChatUI;
