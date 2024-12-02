// components/ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamationCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken') || localStorage.getItem('adminAccessToken')}`,
          },
        });
        setProfileData(response.data);
      } catch (err) {
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <FontAwesomeIcon icon={faSpinner} spin className="text-green-700 mr-2" />
      <span>Loading...</span>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative max-w-lg">
        <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
        {error}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 relative">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-4 left-4 text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300"
        aria-label="Go Back"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="w-full max-w-lg bg-gradient-to-br from-white to-gray-100 p-10 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          <div 
            className="w-32 h-32 bg-gray-300 rounded-full mb-6 shadow-lg border-4 border-white"
            style={{ backgroundImage: `url(${profileData.profile_image || '/path/to/default-image.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          
          <div className="text-center space-y-4">
            <div className="text-2xl font-semibold text-gray-800">{profileData.username}</div>
            <div className="text-gray-500">{profileData.email}</div>
          </div>

          <div className="mt-6 w-full">
            <div className="text-center border-t border-gray-300 pt-6 text-gray-600">
              <p className="text-lg">Welcome back, <span className="font-medium">{profileData.username}</span>!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
