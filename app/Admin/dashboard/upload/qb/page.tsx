'use client'
import axios from 'axios';
import { SaveIcon, Undo } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface id{
  id:string|undefined
}

const Qb:React.FC<id> = (props) => {
  const [getquestion,setquestion]=useState<string>()
  const [getans1,setans1]=useState<string>()
  const [getans2,setans2]=useState<string>()
  const [getans3,setans3]=useState<string>()
  const [getans4,setans4]=useState<string>()
  const [getcorrectans,setcorrectans]=useState<string>()

  const sendquestiondata=async()=>{
    try {
      if(!getquestion||!getans1|| !getans2||!getans3||!getans4||!getcorrectans){
        toast.error('Please fill all the inputs')
      }
      else{
        await axios.post('/api/Service/Subjectquestions',{subjectsId:props.id,awnsers:[getans1,getans2,getans3,getans4],questionName:getquestion,correctAwnser:getcorrectans})
        clearInputs()
        toast.success('Question submitted successfully!');
        
      }
    } catch (error) {
      toast.error('Failed to submit question.');
    }
    
  }
  const clearInputs=()=>{
    setquestion('')
    setans1('')
    setans2('')
    setans3('')
    setans4('')
    setcorrectans('')
  }
  return (
    <div className='absolute mt-12 ml-[-600px]'>
        <div className=" bg-white shadow-lg mt-8 ml-64 h-[500px] w-[700px]  p-12 border-2 rounded-lg">
        <div className=" font-bold text-2xl justify-center  flex mb-10">
          <h1>Fill all the fields to upload question </h1>
        </div>
        <div className=" flex flex-row gap-5">
          <div className="flex ml-20 flex-col">
            <div>
              <p className="  font-semibold">Question</p>
              <input
              onChange={(e)=>setquestion(e.target.value)}
                placeholder="Enter Question Text"
                className="bg-gray-100   text-gray-800  border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className="  font-semibold">Answer 1</p>
              <input
              onChange={(e)=>setans1(e.target.value)}
                placeholder="Enter Answer-1 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4  focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className="  font-semibold">Answer 2</p>
              <input
                      onChange={(e)=>setans2(e.target.value)}
                placeholder="Enter Answer-2 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4  focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <p className=" font-semibold">Answer 3</p>
              <input
                      onChange={(e)=>setans3(e.target.value)}
                placeholder="Enter Answer-3 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" font-semibold">Answer 4</p>
              <input
              onChange={(e)=>setans4(e.target.value)}
                placeholder="Enter Answer-4 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" font-semibold">Correct Answer</p>
              <input
              onChange={(e)=>setcorrectans(e.target.value)}
                placeholder="Enter Correct-Answer Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-12">
          <div>
            <button onClick={sendquestiondata} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              <div className="flex items-center">
                <SaveIcon className="me-2" />
                <span>Save</span>
              </div>
            </button>
          </div>
          <div>
            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              <div className="flex items-center">
                <Undo className="me-2" />
                <span>Reset</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Qb;