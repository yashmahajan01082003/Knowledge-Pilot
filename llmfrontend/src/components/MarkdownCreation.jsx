import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core'; 
import '@react-pdf-viewer/core/lib/styles/index.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const workerUrl = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';


function MarkdownCreation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // Add this line
  const [progress, setProgress] = useState(0);  // Add progress state



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'application/vnd.ms-powerpoint', 
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];

      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file);

        if (file.type === 'application/pdf') {
          // Create a URL for the PDF file to display it
          const fileUrl = URL.createObjectURL(file);
          setPdfFile(fileUrl);
        } else {
          setPdfFile(null);
        }
      } else {
        console.error('Please upload a valid PDF, DOC, PPT, or PPTX file');
        setUploadedFile(null);
        setPdfFile(null);
      }
    } else {
      console.error('No file selected');
      setUploadedFile(null);
      setPdfFile(null);
    }
  };
  
  
  const handleFileSubmit = async () => {
    if (uploadedFile) {
      setIsLoading(true);  // Start loading
      setProgress(0);  // Reset progress
  
      const formData = new FormData();
      formData.append('file', uploadedFile);
  
      try {
        const response = await axios.post('http://localhost:8000/api/markdownconversion/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });
  
        if (response.data) {
          setMarkdownContent(response.data);
        } else {
          console.error('No data received from server');
        }
      } catch (error) {
        console.error('Error converting file:', error);
      } finally {
        setIsLoading(false);  // Stop loading
      }
    } else {
      console.error('No file uploaded');
    }
  };
  
  

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className="h-screen" />
      <div className="flex flex-col flex-grow overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Markdown Generation</h2>
          <div className="bg-white p-6 rounded-lg mb-6 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Markdown File</h2>
            <p className="text-gray-700 mb-4">Upload a file to convert it to a Markdown file and download it.</p>
            <div className="flex flex-col items-center">
              <label className="mb-4 p-4 bg-gray-800 text-white rounded cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                Choose File
              </label>

              {pdfFile && (
                <div className="w-full h-[160px]">
                  <Worker workerUrl={workerUrl}>
                    <Viewer fileUrl={pdfFile} />
                  </Worker>
                </div>
              )}

              {uploadedFile && (
                <div className="text-center">
                  <p className="text-gray-800 mb-4">File Uploaded: {uploadedFile.name}</p>
                  <button
                    onClick={handleFileSubmit}
                    className="bg-gray-800 text-white py-2 px-4 rounded"
                  >
                    Convert to Markdown
                  </button>
                  {isLoading && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div className="bg-gray-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                 )}
                </div>
              )}
              <div className="mt-6 text-left w-full">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Converted Markdown:</h3>
                <pre
                  className="bg-gray-200 p-4 rounded text-gray-800"
                  style={{ height: '300px', overflowY: 'scroll' }}
                >
                  {markdownContent || 'No content yet.'}
                </pre>
              </div>
              {markdownContent && (
                <div className="mt-6">
                  <a
                    href={URL.createObjectURL(new Blob([markdownContent], { type: 'text/markdown' }))}
                    download="convertedFile.md"
                    className="bg-gray-900 text-white py-2 px-4 rounded"
                  >
                    Download Markdown File
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            {/* Documentation content remains the same */}
            <h3 className="text-xl font-semibold mb-4 text-gray-800">About Markdown</h3>
            <p className="text-gray-700 mb-4">
              Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. 
              Created by John Gruber in 2004, Markdown is now one of the world's most popular markup languages.
            </p>
            <p className="text-gray-700 mb-4">
              In this tool, you can upload any type of file format, and it will be converted into a Markdown file. 
              This feature allows you to easily transform text, code, or other content into Markdown for easy sharing and readability.
            </p>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Usage</h4>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Markdown is commonly used for creating formatted text using a plain-text editor.</li>
              <li>It’s widely used in documentation, readme files, and static site generators.</li>
              <li>Markdown is also supported in many programming languages, making it a great tool for developers.</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h4>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Easy to learn and use.</li>
              <li>Portable across different platforms.</li>
              <li>Readable in its raw form.</li>
              <li>Can be converted to various formats like HTML, PDF, etc.</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Example Syntax</h4>
            <p className="text-gray-700 mb-2"><strong>Headers:</strong></p>
            <pre className="bg-gray-200 p-4 rounded text-gray-800 mb-4">
              {`# This is an H1\n## This is an H2\n### This is an H3`}
            </pre>
            <p className="text-gray-700 mb-2"><strong>Emphasis:</strong></p>
            <pre className="bg-gray-200 p-4 rounded text-gray-800 mb-4">
              {`*This text will be italic*\n**This text will be bold**`}
            </pre>
            <p className="text-gray-700 mb-2"><strong>Lists:</strong></p>
            <pre className="bg-gray-200 p-4 rounded text-gray-800 mb-4">
              {`- Item 1\n- Item 2\n- Item 3`}
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MarkdownCreation;
