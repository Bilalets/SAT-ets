'use client'
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const Createjobs = () => {
  const [jobtitle,setjobtitle]=useState<string>()
  const [Employmenttypefull,setEmploymenttypefull]=useState<string>()
  const [startdate,setstartdate]=useState<string>()
  const [enddate,setendate]=useState<string>()
  const [jobopening,setjobopening]=useState<string>()
  const [image,setimage]=useState<string>()
  const [jobdesc,setjobdesc]=useState<string>()
  const [Employmentp,setEmploymenttypep]=useState<string>()
  const [Employmentc,setEmploymenttypec]=useState<string>()
  const [Employmenti,setEmploymenttypei]=useState<string>()

const handleUploadSuccess = (result:any) => {
  const imageUrl = result.info.secure_url; 
  setimage(imageUrl);
};
const createjob = async () => {
  try {
    const formattedStartDate = startdate ? new Date(startdate).toISOString() : null;
    const formatedenddate= enddate ? new Date(enddate).toISOString():null
    await axios.post('/api/Jobs/createjob', {
      jobtitle: jobtitle,
      employmenttype: Employmenttypefull || Employmentc || Employmentp || Employmenti,
      image: image,
      jobOpenings: jobopening,
      startDate: formattedStartDate,
      endDate: formatedenddate,
      jobdesc: jobdesc
    });
    toast.success('Job Created Successfully')
  } catch (error) {
    toast.error("Error Creating Job")
    console.log(error);
  }
};
  return (
    <div className="flex w-full justify-center">
      <div className="ml-14">
        <h1 className="text-2xl text-center font-semibold">Create Job</h1>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter Job Title
          </label>
          <input
          onChange={(e)=>setjobtitle(e.target.value)}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Job Title"
            required
          />
        </div>
        <div className="">
          <h3 className="mb-4 mt-8 text-gray-900 dark:text-white">
            Employment Type
          </h3>
          <ul className="items-center w-[600px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                onChange={(e)=>setEmploymenttypefull(e.target.value)}
                  id="horizontal-list-radio-license"
                  type="radio"
                  value="Full Time"
                  name="list-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Full Time{" "}
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                onChange={(e)=>setEmploymenttypep(e.target.value)}
                  id="horizontal-list-radio-id"
                  type="radio"
                  value="Part-Time"
                  name="list-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Part-Time
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                onChange={(e)=>setEmploymenttypec(e.target.value)}
                  id="horizontal-list-radio-military"
                  type="radio"
                  value="Contract"
                  name="list-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Contract
                </label>
              </div>
            </li>
            <li className="w-full dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                onChange={(e)=>setEmploymenttypei(e.target.value)}
                  id="horizontal-list-radio-passport"
                  type="radio"
                  value="Internship"
                  name="list-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Internship
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-row gap-4 mt-6">
  {/* Start Date Picker */}
  <div className="flex flex-col">
    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
      Choose Start Date
    </label>
    <input
    onChange={(e)=>setstartdate(e.target.value)}
      type="date"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[290px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>

  {/* End Date Picker */}
  <div className="flex flex-col">
    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
      Choose End Date
    </label>
    <input
    onChange={(e)=>setendate(e.target.value)}
      type="date"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-[290px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>
</div>
<div className="mt-8">
<label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select number of jobs openings:</label>
<input onChange={(e)=>setjobopening(e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
</div>
<div className="mt-8">
    
<CldUploadWidget
              uploadPreset="test_upload"
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => {
                return (
                  <div className=" mt-5 ">   
             <button
  className="flex gap-2 items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
  onClick={() => open()}
>
  <Upload  />
  Upload Add Picture
</button>



                 </div>
               
                );
              }}
            </CldUploadWidget>
    
      </div>
  <div className="mt-8">
   
<label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Job Description</label>
<textarea id="message" onChange={(e)=>setjobdesc(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

  </div>
 <div className="flex justify-end mt-5">
    <button onClick={createjob} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Create Job</button>
 </div>
      </div>
    </div>
  );
};

export default Createjobs;
