import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import DatasetCreation from './components/DatasetCreation';
import PreTraining from './components/PreTraining';
import FineTuning from './components/FineTuning';
import MarkdownCreation from './components/MarkdownCreation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markdown-creation" element={<MarkdownCreation />} />
          <Route path="/dataset-creation" element={<DatasetCreation />} />
          <Route path="/pre-training" element={<PreTraining />} />
          <Route path="/fine-tuning" element={<FineTuning />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
