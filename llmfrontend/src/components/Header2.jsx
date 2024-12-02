import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightFromBracket, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const ACCESS_TOKEN = "accessToken";
const ADMIN_ACCESS_TOKEN = "adminAccessToken";
const REFRESH_TOKEN = "refreshToken";
const ADMIN_REFRESH_TOKEN = "adminRefreshToken";

const Header = ({ toggleSidebar }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(ADMIN_ACCESS_TOKEN);
      if (token) {
        try {
          const config = { headers: { "Authorization": `Bearer ${token}` } };
          await axios.get("http://127.0.0.1:8000/api/user/", config);
          setLoggedIn(true);
        } catch (error) {
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    };
    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN) || localStorage.getItem(ADMIN_REFRESH_TOKEN);
    const accessToken = localStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(ADMIN_ACCESS_TOKEN);

    if (refreshToken) {
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/logout/",
          { "refresh": refreshToken },
          { headers: { "Authorization": `Bearer ${accessToken}` } }
        );

        [ACCESS_TOKEN, ADMIN_ACCESS_TOKEN, REFRESH_TOKEN, ADMIN_REFRESH_TOKEN, "newChatId"].forEach((key) => 
          localStorage.removeItem(key)
        );

        setLoggedIn(false);
        navigate("/");
      } catch (error) {
        console.log("Failed to logout!");
      }
    }
  };

  return (
    <header className="bg-white shadow p-1 flex justify-between items-center header-shadow">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-lg mr-4"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div className="flex space-x-2">
        {isLoggedIn ? (
          <>
            <div>
              <button 
                onClick={handleLogout}
                className="bg-white hover:bg-gray-200 text-black py-2 px-2 rounded-lg flex items-center"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </div>
            
            <div>
              <Link to="/profile" className="bg-white hover:bg-gray-200 text-black py-2 px-2 rounded-lg flex items-center">
                <FontAwesomeIcon icon={faUserLarge} className="mr-2" />
              </Link>
            </div>
          </>
        ) : (
          <div>
            <Link to="/" className="bg-white hover:bg-gray-200 text-black py-2 px-2 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
