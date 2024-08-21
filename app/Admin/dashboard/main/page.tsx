'use client'
import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import axios from 'axios';

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

const Mainpage = () => {
  // State hooks
  const [data, setData] = useState<Data[]>([]);
  const [assessmentData, setAssessmentData] = useState<Data[]>([]);
  const [questionCount, setQuestionCount] = useState<Category[]>([]);

  // Fetch question count data from API
  const fetchQuestionCount = async () => {
    try {
      const res = await axios.get('/api/Subjectquesnumber');
      setQuestionCount(res.data);
    } catch (error) {
      console.error('Error fetching question count:', error);
    }
  };

  // Fetch user data from API
  const fetchData = async () => {
    try {
      const res = await axios.get('/api/Alluser');
      setData(res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch assessment data from API
  const fetchAssessment = async () => {
    try {
      const res = await axios.get('/api/Allassessment');
      setAssessmentData(res.data);
    } catch (error) {
      console.error('Error fetching assessment data:', error);
    }
  };

  // Use effect hooks to call API functions
  useEffect(() => {
    fetchQuestionCount();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchAssessment();
  }, []);

  return (
    <>
      <h1 className='text-3xl font-bold text-center my-6'>Admin Dashboard</h1>
      
      <div className='flex flex-row gap-4 p-4 justify-center items-center'>
        <Card className="max-w-xs">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total Users
          </h5>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-400">
            {data.length}
          </p>
        </Card>
        <Card className="w-96">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total Assessment Created
          </h5>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-400">
            {assessmentData.length}
          </p>
        </Card>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10'>
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
      </div>
    </>
  );
};

export default Mainpage;
