import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faChevronRight, faAnglesRight, faGraduationCap } from '@fortawesome/free-solid-svg-icons';


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    isSidebarOpen && (
      <div className="flex h-screen sidebar-transition"> 
      <div className="w-60 bg-gray-800 text-white flex flex-col h-screen">
        <div className="p-4 text-2xl font-semibold">
          <Link to="/"> 
          <FontAwesomeIcon icon={faGraduationCap} /> 
          KnowledgePilot
          </Link>
        </div>
        <nav className="flex-grow p-4">
          <ul>
          <li className="mb-4">
              <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded block">
              <FontAwesomeIcon icon={faGrip} className="inline-block mr-2" />
                Dashboard
              </Link>
            </li>
          <li className="mb-4">
              <Link to="/markdown-creation" className="hover:bg-gray-700 p-2 rounded block">
              <FontAwesomeIcon icon={faAnglesRight} className="inline-block mr-2"/>
                Markdown Converter
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/dataset-creation" className="hover:bg-gray-700 p-2 rounded block">
              <FontAwesomeIcon icon={faAnglesRight} className="inline-block mr-2"/>
                Dataset Creator
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/dataset-combiner" className="hover:bg-gray-700 p-2 rounded block">
              <FontAwesomeIcon icon={faAnglesRight} className="inline-block mr-2"/>
                Dataset Combiner
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/pre-training" className="hover:bg-gray-700 p-2 rounded block">
              <FontAwesomeIcon icon={faAnglesRight} className="inline-block mr-2"/>
                Pre-Training
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/fine-tuning" className="hover:bg-gray-700 p-2 rounded block">
              <FontAwesomeIcon icon={faAnglesRight} className="inline-block mr-2"/>
                Fine-Tuning
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      </div>
    )
  );
};

export default Sidebar;
