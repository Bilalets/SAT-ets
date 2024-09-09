'use client'
import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import axios from 'axios';
import Bar from '../Charts/Bar';
import Pie from '../Charts/Pie';

// Interfaces for TypeScript types
interface Data {
  id: string;
}

interface Subject {
  subjectName: string;
  questionCount: number;
}

interface Subcategory {
  subcategoryName: string;
  subjects: Subject[];
}

interface Category {
  categoryName: string;
  subcategories: Subcategory[];
}
interface Subject {
  id: string;
  name: string;
  
}

interface Subcategory {
  id: string;
  name: string;
  subject: Subject[];
  isShown:boolean
}

interface Category {
  id: string;
  name: string;
  subcategory: Subcategory[];
  isShown:boolean
}

interface Test {
  id: string;
  name: string;
  category: Category[];
  isShown:boolean 
}

const Data = () => {
  // State hooks
  const [data, setData] = useState<Data[]>([]);
  const [assessmentData, setAssessmentData] = useState<Data[]>([]);
  const [questionCount, setQuestionCount] = useState<Category[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [joblength,setjoblength]=useState<any[]>([])
  const [getcount,setcount]=useState<Test[]>([])
  const totalCategoryLength = getcount?.reduce((total, item) => {
    return total + (item.category?.length || 0);
  }, 0);
  const totalSubcategoryLength = getcount?.reduce((total, item) => {
    return total + (item.category?.reduce((subTotal, category) => {
      return subTotal + (category.subcategory?.length || 0);
    }, 0) || 0);
  }, 0);
  const totalSubjectLength = getcount?.reduce((total, item) => {
    return total + (item.category?.reduce((subTotal, category) => {
      return subTotal + (category.subcategory?.reduce((subSubTotal, subcategory) => {
        return subSubTotal + (subcategory.subject?.length || 0);
      }, 0) || 0);
    }, 0) || 0);
  }, 0);
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'long' });
      const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setCurrentDateTime(`${day}, ${date} - ${time}`);
    };

    updateDateTime(); // Initial call
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);
  // Fetch question count data from API
  // const fetchQuestionCount = async () => {
  //   try {
  //     const res = await axios.get('/api/Subjectquesnumber');
  //     setQuestionCount(res.data);
  //   } catch (error) {
  //     console.error('Error fetching question count:', error);
  //   }
  // };

  // Fetch user data from API
  const fetchAllData = async () => {
    try {
      const [usersRes, servicesRes, assessmentRes] = await Promise.all([
        axios.get('/api/Alluser'),
        axios.get('/api/Everyservice'),
        axios.get('/api/Allassessment'),
     
      ]);
  
      setData(usersRes.data);
      setcount(servicesRes.data);
      setAssessmentData(assessmentRes.data);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <>
 <div className=' bg-white font-bold text-2xl flex justify-center p-5 items-center   border h-24 mt-[-57px] ml-[-7px] shadow-sm w-auto flex-row'>
<div>Dashboard</div>
{/* <div>Eagle Testing Service</div> */}
{/* <div>{currentDateTime}</div> */}
 </div>
   

      <div className='flex flex-row mt-4 p-4 gap-1 justify-between '>
        <Card className="w-auto text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
             Users
          </h5>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
            {data.length}
          </p>
        </Card>
        <Card className="w-auto text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
             Jobs Created
          </h5>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
            {/* {joblength.length} */} 1
          </p>
        </Card>
        <Card className="w-auto text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
             Assessments 
          </h5>
          <p className="text-xl font-bold text-gray-700 ">
            {assessmentData.length}
          </p>
        </Card>
        <Card className="w-auto text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
            Services
          </h5>
          <p className="text-xl font-bold text-gray-700 ">
            {getcount.length}
          </p>
        </Card>
        <Card className="w-auto text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
           Categories
          </h5>
          <p className="text-xl font-bold text-gray-700 ">
         {totalCategoryLength}


          </p>
        </Card>
        <Card className="w-auto text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
           Sub-Categories
          </h5>
          <p className="text-xl font-bold text-gray-700 ">
            {totalSubcategoryLength}
          </p>
        </Card>
        <Card className="w-auto text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
           Subjects
          </h5>
          <p className="text-xl font-bold text-gray-700 ">
            {totalSubjectLength}
          </p>
        </Card>
      </div>
      
      {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-4'>
        {questionCount?.map((category) => (
          <Card key={category.categoryName} className="p-4 h-60">
            <div className='flex flex-col mt-5 overflow-scroll'>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                Category: {category.categoryName}
              </h5>
              {category.subcategories?.map((subcategory) => (
                <div key={subcategory.subcategoryName} className="mb-4">
                  <h6 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Subcategory: {subcategory.subcategoryName}
                  </h6>
                  {subcategory.subjects?.map((subject) => (
                    <div key={subject.subjectName} className="mb-2">
                      <p className="font-semibold text-gray-700 dark:text-gray-400">
                        Subject: {subject.subjectName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-500">
                        Total Questions: {subject.questionCount}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div> */}
     <div className='flex flex-row  gap-5'>
     <Bar/>
     <Pie/>
     </div>

   
    
    </>
  );
};

export default Data;
