
# AI Summarizer 

This project provides a web application that allows users to upload a document, send it to a Flask server for summarization using a GPT-2 model, and display the summarized text in a React frontend.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)

## Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup
#### 1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
#### 2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```
#### 3. Install the required Python packages:
```bash
pip install -r requirements.txt
```
#### 4. Run the Flask server:
```bash
python app.py

```
### Frontend Setup

#### 1. Navigate to the frontend directory:

```bash
cd frontend
```
#### 2. Install the required Node packages:

```bash
yarn
```
#### 3. Start the React development server:

```bash
yarn dev
```

## Usage
#### 1. Open your browser and navigate to http://localhost:3000.
#### 2. Upload a document file using the file input.
#### 3. Click the "Upload and Summarize" button.
#### 4. View the summarized text in the textbox provided.

## Endpoints
### POST /upload
##### Description: Upload a document file and extract its text content.
##### Request: Multipart form-data with a file.
##### Response: JSON containing the extracted text.
### POST /summarize
##### Description: Summarize the provided text using GPT-2.
##### Request: JSON containing the text to be summarized.
##### Response: JSON containing the summarized text.
### Technologies Used
##### Backend: Flask, Transformers, PyTorch
##### Frontend: React, Tailwind CSS
##### Other: Flask-CORS, Axios

## Additional Notes
- Ensure the Flask server is running on http://localhost:5000 and the React frontend is running on http://localhost:3000.
- The Flask server uses GPT-2 for text summarization. Ensure you have enough memory to load the model.
## Troubleshooting
#### If you encounter any issues, consider the following steps:
- Ensure all dependencies are installed correctly.
- Check the console for any error messages and debug accordingly.
- Verify that the Flask server and React development server are running on the correct ports.
