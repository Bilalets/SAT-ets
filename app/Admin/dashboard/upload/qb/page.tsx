import { SaveIcon, Undo } from 'lucide-react';
import React from 'react'

const Qb = () => {
  return (
    <div className='absolute mt-12 ml-[-600px]'>
        <div className=" bg-white shadow-lg mt-8 ml-64 h-[500px] w-[700px]  p-12 border-2 rounded-lg">
        <div className=" font-bold text-2xl justify-center  flex mb-10">
          <h1>Fill all the fields to upload question </h1>
        </div>
        <div className=" flex flex-row gap-10 ">
          <div className="flex flex-col">
            <div>
              <p className=" font-semibold">Question</p>
              <input
                placeholder="Enter Question Text"
                className="bg-gray-100 w-80 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" ml-[-120px] font-semibold">Answer 1</p>
              <input
                placeholder="Enter Answer-1 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 ml-[-120px] focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" ml-[-120px] font-semibold">Answer 2</p>
              <input
                placeholder="Enter Answer-2 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 ml-[-120px] focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <p className=" font-semibold">Answer 3</p>
              <input
                placeholder="Enter Answer-3 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" font-semibold">Answer 4</p>
              <input
                placeholder="Enter Answer-4 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" font-semibold">Correct Answer</p>
              <input
                placeholder="Enter Correct-Answer Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-36 mt-12">
          <div>
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
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