import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

function FineTuning() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [fineTuningStatus, setFineTuningStatus] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/api/upload-file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully!', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleFineTuneModel = async () => {
    try {
      setFineTuningStatus('Fine-tuning started...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      setFineTuningStatus('Fine-tuning completed successfully!');
    } catch (error) {
      console.error('Error during fine-tuning:', error);
      setFineTuningStatus('Error during fine-tuning.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className="h-screen" />

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-grow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Fine Tuning</h2>
          <div className="bg-white p-6 rounded-lg mb-6 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Any File</h2>

            <div className="flex flex-col items-center">
              <label className="mb-4 p-4 bg-gray-800 text-white rounded cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose File
              </label>

              {selectedFile && (
                <div className="text-center">
                  <p className="text-gray-800 mb-4">File Selected: {selectedFile.name}</p>
                </div>
              )}

              {selectedFile && (
                <div className="mt-4">
                  <button
                    onClick={handleFineTuneModel}
                    className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Start Fine-Tuning
                  </button>
                </div>
              )}

              {fineTuningStatus && (
                <div className="mt-4 p-4 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg">
                  {fineTuningStatus}
                </div>
              )}
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Fine-Tuning Documentation</h3>
            <p className="text-gray-700 mb-4">
              Fine-tuning is the process of adapting a pre-trained model to a specific task or dataset. This step involves training the model on a smaller, task-specific dataset to refine its capabilities and improve performance for that particular task.
            </p>
            <p className="text-gray-700 mb-4">
              By fine-tuning, the model leverages its pre-trained knowledge while adjusting to the nuances of the specific data it will encounter. This approach allows for more efficient and effective training compared to training from scratch.
            </p>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Benefits of Fine-Tuning</h4>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Enhanced performance on task-specific datasets.</li>
              <li>Reduced training time compared to training from scratch.</li>
              <li>Better utilization of pre-trained model capabilities.</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">How It Fits Into the Workflow</h4>
            <p className="text-gray-700 mb-2">
              Fine-tuning follows pre-training and is focused on specific tasks. After fine-tuning, the model is tailored to meet the requirements of particular applications, ensuring optimal performance in real-world scenarios.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FineTuning;
