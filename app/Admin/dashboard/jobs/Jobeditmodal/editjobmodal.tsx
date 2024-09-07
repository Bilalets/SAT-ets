import axios from 'axios';
import { Upload, X } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface id {
  id: string;
  closeModal: () => void;
}

const EditJobModal: React.FC<id> = ({ id, closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [jobtitle, setJobTitle] = useState<string>();
  const [EmploymentTypeFull, setEmploymentTypeFull] = useState<string>();
  const [startdate, setStartDate] = useState<string>();
  const [enddate, setEndDate] = useState<string>();
  const [jobopening, setJobOpening] = useState<string>();
  const [image, setImage] = useState<string>();
  const [jobdesc, setJobDesc] = useState<string>();
  const [EmploymentTypeP, setEmploymentTypeP] = useState<string>();
  const [EmploymentTypeC, setEmploymentTypeC] = useState<string>();
  const [EmploymentTypeI, setEmploymentTypeI] = useState<string>();

  const handleUploadSuccess = (result: any) => {
    const imageUrl = result.info.secure_url;
    setImage(imageUrl);
  };

  const updateJob = async () => {
    try {
      const formattedStartDate = startdate ? new Date(startdate).toISOString() : null;
      const formatedEndDate = enddate ? new Date(enddate).toISOString() : null;
      await axios.put('/api/Jobs/editjob', {
        id: id,
        jobtitle: jobtitle,
        employmenttype: EmploymentTypeFull || EmploymentTypeP || EmploymentTypeC || EmploymentTypeI,
        image: image,
        jobOpenings: jobopening,
        startDate: formattedStartDate||undefined,
        endDate: formatedEndDate||undefined,
        jobdesc: jobdesc,
      });
      toast.success('Job Updated Successfully');
      
    } catch (error) {
      toast.error('Error Updating Job');
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-[80vh] w-1/3">
        <button
          className=" top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={closeModalHandler}
        >
          <X  style={{color:'red'}}/>
        </button>
        <h1 className="text-2xl text-center font-semibold">Edit Job</h1>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Enter Job Title</label>
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Job Title"
            required
          />
        </div>
        <div className="mt-8">
          <h3 className="mb-4 text-gray-900">Employment Type</h3>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input onChange={(e)=>setEmploymentTypeFull(e.target.value)} id="horizontal-list-radio-license" type="radio" value="Full-Time" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full-Time</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-id" onChange={(e)=>setEmploymentTypeP(e.target.value)} type="radio" value="Part-Time" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Part-Time</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-military" onChange={(e)=>setEmploymentTypeI(e.target.value)} type="radio" value="Internship" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Internship</label>
        </div>
    </li>
    <li className="w-full dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-passport" onChange={(e)=>setEmploymentTypeC(e.target.value)} type="radio" value="Contract" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contract</label>
        </div>
    </li>
</ul>
        </div>
        <div className="flex flex-row gap-4 mt-6">
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium">Choose Start Date</label>
            <input
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium">Choose End Date</label>
            <input
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div className="mt-8">
          <label className="block mb-2 text-sm font-medium">Select number of job openings:</label>
          <input
            onChange={(e) => setJobOpening(e.target.value)}
            type="number"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="1"
            required
          />
        </div>
        <div className="mt-8">
          <CldUploadWidget uploadPreset="test_upload" onSuccess={handleUploadSuccess}>
            {({ open }) => (
              <button
                className="flex gap-2 items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={() => open()}
              >
                <Upload />
                Upload Job Picture
              </button>
            )}
          </CldUploadWidget>
        </div>
        <div className="mt-8">
          <label className="block mb-2 text-sm font-medium">Enter Job Description</label>
          <textarea
            onChange={(e) => setJobDesc(e.target.value)}
            className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Job Description"
          ></textarea>
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={updateJob}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Update Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;
