'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table } from "flowbite-react";
import useAppContext from "@/app/store/user";
interface record{
  Percentage: string
  Correctawn: string
  Wrongawn: string
  subjectname: string
  createdAt:string
}


const Cards = () => {
  const {getData}=useAppContext()
  const [getrecord,setrecord]=useState<record[]>()
  


  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    return `${hours}:${minutes} ${ampm}`;
  };
useEffect(()=>{
  const fetchresult=async()=>{
    try {
      const response = await axios.post("/api/Service/Subrecord",{userId:getData?.id}, { headers: { "Cache-Control": "no-store" } });
      setrecord(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchresult()
},[getData])

useEffect(()=>{
 const fetcheasypaisa=async()=>{

  }
},[])

  return (
    <>
   <div className="flex flex-col items-center">
  <div className="w-full max-w-[1200px] p-4 items-center ml-0 md:ml-0 sm:ml-0 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        History
      </h5>
    </div>
  </div>

  {getrecord?.map((item, index) => (
    <Card key={index} className="m-5 w-full max-w-[1200px]">
      <div className="flex justify-between">
        <p className="text-base md:text-lg">{index + 1}</p>
      </div>
      <hr />
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <Table.Head>
            <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">Percentage</Table.HeadCell>
            <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">Subject Name</Table.HeadCell>
            <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">Wrong Answers</Table.HeadCell>
            <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">Correct Answers</Table.HeadCell>
            <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">Date</Table.HeadCell>
            <Table.HeadCell className="px-2 py-1 sm:px-4 sm:py-2">Time</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">{item.Percentage}%</Table.Cell>
              <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">{item.subjectname}</Table.Cell>
              <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">{item.Wrongawn}</Table.Cell>
              <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">{item.Correctawn}</Table.Cell>
              <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">{formatDate(item.createdAt)}</Table.Cell>
              <Table.Cell className="px-2 py-1 sm:px-4 sm:py-2">{formatTime(item.createdAt)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </Card>
  ))}
</div>


    </>
  );
};

export default Cards;
export const fetchCache = 'force-no-store';
