'use client'
import axios from "axios";
import { Spinner } from "flowbite-react";
import { Delete, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Editjobmodal from "../Jobeditmodal/editjobmodal";
interface job{
  id:string;
  image:string;
  jobdesc:string;
  jobtitle:string;
  employmenttype:string;
  endDate:string;
  startDate:string;
  jobOpenings:string



}
const Editjobs = () => {
  const [data,setdata]=useState<job[]>([])
  const [getid,setid]=useState<string|null>(null)
  const [loading,setloading]=useState<boolean>(false)
  const fetchjobs=async()=>{
    setloading(false)
    let res = await axios.get('/api/Jobs/getjob')
    setdata(res.data)
    setloading(true)
  }
  useEffect(()=>{
fetchjobs()
  },[])
const deletejob=async(id:string)=>{
  try {
    
    await axios.delete('/api/Jobs/deletejob',{
      data:{id:id}
    })
    toast.success('Job deleted Successfuly')
    
  } catch (error) {
    console.log(error)
  }

}
const closeModal = () => {
  setid(null);
};
  return (
    <>
      <div className="flex justify-center">
        <h1 className=" text-2xl font-semibold">Edit Jobs</h1>
      </div>
      {!loading ?<div className="flex justify-center items-center mt-72"><Spinner/></div>  : (<div>{data.map((item)=>(
          <div key={item.id} className="grid justify-center  grid-cols-2 grid-rows-1 px-4">
          <div className="flex mt-8 ml-8 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Image
              className="object-cover w-full h-48 md:h-auto md:w-48 rounded-lg p-1"
              src={item.image}
              width={192} // Adjusted width to match the container width
              height={500} // Adjusted height to match the container height
              alt="as"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <div className="flex flex-row">
                <h5 className="mb-2 text-2xl flex w-48 font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.jobtitle}
                </h5>
                <div className="flex flex-row gap-3 items-center ml-28">
                  <Edit style={{ color: "green" }} onClick={()=>setid(item.id)}/>
                  <Trash2 style={{ color: "red" }} onClick={()=>deletejob(item.id)} />
                </div>
              </div>
  
              <p className="mb-3 w-72 font-normal text-gray-700 dark:text-gray-400">
               {item.jobdesc}
              </p>
              <p className="text-gray-700">Vacancy:{item.jobOpenings}</p>
              <p className="text-gray-700">Job Type:{item.employmenttype}</p>
              <div className="flex flex-row gap-3 text-gray-700">
              <div>Start Date: {item.startDate.slice(0,-14)}</div>
              <div>End Date: {item.endDate.slice(0,-14)}</div>
            </div>
            </div>
          
          </div>
        </div>
      ))}</div>)}
      
      {getid && <Editjobmodal id={getid} closeModal={closeModal}/>  }
    
    </>
  );
};

export default Editjobs;
