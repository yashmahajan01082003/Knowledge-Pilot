import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';

function PreTraining() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [pretrainingStatus, setPretrainingStatus] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(e.target.files[0]);

      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      try {
        const response = await axios.post('/api/upload-markdown', formData, {
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

  const handlePretrainModel = async () => {
    try {
      setPretrainingStatus('Pretraining started...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      setPretrainingStatus('Pretraining completed successfully!');
    } catch (error) {
      console.error('Error during pretraining:', error);
      setPretrainingStatus('Error during pretraining.');
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pre Training</h2>
          <div className="bg-white p-6 rounded-lg mb-6 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Markdown File</h2>

            <div className="flex flex-col items-center">
              <label className="mb-4 p-4 bg-gray-800 text-white rounded cursor-pointer">
                <input
                  type="file"
                  accept=".md"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose File
              </label>

              {selectedFile && (
                <div className="text-center">
                  <p className="text-gray-800 mb-4">File Uploaded: {selectedFile.name}</p>
                </div>
              )}

              {fileContent && (
                <div className="mt-4">
                  <button
                    onClick={handlePretrainModel}
                    className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Start Pretraining
                  </button>
                </div>
              )}

              {pretrainingStatus && (
                <div className="mt-4 p-4 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg">
                  {pretrainingStatus}
                </div>
              )}
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Pre-training Documentation</h3>
            <p className="text-gray-700 mb-4">
              Pre-training is the process of training a model on a large dataset before fine-tuning it on a specific task or dataset. This initial training helps the model learn general features and patterns that are useful across various tasks.
            </p>
            <p className="text-gray-700 mb-4">
              By pre-training, the model becomes better at understanding the context and nuances in the data, which can significantly improve performance on downstream tasks. This approach leverages transfer learning to make the most of existing data and computational resources.
            </p>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Benefits of Pre-training</h4>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Improved model performance on specific tasks.</li>
              <li>Reduced training time for specific tasks.</li>
              <li>Utilization of large-scale datasets to enhance model capabilities.</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">How It Fits Into the Workflow</h4>
            <p className="text-gray-700 mb-2">
              Pre-training is typically performed before fine-tuning. After pre-training, the model is adapted to specific tasks using a smaller, task-specific dataset. This combined approach ensures that the model has a strong foundational understanding while being customized for particular applications.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PreTraining;
