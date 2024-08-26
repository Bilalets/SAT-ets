import React from "react";

import { Mail, SaveIcon, Undo, Upload } from "lucide-react";

const Test = () => {
  return (
    <>
      <div className="bg-white shadow-md border  h-auto p-6 mt-[-54px] ml-[-10px] items-center flex flex-col gap-4  ">
        <h1 className="font-bold text-2xl text-center">Question Bank</h1>
        <div className="flex flex-row gap-2 w-full">
          <div className="w-60">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select an option
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a country</option>
            </select>
          </div>

          <div className="w-60">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select an option
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a country</option>
            </select>
          </div>

          <div className="w-60">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select an option
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a country</option>
            </select>
          </div>

          <div className="w-60">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select an option
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a country</option>
            </select>
          </div>
          <div className="grid w-full mt-[-20px] max-w-sm  gap-1.5"></div>
        </div>
      </div>
      <div className=" bg-white shadow-lg mt-8 ml-64 h-[500px] w-[700px]  p-12 border-2 rounded-lg">
        <div className=" font-bold text-2xl justify-center  flex mb-10">
          <h1>Fill all the fields to upload question </h1>
        </div>
        <div className=" flex flex-row gap-10 ">
          <div className="flex flex-col">
            <div>
              <p className=" font-semibold">Question</p>
              <input
                placeholder="Enter Awnser-5 Text"
                className="bg-gray-100 w-80 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" font-semibold">Awnser 1</p>
              <input
                placeholder="Enter Awnser-5 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" font-semibold">Awnser 2</p>
              <input
                placeholder="Enter Awnser-5 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <p className=" font-semibold">Awnser 3</p>
              <input
                placeholder="Enter Awnser-5 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" font-semibold">Awnser 4</p>
              <input
                placeholder="Enter Awnser-5 Text"
                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div>
              <p className=" font-semibold">Correct Awnser</p>
              <input
                placeholder="Enter Awnser-5 Text"
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
    </>
  );
};

export default Test;
