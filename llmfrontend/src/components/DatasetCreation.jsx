import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header2';

function DatasetCreation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasetCreated, setDatasetCreated] = useState(false);

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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dataset Creator</h2>
          <div className="bg-white p-6 rounded-lg mb-6 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Dataset</h2>
            <p className="text-gray-700 mb-4">Upload a markdown file to convert it to a Dataset and download it.</p>
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
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleDownloadDataset}
                    className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
                  >
                    Download Dataset
                  </button>
                </div>
              )}
            </div>
          </div>

                  {/* Documentation */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Dataset Creator Documentation</h3>
            
            <p className="text-gray-700 mb-4">
              Datasets are essential for training and evaluating machine learning models. They serve as the foundation upon which models learn to recognize patterns and make predictions. In many applications, data must be organized and structured to ensure efficient training and analysis.
            </p>
            
            <p className="text-gray-700 mb-4"><strong>Why Convert Markdown to Dataset?</strong></p>
            <p className="text-gray-700 mb-4">
              Markdown files are a popular format for writing content due to their simplicity and readability. However, machine learning models typically require data in a structured format for processing. By converting a Markdown file into a dataset, we can extract relevant information and organize it in a way that can be easily utilized by models.
            </p>

            <p className="text-gray-700 mb-4"><strong>Why Use Arrow Format?</strong></p>
            <p className="text-gray-700 mb-4">
              The Arrow file format is chosen for its efficiency in storing large datasets. It provides a standardized columnar memory format that allows for fast read and write operations, making it ideal for high-performance data processing. Arrow is particularly well-suited for analytics and is designed for use with various data processing frameworks, enabling interoperability between different systems.
            </p>

            <p className="text-gray-700 mb-4"><strong>Use Cases for the Dataset</strong></p>
            <p className="text-gray-700 mb-4">
              The datasets created using this tool can be employed in various machine learning tasks, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Training models for natural language processing (NLP).</li>
              <li>Evaluating the performance of machine learning algorithms.</li>
              <li>Fine-tuning pre-trained models on specific tasks or domains.</li>
              <li>Analyzing data trends and patterns through various machine learning techniques.</li>
            </ul>
            
            <p className="text-gray-700 mb-4">
              To create a dataset, simply upload your Markdown file, and it will be converted to the Arrow format for use in your projects.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}

export default DatasetCreation;
