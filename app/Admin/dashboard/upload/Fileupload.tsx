'use client'
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button,} from 'flowbite-react';
import { Upload } from 'lucide-react';
interface FileUploadProps {
  id: string|undefined;
}
const FileUpload: React.FC <FileUploadProps> = ({id}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !id) {
      toast.error('Please select a file and choose subject');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('subjectsId', id);

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
    <div className='flex flex-row' >

<input onChange={handleFileChange} type='file'/>
<button onClick={handleUpload} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Upload</button>
    </div>
  );
};

export default FileUpload;
