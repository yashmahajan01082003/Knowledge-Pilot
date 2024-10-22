import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white bg-opacity-70 text-gray-800 py-4">
        <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
        
          <nav>
          <FontAwesomeIcon icon={faGraduationCap} size="2x" className='mr-6'/> 
            <Link to="/" className="text-gray-600 hover:text-gray-800 mx-2">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800 mx-2">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800 mx-2">Contact</Link>
          </nav>
          <Link to="/login" className="text-gray-600 hover:text-gray-800 mx-2">Login</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-8"> {/* Added padding-top for space */}
        <div className="text-center w-full max-w-5xl mx-auto">
          <h2 className="text-6xl font-bold text-gray-800 mb-8">Welcome to KnowledgePilot</h2>
          <p className="text-xl text-gray-700 mb-12">
            Empowering university students with quick and accurate academic support. KnowledgePilot, your AI-powered chatbot, utilizes a cutting-edge 1-bit Large Language Model to provide the answers you need, when you need them.
          </p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800">1-bit LLM Implementation</h3>
              <p className="text-gray-600">Efficient and accurate model responses.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800">File Conversion Software</h3>
              <p className="text-gray-600">Convert files to Markdown efficiently.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800">Custom Dataset Creation</h3>
              <p className="text-gray-600">Tailored datasets for academic needs.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800">Model Performance Analytics</h3>
              <p className="text-gray-600">Comprehensive model evaluation.</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Link to="/chat">
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg">
                Use Chatbot
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-70 text-gray-800 py-4 mt-1"> {/* Added margin-top for space */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <p>&copy; {new Date().getFullYear()} VIT, Pune. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
