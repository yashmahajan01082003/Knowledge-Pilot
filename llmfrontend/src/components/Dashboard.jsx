import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header'; // Import the Header component
 // Import the Sidebar component

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className="h-screen" />

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Dashboard Content */}
        <main className="flex-grow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
          <div className="bg-white p-6 rounded-lg mb-6 shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Analytics Report</h3>
            <p className="text-gray-700">Here you can view the analytics and performance reports of the LLM, including various metrics and documentation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/markdown-creation">
              <div className="bg-white p-6 rounded-lg shadow hover:bg-gray-100 flex flex-col justify-between h-full max-w-xs mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Markdown Generation</h3>
                <p className="text-gray-700 flex-grow">Generate and manage markdown content for your datasets.</p>
              </div>
            </Link>
            <Link to="/dataset-creation">
              <div className="bg-white p-6 rounded-lg shadow hover:bg-gray-100 flex flex-col justify-between h-full max-w-xs mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dataset Creation</h3>
                <p className="text-gray-700 flex-grow">Extract data, generate markdown, and create datasets.</p>
              </div>
            </Link>
            <Link to="/pre-training">
              <div className="bg-white p-6 rounded-lg shadow hover:bg-gray-100 flex flex-col justify-between h-full max-w-xs mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Pre-training</h3>
                <p className="text-gray-700 flex-grow">Prepare your model for fine-tuning with pre-training data.</p>
              </div>
            </Link>
            <Link to="/fine-tuning">
              <div className="bg-white p-6 rounded-lg shadow hover:bg-gray-100 flex flex-col justify-between h-full max-w-xs mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Fine-tuning</h3>
                <p className="text-gray-700 flex-grow">Fine-tune your model for specific tasks or domains.</p>
              </div>
            </Link>
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
