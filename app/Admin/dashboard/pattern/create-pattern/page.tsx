'use client';
import React, { useState } from 'react';
import { Button, Card, Modal, TableHead, TextInput } from 'flowbite-react';
import { Link2, PlusCircle, Save, SquarePen, Trash2, XCircle } from 'lucide-react';
import { Table } from 'flowbite-react';

const Createpattern = () => {
  const data = [
    {
      id: 1,
      name: 'Self Assessment Test',
      subject: 'UDC',
      username: 'FIA',
      chap: 'NIL',
      sub:"NIL"
    },
    {
      id: 2,
      name: 'Self Assessment Test',
      subject: 'Inspector',
      username: 'CSS',
      chap: 'NIL',
      sub:"NIL"
    },
    {
      id: 3,
      name: 'Self Assessment Test',
      subject: 'LDC',
      username: 'PMS',
      chap: 'NIL',
      sub:"NIL"
    },
  ];
  return (
    <>
    <div className='flex flex-row gap-10' >
<div className='ml-20 '>
<select  className="bg-white rounded-lg w-[440px] h-[45px] text-gray-800 border-0  p-2 mb-6 focus:bg-gray-200 focus:outline-none focus:ring-1  transition ease-in-out duration-150 shadow-xl" id="product">
<option value="" disabled selected hidden>Select a Subject</option>
       <option value="product-1">LDC</option>
       <option value="product-2">UDC</option>
       <option value="product-3">Inspector</option>
     </select>
</div>
<div className='flex  flex-row gap-5 justify-center'>
<div className="relative rounded-lg  overflow-hidden bg-white shadow-xl w-[440px] h-[45px] ">
 <input
   type="text"
   name="text"
   placeholder="Create Chapter"
   className="input bg-transparent outline-none border-none  w-[440px] h-[45px] font-sans text-lg font-semibold"
 />

</div>

   </div>
   <div className='mt-[-40px]' >
   <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Create Chapter</button>

   </div>
   </div>
   <div className=" flex flex-col ml-28 p-5 my-5 ">
     

     {data.map((item, index) => (
           <Card key={item.id} className="m-5 w-full lg:max-w-[1000px] h-[150px]">
             <div className="flex justify-between">
               
 
             
             </div>
          
             <Table>
               <Table.Head>
               <Table.HeadCell>S No</Table.HeadCell>
                 <Table.HeadCell>Service</Table.HeadCell>
                 <Table.HeadCell>Category</Table.HeadCell>
                 <Table.HeadCell>Subcategory</Table.HeadCell>
                 <Table.HeadCell>Subject</Table.HeadCell>
                 <Table.HeadCell>Chapters</Table.HeadCell>
                 <Table.HeadCell>
                 <div className="flex gap-5">
                 <SquarePen className=" text-2xl text-yellow-400 cursor-pointer" />
                 <Trash2 className=" text-2xl text-red-500 cursor-pointer" />
                 
               </div>
                 </Table.HeadCell>
               </Table.Head>
               <Table.Body>
                 <Table.Row>
                 <Table.Cell>{index+1}</Table.Cell>
                   <Table.Cell>{item.name}</Table.Cell>
                   <Table.Cell>{item.username}</Table.Cell>
                   <Table.Cell>{item.subject}</Table.Cell>
                   <Table.Cell>{item.sub}</Table.Cell>
                   <Table.Cell>{item.chap}</Table.Cell>
                 </Table.Row>
               </Table.Body>
             </Table>
           </Card>
         ))}
       </div>
   </>
  )
}

export default Createpattern;