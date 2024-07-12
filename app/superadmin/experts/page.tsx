'use client';
import React, { useState } from 'react';
import GeneralHeader from '../components/general_header';
import { Button, Card, Modal, TableHead, TextInput } from 'flowbite-react';
import { PlusCircle, Save, SquarePen, Trash2, XCircle } from 'lucide-react';
import { Table } from 'flowbite-react';
const Experts = () => {
  const data = [
    {
      id: 1,
      name: 'Naeem',
      subject: 'Law',
      username: 'naaem@sat.com',
      password: '123',
    },
    {
      id: 2,
      name: 'Iqbal Safi',
      subject: 'Bio',
      username: 'iqbal@sat.com',
      password: '123',
    },
    {
      id: 3,
      name: 'Ismail',
      subject: 'Programming',
      username: 'ismail@sat.com',
      password: '123',
    },
  ];
  const subjects = [
    { id: 1, subject: 'law' },
    { id: 2, subject: 'bio' },
    { id: 3, subject: 'mathematics' },
    { id: 4, subject: 'computer science' },
  ];
  const [openAddExpert, setOpenAddExpert] = useState(false);

  return (
    <>
      <Modal
        show={openAddExpert}
        size="md"
        popup
        onClose={() => setOpenAddExpert(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-medium font-medium text-gray-700 dark:text-white">
              Add Expert
            </h3>
            <TextInput id="name" placeholder="Expert name" required />
            <select className="w-full rounded-lg text-gray-500 text-sm border-gray-400">
              <option>Select Subjects</option>
              {subjects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.subject}
                </option>
              ))}
            </select>
            <TextInput id="username" placeholder="Username" required />
            <TextInput id="password" placeholder="Password" required />
          </div>
          <div className="flex justify-between w-full mt-5">
            <div className="flex-wrap gap-2">
              <Button>
                <Save className="mr-2" />
                Save
              </Button>
            </div>

            <div className="flex-wrap gap-2">
              <Button>
                <XCircle className="mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <GeneralHeader myTitle="Experts Total : 10" />

      <div className="p-5 my-5 ">
        <div className="ml-5 flex flex-wrap gap-2">
          <Button
            onClick={() => {
              setOpenAddExpert(!openAddExpert);
            }}
          >
            <PlusCircle className="mr-2" />
            <p> Add Expert</p>
          </Button>
        </div>

        {data.map((item, index) => (
          <Card key={item.id} className="m-5 w-full lg:max-w-[600px]">
            <div className="flex justify-between">
              <p>{index + 1}</p>

              <div className="flex gap-5">
                <SquarePen className=" text-2xl text-yellow-400 cursor-pointer" />
                <Trash2 className=" text-2xl text-red-500 cursor-pointer" />
              </div>
            </div>
            <hr />
            <Table>
              <Table.Head>
                <Table.HeadCell>Expert Name</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Password</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell>{item.password}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Experts;
