import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const text = response.data.text;
      const summaryResponse = await axios.post('http://localhost:5000/summarize', { text });
      setSummary(summaryResponse.data.summary);
    } catch (error) {
      setError('Failed to upload and summarize the document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Document Summarizer</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100
                   mb-4"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload and Summarize'}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Summary:</h2>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
            value={summary}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;