"use client"
import { Card } from 'flowbite-react';
import {
  CircleUser,
  LayoutPanelTop,
  Ratio,
  UserRoundCog,
  UsersRound,
} from 'lucide-react';
import React from 'react';
import StaffChart from './Staffchart';
import Studentchart from './Studentchart';
import SuperAdminHeader from '../../components/super_admin_header';
import dynamic from 'next/dynamic';
const DynamicStaffChart = dynamic(() => import("./Staffchart"), { ssr: false });
const DynamicStudentChart = dynamic(() => import("./Studentchart"), { ssr: false });
const cardInfo = [
  { title: 'Total Branches', icon: <LayoutPanelTop />, value: '6' },
  { title: 'Total Principals', icon: <UserRoundCog />, value: '6' },
  { title: 'Total Staff', icon: <UsersRound />, value: '400' },
  { title: 'Total Student', icon: <CircleUser />, value: '2000' },
  { title: 'Students Ratio', icon: <Ratio />, value: '333' },
  { title: 'Average Staff', icon: <Ratio />, value: '66' },
];
const page = () => {
  return (
    <>
      <SuperAdminHeader myTitle="Informative Dashboard" />
      <div className="p-5 text-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {cardInfo.map((item, index) => (
            <Card key={index} className="w-full justify-center">
              <div className="flex justify-between">
                <div>{item.title}</div>
                <div>{item.icon}</div>
              </div>
              <div className="flex h-full items-center justify-center mt-5">
                <h1 className="text-2xl text-gray-900">{item.value}</h1>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-4 gap-x-2">
          <Card className="flex-grow">
            <DynamicStaffChart/>
          </Card>
          <Card className="w-[40%]">
            <div className="w-full h-full">
              <DynamicStudentChart />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
