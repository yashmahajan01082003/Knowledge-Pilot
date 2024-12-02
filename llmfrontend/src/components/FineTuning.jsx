import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header2';

function FineTuning() {
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Fine Tuning</h2>

                    {/* Documentation */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">What is Fine-tuning?</h3>
            <p className="text-gray-700 mb-4">
              Fine-tuning is the process of taking a pre-trained model and adapting it for a specific task or dataset. While pre-training helps the model learn general representations, fine-tuning enables it to specialize and improve its performance on a particular task by adjusting the model’s weights using task-specific data. Fine-tuning is a crucial step in optimizing models for real-world applications, particularly in fields like natural language processing, computer vision, and more.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">Why is Fine-tuning Important?</h4>
            <p className="text-gray-700 mb-4">
              Fine-tuning allows models to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Achieve higher performance on specific tasks.</li>
              <li>Adapt pre-trained models to new domains with minimal labeled data.</li>
              <li>Reduce the need for training from scratch, saving time and computational resources.</li>
              <li>Leverage pre-existing knowledge from pre-trained models to speed up learning.</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">How Does Fine-tuning Work?</h4>
            <p className="text-gray-700 mb-4">
              Fine-tuning works by continuing the training of a pre-trained model on a smaller, task-specific dataset. The model's weights, which were learned during the pre-training phase, are updated based on the new dataset. This adjustment allows the model to specialize while still benefiting from the general patterns learned during pre-training.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">Tools for Fine-tuning</h4>
            <p className="text-gray-700 mb-4">
              Several tools and libraries are available to assist in the fine-tuning process:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>Hugging Face Transformers:</strong> Provides a straightforward API for fine-tuning pre-trained models on custom datasets.</li>
              <li><strong>PyTorch:</strong> A flexible deep learning framework that allows for customization of the fine-tuning process.</li>
              <li><strong>Datasets Library:</strong> Used to load, preprocess, and manage datasets efficiently.</li>
              <li><strong>Google Colab/Cloud Services:</strong> Platforms to easily run fine-tuning on GPUs or TPUs for faster training.</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">How to Fine-tune a 1-bit LLM Model</h4>
            <p className="text-gray-700 mb-4">
              Fine-tuning a 1-bit LLM model follows similar principles as standard fine-tuning but with optimizations for low-bit architectures. A 1-bit model is designed for memory efficiency, so fine-tuning requires attention to computational limits while still achieving optimal performance.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">Steps to Fine-tune Your 1-bit LLM Model</h4>
            <ol className="list-decimal list-inside text-gray-700 mb-4">
              <li><strong>Load a pre-trained 1-bit model:</strong> Begin by selecting a pre-trained 1-bit LLM model, such as one based on BitNet b1.58 architecture.</li>
              <li><strong>Prepare your dataset:</strong> Format your dataset to match the input requirements of the model. This can include text datasets in formats like Arrow for fast access.</li>
              <li><strong>Set up your training environment:</strong> Choose a training framework like PyTorch or TensorFlow and configure your training pipeline to optimize for a low-bit model.</li>
              <li><strong>Begin fine-tuning:</strong> Use your task-specific dataset to fine-tune the model. Adjust the learning rate and other hyperparameters to ensure efficient learning while maintaining low-bit optimizations.</li>
              <li><strong>Evaluate the model:</strong> Continuously monitor performance on your task-specific data. Fine-tuning should improve accuracy, reduce loss, or enhance other key metrics for your task.</li>
              <li><strong>Save the fine-tuned model:</strong> Once the model reaches satisfactory performance, save the fine-tuned version for deployment or further experimentation.</li>
            </ol>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">Where to Use Fine-tuned Models?</h4>
            <p className="text-gray-700 mb-4">
              Fine-tuned models are crucial for tasks where specific domain knowledge or task-specific features are required. Applications include:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Sentiment analysis for product reviews or social media posts.</li>
              <li>Text classification for emails, support tickets, or news articles.</li>
              <li>Chatbots and conversational agents tailored for customer service or technical support.</li>
              <li>Machine translation or language modeling for specialized industries or languages.</li>
            </ul>

            <p className="text-gray-700 mb-4">
              Fine-tuning your 1-bit LLM allows you to deploy models optimized for both performance and resource efficiency, making it suitable for environments with limited computational resources while still achieving high task-specific accuracy.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}

export default FineTuning;
