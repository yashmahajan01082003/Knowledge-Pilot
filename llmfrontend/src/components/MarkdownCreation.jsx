import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header2';
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
        const response = await axios.post('http://localhost:8000/markdown/markdownconversion/', formData, {
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Markdown Converter</h2>
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
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Markdown Converter Documentation</h3>
            <p className="text-gray-700 mb-4">
            <strong>What is Markdown?</strong> <br />
            Markdown is a lightweight markup language with plain text formatting syntax. Its design allows it to be converted to many output formats, but the original tool, Markdown, was designed to convert plain text into HTML. Markdown is widely used for writing documentation, creating README files, and formatting messages in online discussion forums.
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Features of Markdown:</strong>
              <ul className="list-disc list-inside mb-4">
                <li>Easy to read and write.</li>
                <li>Simple syntax for formatting text (headers, lists, links, images, etc.).</li>
                <li>Conversion to HTML and other formats.</li>
                <li>Wide support in various applications and platforms.</li>
              </ul>
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Example of Markdown:</strong>
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
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Why Use Markdown?</strong> <br />
              Markdown is preferred for its simplicity and versatility. It allows users to create well-structured documents without dealing with complex formatting. It is also easily readable in its raw form, making it ideal for writing documentation and collaborating on projects.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Markdown Converter Tool</strong> <br />
              The Markdown Converter is a software tool designed to help users convert various file formats into Markdown. It simplifies the process of generating Markdown content from structured data or formatted text, ensuring that the output adheres to Markdown syntax.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>How to Use the Markdown Converter:</strong> <br />
              To use the Markdown Converter, follow these steps:
              <ol className="list-decimal pl-6 mb-4">
                <li>Upload your file in a supported format (e.g., PDF, DOCX, PPTX, PPT).</li>
                <li>Click the "Convert" button to generate the Markdown file.</li>
                <li>Download the converted Markdown file to your local machine.</li>
              </ol>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MarkdownCreation;
