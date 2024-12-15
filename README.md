# KnowledgePilot

**KnowledgePilot** is a specialized chatbot designed for university students, utilizing a pretrained 1-bit Large Language Model (LLM) to provide accurate and relevant answers based on a wide range of academic resources. With its advanced pretraining and fine-tuning capabilities, KnowledgePilot offers a user-friendly interface for efficient and responsive support, enhancing students' educational experience by delivering reliable and context-specific information.

## Features

- **1-Bit Large Language Model (LLM)**: A resource-efficient implementation of LLM optimized for academic queries.
- **Custom Dataset**: Tailored datasets created from a variety of academic sources for better response accuracy.
- **Markdown Conversion Tools**: Software to convert various file formats (PDF, PPT, Word) to Markdown and vice versa.
- **Analytics and Fine-Tuning**: Comprehensive evaluation of model performance with analytics and fine-tuning on specific academic topics.
- **Deployment on Hugging Face**: The pretrained model, custom dataset, and tools are deployed on Hugging Face for easy access and use.

## Installation

### Prerequisites

- Python 3.8+
- Hugging Face Account
- Libraries:
  - `transformers`
  - `datasets`
  - `torch`
  - `flask`
  - `requests`
  - `markdown`

### Steps to Set Up

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yashmahajan01082003/Knowledge-Pilot.git
   cd Knowledge-Pilot
2. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
3. **Setup Environment Variables**:
Create a .env file and add your Hugging Face API key:
   ```bash
   HUGGINGFACE_API_KEY=<your-api-key>
4. **Run the Application**:
   ```bash
   python app.py
