import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';

function DatasetCombiner() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [baseDirectory, setBaseDirectory] = useState('');
  const [message, setMessage] = useState('');
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCombineDatasets = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/dataset-combiner/dataset_combiner/', {
        base_directory: baseDirectory,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error || 'An error occurred while combining datasets.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className="h-screen" />

      <div className="flex flex-col flex-grow overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-grow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dataset Combiner</h2>

          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Base Directory</h3>
            <input
              type="text"
              value={baseDirectory}
              onChange={(e) => setBaseDirectory(e.target.value)}
              placeholder="Enter the path to the base directory"
              className="p-2 border border-gray-300 rounded mb-4 w-full"
            />

            <button
              onClick={handleCombineDatasets}
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Combine Datasets
            </button>

            {message && (
              <div className="mt-4 p-4 bg-gray-200 border border-gray-400 rounded">
                {message}
              </div>
            )}
          </div>

          {/* Documentation */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Dataset Combiner Documentation</h3>
            <p className="text-gray-700 mb-4">
                The Dataset Combiner is a tool that allows you to combine multiple datasets from a specified directory into a single, unified dataset. It is particularly useful when working with large-scale machine learning projects that require pre-training on combined datasets.
            </p>
            
            <p className="text-gray-700 mb-4"><strong>How It Works</strong></p>
            <p className="text-gray-700 mb-4">
                1. You provide a base directory that contains a folder named <code>pretrainingdataset</code>. Inside this folder, each dataset should be stored in its own subdirectory.
                <br />
                2. The tool scans the <code>pretrainingdataset</code> folder and loads all datasets within each subdirectory.
                <br />
                3. The datasets are combined into a single dataset using the Hugging Face <code>datasets</code> library and are then saved into a new directory called <code>combinedSet</code> within the base directory.
            </p>

            <p className="text-gray-700 mb-4"><strong>Example Directory Structure</strong></p>
            <p className="text-gray-700 mb-4">
                Below is an example of the directory structure that the Dataset Combiner operates on:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg text-gray-800 mb-4">
            {`base_directory/
            ├── pretrainingdataset/
            │   ├── dataset_1/
            │   ├── dataset_2/
            │   └── dataset_n/
            └── combinedSet/
                └── combined_dataset/`}
            </pre>

            <p className="text-gray-700 mb-4"><strong>Output</strong></p>
            <p className="text-gray-700 mb-4">
                The combined dataset is saved in a folder named <code>combinedSet</code> inside the base directory you specified, with the final dataset file named <code>combined_dataset</code>.
            </p>

            <p className="text-gray-700 mb-4"><strong>API Integration</strong></p>
            <p className="text-gray-700 mb-4">
                The frontend interacts with the Dataset Combiner via a RESTful API. The user provides the base directory path, and the API processes the datasets:
                <br />
                - Endpoint: <code>/api/combine-datasets/</code>
                <br />
                - Method: POST
                <br />
                - Request Body: <code>{'{ "base_directory": "path/to/directory" }'}</code>
                <br />
                - Response: A success message with the output path of the combined dataset or an error message in case of failure.
            </p>
            </div>
        </main>
      </div>
    </div>
  );
}

export default DatasetCombiner;
