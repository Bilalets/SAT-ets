'use client';
import { Card } from 'flowbite-react';
import { ThumbsUp, ThumbsDown, Award, BadgeMinus } from 'lucide-react';
import Barchart from './Barchart';
import Overview from './Overview';
import StudentAttendance from './StudentAttendance';
import TopTen from './TopTen';
import StaffAttendance from './StaffAttendance';
import Annual from './Annual';
import SuperAdminHeader from '../../components/super_admin_header';
import dynamic from 'next/dynamic';
const DynamicbarChart = dynamic(() => import("./Barchart"), { ssr: false });
const DynamicoverviewChart = dynamic(() => import("./Overview"), { ssr: false });
const DynamicStudentAttendance = dynamic(() => import("./StudentAttendance"), { ssr: false });
const DynamicTopTen  = dynamic(() => import("./TopTen"), { ssr: false });
const DynamicStaffAttendance = dynamic(() => import("./StaffAttendance"), { ssr: false });
const DynamicAnnual = dynamic(() => import('./Annual'), { ssr: false });

const cardInfo = [
  { title: 'Excellent Branch', icon: <ThumbsUp />, name: 'Branch A' },
  { title: 'Poor Branch', icon: <ThumbsDown />, name: 'Branch D' },
  { title: 'Top Student', icon: <Award />, name: 'Naeem' },
  { title: 'Struggling Student', icon: <BadgeMinus />, name: 'Farhan' },
];

const Statistics = () => {
  return (
    <>
      <SuperAdminHeader myTitle="Statistics Dashboard" />
      <div className="p-5 text-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cardInfo.map((item, index) => (
            <Card key={index} className="w-full justify-center">
              <div className="flex justify-between">
                <div>{item.title}</div>
                <div>{item.icon}</div>
              </div>
              <div className="flex h-full items-center justify-center mt-5">
                <h1 className="text-2xl text-gray-900">{item.name}</h1>
              </div>
            </Card>
          ))}
        </div>
        {/* barchart and pie chart*/}
        <div className="flex flex-col md:flex-row justify-between mt-4 gap-x-2">
          <Card className="flex-grow">
            <DynamicbarChart />
          </Card>
          <Card className="w-1/4">
            <DynamicoverviewChart />
          </Card>
        </div>
        {/* student and top ten  */}
        <div className="w-full flex flex-col md:flex-row gap-x-2 mt-5">
          <Card className="w-[40%]">
            <DynamicStudentAttendance />
          </Card>
          <Card className="flex-grow">
            <DynamicTopTen />
          </Card>
        </div>
        {/* staff attendance and annual report*/}
        <div className="w-full flex flex-col md:flex-row gap-x-2 mt-5">
          <Card className="flex-grow">
            <DynamicAnnual />
          </Card>
          <Card className="w-1/3 ">
            <DynamicStaffAttendance />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Statistics;
