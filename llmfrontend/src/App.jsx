import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ChatUI from './components/ChatUI';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminLogin from './components/AdminLogin';
import Header from './components/Header'
import ProfilePage from './components/ProfilePage';
import DatasetCreation from './components/DatasetCreation';
import PreTraining from './components/PreTraining';
import FineTuning from './components/FineTuning';
import MarkdownCreation from './components/MarkdownCreation';
import DatasetCombiner from './components/DatasetCombiner';
import About from './components/About';
import Contact from './components/Contact';


function App() {
  return (
    
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markdown-creation" element={<MarkdownCreation />} />
          <Route path="/dataset-creation" element={<DatasetCreation />} />
          <Route path="/dataset-combiner" element={<DatasetCombiner />} />
          <Route path="/pre-training" element={<PreTraining />} />
          <Route path="/fine-tuning" element={<FineTuning />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminLogin />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
