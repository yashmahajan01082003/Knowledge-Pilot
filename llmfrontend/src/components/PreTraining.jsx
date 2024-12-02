import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header2';

function PreTraining() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

         {/* Documentation */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">What is Pre-training?</h3>
          <p className="text-gray-700 mb-4">
            Pre-training is the initial phase in developing machine learning models, particularly in the domain of deep learning and natural language processing (NLP). During pre-training, a model is trained on a large, general dataset to learn broad patterns and representations of language or other input types. This foundational training allows the model to understand general features, which can later be fine-tuned for specific tasks.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">Why is Pre-training Important?</h4>
          <p className="text-gray-700 mb-4">
            Pre-training is essential because it enables the model to develop a robust understanding of patterns, relationships, and structures within the data. This initial training allows the model to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Learn general features and representations.</li>
            <li>Reduce the amount of task-specific data required for later stages (fine-tuning).</li>
            <li>Improve performance on various downstream tasks, such as text generation, classification, and more.</li>
            <li>Shorten the overall training time by leveraging pre-trained knowledge.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">How Does Pre-training Work?</h4>
          <p className="text-gray-700 mb-4">
            Pre-training involves feeding a large, diverse dataset to the model and allowing it to learn unsupervised or self-supervised. This means that instead of providing specific labels for every data point, the model learns to predict parts of the input (such as masked words) or to identify relationships within the data.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">Tools for Pre-training</h4>
          <p className="text-gray-700 mb-4">
            There are several tools and libraries available to facilitate the pre-training process, especially when working with large datasets and deep learning models:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Transformers Library:</strong> Provides pre-built models for various tasks and includes utilities for training models on your own datasets.</li>
            <li><strong>Datasets Library:</strong> Helps in handling and processing large datasets efficiently, especially for NLP-related tasks.</li>
            <li><strong>PyTorch:</strong> A popular deep learning framework used to build and train models, including LLMs.</li>
            <li><strong>Hugging Face:</strong> Offers a wide range of pre-trained models and tools for training, fine-tuning, and deployment.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">How to Pre-train a 1-bit LLM Model</h4>
          <p className="text-gray-700 mb-4">
            Pre-training a 1-bit LLM (Large Language Model) model follows the same principles as traditional LLMs but with optimizations for low-bit architectures. These models are designed to reduce the memory and computational overhead, making them more efficient in terms of hardware usage without sacrificing too much performance. Here's the typical flow for pre-training a 1-bit LLM:
          </p>
          
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Steps to Pre-train Your 1-bit LLM</h4>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li>Prepare a large, diverse dataset (such as a pretraining corpus). This should contain extensive examples of text or other input types.</li>
            <li>Use a library like <strong>Hugging Face’s Datasets</strong> to load and process the data. For efficient storage and fast access, consider using the Arrow format.</li>
            <li>Choose a pre-built 1-bit LLM architecture, like the ones based on <strong>BitNet</strong> (b1.58).</li>
            <li>Set up your training pipeline using frameworks like <strong>PyTorch</strong> or <strong>TensorFlow</strong>, optimizing the training process for your 1-bit model.</li>
            <li>Start the pre-training process. During this phase, the model will learn general features of the language from the dataset.</li>
            <li>Monitor the training progress using metrics like loss and accuracy to ensure that the model is learning effectively.</li>
            <li>Once the model reaches satisfactory performance on the pretraining task, save the pre-trained model for future use in fine-tuning or other tasks.</li>
          </ol>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">Where to Use Pre-trained Models?</h4>
          <p className="text-gray-700 mb-4">
            Pre-trained models are valuable in numerous applications, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Text generation and summarization tasks.</li>
            <li>Classification and sentiment analysis for text data.</li>
            <li>Chatbots and conversational AI systems.</li>
            <li>Fine-tuning for specialized NLP tasks, such as question answering or translation.</li>
          </ul>

          <p className="text-gray-700 mb-4">
            By leveraging pre-trained 1-bit LLMs, developers can create highly efficient, performance-optimized models for real-world applications, even when working with limited hardware resources.
          </p>
        </div>

        </main>
      </div>
    </div>
  );
}

export default PreTraining;
