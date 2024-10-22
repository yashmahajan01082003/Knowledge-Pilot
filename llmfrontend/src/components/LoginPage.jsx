// src/App.js
import React, { useState } from 'react';
import Login from './login';
import Register from './Register';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative w-80">
        <div className={`transition-all duration-500 ease-in-out ${
          isRegistering ? 'scale-95 -translate-y-4 opacity-70 w-12/12 mx-auto' : 'scale-100'
        }`}>
          <div className="absolute inset-x-0 -top-2 h-4 bg-gray-800 rounded-t-lg transform scale-95"></div>
          <Login />
        </div>
        <div className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
          isRegistering ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <Register />
        </div>
        {!isRegistering && (
          <button
            onClick={() => setIsRegistering(true)}
            className="absolute top-6 -right-10 bg-gray-700 text-white w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none hover:bg-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
        {isRegistering && (
          <button
            onClick={() => setIsRegistering(false)}
            className="absolute top-6 -right-10 bg-gray-700 text-white w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none hover:bg-gray-600 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;