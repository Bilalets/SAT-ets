'use client';
import { Button, Card, Modal, TextInput } from 'flowbite-react';
import { PlusCircle, Save, SquarePen, Trash2, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import GeneralHeader from '../components/general_header';

const Subjects = () => {
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const subjects = [
    { id: 1, subject: 'Law' },
    { id: 2, subject: 'Bio' },
    { id: 3, subject: 'Mathematics' },
    { id: 4, subject: 'Computer Science' },
  ];
  return (
    <>
      <Modal
        show={openAddSubject}
        size="md"
        popup
        onClose={() => setOpenAddSubject(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-medium font-medium text-gray-700 dark:text-white">
              Add Subject
            </h3>
            <TextInput id="name" placeholder="Expert name" required />
          </div>
          <div className="flex justify-between w-full mt-5">
            <div className="flex-wrap  mt-10 gap-2">
              <Button>
                <Save className="mr-2" />
                Save
              </Button>
            </div>

            <div className="flex-wrap mt-10 gap-2">
              <Button>
                <XCircle className="mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <GeneralHeader myTitle="Total Subjects : 10" />

      <div className="p-5 my-5 ">
        <div className="ml-5 flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setOpenAddSubject(!openAddSubject);
            }}
          >
            <PlusCircle className="mr-2" />
            <p> Add Subject</p>
          </Button>
        </div>

        {subjects.map((item, index) => (
          <Card key={item.id} className="m-5 w-full lg:max-w-[600px]">
            <div className="flex justify-between">
              <p>{index + 1}</p>

              <div className="flex gap-5">
                <SquarePen className=" text-2xl text-yellow-400 cursor-pointer" />
                <Trash2 className=" text-2xl text-red-500 cursor-pointer" />
              </div>
            </div>
            <p className=" text-lg text-gray-500 ml-20">{item.subject}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Subjects;
