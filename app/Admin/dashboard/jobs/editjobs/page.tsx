import { Delete, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const editjobs = () => {
  return (
    <>
    <div className="flex justify-center"> 
      <h1 className=" text-2xl font-semibold">Edit Jobs</h1>
    </div>
    <div className="grid justify-center  grid-cols-2 grid-rows-1 ">
    <div className="flex mt-8 ml-8 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <Image
    className="object-cover w-full h-48 md:h-auto md:w-48 rounded-lg p-1"
    src="/images/Back.jpg"
    width={192} // Adjusted width to match the container width
    height={500} // Adjusted height to match the container height
    alt="as"
  />
  <div className="flex flex-col justify-between p-4 leading-normal">
    <div className="flex flex-row">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Web Dev
    </h5>
    <div className="flex flex-row gap-3 items-center ml-44">
    <Edit style={{'color':"green"}}/>
    <Trash2 style={{'color':"red"}}/>
    </div>
    </div>
  
   
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </div>
</div>

<div className="flex mt-8 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <Image
    className="object-cover w-full h-48 md:h-auto md:w-48 rounded-lg p-1"
    src="/images/Back.jpg"
    width={192} // Adjusted width to match the container width
    height={500} // Adjusted height to match the container height
    alt="as"
  />
  <div className="flex flex-col justify-between p-4 leading-normal">
  <div className="flex flex-row">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
     Data Entry
    </h5>
    <div className="flex flex-row gap-3 items-center ml-32">
      <Edit style={{'color':"green"}}/>
      <Trash2 style={{'color':"red"}}/>
    </div>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </div>
</div>



<div className="flex mt-8 ml-8 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <Image
    className="object-cover w-full h-48 md:h-auto md:w-48 rounded-lg p-1"
    src="/images/Back.jpg"
    width={192} // Adjusted width to match the container width
    height={500} // Adjusted height to match the container height
    alt="as"
  />
  <div className="flex flex-col justify-between p-4 leading-normal">
  <div className="flex flex-row">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Ui/Ux Designer
    </h5>
    <div className="flex flex-row gap-3 items-center ml-28">
    <Edit style={{'color':"green"}}/>
    <Trash2 style={{'color':"red"}}/>
    </div>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </div>
</div>

<div className="flex mt-8 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <Image
    className="object-cover w-full h-48 md:h-auto md:w-48 rounded-lg p-1"
    src="/images/Back.jpg"
    width={192} // Adjusted width to match the container width
    height={500} // Adjusted height to match the container height
    alt="as"
  />
  <div className="flex flex-col justify-between p-4 leading-normal">
  <div className="flex flex-row">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
     Data Analyst
    </h5>
    <div className="flex flex-row gap-3 items-center ml-28">
    <Edit style={{'color':"green"}}/>
      <Trash2 style={{'color':"red"}}/>
    </div>
    </div>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </div>
</div>
    </div>




    </>
  );
};

export default editjobs;
