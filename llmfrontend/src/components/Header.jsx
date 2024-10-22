import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
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
      <div>
        <button className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-lg flex items-center">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
          Logout
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
