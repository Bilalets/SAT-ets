'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MenuItem, Menu } from "react-pro-sidebar";
import { Button } from 'flowbite-react';
import { HiAdjustments, HiOutlineClock } from 'react-icons/hi';
interface Chapter {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  chapters?: Chapter[]; // Making chapters optional in Subject interface
}

interface Subcategory {
  id: string;
  name: string;
  subject: Subject[];
}

interface Category {
  id: string;
  name: string;
  subcategory: Subcategory[];
}

const Singleproduct = ({ params }: { params: { id: string } }) => {
  const [getData, setData] = useState<Category[]>();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/Service/Getsinglecat/${params.id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  const toggleDropdown = (id: string) => {
    setSelectedSubjectId(id === selectedSubjectId ? null : id);
  };

  return (
    <div>
      {getData?.map((category) => (
        <div className=' ml-[600px]' key={category.id}>
          {category.subcategory.map((subcategoryItem) => (
            <div key={subcategoryItem.id}>
              <div
                onClick={() => toggleDropdown(subcategoryItem.id)}
                className="text-white m-10 h-20 w-[300px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {subcategoryItem.name}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
              {selectedSubjectId === subcategoryItem.id && (
                <div className="z-10 shadow-2xl h-full w-[300px] ml-10 bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 items-center">
                    {subcategoryItem.subject.map((item) => (
                      <div className=" items-center" key={item.id}>
                        <Menu>
                          <hr />
                          {item.chapters && item.chapters.length > 0 ? (
                            // If subject has chapters, redirect to home
                            <MenuItem >{item.name}</MenuItem>
                          ) : (
                            // If subject has no chapters, redirect to assessment component
                            <MenuItem component={<Link href={`/applicants/assessment/${item.id}`} />}>{item.name}</MenuItem>
                          )}
                          <hr />
                        </Menu>
                        {/* Render chapters if they exist */}
                        {item.chapters && item.chapters.length > 0 && item.chapters.map((chapter) => (
                         
                          <div key={chapter.id}  >
                             <hr/>
                            <Link href={`/applicants/home/Chapterquestion/${chapter.id}`}>
                            {chapter.name}
                            </Link>
                            <hr/>
                            </div>
                        ))}
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Singleproduct;
