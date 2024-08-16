'use client'
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post('/api/Fileupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success(response.data.message || 'File uploaded successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'An error occurred during file upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload CSV File</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUpload;
