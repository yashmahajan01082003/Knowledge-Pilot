import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function DatasetCreation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasetCreated, setDatasetCreated] = useState(false);
  const [pretrainingStatus, setPretrainingStatus] = useState('');
  const [fineTuningStatus, setFineTuningStatus] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConvertToDataset = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('markdown_file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/dataset/upload/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setDatasetCreated(true);
        alert('Dataset created successfully!');
      } else {
        const result = await response.json();
        alert(`Error: ${result.error || 'Unable to create dataset'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating dataset.');
    }
  };

  const handleDownloadDataset = async () => {
    if (!selectedFile) {
      alert('No dataset to download.');
      return;
    }

    const fileName = selectedFile.name.split('.')[0]; // Extract the file name without extension

    try {
      const response = await fetch(`http://localhost:8000/dataset/download/${fileName}/`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.arrow`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Error downloading dataset.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error downloading dataset.');
    }
  };

  const handlePretrainModel = async () => {
    try {
      setPretrainingStatus('Pretraining started...');
      // Simulate pretraining
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      setPretrainingStatus('Pretraining completed successfully!');
    } catch (error) {
      console.error('Error starting pretraining:', error);
      setPretrainingStatus('Error during pretraining.');
    }
  };

  const handleFineTuneModel = async () => {
    try {
      setFineTuningStatus('Fine-tuning started...');
      // Simulate fine-tuning
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      setFineTuningStatus('Fine-tuning completed successfully!');
    } catch (error) {
      console.error('Error starting fine-tuning:', error);
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dataset Creation</h2>
          <div className="bg-white p-6 rounded-lg mb-6 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Dataset</h2>
            <p className="text-gray-700 mb-4">Upload a markdown file to convert it to a Dataset and download, pre-train or fine tune the model.</p>
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
                  <button
                    onClick={handleConvertToDataset}
                    className="bg-gray-800 text-white py-2 px-4 rounded"
                  >
                    Convert to Dataset
                  </button>
                </div>
              )}

              {datasetCreated && (
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={handleDownloadDataset}
                    className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                  >
                    Download Dataset
                  </button>

                  <button
                    onClick={handlePretrainModel}
                    className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Pretrain Model
                  </button>

                  <button
                    onClick={handleFineTuneModel}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                  >
                    Fine-Tune Model
                  </button>
                </div>
              )}

              {pretrainingStatus && (
                <div className="mt-4 p-4 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg">
                  {pretrainingStatus}
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
            <h3 className="text-xl font-semibold mb-4 text-gray-800">About Datasets</h3>
            <p className="text-gray-700 mb-4">
              Datasets are collections of data that are used for training and evaluating machine learning models. 
              In this tool, you can upload a Markdown file, which will be processed and used to create a dataset.
            </p>
            <p className="text-gray-700 mb-4">
              The Markdown file you upload will be converted and formatted as needed to fit the dataset requirements. 
              You can either download the created dataset for later use or pass it directly for model pretraining or fine-tuning.
            </p>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Usage</h4>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Upload a Markdown file to create a dataset.</li>
              <li>Convert the Markdown file to a dataset.</li>
              <li>Download the dataset or use it directly for model training.</li>
              <li>Suitable for use in various machine learning and AI projects.</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Example Dataset</h4>
            <p className="text-gray-700 mb-2">
              The dataset might include features extracted from the Markdown file, such as text content, metadata, and formatting.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DatasetCreation;
