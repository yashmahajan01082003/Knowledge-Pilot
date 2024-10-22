// components/ProfilePage.js
import React from 'react';

function ProfilePage({ onBack }) {
  return (
    <div className="w-full h-full bg-white p-8">
      <button 
        onClick={onBack} 
        className="bg-gray-800 text-white p-2 rounded-lg mb-4 hover:bg-gray-700 transition-colors duration-200"
      >
        Back to Chat
      </button>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-2"></div>
          <button className="bg-gray-800 text-white p-2 rounded-lg w-full hover:bg-gray-700 transition-colors duration-200">
            Upload New Image
          </button>
        </div>
        <div className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded-lg" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg" />
          <textarea placeholder="Bio" className="w-full p-2 border rounded-lg" rows="4"></textarea>
          <button className="bg-gray-800 text-white p-2 rounded-lg w-full hover:bg-gray-700 transition-colors duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;