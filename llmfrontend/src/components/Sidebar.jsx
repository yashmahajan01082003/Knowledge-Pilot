import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    isSidebarOpen && (
      <div className="flex h-screen">
      <div className="w-52 bg-gray-800 text-white flex flex-col h-screen">
        <div className="p-4 text-2xl font-semibold">
          KnowledgePilot
        </div>
        <nav className="flex-grow p-4">
          <ul>
          <li className="mb-4">
              <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded block">
                Dashboard
              </Link>
            </li>
          <li className="mb-4">
              <Link to="/markdown-creation" className="hover:bg-gray-700 p-2 rounded block">
                Markdown Generation
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/dataset-creation" className="hover:bg-gray-700 p-2 rounded block">
                Dataset Creation
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/pre-training" className="hover:bg-gray-700 p-2 rounded block">
                Pre-Training
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/fine-tuning" className="hover:bg-gray-700 p-2 rounded block">
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
